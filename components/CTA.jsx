"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Img, { pexels } from "@/components/ui/Img";
import Flask from "@/components/ui/Flask";

export default function CTA() {
  return (
    <section id="contact" className="relative px-[3.5%] py-8">
      <Reveal direction="scale" duration={0.9}>
        <div className="relative mx-auto flex max-w-[1380px] flex-col items-start gap-6 overflow-hidden rounded-[44px] bg-gradient-to-r from-brand-900 via-brand-800 to-brand-600 px-8 py-8 shadow-glass md:min-h-[120px] md:flex-row md:items-center md:justify-between lg:rounded-[60px] lg:px-14">
          {/* hills / waves */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 1380 120"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M0 80 C220 30 420 120 700 70 S1150 20 1380 70 L1380 120 L0 120 Z" fill="rgba(255,255,255,0.07)" />
            <path d="M0 100 C260 60 520 120 820 92 S1200 60 1380 96 L1380 120 L0 120 Z" fill="rgba(255,255,255,0.08)" />
          </svg>

          {/* moving light */}
          <motion.div
            animate={{ x: ["-30%", "140%"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="pointer-events-none absolute inset-y-0 w-40 -skew-x-12 bg-white/10 blur-xl"
          />

          {/* factory image fading into the band */}
          <div
            className="pointer-events-none absolute inset-y-0 right-0 hidden w-[34%] lg:block"
            style={{
              WebkitMaskImage: "linear-gradient(to right, transparent, black 45%)",
              maskImage: "linear-gradient(to right, transparent, black 45%)",
            }}
          >
            <Img src={pexels(16102539, 900)} alt="Factory at dusk" className="h-full w-full opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-800/50 to-brand-600/20" />
          </div>

          {/* left: orb + copy */}
          <div className="relative flex items-center gap-5">
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="flex h-[88px] w-[88px] shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/10 shadow-[0_0_44px_rgba(143,208,247,0.7)] backdrop-blur"
            >
              <Flask className="h-[62px] w-[44px]" />
            </motion.div>
            <div className="text-white">
              <h3 className="font-serif text-[22px] font-semibold leading-tight md:text-[1.7vw] md:leading-tight">
                Ready to Partner with Neelgiri Chemicals?
              </h3>
              <p className="mt-1 text-[14px] text-white/85">
                Let&apos;s build a cleaner, greener and more innovative future together.
              </p>
            </div>
          </div>

          {/* button */}
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.96 }}
            animate={{ boxShadow: ["0 0 0 0 rgba(190,230,255,0.6)", "0 0 0 16px rgba(190,230,255,0)"] }}
            transition={{ boxShadow: { duration: 1.8, repeat: Infinity } }}
            className="relative inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#eaf7ff] to-[#86cdf7] px-8 py-3.5 text-[14px] font-semibold text-brand-900 shadow-soft lg:mr-[26%]"
          >
            Contact Us <ArrowRight className="h-4 w-4" />
          </motion.a>
        </div>
      </Reveal>
    </section>
  );
}
