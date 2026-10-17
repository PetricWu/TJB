import { Link } from 'react-router-dom';
import {
  Award,
  BookOpen,
  Calendar,
  ExternalLink,
  Flag,
  GraduationCap,
  Landmark,
  Link2,
  Quote,
  Trophy,
  Users,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Image } from '@/components/ui/image';
import { PageHero } from '@/components/PageHero';
import { SectionHeader } from '@/components/SectionHeader';
import CountUp from '@/components/CountUp';
import { useSEO } from '@/hooks/useSEO';
import {
  CENTENARY_THEME,
  CENTENARY_MOTTO,
  CENTENARY_STATS,
  CENTENARY_MILESTONES,
  CENTENARY_WRITINGS,
  CENTENARY_FOUNDERS,
  CENTENARY_MENTOR_GROUPS,
  CENTENARY_ALUMNI,
  CENTENARY_YOUNG_ALUMNI,
  CENTENARY_GALA,
  CENTENARY_FEATURES,
  CENTENARY_HONORS,
  CENTENARY_SOURCES,
} from '@/data/centenary';

export default function CentenaryPage() {
  useSEO({
    title: '百年田中',
    description:
      '「公学成城 百年田中」——成都市田家炳中学建校百年（1925—2025）：百年校名沿革、创校先贤与育人典范、杰出校友、2025 年 12 月百年办学成果展纪实、办学特色与荣誉。校训「养仁爱之心 塑智慧人生」。',
    canonical: 'https://tjb.petricw.com/centenary',
    breadcrumbs: [
      { name: '首页', url: '/' },
      { name: '百年田中', url: '/centenary' },
    ],
  });

  return (
    <div className="min-h-screen bg-transparent">
      <PageHero
        no="03"
        en="Centenary"
        title="百年田中"
        desc='"公学成城，百年田中。"自 1925 年成城公学肇基，四易其名而文脉不断；2025 年 12 月，学校迎来建校百年。谨以此页，致敬百年弦歌，礼赞一代代田中人。'
      />

      {/* 百年主题横幅：全宽 ink 大字版式 */}
      <section id="spirit" className="relative w-full bg-ink overflow-hidden scroll-mt-32">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_20%_20%,white,transparent_60%)]"
        />
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="flex items-start gap-4">
                <Quote className="size-10 md:size-14 text-accent shrink-0" />
                <div className="min-w-0">
                  <p className="font-serif text-3xl md:text-5xl font-black text-white leading-tight tracking-tight">
                    {CENTENARY_THEME.title}
                  </p>
                  <p className="mt-4 text-sm md:text-base text-white/70">
                    {CENTENARY_THEME.subtitle} · {CENTENARY_THEME.years}
                  </p>
                  <p className="mt-2 text-sm md:text-base text-accent font-semibold">
                    办学思想：{CENTENARY_THEME.thought}
                  </p>
                </div>
              </div>
            </div>
            <div className="relative rounded-sm overflow-hidden border-2 border-white/15">
              <Image
                src="/images/centenary/centenary-logo.webp"
                alt="百年校庆标识：门楼图案与 1925—2025，公学成城 百年田中"
                className="w-full aspect-[423/312] object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {CENTENARY_MOTTO.map((item) => (
              <div key={item.label} className="p-5 rounded-sm border-2 border-white/15 bg-white/5">
                <p className="text-xs text-accent font-bold tracking-widest">{item.label}</p>
                <p className="mt-2 font-serif text-lg md:text-xl font-bold text-white leading-snug">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 数字统计带 */}
      <section className="w-full bg-card border-b-2 border-ink/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-12">
          <div className="flex items-center gap-3 mb-6">
            <Landmark className="size-5 text-accent" />
            <p className="text-sm font-bold text-ink tracking-wide">百年田中·数字概览</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
            {CENTENARY_STATS.map((stat, i) => (
              <div key={stat.label} className="text-center">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-3xl md:text-4xl font-black text-ink tabular-nums tracking-tight">
                    <CountUp value={Number(stat.value)} duration={1100} delay={i * 80} />
                  </span>
                  {stat.suffix && <span className="text-lg font-bold text-accent">{stat.suffix}</span>}
                </div>
                <div className="flex items-center justify-center gap-2 mt-1.5">
                  <span className="size-1.5 bg-accent shrink-0" aria-hidden />
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
                <p className="mt-1 text-xs text-muted-foreground/70 leading-relaxed">{stat.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-sm overflow-hidden border-2 border-ink/15">
            <Image
              src="/images/centenary/name-history.webp"
              alt="校名沿革：1925 私立成城公学、1957 成都市第十九中学、2003 成都市田家炳中学"
              className="w-full aspect-[1442/365] object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16 space-y-20 md:space-y-24">
        {/* 02 百年历路 */}
        <section id="timeline" className="scroll-mt-32">
          <div className="reveal-up">
            <SectionHeader
              no="02"
              en="Timeline"
              title="百年历路"
              desc="从东马棚街的成城公学到锦江北岸的田家炳中学，一条以「众志成城」为名的百年办学历程。"
            />
            <div className="rounded-sm overflow-hidden border-2 border-ink/15 mb-10">
              <Image
                src="/images/centenary/timeline-100.webp"
                alt="百年历路 世纪跫音——1925 至 2025 百年大事记长卷"
                className="w-full aspect-[1500/789] object-cover"
                loading="lazy"
              />
              <p className="px-4 py-2 text-xs text-muted-foreground bg-card border-t-2 border-ink/10">
                校史资料图片：《百年历路 世纪跫音》（校庆纪念画册）
              </p>
            </div>
            <div className="relative">
              <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-0.5 bg-ink/15 md:-translate-x-1/2" aria-hidden />
              <ol className="space-y-8">
                {CENTENARY_MILESTONES.map((milestone, i) => (
                  <li key={milestone.year} className="relative">
                    <div
                      className={`flex flex-col md:flex-row md:items-center gap-4 ${
                        i % 2 === 1 ? 'md:flex-row-reverse' : ''
                      }`}
                    >
                      <div className="flex items-center gap-4 md:w-1/2 md:justify-end">
                        <div
                          className={`relative z-10 shrink-0 order-1 ${
                            i % 2 === 1 ? 'md:order-2 md:ml-6' : 'md:mr-6'
                          }`}
                        >
                          <div className="size-14 rounded-full bg-ink border-4 border-accent flex items-center justify-center">
                            <span className="font-english text-sm font-black text-white tabular-nums">
                              {milestone.year}
                            </span>
                          </div>
                        </div>
                        {i % 2 === 1 && (
                          <div className="order-2 md:order-1 md:text-right">
                            <h3 className="text-lg font-black text-ink">{milestone.title}</h3>
                          </div>
                        )}
                        {i % 2 === 0 && (
                          <div className="hidden md:block md:text-right">
                            <h3 className="text-lg font-black text-ink">{milestone.title}</h3>
                          </div>
                        )}
                      </div>
                      <div className="pl-[60px] md:pl-0 md:w-1/2">
                        <div className="p-4 rounded-sm bg-card border-2 border-ink/20">
                          {i % 2 === 1 && <h3 className="md:hidden text-lg font-black text-ink mb-1">{milestone.title}</h3>}
                          <p className="text-sm leading-relaxed text-foreground/85">{milestone.description}</p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { src: '/images/centenary/history-declaration.webp', alt: '1925 年成城公学宣言' },
                { src: '/images/centenary/history-map.webp', alt: '成城中学校址平面图' },
                { src: '/images/centenary/history-1946.webp', alt: '1946 年毕业照' },
                { src: '/images/centenary/history-gate.webp', alt: '20 世纪 60 年代成都市第十九中学校门' },
              ].map((img) => (
                <figure key={img.src} className="rounded-sm overflow-hidden border-2 border-ink/15 bg-card">
                  <Image src={img.src} alt={img.alt} className="w-full aspect-[4/3] object-contain" loading="lazy" />
                </figure>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">校史资料图片：校庆纪念画册史料页</p>
          </div>
        </section>

        {/* 03 文脉篇章 */}
        <section id="legacy" className="scroll-mt-32">
          <div className="reveal-up">
            <SectionHeader
              no="03"
              en="Legacy"
              title="文脉篇章"
              desc="《百年成城 炳新而行》《众志成城 公学兴国》《百秩寄语》——百年文脉的字里行间。"
            />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {CENTENARY_WRITINGS.map((writing) => (
                <article key={writing.title} className="p-6 rounded-sm bg-card border-2 border-ink neo-shadow-sm">
                  <div className="flex items-center gap-3">
                    <BookOpen className="size-5 text-accent shrink-0" />
                    <h3 className="text-lg font-black text-ink tracking-tight">{writing.title}</h3>
                  </div>
                  {writing.subtitle && <p className="mt-1 text-xs text-muted-foreground">{writing.subtitle}</p>}
                  <p className="mt-3 text-sm leading-relaxed text-foreground/85">{writing.excerpt}</p>
                  <p className="mt-3 text-xs text-muted-foreground/80 border-t-2 border-ink/10 pt-3">{writing.note}</p>
                </article>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
              <div className="lg:col-span-1 rounded-sm overflow-hidden border-2 border-ink/15">
                <Image
                  src="/images/centenary/sculpture.webp"
                  alt="校园雕塑线稿：履仁崇智 明德卓行"
                  className="w-full aspect-[4/5] object-contain"
                  loading="lazy"
                />
              </div>
              <div className="lg:col-span-2 p-6 rounded-sm bg-ink text-white">
                <p className="font-serif text-2xl md:text-3xl font-black leading-snug">
                  「{CENTENARY_THEME.thought}」
                </p>
                <p className="mt-3 text-sm text-white/80 leading-relaxed">
                  百年来，学校以「履仁崇智、明德卓行」为办学思想，以「养仁爱之心、塑智慧人生」为校训，
                  从传统教学迈向现代化育人新阶段，实现从普通中学到省级示范校的跨越。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 04 百年树人 */}
        <section id="mentors" className="scroll-mt-32">
          <div className="reveal-up">
            <SectionHeader
              no="04"
              en="Mentors"
              title="百年树人"
              desc="创校先贤、育人典范、历任校长书记——杏坛弦歌，功泽后世。"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CENTENARY_FOUNDERS.map((person) => (
                <article key={person.name} className="p-6 rounded-sm bg-card border-2 border-ink neo-shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="size-12 rounded-sm bg-accent flex items-center justify-center">
                      <GraduationCap className="size-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-ink">{person.name}</h3>
                      <p className="text-xs text-muted-foreground">{person.meta}</p>
                    </div>
                    <Badge className="ml-auto text-xs rounded-sm bg-ink text-white border-0">创校先贤</Badge>
                  </div>
                  {person.tribute && <p className="mt-3 text-sm leading-relaxed text-foreground/85">{person.tribute}</p>}
                </article>
              ))}
            </div>
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {CENTENARY_MENTOR_GROUPS.map((group) => (
                <div key={group.title} className="p-6 rounded-sm bg-card border-2 border-ink/20">
                  <h3 className="text-lg font-black text-ink">{group.title}</h3>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{group.desc}</p>
                  <ul className="mt-4 space-y-3">
                    {group.people.map((person) => (
                      <li key={person.name} className="flex items-start gap-3 pb-3 border-b-2 border-ink/5 last:border-0 last:pb-0">
                        <Users className="size-4 text-accent shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-ink">
                            {person.name}
                            <span className="ml-2 text-xs font-normal text-muted-foreground">{person.meta}</span>
                          </p>
                          {person.tribute && (
                            <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">{person.tribute}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <figure className="rounded-sm overflow-hidden border-2 border-ink/15">
                <Image
                  src="/images/centenary/mentors.webp"
                  alt="20 世纪 20 年代到 80 年代的育人典范（校庆纪念画册）"
                  className="w-full aspect-[744/895] object-cover"
                  loading="lazy"
                />
              </figure>
              <figure className="rounded-sm overflow-hidden border-2 border-ink/15">
                <Image
                  src="/images/centenary/tin-visit.webp"
                  alt="学生与田家炳先生合影"
                  className="w-full aspect-[454/275] object-cover"
                  loading="lazy"
                />
              </figure>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">校史资料图片：校庆纪念画册人物页</p>
          </div>
        </section>

        {/* 05 桃李芬芳 */}
        <section id="alumni" className="scroll-mt-32">
          <div className="reveal-up">
            <SectionHeader
              no="05"
              en="Alumni"
              title="桃李芬芳"
              desc="从 20 世纪 50 年代到新世纪，一代代田中儿女在各行各业建功立业，心系母校。"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CENTENARY_ALUMNI.map((person) => (
                <article key={person.name} className="p-5 rounded-sm bg-card border-2 border-ink/20 hover:border-accent transition-colors">
                  <div className="flex items-center gap-2">
                    <Award className="size-4 text-accent shrink-0" />
                    <h3 className="text-base font-black text-ink">{person.name}</h3>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{person.meta}</p>
                  {person.tribute && (
                    <p className="mt-2 text-xs text-foreground/75 leading-relaxed italic">{person.tribute}</p>
                  )}
                </article>
              ))}
            </div>
            <div className="mt-8 p-6 rounded-sm bg-card border-2 border-ink neo-shadow">
              <h3 className="text-lg font-black text-ink">青年校友与在校生祝福（部分）</h3>
              <p className="mt-1 text-xs text-muted-foreground">画册收录各届校友祝福语，此处列举部分名录。</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {CENTENARY_YOUNG_ALUMNI.map((person) => (
                  <span
                    key={person.name}
                    className="px-3 py-1.5 text-xs rounded-sm bg-accent/10 text-ink border border-accent/30"
                  >
                    <span className="font-bold">{person.name}</span>
                    <span className="ml-1.5 text-muted-foreground">{person.meta}</span>
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <figure className="rounded-sm overflow-hidden border-2 border-ink/15">
                <Image
                  src="/images/centenary/alumni-1.webp"
                  alt="杰出校友风采（校庆纪念画册）"
                  className="w-full aspect-[748/865] object-cover"
                  loading="lazy"
                />
              </figure>
              <figure className="rounded-sm overflow-hidden border-2 border-ink/15">
                <Image
                  src="/images/centenary/alumni-2.webp"
                  alt="杰出校友祝福（校庆纪念画册）"
                  className="w-full aspect-[653/797] object-cover"
                  loading="lazy"
                />
              </figure>
            </div>
          </div>
        </section>

        {/* 06 校庆纪实 */}
        <section id="gala" className="scroll-mt-32">
          <div className="reveal-up">
            <SectionHeader
              no="06"
              en="Centenary Gala"
              title="校庆纪实"
              desc="2025 年 12 月 5 日，各地校友跨越山海重返校园，共贺母校百年华诞。"
            />
            <div className="rounded-sm bg-card border-2 border-ink neo-shadow overflow-hidden">
              <div className="p-6 bg-ink text-white">
                <div className="flex items-center gap-3">
                  <Flag className="size-6 text-accent shrink-0" />
                  <div>
                    <p className="text-xs text-white/70">{CENTENARY_GALA.date}</p>
                    <h3 className="text-xl font-black leading-snug">{CENTENARY_GALA.title}</h3>
                  </div>
                </div>
                <p className="mt-4 text-sm text-white/85 leading-relaxed">{CENTENARY_GALA.desc}</p>
              </div>
              <div className="p-6">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {CENTENARY_GALA.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span className="size-1.5 bg-accent shrink-0 mt-2" aria-hidden />
                      <p className="text-sm text-foreground/85 leading-relaxed">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <figure className="rounded-sm overflow-hidden border-2 border-ink/15">
                <Image
                  src="/images/centenary/campus-main.webp"
                  alt="崇智楼与校园花圃"
                  className="w-full aspect-[681/535] object-cover"
                  loading="lazy"
                />
              </figure>
              <div className="grid grid-cols-1 gap-6">
                <figure className="rounded-sm overflow-hidden border-2 border-ink/15">
                  <Image
                    src="/images/centenary/campus-2.webp"
                    alt="校园艺术节航拍与惜时园一角"
                    className="w-full aspect-[631/232] object-cover"
                    loading="lazy"
                  />
                </figure>
                <figure className="rounded-sm overflow-hidden border-2 border-ink/15">
                  <Image
                    src="/images/centenary/campus-4.webp"
                    alt="科创走廊与创客室、学术厅"
                    className="w-full aspect-[641/305] object-cover"
                    loading="lazy"
                  />
                </figure>
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">校园图片：校庆纪念画册《田中园景 人文蓊郁》</p>
          </div>
        </section>

        {/* 07 荣誉百年 */}
        <section id="honors" className="scroll-mt-32">
          <div className="reveal-up">
            <SectionHeader
              no="07"
              en="Honors"
              title="荣誉百年"
              desc="从「校风示范学校」到「教育部人工智能教育试点校」，百年积淀，实至名归。"
            />
            <div className="rounded-sm overflow-hidden border-2 border-ink/15 mb-8">
              <Image
                src="/images/centenary/honors-wall.webp"
                alt="荣誉墙：四川省二级示范性普通高中等牌匾（校庆纪念画册）"
                className="w-full aspect-[1389/698] object-cover"
                loading="lazy"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {CENTENARY_HONORS.map((honor) => (
                <div key={honor.name} className="p-4 rounded-sm bg-card border-2 border-ink/20">
                  <div className="flex items-start gap-2">
                    <Trophy className="size-4 text-accent shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-ink leading-snug">{honor.name}</p>
                      {honor.issuer && <p className="mt-1 text-xs text-muted-foreground">{honor.issuer}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <h3 className="mt-10 text-lg font-black text-ink">办学特色一览</h3>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {CENTENARY_FEATURES.map((feature) => (
                <article key={feature.title} className="p-5 rounded-sm bg-card border-2 border-ink/20">
                  <h4 className="text-sm font-black text-ink">{feature.title}</h4>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{feature.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 08 资料来源 */}
        <section id="sources" className="scroll-mt-32">
          <div className="reveal-up">
            <SectionHeader
              no="08"
              en="Sources"
              title="资料来源"
              desc="本页内容以建校百年纪念画册为准，校庆活动信息以权威媒体报道补充，逐条可溯源。"
            />
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {CENTENARY_SOURCES.map((source) => {
                const isExternal = source.url.startsWith('http');
                return (
                  <li key={source.label}>
                    {source.url ? (
                      <a
                        href={source.url}
                        target={isExternal ? '_blank' : undefined}
                        rel={isExternal ? 'noreferrer' : undefined}
                        className="group flex items-start gap-3 p-4 rounded-sm bg-card border-2 border-ink/20 hover:border-accent transition-colors"
                      >
                        {isExternal ? (
                          <ExternalLink className="size-4 text-accent shrink-0 mt-0.5" />
                        ) : (
                          <Link2 className="size-4 text-accent shrink-0 mt-0.5" />
                        )}
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-ink group-hover:text-accent transition-colors">
                            {source.label}
                          </p>
                          {source.note && (
                            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{source.note}</p>
                          )}
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-start gap-3 p-4 rounded-sm bg-card border-2 border-ink/20">
                        <BookOpen className="size-4 text-accent shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-ink">{source.label}</p>
                          {source.note && (
                            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{source.note}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
            <div className="mt-8 p-6 rounded-sm bg-card border-2 border-ink neo-shadow flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <Calendar className="size-6 text-accent shrink-0" />
                <p className="text-sm text-foreground/85">
                  百年田中，初心如磐，再启新程。欢迎查看招生信息或联系我们，共赴下一个百年之约。
                </p>
              </div>
              <div className="flex gap-3 sm:ml-auto">
                <Link
                  to="/admission"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold bg-accent text-white rounded-sm neo-press"
                >
                  招生招聘
                </Link>
                <Link
                  to="/about#history"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold bg-card text-ink border-2 border-ink rounded-sm neo-press"
                >
                  校史沿革
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
