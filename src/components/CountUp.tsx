import { useEffect, useLayoutEffect, useRef, useState } from 'react';

interface CountUpProps {
  value: number;
  suffix?: string;
  /** 滚动时长 ms */
  duration?: number;
  /** 距进入视口后的延迟 ms（用于多数字 stagger） */
  delay?: number;
  className?: string;
}

/**
 * 数字滚动动画：进入视口后从 0 滚到目标值（easeOutCubic）。
 * prefers-reduced-motion 或不支持 IntersectionObserver 时直接显示终值。
 */
export default function CountUp({ value, suffix = '', duration = 1200, delay = 0, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;

    let raf = 0;

    const start = () => {
      const t0 = performance.now() + delay;
      const tick = (now: number) => {
        const t = Math.min(1, Math.max(0, (now - t0) / duration));
        setDisplay(Math.round((1 - Math.pow(1 - t, 3)) * value));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    // 首帧绘制前归零，避免终值闪现后再回滚
    setDisplay(0);

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          start();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration, delay]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
