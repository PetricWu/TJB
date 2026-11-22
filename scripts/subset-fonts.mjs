/**
 * 构建期标题字体子集化
 *
 * 目的：Noto Serif SC 全量切片按 unicode-range 加载时，首页仍会命中约 670KB。
 *      本脚本在 prerender 之后扫描所有已渲染 HTML 中「标题类元素」的字符，
 *      只保留这些字形重新生成 woff2 切片，并重写 dist/client/fonts.css。
 *
 * 特性：
 * - 新增文章会自动纳入字符集（每次构建重新生成，无需人工维护）
 * - 只写 dist，不改 public 源文件（开发模式仍用完整字体）
 * - 任一步失败都保留原始 fonts.css 并 exit 0，不阻断发布
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import * as cheerio from 'cheerio';
import subsetFont from 'subset-font';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist', 'client');
const FONT_CSS = path.join(DIST, 'fonts.css');
const SUBSET_DIR = path.join(DIST, 'fonts', 'subset');

/** 无论页面用不用得到都应保留的基础字符（ASCII + 常用中英文标点） */
const BASE_CHARS =
  ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~' +
  '，。、；：？！“”‘’（）《》〈〉【】「」『』—…·～％＆＠＃￥';

function walkHtml(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'assets' || entry.name === 'article-data') continue;
      walkHtml(full, out);
    } else if (entry.name.endsWith('.html')) {
      out.push(full);
    }
  }
  return out;
}

/** 收集所有页面标题类元素用到的字符 */
function collectChars() {
  const chars = new Set(BASE_CHARS);
  const files = walkHtml(DIST);
  for (const file of files) {
    const $ = cheerio.load(fs.readFileSync(file, 'utf-8'));
    $('[class*="font-serif"], [class*="font-display"], h1, h2, h3').each((_, el) => {
      for (const ch of $(el).text()) chars.add(ch);
    });
  }
  return [...chars].join('');
}

function parseUnicodeRange(value) {
  return value
    .split(',')
    .map((token) => token.trim().replace(/^U\+/i, ''))
    .filter(Boolean)
    .map((token) => {
      const [a, b] = token.split('-');
      const start = Number.parseInt(a, 16);
      const end = b ? Number.parseInt(b, 16) : start;
      return [start, end];
    })
    .filter(([start, end]) => Number.isFinite(start) && Number.isFinite(end));
}

function parseFaces(css) {
  const faces = [];
  for (const match of css.matchAll(/@font-face\s*\{([^}]*)\}/g)) {
    const body = match[1];
    const src = body.match(/url\(['"]?([^'")]+)['"]?\)/);
    const range = body.match(/unicode-range\s*:\s*([^;]+);/);
    if (!src || !range) continue;
    faces.push({ src: src[1], range: range[1].trim() });
  }
  return faces;
}

/** 把字符码点压缩成 CSS unicode-range（连续码点合并为区间） */
function formatRanges(codePoints) {
  const sorted = [...new Set(codePoints)].sort((a, b) => a - b);
  const parts = [];
  let i = 0;
  while (i < sorted.length) {
    let j = i;
    while (j + 1 < sorted.length && sorted[j + 1] === sorted[j] + 1) j++;
    parts.push(i === j ? `U+${sorted[i].toString(16)}` : `U+${sorted[i].toString(16)}-${sorted[j].toString(16)}`);
    i = j + 1;
  }
  return parts.join(',');
}

async function main() {
  if (!fs.existsSync(FONT_CSS)) {
    console.log('⏭  未找到 dist/client/fonts.css，跳过字体子集化');
    return;
  }

  const originalCss = fs.readFileSync(FONT_CSS, 'utf-8');
  const faces = parseFaces(originalCss);
  if (faces.length === 0) {
    console.log('⏭  fonts.css 中没有可处理的 @font-face，跳过字体子集化');
    return;
  }

  const chars = collectChars();
  const codePoints = [...chars].map((ch) => ch.codePointAt(0));
  console.log(`🔤 扫描标题字符：${codePoints.length} 个（HTML ${walkHtml(DIST).length} 页）`);

  fs.rmSync(SUBSET_DIR, { recursive: true, force: true });
  fs.mkdirSync(SUBSET_DIR, { recursive: true });

  const outputBlocks = [];
  const coveredCodePoints = [];
  let originalBytes = 0;
  let subsetBytes = 0;

  for (const face of faces) {
    const ranges = parseUnicodeRange(face.range);
    const usedCodePoints = codePoints.filter((cp) => ranges.some(([start, end]) => cp >= start && cp <= end));
    if (usedCodePoints.length === 0) continue;

    const srcPath = path.join(DIST, face.src.replace(/^\//, ''));
    if (!fs.existsSync(srcPath)) continue;

    const source = fs.readFileSync(srcPath);
    originalBytes += source.length;
    const subset = await subsetFont(source, chars, { targetFormat: 'woff2', noHinting: true });
    if (subset.length < 1024) continue;

    // 文件名带内容哈希：构建产物变更时绕过 /fonts/* 的一年强缓存
    const hash = crypto.createHash('sha256').update(subset).digest('hex').slice(0, 8);
    const name = `${path.basename(face.src, '.woff2')}.${hash}.woff2`;
    fs.writeFileSync(path.join(SUBSET_DIR, name), subset);
    subsetBytes += subset.length;
    coveredCodePoints.push(...usedCodePoints);

    outputBlocks.push(
      `@font-face{font-family:'Noto Serif SC';font-style:normal;font-weight:700 900;font-display:swap;src:url('/fonts/subset/${name}') format('woff2');unicode-range:${formatRanges(usedCodePoints)}}`
    );
  }

  if (outputBlocks.length === 0) {
    console.log('⏭  没有命中任何字体切片，保留原始 fonts.css');
    return;
  }

  fs.writeFileSync(FONT_CSS, outputBlocks.join('\n'), 'utf-8');

  const covered = new Set(coveredCodePoints);
  const uncovered = [...chars].filter((ch) => !covered.has(ch.codePointAt(0)));
  if (uncovered.length > 0) {
    console.warn(`⚠️  ${uncovered.length} 个字符不在任何字体切片范围内，将回退系统宋体：${uncovered.slice(0, 20).join('')}`);
  }

  const kb = (n) => `${(n / 1024).toFixed(1)}KB`;
  console.log(
    `✅ 字体子集化完成：${outputBlocks.length} 个切片，${kb(originalBytes)} → ${kb(subsetBytes)}（CSS ${kb(originalCss.length)} → ${kb(fs.statSync(FONT_CSS).size)}）`
  );
}

try {
  await main();
} catch (err) {
  console.warn('⚠️  字体子集化失败，保留原始 fonts.css（不阻断发布）：', err);
  process.exit(0);
}
