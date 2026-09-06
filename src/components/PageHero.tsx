import { cn } from '@/lib/utils';

interface PageHeroProps {
  /** 板块序号（按主导航顺序：01 学校概况 … 07 招生招聘） */
  no: string;
  /** 英文标签，如 'About' */
  en: string;
  /** 中文标题 */
  title: string;
  /** 副标题/描述 */
  desc?: string;
  /** 自定义背景图（默认全站共用校园照，浏览器缓存零额外请求） */
  image?: string;
}

/** 子页面统一页头：校园照片背景 + ink 蒙罩 + 编号英文标签 + 白色衬线大标题 */
export function PageHero({ no, en, title, desc, image }: PageHeroProps) {
  return (
    <section className="relative w-full overflow-hidden bg-ink">
      <div
        className="absolute inset-0 bg-cover bg-center bg-[url(/hero-bg-mobile.webp)] md:bg-[url(/hero-bg.webp)]"
        style={image ? { backgroundImage: `url(${image})` } : undefined}
      />
      {/* 蒙罩与首页 Hero 同源：左深右浅的 ink 渐变 */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/70 to-ink/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
      {/* 右上角 L 形角标（呼应设计语言） */}
      <span
        aria-hidden
        className="absolute top-6 right-6 hidden md:block size-5 border-t-2.5 border-r-2.5 border-accent"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24 animate-fade-in-up">
        <div className="flex items-center gap-3 mb-4">
          <span className="size-2 bg-accent shrink-0" aria-hidden />
          <span className="font-english text-xs font-bold tracking-[0.28em] uppercase text-white/80">
            {no} — {en}
          </span>
        </div>
        <h1 className="font-serif text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
          {title}
        </h1>
        {desc && (
          <p className="mt-4 max-w-2xl text-sm md:text-base text-white/75 leading-relaxed">
            {desc}
          </p>
        )}
        <div className={cn('mt-6 w-12 h-1 bg-accent')} aria-hidden />
      </div>
    </section>
  );
}

export default PageHero;
