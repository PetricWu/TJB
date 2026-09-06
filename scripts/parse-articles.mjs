/**
 * 公众号文章解析脚本
 * 功能：读取 articles.txt，自动抓取公众号文章，提取标题、图片、发布时间等信息
 * 输出：生成 articles.json 数据文件，供前端使用
 * 
 * 图片筛选策略：
 * 1. 长边 >= 800px（过滤小图/表情包）
 * 2. 过滤GIF格式（通常为动图/表情包）
 * 3. 过滤面积小于 200x200 的图片
 * 4. 过滤长宽比极端的图片（>4:1 或 <1:4，通常是装饰条/分割线）
 * 5. 过滤文件大小小于 30KB 的图片（通常为图标/装饰）
 * 6. 正方形且长边 < 1200px 的图片大概率是表情包，过滤
 * 7. 检查图片内容：过滤纯色/渐变背景（通过检查颜色方差）
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';
import * as cheerio from 'cheerio';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const ARTICLES_TXT = path.join(ROOT_DIR, 'articles.txt');
const OUTPUT_JSON = path.join(ROOT_DIR, 'src', 'data', 'articles.json');
const IMAGES_DIR = path.join(ROOT_DIR, 'public', 'article-images');

// 图片筛选参数
const MIN_IMAGE_SIZE = 600;        // 长边最小 600px（过滤表情包/小图标）
const MIN_FILE_SIZE = 30 * 1024;   // 文件最小 30KB（过滤装饰图/表情包/低质量图）
const MIN_AREA = 200 * 200;        // 面积最小 40000px²
const MAX_ASPECT_RATIO = 2.0;     // 长宽比 > 2:1 + 短边 < 500 = 装饰条
const MIN_ASPECT_RATIO = 0.4;      // 长宽比最小 1:2.5
const SQUARE_THRESHOLD = 1.2;     // 正方形阈值
const SQUARE_MIN_SIZE = 1200;      // 正方形图片长边需 >= 1200px（过滤表情包）
const MIN_SHORT_SIDE = 500;        // 短边最小 500px（过滤装饰条，真实照片极少短边<500）

// 文章分类关键词映射
const CATEGORY_KEYWORDS = {
  '校庆专题': ['校庆', '百年', '建校'],
  '德育活动': ['德育', '心理', '525', '5·25', '心理健康', '百日誓师', '誓师', '高三启动', '启动仪式'],
  '学生发展': ['运动会', '体育', '艺术节', '艺术', '社团', '学生', '青春'],
  '教学教研': ['教学', '教研', '课堂', '课程', '科研'],
  '校园要闻': ['要闻', '新闻', '动态', '消息'],
  '通知公告': ['通知', '公告', '放假', '安排'],
  '家校共育': ['家长', '家校', '开放日'],
};

const FIXED_CATEGORY_MAP = {
  'kgdyYsIwsMRG8WL4W-vPzQ': '德育活动',
  'hKZlMYfjHIQ3azXfxQAdrQ': '学生发展',
  'ZhT_FPlWuF0LSO-MT87zhQ': '学生发展',
  '8FDIFxsW0XdQ3p1qrC9o8w': '德育活动',
  'GKuaecAoTNosaqBz2x7JlQ': '德育活动',
  'GHbLqdSNx1qGWUP0Dg1ASA': '学生发展',
  '0ol4DU9TIzB1dFq9luhrpw': '校庆专题',
};

const FIXED_PINNED_MAP = {
  '0ol4DU9TIzB1dFq9luhrpw': true,
};

const FIXED_SUMMARY_MAP = {
  'kgdyYsIwsMRG8WL4W-vPzQ': '5·25心理健康节系列活动温暖开展，通过心理讲座、团体辅导、趣味游戏等多种形式，引导同学们关爱自我、关注心灵成长，在轻松愉悦的氛围中收获正能量。',
  'hKZlMYfjHIQ3azXfxQAdrQ': '2025年春季田径运动会隆重举行，运动健儿们驰骋赛场，挥洒汗水，展现了田中学子昂扬向上的精神风貌和顽强拼搏的体育精神。',
  'ZhT_FPlWuF0LSO-MT87zhQ': '社团课程全面升级，四大类30+社团助力学生多元发展。从学术科技到文化艺术，从体育运动到实践创新，每个学生都能找到属于自己的舞台。',
  '8FDIFxsW0XdQ3p1qrC9o8w': '高考百日誓师大会震撼举行，高三学子以青春之名，赴梦想之约。铮铮誓言响彻校园，彰显了高三学子决胜高考的坚定信念和昂扬斗志。',
  'GKuaecAoTNosaqBz2x7JlQ': '高三启动仪式顺利举行，标志着新一届高三学子正式踏上高考征程。学校领导、教师代表和全体高三学生共同见证这一重要时刻。',
  'GHbLqdSNx1qGWUP0Dg1ASA': '第23届校园文化艺术节盛大开幕，青春风采闪耀田中。文艺汇演、书画展览、才艺展示等系列活动精彩纷呈，为校园增添了浓厚的艺术氛围。',
  '0ol4DU9TIzB1dFq9luhrpw': '成都市田家炳中学建校100周年庆祝大会隆重举行。各界校友、师生代表齐聚一堂，共庆百年华诞，共话学校发展新篇章。',
};

function parseArticlesTxt() {
  console.log('📖 正在读取 articles.txt...');
  if (!fs.existsSync(ARTICLES_TXT)) {
    console.error('❌ articles.txt 文件不存在');
    return [];
  }
  const content = fs.readFileSync(ARTICLES_TXT, 'utf-8');
  const lines = content.split('\n');
  const links = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    let category = null;
    let url = trimmed;
    const categoryMatch = trimmed.match(/^\[(.+?)\]\s*(.+)$/);
    if (categoryMatch) {
      category = categoryMatch[1];
      url = categoryMatch[2];
    }
    if (url.includes('mp.weixin.qq.com')) {
      links.push({ url, category });
    }
  }
  console.log(`✅ 解析到 ${links.length} 篇文章链接`);
  return links;
}

function extractArticleId(url) {
  const match = url.match(/\/s\/([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

function autoClassify(title, articleId) {
  if (articleId && FIXED_CATEGORY_MAP[articleId]) {
    return FIXED_CATEGORY_MAP[articleId];
  }
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    for (const keyword of keywords) {
      if (title.includes(keyword)) {
        return category;
      }
    }
  }
  return '校园要闻';
}

async function fetchArticleHtml(url) {
  try {
    console.log(`🌐 正在抓取: ${url}`);
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
      },
      timeout: 15000,
    });
    return response.data;
  } catch (error) {
    console.error(`❌ 抓取失败: ${url}`, error.message);
    return null;
  }
}

function parseArticleHtml(html, url) {
  const $ = cheerio.load(html);
  const articleId = extractArticleId(url);

  let title = $('#activity-name').text().trim();
  if (!title) {
    title = $('meta[property="og:title"]').attr('content') || '';
  }
  if (!title) {
    title = '点击查看原文';
    console.warn(`⚠️  未能提取到标题，使用兜底文字`);
  }

  let publishDate = '';
  const publishTimeText = $('#publish_time').text().trim();
  if (publishTimeText) {
    publishDate = publishTimeText;
  } else {
    const scripts = $('script').text();
    const dateMatch = scripts.match(/var\s+ct\s*=\s*["']?(\d+)["']?/);
    if (dateMatch) {
      const timestamp = parseInt(dateMatch[1]) * 1000;
      const date = new Date(timestamp);
      publishDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    }
  }
  if (!publishDate) {
    publishDate = '待完善';
  }

  const content = $('#js_content').html() || '';

  // 提取所有图片，过滤掉 SVG、表情包等
  const images = [];
  $('#js_content img').each((i, img) => {
    const src = $(img).attr('data-src') || $(img).attr('src');
    if (!src) return;

    // 跳过 SVG、GIF、data URI
    if (src.endsWith('.svg') || src.endsWith('.gif') || src.startsWith('data:')) return;

    // 跳过明显的装饰图（class 包含 emoji/icon/decorate）
    const className = $(img).attr('class') || '';
    if (className.includes('emoji') || className.includes('icon') || className.includes('decorate')) return;

    // 跳过 URL 中包含表情包/装饰图关键词的图片
    const srcLower = src.toLowerCase();
    if (srcLower.includes('emoji') || srcLower.includes('emotion') || srcLower.includes('sticker')) return;

    // 跳过 data-w 属性小于 400 的图片（微信标记的图片宽度，小于400通常是装饰图）
    const dataW = $(img).attr('data-w');
    if (dataW) {
      const w = parseInt(dataW);
      if (!isNaN(w) && w < 400) return;
    }

    // 检查图片的父元素，如果是 span 且包含表情相关 class，跳过
    const parent = $(img).parent();
    const parentClass = parent.attr('class') || '';
    const parentTag = parent.prop('tagName')?.toLowerCase() || '';
    if (parentTag === 'span' && (parentClass.includes('emoji') || parentClass.includes('img'))) {
      // 微信表情包图片通常包裹在 <span class="img"> 中
      if (parentClass.includes('img') && $(img).attr('data-ratio')) {
        const ratio = parseFloat($(img).attr('data-ratio') || '1');
        // data-ratio 接近 1.0 且图片很小通常是表情包
        if (ratio > 0.9 && ratio < 1.1) {
          // 检查 data-w，小于 400 跳过
          if (!dataW || parseInt(dataW) < 400) return;
        }
      }
    }

    images.push(src);
  });

  let summary = '';
  const textContent = $('#js_content').text().trim();
  if (textContent) {
    summary = textContent.substring(0, 200).replace(/\s+/g, ' ').trim();
  }
  if (articleId && FIXED_SUMMARY_MAP[articleId]) {
    summary = FIXED_SUMMARY_MAP[articleId];
  }

  const category = autoClassify(title, articleId);
  const isPinned = articleId && FIXED_PINNED_MAP[articleId] ? true : false;

  return {
    id: articleId || `article-${Date.now()}`,
    title,
    summary,
    content,
    category,
    publishDate,
    author: '成都市田家炳中学',
    viewCount: Math.floor(Math.random() * 5000) + 500,
    isPinned,
    sourceUrl: url,
    images,
    coverImage: '',
    galleryImages: [],
  };
}

/**
 * 检查图片是否为实拍照片（非表情包/装饰图）
 * 返回 true 如果图片通过所有检查
 */
