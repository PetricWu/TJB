import { Image } from '@/components/ui/image';
import { useSEO } from '@/hooks/useSEO';
import HeroSection from '@/pages/HomePage/HeroSection';
import NewsSection from '@/pages/HomePage/NewsSection';
import FeaturesSection from '@/pages/HomePage/FeaturesSection';
import EventsSection from '@/pages/HomePage/EventsSection';
import CampusLifeSection from '@/pages/HomePage/CampusLifeSection';

const WECHAT_QR = '/images/avpP1wfhUo.webp';

export default function HomePage() {
  useSEO({
    title: '首页',
    description: '成都市田家炳中学官网 — 百年名校，四川省一级示范性普通高中。提供学校概况、招生信息、校园新闻、教学成果等全方位资讯。',
    breadcrumbs: [{ name: '首页', url: '/' }],
  });

  return (
    <div className="min-h-screen bg-transparent">
      <HeroSection />
      <FeaturesSection />
      <NewsSection />
      <EventsSection />
      <CampusLifeSection />

      {/* 微信公众号二维码 */}
      <div className="w-full py-16 md:py-20 bg-paper border-t-2 border-border/60">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="reveal-up text-center">
            <div className="inline-flex items-center gap-2.5 mb-5">
              <span className="size-2 bg-accent" aria-hidden />
              <span className="font-english text-xs font-bold tracking-[0.25em] uppercase text-muted-foreground">
                Follow Us · 关注我们
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-ink mb-2">
              关注官方微信公众号
            </h2>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto mb-7">
              扫码关注成都市田家炳中学官方微信公众号，获取最新校园资讯
            </p>
            <div className="inline-block bg-white rounded-sm p-3 border-2 border-ink neo-shadow corner-mark">
              <Image
                src={WECHAT_QR}
                alt="成都市田家炳中学微信公众号二维码"
                className="w-36 h-36 md:w-40 md:h-40 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
