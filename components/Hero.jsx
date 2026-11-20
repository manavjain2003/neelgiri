"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Img from "@/components/ui/Img";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[560px] overflow-hidden pt-[84px] lg:h-[700px]"
    >
      {/* Background image */}
      <Img
        src="/images/hero_1.png"
        alt="Chemical plant at sunrise"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
      />

      {/* Soft overlay so the text stays readable */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to right, rgba(234,245,255,.9) 0%, rgba(234,245,255,.6) 40%, rgba(234,245,255,0) 75%)",
        }}
      />

      {/* Copy */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-[6%] pb-24 pt-8 lg:px-[5.5%] lg:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-[560px] lg:w-[44%] lg:max-w-none"
        >
          <h1 className="font-serif text-[34px] font-semibold leading-[1.1] text-brand-900 sm:text-[54px] lg:text-[clamp(40px,3.7vw,52px)]">
            Neelgiri Chemicals
            <br />
            <span className="text-brand-700">Powering a Cleaner Tomorrow</span>
          </h1>

          <p className="mt-6 max-w-[470px] text-[18px] leading-[1.6] text-brand-900/90">
            Premium quality chemicals, crafted for a sustainable and innovative future.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <a href="#products" className="btn-primary !rounded-full !px-8 !py-4 !text-[17px]">
              Explore Our Products <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="btn-primary bg-brand-500 !rounded-full !px-8 !py-4 !text-[17px]"
            >
              Get a Quote <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}