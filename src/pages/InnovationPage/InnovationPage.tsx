import { Link } from 'react-router-dom';
import { ArrowRight, Trophy, Cpu, Lightbulb, Rocket, Star, Calendar, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { PageHero } from '@/components/PageHero';
import { SectionHeader } from '@/components/SectionHeader';
import { MOCK_INNOVATION, MOCK_INNOVATION_ACHIEVEMENTS } from '@/data/innovation';
import { useSEO } from '@/hooks/useSEO';

const HERO_IMAGE = '/images/BwGQ1wfhTy.webp';

const PROGRAMS = [
  {
    icon: Cpu,
    title: '人工智能课程',
    description: '开发《人工智能基础》《机器学习》《无人机编程》等17门校本课程，课程教材所人工智能教育试点单位，2026年获评成都市人工智能科普教育示范校。',
  },
  {
    icon: Lightbulb,
    title: '科技创新竞赛',
    description: '近三年国家级、省级科创奖项300余人次，2024、2025连续两年蝉联全国学生信息素养活动最高荣誉"创新之星"，成都市唯一。',
  },
  {
    icon: Rocket,
    title: '机器人战队',
    description: '组建VEX、FTC机器人战队，参加国内外各级机器人竞赛，培养工程思维与团队协作能力。',
  },
  {
    icon: Star,
    title: '创客空间',
    description: '15个高标准实验室，配备机器人、3D打印机、无人机等设备，为学生提供自由创造的实践平台。',
  },
];

// 科创新闻封面图：使用用户提供的实拍图素材替换原有占位图
const NEWS_PHOTOS: Record<string, string> = {
  'inno-1': '/images/BwGQ1wfhTy.webp',
  'inno-2': '/images/38Bp1wfimz.webp',
  'inno-3': '/images/38Bp1wfimz.webp',
};

export default function InnovationPage() {
  useSEO({
    title: '科创教育',
    description: '成都市田家炳中学科创教育，人工智能、机器人、3D打印等特色课程，15个高标准实验室，2024-2025连续两年蝉联全国学生信息素养活动最高荣誉。',
    canonical: 'https://tjb.petricw.com/innovation',
    breadcrumbs: [
      { name: '首页', url: '/' },
      { name: '科创特色', url: '/innovation' },
    ],
  });
  return (
    <div className="min-h-screen bg-background">
      <main className="space-y-16 md:space-y-24">
        {/* Hero Banner：统一 PageHero 版式 */}
        <PageHero
          no="04"
          en="Innovation"
          title="科技赋能成长 创新引领未来"
          desc="课程教材所人工智能教育试点单位，成都市人工智能科普教育示范校，近三年国家级省级科创奖项300余人次，连续两年蝉联全国“创新之星”。"
          image={HERO_IMAGE}
        />

        {/* 科创项目：编号卡片 */}
        <section className="w-full">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="reveal-up">
              <SectionHeader
                no="02"
                en="Programs"
                title="四大科创平台"
                desc="构建多层次科创教育体系，让每一位学生都能找到属于自己的创新舞台"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
                {PROGRAMS.map((program, i) => {
                  const Icon = program.icon;
                  return (
                    <div
                      key={program.title}
                      className="group relative bg-card border-2 border-ink/25 hover:border-ink hover-neo-shadow transition-all duration-200 rounded-sm p-6"
                    >
                      <div className="flex items-start justify-between mb-5">
                        <div className="size-12 rounded-sm bg-ink flex items-center justify-center shrink-0 group-hover:bg-accent transition-colors">
                          <Icon className="size-6 text-white" strokeWidth={1.5} />
                        </div>
                        <span
                          aria-hidden
                          className="font-english text-3xl font-black text-ink/10 tabular-nums leading-none select-none group-hover:text-accent/30 transition-colors"
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <h3 className="text-base font-bold font-serif text-ink mb-2.5">
                        {program.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {program.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 科创成果 */}
        <section className="w-full bg-muted/40 border-y-2 border-ink/10">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-20">
            <div className="reveal-up">
              <SectionHeader
                no="03"
                en="Awards"
                title="荣誉与成就"
                desc="近年来我校在各级各类科创竞赛中屡获佳绩，硕果累累"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_INNOVATION_ACHIEVEMENTS.map((achievement, i) => (
                  <div
                    key={achievement.id}
                    className="group relative h-full bg-card border-2 border-ink/25 hover:border-ink hover-neo-shadow transition-all duration-200 rounded-sm p-6"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="size-10 rounded-sm bg-accent flex items-center justify-center shrink-0">
                        <Trophy className="size-5 text-white" />
                      </div>
                      <div>
                        <Badge className="text-xs rounded-sm bg-ink text-white border-0 py-0.5 px-2">
                          {achievement.level}
                        </Badge>
                        <span className="ml-2 text-xs text-muted-foreground tabular-nums">{achievement.year}</span>
                      </div>
                    </div>
                    <h3 className="text-base font-bold font-serif text-ink mb-2 group-hover:text-accent transition-colors">
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {achievement.description}
                    </p>
                    <span
                      aria-hidden
                      className="absolute top-4 right-5 font-english text-2xl font-black text-ink/10 tabular-nums leading-none select-none group-hover:text-accent/30 transition-colors"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 核心师资 */}
        <section className="w-full">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="reveal-up">
              <SectionHeader no="04" en="Faculty" title="科创教育领军人物" />

              <div className="max-w-3xl mx-auto bg-card border-2 border-ink rounded-sm neo-shadow overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-48 shrink-0 bg-ink/5 flex items-center justify-center p-6 border-b-2 sm:border-b-0 sm:border-r-2 border-ink/10">
                    <div className="size-32 rounded-sm overflow-hidden border-2 border-ink">
                      <Image
                        src="/teachers/teacher-18.jpg"
                        alt="张友科"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="p-6 md:p-8 flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-black font-serif text-ink">张友科</h3>
                      <Badge className="text-xs rounded-sm bg-accent text-white border-0">人工智能名师</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      锦江区第一批人工智能名师工作室主持人，成都市教坛新秀。其课程《机器学习分类算法》获得基础教育精品课部级优课荣誉，
                      受邀在全国中小学人工智能教育创新学术论坛作经验分享。带领学生连续两年蝉联全国学生信息素养活动最高荣誉"创新之星"，
                      成都市唯一获此殊荣的指导教师。开发《人工智能基础》《机器学习》《无人机编程》等17门科创校本课程，
                      构建了完整的中小学人工智能教育课程体系。
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="text-xs rounded-sm bg-ink text-white border-0 py-1 px-2.5">部级优课</Badge>
                      <Badge className="text-xs rounded-sm bg-ink text-white border-0 py-1 px-2.5">创新之星指导教师</Badge>
                      <Badge className="text-xs rounded-sm bg-ink text-white border-0 py-1 px-2.5">名师工作室主持人</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 科创新闻 */}
        <section className="w-full">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="reveal-up">
              <SectionHeader
                no="05"
                en="News"
                title="科创动态"
                link={{ to: '/news?category=校园要闻', label: '更多动态' }}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {MOCK_INNOVATION.map((item, i) => (
                  <Link
                    key={item.id}
                    to={item.sourceUrl || `/news/${item.id}`}
                    {...(item.sourceUrl ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group block h-full"
                  >
                    <div className="relative h-full overflow-hidden bg-card border-2 border-ink/25 hover:border-ink hover-neo-shadow transition-all duration-200 rounded-sm corner-mark">
                      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
                        <Image
                          src={NEWS_PHOTOS[item.id] || item.coverImage}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {item.isPinned && (
                          <div className="absolute top-3 left-3">
                            <Badge className="text-xs rounded-sm bg-accent text-white border-0">
                              置顶
                            </Badge>
                          </div>
                        )}
                        <span
                          aria-hidden
                          className="photo-numeral absolute bottom-2 right-3 font-english text-3xl font-black text-white/95 tabular-nums leading-none select-none"
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                          <span className="flex items-center gap-1 tabular-nums">
                            <Calendar className="size-3.5" />
                            {item.publishDate}
                          </span>
                          <span className="flex items-center gap-1 tabular-nums">
                            <Eye className="size-3.5" />
                            {item.viewCount.toLocaleString()}
                          </span>
                        </div>
                        <h3 className="text-base font-bold font-serif text-ink group-hover:text-accent transition-colors line-clamp-2 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                          {item.summary}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full bg-ink border-t-2 border-ink">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20 text-center">
            <Rocket className="size-12 text-accent mx-auto mb-6" strokeWidth={1.5} />
            <h2 className="text-2xl md:text-3xl font-black font-serif text-white mb-4 tracking-tight">
              加入田中科创大家庭
            </h2>
            <p className="text-white/70 max-w-xl mx-auto mb-8 leading-relaxed">
              如果你对科技充满热情，欢迎报考成都市田家炳中学科创实验班，
              在这里开启你的创新之旅。
            </p>
            <Button
              size="lg"
              className="bg-accent text-white hover:bg-accent/90 border-2 border-white/70 rounded-sm neo-press h-12 px-8 text-base font-bold"
              asChild
            >
              <Link to="/admission">
                了解招生信息
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
