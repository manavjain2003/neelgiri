"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  FlaskConical,
  Globe,
  Lightbulb,
  ShieldCheck,
} from "lucide-react";
import { pexels } from "@/components/ui/Img";

const HERO_IMAGE = "/all_products_2.png";
const MOLECULE_IMAGE = "/images/molecule.png";

const categories = [
  { name: "Industrial\nChemicals", desc: "Bulk chemicals for large-scale manufacturing.", img: pexels(2786527, 500) }, // drums / industrial
  { name: "Specialty\nChemicals", desc: "Performance-engineered for niche applications.", img: pexels(8917946, 500) }, // lab / specialty
  { name: "Fine\nChemicals", desc: "High-purity compounds for precise formulations.", img: pexels(7110136, 500) }, // white powder
  { name: "Polymers &\nResins", desc: "Durable materials for coatings and composites.", img: pexels(7722683, 500) }, // blue material
  { name: "Solvents", desc: "Reliable solvents for cleaning and processing.", img: pexels(8392533, 500) }, // flask / liquids
];

const features = [
  { icon: ShieldCheck, title: "Premium Quality", text: "Consistent quality, assured performance." },
  { icon: Lightbulb, title: "Advanced Formulations", text: "Tailored solutions for modern industries." },
  { icon: Globe, title: "Global Standards", text: "Meeting international quality benchmarks." },
];


function Molecule({ className = "", delay = 0, blur = 0, opacity = 1, rotate = 0, flip = false }) {
  return (
    <motion.img
      src={MOLECULE_IMAGE}
      alt=""
      aria-hidden="true"
      draggable={false}
      initial={{ rotate }}
      animate={{ y: [0, -14, 0], rotate: [rotate, rotate + 4, rotate] }}
      transition={{ duration: 7, delay, repeat: Infinity, ease: "easeInOut" }}
      className={`pointer-events-none absolute select-none object-contain ${className}`}
      style={{
        filter: blur ? `blur(${blur}px)` : undefined,
        opacity,
        scaleX: flip ? -1 : 1,
      }}
    />
  );
}