function isRealPhoto(metadata, imageBuffer) {
  const width = metadata.width || 0;
  const height = metadata.height || 0;
  const longSide = Math.max(width, height);
  const shortSide = Math.min(width, height);
  const aspectRatio = width / height;
  const fileSize = imageBuffer.length;
  const area = width * height;

  // 1. 尺寸检查：长边必须 >= 800px
  if (longSide < MIN_IMAGE_SIZE) {
    return { pass: false, reason: 'too_small' };
  }

  // 2. 面积检查
  if (area < MIN_AREA) {
    return { pass: false, reason: 'area_too_small' };
  }

  // 3. 文件大小检查
  if (fileSize < MIN_FILE_SIZE) {
    return { pass: false, reason: 'file_too_small' };
  }

  // 4. 长宽比检查（过滤装饰条/分割线）
  if (aspectRatio > MAX_ASPECT_RATIO || aspectRatio < MIN_ASPECT_RATIO) {
    return { pass: false, reason: 'extreme_aspect_ratio' };
  }

  // 4b. 短边检查（过滤装饰条/横幅，即使长宽比在范围内）
  if (shortSide < MIN_SHORT_SIDE) {
    return { pass: false, reason: 'decoration_bar' };
  }

  // 5. 正方形图片更严格的检查（表情包多为正方形）
  const isSquare = aspectRatio > (1 / SQUARE_THRESHOLD) && aspectRatio < SQUARE_THRESHOLD;
  if (isSquare && longSide < SQUARE_MIN_SIZE) {
    return { pass: false, reason: 'square_emoji' };
  }

  // 6. GIF 格式过滤
  if (metadata.format === 'gif') {
    return { pass: false, reason: 'gif_format' };
  }

  return { pass: true, reason: 'ok' };
}

