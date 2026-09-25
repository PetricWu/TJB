// 预渲染：SSR 构建 entry-server，遍历路由生成含正文的静态 HTML（提升百度可抓取性）
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist', 'client');
const SERVER_OUT = path.join(ROOT, 'dist', 'server');
const SITE_URL = 'https://tjb.petricw.com';

// 1. SSR 构建服务端 bundle
execSync('npx vite build --ssr src/entry-server.tsx --outDir dist/server --emptyOutDir', {
  cwd: ROOT,
  stdio: 'inherit',
});

// 2. 加载 render
const { render } = await import(pathToFileURL(path.join(SERVER_OUT, 'entry-server.js')).href);

// 3. 路由 + meta 清单（title/description 与各页 useSEO 一致）
const summaries = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/article-summaries-auto.json'), 'utf-8'));
const staticRoutes = [
  { path: '/', title: '成都市田家炳中学官网 - 百年名校·四川省一级示范性普通高中', desc: '成都市田家炳中学官网（tjb.petricw.com）。始建于1925年，始称成城公学，百年名校。四川省一级示范性普通高中，全国国防教育示范校、教育部人工智能教育双试点单位。招生咨询电话：028-84551880。' },
  { path: '/about', title: '学校概况 — 成都市田家炳中学官网', desc: '百年校史、办学理念、师资队伍、校园环境、荣誉资质。' },
  { path: '/news', title: '新闻中心 — 成都市田家炳中学官网', desc: '校园要闻、通知公告、教学教研、校庆专题。' },
  { path: '/teaching', title: '教学教研 — 成都市田家炳中学官网', desc: '课程体系、教师发展、教学成果。' },
  { path: '/innovation', title: '科创特色 — 成都市田家炳中学官网', desc: '人工智能教育、机器人社团、科创实验室。' },
  { path: '/moral', title: '德育园地 — 成都市田家炳中学官网', desc: '主题活动、心理健康教育、高三成长指导。' },
  { path: '/student', title: '学生发展 — 成都市田家炳中学官网', desc: '艺术活动、体育活动、社团活动、实践活动。' },
  { path: '/admission', title: '招生招聘 — 成都市田家炳中学官网', desc: '招生简章、录取信息、教师招聘、双校区地址与交通指引、联系方式。' },
  { path: '/alumni', title: '校友风采 — 成都市田家炳中学官网', desc: '创校先贤、校友代表、百年校庆回眸。' },
  { path: '/tianjiabing', title: '田家炳专题 — 成都市田家炳中学官网', desc: '田家炳先生生平、基金会捐学规模、精神传承。' },
];
const articleRoutes = summaries
  .filter((a) => a.id)
  .map((a) => ({ path: `/news/${a.id}`, title: `${a.title} — 成都市田家炳中学官网`, desc: a.summary || '' }));
const routes = [...staticRoutes, ...articleRoutes];

// 4. 逐页渲染注入模板
const template = fs.readFileSync(path.join(DIST, 'index.html'), 'utf-8');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

for (const route of routes) {
  const appHtml = render(route.path);
  const html = template
    .replace(/<div id="root">[\s\S]*?<\/div>(?=\s*<script)/, `<div id="root">${appHtml}</div>`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(route.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(route.desc)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${SITE_URL}${route.path}$2`);
  const outFile = route.path === '/' ? path.join(DIST, 'index.html') : path.join(DIST, route.path.replace(/^\//, ''), 'index.html');
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, html);
}

console.log(`✅ 预渲染完成：${routes.length} 页`);
