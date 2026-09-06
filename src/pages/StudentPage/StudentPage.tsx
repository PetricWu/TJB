import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Calendar, MapPin, Users, Award, ArrowRight, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { MOCK_STUDENT_ACTIVITIES, MOCK_STUDENT_NEWS, type IStudentActivity } from '@/data/student';
import { Image } from '@/components/ui/image';
import { PageHero } from '@/components/PageHero';
import { SectionHeader } from '@/components/SectionHeader';
import { useSEO } from '@/hooks/useSEO';
import { UniversalLink } from '@/components/UniversalLink';

// 实拍图映射：用用户提供的实拍素材替换原有占位图
const ACTIVITY_PHOTOS: Record<string, string> = {
  'sa-1': '/images/3P0c1wfhUd.webp',
  'sa-2': '/images/f3VN1wfhUd.webp',
  'sa-3': '/images/Xam21wfhUd.webp',
  'sa-4': '/images/ZFrD1wfhUd.webp',
  'sa-5': '/images/wOVr1wfhUd.webp',
};

// 学生动态新闻封面图映射
const NEWS_PHOTOS: Record<string, string> = {
  'sn-1': '/images/gypV1wfhUK.webp',
  'sn-2': '/images/XYQD1wfhUK.webp',
};

// 顶栏下拉锚点映射：#art/#sports/#clubs/#practice → 对应活动分类
const HASH_TAB_MAP: Record<string, string> = {
  '#art': '艺术活动',
  '#sports': '体育活动',
  '#clubs': '社团活动',
  '#practice': '实践活动',
};

