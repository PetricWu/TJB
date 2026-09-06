/**
 * 动态 sitemap 生成脚本
 * 读取 parse-articles.mjs 产出的 article-summaries-auto.json，
 * 生成与实际文章数据一致的 public/sitemap.xml（文章 URL + lastmod 跟随发布日期）。
 * 需在 parse-articles.mjs 之后、vite build 之前执行。
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const SUMMARIES_JSON = path.join(ROOT_DIR, 'src', 'data', 'article-summaries-auto.json');
const SITEMAP_XML = path.join(ROOT_DIR, 'public', 'sitemap.xml');

const SITE_URL = 'https://tjb.petricw.com';
// 静态板块页内容修订日期（设计统一改版）
const STATIC_LASTMOD = '2026-09-06';

/** 静态路由：path / changefreq / priority */
const STATIC_ROUTES = [
  { path: '/', changefreq: 'weekly', priority: '1.0', lastmod: 'dynamic' },
  { path: '/about', changefreq: 'monthly', priority: '0.8' },
  { path: '/teaching', changefreq: 'monthly', priority: '0.8' },
  { path: '/innovation', changefreq: 'monthly', priority: '0.8' },
  { path: '/moral', changefreq: 'monthly', priority: '0.7' },
  { path: '/student', changefreq: 'monthly', priority: '0.7' },
  { path: '/admission', changefreq: 'monthly', priority: '0.9' },
  { path: '/news', changefreq: 'weekly', priority: '0.8', lastmod: 'dynamic' },
];

function urlEntry(loc, lastmod, changefreq, priority) {
  return [
    '  <url>',
    `    <loc>${loc}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    '  </url>',
  ].join('\n');
}

function main() {
  if (!fs.existsSync(SUMMARIES_JSON)) {
    console.warn('⚠️  未找到 article-summaries-auto.json，跳过 sitemap 生成（保留现有文件）');
    return;
  }

  const summaries = JSON.parse(fs.readFileSync(SUMMARIES_JSON, 'utf-8'));
  if (!Array.isArray(summaries) || summaries.length === 0) {
    console.warn('⚠️  article-summaries-auto.json 为空，跳过 sitemap 生成（保留现有文件）');
    return;
  }

  // 最新文章发布日期：首页与新闻列表页的内容驱动 lastmod
  const latestArticleDate = summaries
    .map((a) => a.publishDate)
    .filter(Boolean)
    .sort()
    .at(-1) || STATIC_LASTMOD;

  const entries = [];

  for (const route of STATIC_ROUTES) {
    const lastmod = route.lastmod === 'dynamic' ? latestArticleDate : (route.lastmod || STATIC_LASTMOD);
    entries.push(urlEntry(`${SITE_URL}${route.path}`, lastmod, route.changefreq, route.priority));
  }

  // 文章详情页（全量内容兜底页，正文来自 articles.json，与摘要同源同 ID）
  for (const a of summaries) {
    if (!a.id) continue;
    entries.push(
      urlEntry(
        `${SITE_URL}/news/${a.id}`,
        a.publishDate || STATIC_LASTMOD,
        'monthly',
        '0.6'
      )
    );
  }

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries,
    '</urlset>',
    '',
  ].join('\n');

  fs.writeFileSync(SITEMAP_XML, xml, 'utf-8');
  console.log(`💾 sitemap.xml 已生成: ${SITEMAP_XML}`);
  console.log(`   静态路由 ${STATIC_ROUTES.length} 条 + 文章 ${summaries.length} 条，最新文章日期 ${latestArticleDate}`);
}

try {
  main();
} catch (error) {
  console.error('❌ sitemap 生成失败:', error.message);
  process.exit(1);
}
