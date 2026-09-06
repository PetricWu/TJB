import { ArticleCard } from '@/components/ArticleCard';
import { SectionHeader } from '@/components/SectionHeader';
import { sortedByDate } from '@/data/merged-articles';

export default function NewsSection() {
  // 取前 4 条新闻（置顶优先 + 日期降序，含 articles.txt 新增文章）
  const displayNews = sortedByDate().slice(0, 4);

  const [featured, ...briefs] = displayNews;

  return (
    <section className="w-full py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* 标题行 */}
        <div className="reveal-up">
          <SectionHeader
            no="02"
            en="News"
            title="校园资讯"
            link={{ to: '/news', label: '全部新闻' }}
          />
        </div>

        {/* 杂志式非对称布局：1 篇头条 + 3 篇简讯 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* 头条文章（大编号 + 角标） */}
          <div className="lg:col-span-7 reveal-up">
            {featured && (
              <ArticleCard
                id={featured.id}
                title={featured.title}
                summary={featured.summary}
                category={featured.category}
                coverImage={featured.coverImage}
                coverImage4x3={featured.coverImage4x3}
                publishDate={featured.publishDate}
                viewCount={featured.viewCount}
                isPinned={featured.isPinned}
                sourceUrl={featured.sourceUrl}
                variant="featured"
                index="01"
              />
            )}
          </div>

          {/* 简讯列表（编号列表） */}
          <div className="lg:col-span-5 reveal-up">
            {briefs.map((item, i) => (
              <ArticleCard
                key={item.id}
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
                variant="minimal"
                index={String(i + 2).padStart(2, '0')}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
