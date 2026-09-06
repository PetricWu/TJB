import { NavLink } from 'react-router-dom';
import { Image } from '@/components/ui/image';

const SCHOOL_BADGE = '/images/38Bp1wfimz-thumb.webp';
const WECHAT_QR = '/images/CrTl1wfimz.webp';
const CENTENARY_ICON = '/images/XtGR1wfimz.webp';

const FOOTER_LINKS = [
  {
    title: '学校概况',
    links: [
      { label: '百年校史', path: '/about' },
      { label: '办学理念', path: '/about' },
      { label: '师资队伍', path: '/about' },
      { label: '校园环境', path: '/about' },
      { label: '荣誉资质', path: '/about' },
    ],
  },
  {
    title: '新闻中心',
    links: [
      { label: '校园要闻', path: '/news' },
      { label: '通知公告', path: '/news' },
      { label: '媒体报道', path: '/news' },
      { label: '校庆专题', path: '/news' },
    ],
  },
  {
    title: '快速链接',
    links: [
      { label: '教学教研', path: '/teaching' },
      { label: '科创特色', path: '/innovation' },
      { label: '德育园地', path: '/moral' },
      { label: '学生发展', path: '/student' },
      { label: '招生招聘', path: '/admission' },
    ],
  },
  {
    title: '联系我们',
    links: [
      { label: '高中部：锦江区顺江路369号', path: '#' },
      { label: '联系电话：028-84551880', path: '#' },
      { label: '教务处：028-84513739', path: '#' },
      { label: '艺体专线：028-84551677', path: '#' },
      { label: '邮编：610061', path: '#' },
    ],
  },
];

// 前 3 组作为顶部紧凑链接列；最后一组「联系我们」并入中部位置卡片，保留全部链接数据
const NAV_GROUPS = FOOTER_LINKS.slice(0, 3);
const CONTACT_LINES = FOOTER_LINKS[3].links.map((link) => link.label);

