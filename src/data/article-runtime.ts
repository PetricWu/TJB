import type { INews } from '@/types/news';

function readEmbeddedArticle(): INews | undefined {
  if (typeof document === 'undefined') {
    return (globalThis as unknown as { __ARTICLE__?: INews }).__ARTICLE__;
  }
  const el = document.getElementById('__ARTICLE_DATA__');
  if (!el?.textContent) return undefined;
  try {
    return JSON.parse(el.textContent) as INews;
  } catch {
    return undefined;
  }
}

/** 读取当前详情页文章：服务端由 entry-server 注入，浏览器由预渲染 HTML 内嵌 JSON 提供 */
export function getInitialArticle(id: string): INews | undefined {
  const article = readEmbeddedArticle();
  return article?.id === id ? article : undefined;
}

/** 站内跳转时按需拉取单篇文章 JSON（避免一次性加载全部文章正文） */
export async function fetchArticle(id: string): Promise<INews | undefined> {
  const res = await fetch(`/article-data/${encodeURIComponent(id)}.json`);
  if (!res.ok) return undefined;
  return (await res.json()) as INews;
}
