"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Img, { pexels } from "@/components/ui/Img";
import Flask from "@/components/ui/Flask";
import Molecule from "./ui/Molecule";
import QuoteModal from "@/components/ui/QuoteModal"; // adjust path if needed

const gridPattern = {
  backgroundImage:
    "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
  backgroundSize: "44px 44px",
};

export default function CTA() {
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <section id="contact">
      <Reveal direction="scale" duration={0.9}>
        <div className="relative mx-auto flex flex-col items-start gap-8 overflow-hidden border border-white/10 bg-[#061a40] px-8 py-12 shadow-glass md:min-h-[160px] md:flex-row md:items-center md:justify-between lg:px-14">
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a2e6e] via-[#0d3a86] to-[#155aad]" />
          <div className="absolute -left-24 -top-32 h-[340px] w-[340px]  bg-[#4aa3ff]/20 blur-[110px]" />
          <div className="absolute -bottom-36 right-[22%] h-[300px] w-[300px] bg-[#d4a537]/15 blur-[120px]" />
          <div className="absolute inset-0 opacity-60" style={gridPattern} aria-hidden="true" />

          <div className="absolute inset-x-10 top-0 h-[3px] bg-gradient-to-r from-transparent via-[#d4a537] to-transparent" />

          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 1380 160"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M0 105 C220 55 420 145 700 95 S1150 45 1380 95 L1380 160 L0 160 Z" fill="rgba(255,255,255,0.10)" />
            <path d="M0 130 C260 90 520 150 820 122 S1200 90 1380 126 L1380 160 L0 160 Z" fill="rgba(255,255,255,0.12)" />
          </svg>

          {/* moving light */}
          <motion.div
            animate={{ x: ["-30%", "140%"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 w-40 -skew-x-12 bg-white/10 blur-xl"
          />

          {/* factory image fading into the band */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 hidden w-full lg:block"
            style={{
              WebkitMaskImage: "linear-gradient(to right, transparent, black 45%)",
              maskImage: "linear-gradient(to right, transparent, black 45%)",
            }}
          >
            <Img src={pexels(16102539, 900)} alt="Factory at dusk" className="h-full w-full opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a2e6e]/60 to-[#155aad]/20" />
          </div>

          {/* left: orb + copy */}
          <div className="relative flex items-center gap-6">
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
              className="relative flex h-[92px] w-[92px] shrink-0 items-center justify-center"
            >
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-2"
              />
              <Molecule />
            </motion.div>
            <div className="text-white">
              <p className="mb-1.5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#e6c778]">
                <span className="h-px w-6 bg-[#d4a537]" />
                Let&apos;s work together
              </p>
              <h3 className="font-serif text-[22px] font-semibold leading-tight md:text-[26px] lg:text-[30px]">
                Ready to Partner with Neelgiri Chemicals?
              </h3>
              <p className="mt-1 text-[14px] text-white/85">
                Let&apos;s build a cleaner, greener and more innovative future together.
              </p>
            </div>
          </div>

          {/* button */}
          <button
            type="button"
            onClick={() => setQuoteOpen(true)}
            className="btn-primary relative z-10 cursor-pointer bg-brand-500 !rounded-full !px-8 !py-4 !text-[17px]"
          >
            Get a Quote <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </Reveal>

      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </section>
  );
}