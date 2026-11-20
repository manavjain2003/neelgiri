"use client";

import { motion } from "framer-motion";
import { ArrowRight, Award, Leaf, ShieldCheck, UserCheck } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Img, { pexels } from "@/components/ui/Img";

const features = [
  { icon: ShieldCheck, title: "Trusted Quality", text: "Every batch tested to strict industry standards." },
  { icon: Leaf, title: "Sustainable Practices", text: "Eco-conscious processes that protect our future." },
  { icon: UserCheck, title: "Customer-Centric Approach", text: "Solutions built around your specific needs." },
];

const IMG_MAIN = "https://media.istockphoto.com/id/1187820892/photo/i-hope-nothing-goes-wrong.jpg?s=612x612&w=0&k=20&c=wL7GM3c4PfN44vqtGWldrgB5lENgVdMCWPJY0Wahz_8=";
const IMG_LEFT = "about_illustration_1.png";
const IMG_RIGHT = "about_illustration_1.png";

function MirrorShine({ delay = 0 }) {
  return (
    <>
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/40 via-white/5 to-transparent" />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white/15 to-transparent" />
      <span
        className="mirror-sweep pointer-events-none absolute -left-1/3 inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-white/70 to-transparent blur-[2px]"
        style={{ animationDelay: `${delay}s` }}
      />
    </>
  );
}

const float = (distance, duration, delay = 0, rotate) => ({
  animate: {
    y: [0, -distance, 0],
    ...(rotate ? { rotate } : {}),
  },
  transition: { duration, delay, repeat: Infinity, ease: "easeInOut" },
});

