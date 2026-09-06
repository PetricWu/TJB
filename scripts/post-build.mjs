/**
 * Post-build cleanup script
 * 1. Replaces 秒搭 template variables in index.html
 * 2. Removes monitoring scripts from index.html
 * 3. Strips Slardar/Tea monitoring code from built JS files
 *    (these are bundled by @lark-apaas/client-toolkit-lite and create
 *     the "妙搭悬浮窗" floating widget at runtime)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const HTML_PATH = path.join(ROOT_DIR, 'dist', 'client', 'index.html');
const ASSETS_DIR = path.join(ROOT_DIR, 'dist', 'client', 'assets');

const SITE_TITLE = '成都市田家炳中学官网 - 百年名校·四川省一级示范性普通高中';
const SITE_DESCRIPTION = '成都市田家炳中学始建于1925年，始称成城公学，是四川省一级示范性普通高中，全国国防教育示范校。百年名校，薪火相传，秉承履仁崇智 明德卓行校训，提供优质初中、高中教育，成都市六年贯通培养试点学校。位于成都市锦江区顺江路369号。';
const FAVICON_PATH = '/favicon.jpg';
const OG_IMAGE = 'https://tjb.petricw.com/hero-bg.webp';

function fixHtml() {
  if (!fs.existsSync(HTML_PATH)) {
    console.error('❌ dist/client/index.html not found');
    process.exit(1);
  }

  let html = fs.readFileSync(HTML_PATH, 'utf-8');
  // Ensure proper encoding
  html = Buffer.from(html, 'utf-8').toString('utf-8');
  let changes = [];

  // Remove monitoring script blocks
  const patterns = [
    { regex: /<script>window\.appId[\s\S]*?<\/script>/, name: 'window variables block' },
    { regex: /<script>\(function\(g\)\{[\s\S]*?\}\)\('KSlardarWeb'\);<\/script>/, name: 'Slardar error capture' },
    { regex: /<script>const slardarScript[\s\S]*?document\.head\.appendChild\(slardarScript\);<\/script>/, name: 'Slardar SDK loader' },
    { regex: /<script[^>]*src="https:\/\/sf3-scmcdn-cn\.feishucdn\.com\/obj\/unpkg\/byted\/performance[\s\S]*?<\/script>/, name: 'Performance monitoring' },
    { regex: /<script>[\s\S]*?collectEvent[\s\S]*?appendChild\(teaScript\);<\/script>/, name: 'Tea analytics' },
    { regex: /<script[^>]*collect\.js[^>]*><\/script>/g, name: 'Tea collect script ref' },
  ];

  for (const { regex, name } of patterns) {
    const beforeLen = html.length;
    html = html.replace(regex, '');
    if (html.length !== beforeLen) changes.push(name);
  }

  // Replace template variables
  html = html.replace(/<title>\{\{appName\}\}<\/title>/, `<title>${SITE_TITLE}</title>`);
  html = html.replace(
    /<link rel="icon"[^>]*href="\{\{appAvatar\}\}">/,
    `<link rel="icon" type="image/jpeg" href="${FAVICON_PATH}">`
  );
  html = html.replace(
    /<meta name="description" content="\{\{appDescription\}\}">/,
    `<meta name="description" content="${SITE_DESCRIPTION}">`
  );
  html = html.replace(
    /<meta property="og:title" content="\{\{appName\}\}">/,
    `<meta property="og:title" content="${SITE_TITLE}">`
  );
  html = html.replace(
    /<meta property="og:description" content="\{\{appDescription\}\}">/,
    `<meta property="og:description" content="${SITE_DESCRIPTION}">`
  );
  html = html.replace(
    /<meta property="og:image" content="\{\{appAvatar\}\}">/,
    `<meta property="og:image" content="${OG_IMAGE}">`
  );
  html = html.replace(/"logo":\s*"\/favicon\.svg"/, `"logo": "${FAVICON_PATH}"`);

  // Clean up any remaining template variables
  html = html.replace(/\{\{appName\}\}/g, SITE_TITLE);
  html = html.replace(/\{\{appDescription\}\}/g, SITE_DESCRIPTION);
  html = html.replace(/\{\{appAvatar\}\}/g, FAVICON_PATH);
  // Fix OG image dimensions that may have been corrupted by appAvatar replacement
  html = html.replace(
    /<meta property="og:image:width" content="[^"]*">/,
    '<meta property="og:image:width" content="1200">'
  );
  html = html.replace(
    /<meta property="og:image:height" content="[^"]*">/,
    '<meta property="og:image:height" content="630">'
  );
  html = html.replace(/\{\{appId\}\}/g, '');
  html = html.replace(/\{\{userId\}\}/g, '');
  html = html.replace(/\{\{tenantId\}\}/g, '');
  html = html.replace(/\{\{csrfToken\}\}/g, '');
  html = html.replace(/\{\{environment\}\}/g, '');

  fs.writeFileSync(HTML_PATH, html, 'utf-8');
  console.log('✅ HTML cleanup complete');
  console.log(`   Title: ${SITE_TITLE}, Favicon: ${FAVICON_PATH}`);
  console.log(`   Removed: ${changes.join(', ') || 'nothing'}`);
}

/**
 * Fix CSS font URLs.
 * Remove render-blocking font @import from CSS files.
 * Font loading is handled non-blockingly in index.html.
 */
