import { BookOpen, Users, Award, Lightbulb, GraduationCap, ArrowRight, Star, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Image } from '@/components/ui/image';
import { PageHero } from '@/components/PageHero';
import { SectionHeader } from '@/components/SectionHeader';
import { UniversalLink } from '@/components/UniversalLink';
import { useSEO } from '@/hooks/useSEO';
import { MOCK_TEACHING_SECTION, MOCK_TEACHERS, MOCK_ACHIEVEMENTS } from '@/data/teaching';

const FEATURE_ICONS: Record<number, React.ComponentType<{ className?: string }>> = {
  0: BookOpen,
  1: Users,
  2: Lightbulb,
  3: GraduationCap,
  4: Award,
  5: BookOpen,
};

export default function TeachingPage() {
  useSEO({
    title: '教学教研',
    description: '成都市田家炳中学教学教研成果展示，涵盖师资队伍、教学特色、教研成果、课程体系等。正高级教师、特级教师领衔，师资力量雄厚。',
    canonical: 'https://tjb.petricw.com/teaching',
    breadcrumbs: [
      { name: '首页', url: '/' },
      { name: '教学教研', url: '/teaching' },
    ],
  });
  return (
    <div className="min-h-screen bg-transparent">
      <main className="space-y-16 md:space-y-24">
        {/* Hero Banner：统一 PageHero 版式 */}
        <PageHero
          no="03"
          en="Teaching"
          title="科研兴校 质量立校"
          desc={MOCK_TEACHING_SECTION.description}
        />

        {/* 教学特色：编号卡片 */}
        <section className="w-full">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="reveal-up">
              <SectionHeader
                no="02"
                en="Features"
                title="教学特色"
                desc="深耕课堂主阵地，构建高质量教学体系"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                {MOCK_TEACHING_SECTION.features.map((feature, i) => {
                  const Icon = FEATURE_ICONS[i] || BookOpen;
                  return (
                    <div
                      key={feature.label}
                      className="group relative bg-card border-2 border-ink/25 hover:border-ink hover-neo-shadow transition-all duration-200 rounded-sm p-6"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="size-11 rounded-sm bg-ink flex items-center justify-center shrink-0">
                          <Icon className="size-5 text-white" />
                        </div>
                        <span
                          aria-hidden
                          className="font-english text-3xl font-black text-ink/10 tabular-nums leading-none select-none group-hover:text-accent/30 transition-colors"
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <h3 className="text-base font-bold font-serif text-ink mb-2">
                        {feature.label}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 配图 + 简介 */}
        <section className="w-full bg-muted/40 border-y-2 border-ink/10">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center reveal-up">
              <div className="relative aspect-[4/3] bg-muted border-2 border-ink rounded-sm overflow-hidden neo-shadow corner-mark">
                <Image
                  src="/images/BwGQ1wfhTy.webp"
                  alt="教学教研"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2.5">
                  <span className="w-1.5 h-5 bg-accent shrink-0" aria-hidden />
                  <span className="font-english text-xs font-bold tracking-[0.28em] uppercase text-muted-foreground">
                    03 — Introduction
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black font-serif text-ink tracking-tight mb-4">
                  {MOCK_TEACHING_SECTION.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {MOCK_TEACHING_SECTION.description}
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {['深度学习课堂', '校本教研', '青蓝工程', '课题引领'].map((tag) => (
                    <Badge
                      key={tag}
                      className="text-xs rounded-sm bg-ink text-white border-0 py-1 px-2.5"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 师资队伍 */}
        <section className="w-full">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="reveal-up">
              <SectionHeader
                no="04"
                en="Faculty"
                title="师资队伍"
                desc="专任教师260余名，省市区特级教师20余名，市区学科带头人16名，名师工作室10个"
              />

              {/* 师资队伍集体照 */}
              <div className="mb-8 relative aspect-[21/9] bg-muted border-2 border-ink rounded-sm overflow-hidden neo-shadow corner-mark">
                <Image
                  src="/images/shiziduiwu.webp"
                  alt="成都市田家炳中学师资队伍"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {MOCK_TEACHERS.map((teacher) => (
                  <div
                    key={teacher.id}
                    className="h-full bg-card border-2 border-ink/25 hover:border-ink hover-neo-shadow transition-all duration-200 rounded-sm p-5 text-center group"
                  >
                    {/* 头像：方形（设计语言统一） */}
                    <div className="size-20 rounded-sm overflow-hidden bg-muted flex items-center justify-center mx-auto mb-4 border-2 border-ink/80">
                      {teacher.avatar ? (
                        <Image
                          src={teacher.avatar}
                          alt={teacher.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-2xl font-black text-ink/40 font-serif">
                          {teacher.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold font-serif text-ink mb-1.5">
                      {teacher.name}
                    </h3>
                    <div className="flex items-center justify-center gap-1.5 mb-2.5">
                      <Badge className="text-[11px] h-5 px-2 rounded-sm bg-ink text-white border-0">
                        {teacher.title}
                      </Badge>
                      <Badge className="text-[11px] h-5 px-2 rounded-sm bg-card text-ink border-2 border-ink/60">
                        {teacher.subject}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
                      {teacher.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* 师资补充说明 */}
              <div className="mt-8 bg-card border-2 border-ink rounded-sm neo-shadow-sm p-5 md:p-6">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="size-8 rounded-sm bg-accent flex items-center justify-center shrink-0">
                    <Star className="size-4 text-white" />
                  </div>
                  <p className="text-sm font-bold text-foreground">师资建设亮点</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    '市区学科带头人16名，市区优秀班主任、优秀教师等80余名',
                    '90%以上的新高一教师来自原高三毕业班，实战经验丰富',
                    '专职心理健康教师5人，国家心理咨询师8人，班主任B证持有率70%',
                    '构建"专职教师+班主任+学科教师+家长"四支心育队伍',
                  ].map((text) => (
                    <div key={text} className="flex items-start gap-2.5 p-4 rounded-sm bg-background border-2 border-ink/15">
                      <span className="size-1.5 bg-accent shrink-0 mt-1.5" aria-hidden />
                      <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 教研成果 */}
        <section className="w-full bg-muted/40 border-y-2 border-ink/10">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-20">
            <div className="reveal-up">
              <SectionHeader
                no="05"
                en="Research"
                title="教研成果"
                desc="课题引领、以研促教，成果丰硕"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {MOCK_ACHIEVEMENTS.map((achievement, i) => {
                  const handleClick = () => {
                    if (achievement.sourceUrl) {
                      window.open(achievement.sourceUrl, '_blank');
                    }
                  };

                  return (
                    <div
                      key={achievement.id}
                      className={`group relative h-full bg-card border-2 border-ink/25 hover:border-ink hover-neo-shadow transition-all duration-200 rounded-sm ${
                        achievement.sourceUrl ? 'cursor-pointer' : ''
                      }`}
                      onClick={handleClick}
                    >
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <Badge className="text-xs rounded-sm bg-ink text-white border-0 py-0.5 px-2">
                            {achievement.level}
                          </Badge>
                          <span className="text-sm text-muted-foreground tabular-nums font-english font-bold">{achievement.year}</span>
                        </div>
                        <h3 className="text-base font-bold font-serif text-ink leading-snug group-hover:text-accent transition-colors mb-2.5">
                          {achievement.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {achievement.description}
                        </p>
                        {achievement.sourceUrl && (
                          <div className="mt-3 flex items-center gap-1 text-xs font-bold text-ink">
                            <ExternalLink className="size-3" />
                            查看详情
                          </div>
                        )}
                      </div>
                      <span
                        aria-hidden
                        className="absolute top-3 right-4 font-english text-2xl font-black text-ink/10 tabular-nums leading-none select-none group-hover:text-accent/30 transition-colors"
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="reveal-up bg-ink text-white border-2 border-ink rounded-sm neo-shadow-accent overflow-hidden relative">
              <span className="absolute top-6 right-6 size-5 border-t-2.5 border-r-2.5 border-accent" aria-hidden />
              <span className="absolute bottom-6 left-6 size-5 border-b-2.5 border-l-2.5 border-accent" aria-hidden />
              <div className="p-8 md:p-14 text-center">
                <GraduationCap className="size-12 text-accent mx-auto mb-5" strokeWidth={1.5} />
                <h2 className="text-2xl md:text-3xl font-black font-serif mb-3 tracking-tight">
                  加入田中，成就未来
                </h2>
                <p className="text-white/70 max-w-lg mx-auto mb-8 leading-relaxed">
                  一流的师资队伍，优质的教学资源，助力每一位学子实现梦想
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <UniversalLink
                    to="/admission"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-sm bg-accent text-white border-2 border-white/70 neo-press font-bold text-sm"
                  >
                    招生信息
                    <ArrowRight className="size-4" />
                  </UniversalLink>
                  <UniversalLink
                    to="/about"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-sm border-2 border-white/40 text-white neo-press font-bold text-sm hover:bg-white/10 transition-colors"
                  >
                    了解学校
                  </UniversalLink>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
