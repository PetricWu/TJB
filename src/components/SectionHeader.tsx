import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  /** 板块序号，如 '01' */
  no: string;
  /** 英文标签，如 'News' */
  en: string;
  /** 中文标题 */
  title: string;
  desc?: string;
  /** 右侧「查看全部」链接 */
  link?: { to: string; label: string };
  /** 居中版式（用于照片墙等居中板块） */
  center?: boolean;
}

/** 参考站版式：强调色竖线 + 编号英文标签 + 大标题 + 硬投影链接按钮 */
export function SectionHeader({ no, en, title, desc, link, center }: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'flex gap-4 mb-8 md:mb-10',
        center ? 'flex-col items-center text-center' : 'items-end justify-between',
      )}
    >
      <div className={cn('min-w-0', center && 'flex flex-col items-center')}>
        <div className="flex items-center gap-3 mb-2.5">
          <span className="w-1.5 h-5 bg-accent shrink-0" aria-hidden />
          <span className="font-english text-xs font-bold tracking-[0.28em] uppercase text-muted-foreground">
            {no} — {en}
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-ink tracking-tight leading-tight">
          {title}
        </h2>
        {desc && (
          <p className="mt-2.5 text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl">
            {desc}
          </p>
        )}
      </div>
      {link && (
        <Link
          to={link.to}
          className={cn(
            'hidden sm:inline-flex items-center gap-1.5 shrink-0 px-4 py-2 text-sm font-semibold',
            'bg-card text-ink border-2 border-ink rounded-sm neo-shadow-sm neo-press',
          )}
        >
          {link.label}
          <span aria-hidden>→</span>
        </Link>
      )}
    </div>
  );
}

export default SectionHeader;