function fixCssFiles() {
  if (!fs.existsSync(ASSETS_DIR)) return;

  const cssFiles = fs.readdirSync(ASSETS_DIR).filter(f => f.endsWith('.css'));
  let fixed = 0;

  for (const cssFile of cssFiles) {
    const cssPath = path.join(ASSETS_DIR, cssFile);
    let css = fs.readFileSync(cssPath, 'utf-8');
    let modified = false;

    // Remove render-blocking Google Fonts @import from CSS
    // (font loading is handled non-blockingly in index.html)
    if (css.includes('fonts.googleapis.com/css2')) {
      css = css.replace(/@import\s+["']https:\/\/fonts\.googleapis\.com\/css2[^"']*["'];?\s*/g, '');
      modified = true;
    }
    // Also remove 妙搭 mirror @import
    if (css.includes('miaoda.feishu.cn/fonts/css2')) {
      css = css.replace(/@import\s+["']https:\/\/miaoda\.feishu\.cn\/fonts\/css2[^"']*["'];?\s*/g, '');
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(cssPath, css, 'utf-8');
      fixed++;
      console.log(`   ✓ Removed render-blocking font @import from ${cssFile}`);
    }
  }

  if (fixed > 0) {
    console.log(`✅ CSS cleanup complete: ${fixed} files fixed`);
  }
}

/**
 * Strip Slardar/Tea monitoring from built JS files.
 * The @lark-apaas/client-toolkit-lite bundles these monitoring SDKs which
 * create a floating "妙搭" widget and send telemetry data at runtime.
 *
 * We neutralize the init calls by replacing the functions with no-ops.
 */
