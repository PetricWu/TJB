import { useEffect, useRef } from "react";

type LightSeed = {
  t: number;
  angle: number;
  radial: number;
  baseR: number;
  phase: number;
  speed: number;
  color: string;
};

type Flake = {
  x: number;
  y: number;
  r: number;
  vy: number;
  drift: number;
  phase: number;
  alpha: number;
};

const LIGHT_COLORS = ["#ffffff", "#e8f7ff", "#c4e9ff", "#8fd3ff", "#4fa8ff", "#a9c3ff"];

/** 固定位置星点，避免 SSR / 水合不一致 */
const STARS = [
  { x: "9%", y: "16%", size: 2, delay: 0 },
  { x: "22%", y: "8%", size: 3, delay: 1.4 },
  { x: "37%", y: "21%", size: 2, delay: 2.6 },
  { x: "63%", y: "11%", size: 2, delay: 0.8 },
  { x: "81%", y: "24%", size: 3, delay: 2 },
  { x: "91%", y: "9%", size: 2, delay: 3.1 },
  { x: "72%", y: "36%", size: 2, delay: 1.1 },
  { x: "15%", y: "42%", size: 2, delay: 2.3 },
  { x: "84%", y: "52%", size: 2, delay: 3.6 },
  { x: "27%", y: "66%", size: 2, delay: 0.5 },
];

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function ChristmasPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rng = mulberry32(20251225);

    // 沿圆锥面分布的彩灯，形成圣诞树的轮廓
    const lights: LightSeed[] = Array.from({ length: 160 }, () => ({
      t: Math.sqrt(rng()),
      angle: rng() * Math.PI * 2,
      radial: 0.78 + rng() * 0.22,
      baseR: 1.2 + rng() * 1.5,
      phase: rng() * Math.PI * 2,
      speed: 0.7 + rng() * 2.2,
      color: LIGHT_COLORS[Math.floor(rng() * LIGHT_COLORS.length)],
    }));

    let width = 0;
    let height = 0;
    let scale = 1;
    let flakes: Flake[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      scale = Math.min(width, height) / 520;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round((width * height) / 7000);
      flakes = Array.from({ length: Math.min(130, Math.max(28, count)) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.7 + Math.random() * 1.8,
        vy: 14 + Math.random() * 34,
        drift: 8 + Math.random() * 18,
        phase: Math.random() * Math.PI * 2,
        alpha: 0.25 + Math.random() * 0.55,
      }));
    };

    const updateSnow = (dt: number, time: number) => {
      for (const f of flakes) {
        f.y += f.vy * dt;
        f.x += Math.sin(time * 0.7 + f.phase) * f.drift * dt;
        if (f.y > height + 4) {
          f.y = -4;
          f.x = Math.random() * width;
        }
        if (f.x < -4) f.x = width + 4;
        else if (f.x > width + 4) f.x = -4;
      }
    };

    const drawStar = (cx: number, cy: number, r: number, time: number) => {
      const pulse = 1 + Math.sin(time * 2.2) * 0.09;
      const R = r * pulse;

      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 5);
      glow.addColorStop(0, "rgba(214, 241, 255, 0.8)");
      glow.addColorStop(0.18, "rgba(160, 216, 255, 0.4)");
      glow.addColorStop(0.45, "rgba(92, 170, 255, 0.16)");
      glow.addColorStop(0.72, "rgba(76, 155, 255, 0.05)");
      glow.addColorStop(1, "rgba(70, 150, 255, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 5, 0, Math.PI * 2);
      ctx.fill();

      const k = R * 0.16;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.beginPath();
      ctx.moveTo(0, -R);
      ctx.quadraticCurveTo(k, -k, R, 0);
      ctx.quadraticCurveTo(k, k, 0, R);
      ctx.quadraticCurveTo(-k, k, -R, 0);
      ctx.quadraticCurveTo(-k, -k, 0, -R);
      ctx.closePath();
      ctx.fillStyle = "#f4fcff";
      ctx.shadowColor = "rgba(150, 220, 255, 0.95)";
      ctx.shadowBlur = 26 * scale;
      ctx.fill();
      ctx.restore();
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const treeTop = height * 0.09;
      const treeBottom = height * 0.9;
      const treeH = treeBottom - treeTop;
      const maxHalf = Math.min(width * 0.34, height * 0.26);

      // 地面光晕
      const groundR = maxHalf * 2.2;
      const ground = ctx.createRadialGradient(cx, treeBottom, 0, cx, treeBottom, groundR);
      ground.addColorStop(0, "rgba(66, 152, 255, 0.22)");
      ground.addColorStop(1, "rgba(66, 152, 255, 0)");
      ctx.save();
      ctx.translate(cx, treeBottom);
      ctx.scale(1, 0.26);
      ctx.translate(-cx, -treeBottom);
      ctx.fillStyle = ground;
      ctx.beginPath();
      ctx.arc(cx, treeBottom, groundR, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 四层冷杉剪影，由下至上叠放
      for (let i = 3; i >= 0; i--) {
        const apexY = treeTop + treeH * (0.1 * i);
        const bottomY = treeTop + treeH * (0.46 + 0.17 * i);
        const half = maxHalf * (0.44 + 0.187 * i);
        const sag = height * 0.016;

        const fill = ctx.createLinearGradient(0, apexY, 0, bottomY);
        fill.addColorStop(0, "rgba(146, 212, 255, 0.22)");
        fill.addColorStop(0.55, "rgba(44, 112, 200, 0.13)");
        fill.addColorStop(1, "rgba(8, 28, 64, 0.1)");

        ctx.beginPath();
        ctx.moveTo(cx, apexY);
        ctx.quadraticCurveTo(cx - half * 0.42, apexY + (bottomY - apexY) * 0.82, cx - half, bottomY);
        ctx.quadraticCurveTo(cx - half * 0.5, bottomY + sag, cx, bottomY + sag * 0.7);
        ctx.quadraticCurveTo(cx + half * 0.5, bottomY + sag, cx + half, bottomY);
        ctx.quadraticCurveTo(cx + half * 0.42, apexY + (bottomY - apexY) * 0.82, cx, apexY);
        ctx.closePath();

        ctx.fillStyle = fill;
        ctx.fill();

        ctx.save();
        ctx.shadowColor = "rgba(96, 182, 255, 0.55)";
        ctx.shadowBlur = 16 * scale;
        ctx.strokeStyle = "rgba(178, 226, 255, 0.6)";
        ctx.lineWidth = Math.max(1, 1.2 * scale);
        ctx.stroke();
        ctx.restore();
      }

      // 彩灯：绕树干缓慢旋转，前后深度影响亮度
      const spin = time * 0.16;
      for (const light of lights) {
        const y = treeTop + treeH * light.t;
        const coneR = maxHalf * (0.08 + 0.92 * light.t);
        const a = light.angle + spin;
        const depth = Math.sin(a);
        const x = cx + Math.cos(a) * coneR * light.radial;

        const depthAlpha = 0.3 + 0.7 * (depth * 0.5 + 0.5);
        const flicker = 0.55 + 0.45 * Math.sin(time * light.speed + light.phase);
        const alpha = depthAlpha * flicker;
        const r = light.baseR * scale * (0.75 + 0.4 * (depth * 0.5 + 0.5));

        const halo = ctx.createRadialGradient(x, y, 0, x, y, r * 4.2);
        halo.addColorStop(0, light.color);
        halo.addColorStop(0.22, light.color);
        halo.addColorStop(1, "rgba(80, 160, 255, 0)");
        ctx.globalAlpha = alpha * 0.42;
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(x, y, r * 4.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = Math.min(1, alpha + 0.15);
        ctx.fillStyle = light.color;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // 树顶星与飘雪
      drawStar(cx, treeTop - height * 0.008, 14 * scale, time);

      for (const f of flakes) {
        ctx.fillStyle = `rgba(226, 244, 255, ${f.alpha})`;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r * Math.max(0.8, scale), 0, Math.PI * 2);
        ctx.fill();
      }
    };

    let raf = 0;
    let last = 0;
    const start = performance.now();

    const tick = (now: number) => {
      if (!last) last = now;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const time = (now - start) / 1000;
      updateSnow(dt, time);
      draw(time);
      raf = requestAnimationFrame(tick);
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
        raf = 0;
      } else if (!reduceMotion && !raf) {
        last = 0;
        raf = requestAnimationFrame(tick);
      }
    };

    const observer = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw(1.2);
    });
    observer.observe(canvas);

    resize();
    if (reduceMotion) {
      draw(1.2);
    } else {
      raf = requestAnimationFrame(tick);
    }
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#03070f] text-white">
      <style>{`
        .zmy-fade-up {
          animation: zmy-fade-up 1.1s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes zmy-fade-up {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .zmy-aurora {
          animation: zmy-aurora 9s ease-in-out infinite alternate;
        }
        @keyframes zmy-aurora {
          from { opacity: 0.55; }
          to { opacity: 1; }
        }
        .zmy-float {
          animation: zmy-float 4.5s ease-in-out infinite;
        }
        @keyframes zmy-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .zmy-twinkle {
          animation: zmy-twinkle 3.2s ease-in-out infinite;
        }
        @keyframes zmy-twinkle {
          0%, 100% { opacity: 0.15; transform: scale(0.8); }
          50% { opacity: 0.9; transform: scale(1.15); }
        }
        @media (prefers-reduced-motion: reduce) {
          .zmy-fade-up, .zmy-aurora, .zmy-float, .zmy-twinkle { animation: none; }
          .zmy-twinkle { opacity: 0.6; }
        }
      `}</style>

      {/* 夜空背景：深蓝渐变 + 极光 + 星点 */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_-10%,#123a6b_0%,#08152e_45%,#03070f_100%)]" />
        <div className="zmy-aurora absolute left-1/2 top-[42%] h-[78vmax] w-[78vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(58,142,255,0.2),rgba(58,142,255,0)_65%)] blur-2xl" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(to_top,rgba(10,40,90,0.55),transparent)]" />
        {STARS.map((star, i) => (
          <span
            key={i}
            className="zmy-twinkle absolute rounded-full bg-[#cfeaff]"
            style={{
              left: star.x,
              top: star.y,
              width: star.size,
              height: star.size,
              animationDelay: `${star.delay}s`,
              boxShadow: "0 0 6px rgba(190, 232, 255, 0.9)",
            }}
          />
        ))}
      </div>

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center gap-6 px-6 py-12 lg:flex-row lg:gap-16">
        {/* 动态圣诞树 */}
        <div className="relative aspect-square w-[78vw] max-w-[520px] shrink-0 lg:w-[46vw]">
          <div
            aria-hidden
            className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle,rgba(56,140,255,0.22),transparent_68%)] blur-2xl"
          />
          <canvas ref={canvasRef} className="relative h-full w-full" aria-hidden="true" />
        </div>

        {/* 附文 */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <p
            className="zmy-fade-up font-english text-[0.65rem] uppercase tracking-[0.55em] text-[#7fbdf5] sm:text-xs"
            style={{ animationDelay: "0.15s" }}
          >
            Merry Christmas
          </p>

          <div
            className="zmy-fade-up mt-4 h-px w-16 bg-gradient-to-r from-[#8fd0ff] to-transparent lg:w-24"
            style={{ animationDelay: "0.3s" }}
          />

          <h1
            className="zmy-fade-up mt-5 flex flex-col items-center gap-1 lg:items-start"
            style={{ animationDelay: "0.4s" }}
          >
            <span className="font-english text-[2.4rem] font-light leading-none tracking-[0.22em] text-[#a9d8ff] sm:text-5xl">
              zmy
            </span>
            <span className="mt-3 bg-gradient-to-b from-white via-[#e2f3ff] to-[#6fb8ff] bg-clip-text font-serif text-5xl font-semibold tracking-[0.06em] text-transparent sm:text-6xl lg:text-7xl">
              圣诞快乐
            </span>
            <span className="zmy-float mt-4 text-2xl tracking-[0.3em] text-[#8fd0ff] sm:text-3xl">
              (⊙o⊙)
            </span>
          </h1>
        </div>
      </main>
    </div>
  );
}