export default function Footer() {
  return (
    <footer className="relative overflow-hidden w-full bg-gradient-to-b from-primary to-primary/95 text-primary-foreground/90 border-t-4 border-accent">
      {/* 与全站一致的细微网格纹理 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(hsl(22 72% 60%) 1px, transparent 1px), linear-gradient(90deg, hsl(22 72% 60%) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
        {/* 顶部：校名刊头 + 紧凑链接列（非对称 5/7） */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-14 md:mb-16">
          {/* 左侧：校徽 + 校名 + 校训 + 百年标识 */}
          <div className="md:col-span-5 flex flex-col">
            <div className="flex items-start gap-4">
              <div className="size-14 shrink-0 rounded-sm overflow-hidden bg-primary-foreground/5 border-2 border-primary-foreground/15 flex items-center justify-center">
                <Image
                  src={SCHOOL_BADGE}
                  alt="成都市田家炳中学校徽"
                  className="size-10 object-contain"
                />
              </div>
              <div className="flex flex-col">
                <h2 className="font-serif text-xl md:text-2xl font-black text-primary-foreground leading-tight tracking-wide">
                  成都市田家炳中学
                </h2>
                <p className="font-english text-xs md:text-sm text-primary-foreground/50 mt-1 tracking-[0.12em] uppercase">
                  Chengdu Tianjiabing High School
                </p>
              </div>
            </div>

            {/* 校训 */}
            <p className="font-serif text-base md:text-lg font-bold text-accent mt-7 tracking-[0.25em]">
              履仁崇智 明德卓行
            </p>
            <p className="font-sans text-xs text-primary-foreground/40 mt-2 tracking-wide">
              校训 · 四川省一级示范性普通高中
            </p>

            {/* 百年图标 */}
            <div className="flex items-center gap-2 mt-6">
              <Image
                src={CENTENARY_ICON}
                alt="百年田中"
                className="h-6 max-h-6 max-w-24 w-auto object-contain opacity-70"
              />
              <span className="font-display text-xs text-primary-foreground/40 tracking-wider">
                1925—2026
              </span>
            </div>
          </div>

          {/* 右侧：3 列紧凑链接 */}
          <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {NAV_GROUPS.map((group) => (
              <div key={group.title} className="min-w-0">
                <h3 className="flex items-center gap-2 font-sans text-xs font-bold text-accent mb-3.5 tracking-[0.15em]">
                  <span className="size-1.5 bg-accent" aria-hidden />
                  {group.title}
                </h3>
                <ul className="space-y-2">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <NavLink
                        to={link.path}
                        className="font-sans text-sm text-primary-foreground/60 hover:text-accent transition-colors duration-200"
                      >
                        {link.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 中部：学校位置 + 联系方式（非对称卡片 8/4，左对齐） */}
        <div className="rounded-sm border-2 border-primary-foreground/15 bg-primary-foreground/[0.04] overflow-hidden mb-12">
          <div className="grid grid-cols-1 md:grid-cols-12">
            {/* 左侧主区：地址 + 联系方式 + 导航 */}
            <div className="md:col-span-8 p-6 md:p-8">
              <h3 className="flex items-center gap-2 font-sans text-xs font-bold text-accent mb-6 tracking-[0.15em]">
                <span className="size-1.5 bg-accent" aria-hidden />
                学校位置 · 联系我们
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-7">
                <div>
                  <p className="font-sans text-sm font-medium text-primary-foreground/90 mb-1.5">
                    高中部
                  </p>
                  <p className="font-sans text-sm text-primary-foreground/60 leading-relaxed">
                    成都市锦江区顺江路369号
                  </p>
                  <p className="font-sans text-xs text-primary-foreground/40 mt-1.5 leading-relaxed">
                    地铁6号线/13号线三官堂站A口出站50米即达
                  </p>
                </div>
                <div>
                  <p className="font-sans text-sm font-medium text-primary-foreground/90 mb-1.5">
                    初中部
                  </p>
                  <p className="font-sans text-sm text-primary-foreground/60 leading-relaxed">
                    成都市锦江区莲新小区
                  </p>
                </div>
              </div>

              {/* 联系方式（来自 FOOTER_LINKS「联系我们」组，保留全部数据） */}
              <div className="flex flex-wrap gap-x-6 gap-y-1.5 mb-6">
                {CONTACT_LINES.map((item) => (
                  <span
                    key={item}
                    className="font-sans text-xs text-primary-foreground/50"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* 导航按钮 */}
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://uri.amap.com/search?keyword=成都市田家炳中学高中部&city=成都&src=webapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 rounded-sm bg-accent text-white text-xs font-bold border-2 border-accent neo-shadow-sm transition-transform hover:-translate-y-0.5"
                >
                  高德地图导航
                </a>
                <a
                  href="https://map.baidu.com/search/成都市田家炳中学高中部"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 rounded-sm bg-primary-foreground/10 text-primary-foreground/90 text-xs font-bold border-2 border-primary-foreground/25 transition-colors hover:bg-primary-foreground/20"
                >
                  百度地图导航
                </a>
              </div>
            </div>

            {/* 右侧副区：微信公众号二维码 */}
            <div className="md:col-span-4 p-6 md:p-8 border-t md:border-t-0 md:border-l border-primary-foreground/15 bg-primary-foreground/[0.02]">
              <h3 className="flex items-center gap-2 font-sans text-xs font-bold text-accent mb-4 tracking-[0.15em]">
                <span className="size-1.5 bg-accent" aria-hidden />
                关注我们
              </h3>
              <div className="bg-white rounded-sm p-2 inline-block border-2 border-primary-foreground/20">
                <Image
                  src={WECHAT_QR}
                  alt="成都市田家炳中学微信公众号二维码"
                  className="w-28 h-28 object-contain rounded"
                />
              </div>
              <p className="font-sans text-xs text-primary-foreground/50 mt-3 leading-relaxed">
                扫码关注官方微信公众号
                <br />
                获取最新校园资讯
              </p>
            </div>
          </div>
        </div>

        {/* 底部：版权 + 作者链接（极简） */}
        <div className="border-t border-primary-foreground/10 pt-6 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <p className="font-sans text-xs text-primary-foreground/40 leading-relaxed">
            © <span className="font-display">{new Date().getFullYear()}</span>{' '}
            成都市田家炳中学 版权所有
          </p>
          <p className="font-sans text-xs text-primary-foreground/40 flex flex-wrap items-center gap-x-3 gap-y-1">
            作者主页：
            <a
              href="https://www.petricw.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-display font-bold text-accent/80 hover:text-accent transition-colors"
            >
              petricw.com
            </a>
            <span className="text-primary-foreground/25">·</span>
            <span>
              QQ：<span className="font-display font-bold text-accent/80">PetricWoo</span>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
