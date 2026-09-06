import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PageHero } from '@/components/PageHero';
import { ArticleCard } from '@/components/ArticleCard';
import { useSEO } from '@/hooks/useSEO';
import { mergedArticles, articleCategories } from '@/data/merged-articles';

const PAGE_SIZE = 5;

export default function NewsListPage() {
  useSEO({
    title: '校园新闻',
    description: '成都市田家炳中学最新校园新闻、活动报道、教学成果展示。关注田中动态，了解百年名校最新发展。',
    canonical: 'https://tjb.petricw.com/news',
    breadcrumbs: [
      { name: '首页', url: '/' },
      { name: '校园新闻', url: '/news' },
    ],
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const urlCategory = searchParams.get('category');
  const [category, setCategory] = useState<string>(urlCategory ?? 'all');
  const [keyword, setKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // 顶栏下拉通过 /news?category=xxx 导航时同步筛选状态
  useEffect(() => {
    setCategory(urlCategory ?? 'all');
    setCurrentPage(1);
  }, [urlCategory]);

  /** 滚动到文章列表顶部（避开固定顶栏） */
  const scrollToList = () => {
    setTimeout(() => {
      const element = document.getElementById('news-list');
      if (element) {
        const headerHeight = window.innerWidth < 768 ? 64 : 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 8;
        window.scrollTo({ top: Math.max(0, offsetPosition), behavior: 'smooth' });
      }
    }, 50);
  };

  const categories = articleCategories();

  const filtered = useMemo(() => {
    let result = [...mergedArticles];

    if (category !== 'all') {
      result = result.filter((item) => item.category === category);
    }

    if (keyword.trim()) {
      const kw = keyword.trim().toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(kw) ||
          item.summary.toLowerCase().includes(kw),
      );
    }

    result.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
    });

    return result;
  }, [category, keyword]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paged = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  /** 分类切换：统一走 URL，由 useEffect 同步状态 */
  const handleCategoryChange = (value: string) => {
    if (value === 'all') {
      setSearchParams({}, { preventScrollReset: true });
    } else {
      setSearchParams({ category: value }, { preventScrollReset: true });
    }
    scrollToList();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    scrollToList();
  };

  const clearSearch = () => {
    setKeyword('');
    setCurrentPage(1);
    scrollToList();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    scrollToList();
  };

  const resetAll = () => {
    setSearchParams({}, { preventScrollReset: true });
    setKeyword('');
    setCurrentPage(1);
    scrollToList();
  };

  return (
    <div className="min-h-screen bg-transparent">
      {/* 页面头部：统一 PageHero 版式 */}
      <PageHero
        no="02"
        en="News"
        title="校园资讯"
        desc="了解成都市田家炳中学最新动态，关注校园要闻、通知公告、教学教研、德育活动、学生发展、校庆专题及家校共育"
      />

      {/* 主体：左侧分类导航 + 右侧文章列表 */}
      <section className="w-full py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
            {/* ===== 左侧固定分类导航 ===== */}
            <aside className="shrink-0 lg:w-60">
              <div className="lg:sticky lg:top-24">
                {/* 搜索框 */}
                <form onSubmit={handleSearch} className="relative mb-6">
                  <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="搜索新闻"
                    className="bg-card pl-9 pr-9 h-10 text-sm rounded-sm border-2 border-ink/80 focus-visible:border-accent focus-visible:ring-accent/20"
                  />
                  {keyword && (
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 z-20 -translate-y-1/2 flex items-center justify-center size-6 text-muted-foreground hover:text-ink transition-colors"
                      onClick={clearSearch}
                      aria-label="清除搜索"
                    >
                      <svg className="size-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </form>

                {/* 分类导航列表（桌面） */}
                <nav className="hidden lg:block">
                  <div className="flex items-center gap-2.5 mb-3 px-1">
                    <span className="size-2 bg-accent shrink-0" aria-hidden />
                    <h3 className="font-english text-xs font-bold tracking-[0.28em] uppercase text-muted-foreground">
                      Category
                    </h3>
                  </div>
                  <div className="border-2 border-ink rounded-sm bg-card neo-shadow-sm">
                    <button
                      type="button"
                      onClick={() => handleCategoryChange('all')}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors border-b-2 border-ink/10 last:border-b-0 ${
                        category === 'all'
                          ? 'bg-ink text-white font-bold'
                          : 'text-foreground hover:bg-ink/5 font-medium'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className={`size-1.5 shrink-0 ${category === 'all' ? 'bg-accent' : 'bg-ink/25'}`}
                          aria-hidden
                        />
                        全部
                      </span>
                      <span
                        className={`text-xs tabular-nums px-1.5 py-0.5 rounded-sm ${
                          category === 'all'
                            ? 'bg-accent text-white'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {mergedArticles.length}
                      </span>
                    </button>
                    {categories.map((cat) => {
                      const isActive = category === cat;
                      const count = mergedArticles.filter((n) => n.category === cat).length;

                      return (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => handleCategoryChange(cat)}
                          className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors border-b-2 border-ink/10 last:border-b-0 ${
                            isActive
                              ? 'bg-ink text-white font-bold'
                              : 'text-foreground hover:bg-ink/5 font-medium'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span
                              className={`size-1.5 shrink-0 ${isActive ? 'bg-accent' : 'bg-ink/25'}`}
                              aria-hidden
                            />
                            {cat}
                          </span>
                          <span
                            className={`text-xs tabular-nums px-1.5 py-0.5 rounded-sm ${
                              isActive
                                ? 'bg-accent text-white'
                                : 'bg-muted text-muted-foreground'
                            }`}
                          >
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </nav>

                {/* 移动端分类筛选（横向滚动标签） */}
                <div className="lg:hidden flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleCategoryChange('all')}
                    className={`px-3 py-1.5 rounded-sm text-xs font-bold transition-colors ${
                      category === 'all'
                        ? 'bg-ink text-white'
                        : 'bg-card border-2 border-ink/60 text-foreground'
                    }`}
                  >
                    全部
                  </button>
                  {categories.map((cat) => {
                    const isActive = category === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => handleCategoryChange(cat)}
                        className={`px-3 py-1.5 rounded-sm text-xs font-bold transition-colors ${
                          isActive
                            ? 'bg-ink text-white'
                            : 'bg-card border-2 border-ink/60 text-foreground'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>
            </aside>

            {/* ===== 右侧文章列表 ===== */}
            <div id="news-list" className="flex-1 min-w-0 scroll-mt-24">
              {/* 结果统计 */}
              <div className="flex items-center gap-2.5 mb-5">
                <span className="w-1.5 h-5 bg-accent shrink-0" aria-hidden />
                <p className="text-sm text-muted-foreground">
                  共 <span className="font-bold text-ink tabular-nums">{filtered.length}</span> 条新闻
                  {category !== 'all' && (
                    <span>
                      {' '}· <span className="text-accent font-bold">{category}</span>
                    </span>
                  )}
                  {keyword && (
                    <span>
                      {' '}· 搜索：<span className="text-accent font-bold">"{keyword}"</span>
                    </span>
                  )}
                </p>
              </div>

              {paged.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-ink/25 rounded-sm bg-card/50">
                  <div className="size-16 border-2 border-ink rounded-sm flex items-center justify-center mb-4 neo-shadow-sm bg-card">
                    <Search className="size-7 text-ink/50" />
                  </div>
                  <h3 className="text-lg font-bold text-ink font-serif mb-2">
                    暂无相关新闻
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    尝试更换筛选条件或搜索关键词
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetAll}
                    className="border-2 border-ink rounded-sm neo-press bg-card"
                  >
                    重置筛选
                  </Button>
                </div>
              ) : (
                <>
                  {/* 文章列表 */}
                  <div className="space-y-4">
                    {paged.map((item, i: number) => (
                      <div key={item.id} className="reveal-up">
                        <ArticleCard
                          id={item.id}
                          title={item.title}
                          summary={item.summary}
                          category={item.category}
                          coverImage={item.coverImage}
                          coverImage4x3={item.coverImage4x3}
                          publishDate={item.publishDate}
                          viewCount={item.viewCount}
                          isPinned={item.isPinned}
                          sourceUrl={item.sourceUrl}
                          variant="default"
                          index={String((safePage - 1) * PAGE_SIZE + i + 1).padStart(2, '0')}
                        />
                      </div>
                    ))}
                  </div>

                  {/* 分页 */}
                  {totalPages > 1 && (
                    <div className="flex flex-wrap items-center justify-center gap-2 mt-10">
                      <button
                        type="button"
                        disabled={safePage <= 1}
                        onClick={() => handlePageChange(Math.max(1, safePage - 1))}
                        className="inline-flex items-center gap-1 px-4 py-2 text-sm font-semibold border-2 border-ink rounded-sm bg-card text-ink neo-shadow-sm neo-press disabled:opacity-35 disabled:pointer-events-none"
                      >
                        <ChevronLeft className="size-4" />
                        上一页
                      </button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          type="button"
                          onClick={() => handlePageChange(page)}
                          className={`inline-flex items-center justify-center min-w-[38px] px-2 py-2 text-sm font-bold tabular-nums border-2 rounded-sm neo-shadow-sm neo-press ${
                            page === safePage
                              ? 'bg-ink text-white border-ink'
                              : 'bg-card text-ink border-ink'
                          }`}
                        >
                          {page}
                        </button>
                      ))}

                      <button
                        type="button"
                        disabled={safePage >= totalPages}
                        onClick={() => handlePageChange(Math.min(totalPages, safePage + 1))}
                        className="inline-flex items-center gap-1 px-4 py-2 text-sm font-semibold border-2 border-ink rounded-sm bg-card text-ink neo-shadow-sm neo-press disabled:opacity-35 disabled:pointer-events-none"
                      >
                        下一页
                        <ChevronRight className="size-4" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
