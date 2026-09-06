# 成都市田家炳中学官网

> 🌐 **在线访问**: [https://tjb.petricw.com](https://tjb.petricw.com)

始建于1925年，始称成城公学，百年名校。四川省一级示范性普通高中，全国国防教育示范校，教育部人工智能教育双试点单位。

---

## 项目简介

本项目是成都市田家炳中学的官方网站，基于 React + TypeScript + Vite 构建，采用现代化的前端技术栈，提供学校概况、新闻中心、教学教研、科创特色、德育园地、学生发展、招生招聘等栏目展示。

## 技术栈

- **前端框架**: React 19 + TypeScript
- **构建工具**: Vite 8
- **样式方案**: Tailwind CSS 4 + shadcn/ui
- **路由**: React Router v7
- **动画**: Framer Motion + GSAP
- **部署平台**: Netlify
- **图片处理**: Sharp (构建时自动压缩)

## 功能特性

- 🏫 **学校概况**: 百年校史、办学理念、师资队伍、校园环境、荣誉资质
- 📰 **新闻中心**: 校园要闻、通知公告、教学教研、校庆专题（支持分类筛选和搜索）
- 📚 **教学教研**: 深度学习教学模式、教师专业发展体系
- 🔬 **科创特色**: 人工智能教育、机器人社团、科创竞赛成果
- 🎭 **德育园地**: 主题活动、心理健康教育、高三成长
- 🎨 **学生发展**: 艺术活动、体育活动、社团活动、实践活动
- 📋 **招生招聘**: 2026年招生简章、教师招聘信息
- 🎵 **背景音乐**: 自动播放校歌（支持移动端交互触发）
- 📱 **响应式设计**: 完美适配桌面端和移动端
- 🔍 **SEO 优化**: 结构化数据、百度站长验证、Sitemap

## 项目结构

```
├── public/                    # 静态资源
│   ├── images/               # 图片资源（校徽、校园照片等）
│   ├── article-images/       # 公众号文章图片
│   ├── teachers/             # 教师照片
│   ├── bgm.m4a              # 背景音乐
│   ├── favicon.jpg           # 网站图标
│   ├── hero-bg.webp          # 首页背景
│   ├── sitemap.xml           # 站点地图
│   └── robots.txt            # 爬虫规则
├── src/
│   ├── components/           # 通用组件
│   │   ├── Header.tsx        # 顶部导航栏
│   │   ├── Footer.tsx        # 页脚
│   │   ├── Layout.tsx        # 页面布局
│   │   ├── MusicPlayer.tsx   # 音乐播放器
│   │   └── ui/               # shadcn/ui 组件库
│   ├── pages/                # 页面组件
│   │   ├── HomePage/         # 首页
│   │   ├── AboutPage/        # 学校概况
│   │   ├── NewsListPage/     # 新闻列表
│   │   ├── NewsDetailPage/   # 新闻详情
│   │   ├── TeachingPage/     # 教学教研
│   │   ├── InnovationPage/   # 科创特色
│   │   ├── MoralPage/        # 德育园地
│   │   ├── StudentPage/      # 学生发展
│   │   ├── AdmissionPage/    # 招生招聘
│   │   └── NotFoundPage/     # 404 页面
│   ├── hooks/                # 自定义 Hooks
│   │   └── useSEO.ts         # SEO 管理
│   ├── data/                 # 数据文件
│   │   └── articles.json     # 公众号文章数据（构建时自动生成）
│   ├── lib/                  # 工具函数
│   └── App.tsx               # 应用入口
├── scripts/                  # 构建脚本
│   ├── parse-articles.mjs    # 公众号文章解析
│   └── post-build.mjs        # 构建后处理
├── netlify.toml              # Netlify 配置
├── _redirects                # SPA 路由重定向
└── index.html                # HTML 入口
```

## 快速开始

### 环境要求

- Node.js >= 18
- npm >= 9

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run dev
```

访问 `http://localhost:5173` 查看效果。

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist/client` 目录。

### 预览生产版本

```bash
npx vite preview
```

## 部署

### Netlify 部署（推荐）

1. 将代码推送到 GitHub
2. 在 Netlify 中连接 GitHub 仓库
3. 配置构建设置：
   - **Build command**: `node scripts/parse-articles.mjs || true && npx vite build && node scripts/post-build.mjs`
   - **Publish directory**: `dist/client`
4. 部署完成后，在 Netlify 中配置自定义域名 `tjb.petricw.com`

### 手动部署

```bash
# 构建
npm run build

# 上传 dist/client 目录到任意静态托管服务
```

## 公众号文章同步

项目支持自动同步微信公众号文章。在 `articles.txt` 中添加公众号文章链接，构建时会自动：

1. 抓取文章内容和图片
2. 过滤无效图片（小尺寸、表情包、装饰条等）
3. 压缩图片到 WebP 格式
4. 生成 `articles.json` 数据文件

## SEO 配置

- **百度站长验证**: 已配置 `baidu-site-verification` meta 标签
- **Sitemap**: `/sitemap.xml` 自动生成
- **结构化数据**: JSON-LD（EducationalOrganization + WebSite + BreadcrumbList）
- **Open Graph**: 支持社交媒体分享预览

## 域名

- **主域名**: `tjb.petricw.com`
- **旧域名**: 无

## 许可证

© 2026 成都市田家炳中学 版权所有

---

**校训**: 履仁崇智 明德卓行

**地址**: 成都市锦江区顺江路369号（高中部）

**联系电话**: 028-84551880
