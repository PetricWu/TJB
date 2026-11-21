import { Image } from '@/components/ui/image';
import { useSEO } from '@/hooks/useSEO';
import HeroSection from '@/pages/HomePage/HeroSection';
import NewsSection from '@/pages/HomePage/NewsSection';
import FeaturesSection from '@/pages/HomePage/FeaturesSection';
import EventsSection from '@/pages/HomePage/EventsSection';
import CampusLifeSection from '@/pages/HomePage/CampusLifeSection';
import { SectionHeader } from '@/components/SectionHeader';
import CountUp from '@/components/CountUp';
import { FEATURED_HONORS, type IHonorItem } from '@/data/honors';
import { PHILOSOPHY_STRIP } from '@/data/about';

const WECHAT_QR = '/images/avpP1wfhUo.webp';

/** 2025 年科创成果数据 */
const SCIENCE_STATS = [
  { value: 216, suffix: '人次', label: '2025 年参与各级科创赛事' },
  { value: 30, suffix: '余项', label: '国家级奖项' },
  { value: 60, suffix: '余项', label: '省级奖项' },
  { value: 2, suffix: '年', label: '连续获评全国「创新之星」' },
];

const LEVEL_BADGE: Record<IHonorItem['level'], string> = {
  国家级: 'bg-ink text-white',
  省级: 'bg-accent text-white',
  市级: 'bg-secondary text-ink',
};

export default function HomePage() {
  useSEO({
    title: '首页',
    description: '成都市田家炳中学官网 — 百年名校，四川省二级示范性普通高中（已通过省一级现场评审）。提供学校概况、招生信息、校园新闻、教学成果等全方位资讯。',
    breadcrumbs: [{ name: '首页', url: '/' }],
  });

  return (
    <div className="min-h-screen bg-transparent">
      <HeroSection />
      <FeaturesSection />

      {/* 办学理念条带 */}
      <section className="w-full bg-ink text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6 section-y">
          <div className="reveal-up">
            <div className="flex items-center gap-3 mb-10">
              <span className="w-1.5 h-5 bg-accent shrink-0" aria-hidden />
              <span className="font-english text-xs font-bold tracking-[0.28em] uppercase text-white/60">
                Philosophy — 办学理念
              </span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              <div className="lg:col-span-7">
                <p className="text-xs font-bold tracking-[0.3em] text-accent mb-4">
                  {PHILOSOPHY_STRIP.mottoLabel}
                </p>
                <p className="font-serif text-4xl md:text-6xl font-black leading-tight tracking-tight">
                  {PHILOSOPHY_STRIP.motto}
                </p>
                <blockquote className="mt-8 border-l-2 border-accent pl-4">
                  <p className="font-serif text-lg md:text-xl text-white/85 leading-relaxed">
                    「{PHILOSOPHY_STRIP.quote}」
                  </p>
                  <p className="mt-2 text-xs text-white/50">{PHILOSOPHY_STRIP.quoteSource}</p>
                </blockquote>
                <div className="mt-8">
                  <p className="text-xs text-white/50 tracking-[0.2em] mb-2">
                    {PHILOSOPHY_STRIP.ideaLabel}
                  </p>
                  <p className="font-serif text-xl md:text-2xl font-bold text-white">
                    {PHILOSOPHY_STRIP.idea}
                  </p>
                </div>
              </div>
              <div className="lg:col-span-5">
                <p className="text-xs font-bold tracking-[0.3em] text-white/50 mb-4">
                  {PHILOSOPHY_STRIP.curriculumLabel}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {PHILOSOPHY_STRIP.curriculum.map((item, i) => (
                    <div
                      key={item}
                      className="p-4 rounded-sm border-2 border-white/15 bg-white/5"
                    >
                      <span className="font-english text-xs text-accent tabular-nums">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <p className="mt-1 font-serif text-2xl font-black">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
                  <span className="font-bold text-white/90">{PHILOSOPHY_STRIP.classroomLabel}</span>
                  {PHILOSOPHY_STRIP.classroom.map((item) => (
                    <span key={item} className="text-white/60">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <NewsSection />
      <EventsSection />
      <CampusLifeSection />

      {/* 科创成果数字条 */}
      <section className="w-full bg-paper-deep border-y-2 border-ink/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 section-y-sm">
          <div className="reveal-up">
            <SectionHeader
              no="05"
              en="Innovation"
              title="科创成果"
              desc="从赛事参与到国家级奖项，科创教育成为田中学子的成长新赛道。"
            />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {SCIENCE_STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className="p-5 md:p-6 rounded-sm bg-card border-2 border-ink/20"
                >
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-4xl md:text-5xl font-black text-ink tabular-nums tracking-tight">
                      <CountUp value={stat.value} duration={1100} delay={i * 80} />
                    </span>
                    <span className="text-base font-bold text-accent">{stat.suffix}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{stat.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">注：以上为 2025 年数据。</p>
          </div>
        </div>
      </section>

      {/* 荣誉资质墙 */}
      <section className="w-full bg-paper border-b-2 border-ink/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 section-y-sm">
          <div className="reveal-up">
            <SectionHeader
              no="06"
              en="Honors"
              title="荣誉资质"
              desc="国家级、省级、市级荣誉，见证百年田中的办学品质。"
              link={{ to: '/about#honors', label: '查看全部' }}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {FEATURED_HONORS.map((honor) => (
                <article
                  key={honor.id}
                  className="h-full p-5 rounded-sm bg-card border-2 border-ink/25 hover:border-ink hover-neo-shadow transition-all duration-200"
                >
                  <span
                    className={`inline-block px-2 py-0.5 text-[11px] font-bold rounded-sm ${LEVEL_BADGE[honor.level]}`}
                  >
                    {honor.level}
                  </span>
                  <h3 className="mt-3 text-base font-bold text-ink font-serif leading-snug">
                    {honor.title}
                  </h3>
                  {(honor.year || honor.issuer) && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      {honor.year && <span className="tabular-nums">{honor.year}</span>}
                      {honor.year && honor.issuer && <span className="mx-1 text-ink/25">·</span>}
                      {honor.issuer}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 微信公众号二维码 */}
      <div className="w-full section-y bg-paper border-t-2 border-border/60">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="reveal-up text-center">
            <div className="inline-flex items-center gap-2.5 mb-5">
              <span className="size-2 bg-accent" aria-hidden />
              <span className="font-english text-xs font-bold tracking-[0.25em] uppercase text-muted-foreground">
                Follow Us · 关注我们
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-ink mb-2">
              关注官方微信公众号
            </h2>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-7">
              扫码关注成都市田家炳中学官方微信公众号，获取最新校园资讯
            </p>
            <div className="inline-block bg-white rounded-sm p-3 border-2 border-ink neo-shadow corner-mark">
              <Image
                src={WECHAT_QR}
                alt="成都市田家炳中学微信公众号二维码"
                className="w-36 h-36 md:w-40 md:h-40 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
