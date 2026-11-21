"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  Box,
  Check,
  Cog,
  Construction,
  Droplet,
  Factory,
  FlaskConical,
  Footprints,
  HardHat,
  Disc,
  Layers,
  Link2,
  Network,
  Package,
  PaintBucket,
  PaintRoller,
  Route,
  Settings,
  Sprout,
  Waves,
} from "lucide-react";

const BG_IMAGE = "/industries_bg_placeholder_.png";
const TABS = [
  {
    id: "paint",
    label: "Paint & Coatings",
    icon: PaintRoller,
    eyebrow: "For a Colorful Tomorrow",
    title: "Paint & Coatings Solutions",
    description: "Premium raw materials for durable, high-quality and long-lasting paints.",
    bullets: ["Superior Finish", "Enhanced Durability", "Eco-Friendly Options"],
    cta: { label: "Explore Products", href: "/products" },
    image: "/industries/indus_2.png",
    imageAlt: "Paint & Coatings",
    cards: [
      { icon: PaintBucket, title: "Paint", desc: "High-performance paint ingredients.", href: "/products" },
      { icon: Droplet, title: "Ink and Coating", desc: "Vibrant and durable inks & coatings.", href: "/products" },
      { icon: PaintRoller, title: "Road Marking Machines & Equipment", desc: "Reliable solutions for safer roads.", href: "/products" },
      { icon: Settings, title: "Footwear", desc: "Advanced materials for lasting comfort.", href: "/products" },
    ],
  },
  {
    id: "plastics",
    label: "Plastics & Polymers",
    icon: Box,
    eyebrow: "Engineered for Performance",
    title: "Plastics & Polymers Solutions",
    description: "Reliable compounds and masterbatches for consistent, high-grade plastic products.",
    bullets: ["Consistent Quality", "Wide Grade Range", "Custom Formulations"],
    cta: { label: "Explore Products", href: "/products" },
    image: "",
    imageAlt: "Plastics & Polymers",
    cards: [
      { icon: Package, title: "Plastic Compound and Masterbatches", desc: "Colour and additive solutions.", href: "/products" },
    ],
  },
  {
    id: "construction",
    label: "Construction",
    icon: HardHat,
    eyebrow: "Built to Last",
    title: "Construction & Road Solutions",
    description: "Materials and equipment that keep roads and infrastructure safe and durable.",
    bullets: ["High Visibility", "Weather Resistant", "Long Service Life"],
    cta: { label: "Explore Products", href: "/products" },
    image: "",
    imageAlt: "Construction",
    cards: [
      { icon: Route, title: "Hot Melt Road Marking Paint", desc: "Durable, high-visibility markings.", href: "/products" },
      { icon: Construction, title: "Road Construction and Infrastructure", desc: "Materials for lasting roads.", href: "/products" },
      { icon: Cog, title: "Road Marking Machines & Equipment", desc: "Reliable solutions for safer roads.", href: "/products" },
    ],
  },
  {
    id: "adhesives",
    label: "Adhesives & Sealants",
    icon: Droplet,
    eyebrow: "Bond with Confidence",
    title: "Adhesives & Sealants Solutions",
    description: "Strong, reliable raw materials for adhesives and sealants across applications.",
    bullets: ["Strong Bonding", "Flexible Formulations", "Fast Curing"],
    cta: { label: "Explore Products", href: "/products" },
    image: "",
    imageAlt: "Adhesives & Sealants",
    cards: [
      { icon: Link2, title: "Adhesive and Sealants", desc: "Versatile bonding solutions.", href: "/products" },
      { icon: Link2, title: "Gum Adhesive and Sealants", desc: "Dependable gum-based adhesives.", href: "/products" },
      { icon: Link2, title: "Hot Melt Adhesive", desc: "Fast-setting hot melt systems.", href: "/products" },
    ],
  },
  {
    id: "rubber",
    label: "Rubber & Tyres",
    icon: Cog,
    eyebrow: "Strength in Motion",
    title: "Rubber & Tyres Solutions",
    description: "Raw materials for rubber goods, conveyor belts, footwear and brake linings.",
    bullets: ["High Tensile Strength", "Heat Resistant", "Long Wear Life"],
    cta: { label: "Explore Products", href: "/products" },
    image: "",
    imageAlt: "Rubber & Tyres",
    cards: [
      { icon: Layers, title: "Rubber and Conveyor Belts", desc: "Tough, long-lasting compounds.", href: "/products" },
      { icon: Footprints, title: "Footwear", desc: "Advanced materials for lasting comfort.", href: "/products" },
      { icon: Disc, title: "Brake Lining", desc: "Dependable friction materials.", href: "/products" },
    ],
  },
];

