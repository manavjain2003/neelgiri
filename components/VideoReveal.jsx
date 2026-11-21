"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";



const TAU = Math.PI * 2;
const TILT = 0.3; // camera looks slightly down on the pile
const COS = Math.cos(TILT);
const SIN = Math.sin(TILT);

const clamp = (v) => Math.min(1, Math.max(0, v));
const smooth = (a, b, v) => {
  const t = clamp((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const lerp = (a, b, t) => a + (b - a) * t;
const rand = (a, b) => a + Math.random() * (b - a);

const hash = (x, y) => {
  let h = (Math.imul(x, 374761393) + Math.imul(y, 668265263)) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
};
const vnoise = (x, y) => {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const ux = fx * fx * (3 - 2 * fx);
  const uy = fy * fy * (3 - 2 * fy);
  const a = hash(ix, iy);
  const b = hash(ix + 1, iy);
  const c = hash(ix, iy + 1);
  const d = hash(ix + 1, iy + 1);
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
};

// Irregular footprint: the pile's base radius changes with angle
const footR = (th, R) =>
  R * (1 + 0.4 * (vnoise(Math.cos(th) * 1.8 + 5, Math.sin(th) * 1.8 + 9) - 0.5));

// Low/medium-frequency shape of the heap (shared by texture + particles)
const baseHeight = (X, Y, R, H) => {
  const r = Math.hypot(X, Y);
  const Rm = footR(Math.atan2(Y, X), R);
  if (r >= Rm) return 0;
  const e = R * 0.04; // rounds the very tip
  const rs = (Math.sqrt(r * r + e * e) - e) / (Math.sqrt(Rm * Rm + e * e) - e);
  const u = clamp(1 - rs);
  const lump = 1 - smooth(0.88, 1, u); // keep the apex under the stream
  let h = H * Math.pow(u, 1.08);
  h += H * 0.16 * (vnoise(X * 0.007 + 3, Y * 0.009 + 7) - 0.5) * Math.sqrt(u) * lump; // big slumps
  h += H * 0.07 * (vnoise(X * 0.028 + 17, Y * 0.028 + 29) - 0.5) * smooth(0, 0.12, u) * lump; // clumps
  return Math.max(0, h);
};

// Soft white dot used for bokeh, sparkles and dust (cheaper than shadowBlur).
const makeSprite = () => {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d");
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.25, "rgba(210,240,255,.55)");
  grad.addColorStop(1, "rgba(150,210,255,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  return c;
};


const buildMound = (R, H, ts) => {
  const LIM = 1.5 * R;
  const REACH = 1.28 * R;
  const cssW = LIM * 2;
  const oy = H * COS + 0.14 * H;
  const cssH = oy + LIM * SIN + 0.1 * H;
  const ox = cssW / 2;
  const tw = Math.ceil(cssW * ts);
  const th = Math.ceil(cssH * ts);

  const hf = (X, Y) => {
    if (X * X + Y * Y > REACH * REACH) return 0;
    let h = baseHeight(X, Y, R, H);
    if (h > 0) {
      const g = smooth(0, 0.06, h / H);
      h += (vnoise(X * 0.13 + 41, Y * 0.13 + 53) - 0.5) * 0.009 * H * g; // crumbly bumps
      h += (vnoise(X * 0.45 + 61, Y * 0.45 + 71) - 0.5) * 0.005 * H * g; // grain
    }
    return h;
  };

  const img = new ImageData(tw, th);
  const d = img.data;
  const first = new Int32Array(tw).fill(th);

  // soft light from upper-left / above
  const lx = -0.45, ly = 0.35, lz = 0.82;
  const ll = Math.sqrt(lx * lx + ly * ly + lz * lz);
  const Lx = lx / ll, Ly = ly / ll, Lz = lz / ll;
  const eps = 1.0;
  const step = 0.9 / ts;

  for (let ix = 0; ix < tw; ix++) {
    const X = ix / ts - ox;
    const lim2 = REACH * REACH - X * X;
    if (lim2 <= 0) continue;
    const Ymax = Math.sqrt(lim2);
    let top = th;

    for (let Y = Ymax; Y >= -Ymax; Y -= step) {
      const h = hf(X, Y);
      if (h <= 0) continue;
      const row = (oy - h * COS + Y * SIN) * ts;
      if (row >= top) continue;

      const hx = (hf(X + eps, Y) - h) / eps;
      const hy = (hf(X, Y + eps) - h) / eps;
      const nl = Math.sqrt(hx * hx + hy * hy + 1);
      const dif = Math.max(0, (-hx * Lx - hy * Ly + Lz) / nl);
      const hr = h / H;
      const ao = 0.72 + 0.28 * smooth(0, 0.3, hr);
      const t = clamp((0.2 + 0.85 * dif) * ao);

      // neutral, slightly cool white (matte powder)
      let r, g, b;
      if (t < 0.55) {
        const k = t / 0.55;
        r = lerp(92, 196, k);
        g = lerp(108, 208, k);
        b = lerp(132, 222, k);
      } else {
        const k = (t - 0.55) / 0.45;
        r = lerp(196, 250, k);
        g = lerp(208, 252, k);
        b = lerp(222, 255, k);
      }
      const rnd = Math.random();
      const grain = 0.9 + 0.2 * Math.random();
      r *= grain; g *= grain; b *= grain;
      if (rnd < 0.015) { r += 40; g += 40; b += 40; }
      else if (rnd < 0.035) { r -= 30; g -= 30; b -= 30; }
      const a = smooth(0.0008 * H, 0.012 * H, h) * 255;

      const r0 = Math.max(0, Math.floor(row));
      for (let rr = r0; rr < top; rr++) {
        const o = (rr * tw + ix) * 4;
        d[o] = r; d[o + 1] = g; d[o + 2] = b; d[o + 3] = a;
      }
      if (a > 150 && r0 < first[ix]) first[ix] = r0;
      top = r0;
    }
  }

  const c = document.createElement("canvas");
  c.width = tw;
  c.height = th;
  const g2 = c.getContext("2d");
  g2.putImageData(img, 0, 0);

  // ragged silhouette: loose grains along the contour
  for (let ix = 0; ix < tw; ix++) {
    if (first[ix] >= th) continue;
    for (let k = 0; k < 3; k++) {
      const gy = first[ix] + (Math.random() + Math.random() - 1.2) * 4 * ts;
      g2.fillStyle = `rgba(238,244,250,${rand(0.3, 0.85)})`;
      const s = rand(0.6, 1.5) * ts;
      g2.fillRect(ix + Math.random(), gy, s, s);
    }
  }

  // stray grains + tiny clumps lying on the floor around the foot
  for (let k = 0; k < 900; k++) {
    const th2 = Math.random() * TAU;
    const dd = footR(th2, R) * (0.95 + 0.3 * Math.pow(Math.random(), 2));
    const sx = (ox + Math.cos(th2) * dd) * ts;
    const sy = (oy + Math.sin(th2) * dd * SIN) * ts;
    const s = rand(0.6, 1.8) * ts;
    g2.fillStyle = `rgba(225,234,244,${rand(0.3, 0.9)})`;
    g2.fillRect(sx, sy, s, s);
  }
  for (let k = 0; k < 28; k++) {
    const th2 = Math.random() * TAU;
    const dd = footR(th2, R) * (0.97 + 0.22 * Math.random());
    const sx = (ox + Math.cos(th2) * dd) * ts;
    const sy = (oy + Math.sin(th2) * dd * SIN) * ts;
    const s = rand(1.5, 3.6) * ts;
    g2.fillStyle = "rgba(205,218,232,.95)";
    g2.beginPath();
    g2.ellipse(sx, sy + s * 0.25, s * 1.1, s * 0.55, 0, 0, TAU);
    g2.fill();
    g2.fillStyle = "rgba(244,248,252,.95)";
    g2.beginPath();
    g2.ellipse(sx, sy, s, s * 0.7, 0, 0, TAU);
    g2.fill();
  }

  return { c, cssW, cssH, ox, oy };
};

export default function VideoReveal({
  videoSrc = "/Titanium_dioxide_powder_pouring_d264ca45.mp4",
  poster = "/images/hero_1.png",
  scrollDistanceVh = 300,
  holdVh = 150, // extra scroll where the video stays pinned and fully visible
  className = "",
}) {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const reduce = useReducedMotion();

  const animVh = Math.max(150, scrollDistanceVh);
  const totalVh = animVh + holdVh;
  const animEnd = animVh / totalVh; // fraction of scroll at which the animation completes

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // 0 → 1 over the animation part only, then stays at 1 during the hold
  const animProgress = useTransform(scrollYProgress, [0, animEnd], [0, 1], {
    clamp: true,
  });

  const progress = useSpring(animProgress, {
    stiffness: 120,
    damping: 32,
    mass: 0.35,
  });

  const backdropOpacity = useTransform(progress, [0.72, 0.97], [1, 0]);
  const videoScale = useTransform(progress, [0.7, 1], [1.12, 1]);


  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage || reduce) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let R = 0; // pile base radius
    let H = 0; // pile height
    let baseY = 0; // screen y of the ground centre under the apex
    let ts = 1;
    let tex = null;
    let rebuildTimer = 0;
    const sprite = makeSprite();

    const particles = Array.from({ length: 2600 }, (_, i) => ({
      id: i,
      seed: Math.random(),
      spread: rand(-1, 1),
      angle: rand(0, TAU),
      phase: rand(0, TAU),
      size: rand(0.5, 1.9),
      alpha: rand(0.45, 1),
      drift: rand(-0.8, 0.8),
      fill: Math.random(),
      a: rand(0.05, Math.PI - 0.05),
      stream: i % 6 === 0,
      spill: i % 9 === 1,
    }));
    const slides = Array.from({ length: 90 }, () => ({
      seed: Math.random(),
      a: rand(0.12, Math.PI - 0.12),
      j: rand(-1, 1),
      size: rand(0.6, 1.3),
    }));

    const bokeh = Array.from({ length: 36 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: rand(6, 22),
      a: rand(0.08, 0.3),
      ph: rand(0, TAU),
    }));

    const stateAt = (p) => ({
      p,
      t: p * 3,
      sweep: smooth(0, 0.14, p),
      toSwirl: smooth(0.2, 0.42, p),
      toMound: smooth(0.4, 0.66, p),
      toStream: smooth(0.4, 0.5, p),
      dis: smooth(0.76, 1, p),
      sc: lerp(0.45, 1, smooth(0.42, 0.7, p)),
    });

    const place = (q, S, o) => {
      const { t } = S;
      const cx = width * 0.5;
      const min = Math.min(width, height);
      const cy = height * 0.5;
      const s = q.seed;
      const sc = S.sc;

      // sweep: S-shaped flowing ribbon
      let x = lerp(-width * 0.15, width * 1.1, s) - (1 - S.sweep) * width * 0.35;
      let y =
        cy +
        (0.5 - s) * height * 0.42 +
        Math.sin(s * 9 + t * 2 + q.phase * 0.2) * height * 0.1 +
        q.spread * height * (0.04 + 0.1 * Math.abs(Math.sin(s * 5)));

      // swirl
      const rn = 0.08 + s * 0.42;
      const ang = q.angle * 0.1 + s * 7 + t * (1.5 - s * 0.7);
      x = lerp(x, cx + Math.cos(ang) * min * rn * 1.3, S.toSwirl);
      y = lerp(y, cy + Math.sin(ang) * min * rn * 0.6 + q.spread * 6, S.toSwirl);

      // pile surface / falling stream
   const w = q.stream ? S.toStream : S.toMound;
      if (w > 0.001) {
        let mx;
        let my;
        if (q.stream) {
          const frac = (s * 6 + t * 1.3) % 1;
          const apexY = baseY - H * COS * sc + 4;
          mx = cx + Math.sin(frac * 5 + q.phase) * 3 + q.spread * (1.5 + frac * 6);
          my = lerp(-10, apexY, frac);
        } else if (q.spill) {
          const r = footR(q.angle, R) * (0.98 + 0.4 * q.fill);
          mx = cx + Math.cos(q.angle) * r * sc;
          my = baseY + Math.sin(q.angle) * r * SIN * sc * 0.9;
        } else {
          const r = footR(q.a, R) * Math.sqrt(q.fill) * 0.98;
          const X = Math.cos(q.a) * r;
          const Y = Math.sin(q.a) * r;
          const h = baseHeight(X, Y, R, H);
          mx = cx + X * sc;
          my = baseY + (-h * COS + Y * SIN) * sc;
        }
        x = lerp(x, mx, w);
        y = lerp(y, my, w);
      }

      // dissolve: burst away from the pile
      const out = Math.atan2(y - (baseY - H * 0.4 * sc), x - cx) + q.drift * 0.6;
      const travel = S.dis * min * (0.12 + s * 0.6);
      x += Math.cos(out) * travel;
      y += Math.sin(out) * travel - S.dis * height * 0.1;

      x += Math.sin(t * 1.7 + q.phase) * (1 + q.size);
      y += Math.cos(t * 1.4 + q.phase) * (1 + q.size);
      o.x = x;
      o.y = y;
    };

    const icon = (x, y, r, kind, a) => {
      ctx.save();
      ctx.globalAlpha = a;
      const fillG = ctx.createLinearGradient(x, y - r, x, y + r);
      fillG.addColorStop(0, "rgba(60,130,200,.45)");
      fillG.addColorStop(1, "rgba(14,50,100,.55)");
      ctx.fillStyle = fillG;
      ctx.strokeStyle = "#9ae0ff";
      ctx.lineWidth = 1.4;
      ctx.shadowBlur = 18;
      ctx.shadowColor = "rgba(90,200,255,.9)";
      ctx.beginPath();
      for (let k = 0; k < 6; k++) {
        const a2 = (TAU / 6) * k - Math.PI / 2;
        const px = x + Math.cos(a2) * r;
        const py = y + Math.sin(a2) * r;
        k ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 6;
      ctx.beginPath();
      if (kind === 0) {
        for (let k = 0; k < 6; k++) {
          const a2 = (TAU / 6) * k;
          const px = x + Math.cos(a2) * r * 0.34;
          const py = y + Math.sin(a2) * r * 0.34;
          k ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
        }
        ctx.closePath();
        ctx.moveTo(x + r * 0.34, y);
        ctx.lineTo(x + r * 0.62, y);
      } else if (kind === 1) {
        for (let k = -1; k <= 1; k++) {
          const yy = y + k * r * 0.26;
          ctx.moveTo(x - r * 0.42, yy);
          ctx.lineTo(x, yy - r * 0.2);
          ctx.lineTo(x + r * 0.42, yy);
          ctx.lineTo(x, yy + r * 0.2);
          ctx.closePath();
        }
      } else {
        ctx.moveTo(x, y + r * 0.42);
        ctx.lineTo(x, y);
        ctx.moveTo(x, y + r * 0.05);
        ctx.quadraticCurveTo(x - r * 0.5, y - r * 0.05, x - r * 0.4, y - r * 0.45);
        ctx.quadraticCurveTo(x + r * 0.05, y - r * 0.35, x, y + r * 0.05);
        ctx.moveTo(x, y - r * 0.1);
        ctx.quadraticCurveTo(x + r * 0.45, y - r * 0.1, x + r * 0.4, y - r * 0.45);
      }
      ctx.stroke();
      ctx.restore();
    };

    // Ring lies flat on the same ground plane as the pile, so it wraps it.
    const ring = (S, front, fade) => {
      const a = smooth(0.5, 0.62, S.p) * fade;
      if (a < 0.01) return;
      const cx = width * 0.5;
      const rx = R * 1.3;
      const ry = rx * SIN;
      const g = ctx.createLinearGradient(cx - rx, 0, cx + rx, 0);
      g.addColorStop(0, "rgba(110,200,255,.15)");
      g.addColorStop(0.5, "rgba(160,230,255,1)");
      g.addColorStop(1, "rgba(110,200,255,.15)");
      ctx.save();
      ctx.strokeStyle = g;
      ctx.shadowColor = "rgba(70,180,255,.9)";
      ctx.shadowBlur = front ? 18 : 8;
      for (const k of [1, 1.1]) {
        ctx.globalAlpha = a * (k === 1 ? (front ? 0.95 : 0.45) : 0.22);
        ctx.lineWidth = k === 1 ? 1.7 : 1;
        ctx.beginPath();
        ctx.ellipse(cx, baseY, rx * k, ry * k, 0, front ? 0 : Math.PI, front ? Math.PI : TAU);
        ctx.stroke();
      }
      ctx.restore();
      for (let k = 0; k < 26; k++) {
        const ang = (k / 26) * TAU + S.t * 0.9;
        const sn = Math.sin(ang);
        if (sn > 0 !== front) continue;
        ctx.globalAlpha = a * 0.8;
        ctx.drawImage(sprite, cx + Math.cos(ang) * rx - 5, baseY + sn * ry - 5, 10, 10);
      }
    };

    const A = { x: 0, y: 0 };
    const B = { x: 0, y: 0 };

    const draw = () => {
      if (!width || !height) return;
      const p = clamp(progress.get());
      const S = stateAt(p);
      const S0 = stateAt(Math.max(0, p - 0.006));
      const cx = width * 0.5;
      const min = Math.min(width, height);
      const fade = 1 - smooth(0.8, 0.97, p);
      const iconA = smooth(0.52, 0.64, p) * (1 - smooth(0.74, 0.86, p));
      const moundA = smooth(0.46, 0.62, p) * (1 - smooth(0.76, 0.92, p));
      const sc = S.sc;

      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "lighter";

      const glow = ctx.createRadialGradient(cx, baseY - H * 0.4, 0, cx, baseY - H * 0.4, min * 0.75);
      glow.addColorStop(0, `rgba(90,180,245,${0.18 * fade})`);
      glow.addColorStop(1, "rgba(20,70,110,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      for (const b of bokeh) {
        const bx = ((b.x + p * 0.25 + Math.sin(b.ph + S.t) * 0.01) % 1) * width;
        const by = (b.y + Math.cos(b.ph + S.t * 0.7) * 0.02) * height;
        ctx.globalAlpha = b.a * fade * (1 - S.toMound * 0.6);
        ctx.drawImage(sprite, bx - b.r, by - b.r, b.r * 2, b.r * 2);
      }

      // light pool on the floor
      if (S.toMound > 0.02) {
        ctx.save();
        ctx.translate(cx, baseY);
        ctx.scale(1, SIN);
        const pool = ctx.createRadialGradient(0, 0, 0, 0, 0, R * 1.5);
        pool.addColorStop(0, `rgba(140,205,250,${0.4 * S.toMound * fade})`);
        pool.addColorStop(1, "rgba(60,130,200,0)");
        ctx.fillStyle = pool;
        ctx.fillRect(-R * 2, -R * 2, R * 4, R * 4);
        ctx.restore();
      }
      ctx.globalCompositeOperation = "source-over";

      ring(S, false, fade);

      // the lit 3D pile
      if (moundA > 0.01 && tex) {
        const k = sc * (1 + S.dis * 0.08);
        ctx.globalAlpha = moundA;
        ctx.drawImage(
          tex.c,
          cx - tex.ox * k,
          baseY - tex.oy * k,
          tex.cssW * k,
          tex.cssH * k
        );
      }

      ring(S, true, fade);

      ctx.globalCompositeOperation = "lighter";

      // soft dust hugging the foot of the pile
      if (S.toMound > 0.2) {
        for (let k = 0; k < 12; k++) {
          const ang = (k / 12) * TAU + S.t * 0.25;
          const px = cx + Math.cos(ang) * R * 1.05 * sc;
          const py = baseY + Math.sin(ang) * R * 1.05 * SIN * sc - H * 0.03;
          const size = H * (0.3 + 0.08 * Math.sin(S.t * 2 + k)) * sc;
          ctx.globalAlpha = 0.09 * S.toMound * fade * (1 - S.dis * 0.5);
          ctx.drawImage(sprite, px - size, py - size * 0.7, size * 2, size * 1.4);
        }
      }

      // loose grains tumbling down the flanks
          if (moundA > 0.05) {
        ctx.fillStyle = "#e8f0f8";
        for (const sl of slides) {
          const frac = (sl.seed * 3 + S.t * 0.8) % 1;
          const r = footR(sl.a, R) * (0.04 + 0.9 * frac);
          const h = baseHeight(Math.cos(sl.a) * r, Math.sin(sl.a) * r, R, H);
          const X = Math.cos(sl.a) * r;
          const Y = Math.sin(sl.a) * r;
          const x = cx + (X + sl.j * 3) * sc;
          const y = baseY + (-h * COS + Y * SIN) * sc - sl.j * 2;
          ctx.globalAlpha = moundA * Math.sin(frac * Math.PI) * 0.4;
          ctx.fillRect(x, y, sl.size, sl.size);
        }
      }

      // flying particles as short streaks along their path
      ctx.lineCap = "round";
      for (let i = 0; i < particles.length; i++) {
        const q = particles[i];
        const calm = q.stream ? 1 : 1 - 0.6 * S.toMound * (1 - clamp(S.dis * 1.6));
        const alpha =
          q.alpha * S.sweep * fade * calm * (0.78 + 0.22 * Math.sin(q.phase + S.t * 1.8));
        if (alpha < 0.03) continue;
        place(q, S, A);
        place(q, S0, B);
        const dx = A.x - B.x;
        const dy = A.y - B.y;
        const len = Math.hypot(dx, dy);
        ctx.globalAlpha = clamp(alpha);
              if (q.id % 25 === 0) {
          const r = q.size * 4.5;
          ctx.globalAlpha = clamp(alpha) * (1 - 0.85 * moundA);
          ctx.drawImage(sprite, A.x - r, A.y - r, r * 2, r * 2);
        
        } else if (len > 1.2 && len < 160) {
          ctx.strokeStyle = "#f2f8ff";
          ctx.lineWidth = q.size;
          ctx.beginPath();
          ctx.moveTo(A.x - dx * 0.8, A.y - dy * 0.8);
          ctx.lineTo(A.x, A.y);
          ctx.stroke();
        } else {
          ctx.fillStyle = "#f2f8ff";
          ctx.fillRect(A.x, A.y, q.size, q.size);
        }
      }

      // impact glow where the stream lands, flash when it bursts
      if (S.toStream > 0.05) {
        const gy = baseY - H * COS * sc;
        const r = H * 0.2;
        ctx.globalAlpha =
          0.45 * S.toStream * fade + 0.5 * Math.sin(Math.PI * smooth(0.74, 0.86, p));
        ctx.drawImage(sprite, cx - r, gy - r, r * 2, r * 2);
      }

      ctx.globalCompositeOperation = "source-over";

      if (iconA > 0.01) {
        const r = Math.max(26, min * 0.06);
        const bob = Math.sin(S.t * 2) * 4;
        icon(cx - R * 1.25, baseY - H * 0.55 + bob, r, 0, iconA);
        icon(cx + R * 1.1, baseY - H * 1.1 - bob, r, 1, iconA);
        icon(cx + R * 0.8, baseY - H * 0.62 + bob, r * 0.85, 2, iconA);
      }
      ctx.globalAlpha = 1;
    };

    const measure = () => {
      const rect = stage.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ts = Math.min(dpr, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      H = Math.min(height * 0.42, width * 0.3);
      R = Math.min(width * 0.34, H * 1.45);
      baseY = height * 0.66;
    };

    const rebuild = () => {
      tex = buildMound(R, H, ts);
      draw();
    };

    const resize = () => {
      measure();
      draw();
      clearTimeout(rebuildTimer);
      rebuildTimer = setTimeout(rebuild, tex ? 200 : 0);
    };

    measure();
    rebuild();
    const ro = new ResizeObserver(resize);
    ro.observe(stage);
    const unsubscribe = progress.on("change", draw);

    return () => {
      clearTimeout(rebuildTimer);
      unsubscribe();
      ro.disconnect();
    };
  }, [progress, reduce]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const pr = v.play();
    if (pr?.catch) pr.catch(() => {});
  }, [videoSrc]);

  return (
   <section
  ref={sectionRef}
  aria-label="Chemical powder scroll reveal"
  className={`relative w-full bg-[#04101f] ${className}`}
  style={{ height: `${totalVh + 100}vh` }}
>
      <div
        ref={stageRef}
        className="sticky top-0 h-screen min-h-[560px] w-full overflow-hidden"
      >
        <motion.video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          style={reduce ? undefined : { scale: videoScale }}
          src={videoSrc}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />

        {!reduce && (
          <>
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                opacity: backdropOpacity,
                background:
                  "radial-gradient(ellipse at 50% 55%, #0c2a4a 0%, #061a31 45%, #030b17 100%)",
              }}
            />
            <canvas
              ref={canvasRef}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-20"
            />
          </>
        )}
      </div>
    </section>
  );
}