"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Atom,
  ChevronRight,
  CircleDot,
  Cog,
  FlaskConical,
  Layers,
  Network,
  Route,
  Sprout,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Img from "@/components/ui/Img";
import { categories, categoryCoverImages } from "@/lib/products";


const GREEN_700 = "#a9d6f7";
const GOLD = "#d8b568";
const WHITE = "#ffffff";
const SERIF = '"Cormorant Garamond", "Playfair Display", Georgia, "Times New Roman", serif';

const ICONS = {
  atom: Atom,
  road: Route,
  circles: CircleDot,
  network: Network,
  layers: Layers,
  flask: FlaskConical,
  sprout: Sprout,
  cog: Cog,
};

/* "Road Marking Paint" → ["Road Marking", "Paint"]; single words keep line 2 empty */
const splitLabel = (label) => {
  const i = label.lastIndexOf(" ");
  return i === -1 ? [label, ""] : [label.slice(0, i), label.slice(i + 1)];
};

const cats = categories.map((c) => ({
  id: c.id,
  lines: splitLabel(c.label),
  desc: c.tagline,
  icon: ICONS[c.icon] ?? FlaskConical,
  img: categoryCoverImages(c.id),
}));

const H = 430; // stage height (px)
const STEP_PX = 60; // drag distance needed to advance ONE card (one card per drag)
const DRAG_THRESHOLD = 6; // px of movement before a press counts as a drag

// 4 visible cards; the big featured (active) card sits on the LEFT.
// Any further categories wait off-stage (invisible) and rotate in as the slider moves.
const ACTIVE_POS = 0;
const slots = [
  { left: 0,    w: 34,   h: 406, zi: 4, o: 1 },
  { left: 34.5, w: 21.5, h: 340, zi: 3, o: 1 },
  { left: 56.4, w: 21.5, h: 340, zi: 2, o: 1 },
  { left: 78.3, w: 21.7, h: 340, zi: 1, o: 1 },
  { left: 100,  w: 21.5, h: 340, zi: 0, o: 0 },
];


function Molecule({ className = "", flip = false }) {
  const nodes = [
    [40, 40, 16],
    [120, 80, 22],
    [190, 36, 14],
    [250, 100, 26],
    [330, 60, 18],
    [380, 140, 12],
  ];
  return (
    <svg
      viewBox="0 0 420 180"
      className={className}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="mol" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#bcdcf5" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#5aa3d9" stopOpacity="0.85" />
        </radialGradient>
      </defs>
      <g stroke="#8fbbe0" strokeWidth="5" strokeLinecap="round" opacity="0.8">
        {nodes.slice(0, -1).map((a, i) => (
          <line key={i} x1={a[0]} y1={a[1]} x2={nodes[i + 1][0]} y2={nodes[i + 1][1]} />
        ))}
      </g>
      {nodes.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="url(#mol)" />
      ))}
    </svg>
  );
}