function ActivityCard({ activity, index }: { activity: IStudentActivity; index: number }) {
  const photoUrl = ACTIVITY_PHOTOS[activity.id] || activity.coverImage;

  const handleClick = () => {
    if (activity.sourceUrl) {
      window.open(activity.sourceUrl, '_blank');
    }
  };

  return (
    <div
      className={`group relative h-full overflow-hidden bg-card border-2 border-ink/25 hover:border-ink hover-neo-shadow transition-all duration-200 rounded-sm corner-mark ${
        activity.sourceUrl ? 'cursor-pointer' : ''
      }`}
      onClick={handleClick}
    >
      {/* 图片区 */}
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        {photoUrl ? (
          <Image
            src={photoUrl}
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
        {activity.sourceUrl && (
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-ink/70 text-white text-xs px-2 py-1 rounded-sm flex items-center gap-1 font-bold">
              <ExternalLink className="size-3" />
              查看原文
            </div>
          </div>
        )}
        <span
          aria-hidden
          className="photo-numeral absolute bottom-2 right-3 font-english text-3xl font-black text-white/95 tabular-nums leading-none select-none"
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <div className="p-5">
        {/* 日期 + 地点 */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
          <span className="flex items-center gap-1.5 tabular-nums">
            <Calendar className="size-3.5" />
            {activity.date}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="size-3.5" />
            {activity.location}
          </span>
        </div>
        {/* 标题 */}
        <h3 className="text-base font-bold font-serif text-ink group-hover:text-accent transition-colors line-clamp-2 mb-2">
          {activity.title}
        </h3>
        {/* 描述 */}
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-3">
          {activity.description}
        </p>
        {/* 亮点标签 */}
        {activity.highlights.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {activity.highlights.slice(0, 3).map((h, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm bg-accent/10 text-accent text-xs font-bold border border-accent/25"
              >
                <Award className="size-3" />
                {h}
              </span>
            ))}
          </div>
        )}
        {/* 组织方 */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Users className="size-3.5" />
          <span>{activity.organizer}</span>
        </div>
      </div>
    </div>
  );
}

function NewsCard({ item, index }: { item: typeof MOCK_STUDENT_NEWS[number]; index: number }) {
  const coverUrl = NEWS_PHOTOS[item.id] || item.coverImage;

  const handleClick = () => {
    if ((item as any).sourceUrl) {
      window.open((item as any).sourceUrl, '_blank');
    }
  };

  return (
    <div
      className={`group bg-card border-2 border-ink/25 hover:border-ink hover-neo-shadow transition-all duration-200 rounded-sm ${
        (item as any).sourceUrl ? 'cursor-pointer' : ''
      }`}
      onClick={handleClick}
    >
      <div className="p-4 flex gap-4">
        {coverUrl ? (
          <div className="shrink-0 w-24 h-16 rounded-sm overflow-hidden bg-muted border-2 border-ink/60">
            <Image
              src={coverUrl}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        ) : (
          <div className="shrink-0 w-24 h-16 rounded-sm overflow-hidden bg-muted border-2 border-ink/60 flex items-center justify-center">
            <Calendar className="size-6 text-muted-foreground/30" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <Badge className="text-[10px] rounded-sm bg-ink text-white border-0 py-0 px-1.5">{item.category}</Badge>
            <span className="text-xs text-muted-foreground tabular-nums">{item.publishDate}</span>
          </div>
          <h4 className="text-sm font-bold font-serif text-foreground group-hover:text-accent transition-colors line-clamp-2 leading-snug">
            {item.title}
          </h4>
          <p className="text-xs text-muted-foreground line-clamp-1 mt-1">{item.summary}</p>
        </div>
        <span
          aria-hidden
          className="hidden sm:block self-start font-english text-xl font-black text-ink/10 tabular-nums leading-none select-none group-hover:text-accent/30 transition-colors"
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
}

export default function StudentPage() {
  useSEO({
    title: '学生天地',
    description: '成都市田家炳中学学生活动与社团风采，涵盖艺术、体育、科技、志愿服务等丰富校园生活，展现田中学子全面发展。',
    canonical: 'https://tjb.petricw.com/student',
    breadcrumbs: [
      { name: '首页', url: '/' },
      { name: '学生发展', url: '/student' },
    ],
  });
  const [activeTab, setActiveTab] = useState('all');
  const location = useLocation();

  useEffect(() => {
    const targetTab = HASH_TAB_MAP[location.hash];
    if (!targetTab) return;
    setActiveTab(targetTab);
    const timer = setTimeout(() => {
      const element = document.getElementById('activities');
      if (element) {
        const headerHeight = window.innerWidth < 768 ? 64 : 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 8;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }, 150);
    return () => clearTimeout(timer);
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-transparent">
      <main className="space-y-16 md:space-y-24">
        {/* Hero Banner：统一 PageHero 版式 */}
        <PageHero
          no="06"
          en="Student"
          title="多元发展 全面成才"
          desc="艺术、体育、社团、实践四位一体，让每一位田中学子找到属于自己的舞台，在体验中成长，在实践中收获。"
        />

        {/* 活动展示区 */}
        <section id="activities" className="w-full py-14 md:py-20 bg-muted/40 border-y-2 border-ink/10 scroll-mt-32">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="reveal-up">
              <SectionHeader
                no="02"
                en="Activities"
                title="精彩活动"
                desc="记录每一次成长，见证每一份精彩"
              />

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="flex flex-wrap items-center gap-2 mb-8">
                  <TabsList className="bg-card border-2 border-ink rounded-sm p-1 h-auto">
                    {(['all', '艺术活动', '体育活动', '社团活动', '实践活动'] as const).map((tab) => (
                      <TabsTrigger
                        key={tab}
                        value={tab}
                        className="text-sm rounded-none px-4 py-2 data-[state=active]:bg-ink data-[state=active]:text-white data-[state=active]:shadow-none font-semibold"
                      >
                        {tab === 'all' ? '全部' : tab}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                {(['all', '艺术活动', '体育活动', '社团活动', '实践活动'] as const).map((tab) => {
                  const items = tab === 'all'
                    ? MOCK_STUDENT_ACTIVITIES
                    : MOCK_STUDENT_ACTIVITIES.filter((a) => a.category === tab);
                  return (
                    <TabsContent key={tab} value={tab} className="mt-0">
                      {items.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {items.map((activity, i) => (
                            <ActivityCard key={activity.id} activity={activity} index={i} />
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12 text-muted-foreground border-2 border-dashed border-ink/25 rounded-sm">
                          <p className="font-bold text-ink font-serif">暂无该分类的活动</p>
                        </div>
                      )}
                    </TabsContent>
                  );
                })}
              </Tabs>
            </div>
          </div>
        </section>

        {/* 最新动态 */}
        <section className="w-full py-14 md:py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="reveal-up">
              <SectionHeader
                no="03"
                en="News"
                title="最新动态"
                desc="学生发展相关新闻与通知"
                link={{ to: '/news', label: '更多动态' }}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MOCK_STUDENT_NEWS.map((item, i) => (
                  <NewsCard key={item.id} item={item} index={i} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 底部 CTA */}
        <section className="w-full py-16 md:py-20 bg-ink border-t-2 border-ink">
          <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-black font-serif text-white mb-4 tracking-tight">
              加入田中，绽放青春
            </h2>
            <p className="text-white/70 max-w-xl mx-auto mb-8 leading-relaxed">
              成都市田家炳中学为每一位学生提供多元发展的平台，
              欢迎优秀学子加入我们，共同书写精彩人生。
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-accent text-white hover:bg-accent/90 border-2 border-white/70 rounded-sm neo-press h-12 px-8 text-base font-bold"
                asChild
              >
                <UniversalLink to="/admission">招生信息</UniversalLink>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/40 text-white hover:bg-white/10 hover:text-white rounded-sm neo-press h-12 px-8 text-base font-bold"
                asChild
              >
                <UniversalLink to="/about">了解田中</UniversalLink>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
