import { useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Eye, User, ChevronLeft, ChevronRight, ExternalLink, Home } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Image } from '@/components/ui/image';
import { UniversalLink } from '@/components/UniversalLink';
import { MOCK_NEWS } from '@/data/news';
import type { INews } from '@/types/news';
import { useSEO } from '@/hooks/useSEO';

export default function NewsDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const news: INews | undefined = MOCK_NEWS.find((n) => n.id === id);

  useSEO({
    title: news?.title || '新闻详情',
    description: news?.summary || '成都市田家炳中学校园新闻详情',
    canonical: `https://tjb.petricw.com/news/${id}`,
    ogImage: news?.coverImage || undefined,
    ogType: 'article',
    breadcrumbs: [
      { name: '首页', url: '/' },
      { name: '校园新闻', url: '/news' },
      { name: news?.title || '新闻详情', url: `/news/${id}` },
    ],
    article: news
      ? {
          title: news.title,
          description: news.summary,
          publishDate: news.publishDate,
          author: news.author,
          image: news.coverImage,
          keywords: `${news.category},成都市田家炳中学,校园新闻`,
        }
      : undefined,
  });

  // 同分类相关推荐（排除当前文章，最多3篇）
  const relatedNews = useMemo(() => {
    if (!news) return [];
    return MOCK_NEWS.filter((n) => n.id !== id && n.category === news.category).slice(0, 3);
  }, [news, id]);

  // 未找到新闻
  if (!news) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <div className="text-6xl">📰</div>
        <h1 className="text-xl font-bold text-ink font-serif">新闻不存在</h1>
        <p className="text-muted-foreground">该新闻可能已被删除或链接无效</p>
        <Button
          variant="outline"
          onClick={() => navigate('/news')}
          className="border-2 border-ink rounded-sm neo-shadow-sm neo-press bg-card"
        >
          <ArrowLeft className="size-4 mr-2" />
          返回新闻列表
        </Button>
      </div>
    );
  }

  // 前后新闻导航
  const currentIndex = MOCK_NEWS.findIndex((n) => n.id === id);
  const prevNews = currentIndex > 0 ? MOCK_NEWS[currentIndex - 1] : null;
  const nextNews = currentIndex < MOCK_NEWS.length - 1 ? MOCK_NEWS[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-3xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* 面包屑导航 */}
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6 flex-wrap">
          <Link
            to="/"
            className="inline-flex items-center gap-1 hover:text-ink transition-colors"
          >
            <Home className="size-3.5" />
            首页
          </Link>
          <ChevronRight className="size-3.5 shrink-0" />
          <Link
            to="/news"
            className="hover:text-ink transition-colors"
          >
            新闻中心
          </Link>
          <ChevronRight className="size-3.5 shrink-0" />
          <span className="text-foreground/70 truncate max-w-[200px]">
            {news.title}
          </span>
        </nav>

        {/* 文章头部 */}
        <article className="bg-card border-2 border-ink rounded-sm neo-shadow-lg overflow-hidden">
          {/* 文章信息区 */}
          <div className="p-6 md:p-10 pb-0">
            {/* 分类标签 */}
            <div className="flex items-center gap-2 mb-4">
              <Badge className="text-xs rounded-sm bg-ink text-white border-0">
                {news.category}
              </Badge>
              {news.isPinned && (
                <Badge variant="destructive" className="text-xs rounded-sm">
                  置顶
                </Badge>
              )}
            </div>

            {/* 标题 */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-ink font-serif leading-tight tracking-tight mb-6">
              {news.title}
            </h1>

            {/* 元信息 */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-muted-foreground mb-8 pb-8 border-b-2 border-ink/15">
              <span className="flex items-center gap-1.5">
                <User className="size-4" />
                {news.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="size-4" />
                {news.publishDate}
              </span>
              <span className="flex items-center gap-1.5 tabular-nums">
                <Eye className="size-4" />
                {news.viewCount.toLocaleString()} 次阅读
              </span>
            </div>
          </div>

          {/* 封面图：自适应铺满，等比例缩放 */}
          {news.coverImage && (
            <div className="aspect-[16/9] overflow-hidden bg-muted border-y-2 border-ink/10">
              <Image
                src={news.coverImage}
                alt={news.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* 正文 */}
          <div className="p-6 md:p-10">
            <div className="prose prose-neutral max-w-none">
              {news.content.split('\n\n').map((paragraph, i) => {
                const trimmed = paragraph.trim();
                if (!trimmed) return null;

                const isHeading =
                  /^[一二三四五六七八九十]、/.test(trimmed) ||
                  (/^[A-Z]、/.test(trimmed) && trimmed.length < 30);

                if (isHeading) {
                  return (
                    <h2
                      key={i}
                      className="flex items-center gap-3 text-xl font-bold text-ink font-serif mt-8 mb-4 first:mt-0"
                    >
                      <span className="size-2 bg-accent shrink-0" aria-hidden />
                      {trimmed}
                    </h2>
                  );
                }

                return (
                  <p
                    key={i}
                    className="text-base leading-relaxed text-foreground/85 mb-4"
                  >
                    {trimmed}
                  </p>
                );
              })}
            </div>

            {/* 查看原文按钮 — 使用 UniversalLink 跳转微信公众号原文 */}
            {news.sourceUrl && (
              <div className="mt-10">
                <UniversalLink
                  to={news.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-accent text-white border-2 border-ink neo-shadow-sm neo-press font-bold text-sm"
                >
                  <ExternalLink className="size-4" />
                  查看原文（微信公众号）
                </UniversalLink>
              </div>
            )}
          </div>
        </article>

        {/* 前后导航 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          {prevNews ? (
            <Link
              to={`/news/${prevNews.id}`}
              className="group flex items-start gap-3 p-4 rounded-sm border-2 border-ink/25 hover:border-ink hover-neo-shadow bg-card transition-all duration-200"
            >
              <ChevronLeft className="size-5 text-muted-foreground group-hover:text-accent shrink-0 mt-0.5 transition-colors" />
              <div className="min-w-0">
                <span className="text-xs font-english font-bold tracking-[0.2em] uppercase text-muted-foreground">Prev</span>
                <p className="text-sm font-bold text-foreground group-hover:text-accent line-clamp-2 transition-colors mt-0.5">
                  {prevNews.title}
                </p>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextNews ? (
            <Link
              to={`/news/${nextNews.id}`}
              className="group flex items-start gap-3 p-4 rounded-sm border-2 border-ink/25 hover:border-ink hover-neo-shadow bg-card transition-all duration-200 sm:text-right sm:flex-row-reverse"
            >
              <ChevronRight className="size-5 text-muted-foreground group-hover:text-accent shrink-0 mt-0.5 transition-colors sm:order-2" />
              <div className="min-w-0 flex-1">
                <span className="text-xs font-english font-bold tracking-[0.2em] uppercase text-muted-foreground">Next</span>
                <p className="text-sm font-bold text-foreground group-hover:text-accent line-clamp-2 transition-colors mt-0.5">
                  {nextNews.title}
                </p>
              </div>
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* 返回列表按钮 */}
        <div className="mt-10 text-center">
          <Button
            variant="outline"
            onClick={() => navigate('/news')}
            className="inline-flex items-center gap-2 border-2 border-ink rounded-sm neo-shadow-sm neo-press bg-card"
          >
            <ArrowLeft className="size-4" />
            返回新闻列表
          </Button>
        </div>

        {/* 同分类相关推荐 */}
        {relatedNews.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1.5 h-5 bg-accent shrink-0" aria-hidden />
              <h2 className="text-xl font-black text-ink font-serif">
                相关推荐
              </h2>
              <Badge variant="secondary" className="text-xs rounded-sm">
                {news.category}
              </Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedNews.map((item) => (
                <UniversalLink
                  key={item.id}
                  to={item.sourceUrl || `/news/${item.id}`}
                  target={item.sourceUrl ? '_blank' : undefined}
                  rel={item.sourceUrl ? 'noreferrer' : undefined}
                  className="group block"
                >
                  <div className="h-full bg-card border-2 border-ink/25 hover:border-ink hover-neo-shadow transition-all duration-200 overflow-hidden rounded-sm corner-mark">
                    {item.coverImage && (
                      <div className="aspect-[16/9] overflow-hidden bg-muted">
                        <Image
                          src={item.coverImage}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <span className="text-xs text-muted-foreground tabular-nums font-display">
                        {item.publishDate}
                      </span>
                      <h3 className="text-sm font-bold text-ink font-serif group-hover:text-accent line-clamp-2 transition-colors mt-1">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </UniversalLink>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
