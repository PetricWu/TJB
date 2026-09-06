import { useMemo } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { sortedByDate, type ArticleSummary } from '@/data/merged-articles';
import { Image } from '@/components/ui/image';
import { SectionHeader } from '@/components/SectionHeader';

const categoryColor = (category: string) => {
  if (category === '德育活动') return 'text-accent';
  if (category === '学生发展') return 'text-ink font-bold';
  if (category === '心理健康') return 'text-ink font-bold';
  if (category === '高三成长') return 'text-destructive';
  return 'text-muted-foreground';
};

export default function EventsSection() {
  // 最新 6 篇公众号文章（articles.txt 新增文章自动出现，点击跳微信原文）
  const events = useMemo<ArticleSummary[]>(() => sortedByDate().slice(0, 6), []);

  return (
    <section className="w-full py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* 标题区 */}
        <div className="reveal-up">
          <SectionHeader
            no="03"
            en="Events"
            title="近期活动"
            link={{ to: '/news', label: '查看全部动态' }}
          />
        </div>

        {/* 时间线（方形节点 + 强调色，参考站几何元素） */}
        <div className="relative">
          {events.map((event, idx) => {
            const content = (
              <>
                <p className={`text-xs font-bold mb-1.5 ${categoryColor(event.category)}`}>
                  {event.category}
                </p>
                <h3 className="font-serif font-bold text-foreground group-hover:text-accent transition-colors mb-1">
                  {event.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {event.summary}
                </p>
              </>
            );

            return (
              <div
                key={event.id}
                className="relative flex flex-col md:flex-row md:gap-0 pb-8 last:pb-0 border-b-2 border-border/50 last:border-b-0"
              >
                {/* 日期（左） */}
                <div className="md:w-28 shrink-0 md:pt-1 md:text-right mb-2 md:mb-0 pl-8 md:pl-0">
                  <span className="font-display text-sm font-bold text-accent whitespace-nowrap tabular-nums">
                    {event.publishDate}
                  </span>
                </div>

                {/* 竖线 + 方形节点（作为 flex 子元素，非 absolute） */}
                <div className="hidden md:flex md:flex-col md:items-center md:w-8 md:shrink-0">
                  {idx === 0 ? (
                    <div className="w-px h-4 bg-transparent" />
                  ) : (
                    <div className="w-px flex-1 bg-border" />
                  )}
                  <div className="w-3 h-3 bg-accent border-2 border-background shrink-0 my-1" />
                  {idx === events.length - 1 ? (
                    <div className="w-px h-4 bg-transparent" />
                  ) : (
                    <div className="w-px flex-1 bg-border" />
                  )}
                </div>

                {/* 移动端竖线 + 方形节点 */}
                <div className="absolute left-[11px] top-1 bottom-0 w-px bg-border md:hidden" />
                <div className="absolute left-[7px] top-1 w-2.5 h-2.5 bg-accent md:hidden" />

                {/* 内容（右）— 点击直接跳微信原文 */}
                <div className="md:flex-1 md:flex md:items-start md:gap-4 pl-8 md:pl-2">
                  <a
                    href={event.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="md:flex-1 block group"
                  >
                    {content}
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-ink mt-2">
                      阅读原文 <ArrowUpRight className="size-3" />
                    </span>
                  </a>

                  {/* 缩略图 */}
                  <a
                    href={event.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 mt-3 md:mt-0"
                    aria-label={event.title}
                  >
                    <Image
                      src={event.coverImage4x3 || event.coverImage}
                      alt={event.title}
                      className="w-24 h-24 rounded-sm object-cover border-2 border-ink/80"
                    />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
