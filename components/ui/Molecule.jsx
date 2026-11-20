"use client";

import { useId } from "react";

const SHAPES = {
  a: {
    nodes: [
      [83, 79, 17], [88, 131, 14], [45, 160, 17], [137, 152, 18], [150, 124, 9],
      [208, 163, 16], [175, 204, 17], [140, 258, 18], [76, 291, 18], [170, 312, 17],
    ],
    edges: [[0, 1], [1, 2], [1, 3], [3, 4], [3, 5], [5, 6], [3, 6], [6, 7], [7, 8], [7, 9]],
  },
  b: {
    nodes: [
      [20, 70, 15], [68, 40, 17], [118, 62, 14], [112, 114, 18],
      [62, 138, 12], [160, 142, 16], [150, 20, 9],
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [3, 5], [2, 6]],
  },
  c: {
    nodes: [[60, 30, 12], [30, 80, 17], [90, 86, 17], [66, 134, 13]],
    edges: [[0, 1], [1, 2], [2, 3]],
  },
  d: {
    nodes: [[20, 20, 18]],
    edges: [],
  },
};

const TONES = {
  lightblue: {
    highlight: "#ffffff",
    light: "#d9f1fe",
    mid: "#82c8f2",
    dark: "#2f8cc8",
    bounce: "#fff1c2", // soft warm light from below
    bond: "#c2e0f2",
    bondDark: "#86b8d8",
    shadow: "47,140,200",
  },
  teal: {
    highlight: "#effffb",
    light: "#8fdccf",
    mid: "#2f9e98",
    dark: "#0d4f55",
    bounce: "#f6dc9a",
    bond: "#9fb9bd",
    bondDark: "#6f8f95",
    shadow: "13,79,85",
  },
  blue: {
    highlight: "#ffffff",
    light: "#bfe4fa",
    mid: "#3f9fe0",
    dark: "#115a92",
    bounce: "#9fe0ff",
    bond: "#9cc4de",
    bondDark: "#5d8fb3",
    shadow: "13,63,102",
  },
};

const NEAR_RADIUS = 14; 

const BOUNDS = {};
function getShape(key) {
  const s = SHAPES[key] ?? SHAPES.a;
  const k = SHAPES[key] ? key : "a";
  if (!BOUNDS[k]) {
    const pad = 14;
    const minX = Math.min(...s.nodes.map(([x, , r]) => x - r)) - pad;
    const minY = Math.min(...s.nodes.map(([, y, r]) => y - r)) - pad;
    const maxX = Math.max(...s.nodes.map(([x, , r]) => x + r)) + pad;
    const maxY = Math.max(...s.nodes.map(([, y, r]) => y + r)) + pad;
    BOUNDS[k] = `${minX} ${minY} ${maxX - minX} ${maxY - minY}`;
  }
  return { ...s, vb: BOUNDS[k] };
}

/**
 * Glossy 3D ball-and-stick molecule (pure SVG, no images needed).
 *
 * @param {"a"|"b"|"c"|"d"} shape  a: branched skeleton, b: compact chain, c: fragment, d: single atom
 * @param {"lightblue"|"blue"|"teal"} tone     Colour palette
 * @param {string} className       Extra classes for the <svg> (set a width; height follows the shape)
 * @param {boolean} animate        Gently bob the atoms (skipped for reduced-motion users)
 */
export default function Molecule({ shape = "a", tone = "lightblue", className = "", animate = false }) {
  const uid = `mol-${useId().replace(/:/g, "")}`;
  const s = getShape(shape);
  const t = TONES[tone] ?? TONES.lightblue;

  const ordered = s.nodes.map(([x, y, r], i) => ({ x, y, r, i })).sort((p, q) => p.r - q.r);

  return (
    <svg
      viewBox={s.vb}
      className={`overflow-visible ${className}`}
      style={{ filter: `drop-shadow(0 10px 10px rgba(${t.shadow},0.22))` }}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id={`${uid}-body`} cx="36%" cy="30%" r="78%">
          <stop offset="0" stopColor={t.highlight} />
          <stop offset="0.2" stopColor={t.light} />
          <stop offset="0.6" stopColor={t.mid} />
          <stop offset="1" stopColor={t.dark} />
        </radialGradient>
        <radialGradient id={`${uid}-bounce`} cx="62%" cy="95%" r="55%">
          <stop offset="0" stopColor={t.bounce} stopOpacity="0.85" />
          <stop offset="1" stopColor={t.bounce} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${uid}-glint`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${uid}-bond`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={t.bond} />
          <stop offset="1" stopColor={t.bondDark} />
        </linearGradient>
      </defs>

      {animate && (
        <style>{`
          @media (prefers-reduced-motion: no-preference) {
            .${uid}-atom {
              transform-box: fill-box;
              transform-origin: center;
              animation: ${uid}-bob 6s ease-in-out infinite;
            }
            @keyframes ${uid}-bob {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-3px); }
            }
          }
        `}</style>
      )}

      {s.edges.map(([a, b], i) => {
        const [x1, y1, r1] = s.nodes[a];
        const [x2, y2, r2] = s.nodes[b];
        const far = Math.min(r1, r2) < NEAR_RADIUS;
        return (
          <g key={`e${i}`} opacity={far ? 0.75 : 1} strokeLinecap="round">
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={t.bondDark} strokeOpacity="0.5" strokeWidth="3.2" />
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={`url(#${uid}-bond)`} strokeWidth="2.2" />
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              transform="translate(-0.5 -0.6)"
              stroke="#ffffff"
              strokeOpacity="0.7"
              strokeWidth="0.7"
            />
          </g>
        );
      })}

      {ordered.map(({ x, y, r, i }) => {
        const far = r < NEAR_RADIUS;
        return (
          <g
            key={`n${i}`}
            className={animate ? `${uid}-atom` : undefined}
            style={animate ? { animationDelay: `${-i * 0.8}s` } : undefined}
            opacity={far ? 0.92 : 1}
          >
            {/* body */}
            <circle cx={x} cy={y} r={r} fill={`url(#${uid}-body)`} />
            {/* warm reflected light */}
            <circle cx={x} cy={y} r={r} fill={`url(#${uid}-bounce)`} />
            {/* dark rim for a polished look */}
            <circle cx={x} cy={y} r={r - 0.5} stroke={t.dark} strokeOpacity="0.45" strokeWidth="1" />
            {/* large soft highlight */}
            <ellipse
              cx={x - r * 0.3}
              cy={y - r * 0.42}
              rx={r * 0.46}
              ry={r * 0.28}
              transform={`rotate(-30 ${x - r * 0.3} ${y - r * 0.42})`}
              fill={`url(#${uid}-glint)`}
              opacity="0.85"
            />
            {/* tiny sharp specular dot */}
            <circle cx={x - r * 0.38} cy={y - r * 0.45} r={Math.max(1, r * 0.1)} fill="#ffffff" />
          </g>
        );
      })}
    </svg>
  );
}