const MORE_INDUSTRIES = [
  { icon: FlaskConical, label: "Chemicals" },
  { icon: Network, label: "Ceramic" },
  { icon: Sprout, label: "Lubricants & Pesticides" },
  { icon: Waves, label: "Water Treatment Chemicals" },
];

// Artistic card silhouettes: two opposite corners are large and sweeping, the other two are tight.
// They alternate in a checkerboard so the 2x2 grid reads as one organic composition.
const CARD_SHAPES = [
  "rounded-tl-[64px] rounded-br-[64px] rounded-tr-[14px] rounded-bl-[14px]",
  "rounded-tr-[64px] rounded-bl-[64px] rounded-tl-[14px] rounded-br-[14px]",
  "rounded-tr-[64px] rounded-bl-[64px] rounded-tl-[14px] rounded-br-[14px]",
  "rounded-tl-[64px] rounded-br-[64px] rounded-tr-[14px] rounded-bl-[14px]",
];

/* ------------------------------------------------------------------ */

export default function Industries() {
  const [activeId, setActiveId] = useState(TABS[0].id);
  const active = TABS.find((t) => t.id === activeId) ?? TABS[0];

  const reduce = useReducedMotion();

  // mouse parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 15 });
  const sy = useSpring(my, { stiffness: 80, damping: 15 });
  const imgX = useTransform(sx, [-0.5, 0.5], [-6, 6]);
  const imgY = useTransform(sy, [-0.5, 0.5], [-4, 4]);
  const rotY = useTransform(sx, [-0.5, 0.5], [-1.5, 1.5]);

  const onMove = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section
      id="industries"
      className="relative isolate overflow-hidden bg-gradient-to-b from-[#f4f8fe] via-[#eaf2fd] to-[#f3f8ff] py-12 sm:py-14 lg:py-14"
    >
      {/* section background image: /public/industries_bg.png */}
      <Image
        src="/industries_bg.png"
        alt=""
        fill
        sizes="100vw"
        priority
        className="pointer-events-none -z-10 select-none object-cover object-center"
      />

      <div className="mx-auto max-w-[1640px] px-[4%] lg:px-[5%]">
        {/* ---------- Heading ---------- */}
        <div className="mx-auto max-w-[900px] text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="hidden h-px w-24 bg-gradient-to-r from-transparent to-[#c3d5ee] sm:block sm:w-40 lg:w-56" />
            <span className="inline-flex items-center gap-2.5 rounded-full border border-[#d3e3f8] bg-[#e4effc] px-5 py-2.5 text-[13px] font-bold uppercase tracking-[0.12em] text-[#1456c8] shadow-[0_6px_18px_rgba(40,110,220,0.10)]">
              <Factory className="h-5 w-5" strokeWidth={1.8} />
              Industries We Serve
            </span>
            <span className="hidden h-px w-24 bg-gradient-to-l from-transparent to-[#c3d5ee] sm:block sm:w-40 lg:w-56" />
          </div>

          <h2 className="mt-6 font-serif text-[34px] font-bold leading-[1.1] tracking-tight text-[#0a2a5e] sm:text-[44px] lg:text-[54px]">
            One Supplier for{" "}
            <span className="relative inline-block italic text-[#1456c8]">
              Every Formulation
              <svg
                className="absolute -bottom-2 left-0 h-3 w-full"
                viewBox="0 0 400 14"
                preserveAspectRatio="none"
                fill="none"
                aria-hidden="true"
              >
                <path d="M2 11 C 120 2, 280 2, 398 8" stroke="#1456c8" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-[560px] text-[16px] leading-relaxed text-[#43557a] sm:text-[17px]">
            From paints to plastics, we provide high-performance raw materials that power industries across diverse
            sectors.
          </p>
        </div>

        <div className="mt-8 flex items-center gap-3 lg:mt-8">
          <div
            role="tablist"
            aria-label="Industries"
            className="flex min-w-0 flex-1 items-center overflow-x-auto rounded-full bg-white/80 p-0 shadow-[0_10px_30px_rgba(40,110,220,0.10)] backdrop-blur [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {TABS.map((tab, i) => {
              const Icon = tab.icon;
              const isActive = tab.id === activeId;
              const nextIsActive = TABS[i + 1]?.id === activeId;
              return (
                <div key={tab.id} className="flex flex-1 items-center">
                  <button
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveId(tab.id)}
                    className={`flex w-full shrink-0 items-center justify-center gap-3 whitespace-nowrap rounded-full px-6 py-[18px] text-[15px] font-semibold transition-colors lg:px-8 ${
                      isActive
                        ? "bg-[#0a2a6c] text-white shadow-[0_10px_24px_rgba(10,42,108,0.35)]"
                        : "text-[#12295a] hover:bg-[#eef4fd]"
                    }`}
                  >
                    <Icon className={`h-7 w-7 ${isActive ? "text-white" : "text-[#1456c8]"}`} strokeWidth={1.6} />
                    {tab.label}
                  </button>
                  {i < TABS.length - 1 && (
                    <span className={`h-8 w-px shrink-0 bg-[#c9d8ee] ${isActive || nextIsActive ? "opacity-0" : ""}`} />
                  )}
                </div>
              );
            })}
          </div>

          <Link
            href="/products"
            className="hidden shrink-0 items-center gap-4 rounded-full bg-white/85 px-8 py-[18px] text-[15px] font-semibold text-[#12295a] shadow-[0_10px_30px_rgba(40,110,220,0.10)] backdrop-blur transition-colors hover:bg-white md:flex"
          >
            Explore All
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#c9d8ee] text-[#12295a]">
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>

        <div className="mt-5 overflow-hidden rounded-[40px] border border-white/80 bg-gradient-to-br from-[#f7faff] via-[#e9f2fd] to-[#dcebfb] p-5 shadow-[0_20px_60px_rgba(40,110,220,0.14)] sm:p-6 lg:p-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid items-center gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.45fr)_minmax(0,1.25fr)] lg:gap-5"
            >
              {/* Left: text */}
              <div className="lg:pl-2">
                <span className="inline-flex items-center gap-3 rounded-full border border-[#b9d0f0] bg-[#eaf2fd] px-5 py-1.5 text-[14px] font-medium text-[#1456c8]">
                  {active.eyebrow}
                  <span className="hidden h-px w-14 bg-[#b9d0f0] sm:block" />
                </span>

                <h3 className="mt-5 text-[36px] font-bold leading-[1.08] tracking-tight text-[#0a2a5e] sm:text-[42px] lg:text-[40px]">
                  {active.title}
                </h3>

                <p className="mt-5 max-w-[340px] text-[17px] leading-[1.55] text-[#2f4268]">{active.description}</p>

                <ul className="mt-5 space-y-2.5">
                  {active.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-3 text-[15px] text-[#2f4268]">
                      <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#1456c8] text-white">
                        <Check className="h-3 w-3" strokeWidth={3.5} />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>

                <Link
                  href={active.cta.href}
                  className="mt-6 inline-flex items-center gap-3 rounded-full bg-[#0a2a6c] px-8 py-3 text-[15px] font-semibold text-white shadow-[0_12px_28px_rgba(10,42,108,0.35)] transition-colors hover:bg-[#123f91]"
                >
                  {active.cta.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Middle: animated image */}
              <div
                onMouseMove={onMove}
                onMouseLeave={onLeave}
                className="relative mx-auto aspect-[4/3.4] w-full max-w-[680px] [perspective:900px] lg:aspect-auto lg:h-[430px] lg:scale-[1.12]"
              >
                {/* background placeholder: static, no movement */}
                <Image
                  src={BG_IMAGE}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  className="pointer-events-none select-none object-contain"
                  priority
                />

                {active.image && (
                  <>
                    {/* soft ground shadow that breathes with the float */}
                    <motion.div
                      key={`shadow-${active.id}`}
                      className="absolute inset-x-0 bottom-6 mx-auto h-5 w-[45%] rounded-full bg-[#0a2a6c]/25 blur-xl"
                      animate={reduce ? undefined : { scaleX: [1, 0.92, 1], opacity: [0.5, 0.38, 0.5] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    />

                    {/* parallax layer */}
                    <motion.div
                      className="absolute inset-0 z-10"
                      style={{ x: reduce ? 0 : imgX, y: reduce ? 0 : imgY, rotateY: reduce ? 0 : rotY }}
                    >
                      {/* entrance + float + sway */}
                      <motion.div
                        key={active.id}
                        className="absolute inset-0"
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={
                          reduce
                            ? { opacity: 1, scale: 1 }
                            : { opacity: 1, scale: 1, y: [0, -6, 0], rotate: [0, 0.5, 0, -0.5, 0] }
                        }
                        transition={{
                          opacity: { duration: 0.5 },
                          scale: { duration: 0.6, ease: "easeOut" },
                          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                          rotate: { duration: 12, repeat: Infinity, ease: "easeInOut" },
                        }}
                      >
                        <Image
                          src={active.image}
                          alt={active.imageAlt}
                          fill
                          sizes="(min-width: 1024px) 45vw, 90vw"
                          className="object-contain drop-shadow-[0_20px_30px_rgba(10,42,108,0.18)]"
                          priority
                        />

                        {/* mirror shine: a glossy highlight sweeping across the image shape only */}
                        {!reduce && (
                          <motion.div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0"
                            style={{
                              backgroundImage:
                                "linear-gradient(105deg, transparent 42%, rgba(255,255,255,0.35) 47%, rgba(255,255,255,0.95) 50%, rgba(255,255,255,0.35) 53%, transparent 58%)",
                              backgroundSize: "300% 100%",
                              backgroundRepeat: "no-repeat",
                              WebkitMaskImage: `url(${active.image})`,
                              maskImage: `url(${active.image})`,
                              WebkitMaskSize: "contain",
                              maskSize: "contain",
                              WebkitMaskRepeat: "no-repeat",
                              maskRepeat: "no-repeat",
                              WebkitMaskPosition: "center",
                              maskPosition: "center",
                              mixBlendMode: "soft-light",
                            }}
                            initial={{ backgroundPositionX: "100%" }}
                            animate={{ backgroundPositionX: ["100%", "0%"] }}
                            transition={{
                              duration: 2.2,
                              ease: "easeInOut",
                              repeat: Infinity,
                              repeatDelay: 3.5,
                            }}
                          />
                        )}
                      </motion.div>
                    </motion.div>
                  </>
                )}
              </div>

              {/* Right: cards */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {active.cards.map((card, i) => {
                  const CardIcon = card.icon;
                  return (
                    <Link
                      key={card.title}
                      href={card.href}
                      className={`group relative isolate flex min-h-[120px] items-center gap-4 overflow-hidden border border-white bg-gradient-to-br from-white/95 via-white/80 to-[#e3eefc]/80 px-6 py-5 shadow-[0_12px_30px_rgba(40,110,220,0.12)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(40,110,220,0.20)] ${CARD_SHAPES[i % CARD_SHAPES.length]}`}
                    >
                      {/* decorative blobs that swell on hover */}
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-8 -top-8 -z-10 h-28 w-28 rounded-full bg-[#1456c8]/10 transition-transform duration-500 group-hover:scale-150"
                      />
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -bottom-10 -left-6 -z-10 h-24 w-24 rounded-full bg-[#7fb2ff]/15 transition-transform duration-500 group-hover:scale-150"
                      />

                      {/* organic blob icon holder */}
                      <span className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-[58%_42%_55%_45%/48%_56%_44%_52%] bg-gradient-to-br from-[#e6f0ff] to-[#cfe0fa] text-[#1456c8] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_6px_14px_rgba(20,86,200,0.15)] transition-transform duration-500 group-hover:rotate-12">
                        <CardIcon className="h-6 w-6" strokeWidth={1.6} />
                      </span>

                      <span className="min-w-0">
                        <span className="block text-[15px] font-bold leading-snug text-[#0a2a5e]">{card.title}</span>
                        <span className="mt-1 block text-[13px] leading-snug text-[#5b6b85]">{card.desc}</span>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-7">
          <div className="flex items-center justify-center gap-4">
            <span className="hidden h-px flex-1 bg-gradient-to-r from-transparent to-[#c3d5ee] sm:block" />
            <span className="rounded-full border border-[#d3e3f8] bg-[#e4effc] px-6 py-2 text-[13px] font-bold uppercase tracking-[0.1em] text-[#1456c8]">
              More Industries
            </span>
            <span className="hidden h-px flex-1 bg-gradient-to-l from-transparent to-[#c3d5ee] sm:block" />
          </div>

          <div className="mx-auto mt-5 grid max-w-[1100px] grid-cols-2 gap-y-6 md:grid-cols-4">
            {MORE_INDUSTRIES.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className={`flex items-center justify-center gap-4 px-4 ${
                    i < MORE_INDUSTRIES.length - 1 ? "md:border-r md:border-[#c9d8ee]" : ""
                  }`}
                >
                  <span className="flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-full bg-[#e3edfa] text-[#1456c8] shadow-[0_6px_16px_rgba(40,110,220,0.10)]">
                    <Icon className="h-7 w-7" strokeWidth={1.6} />
                  </span>
                  <span className="max-w-[130px] text-[15px] font-semibold leading-snug text-[#12295a]">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}