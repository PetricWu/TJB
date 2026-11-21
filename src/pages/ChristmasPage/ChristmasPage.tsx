import { useEffect, useRef } from "react";

type Flake = {
  x: number;
  y: number;
  r: number;
  vy: number;
  drift: number;
  phase: number;
  alpha: number;
};

type Ball = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  z: number;
  vz: number;
  r: number;
  base: string;
  light: string;
  dark: string;
  floorY: number;
  rot: number;
  vrot: number;
  life: number;
};

type Confetti = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  z: number;
  vz: number;
  w: number;
  h: number;
  color: string;
  rot: number;
  vrot: number;
  life: number;
};

type Frond = {
  yTop: number;
  rTip: number;
  droop: number;
  angle: number;
  spread: number;
  tier: number;
};

type Ornament = {
  y: number;
  angle: number;
  radius: number;
  r: number;
  colors: { base: string; light: string; dark: string };
};

type FairyLight = {
  t: number;
  angle: number;
  size: number;
  phase: number;
  speed: number;
  color: string;
  depth: number;
};

const ORNAMENT_COLORS = [
  { base: "#ff5f7e", light: "#ffd3dc", dark: "#8c1630" },
  { base: "#ffcf6b", light: "#fff4cf", dark: "#8a5a10" },
  { base: "#6fe6c4", light: "#ddfff5", dark: "#0e6b56" },
  { base: "#7fb3ff", light: "#e8f3ff", dark: "#1d4f9c" },
  { base: "#f2f8ff", light: "#ffffff", dark: "#7e9dc2" },
  { base: "#c9a3ff", light: "#f2e7ff", dark: "#553285" },
  { base: "#ff9d5c", light: "#ffe3cc", dark: "#8c4213" },
];

