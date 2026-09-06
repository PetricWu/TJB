import { useState, useMemo } from 'react';
import { Heart, Brain, GraduationCap, Calendar, ArrowRight, BookOpen, Users, ShieldCheck, User, Clock, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { MOCK_MORAL_ACTIVITIES, MOCK_PSYCHOLOGY_ARTICLES, MOCK_SENIOR_GROWTH, type IMoralActivity, type IArticleDetail } from '@/data/moral';
import { mergedArticles, type ArticleSummary } from '@/data/merged-articles';
import { Image } from '@/components/ui/image';
import { PageHero } from '@/components/PageHero';
import { SectionHeader } from '@/components/SectionHeader';
import { useSEO } from '@/hooks/useSEO';
import { UniversalLink } from '@/components/UniversalLink';

const TAB_ITEMS = [
  { value: 'activities', label: '德育活动', icon: Heart },
  { value: 'psychology', label: '心理健康', icon: Brain },
  { value: 'senior', label: '高三成长', icon: GraduationCap },
] as const;

const MORAL_VALUES = [
  { icon: Heart, title: '以德为先', description: '践行社会主义核心价值观，培养有家国情怀的时代新人' },
  { icon: BookOpen, title: '以文化人', description: '传承中华优秀传统文化，厚植人文底蕴' },
  { icon: Users, title: '以行践知', description: '在志愿服务与社会实践中锤炼品格' },
  { icon: ShieldCheck, title: '以心育心', description: '关注心理健康，构建积极阳光的成长生态' },
];

function ActivityCard({ activity, index, onClick }: { activity: IMoralActivity; index: number; onClick: (activity: IMoralActivity) => void }) {
  return (
    <div
      className="group relative h-full overflow-hidden bg-card border-2 border-ink/25 hover:border-ink hover-neo-shadow transition-all duration-200 rounded-sm cursor-pointer corner-mark"
      onClick={() => onClick(activity)}
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        {activity.image ? (
          <Image
            src={activity.image}
            alt={activity.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-ink/5">
            <Calendar className="size-10 text-muted-foreground/40" />
          </div>
        )}
        <div className="absolute top-3 left-3">
          <Badge className="text-xs rounded-sm bg-ink text-white border-0">
            {activity.category}
          </Badge>
        </div>
        <span
          aria-hidden
          className="photo-numeral absolute bottom-2 right-3 font-english text-3xl font-black text-white/95 tabular-nums leading-none select-none"
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2 tabular-nums">
          <Calendar className="size-3.5" />
          <span>{activity.date}</span>
        </div>
        <h3 className="text-base font-bold font-serif text-ink group-hover:text-accent transition-colors line-clamp-2 mb-2">
          {activity.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {activity.description}
        </p>
      </div>
    </div>
  );
}

function MoralArticleCard({ article, index }: { article: ArticleSummary; index: number }) {
  return (
    <a
      href={article.sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full"
    >
      <div className="relative h-full overflow-hidden bg-card border-2 border-ink/25 hover:border-ink hover-neo-shadow transition-all duration-200 rounded-sm corner-mark">
        <div className="relative aspect-[16/9] overflow-hidden bg-muted">
          <Image
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3">
            <Badge className="text-xs rounded-sm bg-ink text-white border-0">
              {article.category}
            </Badge>
          </div>
          <span
            aria-hidden
            className="photo-numeral absolute bottom-2 right-3 font-english text-3xl font-black text-white/95 tabular-nums leading-none select-none"
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2 tabular-nums">
            <Calendar className="size-3.5" />
            <span>{article.publishDate}</span>
          </div>
          <h3 className="text-base font-bold font-serif text-ink group-hover:text-accent transition-colors line-clamp-2 mb-2">
            {article.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {article.summary}
          </p>
          <span className="inline-flex items-center gap-1 text-xs font-bold text-ink mt-3 group-hover:translate-x-0.5 transition-transform">
            阅读原文
            <ExternalLink className="size-3.5" />
          </span>
        </div>
      </div>
    </a>
  );
}

function ArticleDetailDialog({
  article,
  open,
  onOpenChange,
}: {
  article: IArticleDetail | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!article) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto rounded-sm border-2 border-ink">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-bold text-foreground leading-tight pr-8 font-serif">
            {article.title}
          </DialogTitle>
          <DialogDescription asChild>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-2">
              <span className="flex items-center gap-1.5">
                <User className="size-4" />
                {article.author}
              </span>
              <span className="flex items-center gap-1.5 tabular-nums">
                <Clock className="size-4" />
                {article.date}
              </span>
            </div>
          </DialogDescription>
        </DialogHeader>

        <Separator className="my-4" />

        <div className="prose prose-neutral max-w-none">
          {article.content.split('\n\n').map((paragraph, i) => {
            const trimmed = paragraph.trim();
            if (!trimmed) return null;

            const isHeading =
              /^[一二三四五六七八九十]、/.test(trimmed) ||
              (/^[A-Z]、/.test(trimmed) && trimmed.length < 30);

            if (isHeading) {
              return (
                <h3
                  key={i}
                  className="flex items-center gap-3 text-lg font-bold font-serif text-ink mt-6 mb-3 first:mt-0"
                >
                  <span className="size-2 bg-accent shrink-0" aria-hidden />
                  {trimmed}
                </h3>
              );
            }

            if (trimmed.startsWith('•')) {
              return (
                <p key={i} className="text-base leading-relaxed text-foreground/85 mb-2 pl-4">
                  {trimmed}
                </p>
              );
            }

            return (
              <p key={i} className="text-base leading-relaxed text-foreground/85 mb-4">
                {trimmed}
              </p>
            );
          })}
        </div>

        {/* 查看原文按钮 */}
        {article.sourceUrl && (
          <div className="mt-6 pt-4 border-t border-border">
            <UniversalLink
              to={article.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-accent border-2 border-ink rounded-sm neo-shadow-sm neo-press"
            >
              查看原文
              <ExternalLink className="size-4" />
            </UniversalLink>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function MoralPage() {
  useSEO({
    title: '德育心育',
    description: '成都市田家炳中学德育与心理健康教育，四川省首批中小学心理健康教育引领校，5名专职心理教师，"馨田"心育课程体系。',
    canonical: 'https://tjb.petricw.com/moral',
    breadcrumbs: [
      { name: '首页', url: '/' },
      { name: '德育园地', url: '/moral' },
    ],
  });
  const [activeTab, setActiveTab] = useState('activities');
  const [selectedArticle, setSelectedArticle] = useState<IArticleDetail | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // 德育活动 tab：公众号文章（点击直接跳微信原文）
  const moralArticles = useMemo(
    () => mergedArticles.filter((a) => a.category === '德育活动'),
    [],
  );

  const filteredActivities = useMemo(() => {
    if (activeTab === 'psychology') {
      return MOCK_MORAL_ACTIVITIES.filter((a) => a.category === '心理健康');
    }
    if (activeTab === 'senior') {
      return MOCK_MORAL_ACTIVITIES.filter((a) => a.category === '高三成长');
    }
    return [];
  }, [activeTab]);

  const [selectedActivity, setSelectedActivity] = useState<IMoralActivity | null>(null);
  const [activityDialogOpen, setActivityDialogOpen] = useState(false);

  const handleOpenArticle = (article: IArticleDetail) => {
    setSelectedArticle(article);
    setDialogOpen(true);
  };

  const handleOpenActivity = (activity: IMoralActivity) => {
    setSelectedActivity(activity);
    setActivityDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-transparent">
      {/* Hero Banner：统一 PageHero 版式 */}
      <PageHero
        no="05"
        en="Moral"
        title="履仁崇智 立德树人"
        desc="以“田家炳精神”为德育品牌，构建“课程+活动+文化”三位一体育人体系，培养德智体美劳全面发展的社会主义建设者和接班人。"
      />

      {/* 德育理念卡片：编号卡片 */}
      <section className="w-full py-14 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 reveal-up">
            {MORAL_VALUES.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group relative bg-card border-2 border-ink/25 hover:border-ink hover-neo-shadow transition-all duration-200 rounded-sm p-6 text-center"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="inline-flex items-center justify-center size-12 rounded-sm bg-ink text-white mx-auto group-hover:bg-accent transition-colors">
                      <Icon className="size-6" />
                    </div>
                    <span
                      aria-hidden
                      className="font-english text-3xl font-black text-ink/10 tabular-nums leading-none select-none group-hover:text-accent/30 transition-colors"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="text-lg font-black font-serif text-ink mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 活动 Tabs 区 */}
      <section id="activities" className="w-full py-14 md:py-20 bg-muted/40 border-y-2 border-ink/10 scroll-mt-32">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="reveal-up">
            <SectionHeader
              no="02"
              en="Activities"
              title="德育活动"
              desc="丰富的活动载体，让德育在体验中生根发芽"
              center
            />

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="bg-card border-2 border-ink rounded-sm p-1">
                  {TAB_ITEMS.map((tab) => {
                    const TabIcon = tab.icon;
                    return (
                      <TabsTrigger
                        key={tab.value}
                        value={tab.value}
                        className="gap-2 px-4 py-2 text-sm rounded-none data-[state=active]:bg-ink data-[state=active]:text-white data-[state=active]:shadow-none font-semibold"
                      >
                        <TabIcon className="size-4" />
                        <span className="hidden sm:inline">{tab.label}</span>
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
              </div>

              {TAB_ITEMS.map((tab) => (
                <TabsContent key={tab.value} value={tab.value} className="mt-0">
                  {tab.value === 'activities' ? (
                    moralArticles.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {moralArticles.map((article, i) => (
                          <MoralArticleCard key={article.id} article={article} index={i} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-16 text-muted-foreground border-2 border-dashed border-ink/25 rounded-sm">
                        <Calendar className="size-12 mx-auto mb-4 text-muted-foreground/40" />
                        <p className="text-lg font-bold text-ink font-serif">暂无德育活动相关文章</p>
                        <p className="text-sm mt-1">敬请期待更多精彩内容</p>
                      </div>
                    )
                  ) : filteredActivities.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredActivities.map((activity, i) => (
                        <ActivityCard key={activity.id} activity={activity} index={i} onClick={handleOpenActivity} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16 text-muted-foreground border-2 border-dashed border-ink/25 rounded-sm">
                      <Calendar className="size-12 mx-auto mb-4 text-muted-foreground/40" />
                      <p className="text-lg font-bold text-ink font-serif">暂无{tab.label}相关活动</p>
                      <p className="text-sm mt-1">敬请期待更多精彩内容</p>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </section>

      {/* 心理健康资源 */}
      <section id="psychology" className="w-full py-14 md:py-20 scroll-mt-32">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="reveal-up">
            <SectionHeader
              no="03"
              en="Psychology"
              title="心理健康"
              desc="关注每一位学生的心理成长，提供专业的心理辅导与支持"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {MOCK_PSYCHOLOGY_ARTICLES.map((article, i) => (
                <div
                  key={article.id}
                  className="group relative h-full bg-card border-2 border-ink/25 hover:border-ink hover-neo-shadow transition-all duration-200 rounded-sm p-6 cursor-pointer"
                  onClick={() => handleOpenArticle(article)}
                >
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="size-8 rounded-sm bg-accent flex items-center justify-center shrink-0">
                      <Brain className="size-4 text-white" />
                    </div>
                    <span className="text-xs text-muted-foreground tabular-nums">{article.date}</span>
                  </div>
                  <h3 className="text-base font-bold font-serif text-ink group-hover:text-accent transition-colors line-clamp-2 mb-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-4">
                    {article.summary}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{article.author}</span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-ink group-hover:translate-x-0.5 transition-transform">
                      阅读全文
                      <ArrowRight className="size-3.5" />
                    </span>
                  </div>
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

      {/* 高三成长 */}
      <section id="senior" className="w-full py-14 md:py-20 bg-muted/40 border-y-2 border-ink/10 scroll-mt-32">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="reveal-up">
            <SectionHeader
              no="04"
              en="Senior"
              title="高三成长"
              desc="陪伴高三学子走过人生关键阶段，助力每一位追梦人圆梦高考"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {MOCK_SENIOR_GROWTH.map((item, i) => (
                <div
                  key={item.id}
                  className="group relative h-full bg-card border-2 border-ink/25 hover:border-ink hover-neo-shadow transition-all duration-200 rounded-sm p-6 cursor-pointer"
                  onClick={() => handleOpenArticle(item)}
                >
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="size-8 rounded-sm bg-ink flex items-center justify-center shrink-0">
                      <GraduationCap className="size-4 text-white" />
                    </div>
                    <span className="text-xs text-muted-foreground tabular-nums">{item.date}</span>
                  </div>
                  <h3 className="text-base font-bold font-serif text-ink group-hover:text-accent transition-colors line-clamp-2 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-4">
                    {item.summary}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{item.author}</span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-ink group-hover:translate-x-0.5 transition-transform">
                      阅读全文
                      <ArrowRight className="size-3.5" />
                    </span>
                  </div>
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

      {/* 底部 CTA */}
      <section className="w-full py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="reveal-up relative bg-ink text-white border-2 border-ink rounded-sm neo-shadow-accent overflow-hidden">
            <span className="absolute top-6 right-6 size-5 border-t-2.5 border-r-2.5 border-accent" aria-hidden />
            <span className="absolute bottom-6 left-6 size-5 border-b-2.5 border-l-2.5 border-accent" aria-hidden />
            <div className="p-8 md:p-12 text-center">
              <Heart className="size-12 text-accent mx-auto mb-6" />
              <h2 className="text-2xl md:text-3xl font-black font-serif mb-4 tracking-tight">
                关注学生全面发展
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed">
                成都市田家炳中学始终将德育放在首位，以丰富多彩的活动为载体，
                以心理健康教育为保障，以高三成长关怀为重点，助力每一位学子健康成长、全面发展。
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-accent text-white hover:bg-accent/90 border-2 border-white/70 rounded-sm neo-press font-bold"
                  onClick={() => {
                    const el = document.getElementById('psychology');
                    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  了解心理健康
                  <ArrowRight className="ml-2 size-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/40 text-white hover:bg-white/10 hover:text-white rounded-sm neo-press font-bold"
                  onClick={() => {
                    const el = document.getElementById('senior');
                    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                >
                  高三成长故事
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 文章详情弹窗 */}
      <ArticleDetailDialog
        article={selectedArticle}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />

      {/* 活动详情弹窗 */}
      <Dialog open={activityDialogOpen} onOpenChange={setActivityDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto rounded-sm border-2 border-ink">
          {selectedActivity && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl md:text-2xl font-bold text-foreground leading-tight pr-8 font-serif">
                  {selectedActivity.title}
                </DialogTitle>
                <DialogDescription asChild>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-2">
                    <span className="flex items-center gap-1.5 tabular-nums">
                      <Calendar className="size-4" />
                      {selectedActivity.date}
                    </span>
                    <Badge className="text-xs rounded-sm bg-ink text-white border-0">{selectedActivity.category}</Badge>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <Separator className="my-4" />
              {selectedActivity.image && (
                <div className="aspect-[16/9] rounded-sm border-2 border-ink overflow-hidden mb-6">
                  <Image
                    src={selectedActivity.image}
                    alt={selectedActivity.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="text-base leading-relaxed text-foreground/85">
                {selectedActivity.description}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
