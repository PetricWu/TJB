import { useMemo } from 'react';
import { mergedArticles } from '@/data/merged-articles';
import { SectionHeader } from '@/components/SectionHeader';

export default function CampusLifeSection() {
  const allImages = useMemo(() => {
    const images: { id: string; url: string; url4x3: string; title: string; sourceUrl?: string }[] = [];

    mergedArticles.forEach((article) => {
      if (article.coverImage) {
        images.push({
          id: `${article.id}-cover`,
          url: article.coverImage,
          url4x3: article.coverImage4x3 || article.coverImage,
          title: article.title,
          sourceUrl: article.sourceUrl,
        });
      }
    });

    return images;
  }, []);

  const handleImageClick = (sourceUrl?: string) => {
    if (sourceUrl) {
      window.open(sourceUrl, '_blank');
    }
  };

  // 移动端 aspect-ratio 驱动（4:3 温和裁切）；桌面端保持 masonry：
  // 首图 2x2，每 5 张一张宽幅 (2x1)，grid-flow-dense 填补空隙
  const getSpanClasses = (index: number) => {
    if (index === 0)
      return 'col-span-2 aspect-[16/9] md:aspect-auto md:col-span-2 md:row-span-2';
    if ((index + 1) % 5 === 0)
      return 'col-span-2 aspect-[16/9] md:aspect-auto md:col-span-2';
    return 'aspect-[4/3] md:aspect-auto';
  };

  return (
    <div className="w-full py-16 md:py-20">
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

        {/* Photo wall（参考站藏品网格版式：大编号 + L 角标 + 悬停边框） */}
        <div className="reveal-up grid grid-cols-2 md:grid-cols-4 md:grid-flow-dense auto-rows-auto md:auto-rows-[160px] gap-2 md:gap-3">
          {allImages.map((image, index) => (
            <div
              key={image.id}
              className={`relative overflow-hidden rounded-sm border-2 border-ink/80 group cursor-pointer hover:border-accent transition-colors ${getSpanClasses(index)}`}
              onClick={() => handleImageClick(image.sourceUrl)}
            >
              <img
                src={image.url4x3}
                alt={image.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* LOT 式大编号（左上角） */}
              <span
                aria-hidden
                className="photo-numeral absolute top-2 left-3 font-english text-2xl md:text-3xl font-black text-white/95 tabular-nums leading-none select-none z-[2]"
              >
                {String(index + 1).padStart(2, '0')}
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
      </div>
    </div>
  );
}
