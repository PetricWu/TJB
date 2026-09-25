import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap, Quote, Users, ArrowUpRight, ExternalLink, Link2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { PageHero } from '@/components/PageHero';
import { SectionHeader } from '@/components/SectionHeader';
import { ArticleCard } from '@/components/ArticleCard';
import { useSEO } from '@/hooks/useSEO';
import {
  MOCK_ALUMNI_INTRO,
  MOCK_ALUMNI_FOUNDERS,
  MOCK_ALUMNI_REPRESENTATIVES,
  MOCK_ALUMNI_NEWS,
  MOCK_ALUMNI_SOURCES,
  type IAlumniFigure,
} from '@/data/alumni';
import { mergedArticles } from '@/data/merged-articles';

function FigureCard({ figure, accentIndex }: { figure: IAlumniFigure; accentIndex: number }) {
  return (
    <article className="group relative h-full bg-card border-2 border-ink rounded-sm neo-shadow overflow-hidden corner-mark">
      {/* 头部：首字占位 + 定位标签 */}
      <div className="flex items-start gap-4 p-5 border-b-2 border-ink/10">
        <div className="size-14 shrink-0 rounded-sm bg-ink text-white flex items-center justify-center">
          <span className="font-serif text-2xl font-black leading-none">{figure.name.slice(0, 1)}</span>
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-xl font-black text-ink tracking-tight">{figure.name}</h3>
            <Badge className="text-[11px] rounded-sm bg-accent text-white border-0">{figure.role}</Badge>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{figure.identity}</p>
          <p className="mt-0.5 font-english text-xs text-accent/80 tracking-wide">{figure.era}</p>
        </div>
        <span
          aria-hidden
          className="ml-auto font-english text-3xl font-black text-accent/15 tabular-nums select-none"
        >
          {String(accentIndex + 1).padStart(2, '0')}
        </span>
      </div>
      <div className="p-5 space-y-3">
        <p className="text-sm leading-relaxed text-foreground/85">{figure.description}</p>
        {figure.highlight && (
          <div className="flex gap-2.5 p-3 rounded-sm bg-accent/8 border-l-2 border-accent">
            <Quote className="size-4 text-accent shrink-0 mt-0.5" />
            <p className="text-sm leading-relaxed text-foreground/80">{figure.highlight}</p>
          </div>
        )}
      </div>
    </article>
  );
}

