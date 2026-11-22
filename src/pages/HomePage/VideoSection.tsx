import { ExternalLink } from 'lucide-react';

const BVID = 'BV1T5yVzjE6V';
const VIDEO_PAGE = `https://www.bilibili.com/video/${BVID}`;
const PLAYER_URL = `https://player.bilibili.com/player.html?bvid=${BVID}&page=1&high_quality=1&danmaku=0&autoplay=0`;

/**
 * 首页「校园映像」宣传片
 * 直接使用 B 站内嵌播放器（封面由播放器提供），懒加载避免影响首屏。
 */
export default function VideoSection() {
  return (
    <section className="w-full bg-ink text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 section-y">
        <div className="reveal-up grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="size-2 bg-accent" aria-hidden />
              <span className="font-english text-xs font-bold tracking-[0.25em] uppercase text-white/60">
                Campus Film · 校园映像
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-black leading-tight">
              百年田中
              <span className="text-accent"> · </span>
              校园宣传片
            </h2>
            <p className="mt-4 text-sm md:text-base text-white/70 leading-relaxed">
              从成城公学到今日田中，一段影像带你走进百年校园的日常与荣光。
            </p>
            <a
              href={VIDEO_PAGE}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-accent hover:text-accent-strong transition-colors"
            >
              在哔哩哔哩观看
              <ExternalLink className="size-4" />
            </a>
          </div>

          <div className="lg:col-span-8">
            <div className="relative aspect-video overflow-hidden rounded-sm border-2 border-white/20 bg-black">
              <iframe
                src={PLAYER_URL}
                title="成都市田家炳中学百年校庆宣传片"
                allow="fullscreen; picture-in-picture"
                allowFullScreen
                loading="lazy"
                frameBorder="no"
                scrolling="no"
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
