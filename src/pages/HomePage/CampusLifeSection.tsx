import { useEffect, useMemo, useState } from 'react';
import { mergedArticles } from '@/data/merged-articles';
import { SectionHeader } from '@/components/SectionHeader';

interface PhotoItem {
  id: string;
  url: string;
  width: number;
  height: number;
  title: string;
  sourceUrl?: string;
}

interface PlacedPhoto extends PhotoItem {
  /** 全局序号（按原文章顺序，跨列连续） */
  index: number;
}

const DESKTOP_WEIGHTS = [1.15, 0.85, 1];
const MOBILE_WEIGHTS = [1.15, 0.85];

export default function CampusLifeSection() {
  // 初始值恒定，避免渲染期读 window 造成 SSR 水合不一致
  const [columnCount, setColumnCount] = useState(3);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setColumnCount(mq.matches ? 3 : 2);

    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const photos = useMemo(() => {
    const items: PhotoItem[] = [];

    mergedArticles.forEach((article) => {
      if (article.coverImage) {
        items.push({
          id: `${article.id}-cover`,
          url: article.coverImageOriginal || article.coverImage4x3 || article.coverImage,
          width: article.coverWidth ?? 800,
          height: article.coverHeight ?? 600,
          title: article.title,
          sourceUrl: article.sourceUrl,
        });
      }
    });

    return items;
  }, []);

  // 参差拼贴：各列宽度权重略有差异，按估算高度贪心装箱使列长接近
  const columns = useMemo(() => {
    const weights = columnCount === 3 ? DESKTOP_WEIGHTS : MOBILE_WEIGHTS;
    const buckets = weights.map((weight) => ({
      weight,
      height: 0,
      items: [] as PlacedPhoto[],
    }));

    photos.forEach((photo, index) => {
      const ratio = photo.height / photo.width;

      let target = 0;
      let minHeight = Infinity;
      buckets.forEach((bucket, i) => {
        const estimated = bucket.height + ratio / bucket.weight;
        if (estimated < minHeight) {
          minHeight = estimated;
          target = i;
        }
      });

      const bucket = buckets[target];
      bucket.items.push({ ...photo, index });
      bucket.height += ratio / bucket.weight;
    });

    return buckets;
  }, [photos, columnCount]);

  const handleImageClick = (sourceUrl?: string) => {
    if (sourceUrl) {
      window.open(sourceUrl, '_blank');
    }
  };

  return (
    <div className="w-full section-y">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Section header（参考站「藏品一览」标题行：竖线标题 + 强调色徽标） */}
        <div className="reveal-up">
          <SectionHeader
            no="04"
            en="Campus Life"
            title="校园生活"
            desc="丰富多彩的校园活动，记录每一个精彩瞬间"
          />
        </div>

        {/* Photo wall（参差拼贴：列宽按权重分配，画框随原图比例自适应） */}
        <div className="reveal-up flex items-start gap-2 md:gap-3">
          {columns.map((column, columnIndex) => (
            <div
              key={columnIndex}
              className="flex min-w-0 flex-col gap-2 md:gap-3"
              style={{ flexGrow: column.weight, flexBasis: 0 }}
            >
              {column.items.map((image) => (
                <div
                  key={image.id}
                  className="relative overflow-hidden rounded-sm border-2 border-ink/80 group cursor-pointer hover:border-accent transition-colors"
                  onClick={() => handleImageClick(image.sourceUrl)}
                >
                  <img
                    src={image.url}
                    alt={image.title}
                    width={image.width}
                    height={image.height}
                    loading="lazy"
                    decoding="async"
                    className="block w-full h-auto transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* LOT 式大编号（左上角，按全局顺序） */}
                  <span
                    aria-hidden
                    className="photo-numeral absolute top-2 left-3 font-english text-2xl md:text-3xl font-black text-white/95 tabular-nums leading-none select-none z-[2]"
                  >
                    {String(image.index + 1).padStart(2, '0')}
                  </span>

                  {/* L 形角标（右上角） */}
                  <span
                    aria-hidden
                    className="absolute top-2 right-2 w-3.5 h-3.5 border-t-[2.5px] border-r-[2.5px] border-accent z-[2]"
                  />

                  {/* 标题：移动端常显（无 hover），桌面端 hover 显示 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-[1]">
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-white text-xs font-medium line-clamp-2">
                        {image.title}
                      </p>
                      <p className="hidden md:block text-white/80 text-xs mt-1">查看原文 →</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