function fixJsFiles() {
  if (!fs.existsSync(ASSETS_DIR)) {
    console.log('⚠️  No assets directory found, skipping JS cleanup');
    return;
  }

  const jsFiles = fs.readdirSync(ASSETS_DIR).filter(f => f.endsWith('.js'));
  let totalFixed = 0;

  for (const jsFile of jsFiles) {
    const jsPath = path.join(ASSETS_DIR, jsFile);
    let js = fs.readFileSync(jsPath, 'utf-8');
    let modified = false;

    // 1. Neutralize Slardar init: replace `KSlardarWeb` string with empty
    if (js.includes('KSlardarWeb')) {
      js = js.replace(/['"`]KSlardarWeb['"`]/g, '""');
      modified = true;
    }

    // 2. Neutralize collectEvent init calls
    // Replace window.collectEvent?.('init',...) with void
    if (js.includes('collectEvent')) {
      js = js.replace(
        /window\.collectEvent\?\.\(\s*['"`]init['"`]\s*,[\s\S]*?\}\)/g,
        'void 0'
      );
      // Also neutralize the start call
      js = js.replace(
        /window\.collectEvent\?\.\(\s*['"`]start['"`]\s*\)/g,
        'void 0'
      );
      // Neutralize config call
      js = js.replace(
        /window\.collectEvent\?\.\(\s*['"`]config['"`]\s*,[\s\S]*?\}\)/g,
        'void 0'
      );
      // Neutralize any remaining collectEvent calls
      js = js.replace(
        /window\.collectEvent\?\.\(/g,
        'void('
      );
      modified = true;
    }

    // 3. Neutralize slardar sendLog
    if (js.includes('sendLog')) {
      js = js.replace(
        /sendLog\s*\([^)]*\)\s*\{/g,
        'sendLog(){return;'
      );
      modified = true;
    }

    // 4. Neutralize the createTracker function (initializes Tea analytics)
    if (js.includes('createTracker')) {
      js = js.replace(
        /async\s+function\s+\w+\([^)]*\)\s*\{[^}]*createTracker[\s\S]*?\}/g,
        'async function noopTracker(){return;}'
      );
      modified = true;
    }

    // 5. Neutralize getSlardarInstance
    if (js.includes('getSlardarInstance')) {
      js = js.replace(
        /getSlardarInstance/g,
        'getNoopInstance'
      );
      modified = true;
    }

    // 6. Prevent any script element creation for monitoring
    if (js.includes('teaScript') || js.includes('slardarScript')) {
      js = js.replace(
        /document\.head\.appendChild\((?:teaScript|slardarScript)\)/g,
        'void 0'
      );
      modified = true;
    }

    // 7. Remove the "doubao-watermark" floating widget (妙搭悬浮窗)
    // The Watermark component creates a div with data-custom-element="doubao-watermark"
    // at position:fixed; right:12px; bottom:12px; z-index:9999
    if (js.includes('doubao-watermark') || js.includes('data-custom-element')) {
      // Replace the watermark div creation with null
      js = js.replace(
        /data-custom-element="doubao-watermark"/g,
        'data-removed="true"'
      );
      // Neutralize the watermark component's createElement call
      // The pattern is: createElement("div",{...,"data-custom-element":"doubao-watermark",...})
      // We replace the entire watermark render with null
      js = js.replace(
        /createElement\(["']div["'],\{[^}]*data-custom-element["':\s]*["']doubao-watermark["'][^}]*\}/g,
        'null'
      );
      modified = true;
    }

    // 8. Remove "MobileWatermark" component rendering
    if (js.includes('MobileWatermark')) {
      // Replace MobileWatermark function with a no-op that returns null
      js = js.replace(
        /MobileWatermark/g,
        'NoopWatermark'
      );
      modified = true;
    }

    // 9. Remove "Watermark" component rendering (case-sensitive, not MobileWatermark)
    // This targets the Watermark component definition and render calls
    if (js.includes('"Watermark"') || js.includes("'Watermark'")) {
      js = js.replace(/["']Watermark["']/g, '"NoopWM"');
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(jsPath, js, 'utf-8');
      totalFixed++;
      console.log(`   ✓ Cleaned monitoring code from ${jsFile}`);
    }
  }

  console.log(`✅ JS cleanup complete: ${totalFixed}/${jsFiles.length} files modified`);
}

/**
 * Remove ALL miaoda.feishu.cn references from dist files.
 * Replace with Google Fonts original URL.
 */
function removeMiaodaFeishu() {
  if (!fs.existsSync(ASSETS_DIR)) return;

  // Fix HTML
  if (fs.existsSync(HTML_PATH)) {
    let html = fs.readFileSync(HTML_PATH, 'utf-8');
    if (html.includes('miaoda.feishu.cn')) {
      // Replace all miaoda.feishu.cn references with Google Fonts equivalents
      html = html.replace(/https:\/\/miaoda\.feishu\.cn\/fonts\//g, 'https://fonts.googleapis.com/');
      // Replace preconnect href
      html = html.replace(/href="https:\/\/miaoda\.feishu\.cn\/fonts"/g, 'href="https://fonts.googleapis.com"');
      // Remove duplicate preconnect for same domain
      html = html.replace(/(<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com" crossorigin>)\s*\1/g, '$1');
      fs.writeFileSync(HTML_PATH, html, 'utf-8');
      console.log('   ✓ Removed miaoda.feishu.cn from index.html');
    }
  }

  // Fix JS files
  const jsFiles = fs.readdirSync(ASSETS_DIR).filter(f => f.endsWith('.js') && !f.endsWith('.map'));
  let fixed = 0;
  for (const jsFile of jsFiles) {
    const jsPath = path.join(ASSETS_DIR, jsFile);
    let js = fs.readFileSync(jsPath, 'utf-8');
    if (js.includes('miaoda.feishu.cn')) {
      js = js.replace(/https:\/\/miaoda\.feishu\.cn\/fonts\//g, 'https://fonts.googleapis.com/');
      js = js.replace(/["']https:\/\/miaoda\.feishu\.cn["']/g, '"https://fonts.googleapis.com"');
      js = js.replace(/https:\/\/miaoda\.feishu\.cn\/fonts/g, 'https://fonts.googleapis.com');
      // Replace all remaining miaoda.feishu.cn references (SDK runtime logic)
      js = js.replace(/miaoda\.feishu\.cn/g, 'fonts.googleapis.com');
      js = js.replace(/miaoda\.feishu-pre\.cn/g, 'fonts.googleapis.com');
      fs.writeFileSync(jsPath, js, 'utf-8');
      fixed++;
    }
  }
  if (fixed > 0) {
    console.log(`   ✓ Removed miaoda.feishu.cn from ${fixed} JS files`);
  }
}

fixHtml();
fixCssFiles();
fixJsFiles();
removeMiaodaFeishu();

// Delete source map files from production build
const mapFiles = fs.existsSync(ASSETS_DIR)
  ? fs.readdirSync(ASSETS_DIR).filter(f => f.endsWith('.map'))
  : [];
for (const mapFile of mapFiles) {
  fs.unlinkSync(path.join(ASSETS_DIR, mapFile));
}
if (mapFiles.length > 0) {
  console.log(`✅ Removed ${mapFiles.length} source map files`);
}

console.log('\n🎉 Post-build cleanup complete!');
