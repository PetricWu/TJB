import { Link } from 'react-router-dom';
import {
  BookOpen,
  Building2,
  Calendar,
  ExternalLink,
  Heart,
  Landmark,
  Link2,
  Quote,
  Sparkles,
  TrendingUp,
  Users,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { PageHero } from '@/components/PageHero';
import { SectionHeader } from '@/components/SectionHeader';
import CountUp from '@/components/CountUp';
import { useSEO } from '@/hooks/useSEO';
import {
  MOCK_TKP_PROFILE,
  MOCK_TKP_QUOTES,
  MOCK_TKP_STATS,
  MOCK_TKP_MILESTONES,
  MOCK_SCHOOL_BONDS,
  MOCK_TKP_SPIRIT,
  MOCK_TKP_SOURCES,
} from '@/data/tianjiabing';

const SPIRIT_ICONS = [Heart, Sparkles, Landmark];

export default function TianjiabingPage() {
  useSEO({
    title: '田家炳专题',
    description:
      '田家炳博士（1919—2018）与田家炳基金会专题：生平、名言、捐学规模（全国34省市区、大学93所、中学163所、小学42所、图书室1800余间）、发展时间轴，以及成都市田家炳中学与田家炳先生的渊源。',
    canonical: 'https://tjb.petricw.com/tianjiabing',
    breadcrumbs: [
      { name: '首页', url: '/' },
      { name: '田家炳专题', url: '/tianjiabing' },
    ],
  });

  return (
    <div className="min-h-screen bg-transparent">
      <PageHero
        no="09"
        en="Tin Ka Ping"
        title="田家炳专题"
        desc='"中国的希望在教育。"一位节俭到极致的实业家，却倾其所有兴学育才，捐资遍及全国34省市区，被誉为"中国百校之父"。本校即以田家炳先生之名命名，谨此致敬其"兴学育才"的教育情怀。'
      />

      {/* 语录横幅：全宽 ink 大字版式 */}
      <section className="relative w-full bg-ink overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_20%_20%,white,transparent_60%)]"
        />
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-20">
          <div className="flex items-start gap-4">
            <Quote className="size-10 md:size-14 text-accent shrink-0" />
            <div className="min-w-0">
              <p className="font-serif text-2xl md:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
                {MOCK_TKP_QUOTES[0].text}
              </p>
              <p className="mt-4 text-sm md:text-base text-white/70">{MOCK_TKP_QUOTES[0].context}</p>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MOCK_TKP_QUOTES.slice(1).map((q) => (
              <div key={q.text} className="p-5 rounded-sm border-2 border-white/15 bg-white/5">
                <p className="font-serif text-lg md:text-2xl font-bold text-white leading-snug">{q.text}</p>
                <p className="mt-2 text-xs text-white/60">{q.context}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 数字统计带：基金会捐学规模 */}
      <section className="w-full bg-card border-b-2 border-ink/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-12">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="size-5 text-accent" />
            <p className="text-sm font-bold text-ink tracking-wide">田家炳基金会捐学规模（截至基金会官网公布）</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-8">
            {MOCK_TKP_STATS.map((stat, i) => (
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
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16 space-y-20 md:space-y-24">
        {/* 02 生平简介 */}
        <section id="profile" className="scroll-mt-32">
          <div className="reveal-up">
            <SectionHeader
              no="02"
              en="Profile"
              title="田家炳博士生平"
              desc="从香港「人造革大王」到「中国百校之父」，田家炳博士以实业报国、以教育兴邦。"
            />
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3 space-y-4">
                {MOCK_TKP_PROFILE.story.map((para, i) => (
                  <p key={i} className="text-base leading-relaxed text-foreground/85">
                    {para}
                  </p>
                ))}
              </div>
              <div className="lg:col-span-2">
                <div className="bg-card border-2 border-ink rounded-sm neo-shadow overflow-hidden corner-mark">
                  <div className="p-6 bg-ink text-white">
                    <div className="flex items-center gap-3">
                      <div className="size-14 rounded-sm bg-accent flex items-center justify-center">
                        <span className="font-serif text-2xl font-black leading-none">田</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-black">{MOCK_TKP_PROFILE.name}</h3>
                        <p className="font-english text-xs text-white/70 tracking-wide">
                          {MOCK_TKP_PROFILE.englishName}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-white/85">
                        <Calendar className="size-4 text-accent" />
                        <span>{MOCK_TKP_PROFILE.lifespan}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/85">
                        <Landmark className="size-4 text-accent" />
                        <span>{MOCK_TKP_PROFILE.birthplace}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-xs text-muted-foreground mb-3">身份</p>
                    <div className="flex flex-wrap gap-2">
                      {MOCK_TKP_PROFILE.titles.map((title) => (
                        <Badge
                          key={title}
                          className="text-xs rounded-sm bg-accent/10 text-accent border border-accent/30 hover:bg-accent hover:text-white transition-colors"
                        >
                          {title}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 03 基金会发展时间轴 */}
        <section id="timeline" className="scroll-mt-32">
          <div className="reveal-up">
            <SectionHeader
              no="03"
              en="Timeline"
              title="田家炳基金会发展时间轴"
              desc="从1982年基金会成立，到捐办命名学校遍布全国34省市区，一条以教育为名的公益长路。"
            />
            <div className="relative">
              {/* 竖向时间轴 */}
              <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-0.5 bg-ink/15 md:-translate-x-1/2" aria-hidden />
              <ol className="space-y-8">
                {MOCK_TKP_MILESTONES.map((milestone, i) => (
                  <li key={milestone.year} className="relative">
                    <div
                      className={`flex flex-col md:flex-row md:items-center gap-4 ${
                        i % 2 === 1 ? 'md:flex-row-reverse' : ''
                      }`}
                    >
                      {/* 年份节点 */}
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
                      {/* 描述 */}
                      <div className={`pl-[60px] md:pl-0 md:w-1/2 ${i % 2 === 1 ? 'md:pr-0' : ''}`}>
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
          </div>
        </section>

        {/* 04 我校与田家炳 */}
        <section id="bonds" className="scroll-mt-32">
          <div className="reveal-up">
            <SectionHeader
              no="04"
              en="Our Bond"
              title="我校与田家炳"
              desc="2003年，田家炳先生捐资250万元，「成都市第十九中学」正式更名为成都市田家炳中学，成为全国166所田家炳系列学校之一。"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MOCK_SCHOOL_BONDS.map((bond) => (
                <article
                  key={bond.id}
                  className="group p-6 rounded-sm bg-card border-2 border-ink neo-shadow-sm hover:border-accent transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Badge className="text-xs rounded-sm bg-ink text-white border-0 font-english">{bond.year}</Badge>
                    <h3 className="text-lg font-black text-ink tracking-tight">{bond.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/85">{bond.description}</p>
                </article>
              ))}
            </div>
            <div className="mt-6 p-6 rounded-sm bg-accent/8 border-2 border-accent/30">
              <div className="flex items-start gap-3">
                <Users className="size-6 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-ink">全国田家炳学校大家庭</p>
                  <p className="mt-1.5 text-sm text-foreground/80 leading-relaxed">
                    在中国内地，所有田家炳学校均属公办政府学校，基金会不参与日常管理。成都市田家炳中学作为全国166所田家炳系列学校之一，与各地田校一道，延续田家炳先生「兴学育才、回馈社会」的教育理想。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 05 精神传承 */}
        <section id="spirit" className="scroll-mt-32">
          <div className="reveal-up">
            <SectionHeader
              no="05"
              en="Spirit"
              title="精神传承"
              desc="田家炳精神以「爱国、勤俭、廉洁」为核心，润泽一代代田中人。"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {MOCK_TKP_SPIRIT.map((item, i) => {
                const Icon = SPIRIT_ICONS[i] ?? BookOpen;
                return (
                  <article
                    key={item.title}
                    className="relative p-6 rounded-sm bg-ink text-white overflow-hidden"
                  >
                    <div
                      aria-hidden
                      className="absolute -right-4 -bottom-6 font-serif text-[7rem] font-black text-white/5 leading-none select-none"
                    >
                      {item.title}
                    </div>
                    <div className="relative">
                      <div className="size-12 rounded-sm bg-accent flex items-center justify-center">
                        <Icon className="size-6 text-white" />
                      </div>
                      <h3 className="mt-4 text-2xl font-black tracking-tight">{item.title}</h3>
                      <p className="mt-2 text-sm text-white/80 leading-relaxed">{item.content}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* 06 资料来源 */}
        <section id="sources" className="scroll-mt-32">
          <div className="reveal-up">
            <SectionHeader
              no="06"
              en="Sources"
              title="资料来源"
              desc="本页生平、数据、里程碑均以田家炳基金会官网及权威媒体报道为准，逐条可溯源。"
            />
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {MOCK_TKP_SOURCES.map((source) => {
                const isExternal = source.url.startsWith('http');
                return (
                  <li key={source.label}>
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
                  </li>
                );
              })}
            </ul>
            <div className="mt-8 p-6 rounded-sm bg-card border-2 border-ink neo-shadow flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <Building2 className="size-6 text-accent shrink-0" />
                <p className="text-sm text-foreground/85">
                  想了解这所以田家炳先生命名的百年学府？欢迎查看招生信息或联系我们。
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
                  to="/contact"
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold bg-card text-ink border-2 border-ink rounded-sm neo-press"
                >
                  联系我们
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
