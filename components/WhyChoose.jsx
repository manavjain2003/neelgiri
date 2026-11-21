"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Globe,
  Handshake,
  Leaf,
  Lightbulb,
  ShieldCheck,
  Award,
  Users,
  FlaskConical,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Molecule from "@/components/ui/Molecule";
import Link from "next/link";
import { yearsInBusiness, industries } from "@/lib/company";
import { productCount, categories } from "@/lib/products";

const features = [
  {
    icon: ShieldCheck,
    title: "ISO-Certified Quality",
    description: "Consistent quality and assured performance.",
  },
  {
    icon: FlaskConical,
    title: "Wide Product Range",
    description: "280+ raw materials from one trusted supplier.",
  },
  {
    icon: Lightbulb,
    title: "Custom Solutions",
    description: "Grades and packaging matched to your application.",
  },
  {
    icon: Handshake,
    title: "Reliable Partnership",
    description: "Long-term supply relationships, not one-off orders.",
  },
  {
    icon: Globe,
    title: "Industry-Wide Reach",
    description: `Serving ${industries.length} industries, from paints to road construction.`,
  },
];

const stats = [
  { icon: Award, value: `${yearsInBusiness()}+`, label: "Years of Experience" },
  { icon: FlaskConical, value: "280+", label: "Raw Materials" },
  { icon: Users, value: `${industries.length}`, label: "Industries Served" },
  { icon: Globe, value: `${categories.length}`, label: "Core Product Categories" },
  { icon: ShieldCheck, value: "ISO", label: "Certified" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: 35 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.65,
      ease: "easeOut" ,
    },
  },
};