export default function About() {
  return (
    <section id="about" className="relative bg-white py-14 lg:py-16">
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <clipPath id="shapeMain" clipPathUnits="objectBoundingBox">
            <path d="M0.11,0.1 C0.12,0.03 0.2,0 0.3,0.012 L0.85,0.1 C0.92,0.11 0.96,0.16 0.94,0.23 L0.88,0.89 C0.87,0.96 0.81,1 0.73,1 L0.13,1 C0.05,1 0.01,0.95 0.02,0.88 Z" />
          </clipPath>
          <clipPath id="shapeLeft" clipPathUnits="objectBoundingBox">
            <path d="M0.12,0.04 C0.14,0.0 0.2,0.0 0.27,0.03 L0.93,0.16 C1,0.18 1,0.24 1,0.3 L1,0.9 C1,1 0.95,1 0.88,1 L0.1,1 C0.03,1 0,0.95 0,0.88 L0,0.18 C0,0.1 0.06,0.07 0.12,0.04 Z" />
          </clipPath>
          <clipPath id="shapeRight" clipPathUnits="objectBoundingBox">
            <path d="M0.0,0.08 C0.0,0.03 0.05,0.0 0.1,0.01 L0.72,0.1 C0.8,0.11 0.86,0.14 0.88,0.2 L1,0.9 C1,0.97 0.97,1 0.9,1 L0.12,1 C0.05,1 0.01,0.96 0.01,0.9 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* two columns now: images | copy + features */}
      <div className="grid items-center gap-10 lg:grid-cols-[54%_1fr] lg:gap-0">
        <Reveal direction="left" duration={1} className="relative pl-[5%] pr-[5%] lg:pl-[2%] lg:pr-0">
          <div className="relative h-[300px] sm:h-[400px] lg:h-[440px]">
            {/* left image */}
            <motion.div
              {...float(9, 5.5, 0.4)}
              style={{ transformPerspective: 1100, rotateY: 28, rotate: -5, z: -90 }}
              className="mirror-card absolute left-[4%] top-[22%] z-0 h-[58%] w-[24%] drop-shadow-[0_14px_24px_rgba(10,40,80,0.16)]"
            >
              <div className="relative h-full w-full overflow-hidden" style={{ clipPath: "url(#shapeLeft)" }}>
                <Img src={IMG_LEFT} alt="Chemical plant" className="h-full w-full object-cover" />
                <MirrorShine delay={1.5} />
              </div>
            </motion.div>

            {/* blue blob */}
            <motion.div
              animate={{ y: [0, 6, 0], x: [0, 4, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-[8%] left-[5%] z-[5] h-[30%] w-[14%] bg-gradient-to-br from-brand-200 via-brand-600 to-brand-900 opacity-90"
              style={{ clipPath: "ellipse(100% 100% at 0% 100%)", borderRadius: "60% 40% 55% 45% / 45% 55% 45% 55%" }}
            />

            {/* main image */}
            <motion.div
              {...float(12, 6.5)}
              style={{ transformPerspective: 1100, z: 60 }}
              className="mirror-card absolute left-[15%] top-0 z-10 h-[92%] w-[58%] drop-shadow-[0_22px_34px_rgba(10,40,80,0.22)]"
            >
              <div className="relative h-full w-full overflow-hidden" style={{ clipPath: "url(#shapeMain)" }}>
                <Img
                  src={IMG_MAIN}
                  alt="Chemical processing plant"
                  className="h-full w-full scale-105 object-cover transition duration-[2000ms] hover:scale-110"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-brand-900/10 via-transparent to-white/10" />
                <MirrorShine delay={0} />
              </div>
            </motion.div>

            {/* right image — tilted, floats while keeping its tilt */}
            <motion.div
              initial={{ rotate: 5 }}
              {...float(10, 5, 0.9, [5, 7.5, 5])}
              style={{ transformPerspective: 1100, rotateY: -28, z: -90 }}
              className="mirror-card absolute right-[7%] top-[20%] z-[5] h-[64%] w-[22%] drop-shadow-[0_14px_24px_rgba(10,40,80,0.16)]"
            >
              <div className="relative h-full w-full overflow-hidden" style={{ clipPath: "url(#shapeRight)" }}>
                <Img src={IMG_RIGHT} alt="Industrial towers" className="h-full w-full object-cover" />
                <MirrorShine delay={3} />
              </div>
            </motion.div>

            {/* 25+ badge */}
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 130, delay: 0.5 }}
              className="absolute bottom-[6%] right-[8%] z-20 lg:right-[10%]"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                className="glass flex items-center gap-3 rounded-[26px] px-5 py-4 shadow-[0_14px_30px_rgba(10,60,110,0.14)] ring-1 ring-brand-900/10"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-900 text-white">
                  <Award className="h-6 w-6" />
                </span>
                <div>
                  <p className="font-serif text-[34px] font-semibold leading-none text-brand-900">25+</p>
                  <p className="mt-1 text-[12px] leading-tight text-brand-900/80">
                    Years of
                    <br />
                    Excellence
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </Reveal>

        <Reveal direction="up" delay={0.15} className="px-[5%] lg:px-0 lg:pl-[3%] lg:pr-[4%]">
          <span className="block h-[3px] w-10 rounded-full bg-brand-600" />
          <h2 className="mt-4 text-[28px] font-bold leading-tight tracking-tight text-brand-900 lg:text-[2.2vw]">
            About Neelgiri Chemicals
          </h2>
          <p className="mt-5 max-w-[460px] text-[14px] font-medium leading-[1.7] text-brand-900/85">
            At <strong className="font-bold">Neelgiri Chemicals</strong>, we are committed to innovation, quality and
            sustainability. With over 25 years of expertise, we manufacture and supply premium-grade chemicals that
            power industries and support a better future.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <Reveal key={f.title} direction="up" delay={0.25 + i * 0.12} className="h-full">
                  <div className="group relative h-full overflow-hidden rounded-2xl bg-white p-4 shadow-[0_10px_30px_rgba(10,60,110,0.10)] ring-1 ring-brand-900/10 transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(10,60,110,0.16)]">
                    <span className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-brand-200 transition-transform duration-500 group-hover:scale-x-100" />

                    <span className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-brand-100 blur-xl transition duration-500 group-hover:scale-150" />

                    <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-brand-700 text-white shadow-[0_8px_18px_rgba(5,150,105,0.35)] transition duration-300 group-hover:rotate-6 group-hover:scale-110">
                      <Icon className="h-5 w-5" strokeWidth={2} />
                    </span>

                    <h3 className="relative mt-3 text-[13px] font-bold leading-snug text-brand-900">{f.title}</h3>
                    <p className="relative mt-1 text-[11.5px] leading-[1.55] text-brand-900/70">{f.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <a href="#about" className="btn-primary mt-8 !rounded-full !bg-brand-900 !px-6 !py-3 !text-[12px]">
            Know More About Us <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}