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

type Ornament = {
  t: number;
  angle: number;
  size: number;
  phase: number;
  sway: number;
  color: { base: string; light: string; dark: string };
};

type Sparkle = {
  t: number;
  angle: number;
  phase: number;
  speed: number;
  size: number;
};

type Bokeh = {
  x: number;
  y: number;
  r: number;
  phase: number;
  speed: number;
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

/** 彩色圣诞球：蓝白为主，少量宝石色点缀 */
const ORNAMENT_COLORS = [
  { base: "#ff5f7e", light: "#ffd3dc", dark: "#8c1630" },
  { base: "#ffcf6b", light: "#fff4cf", dark: "#8a5a10" },
  { base: "#6fe6c4", light: "#ddfff5", dark: "#0e6b56" },
  { base: "#7fb3ff", light: "#e8f3ff", dark: "#1d4f9c" },
  { base: "#f2f8ff", light: "#ffffff", dark: "#7e9dc2" },
  { base: "#c9a3ff", light: "#f2e7ff", dark: "#553285" },
];

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

function withAlpha(hex: string, alpha: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
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
    const lights: LightSeed[] = Array.from({ length: 150 }, () => ({
      t: Math.sqrt(rng()),
      angle: rng() * Math.PI * 2,
      radial: 0.78 + rng() * 0.22,
      baseR: 1.2 + rng() * 1.5,
      phase: rng() * Math.PI * 2,
      speed: 0.7 + rng() * 2.2,
      color: LIGHT_COLORS[Math.floor(rng() * LIGHT_COLORS.length)],
    }));

    // 挂饰圣诞球：蓝白珠光为主，穿插少量红/金/紫宝石色
    const pickOrnamentColor = () => {
      const r = rng();
      if (r < 0.38) return ORNAMENT_COLORS[3];
      if (r < 0.62) return ORNAMENT_COLORS[4];
      if (r < 0.78) return ORNAMENT_COLORS[2];
      if (r < 0.87) return ORNAMENT_COLORS[0];
      if (r < 0.95) return ORNAMENT_COLORS[1];
      return ORNAMENT_COLORS[5];
    };
    const ornaments: Ornament[] = Array.from({ length: 19 }, (_, i) => ({
      t: 0.2 + (i / 18) * 0.7 + (rng() - 0.5) * 0.03,
      angle: i * 2.399963 + rng() * 0.5,
      size: 6.5 + rng() * 5.5,
      phase: rng() * Math.PI * 2,
      sway: 1.1 + rng() * 2.2,
      color: pickOrnamentColor(),
    }));

    const sparkles: Sparkle[] = Array.from({ length: 16 }, () => ({
      t: 0.12 + rng() * 0.72,
      angle: rng() * Math.PI * 2,
      phase: rng() * Math.PI * 2,
      speed: 1.2 + rng() * 2.2,
      size: 2.4 + rng() * 2.6,
    }));

    const bokeh: Bokeh[] = Array.from({ length: 7 }, () => ({
      x: 0.05 + rng() * 0.9,
      y: 0.06 + rng() * 0.82,
      r: 16 + rng() * 46,
      phase: rng() * Math.PI * 2,
      speed: 0.08 + rng() * 0.14,
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

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.tx = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width - 0.5) * 2));
      pointer.ty = Math.max(-1, Math.min(1, ((e.clientY - rect.top) / rect.height - 0.5) * 2));
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

    const drawSparkleShape = (x: number, y: number, r: number, alpha: number) => {
      const k = r * 0.18;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(x, y);
      ctx.beginPath();
      ctx.moveTo(0, -r);
      ctx.quadraticCurveTo(k, -k, r, 0);
      ctx.quadraticCurveTo(k, k, 0, r);
      ctx.quadraticCurveTo(-k, k, -r, 0);
      ctx.quadraticCurveTo(-k, -k, 0, -r);
      ctx.closePath();
      ctx.fillStyle = "#f4fcff";
      ctx.shadowColor = "rgba(150, 220, 255, 0.95)";
      ctx.shadowBlur = Math.max(6, 14 * scale);
      ctx.fill();
      ctx.restore();
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

      drawSparkleShape(cx, cy, R, 1);
    };

    const drawShootingStar = (time: number) => {
      const cycle = 12.5;
      const idx = Math.floor(time / cycle);
      const local = time - idx * cycle;
      if (local > 1.2) return;

      const p = local / 1.2;
      const fade = Math.sin(p * Math.PI);
      const seed = Math.abs(Math.sin(idx * 12.9898) * 43758.5453) % 1;
      const sx = width * (0.6 + seed * 0.32);
      const sy = height * (0.04 + seed * 0.1);
      const x = sx - p * width * 0.5;
      const y = sy + p * height * 0.3;
      const tailX = x + 120 * scale;
      const tailY = y - 58 * scale;

      const grad = ctx.createLinearGradient(tailX, tailY, x, y);
      grad.addColorStop(0, "rgba(170, 220, 255, 0)");
      grad.addColorStop(1, `rgba(235, 250, 255, ${0.9 * fade})`);
      ctx.save();
      ctx.strokeStyle = grad;
      ctx.lineWidth = Math.max(1, 1.6 * scale);
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(x, y);
      ctx.stroke();

      const head = ctx.createRadialGradient(x, y, 0, x, y, 8 * scale);
      head.addColorStop(0, `rgba(255, 255, 255, ${fade})`);
      head.addColorStop(1, "rgba(150, 210, 255, 0)");
      ctx.fillStyle = head;
      ctx.beginPath();
      ctx.arc(x, y, 8 * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const drawGarland = (time: number, cx: number, treeTop: number, treeH: number, maxHalf: number) => {
      const segments = 116;
      const turns = 3.4;
      const points: { x: number; y: number; depth: number }[] = [];

      for (let i = 0; i <= segments; i++) {
        const u = i / segments;
        const t = 0.18 + 0.74 * u;
        const a = u * Math.PI * 2 * turns + time * 0.16;
        const coneR = maxHalf * (0.1 + 0.9 * t) * 0.99;
        points.push({
          x: cx + Math.sin(a) * coneR,
          y: treeTop + treeH * t,
          depth: Math.cos(a),
        });
      }

      ctx.lineCap = "round";
      for (let i = 1; i < points.length; i++) {
        const p0 = points[i - 1];
        const p1 = points[i];
        const d = (p0.depth + p1.depth) / 2;
        const alpha = 0.1 + 0.46 * (d * 0.5 + 0.5);
        ctx.strokeStyle = `rgba(168, 222, 255, ${alpha})`;
        ctx.lineWidth = Math.max(0.8, 1.2 * scale);
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.stroke();
      }

      for (let i = 0; i < points.length; i += 5) {
        const p = points[i];
        const alpha = 0.3 + 0.7 * (p.depth * 0.5 + 0.5);
        const r = Math.max(0.9, 1.4 * scale);
        const halo = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 4.2);
        halo.addColorStop(0, `rgba(232, 248, 255, ${alpha * 0.85})`);
        halo.addColorStop(0.35, `rgba(120, 200, 255, ${alpha * 0.32})`);
        halo.addColorStop(1, "rgba(100, 180, 255, 0)");
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 4.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(244, 252, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawOrnaments = (time: number, cx: number, treeTop: number, treeH: number, maxHalf: number) => {
      const placed = ornaments
        .map((o) => {
          const y = treeTop + treeH * o.t;
          const coneR = maxHalf * (0.12 + 0.88 * o.t) * 0.94;
          const a = o.angle + time * 0.16;
          const depth = Math.cos(a);
          const x = cx + Math.sin(a) * coneR + Math.sin(time * 1.05 + o.phase) * o.sway * scale;
          const r = o.size * scale * (0.82 + 0.18 * (depth * 0.5 + 0.5));
          return { o, x, y, r, depth };
        })
        .sort((p, q) => p.depth - q.depth);

      for (const { o, x, y, r, depth } of placed) {
        const alpha = 0.5 + 0.5 * (depth * 0.5 + 0.5);

        // 挂绳与金属扣
        ctx.globalAlpha = alpha * 0.42;
        ctx.strokeStyle = "rgba(198, 232, 255, 0.9)";
        ctx.lineWidth = Math.max(0.5, 0.8 * scale);
        ctx.beginPath();
        ctx.moveTo(x, y - r * 2.9);
        ctx.lineTo(x, y - r * 0.92);
        ctx.stroke();

        ctx.globalAlpha = alpha * 0.9;
        ctx.fillStyle = "#cfe6ff";
        ctx.fillRect(x - r * 0.16, y - r * 1.04, r * 0.32, r * 0.34);

        // 球体光晕
        const halo = ctx.createRadialGradient(x, y, 0, x, y, r * 2.8);
        halo.addColorStop(0, withAlpha(o.color.base, 0.34 * alpha));
        halo.addColorStop(0.5, withAlpha(o.color.base, 0.12 * alpha));
        halo.addColorStop(1, withAlpha(o.color.base, 0));
        ctx.globalAlpha = 1;
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(x, y, r * 2.8, 0, Math.PI * 2);
        ctx.fill();

        // 球体：主光 + 环境色 + 暗部
        const sphere = ctx.createRadialGradient(x - r * 0.38, y - r * 0.42, r * 0.06, x, y, r * 1.05);
        sphere.addColorStop(0, o.color.light);
        sphere.addColorStop(0.42, o.color.base);
        sphere.addColorStop(1, o.color.dark);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = sphere;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();

        // 边缘冷光
        ctx.strokeStyle = withAlpha("#eaf8ff", 0.5 * alpha);
        ctx.lineWidth = Math.max(0.5, 0.8 * scale);
        ctx.stroke();

        // 高光点
        const spec = ctx.createRadialGradient(x - r * 0.36, y - r * 0.42, 0, x - r * 0.36, y - r * 0.42, r * 0.36);
        spec.addColorStop(0, "rgba(255, 255, 255, 0.95)");
        spec.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = spec;
        ctx.beginPath();
        ctx.arc(x - r * 0.36, y - r * 0.42, r * 0.36, 0, Math.PI * 2);
        ctx.fill();

        // 底部反光
        const bounce = ctx.createRadialGradient(x + r * 0.16, y + r * 0.5, 0, x + r * 0.16, y + r * 0.5, r * 0.55);
        bounce.addColorStop(0, "rgba(255, 255, 255, 0.26)");
        bounce.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.fillStyle = bounce;
        ctx.beginPath();
        ctx.arc(x + r * 0.16, y + r * 0.5, r * 0.55, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const drawBokeh = (time: number) => {
      for (const b of bokeh) {
        const bx = b.x * width + Math.sin(time * b.speed + b.phase) * 18 * scale;
        const by = b.y * height + Math.cos(time * b.speed * 0.8 + b.phase) * 12 * scale;
        const g = ctx.createRadialGradient(bx, by, 0, bx, by, b.r * scale);
        g.addColorStop(0, "rgba(126, 192, 255, 0.06)");
        g.addColorStop(0.7, "rgba(126, 192, 255, 0.03)");
        g.addColorStop(1, "rgba(126, 192, 255, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(bx, by, b.r * scale, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2 + pointer.x * 9 * scale;
      const treeTop = height * 0.09 + pointer.y * 5 * scale;
      const treeBottom = height * 0.9;
      const treeH = treeBottom - treeTop;
      const maxHalf = Math.min(width * 0.34, height * 0.26);

      drawShootingStar(time);

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

      // 发光螺旋彩带
      drawGarland(time, cx, treeTop, treeH, maxHalf);

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

      // 彩色圣诞球
      drawOrnaments(time, cx, treeTop, treeH, maxHalf);

      // 细碎星芒
      for (const s of sparkles) {
        const a = s.angle + spin;
        const depth = Math.cos(a);
        const coneR = maxHalf * (0.14 + 0.86 * s.t) * 0.9;
        const x = cx + Math.sin(a) * coneR;
        const y = treeTop + treeH * s.t;
        const twinkle = Math.pow(Math.max(0, Math.sin(time * s.speed + s.phase)), 4);
        const alpha = twinkle * (0.4 + 0.6 * (depth * 0.5 + 0.5));
        if (alpha > 0.02) drawSparkleShape(x, y, s.size * scale, alpha);
      }

      // 树顶星与景深光斑
      drawStar(cx, treeTop - height * 0.008, 14 * scale, time);
      drawBokeh(time);

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

      const ease = Math.min(1, dt * 6);
      pointer.x += (pointer.tx - pointer.x) * ease;
      pointer.y += (pointer.ty - pointer.y) * ease;

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
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
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
        .zmy-shimmer {
          background-image: linear-gradient(108deg, #ffffff 18%, #9ed6ff 38%, #ffffff 54%, #cfe9ff 72%, #ffffff 90%);
          background-size: 220% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: zmy-shimmer 6s linear infinite;
          filter: drop-shadow(0 0 22px rgba(96, 176, 255, 0.35));
        }
        @keyframes zmy-shimmer {
          from { background-position: 0% 50%; }
          to { background-position: 200% 50%; }
        }
        .zmy-orbit {
          animation: zmy-spin 64s linear infinite;
        }
        .zmy-orbit-rev {
          animation: zmy-spin 92s linear infinite reverse;
        }
        @keyframes zmy-spin {
          to { transform: rotate(360deg); }
        }
        .zmy-grain {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E");
          opacity: 0.05;
          mix-blend-mode: overlay;
        }
        @media (prefers-reduced-motion: reduce) {
          .zmy-fade-up, .zmy-aurora, .zmy-float, .zmy-twinkle,
          .zmy-shimmer, .zmy-orbit, .zmy-orbit-rev { animation: none; }
          .zmy-twinkle { opacity: 0.6; }
          .zmy-shimmer { background-position: 35% 50%; }
        }
      `}</style>

      {/* 夜空背景：深蓝渐变 + 极光 + 星点 + 颗粒 + 暗角 */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_-10%,#123a6b_0%,#08152e_45%,#03070f_100%)]" />
        <div className="zmy-aurora absolute left-1/2 top-[42%] h-[78vmax] w-[78vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(58,142,255,0.2),rgba(58,142,255,0)_65%)] blur-2xl" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(to_top,rgba(10,40,90,0.55),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(115%_100%_at_50%_45%,transparent_52%,rgba(2,6,16,0.6)_100%)]" />
        <div className="zmy-grain absolute inset-0" />
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
          {/* 轨道装饰线 */}
          <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="zmy-orbit relative h-[86%] w-[86%] rounded-full border border-dashed border-[#8fd0ff]/15">
              <span className="absolute left-1/2 top-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#bfe6ff] shadow-[0_0_10px_2px_rgba(111,184,255,0.7)]" />
            </div>
            <div className="zmy-orbit-rev absolute h-[70%] w-[70%] rounded-full border border-[#8fd0ff]/10" />
          </div>
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
            <span className="zmy-shimmer mt-3 font-serif text-5xl font-semibold tracking-[0.06em] sm:text-6xl lg:text-7xl">
              圣诞快乐
            </span>
            <span className="zmy-float mt-4 text-2xl tracking-[0.3em] text-[#8fd0ff] sm:text-3xl">
              (⊙o⊙)
            </span>
          </h1>

          <div
            className="zmy-fade-up mt-10 flex items-center gap-3 font-mono text-[0.58rem] uppercase tracking-[0.32em] text-[#6f9cc7] sm:text-[0.65rem]"
            style={{ animationDelay: "0.75s" }}
          >
            <span>12 / 25</span>
            <span className="h-px w-10 bg-[#7fbdf5]/40" />
            <span>merry &amp; bright</span>
          </div>
        </div>
      </main>
    </div>
  );
}
