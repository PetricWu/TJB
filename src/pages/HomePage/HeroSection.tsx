import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CountUp from '@/components/CountUp';
import { useNavigate } from 'react-router-dom';

/** 右侧数据卡（参考站「倒计时卡」版式：深色底 + 强调色边框 + 大数字） */
function StatsCard() {
  return (
    <div className="w-full max-w-sm border-2 border-accent rounded-sm bg-ink/45 backdrop-blur-md p-6 md:p-8">
      <div className="flex items-center gap-2.5 pb-4 border-b border-white/15">
        <span className="size-2 bg-accent" aria-hidden />
        <span className="font-english text-[11px] font-bold tracking-[0.25em] uppercase text-white/80">
          Since 1925 · 数据田中
        </span>
      </div>
      <div className="py-5 flex items-baseline gap-3">
        <CountUp
          value={101}
          duration={1800}
          className="font-display text-6xl md:text-7xl font-black text-accent tabular-nums leading-none"
        />
        <span className="text-base text-white/85 font-medium">年办学历史</span>
      </div>
      <div className="grid grid-cols-2 border-t border-white/15">
        {[
          { value: 3100, suffix: '+', label: '在校学生' },
          { value: 260, suffix: '+', label: '专任教师' },
          { value: 60, suffix: '', label: '教学班' },
          { value: 57, suffix: '亩', label: '校园面积' },
        ].map((item, i) => (
          <div
            key={item.label}
            className={`py-4 px-1 ${i % 2 === 0 ? 'border-r border-white/15' : ''} ${
              i < 2 ? 'border-b border-white/15' : ''
            }`}
          >
            <div className="font-display text-xl md:text-2xl font-bold text-white tabular-nums">
              <CountUp value={item.value} suffix={item.suffix} duration={1400} delay={300 + i * 150} />
            </div>
            <div className="text-xs text-white/55 mt-1">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="hero-section relative w-full overflow-hidden" style={{ height: 'calc(100svh - 64px)', minHeight: '600px' }}>
      {/* 背景图片层：CSS 类而非内联 style，保证 <768px 用移动图（命中预加载），>=768px 用桌面图 */}
      <div className="absolute inset-0 w-full h-full bg-cover bg-center bg-[url('/hero-bg-mobile.webp')] md:bg-[url('/hero-bg.webp')]" />
      <style>{`
        @media (min-width: 768px) {
          section.hero-section {
            height: calc(100svh - 80px);
          }
        }
      `}</style>

      {/* 渐变遮罩 - 左深右浅，确保文字可读 */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/60 to-ink/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-transparent" />

      {/* 内容层：左文案 + 右数据卡（参考站 Hero 版式） */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between gap-10 lg:gap-16">
        <div className="max-w-2xl pb-16 md:pb-20">
          {/* 品牌标签（参考站品牌行版式） */}
          <div
            className="animate-fade-in-up inline-flex items-center gap-2.5 mb-7"
            style={{ animationDelay: '0s' }}
          >
            <span className="size-2.5 bg-accent" aria-hidden />
            <span className="font-english text-xs font-bold tracking-[0.25em] uppercase text-white/85">
              Since 1925 · 成城公学
            </span>
          </div>

          {/* 主标题 */}
          <h1
            className="animate-fade-in-up mb-5"
            style={{ animationDelay: '0.1s' }}
          >
            <span className="block font-serif text-5xl lg:text-7xl font-black text-white tracking-tight drop-shadow-lg leading-[1.15]">
              百年田中
            </span>
            <span className="block font-serif text-3xl lg:text-5xl font-black text-accent mt-2 drop-shadow-lg">
              薪火相传
            </span>
          </h1>

          {/* 校训 */}
          <p
            className="animate-fade-in-up text-sm text-white/75 font-serif tracking-[0.35em] mb-6"
            style={{ animationDelay: '0.15s' }}
          >
            履仁崇智 · 明德卓行
          </p>

          {/* 副标题 */}
          <p
            className="animate-fade-in-up text-base lg:text-lg text-white/80 leading-relaxed max-w-xl mb-9"
            style={{ animationDelay: '0.2s' }}
          >
            始建于1925年，四川省一级示范性普通高中，秉承"履仁崇智 明德卓行"校训，
            以百年积淀培育时代英才，以卓越品质铸就教育品牌。
          </p>

          {/* CTA 按钮组（硬边投影） */}
          <div
            className="animate-fade-in-up flex flex-wrap gap-4"
            style={{ animationDelay: '0.3s' }}
          >
            <Button
              size="lg"
              className="bg-accent text-white hover:bg-accent/90 h-12 px-7 text-sm md:text-base font-bold rounded-sm border-2 border-accent neo-shadow-sm neo-press no-default-hover-elevate no-default-active-elevate"
              onClick={() => navigate('/about')}
            >
              了解田中
              <ArrowRight className="ml-1 size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white/50 text-white hover:bg-white/10 hover:border-white/70 h-12 px-7 text-sm md:text-base font-semibold rounded-sm backdrop-blur-sm bg-white/5 no-default-hover-elevate no-default-active-elevate"
              onClick={() => navigate('/admission')}
            >
              招生信息
            </Button>
          </div>
        </div>

        {/* 右侧数据卡：桌面显示 */}
        <div className="hidden lg:block shrink-0 animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
          <StatsCard />
        </div>
      </div>

      {/* 移动端数据条 */}
      <div
        className="lg:hidden absolute bottom-12 left-4 right-4 z-10 animate-fade-in-up"
        style={{ animationDelay: '0.4s' }}
      >
        <div className="flex items-center justify-between gap-2 border-2 border-accent/70 rounded-sm bg-ink/50 backdrop-blur-md px-4 py-3">
          <div className="flex items-baseline gap-1.5">
            <CountUp value={101} duration={1600} className="font-display text-2xl font-black text-accent tabular-nums" />
            <span className="text-[11px] text-white/70">年办学</span>
          </div>
          <span className="text-white/25">|</span>
          <div className="flex items-baseline gap-1.5">
            <CountUp value={3100} suffix="+" duration={1300} delay={200} className="font-display text-2xl font-bold text-white tabular-nums" />
            <span className="text-[11px] text-white/70">学生</span>
          </div>
          <span className="text-white/25">|</span>
          <div className="flex items-baseline gap-1.5">
            <CountUp value={260} suffix="+" duration={1300} delay={350} className="font-display text-2xl font-bold text-white tabular-nums" />
            <span className="text-[11px] text-white/70">教师</span>
          </div>
        </div>
      </div>

      {/* 底部滚动提示 */}
      <div
        className="animate-fade-in absolute bottom-4 left-1/2 -translate-x-1/2 z-10"
        style={{ animationDelay: '0.5s' }}
      >
        <div className="flex flex-col items-center gap-2 text-white/50">
          <div className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </div>
    </section>
  );
}