const CONFETTI_COLORS = ["#e9f6ff", "#9fd6ff", "#ffd36e", "#ff7b93", "#7fe6c9", "#c9a3ff"];

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

    // —— 场景几何常量（归一化，渲染时乘以 size）——
    const HEIGHT_N = 2.5;
    const RADIUS_N = 0.82;
    const CAM_Z = 9;

    /** 锥体在高度比例 t（0=顶 1=底）处的半径 */
    const coneR = (t: number) => RADIUS_N * (0.12 + 0.88 * t);

    // 冷杉：逐层针叶枝团，层间旋转错开，堆出有体积的锥体
    const fronds: Frond[] = [];
    const TIERS = 12;
    const PER_TIER = 10;
    for (let l = 0; l < TIERS; l++) {
      const t = (l + 1) / TIERS;
      const yTop = -HEIGHT_N + 0.05 + (l / TIERS) * (HEIGHT_N - 0.1);
      const rTip = coneR(t) * (0.94 + rng() * 0.1);
      const droop = 0.09 + 0.28 * t;
      for (let b = 0; b < PER_TIER; b++) {
        fronds.push({
          yTop,
          rTip,
          droop,
          angle: (b / PER_TIER) * Math.PI * 2 + l * 0.63,
          spread: (Math.PI / PER_TIER) * 1.04,
          tier: l,
        });
      }
    }

    const pickOrnamentColor = () => {
      const r = rng();
      if (r < 0.34) return ORNAMENT_COLORS[3];
      if (r < 0.56) return ORNAMENT_COLORS[4];
      if (r < 0.72) return ORNAMENT_COLORS[2];
      if (r < 0.82) return ORNAMENT_COLORS[0];
      if (r < 0.9) return ORNAMENT_COLORS[1];
      if (r < 0.96) return ORNAMENT_COLORS[6];
      return ORNAMENT_COLORS[5];
    };

    const ornaments: Ornament[] = Array.from({ length: 24 }, (_, i) => {
      const t = 0.1 + (i / 23) * 0.82;
      return {
        y: -HEIGHT_N + 0.14 + t * (HEIGHT_N - 0.22),
        angle: i * 2.399963 + rng() * 0.4,
        radius: coneR(t) * (0.82 + rng() * 0.14),
        r: 0.052 + rng() * 0.026,
        colors: pickOrnamentColor(),
      };
    });

    // 满树灯点：贴着锥面分布，旋转时形成流动的星光
    const fairyLights: FairyLight[] = Array.from({ length: 180 }, () => {
      const t = Math.sqrt(rng());
      return {
        t,
        angle: rng() * Math.PI * 2,
        size: 0.009 + rng() * 0.01,
        phase: rng() * Math.PI * 2,
        speed: 0.9 + rng() * 2.2,
        color: rng() < 0.22 ? "#ffe3ae" : rng() < 0.55 ? "#f2fbff" : "#9fd8ff",
        depth: 0.8 + rng() * 0.22,
      };
    });

    // 螺旋灯带：三股错位缠绕，灯珠参与深度排序
    const beads: { y: number; angle: number; radius: number; color: string }[] = [];
    const GARLANDS = [
      { turns: 3.4, offset: 0, step: 5, colors: ["#f4fbff", "#ffd98a"] },
      { turns: 3.4, offset: Math.PI, step: 5, colors: ["#cfeaff", "#ffffff"] },
      { turns: 2.4, offset: 0.9, step: 6, colors: ["#8fd3ff", "#eaf8ff"] },
    ];
    for (const g of GARLANDS) {
      const segs = 108;
      for (let i = 0; i <= segs; i += g.step) {
        const u = i / segs;
        beads.push({
          y: -HEIGHT_N + 0.14 + u * (HEIGHT_N - 0.26),
          angle: g.offset + u * Math.PI * 2 * g.turns,
          radius: coneR(0.05 + u * 0.92) * 1.03,
          color: g.colors[(i / g.step) % g.colors.length],
        });
      }
    }

    const flakes: Flake[] = [];

    let width = 0;
    let height = 0;
    let size = 1;
    let dpr = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      size = Math.min(width, height);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      flakes.length = 0;
      const count = Math.round((width * height) / 7000);
      const n = Math.min(120, Math.max(24, count));
      for (let i = 0; i < n; i++) {
        flakes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: 0.7 + Math.random() * 1.7,
          vy: 14 + Math.random() * 34,
          drift: 8 + Math.random() * 18,
          phase: Math.random() * Math.PI * 2,
          alpha: 0.22 + Math.random() * 0.5,
        });
      }
    };

    // —— 视角与交互 ——
    const view = { rotX: 0.2, rotY: 0, vx: 0, vy: 0.18, auto: true };
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const drag = { active: false, x: 0, y: 0, lastX: 0, lastY: 0, lastT: 0 };

    const onPointerMove = (e: PointerEvent) => {
      if (drag.active) {
        const now = performance.now();
        const dx = e.clientX - drag.lastX;
        const dy = e.clientY - drag.lastY;
        view.rotY += dx * 0.009;
        view.rotX = Math.max(-0.35, Math.min(1.05, view.rotX + dy * 0.006));
        const dt = Math.max(0.008, (now - drag.lastT) / 1000);
        view.vx = dx * 0.009 / dt;
        view.vy = dy * 0.006 / dt;
        drag.lastX = e.clientX;
        drag.lastY = e.clientY;
        drag.lastT = now;
      }
      const rect = canvas.getBoundingClientRect();
      pointer.tx = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width - 0.5) * 2));
      pointer.ty = Math.max(-1, Math.min(1, ((e.clientY - rect.top) / rect.height - 0.5) * 2));
    };

    const onPointerDown = (e: PointerEvent) => {
      drag.active = true;
      drag.x = e.clientX;
      drag.y = e.clientY;
      drag.lastX = e.clientX;
      drag.lastY = e.clientY;
      drag.lastT = performance.now();
      view.auto = false;
      view.vx = 0;
      view.vy = 0;
      canvas.style.cursor = "grabbing";
      try {
        canvas.setPointerCapture(e.pointerId);
      } catch {
        /* 忽略不支持捕获的环境 */
      }
    };

    const onPointerUp = () => {
      if (!drag.active) return;
      drag.active = false;
      canvas.style.cursor = "grab";
      if (Math.abs(view.vx) < 0.6 && Math.abs(view.vy) < 0.6) view.auto = true;
    };

    // 逐帧投影：绕 Y 轴旋转 + 相机透视
    const project = (x: number, y: number, z: number, cx: number, cy: number, cosX: number, sinX: number, cosY: number, sinY: number) => {
      const x1 = x * cosY + z * sinY;
      const z1 = -x * sinY + z * cosY;
      const y1 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;
      const cam = CAM_Z - z2;
      const s = (size * 0.32 * CAM_Z) / Math.max(2, cam);
      return {
        x: cx + x1 * s,
        y: cy + y1 * s,
        z: z2,
        s,
        a: Math.min(1, Math.max(0.45, 0.72 + (z2 / RADIUS_N) * 0.28)),
      };
    };

    // 针叶枝团：从树干向外的扇形面，填充后形成实体剪影
    const drawFrond = (fr: Frond, cx: number, cy: number, cosX: number, sinX: number, cosY: number, sinY: number) => {
      const N = 11;
      const edge: { x: number; y: number; s: number }[] = [];
      for (let i = 0; i <= N; i++) {
        const u = (i / N) * 2 - 1;
        const ang = fr.angle + u * fr.spread;
        const lenF = 0.68 + 0.32 * Math.cos((u * Math.PI) / 2);
        const jitter = 0.86 + 0.14 * Math.sin(i * 3.1 + fr.tier * 1.9);
        const rr = fr.rTip * lenF * jitter;
        const y = fr.yTop + fr.droop * Math.pow(lenF, 1.4) * (0.82 + 0.18 * u * u);
        edge.push(project(Math.sin(ang) * rr, y, Math.cos(ang) * rr, cx, cy, cosX, sinX, cosY, sinY));
      }
      const root = project(0, fr.yTop, 0, cx, cy, cosX, sinX, cosY, sinY);
      const mid = edge[N >> 1];

      // 朝向相机的枝团更亮，背面压暗，产生体积
      const face = Math.min(1, Math.max(0, (Math.cos(fr.angle + view.rotY) + 0.65) / 1.65));
      const cr = Math.round(16 + 30 * face);
      const cg = Math.round(52 + 78 * face);
      const cb = Math.round(66 + 74 * face);

      ctx.beginPath();
      ctx.moveTo(root.x, root.y);
      for (let i = 0; i <= N; i++) ctx.lineTo(edge[i].x, edge[i].y);
      ctx.closePath();
      ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, 0.93)`;
      ctx.fill();

      // 上缘冷光描边：月光 / 霜
      ctx.beginPath();
      ctx.moveTo(root.x, root.y);
      for (let i = 0; i <= N; i++) ctx.lineTo(edge[i].x, edge[i].y);
      ctx.strokeStyle = `rgba(176, 226, 255, ${0.1 + 0.34 * face})`;
      ctx.lineWidth = Math.max(0.8, mid.s * 0.0045);
      ctx.lineJoin = "round";
      ctx.stroke();

      // 枝背积雪：只描外侧弧线，读起来像覆雪的针叶
      ctx.beginPath();
      for (let i = 3; i <= N - 3; i++) {
        const p = edge[i];
        if (i === 3) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = `rgba(238, 250, 255, ${0.16 + 0.42 * face})`;
      ctx.lineWidth = Math.max(0.9, mid.s * 0.006);
      ctx.lineCap = "round";
      ctx.stroke();

      // 枝尖霜点
      ctx.fillStyle = `rgba(234, 249, 255, ${0.45 + 0.4 * face})`;
      for (const i of [N >> 2, (3 * N) >> 2, N]) {
        const p = edge[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.6, p.s * 0.005), 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // 灯点：加色混合模拟真实小灯珠的辉光
    const drawLight = (l: FairyLight, cx: number, cy: number, cosX: number, sinX: number, cosY: number, sinY: number, time: number) => {
      const y = -HEIGHT_N + 0.1 + l.t * (HEIGHT_N - 0.2);
      const rad = coneR(l.t) * l.depth;
      const p = project(Math.sin(l.angle) * rad, y, Math.cos(l.angle) * rad, cx, cy, cosX, sinX, cosY, sinY);
      const tw = 0.45 + 0.55 * Math.pow(0.5 + 0.5 * Math.sin(time * l.speed + l.phase), 1.6);
      const rr = Math.max(0.6, p.s * l.size);
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = withAlpha(l.color, 0.1 * tw * p.a);
      ctx.beginPath();
      ctx.arc(p.x, p.y, rr * 4.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = withAlpha(l.color, 0.22 * tw * p.a);
      ctx.beginPath();
      ctx.arc(p.x, p.y, rr * 2.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = `rgba(255, 255, 255, ${0.85 * tw * p.a})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, rr, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    // 灯带灯珠
    const drawBead = (
      b: { y: number; angle: number; radius: number; color: string },
      cx: number,
      cy: number,
      cosX: number,
      sinX: number,
      cosY: number,
      sinY: number,
      time: number,
    ) => {
      const p = project(Math.sin(b.angle) * b.radius, b.y, Math.cos(b.angle) * b.radius, cx, cy, cosX, sinX, cosY, sinY);
      const br = Math.max(1, p.s * 0.0095);
      const tw = 0.7 + 0.3 * Math.sin(time * 1.7 + b.angle * 5);
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = withAlpha(b.color, 0.16 * tw * p.a);
      ctx.beginPath();
      ctx.arc(p.x, p.y, br * 4.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = withAlpha(b.color, 0.5 * tw * p.a);
      ctx.beginPath();
      ctx.arc(p.x, p.y, br * 1.7, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * p.a})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, br * 0.85, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const drawOrnament = (o: Ornament, cx: number, cy: number, cosX: number, sinX: number, cosY: number, sinY: number, time: number) => {
      const sway = Math.sin(time * 1.2 + o.angle * 3) * 0.012;
      const p = project(
        Math.sin(o.angle) * o.radius,
        o.y + sway,
        Math.cos(o.angle) * o.radius,
        cx,
        cy,
        cosX,
        sinX,
        cosY,
        sinY,
      );
      const above = project(
        Math.sin(o.angle) * o.radius * 0.92,
        o.y - o.r * 4.4,
        Math.cos(o.angle) * o.radius * 0.92,
        cx,
        cy,
        cosX,
        sinX,
        cosY,
        sinY,
      );
      const rr = Math.max(2, p.s * o.r);

      // 挂绳
      ctx.globalAlpha = p.a * 0.5;
      ctx.strokeStyle = "rgba(206, 236, 255, 0.9)";
      ctx.lineWidth = Math.max(0.5, p.s * 0.006);
      ctx.beginPath();
      ctx.moveTo(above.x, above.y);
      ctx.lineTo(p.x, p.y - rr * 0.9);
      ctx.stroke();

      // 金属扣
      ctx.fillStyle = "rgba(224, 242, 255, 0.95)";
      ctx.fillRect(p.x - rr * 0.16, p.y - rr * 1.02, rr * 0.32, rr * 0.36);

      // 球体光晕
      const halo = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, rr * 2.6);
      halo.addColorStop(0, withAlpha(o.colors.base, 0.3 * p.a));
      halo.addColorStop(0.5, withAlpha(o.colors.base, 0.1 * p.a));
      halo.addColorStop(1, withAlpha(o.colors.base, 0));
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(p.x, p.y, rr * 2.6, 0, Math.PI * 2);
      ctx.fill();

      // 球体明暗
      const sphere = ctx.createRadialGradient(p.x - rr * 0.38, p.y - rr * 0.42, rr * 0.05, p.x, p.y, rr * 1.06);
      sphere.addColorStop(0, o.colors.light);
      sphere.addColorStop(0.45, o.colors.base);
      sphere.addColorStop(1, o.colors.dark);
      ctx.fillStyle = sphere;
      ctx.beginPath();
      ctx.arc(p.x, p.y, rr, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = withAlpha("#eaf8ff", 0.5);
      ctx.lineWidth = Math.max(0.5, p.s * 0.006);
      ctx.stroke();

      const spec = ctx.createRadialGradient(p.x - rr * 0.36, p.y - rr * 0.42, 0, p.x - rr * 0.36, p.y - rr * 0.42, rr * 0.38);
      spec.addColorStop(0, "rgba(255, 255, 255, 0.95)");
      spec.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = spec;
      ctx.beginPath();
      ctx.arc(p.x - rr * 0.36, p.y - rr * 0.42, rr * 0.38, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    };

    const drawStar = (cx: number, cy: number, cosX: number, sinX: number, cosY: number, sinY: number, time: number) => {
      const p = project(0, -HEIGHT_N - 0.04, 0, cx, cy, cosX, sinX, cosY, sinY);
      const R = p.s * 0.062 * (1 + Math.sin(time * 2.2) * 0.06);

      const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, R * 5);
      glow.addColorStop(0, "rgba(222, 245, 255, 0.85)");
      glow.addColorStop(0.2, "rgba(160, 218, 255, 0.36)");
      glow.addColorStop(0.55, "rgba(92, 170, 255, 0.12)");
      glow.addColorStop(1, "rgba(70, 150, 255, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(p.x, p.y, R * 5, 0, Math.PI * 2);
      ctx.fill();

      // 十字星芒
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.globalAlpha = 0.85;
      for (const len of [R * 2.5, R * 1.35]) {
        for (let k = 0; k < 2; k++) {
          ctx.rotate(Math.PI / 2);
          const g = ctx.createLinearGradient(0, 0, len, 0);
          g.addColorStop(0, "rgba(236, 250, 255, 0.9)");
          g.addColorStop(1, "rgba(160, 220, 255, 0)");
          ctx.strokeStyle = g;
          ctx.lineWidth = Math.max(0.8, R * 0.07);
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(len, 0);
          ctx.stroke();
        }
      }
      ctx.restore();

      // 星体
      const k = R * 0.16;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y - R);
      ctx.quadraticCurveTo(p.x + k, p.y - k, p.x + R, p.y);
      ctx.quadraticCurveTo(p.x + k, p.y + k, p.x, p.y + R);
      ctx.quadraticCurveTo(p.x - k, p.y + k, p.x - R, p.y);
      ctx.quadraticCurveTo(p.x - k, p.y - k, p.x, p.y - R);
      ctx.closePath();
      ctx.fillStyle = "#f6fdff";
      ctx.shadowColor = "rgba(150, 220, 255, 0.95)";
      ctx.shadowBlur = 22 * (p.s / (size * 0.34));
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    // —— 掉落物：圣诞球与纸屑 ——
    const balls: Ball[] = [];
    const confetti: Confetti[] = [];

    const spawnProps = (force: number) => {
      const rate = Math.min(6, 0.6 + Math.abs(force) * 1.6);
      const count = Math.floor(rate) + (rng() < rate % 1 ? 1 : 0);
      for (let i = 0; i < count; i++) {
        const t = 0.15 + rng() * 0.8;
        const y = -HEIGHT_N + 0.12 + t * (HEIGHT_N - 0.2);
        const radius = coneR(t) * (0.85 + rng() * 0.2);
        const a = rng() * Math.PI * 2;
        const x = Math.sin(a) * radius;
        const z = Math.cos(a) * radius;
        const mag = Math.min(1.3, Math.abs(force));

        if (rng() < 0.34) {
          const c = ORNAMENT_COLORS[Math.floor(rng() * ORNAMENT_COLORS.length)];
          balls.push({
            x,
            y,
            z,
            vx: (Math.sin(a) + (rng() - 0.5) * 0.9) * 1.5 * mag,
            vy: 0.2 + rng() * 0.6,
            vz: (Math.cos(a) + (rng() - 0.5) * 0.9) * 1.5 * mag,
            r: 0.03 + rng() * 0.022,
            base: c.base,
            light: c.light,
            dark: c.dark,
            floorY: rng() * 0.06,
            rot: 0,
            vrot: 0,
            life: 1,
          });
        } else {
          confetti.push({
            x,
            y,
            z,
            vx: (Math.sin(a) + (rng() - 0.5) * 1.4) * 1.8 * mag,
            vy: 0.2 + rng() * 0.5,
            vz: (Math.cos(a) + (rng() - 0.5) * 1.4) * 1.8 * mag,
            w: 0.022 + rng() * 0.024,
            h: 0.01 + rng() * 0.012,
            color: CONFETTI_COLORS[Math.floor(rng() * CONFETTI_COLORS.length)],
            rot: rng() * Math.PI * 2,
            vrot: (rng() - 0.5) * 9,
            life: 1,
          });
        }
      }
    };

    const updateProps = (dt: number, settle: number) => {
      for (let i = balls.length - 1; i >= 0; i--) {
        const b = balls[i];
        // 坐标系里 y 向下为正：重力递增，落到地面后反弹
        b.vy += 6.4 * dt;
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        b.z += b.vz * dt;
        b.rot += b.vrot * dt;
        if (b.y >= b.floorY) {
          b.y = b.floorY;
          b.vy = -b.vy * 0.42;
          b.vx *= 0.7;
          b.vz *= 0.7;
          if (Math.abs(b.vy) < 0.3) b.vy = 0;
          b.life -= dt * 0.2;
        }
        if (b.life <= 0) balls.splice(i, 1);
      }

      for (let i = confetti.length - 1; i >= 0; i--) {
        const c = confetti[i];
        c.vy += 3.2 * dt;
        c.vx *= 1 - 1.6 * dt;
        c.vz *= 1 - 1.6 * dt;
        c.vy *= 1 - 1.1 * dt;
        c.x += c.vx * dt;
        c.y += c.vy * dt;
        c.z += c.vz * dt;
        c.rot += c.vrot * dt;
        c.life -= dt * 0.13;
        if (c.y > 0.05) {
          c.y = 0.05;
          c.vy = 0;
          c.vx *= 0.9;
          c.vz *= 0.9;
        }
        if (c.life <= 0) confetti.splice(i, 1);
      }

      // 转得越快，越容易把挂饰和纸屑甩下来
      const speed = Math.abs(settle);
      if (speed > 1.4 && balls.length + confetti.length < 72) {
        const chance = Math.min(0.75, (speed - 1.4) * 0.25);
        if (rng() < chance) spawnProps(Math.min(1.3, speed * 0.3));
      }
    };

    const drawBall = (b: Ball, cx: number, cy: number, cosX: number, sinX: number, cosY: number, sinY: number) => {
      const p = project(b.x, b.y, b.z, cx, cy, cosX, sinX, cosY, sinY);
      const rr = Math.max(2.2, p.s * b.r);
      const alpha = Math.min(1, b.life * 1.6);

      const halo = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, rr * 2.4);
      halo.addColorStop(0, withAlpha(b.base, 0.25 * alpha));
      halo.addColorStop(1, withAlpha(b.base, 0));
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(p.x, p.y, rr * 2.4, 0, Math.PI * 2);
      ctx.fill();

      const sphere = ctx.createRadialGradient(p.x - rr * 0.38, p.y - rr * 0.42, rr * 0.05, p.x, p.y, rr * 1.06);
      sphere.addColorStop(0, b.light);
      sphere.addColorStop(0.45, b.base);
      sphere.addColorStop(1, b.dark);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = sphere;
      ctx.beginPath();
      ctx.arc(p.x, p.y, rr, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(234, 248, 255, 0.5)";
      ctx.lineWidth = Math.max(0.5, p.s * 0.004);
      ctx.stroke();
      ctx.globalAlpha = 1;
    };

    const drawConfetti = (c: Confetti, cx: number, cy: number, cosX: number, sinX: number, cosY: number, sinY: number) => {
      const p = project(c.x, c.y, c.z, cx, cy, cosX, sinX, cosY, sinY);
      const w = Math.max(2, p.s * c.w);
      const h = Math.max(1.4, p.s * c.h);
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(c.rot);
      ctx.globalAlpha = Math.min(1, c.life * 1.8) * (0.55 + 0.45 * p.a);
      ctx.fillStyle = c.color;
      ctx.fillRect(-w / 2, -h / 2, w, h);
      ctx.restore();
      ctx.globalAlpha = 1;
    };

    const updateFlakes = (dt: number, time: number) => {
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

    const drawSky = (time: number) => {
      const k = size / 520;
      for (let i = 0; i < 6; i++) {
        const bx = width * (0.1 + ((i * 0.618) % 1) * 0.8) + Math.sin(time * 0.08 + i) * 14 * k;
        const by = height * (0.08 + ((i * 0.382) % 1) * 0.72) + Math.cos(time * 0.06 + i) * 10 * k;
        const br = (18 + ((i * 37) % 40)) * k;
        const g = ctx.createRadialGradient(bx, by, 0, bx, by, br);
        g.addColorStop(0, "rgba(126, 192, 255, 0.055)");
        g.addColorStop(0.7, "rgba(126, 192, 255, 0.025)");
        g.addColorStop(1, "rgba(126, 192, 255, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(bx, by, br, 0, Math.PI * 2);
        ctx.fill();
      }

      // 周期性流星
      const cycle = 13;
      const idx = Math.floor(time / cycle);
      const local = time - idx * cycle;
      if (local > 1.2) return;
      const p = local / 1.2;
      const fade = Math.sin(p * Math.PI);
      const seed = Math.abs(Math.sin(idx * 12.9898) * 43758.5453) % 1;
      const x = width * (0.72 + seed * 0.2) - p * width * 0.5;
      const y = height * (0.06 + seed * 0.08) + p * height * 0.3;
      const tailX = x + 120 * k;
      const tailY = y - 58 * k;
      const grad = ctx.createLinearGradient(tailX, tailY, x, y);
      grad.addColorStop(0, "rgba(170, 220, 255, 0)");
      grad.addColorStop(1, `rgba(235, 250, 255, ${0.9 * fade})`);
      ctx.save();
      ctx.strokeStyle = grad;
      ctx.lineWidth = Math.max(1, 1.6 * k);
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.restore();
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2 + pointer.x * 6;
      const cy = height * 0.9 + pointer.y * 4;
      const cosX = Math.cos(view.rotX);
      const sinX = Math.sin(view.rotX);
      const cosY = Math.cos(view.rotY);
      const sinY = Math.sin(view.rotY);

      // 世界坐标 → 深度：z 越大越靠近相机
      const depthOf = (x: number, y: number, z: number) => y * sinX + (-x * sinY + z * cosY) * cosX;

      drawSky(time);

      // 树底投影
      const base = project(0, 0.03, 0, cx, cy, cosX, sinX, cosY, sinY);
      const groundW = Math.max(20, RADIUS_N * 1.65 * base.s);
      ctx.save();
      ctx.translate(base.x, base.y);
      ctx.scale(1, 0.22);
      const ground = ctx.createRadialGradient(0, 0, 0, 0, 0, groundW);
      ground.addColorStop(0, "rgba(90, 178, 255, 0.3)");
      ground.addColorStop(0.55, "rgba(60, 136, 235, 0.12)");
      ground.addColorStop(1, "rgba(60, 136, 235, 0)");
      ctx.fillStyle = ground;
      ctx.beginPath();
      ctx.arc(0, 0, groundW, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 树后冷光：把剪影从夜色中托起来
      const aura = project(0, -HEIGHT_N * 0.52, 0, cx, cy, cosX, sinX, cosY, sinY);
      const auraR = Math.max(40, aura.s * RADIUS_N * 1.7);
      const glow = ctx.createRadialGradient(aura.x, aura.y, 0, aura.x, aura.y, auraR);
      glow.addColorStop(0, "rgba(78, 164, 255, 0.18)");
      glow.addColorStop(0.55, "rgba(52, 122, 224, 0.07)");
      glow.addColorStop(1, "rgba(52, 122, 224, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(aura.x, aura.y, auraR, 0, Math.PI * 2);
      ctx.fill();

      const shake = Math.max(-0.045, Math.min(0.045, view.vx * 0.006 + Math.sin(time * 2.1) * 0.003));
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(shake);
      ctx.translate(-cx, -cy);

      // 树干
      const trunkTop = project(0, -0.24, 0, cx, cy, cosX, sinX, cosY, sinY);
      const trunkBase = project(0, 0.04, 0, cx, cy, cosX, sinX, cosY, sinY);
      const trunkGrad = ctx.createLinearGradient(0, trunkTop.y, 0, trunkBase.y);
      trunkGrad.addColorStop(0, "rgba(48, 96, 148, 0.5)");
      trunkGrad.addColorStop(0.45, "rgba(136, 192, 240, 0.7)");
      trunkGrad.addColorStop(1, "rgba(48, 96, 148, 0.5)");
      ctx.strokeStyle = trunkGrad;
      ctx.lineWidth = Math.max(3, trunkTop.s * 0.05);
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(trunkTop.x, trunkTop.y);
      ctx.lineTo(trunkBase.x, trunkBase.y);
      ctx.stroke();

      // 所有元素按深度排序，旋转时前后遮挡正确
      const stack: { z: number; fn: () => void }[] = [];

      for (const fr of fronds) {
        const r = fr.rTip * 0.52;
        const z = depthOf(Math.sin(fr.angle) * r, fr.yTop + fr.droop * 0.4, Math.cos(fr.angle) * r);
        stack.push({ z, fn: () => drawFrond(fr, cx, cy, cosX, sinX, cosY, sinY) });
      }

      for (const l of fairyLights) {
        const y = -HEIGHT_N + 0.1 + l.t * (HEIGHT_N - 0.2);
        const r = coneR(l.t) * l.depth;
        const z = depthOf(Math.sin(l.angle) * r, y, Math.cos(l.angle) * r);
        stack.push({ z, fn: () => drawLight(l, cx, cy, cosX, sinX, cosY, sinY, time) });
      }

      for (const b of beads) {
        const z = depthOf(Math.sin(b.angle) * b.radius, b.y, Math.cos(b.angle) * b.radius);
        stack.push({ z, fn: () => drawBead(b, cx, cy, cosX, sinX, cosY, sinY, time) });
      }

      for (const o of ornaments) {
        const z = depthOf(Math.sin(o.angle) * o.radius, o.y, Math.cos(o.angle) * o.radius);
        stack.push({ z, fn: () => drawOrnament(o, cx, cy, cosX, sinX, cosY, sinY, time) });
      }

      for (const b of balls) {
        stack.push({ z: depthOf(b.x, b.y, b.z), fn: () => drawBall(b, cx, cy, cosX, sinX, cosY, sinY) });
      }
      for (const c of confetti) {
        stack.push({ z: depthOf(c.x, c.y, c.z), fn: () => drawConfetti(c, cx, cy, cosX, sinX, cosY, sinY) });
      }

      stack.sort((m, n) => m.z - n.z);
      for (const item of stack) item.fn();

      drawStar(cx, cy, cosX, sinX, cosY, sinY, time);
      ctx.restore();

      // 飘雪
      for (const f of flakes) {
        ctx.fillStyle = `rgba(226, 244, 255, ${f.alpha})`;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r * Math.max(0.8, size / 520), 0, Math.PI * 2);
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

      const damp = Math.pow(0.3, dt);
      view.vx *= damp;
      view.vy *= damp;
      if (!drag.active) {
        view.rotY += view.vx * dt;
        view.rotX = Math.max(-0.35, Math.min(1.05, view.rotX + view.vy * dt));
      }
      if (view.auto) {
        view.rotY += 0.16 * dt;
        view.rotX += (0.2 - view.rotX) * Math.min(0.25, dt * 0.9);
      }

      pointer.x += (pointer.tx - pointer.x) * Math.min(1, dt * 5);
      pointer.y += (pointer.ty - pointer.y) * Math.min(1, dt * 5);

      updateFlakes(dt, time);
      updateProps(dt, view.vx);
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
    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
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
        .zmy-hint {
          animation: zmy-hint 3.6s ease-in-out infinite;
        }
        @keyframes zmy-hint {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 0.9; }
        }
        @media (prefers-reduced-motion: reduce) {
          .zmy-fade-up, .zmy-aurora, .zmy-float, .zmy-twinkle,
          .zmy-shimmer, .zmy-orbit, .zmy-orbit-rev, .zmy-hint { animation: none; }
          .zmy-twinkle { opacity: 0.6; }
          .zmy-shimmer { background-position: 35% 50%; }
          .zmy-hint { opacity: 0.8; }
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

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center gap-4 px-6 py-10 lg:flex-row lg:gap-16">
        {/* 3D 圣诞树：拖动旋转 / 快速摇晃掉落挂饰 */}
        <div className="flex w-[82vw] max-w-[560px] shrink-0 flex-col items-center gap-3 lg:w-[48vw]">
          <div className="relative aspect-square w-full">
            <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="zmy-orbit relative h-[92%] w-[92%] rounded-full border border-dashed border-[#8fd0ff]/12">
                <span className="absolute left-1/2 top-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#bfe6ff] shadow-[0_0_10px_2px_rgba(111,184,255,0.7)]" />
              </div>
              <div className="zmy-orbit-rev absolute h-[74%] w-[74%] rounded-full border border-[#8fd0ff]/8" />
            </div>
            <canvas
              ref={canvasRef}
              className="relative h-full w-full cursor-grab touch-none select-none active:cursor-grabbing"
              aria-hidden="true"
            />
          </div>
          <p className="zmy-hint pointer-events-none font-mono text-[0.55rem] uppercase tracking-[0.3em] text-[#7fbdf5] sm:text-[0.6rem]">
            拖动旋转 · 摇晃掉落
          </p>
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
              ZMY
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