export default function WhyChoose() {
  const [active, setActive] = useState(2);

  return (
    <section
      id="why"
      className="relative isolate overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        
      />
      <div className="pointer-events-none absolute -left-48 -top-52 -z-10 h-[480px] w-[480px] rounded-full border-[65px] border-[#e6eef9]/70" />

      <div className="pointer-events-none absolute -bottom-64 -right-40 -z-10 h-[550px] w-[550px] rounded-full border-[75px] border-[#e4edf8]/80" />

      <div className="pointer-events-none absolute bottom-0 left-0 -z-10 h-[100px] w-full bg-gradient-to-t from-[#eef4fb]/50 to-transparent" />

      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 4, 0] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -right-5 top-5 hidden w-[145px] opacity-60 lg:block"
      >
        <Molecule shape="b" className="w-full" />
      </motion.div>

      <motion.div
        animate={{ y: [0, 12, 0], rotate: [0, -5, 0] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -bottom-5 left-0 hidden w-[130px] opacity-50 lg:block"
      >
        <Molecule shape="d" className="w-full" />
      </motion.div>

      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-[4%]">

        {/* Main layout */}
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.9fr_1.12fr] lg:gap-7 xl:gap-10">

          {/* LEFT: Heading and CTA */}
          <Reveal direction="left" className="relative z-10">
            <div className="max-w-[510px]">

              <span className="inline-flex items-center gap-2 rounded-full border border-[#b3c8e6] bg-[#e1ebfa] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.17em] text-[#1b3f8b]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#d4a537]" />
                Why Choose Neelgiri Chemicals?
              </span>

              <h2 className="mt-7 font-serif text-[39px] font-medium leading-[1.08] tracking-[-0.045em] text-[#0f2a5c] sm:text-5xl xl:text-[4.05vw]">
                Your Trusted
                <br />
                Partner in
                <br />
                <span className="italic text-[#c8921f]">
                  Chemical Excellence
                </span>
              </h2>

              <p className="mt-7 max-w-[440px] text-[15px] leading-[1.8] text-[#5b6b85] sm:text-[17px]">
                Quality-checked titanium dioxide, resins, stearates and road-marking materials,
                backed by a team that has been supplying industry since 2004.
              </p>

              <div className="mt-8 flex items-center gap-5">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/products"
                  className="group inline-flex items-center gap-5 rounded-full border border-[#d3b76e] bg-[#0a2e6e] py-2 pl-6 pr-2 text-[14px] font-semibold text-white shadow-[0_12px_30px_rgba(30,80,180,0.28)] transition-colors hover:bg-[#123f91]"
                >
                  Explore Our Products

                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#0a2e6e] transition-transform group-hover:translate-x-1">
                    <ArrowRight size={19} />
                  </span>
                </Link>
                </motion.div>
              </div>

              {/* Decorative line */}
              <div className="mt-12 hidden items-center gap-4 lg:flex">
                <div className="h-px w-28 bg-gradient-to-r from-[#c3d0e6] to-[#9db8e0]" />
                <span className="h-2 w-2 rounded-full bg-[#d4a537]" />
                <div className="h-px w-16 bg-[#c3d0e6]" />
              </div>
            </div>
          </Reveal>

          {/* CENTER: Laboratory visual */}
          <Reveal direction="up" delay={0.15}>
            <div className="relative mx-auto h-[390px] w-full max-w-[430px] sm:h-[490px] lg:h-[550px]">

              {/* Outer decorative rings */}
              <div className="absolute inset-x-[-8%] bottom-[3%] top-[4%] rounded-[48%_48%_22%_22%] border border-[#aac3e6]/70" />

              <div className="absolute inset-x-[-3%] bottom-[7%] top-[8%] rounded-[48%_48%_20%_20%] border border-[#d4b76d]/60" />

              {/* Background arch */}
              <div className="absolute inset-x-[3%] bottom-[5%] top-[3%] overflow-hidden rounded-t-[48%] rounded-b-[32px] bg-gradient-to-br from-[#a9c6ee] via-[#dbe8f8] to-[#3f6fb5] shadow-[0_24px_50px_-20px_rgba(20,60,150,0.4)]">

                <div className="absolute inset-0 bg-gradient-to-b from-[#1e4a8f]/10 via-transparent to-[#0c2a63]/35" />

                {/* Use your laboratory image here */}
                <img
                  src="/all_products_.png"
                  alt="Chemical laboratory glassware and research"
                  className="h-full w-full object-cover object-center"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0c2d66]/35 via-transparent to-[#d6e6fa]/10" />

                {/* Image label */}
                <div className="absolute bottom-[0.25px] rounded-2xl border border-white/30 bg-white/15 p-4 text-white backdrop-blur-md w-[100%] h-[90px] pl-10">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em]">
                    <span className="h-2 w-2 rounded-full bg-[#d6c17b]" />
                    Science · Quality · Innovation
                  </div>
                  <p className="mt-2 font-serif text-xl">
                    Excellence in every formulation.
                  </p>
                </div>
              </div>

              {/* Decorative floating molecular dot */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -right-4 top-[25%] h-12 w-12 rounded-full border border-[#d4bd7e] bg-white/90 shadow-lg backdrop-blur-md"
              >
                <div className="absolute inset-3 rounded-full bg-gradient-to-br from-[#b7d0f2] to-[#3a74c4]" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -left-4 top-[43%] h-8 w-8 rounded-full border border-[#bcd0ec] bg-[#bfd3f0]/80 shadow-md"
              />
            </div>
          </Reveal>

          {/* RIGHT: Horizontal feature cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="flex flex-col gap-2.5"
          >
            {features.map((item, i) => {
              const Icon = item.icon;
              const isActive = active === i;

              return (
                <motion.div
                  key={item.title}
                  variants={cardVariants}
                  onHoverStart={() => setActive(i)}
                  onClick={() => setActive(i)}
                  animate={{
                    x: isActive ? -5 : 0,
                    scale: isActive ? 1.015 : 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 220,
                    damping: 22,
                  }}
                  className={`group relative flex min-h-[100px] cursor-pointer items-center gap-4 overflow-hidden rounded-[23px] border p-4 sm:gap-5 sm:px-5 sm:py-4 ${
                    isActive
                      ? "border-[#d6b65f] bg-gradient-to-r from-[#0a2a63] via-[#0f3d92] to-[#1a56c2] text-white shadow-[0_15px_35px_rgba(30,80,180,0.3)]"
                      : "border-[#dbe6f5] bg-white text-[#12295a] shadow-[0_8px_24px_rgba(40,90,180,0.14)] hover:border-[#aac3e6] hover:shadow-[0_12px_28px_rgba(40,90,180,0.22)]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-feature"
                      className="absolute inset-0 -z-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent"
                      transition={{
                        duration: 0.35,
                      }}
                    />
                  )}

                  <div
                    className={`relative z-10 flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-full transition-colors ${
                      isActive
                        ? "border border-white/20 bg-white/10 text-white"
                        : "bg-[#e3ecf9] text-[#1b4fb0]"
                    }`}
                  >
                    <Icon size={34} strokeWidth={1.6} />
                  </div>

                  <div className="relative z-10 min-w-0 flex-1">
                    <h3 className="text-[15px] font-bold leading-tight sm:text-[17px]">
                      {item.title}
                    </h3>

                    <div
                      className={`mt-2 h-px w-10 ${
                        isActive ? "bg-[#d7bd73]" : "bg-[#d0b875]"
                      }`}
                    />

                    <p
                      className={`mt-2 max-w-[240px] text-[12px] leading-[1.45] sm:text-[13px] ${
                        isActive ? "text-white/85" : "text-[#5b6b85]"
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>

                  <div
                    className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                      isActive
                        ? "border-white/70 bg-white text-[#0a2e6e]"
                        : "border-[#bcd0ec] bg-white text-[#1b4fb0] group-hover:border-[#1b4fb0] group-hover:bg-[#1b4fb0] group-hover:text-white"
                    }`}
                  >
                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* BOTTOM: Statistics bar */}
        <Reveal direction="up" delay={0.2} className="mt-14 lg:mt-16">
          <div className="relative overflow-hidden rounded-[30px] border border-[#dbe6f5] bg-white px-4 py-7 shadow-[0_15px_45px_rgba(40,90,180,0.16)] sm:px-7 lg:py-8">

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#f1f6fd]/70 via-white to-[#eef4fc]/70" />

            <div className="relative grid grid-cols-2 gap-y-8 sm:grid-cols-3 lg:grid-cols-5 lg:gap-0">
              {stats.map((stat, i) => {
                const Icon = stat.icon;

                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.1,
                    }}
                    className={`flex items-center justify-center gap-3 px-2 sm:gap-4 lg:px-4 ${
                      i !== 0
                        ? "lg:border-l lg:border-[#d6e2f4]"
                        : ""
                    }`}
                  >
                    <Icon
                      className="h-9 w-9 shrink-0 text-[#0a3d99] sm:h-11 sm:w-11"
                      strokeWidth={1.6}
                    />

                    <div>
                      <div className="font-serif text-[29px] font-bold leading-none tracking-tight text-[#0a3d99] sm:text-[35px]">
                        {stat.value}
                      </div>
                      <p className="mt-1 max-w-[115px] text-[11px] leading-snug text-[#5b6b85] sm:text-[13px]">
                        {stat.label}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}