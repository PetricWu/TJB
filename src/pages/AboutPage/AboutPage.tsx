import { useState, useMemo } from 'react';
import {
  BookOpen,
  Building2,
  GraduationCap,
  MapPin,
  Trophy,
  Users,
  Award,
  Calendar,
  Globe,
  Microscope,
  School,
  Star,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Image } from '@/components/ui/image';
import { PageHero } from '@/components/PageHero';
import { SectionHeader } from '@/components/SectionHeader';
import { useSEO } from '@/hooks/useSEO';
import {
  MOCK_ABOUT,
  MOCK_HISTORY,
  MOCK_PHILOSOPHY,
  MOCK_FACULTY,
  MOCK_HONORS,
  MOCK_CAMPUS,
  MOCK_ABOUT_STATS,
} from '@/data/about';

const SECTION_ANCHORS = [
  { id: 'overview', label: '学校概况', icon: Building2 },
  { id: 'history', label: '百年校史', icon: Calendar },
  { id: 'philosophy', label: '办学理念', icon: BookOpen },
  { id: 'faculty', label: '师资队伍', icon: Users },
  { id: 'campus', label: '校园环境', icon: MapPin },
  { id: 'honors', label: '荣誉资质', icon: Trophy },
];

export default function AboutPage() {
  useSEO({
    title: '学校概况',
    description: '了解成都市田家炳中学的百年历史、办学理念、师资力量、校园环境及荣誉资质。始建于1925年，四川省一级示范性普通高中。',
    canonical: 'https://tjb.petricw.com/about',
    breadcrumbs: [
      { name: '首页', url: '/' },
      { name: '学校概况', url: '/about' },
    ],
  });
  const [activeTab, setActiveTab] = useState('overview');

  const displayedHistory = useMemo(
    () => MOCK_HISTORY,
    [],
  );

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // 延迟执行，确保状态更新和DOM渲染完成
    setTimeout(() => {
      const element = document.getElementById(value);
      if (element) {
        // 顶部导航 + sticky tabs 高度 + 余量
        const headerOffset = (window.innerWidth < 768 ? 64 : 80) + 48 + 8;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }, 50);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner：统一 PageHero 版式 */}
      <PageHero
        no="01"
        en="About"
        title="百年名校 薪火相传"
        desc="成都市田家炳中学始建于1925年，始称“成城公学”，2023年通过四川省一级示范性普通高中验收，2026年成为成都市六年贯通培养试点学校。学校秉承“履仁崇智 明德卓行”的校训，以百年积淀培育时代英才。"
      />

      {/* 数据概览条 */}
      <section className="w-full bg-card border-b-2 border-ink/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {MOCK_ABOUT_STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-3xl md:text-4xl font-black text-ink tabular-nums tracking-tight">
                    {stat.value}
                  </span>
                  {stat.suffix && (
                    <span className="text-lg font-bold text-accent">{stat.suffix}</span>
                  )}
                </div>
                <div className="flex items-center justify-center gap-2 mt-1.5">
                  <span className="size-1.5 bg-accent shrink-0" aria-hidden />
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 锚点导航 Tabs */}
      <section className="sticky top-16 md:top-20 z-40 w-full lg-glass bg-background/40 border-b-2 border-ink/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="h-12 w-full justify-start gap-0 bg-transparent p-0 overflow-x-auto">
              {SECTION_ANCHORS.map((anchor) => {
                const Icon = anchor.icon;
                return (
                  <TabsTrigger
                    key={anchor.id}
                    value={anchor.id}
                    className="h-12 px-4 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-accent data-[state=active]:text-ink data-[state=active]:font-bold rounded-none text-muted-foreground hover:text-ink transition-colors shrink-0 gap-2"
                  >
                    <Icon className="size-4" />
                    <span className="hidden sm:inline">{anchor.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16 space-y-20 md:space-y-24">
        {/* 学校概况 */}
        <section id="overview" className="scroll-mt-32">
          <div className="reveal-up">
            <SectionHeader
              no="02"
              en="Overview"
              title="学校概况"
              desc="了解田中的历史底蕴与办学实力"
            />
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3 space-y-4">
                <p className="text-base leading-relaxed text-foreground/85">
                  {MOCK_ABOUT.content}
                </p>
                <div className="flex flex-wrap gap-2.5 pt-2">
                  {[
                    '四川省一级示范校',
                    '百年名校',
                    '公办完全中学',
                    '田家炳系列',
                    '六年贯通试点',
                  ].map((tag) => (
                    <Badge
                      key={tag}
                      className="text-xs rounded-sm bg-ink text-white border-0 hover:bg-accent transition-colors"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                {/* 基本信息卡片 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {[
                    { icon: School, label: '学校性质', value: '公办完全中学' },
                    { icon: Calendar, label: '创办时间', value: '1925年' },
                    { icon: MapPin, label: '高中部', value: '锦江区顺江路369号' },
                    { icon: MapPin, label: '初中部', value: '锦江区莲新小区' },
                    { icon: Building2, label: '占地面积', value: '两校区共57亩' },
                    { icon: Building2, label: '建筑面积', value: '45940余平米' },
                  ].map((info) => {
                    const InfoIcon = info.icon;
                    return (
                      <div
                        key={info.label}
                        className="flex items-start gap-2.5 p-3 rounded-sm bg-card border-2 border-ink/20"
                      >
                        <InfoIcon className="size-4 text-accent shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <p className="text-xs text-muted-foreground">{info.label}</p>
                          <p className="text-sm font-semibold text-foreground">{info.value}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="lg:col-span-2">
                <div className="bg-card border-2 border-ink rounded-sm neo-shadow overflow-hidden corner-mark">
                  <div className="aspect-[4/3]">
                    <Image
                      src="/images/38Bp1wfimz.webp"
                      alt="成都市田家炳中学校徽"
                      className="w-full h-full object-contain p-8 bg-muted/20"
                    />
                  </div>
                  <div className="p-4 text-center border-t-2 border-ink/10">
                    <p className="text-sm font-bold text-foreground font-serif">成都市田家炳中学</p>
                    <p className="text-xs text-muted-foreground mt-0.5">校徽 · 1925年建校</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 百年校史 */}
        <section id="history" className="scroll-mt-32">
          <div className="reveal-up">
            <SectionHeader
              no="03"
              en="History"
              title="百年校史"
              desc="1925-2026，百余年薪火相传"
            />
            <div className="relative">
              {/* 时间线竖线 */}
              <div className="absolute left-6 md:left-8 top-2 bottom-2 w-0.5 bg-ink/15" aria-hidden />

              <div className="space-y-8">
                {displayedHistory.map((milestone) => (
                  <div
                    key={`${milestone.year}-${milestone.title}`}
                    className="relative pl-12 md:pl-20"
                  >
                    {/* 时间线方形节点 */}
                    <div
                      className={`absolute left-4 md:left-6 top-1.5 size-4 border-2 flex items-center justify-center rotate-45 ${
                        milestone.isEra
                          ? 'border-accent bg-accent'
                          : 'border-ink bg-background'
                      }`}
                      aria-hidden
                    >
                      {!milestone.isEra && (
                        <div className="size-1 bg-ink" />
                      )}
                    </div>

                    {milestone.isEra ? (
                      /* 时代标题：大号、无卡片、突出显示 */
                      <div className="pt-0.5">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <span className="px-2.5 py-1 text-xs font-bold text-white bg-accent rounded-sm tabular-nums">
                            {milestone.year}
                          </span>
                          <h3 className="text-xl md:text-2xl font-black text-ink font-serif">
                            {milestone.title}
                          </h3>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
                          {milestone.description}
                        </p>
                      </div>
                    ) : (
                      /* 具体事件：卡片形式 */
                      <div className="bg-card border-2 border-ink/25 hover:border-ink hover-neo-shadow transition-all duration-200 rounded-sm">
                        <div className="p-5 md:p-6">
                          <span className="text-2xl font-black text-accent tabular-nums font-english">
                            {milestone.year}
                          </span>
                          <h3 className="text-lg font-bold text-ink font-serif mb-2 mt-1">
                            {milestone.title}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {milestone.description}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 办学理念 */}
        <section id="philosophy" className="scroll-mt-32">
          <div className="reveal-up">
            <SectionHeader no="04" en="Philosophy" title="办学理念" />
            <div className="bg-card border-2 border-ink rounded-sm neo-shadow-lg">
              <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {[
                    { icon: BookOpen, label: '校训', value: '履仁崇智 明德卓行' },
                    { icon: GraduationCap, label: '办学理念', value: '崇实适性，润育心田' },
                    { icon: Award, label: '育人目标', value: '德智体美劳全面发展' },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.label} className="text-center p-4 border-2 border-ink/15 rounded-sm">
                        <div className="size-12 rounded-sm bg-ink flex items-center justify-center mx-auto mb-3">
                          <Icon className="size-6 text-white" />
                        </div>
                        <p className="text-xs text-muted-foreground mb-1 font-english tracking-[0.2em] uppercase">{item.label}</p>
                        <p className="text-base font-bold text-foreground font-serif">{item.value}</p>
                      </div>
                    );
                  })}
                </div>
                {/* 校风教风学风 */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  {[
                    { label: '校风', value: '勤奋、严谨、求实、创新' },
                    { label: '教风', value: '敬业、爱生、博学、善导' },
                    { label: '学风', value: '勤学、善思、明理、笃行' },
                  ].map((item) => (
                    <div key={item.label} className="text-center p-3.5 rounded-sm bg-ink text-white">
                      <p className="text-xs font-bold text-accent mb-1 tracking-[0.2em]">{item.label}</p>
                      <p className="text-sm text-white/85 font-serif">{item.value}</p>
                    </div>
                  ))}
                </div>
                <p className="text-base leading-relaxed text-foreground/85">
                  {MOCK_PHILOSOPHY.content}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 师资队伍 */}
        <section id="faculty" className="scroll-mt-32">
          <div className="reveal-up">
            <SectionHeader
              no="05"
              en="Faculty"
              title="师资队伍"
              desc="名师荟萃，匠心育人"
            />

            {/* 师资总体数据 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {[
                { icon: Users, label: '专任教师', value: '260', suffix: '余名' },
                { icon: Star, label: '市区学科带头人', value: '16', suffix: '名' },
                { icon: Award, label: '省市区特级教师', value: '20', suffix: '余名' },
                { icon: Microscope, label: '名师工作室', value: '10', suffix: '个' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="text-center p-4 rounded-sm bg-card border-2 border-ink/20 corner-mark"
                  >
                    <Icon className="size-6 text-accent mx-auto mb-2" />
                    <div className="flex items-baseline justify-center gap-0.5">
                      <span className="text-2xl font-black text-ink tabular-nums">{item.value}</span>
                      <span className="text-sm text-muted-foreground">{item.suffix}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
                  </div>
                );
              })}
            </div>

            {/* 教师卡片 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {MOCK_FACULTY.map((teacher) => (
                <div
                  key={teacher.id}
                  className="h-full bg-card border-2 border-ink/25 hover:border-ink hover-neo-shadow transition-all duration-200 rounded-sm text-center p-5"
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
                      <Users className="size-8 text-ink/40" />
                    )}
                  </div>
                  <h3 className="text-base font-bold text-ink font-serif">{teacher.name}</h3>
                  <div className="flex items-center justify-center gap-2 mt-1.5 mb-2.5">
                    <Badge className="text-[10px] rounded-sm bg-ink text-white border-0 py-0 px-1.5">
                      {teacher.title}
                    </Badge>
                    <Badge className="text-[10px] rounded-sm bg-accent text-white border-0 py-0 px-1.5">
                      {teacher.subject}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {teacher.description}
                  </p>
                </div>
              ))}
            </div>

            {/* 师资补充说明 */}
            <div className="mt-8 p-5 rounded-sm bg-ink text-white border-2 border-ink">
              <div className="flex items-start gap-3">
                <Globe className="size-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-white mb-2">师资建设成果</p>
                  <p className="text-sm text-white/75 leading-relaxed">
                    学校获评"四川省普通高中课程改革省级样本校"、"成都市第二批教师发展基地校"。市区学科带头人16名，市区优秀班主任、优秀教师等80余名。90%以上的新高一教师来自原高三毕业班，实战经验丰富。心理健康教师团队：专职教师5人，兼职教师70余人，其中国家心理咨询师8人，班主任B证持有率70%，教师全员持有C证，构建"专职教师+班主任+学科教师+家长"四支心育队伍。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 校园环境 */}
        <section id="campus" className="scroll-mt-32">
          <div className="reveal-up">
            <SectionHeader
              no="06"
              en="Campus"
              title="校园环境"
              desc="现代化校园，书香满园"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {MOCK_CAMPUS.map((item, i) => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden bg-card border-2 border-ink/25 hover:border-ink hover-neo-shadow transition-all duration-200 rounded-sm corner-mark"
                >
                  <div className="aspect-[16/9] overflow-hidden bg-muted">
                    <Image
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span
                    aria-hidden
                    className="photo-numeral absolute top-3 left-3 font-english text-3xl font-black text-white/95 tabular-nums leading-none select-none"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="p-4">
                    <h3 className="font-bold text-ink font-serif mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 荣誉资质 */}
        <section id="honors" className="scroll-mt-32">
          <div className="reveal-up">
            <SectionHeader
              no="07"
              en="Honors"
              title="荣誉资质"
              desc="以实力铸就品牌，以品质赢得口碑"
            />

            {/* 荣誉奖状图片展示 */}
            <div className="mb-10 bg-card border-2 border-ink rounded-sm neo-shadow-sm overflow-hidden">
              <div className="aspect-[21/9] md:aspect-[21/7] bg-muted/20">
                <Image
                  src="/images/badge-original.jpg"
                  alt="学校荣誉奖状"
                  className="w-full h-full object-contain p-4"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {MOCK_HONORS.map((honor) => (
                <div
                  key={honor.id}
                  className="h-full bg-card border-2 border-ink/25 hover:border-ink hover-neo-shadow transition-all duration-200 rounded-sm p-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="size-10 rounded-sm bg-accent flex items-center justify-center shrink-0 mt-0.5">
                      <Trophy className="size-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-bold text-ink font-serif mb-1.5 leading-snug">
                        {honor.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <span className="tabular-nums">{honor.year}</span>
                        <span className="text-ink/25">·</span>
                        <span>{honor.issuer}</span>
                        <Badge className="text-[10px] h-5 rounded-sm bg-ink text-white border-0 py-0 px-1.5">
                          {honor.level}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
