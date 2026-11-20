"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Atom,
  ChevronRight,
  Droplets,
  FlaskConical,
  Network,
  Sprout,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Img, { pexels } from "@/components/ui/Img";


const GREEN_700 = "#a9d6f7";
const GOLD = "#d8b568";
const WHITE = "#ffffff";
const SERIF = '"Cormorant Garamond", "Playfair Display", Georgia, "Times New Roman", serif';

const cats = [
  {
    id: "industrial",
    lines: ["Industrial", "Chemicals"],
    desc: "Core chemicals for manufacturing and heavy industry.",
    icon: FlaskConical,
    img: pexels(8917946, 600),
  },
  {
    id: "specialty",
    lines: ["Specialty", "Chemicals"],
    desc: "Tailored formulations for precise, high-value uses.",
    icon: Network,
    img: pexels(7110136, 600),
  },
  {
    id: "performance",
    lines: ["Performance", "Chemicals"],
    desc: "Advanced additives that boost quality and efficiency.",
    icon: Atom,
    img: pexels(25626509, 600),
  },
  {
    id: "water",
    lines: ["Water Treatment", "Chemicals"],
    desc: "Clean, safe water for industry and communities.",
    icon: Droplets,
    img: pexels(7981132, 600),
  },
  {
    id: "agro",
    lines: ["Agro", "Chemicals"],
    desc: "Crop-care solutions for healthier, higher yields.",
    icon: Sprout,
    img: pexels(1002703, 600),
  },
];

const H = 430; // stage height (px)