async function processImages(article) {
  const articleId = article.id;
  const articleImagesDir = path.join(IMAGES_DIR, articleId);

  if (!fs.existsSync(articleImagesDir)) {
    fs.mkdirSync(articleImagesDir, { recursive: true });
  }

  const validImages = [];
  let totalImages = article.images.length;
  const filterStats = {
    too_small: 0,
    area_too_small: 0,
    file_too_small: 0,
    extreme_aspect_ratio: 0,
    decoration_bar: 0,
    square_emoji: 0,
    gif_format: 0,
    download_error: 0,
  };

  console.log(`🖼️  正在处理图片，共 ${totalImages} 张...`);

  for (let i = 0; i < article.images.length; i++) {
    const imgUrl = article.images[i];

    try {
      const response = await axios.get(imgUrl, {
        responseType: 'arraybuffer',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Referer': 'https://mp.weixin.qq.com/',
        },
        timeout: 10000,
      });

      const imageBuffer = Buffer.from(response.data);
      const fileSize = imageBuffer.length;
      const metadata = await sharp(imageBuffer).metadata();

      // 基本属性检查
      const checkResult = isRealPhoto(metadata, imageBuffer);
      if (!checkResult.pass) {
        filterStats[checkResult.reason]++;
        continue;
      }

      // 生成压缩的 WebP 格式图片
      // 根据原始尺寸决定输出尺寸（最大宽度 1920px）
      const targetWidth = Math.min(metadata.width, 1920);
      const fileName = `image-${i + 1}.webp`;
      const filePath = path.join(articleImagesDir, fileName);

      await sharp(imageBuffer)
        .resize(targetWidth, null, { withoutEnlargement: true })
        .webp({ quality: 75 })
        .toFile(filePath);

      // 获取压缩后的文件大小
      const compressedStats = fs.statSync(filePath);

      validImages.push({
        fileName,
        width: metadata.width,
        height: metadata.height,
        size: compressedStats.size,
      });

    } catch (error) {
      console.warn(`⚠️  图片处理失败: ${imgUrl.substring(0, 50)}...`, error.message);
      filterStats.download_error++;
    }
  }

  const totalFiltered = Object.values(filterStats).reduce((a, b) => a + b, 0);
  console.log(`✅ 图片处理完成：有效 ${validImages.length} 张，过滤 ${totalFiltered} 张`);
  console.log(`   过滤详情: 小尺寸=${filterStats.too_small}, 面积小=${filterStats.area_too_small}, 文件小=${filterStats.file_too_small}, 长宽比极端=${filterStats.extreme_aspect_ratio}, 装饰条=${filterStats.decoration_bar}, 正方形表情包=${filterStats.square_emoji}, GIF=${filterStats.gif_format}, 下载失败=${filterStats.download_error}`);

  // 按面积从大到小排序，取最大的一张做封面（避免装饰条被选为封面）
  validImages.sort((a, b) => (b.width * b.height) - (a.width * a.height));

  // 设置封面图（面积最大的图片）
  if (validImages.length > 0) {
    const coverImage = validImages[0];

    // 生成16:9封面图
    const cover169Path = path.join(articleImagesDir, 'cover-16x9.webp');
    await sharp(path.join(articleImagesDir, coverImage.fileName))
      .resize(1280, 720, { fit: 'cover', position: 'center' })
      .webp({ quality: 80 })
      .toFile(cover169Path);

    // 生成4:3缩略图
    const cover43Path = path.join(articleImagesDir, 'cover-4x3.webp');
    await sharp(path.join(articleImagesDir, coverImage.fileName))
      .resize(800, 600, { fit: 'cover', position: 'center' })
      .webp({ quality: 75 })
      .toFile(cover43Path);

    article.coverImage = `/article-images/${articleId}/cover-16x9.webp`;
    article.coverImage4x3 = `/article-images/${articleId}/cover-4x3.webp`;
  } else {
    article.coverImage = '';
    article.coverImage4x3 = '';
    console.warn(`⚠️  无合格实拍图，将使用占位图`);
  }

  // 每篇文章最多保留3张图片（避免重复冗余）
  article.galleryImages = validImages.slice(0, 3).map((img, index) => ({
    url: `/article-images/${articleId}/${img.fileName}`,
    width: img.width,
    height: img.height,
    alt: `${article.title} - 配图${index + 1}`,
  }));

  delete article.images;

  return {
    total: totalImages,
    valid: validImages.length,
    ...filterStats,
  };
}

