// 构建期即时推送：读本次构建的 public/sitemap.xml，部署前推给百度（新文章分钟级通知）
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseUrls, pushUrls } from '../netlify/functions/_lib/baidu-push-core.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITEMAP_PATH = path.resolve(__dirname, '../public/sitemap.xml');

async function main() {
  try {
    const xml = fs.readFileSync(SITEMAP_PATH, 'utf-8');
    const urls = parseUrls(xml);
    const result = await pushUrls(urls);
    console.log('✅ 百度构建期推送完成：', JSON.stringify(result));
  } catch (error) {
    // 推送失败不阻断构建（网络/token 容错）
    console.warn('⚠️ 百度构建期推送失败（不阻断构建）：', error.message);
  }
}

main();
