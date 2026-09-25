// 百度主动推送共享核心：解析 sitemap URL 并分批推送
// 被 Netlify Function（baidu-push.mjs，定时）与构建期脚本（scripts/baidu-push-build.mjs）共用。

const SITE_URL = process.env.SITE_URL || 'https://tjb.petricw.com';
// TODO: 配置 Netlify 环境变量 BAIDU_PUSH_TOKEN 后删除下方明文兜底
const TOKEN = process.env.BAIDU_PUSH_TOKEN || 'nE0k7f8LJdpPWw9Q';

/** 从 sitemap XML 文本解析全部 <loc> URL（去重） */
export function parseUrls(xml) {
  return [...new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]))];
}

/** 抓取线上 sitemap.xml 并解析全量 URL（定时函数用，单一事实来源） */
export async function fetchSitemapUrls() {
  const xml = await fetch(`${SITE_URL}/sitemap.xml`, {
    headers: { 'User-Agent': 'tjb-baidu-push' },
  }).then((r) => r.text());
  return parseUrls(xml);
}

/** 分批推送（百度单次上限 2000 条，按 100 条/批稳妥），遇配额用尽即停保留剩余 */
export async function pushUrls(urls) {
  const endpoint = `http://data.zz.baidu.com/urls?site=${SITE_URL}&token=${TOKEN}`;
  const results = [];
  for (let i = 0; i < urls.length; i += 100) {
    const batch = urls.slice(i, i + 100);
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: batch.join('\n'),
    });
    const data = await res.json().catch(() => ({}));
    results.push({ batch: batch.length, status: res.status, data });
    if (data.error === 400 && /quota/i.test(data.message || '')) break;
  }
  return { total: urls.length, results };
}

export { SITE_URL, TOKEN };