// 4 visible cards; the big featured (active) card sits on the LEFT.
// The 5th category waits off-stage (invisible) and rotates in as the slider moves.
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
          <stop offset="45%" stopColor="#b9d6c4" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#6fa384" stopOpacity="0.85" />
        </radialGradient>
      </defs>
      <g stroke="#a9c7b4" strokeWidth="5" strokeLinecap="round" opacity="0.8">
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
    <a
      href="#products"
      aria-label={c.lines.join(" ")}
      className={`group relative block h-full w-full overflow-hidden rounded-[28px] transition-all duration-500 ${
        active
          ? "shadow-[0_34px_60px_-22px_rgba(15,61,40,0.65)]"
          : "shadow-[0_20px_40px_-22px_rgba(15,61,40,0.5)] hover:-translate-y-1.5 hover:shadow-[0_28px_48px_-22px_rgba(15,61,40,0.6)]"
      }`}
     
    >
      {/* Full-bleed image */}
      <div className="absolute inset-0 overflow-hidden">
        <Img
          src={c.img}
          alt={c.lines.join(" ")}
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
            ? "linear-gradient(to top, rgba(10,42,26,0.92) 0%, rgba(10,42,26,0.35) 42%, rgba(10,42,26,0.05) 70%, rgba(10,42,26,0.25) 100%)"
            : "linear-gradient(to top, rgba(10,42,26,0.78) 0%, rgba(10,42,26,0.15) 45%, rgba(10,42,26,0) 70%)",
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
            ? "border-white/15 bg-[#0f3d28]/80 py-4"
            : "border-white/70 bg-white/92 py-3"
        }`}
        style={{ backgroundColor: active ? undefined : "rgba(255,255,255,0.93)" }}
      >
        <div className="flex min-w-0 items-center gap-2.5">
          {/* Icon */}
          <span
            className={`flex shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
              active
                ? "h-11 w-11 text-[#0f3d28]"
                : "h-10 w-10 bg-[#e3eee6] text-[#1f5a3c] group-hover:bg-[#17533a] group-hover:text-white"
            }`}
            style={active ? { background: GOLD } : undefined}
          >
            <Icon className="h-[19px] w-[19px]" strokeWidth={1.6} />
          </span>

          {/* Title */}
          <p
            className={`min-w-0 flex-1 break-words font-semibold leading-[1.2] ${
              active ? "text-[16.5px] text-white" : "text-[14px] text-[#0f3d28]"
            }`}
          >
            {c.lines[0]}
            <br />
            <span className={active ? "font-medium text-white/75" : "font-medium text-[#5b6660]"}>
              {c.lines[1]}
            </span>
          </p>

          {/* Arrow */}
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 group-hover:translate-x-0.5 ${
              active
                ? "border-white/30 bg-white text-[#17533a] group-hover:bg-[#d8b568] group-hover:text-[#0f3d28]"
                : "border-[#17533a]/15 bg-[#e3eee6] text-[#17533a] group-hover:border-[#17533a] group-hover:bg-[#17533a] group-hover:text-white"
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
    </a>
  );
}


export default function Categories() {
  const n = cats.length;
  const [active, setActive] = useState(0); // first category starts as the big main card
  const [paused, setPaused] = useState(false);

  const go = (d) => setActive((a) => (a + d + n) % n);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive((a) => (a + 1) % n), 4500);
    return () => clearInterval(t);
  }, [paused, n]);

  return (
    <section
      id="categories"
      className="relative overflow-hidden py-12 lg:py-14"
      style={{ background: WHITE }}
    >
      {/* soft background shapes (lightened so the page reads as white) */}
      <div
        className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle, #e8f1eb 0%, rgba(232,241,235,0) 70%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-52 right-0 h-[420px] w-[620px] rounded-[50%] opacity-60 blur-2xl"
        style={{ background: "radial-gradient(ellipse, #dfeae3 0%, rgba(223,234,227,0) 70%)" }}
      />
      <div
        className="pointer-events-none absolute -left-32 bottom-0 h-[320px] w-[520px] rounded-[50%] opacity-50 blur-2xl"
        style={{ background: "radial-gradient(ellipse, #eef5f0 0%, rgba(238,245,240,0) 70%)" }}
      />
      <Molecule className="pointer-events-none absolute -top-2 right-[-30px] hidden w-[420px] opacity-50 lg:block" flip />
      <Molecule className="pointer-events-none absolute -bottom-4 -left-16 hidden w-[300px] opacity-40 lg:block" />

      <div className="relative mx-auto grid max-w-[1760px] items-center gap-10 px-[5%] lg:grid-cols-[22%_1fr] lg:gap-4 lg:px-[2%]">
        <Reveal direction="left" className="lg:pl-2">
          <span className="inline-flex items-center gap-2.5 rounded-full bg-brand-100 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.22em] text-[#0f3d28]">
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

          <p className="mt-4 max-w-[320px] text-[15px] leading-[1.65] text-[#5b6660]">
            Explore our wide range of high-performance chemicals for multiple industries.
          </p>

          <a
            href="#products"
            className="group mt-6 inline-flex items-center gap-3 rounded-full py-1.5 pl-6 pr-1.5 text-[14px] font-medium text-white shadow-[0_16px_30px_-12px_rgba(15,61,40,0.65)] transition hover:shadow-[0_20px_34px_-12px_rgba(15,61,40,0.75)] bg-brand-500" 
          >
            Explore All Categories
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#0f3d28] transition group-hover:translate-x-0.5">
              <ArrowRight className="h-[18px] w-[18px]" strokeWidth={1.8} />
            </span>
          </a>
        </Reveal>

        {/* ---------------- slider ---------------- */}
        <Reveal direction="right" duration={0.9}>
          <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            {/* desktop */}
            <div className="relative hidden lg:block">
              <div
                className="relative"
                style={{ height: H, width: "calc(100% - 64px)" }}
              >
                {cats.map((c, i) => {
                  const pos = (i - active + ACTIVE_POS + n) % n;
                  const s = slots[pos];
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
                className="absolute right-0 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#17533a]/15 bg-white text-[#0f3d28] shadow-[0_12px_28px_-10px_rgba(15,61,40,0.4)] transition hover:scale-105 hover:bg-[#17533a] hover:text-white"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={2} />
              </button>

              {/* dots */}
              <div className="mt-3 flex items-center justify-center gap-2.5">
                {cats.map((c, i) => (
                  <button
                    key={c.id}
                    aria-label={`Show ${c.lines.join(" ")}`}
                    onClick={() => setActive(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === active ? "w-9 bg-[#0f3d28]" : "w-7 bg-[#d5e3da] hover:bg-[#a9c7b4]"
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