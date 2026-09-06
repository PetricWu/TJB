// EXPORTS: INews, NewsCategory

export type NewsCategory =
  | '校园要闻'
  | '通知公告'
  | '教学教研'
  | '德育活动'
  | '学生发展'
  | '校庆专题'
  | '家校共育';

export interface INews {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: NewsCategory;
  coverImage: string;
  publishDate: string;
  author: string;
  viewCount: number;
  isPinned: boolean;
  sourceUrl?: string;
}