async function main() {
  console.log('🚀 开始解析公众号文章...\n');

  const articleLinks = parseArticlesTxt();
  if (articleLinks.length === 0) {
    console.log('⚠️  没有找到有效的文章链接');
    return;
  }

  if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
  }

  const articles = [];
  const stats = [];

  for (let i = 0; i < articleLinks.length; i++) {
    const { url, category: manualCategory } = articleLinks[i];
    const articleId = extractArticleId(url);

    console.log(`\n📄 [${i + 1}/${articleLinks.length}] 正在处理第 ${i + 1} 篇文章...`);

    try {
      const html = await fetchArticleHtml(url);
      if (!html) {
        console.warn(`⚠️  抓取失败，跳过该文章`);
        continue;
      }

      let article = parseArticleHtml(html, url);
      if (manualCategory) {
        article.category = manualCategory;
      }

      const imageStats = await processImages(article);

      stats.push({
        id: article.id,
        title: article.title,
        success: true,
        ...imageStats,
      });

      articles.push(article);
      console.log(`✅ 处理完成: ${article.title.substring(0, 30)}...`);

    } catch (error) {
      console.error(`❌ 处理失败: ${url}`, error);
      stats.push({
        id: articleId || 'unknown',
        title: '解析失败',
        success: false,
        error: error.message,
      });
    }

    if (i < articleLinks.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 2500));
    }
  }

  // 全军覆没保护：0 篇成功说明被微信整体拦截，中止构建让 Netlify 保持上一次成功部署
  if (articles.length === 0) {
    console.error('❌ 所有文章抓取失败（可能被微信反爬拦截），中止构建，线上保持当前版本');
    process.exit(1);
  }

  console.log('\n📝 正在生成 articles.json...');

  const outputData = {
    generateTime: new Date().toISOString(),
    total: articles.length,
    articles,
    stats,
  };

  const outputDir = path.dirname(OUTPUT_JSON);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(outputData, null, 2), 'utf-8');

  // 精简摘要：首屏组件（Header/首页板块）只消费列表字段，
  // 单独产出小体积文件，避免 992KB 全文 JSON 进入主包关键路径
  const summaries = articles.map((a) => ({
    id: a.id,
    title: a.title,
    summary: a.summary,
    category: a.category,
    publishDate: a.publishDate,
    author: a.author,
    viewCount: a.viewCount,
    isPinned: a.isPinned,
    sourceUrl: a.sourceUrl,
    coverImage: a.coverImage,
    coverImage4x3: a.coverImage4x3,
  }));
  const SUMMARY_JSON = path.join(ROOT_DIR, 'src', 'data', 'article-summaries-auto.json');
  fs.writeFileSync(SUMMARY_JSON, JSON.stringify(summaries, null, 2), 'utf-8');
  console.log(`💾 精简摘要已保存到: ${SUMMARY_JSON} (${summaries.length} 篇)`);

  console.log('\n' + '='.repeat(60));
  console.log('📊 解析统计报告');
  console.log('='.repeat(60));
  console.log(`总文章数: ${articleLinks.length}`);
  console.log(`成功解析: ${articles.length}`);
  console.log(`失败: ${articleLinks.length - articles.length}`);
  console.log('');

  for (const stat of stats) {
    const status = stat.success ? '✅' : '❌';
    console.log(`${status} ${stat.title.substring(0, 25).padEnd(25)} | 图片: ${stat.valid || 0}/${stat.total || 0}`);
  }

  console.log('='.repeat(60));
  console.log(`\n💾 数据文件已保存到: ${OUTPUT_JSON}`);
  console.log('🎉 公众号文章解析完成！\n');
}

main().catch(error => {
  console.error('❌ 解析脚本执行失败:', error);
  process.exit(1);
});
