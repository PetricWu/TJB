// 精简摘要（构建期由 parse-articles.mjs 产出，仅列表字段），
// 全文 articles.json 只被懒加载的 NewsDetailPage 引用，不进首屏主包
import articlesData from './article-summaries-auto.json';
import { articleSummaries, type ArticleSummary } from './article-summaries';

export type { ArticleSummary };

interface CrawledArticle {
  id: string;
  title: string;
  summary: string;
  category: string;
  publishDate: string;
  author: string;
  viewCount?: number;
  isPinned?: boolean;
  sourceUrl?: string;
  coverImage: string;
  coverImage4x3?: string;
}

const crawled = articlesData as CrawledArticle[];
const manualById = new Map(articleSummaries.map((a) => [a.id, a]));
const crawledIds = new Set(crawled.map((a) => a.id));

// 以构建时抓取的 articles.json 为基底（articles.txt 新增文章必然出现），
// 同 id 时手写精修字段（摘要/分类/日期/置顶）优先覆盖抓取值
const fromCrawled: ArticleSummary[] = crawled.map((a) => ({
  id: a.id,
  title: a.title,
  summary: a.summary,
  category: a.category,
  publishDate: a.publishDate,
  author: a.author,
  viewCount: a.viewCount ?? 0,
  isPinned: a.isPinned ?? false,
  sourceUrl: a.sourceUrl,
  coverImage: a.coverImage,
  coverImage4x3: a.coverImage4x3 ?? a.coverImage,
  ...(manualById.get(a.id) ?? {}),
}));

// 兜底：构建时抓取失败的文章，手写数据不丢失
const manualOnly = articleSummaries.filter((a) => !crawledIds.has(a.id));

export const mergedArticles: ArticleSummary[] = [...fromCrawled, ...manualOnly];

/** 置顶优先，其余按发布日期降序 */
export function sortedByDate(list: ArticleSummary[] = mergedArticles): ArticleSummary[] {
  return [...list].sort((a, b) => {
    if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
    return b.publishDate.localeCompare(a.publishDate);
  });
}

/** 按文章量降序收集全部分类（供导航下拉等使用） */
export function articleCategories(): string[] {
  const counts = new Map<string, number>();
  mergedArticles.forEach((a) => {
    counts.set(a.category, (counts.get(a.category) ?? 0) + 1);
  });
  return [...counts.entries()].sort((x, y) => y[1] - x[1]).map(([name]) => name);
}
