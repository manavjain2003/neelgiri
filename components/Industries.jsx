"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Construction,
  Cog,
  Disc,
  Droplets,
  FlaskConical,
  Footprints,
  Hexagon,
  Layers,
  Link2,
  Package,
  PaintBucket,
  Route,
  Sprout,
  Waves,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { industries } from "@/lib/company";

const ICONS = {
  Paint: PaintBucket,
  "Ink and Coating": Droplets,
  "Plastic Compound and Masterbatches": Package,
  "Hot Melt Road Marking Paint": Route,
  "Road Construction and Infrastructure": Construction,
  "Road Marking Machines & Equipment": Cog,
  "Adhesive and Sealants": Link2,
  "Gum Adhesive and Sealants": Link2,
  "Hot Melt Adhesive": Link2,
  "Rubber and Conveyor Belts": Layers,
  Footwear: Footprints,
  "Brake Lining": Disc,
  Ceramic: Hexagon,
  "Lubricants, Agriculture & Pesticides": Sprout,
  "Water Treatment Chemicals": Waves,
};

export default function Industries() {
  return (
    <section id="industries" className="relative isolate overflow-hidden bg-white py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute -left-44 top-10 -z-10 h-[420px] w-[420px] rounded-full border-[56px] border-[#e6eef9]/70" />
      <div className="pointer-events-none absolute -bottom-52 -right-40 -z-10 h-[480px] w-[480px] rounded-full border-[64px] border-[#e4edf8]/80" />

      <div className="mx-auto max-w-[1440px] px-[5%] lg:px-[5.5%]">
        <Reveal direction="up" className="mx-auto max-w-[720px] text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#b3c8e6] bg-[#e1ebfa] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.17em] text-[#1b3f8b]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#d4a537]" />
            Industries We Serve
          </span>
          <h2 className="mt-5 font-serif text-[32px] font-semibold leading-[1.1] tracking-tight text-[#0f2a5c] sm:text-[40px] lg:text-[46px]">
            One supplier for <span className="italic text-[#c8921f]">every formulation</span>
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-[#5b6b85]">
            From paints and plastics to adhesives, rubber and road construction, Neelgiri Chemicals supplies the raw
            materials that keep these industries running.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {industries.map((name, i) => {
            const Icon = ICONS[name] ?? FlaskConical;
            return (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: (i % 5) * 0.06 }}
                whileHover={{ y: -5 }}
                className="group flex items-center gap-4 rounded-[22px] border border-[#dbe6f5] bg-white p-4 shadow-[0_8px_24px_rgba(40,90,180,0.10)] transition-shadow hover:border-[#aac3e6] hover:shadow-[0_16px_34px_rgba(40,90,180,0.18)]"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e3ecf9] text-[#1b4fb0] transition-colors group-hover:bg-[#0a2e6e] group-hover:text-white">
                  <Icon className="h-6 w-6" strokeWidth={1.6} />
                </span>
                <span className="text-[14.5px] font-semibold leading-snug text-[#12295a]">{name}</span>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-3 rounded-full border border-[#d3b76e] bg-[#0a2e6e] py-2 pl-7 pr-2 text-[15px] font-semibold text-white shadow-[0_12px_30px_rgba(30,80,180,0.28)] transition-colors hover:bg-[#123f91]"
          >
            Browse the Product Range
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0a2e6e]">
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