function CatCard({ c, index = 0, active = false }) {
  const Icon = c.icon;
  const num = String(index + 1).padStart(2, "0");

  return (
    <Link
      href={`/products?category=${c.id}`}
      aria-label={c.lines.join(" ").trim()}
      draggable={false}
      className={`group relative block h-full w-full overflow-hidden rounded-[28px] transition-all duration-500 ${
        active
          ? "shadow-[0_34px_60px_-22px_rgba(14,58,93,0.65)]"
          : "shadow-[0_20px_40px_-22px_rgba(14,58,93,0.5)] hover:-translate-y-1.5 hover:shadow-[0_28px_48px_-22px_rgba(14,58,93,0.6)]"
      }`}
     
    >
      {/* Full-bleed image */}
      <div className="absolute inset-0 overflow-hidden">
        <Img
          src={c.img}
          alt={c.lines.join(" ").trim()}
          draggable={false}
          className={`h-full w-full object-cover transition duration-700 group-hover:scale-110 ${
            active ? "scale-105" : "scale-100 saturate-[0.85]"
          }`}
        />
      </div>

      {/* Gradient overlay for legibility */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: active
            ? "linear-gradient(to top, rgba(8,33,58,0.92) 0%, rgba(8,33,58,0.35) 42%, rgba(8,33,58,0.05) 70%, rgba(8,33,58,0.25) 100%)"
            : "linear-gradient(to top, rgba(8,33,58,0.78) 0%, rgba(8,33,58,0.15) 45%, rgba(8,33,58,0) 70%)",
        }}
      />

      {/* Top row: index + status */}
      <div className="absolute inset-x-3.5 top-3.5 flex items-start justify-between">
        <span
          className="rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.2em] backdrop-blur-md"
          style={{
            background: active ? GOLD : "rgba(255,255,255,0.85)",
           
          }}
        >
          {num}
        </span>

        <span
          className={`flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 ${
            active
              ? "border-white/40 bg-white/20 text-white"
              : "border-white/50 bg-white/20 text-white opacity-0 group-hover:opacity-100"
          }`}
        >
          <ArrowUpRight className="h-[17px] w-[17px]" strokeWidth={1.8} />
        </span>
      </div>

      {/* Floating glass info panel */}
      <div
        className={`absolute inset-x-2.5 bottom-2.5 rounded-[20px] border px-3.5 backdrop-blur-xl transition-all duration-500 ${
          active
            ? "border-white/15 bg-[#0e3a5d]/80 py-4"
            : "border-white/70 bg-white/92 py-3"
        }`}
        style={{ backgroundColor: active ? undefined : "rgba(255,255,255,0.93)" }}
      >
        <div className="flex min-w-0 items-center gap-2.5">
          {/* Icon */}
          <span
            className={`flex shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
              active
                ? "h-11 w-11 text-[#0e3a5d]"
                : "h-10 w-10 bg-[#e1effb] text-[#1f5a3c] group-hover:bg-[#1a68a0] group-hover:text-white"
            }`}
            style={active ? { background: GOLD } : undefined}
          >
            <Icon className="h-[19px] w-[19px]" strokeWidth={1.6} />
          </span>

          {/* Title */}
          <p
            className={`min-w-0 flex-1 break-words font-semibold leading-[1.2] ${
              active ? "text-[16.5px] text-white" : "text-[14px] text-[#0e3a5d]"
            }`}
          >
            {c.lines[0]}
            <br />
            <span className={active ? "font-medium text-white/75" : "font-medium text-[#52667d]"}>
              {c.lines[1]}
            </span>
          </p>

          {/* Arrow */}
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 group-hover:translate-x-0.5 ${
              active
                ? "border-white/30 bg-white text-[#1a68a0] group-hover:bg-[#d8b568] group-hover:text-[#0e3a5d]"
                : "border-[#1a68a0]/15 bg-[#e1effb] text-[#1a68a0] group-hover:border-[#1a68a0] group-hover:bg-[#1a68a0] group-hover:text-white"
            }`}
          >
            <ArrowRight className="h-[17px] w-[17px]" strokeWidth={1.8} />
          </span>
        </div>

        {/* Description only on the featured card */}
        {active && (
          <p className="mt-3 border-t border-white/15 pt-3 text-[12.5px] leading-[1.5] text-white/80">
            {c.desc}
          </p>
        )}
      </div>
    </Link>
  );
}


export default function Categories() {
  const n = cats.length;
  const [active, setActive] = useState(0); // first category starts as the big main card
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);

  // drag state lives in a ref so pointer-move doesn't re-render on every pixel
  const drag = useRef({ down: false, moved: false, stepped: false, x: 0 });

  const go = (d) => setActive((a) => (a + d + n) % n);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive((a) => (a + 1) % n), 4500);
    return () => clearInterval(t);
  }, [paused, n]);

  /* ---------- drag handlers (desktop stage) ---------- */
  const onPointerDown = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    drag.current = { down: true, moved: false, stepped: false, x: e.clientX };
  };

  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d.down) return;
    const dx = e.clientX - d.x;

    if (!d.moved && Math.abs(dx) > DRAG_THRESHOLD) {
      d.moved = true;
      setDragging(true);
      e.currentTarget.setPointerCapture?.(e.pointerId);
    }

    // drag left → next card, drag right → previous card.
    // Exactly ONE card per drag gesture, so fast drags can never skip cards.
    // The user must release and drag again to advance further.
    if (d.moved && !d.stepped && Math.abs(dx) >= STEP_PX) {
      d.stepped = true;
      go(dx < 0 ? 1 : -1);
    }
  };

  const endDrag = () => {
    drag.current.down = false;
    setDragging(false);
    // keep `moved` true until after the trailing click event has fired
    setTimeout(() => {
      drag.current.moved = false;
    }, 0);
  };

  return (
    <section
      id="categories"
      className="relative overflow-hidden py-12 lg:py-14"
      style={{ background: WHITE }}
    >
      {/* soft background shapes (lightened so the page reads as white) */}
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle, #e1effb 0%, rgba(225,239,251,0) 70%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-52 right-0 h-[420px] w-[620px] rounded-[50%] opacity-60 blur-2xl"
        style={{ background: "radial-gradient(ellipse, #d6eafa 0%, rgba(214,234,250,0) 70%)" }}
      />
      <div
        className="pointer-events-none absolute -left-32 bottom-0 h-[320px] w-[520px] rounded-[50%] opacity-50 blur-2xl"
        style={{ background: "radial-gradient(ellipse, #ecf5fd 0%, rgba(236,245,253,0) 70%)" }}
      />
      <Molecule className="pointer-events-none absolute -top-2 right-[-30px] hidden w-[420px] opacity-50 lg:block" flip />
      <Molecule className="pointer-events-none absolute -bottom-4 -left-16 hidden w-[300px] opacity-40 lg:block" />

      <div className="relative mx-auto grid max-w-[1760px] items-center gap-10 px-[5%] lg:grid-cols-[22%_1fr] lg:gap-4 lg:px-[2%]">
        <Reveal direction="left" className="lg:pl-2">
          <span className="inline-flex items-center gap-2.5 rounded-full bg-brand-100 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.22em] text-[#0e3a5d]">
            <span className="h-2 w-2 rounded-full bg-brand-700" />
            Our Categories
          </span>

          <h2
            className="mt-5 text-[38px] leading-[1.05] text-black-800 sm:text-[44px] lg:text-[clamp(30px,2.5vw,42px)]"
            style={{ fontWeight: 500 }}
          >
            Diverse Solutions
            <br />
            for a Better
            <br />
            <span className="italic text-brand-700" style={{ fontWeight: 600, fontSize: "1.12em" }}>
              Tomorrow
            </span>
          </h2>

          <p className="mt-4 max-w-[320px] text-[15px] leading-[1.65] text-[#52667d]">
            From rutile titanium dioxide to road-marking materials – explore the full Neelgiri range across 8 product categories.
          </p>

          <Link
            href="/products"
            className="group mt-6 inline-flex items-center gap-3 rounded-full py-1.5 pl-6 pr-1.5 text-[14px] font-medium text-white shadow-[0_16px_30px_-12px_rgba(14,58,93,0.65)] transition hover:shadow-[0_20px_34px_-12px_rgba(14,58,93,0.75)] bg-brand-500" 
          >
            Explore All Categories
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#0e3a5d] transition group-hover:translate-x-0.5">
              <ArrowRight className="h-[18px] w-[18px]" strokeWidth={1.8} />
            </span>
          </Link>
        </Reveal>

        {/* ---------------- slider ---------------- */}
        <Reveal direction="right" duration={0.9}>
          <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            {/* desktop */}
            <div className="relative hidden lg:block">
              <div
                className={`relative select-none ${
                  dragging ? "cursor-grabbing [&_*]:!cursor-grabbing" : "cursor-grab"
                }`}
                style={{ height: H, width: "calc(100% - 64px)", touchAction: "pan-y" }}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                onDragStart={(e) => e.preventDefault()} /* stops native image/link ghost-drag */
                onClickCapture={(e) => {
                  if (drag.current.moved) {
                    /* swallow the click that ends a drag */
                    e.preventDefault();
                    e.stopPropagation();
                  }
                }}
              >
                {cats.map((c, i) => {
                  const pos = (i - active + ACTIVE_POS + n) % n;
                  const s = slots[Math.min(pos, slots.length - 1)];
                  const isActive = pos === ACTIVE_POS;
                  return (
                    <motion.div
                      key={c.id}
                      initial={false}
                      animate={{
                        left: `${s.left}%`,
                        width: `${s.w}%`,
                        height: s.h,
                        top: (H - s.h) / 2,
                        zIndex: s.zi,
                        opacity: s.o,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 120,
                        damping: 22,
                        opacity: { duration: 0.35 },
                      }}
                      style={{ position: "absolute", pointerEvents: s.o ? "auto" : "none" }}
                      onClickCapture={(e) => {
                        if (!isActive) {
                          e.preventDefault();
                          setActive(i);
                        }
                      }}
                    >
                      <CatCard c={c} index={i} active={isActive} />
                    </motion.div>
                  );
                })}
              </div>

              <button
                aria-label="Next category"
                onClick={() => go(1)}
                className="absolute right-0 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#1a68a0]/15 bg-white text-[#0e3a5d] shadow-[0_12px_28px_-10px_rgba(14,58,93,0.4)] transition hover:scale-105 hover:bg-[#1a68a0] hover:text-white"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={2} />
              </button>

              {/* dots */}
              <div className="mt-3 flex items-center justify-center gap-2.5">
                {cats.map((c, i) => (
                  <button
                    key={c.id}
                    aria-label={`Show ${c.lines.join(" ").trim()}`}
                    onClick={() => setActive(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === active ? "w-9 bg-[#0e3a5d]" : "w-7 bg-[#cfe3f5] hover:bg-[#8fbbe0]"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* mobile / tablet: swipe row */}
            <div className="-mx-[5%] flex snap-x snap-mandatory gap-4 overflow-x-auto px-[5%] pb-4 pt-6 lg:hidden">
              {cats.map((c, i) => (
                <div key={c.id} className="h-[340px] w-[250px] shrink-0 snap-center">
                  <CatCard c={c} index={i} active={i === active} />
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}