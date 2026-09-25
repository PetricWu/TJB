// 百度主动推送 Netlify Function（每日定时推送全量 sitemap URL）
import { fetchSitemapUrls, pushUrls } from './_lib/baidu-push-core.mjs';

export default async () => {
  try {
    const urls = await fetchSitemapUrls();
    const result = await pushUrls(urls);
    console.log('baidu-push', JSON.stringify(result));
    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

// 每日定时推送（UTC 02:20 = 北京时间 10:20），仅 Netlify 部署环境生效
export const config = { schedule: '20 2 * * *' };