export default function AlumniPage() {
  useSEO({
    title: '校友风采',
    description:
      '成都市田家炳中学校友风采：创校先贤陶亮生、文百川（成都教育界"黑白二将军"），校友代表李世麟，百年校庆回眸。弦歌百年，桃李满城。',
    canonical: 'https://tjb.petricw.com/alumni',
    breadcrumbs: [
      { name: '首页', url: '/' },
      { name: '校友风采', url: '/alumni' },
    ],
  });

  // 校庆回眸：按 id 取站内文章
  const featuredNews = useMemo(
    () =>
      MOCK_ALUMNI_NEWS.map((ref) => {
        const article = mergedArticles.find((a) => a.id === ref.articleId);
        return article ? { ...article, note: ref.note } : null;
      }).filter(
        (a): a is (typeof mergedArticles)[number] & { note: string } => a !== null,
      ),
    [],
  );

  return (
    <div className="min-h-screen bg-transparent">
      <PageHero
        no="08"
        en="Alumni"
        title={MOCK_ALUMNI_INTRO.title}
        desc={MOCK_ALUMNI_INTRO.description}
      />

      {/* 副标题带 */}
      <section className="w-full bg-card border-b-2 border-ink/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-5 bg-accent shrink-0" aria-hidden />
            <p className="text-base md:text-lg font-bold text-ink tracking-wide">{MOCK_ALUMNI_INTRO.subtitle}</p>
            <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
              <Users className="size-4 text-accent" />
              <span>创校先贤 · 校友代表 · 校庆回眸</span>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16 space-y-20 md:space-y-24">
        {/* 02 创校先贤 */}
        <section id="founders" className="scroll-mt-32">
          <div className="reveal-up">
            <SectionHeader
              no="02"
              en="Founders"
              title="创校先贤"
              desc="1925年，一批爱国知识分子怀着教育救国的理想创办成城公学。他们是这所百年学府的奠基人，故称「创校先贤」，而非校友。"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MOCK_ALUMNI_FOUNDERS.map((figure, i) => (
                <FigureCard key={figure.id} figure={figure} accentIndex={i} />
              ))}
            </div>
          </div>
        </section>

        {/* 03 校友代表 */}
        <section id="representatives" className="scroll-mt-32">
          <div className="reveal-up">
            <SectionHeader
              no="03"
              en="Representatives"
              title="校友代表"
              desc="从田中学子到掌舵母校，「受教于此、反哺于此」的动人故事，是百年田中精神最生动的注脚。"
            />
            <div className="grid grid-cols-1 gap-6">
              {MOCK_ALUMNI_REPRESENTATIVES.map((figure, i) => (
                <FigureCard key={figure.id} figure={figure} accentIndex={i} />
              ))}
            </div>
            <div className="mt-6 p-5 rounded-sm bg-ink text-white border-2 border-ink">
              <div className="flex items-start gap-3">
                <GraduationCap className="size-6 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold tracking-wide">寻访田中人</p>
                  <p className="mt-1.5 text-sm text-white/80 leading-relaxed">
                    百年办学历程中，无数田中学子从锦江之滨走向山海四方，在各行各业默默耕耘。若您是田中校友，或知晓值得记录的校友故事，欢迎与学校联系，共同丰富这份属于全体田中人的记忆。
                  </p>
                  <Link
                    to="/contact"
                    className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold bg-accent text-white rounded-sm neo-press"
                  >
                    联系我们
                    <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 04 百年校庆回眸 */}
        <section id="anniversary" className="scroll-mt-32">
          <div className="reveal-up">
            <SectionHeader
              no="04"
              en="Centennial"
              title="百年校庆回眸"
              desc="2025年，学校以「百年成城　炳新而行」为主题举办百年校庆，各界校友、师生代表齐聚一堂，共忆同窗岁月、共话学校发展。"
              link={{ to: '/news?category=校庆专题', label: '查看校庆专题' }}
            />
            {featuredNews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredNews.map((article, i) => (
                  <div key={article.id} className="space-y-2">
                    <ArticleCard
                      id={article.id}
                      title={article.title}
                      summary={article.summary}
                      category={article.category}
                      coverImage={article.coverImage}
                      coverImage4x3={article.coverImage4x3}
                      publishDate={article.publishDate}
                      viewCount={article.viewCount}
                      isPinned={article.isPinned}
                      sourceUrl={article.sourceUrl}
                      variant="default"
                      index={String(i + 1).padStart(2, '0')}
                    />
                    <p className="px-1 text-xs text-muted-foreground leading-relaxed">{article.note}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 rounded-sm bg-card border-2 border-ink/20 text-center">
                <BookOpen className="size-6 text-accent mx-auto" />
                <p className="mt-2 text-sm text-muted-foreground">
                  校庆报道整理中，敬请前往
                  <Link to="/news?category=校庆专题" className="mx-1 text-accent font-semibold hover:underline">
                    校庆专题
                  </Link>
                  查看最新内容。
                </p>
              </div>
            )}
          </div>
        </section>

        {/* 05 资料来源 */}
        <section id="sources" className="scroll-mt-32">
          <div className="reveal-up">
            <SectionHeader
              no="05"
              en="Sources"
              title="资料来源"
              desc="本页人物与事迹均取自权威媒体报道与本站校史记载，逐条可溯源。"
            />
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {MOCK_ALUMNI_SOURCES.map((source) => {
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
          </div>
        </section>
      </main>
    </div>
  );
}
