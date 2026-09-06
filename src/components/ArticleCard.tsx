import { Link } from 'react-router-dom';
import { Calendar, Eye, ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Image } from '@/components/ui/image';

export interface ArticleCardProps {
  id: string;
  title: string;
  summary: string;
  category: string;
  coverImage: string;
  coverImage4x3?: string;
  publishDate: string;
  viewCount?: number;
  isPinned?: boolean;
  sourceUrl?: string;
  variant?: 'default' | 'horizontal' | 'featured' | 'editorial' | 'minimal';
  /** 展示编号（参考站 LOT 编号版式），如 '01' */
  index?: string;
}

/** 大编号（照片/头条卡上的白色数字，参考站标志性元素） */
function LotNo({ no }: { no: string }) {
  return (
    <span
      aria-hidden
      className="photo-numeral font-english text-4xl md:text-5xl font-black text-white/95 tabular-nums leading-none select-none"
    >
      {no}
    </span>
  );
}

export function ArticleCard({
  id,
  title,
  summary,
  category,
  coverImage,
  coverImage4x3,
  publishDate,
  viewCount,
  isPinned = false,
  sourceUrl,
  variant = 'default',
  index,
}: ArticleCardProps) {
  const isExternal = !!sourceUrl;

  // === Minimal variant: numbered text row + date, no image ===
  if (variant === 'minimal') {
    const MinimalContent = (
      <div className="group py-4 border-b-2 border-border/60 last:border-0 flex gap-4 items-start">
        {index && (
          <span
            aria-hidden
            className="font-english text-2xl font-black text-accent/30 tabular-nums leading-none pt-0.5 shrink-0 select-none group-hover:text-accent/60 transition-colors"
          >
            {index}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-3 mb-1.5">
            <span className="text-xs font-display text-muted-foreground tabular-nums shrink-0">
              {publishDate}
            </span>
            {isPinned && (
              <Badge variant="destructive" className="text-[10px] py-0 px-1.5 shrink-0 rounded-sm">
                置顶
              </Badge>
            )}
          </div>
          <h3 className="text-sm font-serif font-bold text-foreground group-hover:text-accent transition-colors line-clamp-1 mb-1">
            {title}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-1">
            {summary}
          </p>
        </div>
      </div>
    );

    if (isExternal) {
      return <a href={sourceUrl} target="_blank" rel="noopener noreferrer">{MinimalContent}</a>;
    }
    return <Link to={`/news/${id}`}>{MinimalContent}</Link>;
  }

  // === Editorial variant: left image, right text ===
  if (variant === 'editorial') {
    const EditorialContent = (
      <div className="group flex gap-5 items-start">
        {coverImage && (
          <div className="w-32 md:w-40 shrink-0 aspect-[4/3] overflow-hidden rounded-sm border-2 border-ink/80 bg-muted">
            <Image
              src={coverImage4x3 || coverImage}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Badge className="text-[10px] py-0 px-1.5 rounded-sm bg-ink text-white">{category}</Badge>
            <span className="text-xs font-display text-muted-foreground">
              {publishDate}
            </span>
          </div>
          <h3 className="text-base font-serif font-bold text-foreground group-hover:text-accent transition-colors line-clamp-2 mb-2">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {summary}
          </p>
          {isExternal && (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-ink mt-2">
              查看原文 <ArrowUpRight className="size-3" />
            </span>
          )}
        </div>
      </div>
    );

    if (isExternal) {
      return <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="block">{EditorialContent}</a>;
    }
    return <Link to={`/news/${id}`} className="block">{EditorialContent}</Link>;
  }

  // === Featured variant: large image card with LOT number + corner mark ===
  if (variant === 'featured') {
    const FeaturedContent = (
      <div className="group relative overflow-hidden rounded-sm bg-ink border-2 border-ink neo-shadow-sm corner-mark">
        <div className="aspect-[16/9] md:aspect-[2/1] overflow-hidden bg-muted">
          <Image
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/40 to-transparent" />
        {index && (
          <div className="absolute top-4 left-4 md:top-5 md:left-5">
            <LotNo no={index} />
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
          <div className="flex items-center gap-2 mb-3">
            <Badge className="text-xs rounded-sm bg-accent text-white border-0">{category}</Badge>
            {isPinned && (
              <Badge variant="destructive" className="text-xs rounded-sm">置顶</Badge>
            )}
          </div>
          <h3 className="text-lg md:text-2xl font-serif font-black text-white mb-2 line-clamp-2">
            {title}
          </h3>
          <p className="text-sm text-white/75 line-clamp-2 mb-3 max-w-2xl">
            {summary}
          </p>
          <div className="flex items-center gap-4 text-xs text-white/60">
            <span className="flex items-center gap-1">
              <Calendar className="size-3" />
              {publishDate}
            </span>
            {viewCount !== undefined && (
              <span className="flex items-center gap-1">
                <Eye className="size-3" />
                {viewCount.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>
    );

    if (isExternal) {
      return <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="block">{FeaturedContent}</a>;
    }
    return <Link to={`/news/${id}`} className="block">{FeaturedContent}</Link>;
  }

  // === Default / horizontal variant (新闻列表页) ===
  const CardContent = (
    <div
      className={`group relative bg-card rounded-sm overflow-hidden border-2 border-border hover:border-ink hover-neo-shadow transition-colors ${
        variant === 'horizontal' ? 'md:flex' : ''
      }`}
    >
      {index && (
        <span
          aria-hidden
          className="absolute top-3 right-4 font-english text-2xl md:text-3xl font-black text-ink/10 tabular-nums leading-none select-none group-hover:text-accent/30 transition-colors"
        >
          {index}
        </span>
      )}
      <div className={`p-5 pt-6 ${variant === 'horizontal' ? 'md:w-full md:p-6 md:flex md:flex-col md:justify-center' : ''}`}>
        <div className="flex items-center gap-2 mb-2.5">
          <Badge className="text-[10px] py-0 px-1.5 rounded-sm bg-ink text-white border-0">{category}</Badge>
          {isPinned && (
            <Badge variant="destructive" className="text-[10px] py-0 px-1.5 rounded-sm">置顶</Badge>
          )}
        </div>
        <h3 className="text-base md:text-lg font-serif font-bold text-foreground mb-2 line-clamp-2 group-hover:text-accent transition-colors">
          {title}
        </h3>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 font-sans">
          {summary}
        </p>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Calendar className="size-3.5" />
              {publishDate}
            </span>
            {viewCount !== undefined && (
              <span className="flex items-center gap-1">
                <Eye className="size-3.5" />
                {viewCount}
              </span>
            )}
          </div>
          {isExternal && (
            <span className="flex items-center gap-1 font-bold text-ink">
              查看原文
              <ArrowUpRight className="size-3.5" />
            </span>
          )}
        </div>
      </div>
    </div>
  );

  if (isExternal) {
    return (
      <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="block">
        {CardContent}
      </a>
    );
  }

  return (
    <Link to={`/news/${id}`} className="block">
      {CardContent}
    </Link>
  );
}

export default ArticleCard;
