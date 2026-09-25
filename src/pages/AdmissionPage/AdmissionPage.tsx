import {
  Phone, Mail, MapPin, Clock, FileText, Search, PenTool, UserCheck,
  GraduationCap, BookOpen, Award, ArrowRight, Globe, Cpu, Heart,
  TrendingUp, Shield, Bus, Utensils, Moon, ExternalLink,
  Navigation, Train, Car,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  MOCK_ADMISSION_INFO, MOCK_ADMISSION_FEATURES, MOCK_ADMISSION_FAQ, MOCK_ADMISSION_PROCESS, MOCK_ADMISSION_FACULTY_STATS,
  MOCK_CAMPUSES, MOCK_TRANSPORT, MOCK_CONTACT_LINKS, MOCK_CONTACT_SOURCES,
} from '@/data/admission';
import type { IAdmissionFeature } from '@/data/admission';
import { UniversalLink } from '@/components/UniversalLink';
import { Image } from '@/components/ui/image';
import { PageHero } from '@/components/PageHero';
import { SectionHeader } from '@/components/SectionHeader';
import { useSEO } from '@/hooks/useSEO';

const processIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  FileText,
  PenTool,
  Search,
  Mail,
  UserCheck,
};

const featureIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  Cpu,
  Heart,
  TrendingUp,
  Shield,
};

const TRANSPORT_ICONS = [Train, Bus, Car];

