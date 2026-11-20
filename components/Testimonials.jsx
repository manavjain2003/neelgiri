"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { ArrowRight, Globe, Quote, ShieldCheck, Star, Users } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Img from "@/components/ui/Img";

const testimonials = [
  {
    text: "Neelgiri Chemicals has been our trusted partner for years. Their quality and service are exceptional.",
    name: "Ramesh Kumar",
    role: "Procurement Head, Global Industries",
    imgTop: "https://images.unsplash.com/photo-1602052577122-f73b9710adba?auto=format&fit=crop&w=800&q=70",
    imgBottom: "https://images.unsplash.com/photo-1646956141271-05281b4ef472?auto=format&fit=crop&w=800&q=70",
  },
  {
    text: "Consistent purity and on-time delivery every single time. They truly understand our industry needs.",
    name: "Vikram Rao",
    role: "Plant Manager, BlueWave Industries",
    imgTop: "https://images.pexels.com/photos/18026608/pexels-photo-18026608.jpeg?auto=compress&cs=tinysrgb&w=800",
    imgBottom: "https://images.unsplash.com/photo-1578496479531-32e296d5c6e1?auto=format&fit=crop&w=800&q=70",
  },
  {
    text: "Their custom chemical solutions helped us cut costs and meet every sustainability target we set.",
    name: "Arjun Mehta",
    role: "Director, AquaPure Treatments",
    imgTop: "https://images.pexels.com/photos/26733910/pexels-photo-26733910.jpeg?auto=compress&cs=tinysrgb&w=800",
    imgBottom: "https://images.pexels.com/photos/26733897/pexels-photo-26733897.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    text: "Technical support is outstanding. Whenever we had a formulation query, their team responded within hours with clear answers.",
    name: "Sunita Deshmukh",
    role: "R&D Lead, Veda Polymers",
    imgTop: "https://images.unsplash.com/photo-1581091007718-0c50d599bfd0?auto=format&fit=crop&w=800&q=70",
    imgBottom: "https://images.unsplash.com/photo-1639772823907-a716be4bdecc?auto=format&fit=crop&w=800&q=70",
  },
  {
    text: "From documentation to export compliance, everything was seamless. Shipments to our overseas plants arrive exactly as promised.",
    name: "Karthik Iyer",
    role: "Supply Chain Director, Orion Exports",
    imgTop: "https://images.pexels.com/photos/3057960/pexels-photo-3057960.jpeg?auto=compress&cs=tinysrgb&w=800",
    imgBottom: "https://images.pexels.com/photos/167676/pexels-photo-167676.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

const stats = [
  { icon: Star, value: "4.9/5", label: "Average Rating" },
  { icon: Users, value: "500+", label: "Happy Clients" },
  { icon: Globe, value: "25+", label: "Countries Served" },
  { icon: ShieldCheck, value: "100%", label: "Quality Assurance" },
];

function Avatar({ name, img, textClass = "text-[20px]" }) {
  if (img) return <Img src={img} alt={name} className="h-full w-full" />;
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div
      className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-[#2f6fd6] to-[#0a2e6e] font-serif font-semibold text-white ${textClass}`}
      aria-label={name}
    >
      {initials}
    </div>
  );
}

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const sectionRef = useRef(null);
  const total = testimonials.length;

  // progress 0 → 1 while scrolling through the tall wrapper
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    // scroll-driven only on desktop (where the section is pinned)
    if (!window.matchMedia("(min-width: 1024px)").matches) return;
    setIdx(Math.min(total - 1, Math.max(0, Math.floor(v * total))));
  });

  const t = testimonials[idx];

  return (
    // tall wrapper = scroll distance (100vh per review)
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative lg:h-[var(--scroll-h)]"
      style={{ "--scroll-h": `${total * 100}vh` }}
    >
      {/* pinned stage */}
      <div className="relative isolate overflow-hidden bg-white py-16 lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-start lg:pb-4 lg:pt-20">
        <div className="pointer-events-none absolute -left-40 -top-40 -z-10 h-[420px] w-[420px] rounded-full border-[60px] border-[#e6eef9]/70" />
        <div className="pointer-events-none absolute -bottom-52 -right-40 -z-10 h-[500px] w-[500px] rounded-full border-[70px] border-[#e4edf8]/80" />

        <div className="mx-auto w-full max-w-[1680px] px-[5%] lg:[@media(max-height:900px)_and_(min-height:781px)]:[zoom:0.88] lg:[@media(max-height:780px)_and_(min-height:681px)]:[zoom:0.78] lg:[@media(max-height:680px)]:[zoom:0.7]">
          {/* Header */}
          <Reveal direction="up" className="mx-auto max-w-[640px] text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#b3c8e6] bg-[#e1ebfa] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.17em] text-[#1b3f8b]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#d4a537]" />
              Testimonials
            </span>

            <h2 className="mt-3 font-serif text-[34px] font-semibold leading-[1.1] tracking-tight text-[#0f2a5c] sm:text-[40px]">
              What Our <em className="font-medium italic text-[#c8921f]">Clients Say</em>
            </h2>

            <p className="mx-auto mt-2 max-w-[460px] text-[15px] leading-relaxed text-[#5b6b85]">
              Trusted by industries. Appreciated for quality.
            </p>

            <div className="mx-auto mt-3 flex items-center justify-center gap-4">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#d6b86b]" />
              <span className="h-2 w-2 rounded-full bg-[#d4a537]" />
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#d6b86b]" />
            </div>
          </Reveal>

          {/* Featured + list */}
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_1fr] lg:gap-8">
            {/* Featured testimonial */}
            <Reveal direction="left">
              <div className="relative flex min-h-[380px] flex-col overflow-hidden rounded-[32px] border border-[#d6b65f] bg-gradient-to-br from-[#0a2e6e] via-[#0a2e6e] to-[#071f4d] p-8 text-white shadow-[0_26px_60px_-20px_rgba(30,80,180,0.6)] sm:p-10 lg:h-full">
                {/* Top-right corner: image changes with each review */}
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-[260px] w-[260px] overflow-hidden rounded-full border-[5px] border-[#d6b65f]/50 shadow-[0_0_0_18px_rgba(255,255,255,0.05)]"
                  aria-hidden="true"
                >
                  <AnimatePresence>
                    <motion.div
                      key={`top-${idx}`}
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url('${t.imgTop}')` }}
                      initial={{ opacity: 0, scale: 1.12 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-[#0a2e6e]/45" />
                </div>

                {/* Bottom-right corner: bigger image, changes with each review */}
                <div
                  className="pointer-events-none absolute -bottom-28 -right-24 h-[340px] w-[340px] overflow-hidden rounded-full border-[6px] border-[#d6b65f]/50 shadow-[0_0_0_22px_rgba(255,255,255,0.05)]"
                  aria-hidden="true"
                >
                  <AnimatePresence>
                    <motion.div
                      key={`bottom-${idx}`}
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url('${t.imgBottom}')` }}
                      initial={{ opacity: 0, scale: 1.12 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                    />
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-[#0a2e6e]/40" />
                </div>

                {/* Big faded quote mark to fill the middle */}
                <Quote
                  className="pointer-events-none absolute right-10 top-1/2 h-48 w-48 -translate-y-1/2 text-white/[0.05]"
                  strokeWidth={1.2}
                  aria-hidden="true"
                />

                {/* Top row */}
                <div className="relative flex items-center justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[#d6b65f]/60 bg-white/10 backdrop-blur-sm">
                    <Quote className="h-6 w-6 text-[#e6c778]" strokeWidth={1.6} />
                  </span>
                  <div className="flex gap-1">
                    {[0, 1, 2, 3, 4].map((s) => (
                      <Star key={s} className="h-5 w-5 fill-[#e6c778] text-[#e6c778]" />
                    ))}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="relative flex flex-1 flex-col"
                  >
                    {/* text centred in the free space */}
                    <div className="flex flex-1 items-center py-8">
                      <p className="font-serif text-[26px] font-medium leading-[1.45] sm:text-[32px] lg:pr-16">
                        “{t.text}”
                      </p>
                    </div>

                    <div className="flex items-center gap-5 border-t border-white/15 pt-6">
                      <div className="h-[68px] w-[68px] shrink-0 overflow-hidden rounded-full border-2 border-[#d6b65f] shadow-[0_8px_24px_rgba(0,0,0,0.3)]">
                        <Avatar name={t.name} img={t.img} textClass="text-[24px]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[18px] font-bold">{t.name}</p>
                        <p className="mt-1 text-[14px] text-white/75">{t.role}</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* progress dots */}
                <div className="relative mt-5 flex items-center gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIdx(i)}
                      aria-label={`Show review ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        i === idx ? "w-10 bg-[#e6c778]" : "w-4 bg-white/25 hover:bg-white/40"
                      }`}
                    />
                  ))}
                  <span className="ml-3 font-serif text-[15px] tracking-widest text-[#e6c778]">
                    {String(idx + 1).padStart(2, "0")}
                    <span className="text-white/40"> / {String(total).padStart(2, "0")}</span>
                  </span>
                </div>
              </div>
            </Reveal>

            {/* List: active card lifts up as scroll reaches it */}
            <div className="flex flex-col gap-4 lg:justify-center">
              {testimonials.map((item, i) => {
                const isActive = i === idx;
                return (
                  <Reveal key={item.name} direction="right" delay={0.1 * i}>
                    <button
                      onClick={() => setIdx(i)}
                      className={`group flex w-full items-center gap-4 rounded-[24px] border p-4 text-left transition-all duration-500 ease-out will-change-transform ${
                        isActive
                          ? "my-2 -translate-y-1 scale-[1.02] border-[#d6b65f] bg-white shadow-[0_26px_50px_-14px_rgba(30,80,180,0.45)]"
                          : "my-0 translate-y-0 scale-100 border-[#dbe6f5] bg-white shadow-[0_8px_24px_rgba(40,90,180,0.10)] hover:border-[#aac3e6]"
                      }`}
                    >
                      <div
                        className={`h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 transition-colors duration-500 ${
                          isActive ? "border-[#d6b65f]" : "border-[#dbe6f5]"
                        }`}
                      >
                        <Avatar name={item.name} img={item.img} textClass="text-[18px]" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-[16px] font-bold text-[#0f2a5c]">{item.name}</p>
                        <p className="text-[12.5px] text-[#5b6b85]">{item.role}</p>

                        {/* text: always visible on mobile; on desktop only for the active card */}
                        <div
                          className={`grid transition-all duration-500 ease-out ${
                            isActive
                              ? "grid-rows-[1fr] opacity-100"
                              : "grid-rows-[1fr] opacity-100 lg:grid-rows-[0fr] lg:opacity-0"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <p className="mt-2 line-clamp-2 text-[13.5px] leading-snug text-[#5b6b85]">
                              {item.text}
                            </p>
                          </div>
                        </div>
                      </div>

                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-500 ${
                          isActive
                            ? "border-[#0a2e6e] bg-[#0a2e6e] text-white"
                            : "border-[#bcd0ec] bg-white text-[#1b4fb0] group-hover:bg-[#1b4fb0] group-hover:text-white"
                        }`}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </button>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* Stats strip */}
          {/* <Reveal direction="up" delay={0.15} className="mt-6">
            <div className="grid grid-cols-2 gap-y-6 rounded-[30px] border border-[#dbe6f5] bg-white px-6 py-5 shadow-[0_15px_45px_rgba(40,90,180,0.16)] lg:grid-cols-4 lg:gap-0">
              {stats.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.label}
                    className={`flex items-center justify-center gap-4 px-2 ${
                      i !== 0 ? "lg:border-l lg:border-[#d6e2f4]" : ""
                    }`}
                  >
                    <Icon className="h-9 w-9 shrink-0 text-[#0a3d99]" strokeWidth={1.6} />
                    <div>
                      <div className="font-serif text-[30px] font-bold leading-none text-[#0a3d99]">
                        {s.value}
                      </div>
                      <p className="mt-1 text-[13px] text-[#5b6b85]">{s.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal> */}
        </div>
      </div>
    </section>
  );
}