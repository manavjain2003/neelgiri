"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const faqs = [
  {
    q: "What makes Neelgiri Chemicals different?",
    a: "Our focus on purity, innovation and sustainable processes sets us apart from the rest.",
    img: "https://images.unsplash.com/photo-1602052577122-f73b9710adba?auto=format&fit=crop&w=800&q=70",
  },
  {
    q: "Do you offer custom chemical solutions?",
    a: "Yes — we tailor formulations, grades and packaging to your industry requirements.",
    img: "https://images.unsplash.com/photo-1578496479531-32e296d5c6e1?auto=format&fit=crop&w=800&q=70",
  },
  {
    q: "What are your delivery timelines?",
    a: "Typical delivery is 3–7 business days depending on location and order volume.",
    img: "https://images.pexels.com/photos/3057960/pexels-photo-3057960.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    q: "How can I get a quote?",
    a: "Click 'Get a Quote' or contact us and our team will get back to you within 24 hours.",
    img: "https://images.pexels.com/photos/18026608/pexels-photo-18026608.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

export default function Faq() {
  const [idx, setIdx] = useState(0);
  const sectionRef = useRef(null);
  const total = faqs.length;
  const go = (d) => setIdx((i) => (i + d + total) % total);
  const current = faqs[idx];
  const num = String(idx + 1).padStart(2, "0");

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

  return (
    <section ref={sectionRef} id="faq" className="relative lg:h-[400vh]">
      <div className="relative isolate overflow-hidden bg-white py-14 lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center lg:py-4">
        <div className="pointer-events-none absolute -left-44 -top-44 -z-10 h-[440px] w-[440px] rounded-full border-[60px] border-[#e6eef9]/70" />
        <div className="pointer-events-none absolute -bottom-56 -right-44 -z-10 h-[520px] w-[520px] rounded-full border-[70px] border-[#e4edf8]/80" />

        <div className="mx-auto w-full max-w-[1680px] px-[5%]">
          <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.15fr] lg:gap-12">
            <Reveal direction="left">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#b3c8e6] bg-[#e1ebfa] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.17em] text-[#1b3f8b]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#d4a537]" />
                FAQ
              </span>

              <h2 className="mt-4 font-serif text-[32px] font-semibold leading-[1.1] tracking-tight text-[#0f2a5c] sm:text-[38px]">
                Got <em className="font-medium italic text-[#c8921f]">Questions?</em>
              </h2>

              <p className="mt-2 max-w-[400px] text-[15px] leading-relaxed text-[#5b6b85]">
                Find quick answers to your most common queries.
              </p>

              <div className="mt-5 flex flex-col gap-2">
                {faqs.map((f, i) => {
                  const isActive = i === idx;
                  return (
                    <button
                      key={f.q}
                      onClick={() => setIdx(i)}
                      className={`group relative flex items-center gap-4 overflow-hidden rounded-full border py-2 pl-2.5 pr-5 text-left transition-all duration-300 ${
                        isActive
                          ? "translate-x-2 border-[#d6b65f] bg-[#0a2e6e] text-white shadow-[0_15px_35px_rgba(30,80,180,0.3)]"
                          : "border-[#dbe6f5] bg-white text-[#0f2a5c] shadow-[0_8px_24px_rgba(40,90,180,0.10)] hover:border-[#aac3e6] hover:shadow-[0_12px_28px_rgba(40,90,180,0.18)]"
                      }`}
                    >
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-serif text-[13px] font-semibold transition-colors ${
                          isActive ? "bg-white text-[#0a2e6e]" : "bg-[#e3ecf9] text-[#1b4fb0]"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 text-[14px] font-semibold leading-snug sm:text-[15px]">
                        {f.q}
                      </span>
                      <ArrowRight
                        className={`h-4 w-4 shrink-0 transition-all ${
                          isActive
                            ? "text-[#e6c778]"
                            : "text-[#1b4fb0] opacity-0 group-hover:translate-x-1 group-hover:opacity-100"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </Reveal>

            {/* RIGHT: big answer panel */}
            <Reveal direction="right" duration={0.9}>
              <div className="relative overflow-hidden rounded-[36px] border border-[#dbe6f5] bg-white shadow-[0_26px_60px_-20px_rgba(30,80,180,0.45)]">
                {/* answer area */}
                <div className="relative min-h-[300px] px-8 pb-7 pt-8 sm:px-10 sm:pt-9">
                  {/* image circle (replaces the big watermark number) */}
                  <div
                    className="pointer-events-none absolute -right-8 -top-8 h-[130px] w-[130px] overflow-hidden rounded-full border-[5px] border-[#d6b65f]/60 shadow-[0_0_0_14px_rgba(230,238,249,0.7)] sm:-right-10 sm:-top-10 sm:h-[170px] sm:w-[170px] sm:shadow-[0_0_0_18px_rgba(230,238,249,0.7)]"
                    aria-hidden="true"
                  >
                    <AnimatePresence>
                      <motion.div
                        key={`img-${idx}`}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('${current.img}')` }}
                        initial={{ opacity: 0, scale: 1.12 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                      />
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-[#0a2e6e]/25" />
                  </div>

                  <div className="relative flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d6b65f] bg-[#fbf5e4] text-[#c8921f]">
                      <MessageCircle className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#1b3f8b]">
                      Question {num} / {String(total).padStart(2, "0")}
                    </span>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -40 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="relative"
                    >
                      <h3 className="mt-5 max-w-[440px] font-serif text-[24px] font-semibold leading-[1.2] text-[#0f2a5c] sm:text-[28px]">
                        {current.q}
                      </h3>

                      <div className="my-4 flex items-center gap-3">
                        <div className="h-[2px] w-14 rounded-full bg-[#d6b86b]" />
                        <span className="h-2 w-2 rounded-full bg-[#d4a537]" />
                      </div>

                      <p className="max-w-[480px] text-[16px] leading-[1.7] text-[#5b6b85]">
                        {current.a}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  {/* prev / next */}
                  <div className="relative mt-6 flex items-center gap-3">
                    <button
                      aria-label="Previous question"
                      onClick={() => go(-1)}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d3b76e]/70 bg-white text-[#0a2e6e] shadow-[0_10px_24px_-10px_rgba(30,80,180,0.5)] transition hover:scale-105"
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </button>
                    <button
                      aria-label="Next question"
                      onClick={() => go(1)}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d3b76e]/70 bg-white text-[#0a2e6e] shadow-[0_10px_24px_-10px_rgba(30,80,180,0.5)] transition hover:scale-105"
                    >
                      <ArrowRight className="h-5 w-5" />
                    </button>

                    <div className="ml-3 h-[5px] w-[110px] overflow-hidden rounded-full bg-[#0a2e6e]/15">
                      <motion.div
                        className="h-full rounded-full bg-[#d4a537]"
                        animate={{ width: `${((idx + 1) / total) * 100}%` }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  </div>
                </div>

                {/* navy footer band */}
                <div className="relative flex flex-col items-start justify-between gap-4 bg-[#0a2e6e] px-8 py-5 sm:flex-row sm:items-center sm:px-10">
                  <div className="pointer-events-none absolute -right-16 -top-16 h-[160px] w-[160px] rounded-full border-[28px] border-white/[0.05]" />
                  <div className="relative">
                    <p className="font-serif text-[18px] font-semibold text-white">
                      Still have questions?
                    </p>
                    <p className="mt-1 text-[13.5px] text-white/75">
                      Our team will get back to you within 24 hours.
                    </p>
                  </div>
                  <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="group relative inline-flex items-center gap-4 rounded-full border border-[#d3b76e] bg-white py-1.5 pl-5 pr-1.5 text-[13px] font-semibold text-[#0a2e6e]"
                  >
                    Contact Us
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0a2e6e] text-white transition-transform group-hover:translate-x-1">
                      <ArrowRight size={16} />
                    </span>
                  </motion.a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}