function FeatureCard({ feature, index }: { feature: IAdmissionFeature; index: number }) {
  const Icon = featureIconMap[feature.icon] || Award;
  return (
    <div className="group relative h-full bg-card border-2 border-ink/25 hover:border-ink hover-neo-shadow transition-all duration-200 rounded-sm">
      <div className="p-6 pb-0">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="size-12 rounded-sm bg-ink flex items-center justify-center shrink-0 group-hover:bg-accent transition-colors">
              <Icon className="size-6 text-white" />
            </div>
            <div className="min-w-0">
              <h3 className="text-lg font-black leading-snug font-serif text-ink">{feature.title}</h3>
              <p className="text-sm text-accent font-bold mt-0.5">
                {feature.subtitle}
              </p>
            </div>
          </div>
          <span
            aria-hidden
            className="font-english text-3xl font-black text-ink/10 tabular-nums leading-none select-none group-hover:text-accent/30 transition-colors"
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
      </div>
      <div className="p-6 space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
        <ul className="space-y-1.5">
          {feature.highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/80">
              <span className="size-1.5 bg-accent shrink-0 mt-2" aria-hidden />
              {h}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function AdmissionPage() {
  useSEO({
    title: '招生招聘',
    description: '成都市田家炳中学2026年招生简章，含招生计划、特色班型、艺体特长生招生、报名流程、常见问题等。招生咨询电话：028-84551880。',
    canonical: 'https://tjb.petricw.com/admission',
    breadcrumbs: [
      { name: '首页', url: '/' },
      { name: '招生招聘', url: '/admission' },
    ],
  });
  return (
    <div className="min-h-screen bg-transparent">
      <main className="space-y-16 md:space-y-24">
        {/* Hero Banner：统一 PageHero 版式 */}
        <PageHero
          no="09"
          en="Admission"
          title={MOCK_ADMISSION_INFO.title}
          desc={MOCK_ADMISSION_INFO.subtitle}
          image={MOCK_ADMISSION_INFO.coverImage}
        />

        {/* 基础联系信息带 */}
        <section className="w-full">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 电话 */}
            <UniversalLink
              to={`tel:${MOCK_ADMISSION_INFO.contact.phone.replace(/-/g, '')}`}
              className="group flex items-start gap-3 p-4 rounded-sm border-2 border-ink/20 hover:border-accent transition-colors"
            >
              <div className="size-10 rounded-sm bg-accent/10 flex items-center justify-center">
                <Phone className="size-5 text-accent" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">招生咨询电话</p>
                <p className="text-lg font-black text-ink tabular-nums group-hover:text-accent transition-colors">
                  {MOCK_ADMISSION_INFO.contact.phone}
                </p>
              </div>
            </UniversalLink>
            {/* 邮箱 */}
            <UniversalLink
              to={`mailto:${MOCK_ADMISSION_INFO.contact.email}`}
              className="group flex items-start gap-3 p-4 rounded-sm border-2 border-ink/20 hover:border-accent transition-colors"
            >
              <div className="size-10 rounded-sm bg-accent/10 flex items-center justify-center">
                <Mail className="size-5 text-accent" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">电子邮箱</p>
                <p className="text-base font-bold text-ink truncate group-hover:text-accent transition-colors">
                  {MOCK_ADMISSION_INFO.contact.email}
                </p>
              </div>
            </UniversalLink>
            {/* 办公时间 */}
            <div className="flex items-start gap-3 p-4 rounded-sm border-2 border-ink/20">
              <div className="size-10 rounded-sm bg-accent/10 flex items-center justify-center">
                <Clock className="size-5 text-accent" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">办公时间</p>
                <p className="text-base font-bold text-ink">{MOCK_ADMISSION_INFO.contact.officeHours}</p>
              </div>
            </div>
            {/* 邮编 */}
            <div className="flex items-start gap-3 p-4 rounded-sm border-2 border-ink/20">
              <div className="size-10 rounded-sm bg-accent/10 flex items-center justify-center">
                <Globe className="size-5 text-accent" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">邮政编码</p>
                <p className="text-base font-bold text-ink tabular-nums">{MOCK_ADMISSION_INFO.contact.postcode}</p>
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* 招生概览 */}
        <section className="w-full">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="reveal-up">
              <SectionHeader
                no="02"
                en="Overview"
                title="招生概览"
                desc="2026年秋季招生计划速览"
              />
              <div className="bg-card border-2 border-ink rounded-sm neo-shadow p-6 md:p-8">
                <p className="text-base md:text-lg text-foreground/80 leading-relaxed mb-8">
                  {MOCK_ADMISSION_INFO.summary}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  {MOCK_ADMISSION_INFO.highlights.map((item) => (
                    <div key={item.label} className="text-center p-4 rounded-sm bg-muted/50 border-2 border-ink/15">
                      <div className="text-xs text-muted-foreground mb-1">{item.label}</div>
                      <div className="text-lg md:text-xl font-black text-ink tabular-nums">
                        {item.value}
                        {item.suffix && <span className="text-sm text-accent ml-0.5 font-bold">{item.suffix}</span>}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{item.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 五大办学特色 */}
        <section className="w-full">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="reveal-up">
              <SectionHeader
                no="03"
                en="Features"
                title="五大办学特色"
                desc="依托田家炳基金会全国平台，构建多元特色教育体系，助力每一位学子全面发展"
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {MOCK_ADMISSION_FEATURES.map((feature, i) => (
                  <FeatureCard key={feature.id} feature={feature} index={i} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 师资力量 */}
        <section className="w-full bg-muted/40 border-y-2 border-ink/10">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-20">
            <div className="reveal-up">
              <SectionHeader
                no="04"
                en="Faculty"
                title="师资力量"
                desc="专任教师260余名，90%以上的新高一教师来自原高三毕业班，实战经验丰富"
              />

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                {MOCK_ADMISSION_FACULTY_STATS.map((item) => (
                  <div
                    key={item.label}
                    className="text-center p-4 rounded-sm bg-card border-2 border-ink/20 corner-mark"
                  >
                    <div className="flex items-baseline justify-center gap-0.5">
                      <span className="text-2xl md:text-3xl font-black text-ink tabular-nums">{item.value}</span>
                      {item.suffix && <span className="text-sm text-accent font-bold">{item.suffix}</span>}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1.5 leading-tight">{item.label}</p>
                  </div>
                ))}
              </div>

              {/* 教师风采展示图 */}
              <div className="bg-card border-2 border-ink rounded-sm neo-shadow-sm overflow-hidden">
                <div className="aspect-[21/9] md:aspect-[21/7]">
                  <Image
                    src="/images/BwGQ1wfhTy.webp"
                    alt="优秀教师风采展示"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 招生流程：方形节点 */}
        <section className="w-full">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="reveal-up">
              <SectionHeader no="05" en="Process" title="招生流程" desc="五个环节，环环相扣" />

              <div className="relative">
                <div className="hidden lg:block absolute top-7 left-[10%] right-[10%] h-0.5 bg-ink/15 z-0" aria-hidden />

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10">
                  {MOCK_ADMISSION_PROCESS.map((step, i) => {
                    const Icon = processIcons[step.icon];
                    return (
                      <div
                        key={step.step}
                        className="flex flex-col items-center text-center"
                      >
                        <div className="relative mb-4">
                          <div className="size-14 rounded-sm bg-ink flex items-center justify-center border-2 border-ink neo-shadow-sm">
                            {Icon ? <Icon className="size-6 text-white" /> : <span className="text-lg font-black text-white">{step.step}</span>}
                          </div>
                          <div className="absolute -top-2 -right-2 size-6 rounded-sm bg-accent flex items-center justify-center border-2 border-ink">
                            <span className="text-xs font-black text-white tabular-nums">{step.step}</span>
                          </div>
                        </div>

                        <h3 className="text-base font-bold font-serif text-ink mb-1">{step.title}</h3>
                        <p className="text-xs text-accent font-bold mb-2 tabular-nums">{step.date}</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 报名条件 + 联系方式 */}
        <section id="contact" className="w-full scroll-mt-32">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="reveal-up">
              <SectionHeader
                no="06"
                en="Apply"
                title="报名条件与联系方式"
                desc="确认符合报名条件后，欢迎通过电话或邮件联系我们"
              />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-card border-2 border-ink rounded-sm neo-shadow-sm h-full p-6 md:p-8">
                <div className="flex items-center gap-3 mb-1">
                  <span className="w-1.5 h-5 bg-accent shrink-0" aria-hidden />
                  <h3 className="text-xl font-black font-serif text-ink flex items-center gap-2">
                    <BookOpen className="size-5 text-ink" />
                    报名条件
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground mb-6 ml-4">请仔细阅读以下报名条件，确保符合要求后再进行报名</p>
                <ul className="space-y-3.5">
                  {MOCK_ADMISSION_INFO.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="size-6 rounded-sm bg-ink flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-xs font-black text-white tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                      </div>
                      <span className="text-sm text-foreground/80 leading-relaxed">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-ink text-white border-2 border-ink rounded-sm neo-shadow-accent h-full p-6 md:p-8">
                <h3 className="text-xl font-black flex items-center gap-2 font-serif mb-6">
                  <Phone className="size-5 text-accent" />
                  联系我们
                </h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <MapPin className="size-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-bold text-white/90">学校地址</div>
                      <div className="text-sm text-white/70">{MOCK_ADMISSION_INFO.contact.address}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="size-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-bold text-white/90">招生电话</div>
                      <div className="text-sm text-white/70">{MOCK_ADMISSION_INFO.contact.phone}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="size-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-bold text-white/90">电子邮箱</div>
                      <div className="text-sm text-white/70">{MOCK_ADMISSION_INFO.contact.email}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="size-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-bold text-white/90">办公时间</div>
                      <div className="text-sm text-white/70">{MOCK_ADMISSION_INFO.contact.officeHours}</div>
                    </div>
                  </div>

                  <Separator className="bg-white/15" />

                  <Button
                    className="w-full bg-accent text-white hover:bg-accent/90 border-2 border-white/70 rounded-sm neo-press h-11 font-bold"
                    asChild
                  >
                    <UniversalLink to={`tel:${MOCK_ADMISSION_INFO.contact.phone}`}>
                      <Phone className="size-4 mr-2" />
                      电话咨询
                    </UniversalLink>
                  </Button>
                </div>
              </div>
              </div>
            </div>
          </div>
        </section>

        {/* 07 两校区与校园地图 */}
        <section id="campuses" className="w-full scroll-mt-32">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="reveal-up">
              <SectionHeader
                no="07"
                en="Campuses"
                title="两校区与校园地图"
                desc="学校分设高中部、初中部两个校区，均位于成都市锦江区，交通便利。点击下方按钮即可在地图中导航。"
              />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {MOCK_CAMPUSES.map((campus) => (
                  <article
                    key={campus.id}
                    className="bg-card border-2 border-ink rounded-sm neo-shadow overflow-hidden corner-mark"
                  >
                    <div className="aspect-[16/9] overflow-hidden">
                      <Image
                        src="/images/38Bp1wfimz.webp"
                        alt={`成都市田家炳中学${campus.name}校园`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-sm bg-ink flex items-center justify-center">
                          <MapPin className="size-5 text-accent" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-xl font-black text-ink">{campus.name}</h3>
                            <Badge className="text-xs rounded-sm bg-accent text-white border-0">{campus.stage}</Badge>
                          </div>
                          <p className="text-sm font-semibold text-foreground/85">{campus.address}</p>
                        </div>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-foreground/80">{campus.description}</p>
                      {/* 地图深链按钮 */}
                      <div className="mt-4 flex flex-wrap gap-3">
                        <a
                          href={campus.amapUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold bg-accent text-white rounded-sm neo-press"
                        >
                          <Navigation className="size-4" />
                          高德地图导航
                        </a>
                        <a
                          href={campus.baiduUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold bg-card text-ink border-2 border-ink rounded-sm neo-press"
                        >
                          <Navigation className="size-4" />
                          百度地图导航
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 08 交通指引 */}
        <section id="transport" className="w-full scroll-mt-32">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="reveal-up">
              <SectionHeader
                no="08"
                en="Getting Here"
                title="交通指引"
                desc="以高中部（顺江路369号）为例，公共交通便捷，欢迎莅临参观。"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {MOCK_TRANSPORT.map((item, i) => {
                  const Icon = TRANSPORT_ICONS[i] ?? Bus;
                  return (
                    <article
                      key={item.id}
                      className="p-6 rounded-sm bg-card border-2 border-ink/20 hover:border-accent transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="size-12 rounded-sm bg-accent/10 flex items-center justify-center">
                          <Icon className="size-6 text-accent" />
                        </div>
                        <div>
                          <Badge className="text-xs rounded-sm bg-ink text-white border-0">{item.mode}</Badge>
                          <h3 className="mt-1 text-base font-black text-ink">{item.title}</h3>
                        </div>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-foreground/85">{item.detail}</p>
                    </article>
                  );
                })}
              </div>
              <div className="mt-6 p-5 rounded-sm bg-accent/8 border-l-2 border-accent">
                <p className="text-sm text-foreground/80 leading-relaxed">
                  <strong className="text-ink">温馨提示：</strong>
                  高中部紧邻地铁6号线／13号线「三官堂」站，A口出站步行约50米即达；与四川大学隔江相望，区位优越。具体公交线路以实际运营为准，如有疑问欢迎来电咨询
                  <UniversalLink to={`tel:${MOCK_ADMISSION_INFO.contact.phone.replace(/-/g, '')}`} className="mx-1 text-accent font-semibold hover:underline">
                    {MOCK_ADMISSION_INFO.contact.phone}
                  </UniversalLink>
                  。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 校园生活与后勤保障 */}
        <section className="w-full bg-muted/40 border-y-2 border-ink/10">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-20">
            <div className="reveal-up">
              <SectionHeader
                no="09"
                en="Campus Life"
                title="校园生活与后勤保障"
                desc="完善的校园设施与贴心的后勤服务，为每一位田中学子提供安心舒适的学习生活环境"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    icon: Bus,
                    title: '便捷交通',
                    description: '地铁6号线、13号线三官堂站A口出站50米即达，多路公交可达。学校位于锦江区核心地段，交通网络四通八达。',
                  },
                  {
                    icon: Utensils,
                    title: '安心食堂',
                    description: '食堂可同时容纳2000余人就餐，提供一日三餐，安全卫生。午餐实行选餐制，提供A餐和B餐，每周更新食谱，菜品丰富、营养均衡。',
                  },
                  {
                    icon: Moon,
                    title: '晚自习管理',
                    description: '晚自习由任课教师或班主任值守，学生自愿参加。晚自习后由家长接回，确保学生安全。学校为走读制，每日放学后家长按时接送。',
                  },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="group relative h-full bg-card border-2 border-ink/25 hover:border-ink hover-neo-shadow transition-all duration-200 rounded-sm p-6"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="size-11 rounded-sm bg-ink flex items-center justify-center group-hover:bg-accent transition-colors">
                          <Icon className="size-5 text-white" />
                        </div>
                        <span
                          aria-hidden
                          className="font-english text-3xl font-black text-ink/10 tabular-nums leading-none select-none group-hover:text-accent/30 transition-colors"
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <h3 className="text-base font-bold font-serif text-ink mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 常见问题 FAQ */}
        <section className="w-full">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="reveal-up">
              <SectionHeader
                no="10"
                en="FAQ"
                title="常见问题"
                desc="关于招生录取的常见疑问，我们为您一一解答"
              />

              <div className="max-w-3xl mx-auto bg-card border-2 border-ink rounded-sm neo-shadow-sm p-4 md:p-6">
                <Accordion type="single" collapsible className="w-full">
                  {MOCK_ADMISSION_FAQ.map((faq, i) => (
                    <AccordionItem key={faq.id} value={faq.id}>
                      <AccordionTrigger className="text-left text-base font-semibold text-ink hover:text-accent transition-colors py-4">
                        <span className="flex items-start gap-3">
                          <span className="size-6 rounded-sm bg-ink flex items-center justify-center shrink-0 mt-0.5">
                            <span className="text-xs font-black text-white">Q</span>
                          </span>
                          {faq.question}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground leading-relaxed pl-9 pb-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </section>

        {/* 11 相关链接 + 资料来源 */}
        <section id="links" className="w-full scroll-mt-32">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="reveal-up">
              <SectionHeader no="11" en="Explore" title="相关链接" desc="了解更多田中信息" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {MOCK_CONTACT_LINKS.map((link) => (
                  <UniversalLink
                    key={link.label}
                    to={link.path}
                    className="group flex items-center justify-between p-5 rounded-sm bg-card border-2 border-ink neo-shadow-sm hover:border-accent hover:bg-accent/5 transition-colors"
                  >
                    <span className="text-base font-bold text-ink">{link.label}</span>
                    <ExternalLink className="size-5 text-accent shrink-0" />
                  </UniversalLink>
                ))}
              </div>

              {/* 资料来源 */}
              <div className="mt-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-1.5 h-5 bg-accent shrink-0" aria-hidden />
                  <span className="font-english text-xs font-bold tracking-[0.28em] uppercase text-muted-foreground">
                    Sources — 资料来源
                  </span>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {MOCK_CONTACT_SOURCES.map((source) => (
                    <li key={source.label}>
                      <UniversalLink
                        to={source.url}
                        className="group flex items-start gap-3 p-4 rounded-sm bg-card border-2 border-ink/20 hover:border-accent transition-colors"
                      >
                        <ExternalLink className="size-4 text-accent shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-ink group-hover:text-accent transition-colors">
                            {source.label}
                          </p>
                          {source.note && (
                            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{source.note}</p>
                          )}
                        </div>
                      </UniversalLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 底部 CTA */}
        <section className="w-full py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
            <div className="reveal-up">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-accent text-white text-sm font-bold mb-6">
                <Award className="size-4" />
                期待您的加入
              </div>
              <h2 className="text-2xl md:text-3xl font-black font-serif text-ink mb-4 tracking-tight">
                百年田中，期待与你相遇
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
                选择田家炳中学，就是选择了一个充满机遇与挑战的成长平台。
                我们期待每一位怀揣梦想的学子，在这里书写属于自己的精彩篇章。
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-ink text-white hover:bg-accent border-2 border-ink rounded-sm neo-press h-12 px-8 text-base font-bold"
                  asChild
                >
                  <UniversalLink to={`tel:${MOCK_ADMISSION_INFO.contact.phone}`}>
                    <Phone className="size-4 mr-2" />
                    立即咨询
                  </UniversalLink>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-ink rounded-sm neo-press bg-card h-12 px-8 text-base font-bold text-ink hover:bg-ink hover:text-white"
                  asChild
                >
                  <UniversalLink to={`mailto:${MOCK_ADMISSION_INFO.contact.email}`}>
                    <Mail className="size-4 mr-2" />
                    发送邮件
                  </UniversalLink>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