function HeroArt() {
  const edgeFade =
    "linear-gradient(to bottom, transparent 0%, #000 14%, #000 86%, transparent 100%)";
  return (
    <div className="relative mx-auto aspect-[1/1.02] w-full max-w-[780px]">
      {/* glass pedestal */}
      <svg viewBox="0 0 600 140" className="absolute inset-x-0 bottom-0 w-full" aria-hidden="true">
        <defs>
          <linearGradient id="fp-glass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#bcdcf5" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <ellipse cx="300" cy="86" rx="290" ry="46" fill="url(#fp-glass)" stroke="#d6e4f7" strokeOpacity="0.9" />
        <ellipse cx="300" cy="66" rx="235" ry="36" fill="#eaf4fd" stroke="#d6e4f7" strokeOpacity="0.95" />
        <ellipse cx="300" cy="62" rx="200" ry="28" fill="#dcecf9" opacity="0.7" />
      </svg>

      {/* big circle: blurred copy fills it, sharp full photo sits on top */}
      <div className="absolute left-1/2 top-0 aspect-square w-[92%] -translate-x-1/2 overflow-hidden rounded-full bg-gradient-to-b from-[#9cc6ec] via-[#cfe4f7] to-white shadow-[0_30px_60px_-30px_rgba(30,80,180,0.5)]">
        <img
          src={HERO_IMAGE}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-125 object-cover blur-2xl"
        />
        <motion.img
          src={HERO_IMAGE}
          alt="Chemical molecules, laboratory glassware and powder"
          animate={{ scale: [1.04, 1.08, 1.04] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 h-full w-full object-fill"
          style={{ WebkitMaskImage: edgeFade, maskImage: edgeFade }}
        />
        <div className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_50px_rgba(255,255,255,0.7)]" />
        <div className="pointer-events-none absolute inset-0 rounded-full border-2 border-white/70" />
      </div>

      {/* orbit ring */}
      <svg viewBox="0 0 600 612" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
        <ellipse
          cx="300"
          cy="285"
          rx="330"
          ry="95"
          transform="rotate(-16 300 285)"
          fill="none"
          stroke="#b3c8e6"
          strokeOpacity="0.9"
          strokeWidth="2"
        />
      </svg>

      <Molecule className="-left-4 top-[16%] w-[15%]" delay={0.5} rotate={-10} />
      <Molecule className="right-[2%] top-[4%] w-[12%]" delay={1.2} rotate={12} blur={0.5} />
    </div>
  );
}


export default function FeaturedProducts() {
  const [active, setActive] = useState(1);
  const [paused, setPaused] = useState(false);
  const total = categories.length;

  const go = (d) => setActive((a) => (a + d + total) % total);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive((a) => (a + 1) % total), 5000);
    return () => clearInterval(t);
  }, [paused, total]);

  return (
    <section
      id="products"
      className="relative isolate overflow-hidden bg-white"
    >

      {/* corner floating molecules */}
      <Molecule className="-right-8 -top-6 w-[170px] sm:w-[230px] lg:w-[300px]" delay={0} rotate={8} />
      <Molecule className="-left-10 top-[52%] hidden w-[130px] lg:block" delay={1} rotate={-20} blur={1.5} opacity={0.85} flip />
      <Molecule className="-bottom-8 -right-6 hidden w-[200px] lg:block" delay={2} rotate={160} blur={1} opacity={0.8} />
      <Molecule className="bottom-4 left-[8%] hidden w-[100px] lg:block" delay={1.6} rotate={25} blur={1} opacity={0.7} />

      <div className="relative mx-auto max-w-[1840px] px-[5%] pb-10 pt-10 lg:px-[5.5%] lg:pt-[4%]">
        <div className="grid items-center gap-8 lg:grid-cols-[35%_1fr_27%] lg:gap-12 xl:gap-16">
          {/* ---------- Left ---------- */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative z-10"
          >
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#b3c8e6] bg-[#e1ebfa] px-4 py-2 text-[13px] font-medium text-[#1b3f8b] shadow-sm backdrop-blur">
                <FlaskConical className="h-4 w-4 text-[#c8921f]" />
                Featured Products
              </span>
              <span className="hidden h-px w-24 bg-brand-700 sm:block" />
            </div>

            <h2 className="mt-7 font-serif text-[38px] font-semibold leading-[1.1] tracking-tight text-[#0f2a5c] sm:text-[48px] lg:text-[clamp(34px,3.3vw,52px)]">
              <span className="block whitespace-nowrap">Innovative Chemical</span>
              <span className="block whitespace-nowrap">Solutions for a</span>
              <em className="block whitespace-nowrap font-medium italic text-[#c8921f]">Better Tomorrow</em>
            </h2>

            <p className="mt-6 max-w-[420px] text-[16px] leading-relaxed text-[#5b6b85] lg:text-[17px]">
              High-performance chemicals designed for diverse industrial applications.
            </p>

            <div className="mt-8 flex items-center gap-5">
              <motion.a
                href="#products"
                whileHover={{ scale: 1.04 }}
                className="inline-flex items-center gap-4 rounded-full border border-[#d3b76e] bg-[#0a2e6e] py-2 pl-7 pr-2 text-[15px] font-semibold text-white shadow-[0_12px_30px_rgba(30,80,180,0.28)] transition-colors hover:bg-[#123f91]"
              >
                Explore Our Products
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0a2e6e]">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </motion.a>
              <span className="hidden h-px w-32 bg-[#d6b86b]/80 md:block" />
            </div>
          </motion.div>

          {/* ---------- Center ---------- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative -mb-4 lg:mb-0"
          >
            <HeroArt />
          </motion.div>

          {/* ---------- Right feature cards ---------- */}
          <div className="relative z-10 flex flex-col gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 * i, duration: 0.6 }}
                whileHover={{ y: -4 }}
                className="flex items-center gap-4 rounded-[24px] border border-white/80 bg-white/55 px-5 py-5 shadow-[0_18px_40px_-20px_rgba(30,80,180,0.5)] backdrop-blur-xl"
              >
                <span className="flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[#e3ecf9] to-[#c9dbf3] text-[#1b4fb0] shadow-inner">
                  <f.icon className="h-7 w-7" strokeWidth={1.6} />
                </span>
                <div className="min-w-0">
                  <p className="text-[17px] font-semibold leading-[1.15] text-[#12295a]">{f.title}</p>
                  <p className="mt-1.5 text-[12.5px] leading-snug text-[#5b6b85]">{f.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ---------- Category carousel ---------- */}
        <div
          className="relative mt-6 lg:mt-3"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="flex items-center gap-3">
            <button
              aria-label="Previous category"
              onClick={() => go(-1)}
              className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full border border-[#d3b76e]/70 bg-white text-[#0a2e6e] shadow-[0_10px_24px_-10px_rgba(30,80,180,0.5)] transition hover:scale-105"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            <div className="flex min-w-0 flex-1 items-stretch gap-3 overflow-x-auto py-2 [scrollbar-width:none] lg:overflow-visible">
              {categories.map((c, i) => {
                const isActive = i === active;
                return (
                  <motion.button
                    key={c.name}
                    layout
                    onClick={() => setActive(i)}
                    transition={{ type: "spring", stiffness: 260, damping: 28 }}
                    className={`group relative h-[260px] shrink-0 overflow-hidden rounded-[30px] text-left ${
                      isActive
                        ? "w-[380px] shadow-[0_26px_50px_-16px_rgba(30,80,180,0.65)] ring-2 ring-[#d6b65f] lg:w-auto lg:flex-[1.6]"
                        : "w-[240px] border border-[#dbe6f5] shadow-[0_16px_32px_-18px_rgba(30,80,180,0.55)] lg:w-auto lg:flex-1"
                    }`}
                  >
                    <img
                      src={c.img}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />
                    <div
                      className={`absolute inset-0 ${
                        isActive
                          ? "bg-gradient-to-t from-[#0a2a63] via-[#0f3d92]/55 to-[#0a2a63]/5"
                          : "bg-gradient-to-t from-[#0a2a63]/90 via-[#0a2a63]/35 to-transparent"
                      }`}
                    />

                    <span className="absolute left-5 top-5 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-[12px] font-semibold tracking-[0.15em] text-white backdrop-blur-md">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <span
                      className={`absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
                        isActive
                          ? "bg-white text-[#0a2e6e]"
                          : "border border-white/40 bg-white/20 text-white backdrop-blur-md group-hover:bg-white group-hover:text-[#0a2e6e]"
                      }`}
                    >
                      <ArrowRight className="h-5 w-5" />
                    </span>

                    <div className="absolute inset-x-5 bottom-5">
                      <div className={`mb-3 h-[2px] rounded-full bg-[#d6b86b] ${isActive ? "w-14" : "w-8"}`} />
                      <p
                        className={`whitespace-pre-line font-serif font-semibold leading-[1.1] text-white ${
                          isActive ? "text-[30px]" : "text-[21px]"
                        }`}
                      >
                        {c.name}
                      </p>
                      {isActive && (
                        <>
                          <p className="mt-2 max-w-[300px] text-[13.5px] leading-snug text-white/80">
                            {c.desc}
                          </p>
                          <p className="mt-3 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.18em] text-[#e6c778]">
                            Explore range
                            <ArrowRight className="h-3.5 w-3.5" />
                          </p>
                        </>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <button
              aria-label="Next category"
              onClick={() => go(1)}
              className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full border border-[#d3b76e]/70 bg-white text-[#0a2e6e] shadow-[0_10px_24px_-10px_rgba(30,80,180,0.5)] transition hover:scale-105"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          <div className="mx-auto mt-3 h-[5px] w-[110px] overflow-hidden rounded-full bg-[#0a2e6e]/15">
            <motion.div
              className="h-full rounded-full bg-[#d4a537]"
              animate={{ width: `${((active + 1) / total) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}