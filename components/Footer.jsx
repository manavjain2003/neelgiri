"use client";

import { motion } from "framer-motion";
import { Instagram, Linkedin, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import Logo from "@/components/ui/Logo";
import Reveal from "@/components/ui/Reveal";
import Molecule from "@/components/ui/Molecule";

const quick = ["Home", "About Us", "Products", "Solutions", "Why Us"];
const resources = ["FAQs", "Testimonials", "Blog", "Contact"];
const socials = [
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Twitter, label: "Twitter" },
  { icon: Youtube, label: "YouTube" },
  { icon: Instagram, label: "Instagram" },
];

function Col({ title, children, delay = 0 }) {
  return (
    <Reveal direction="up" delay={delay}>
      <h4 className="mb-4 text-[14px] font-bold text-brand-900">{title}</h4>
      {children}
    </Reveal>
  );
}

export default function Footer() {
  return (
    <footer className="relative mt-4 overflow-hidden">
      {/* soft wave backdrop */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1440 420"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 40 C300 0 520 70 820 30 S1250 10 1440 40 L1440 420 L0 420 Z" fill="rgba(231,243,255,0.85)" />
        <path d="M0 120 C260 80 560 150 880 110 S1260 90 1440 120 L1440 420 L0 420 Z" fill="rgba(214,234,252,0.55)" />
      </svg>

      {/* molecules */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -left-3 bottom-10 w-[90px]"
      >
        <Molecule shape="c" className="w-full" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 10, 0], rotate: [0, 4, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-2 bottom-2 hidden w-[160px] md:block"
      >
        <Molecule shape="b" className="w-full" />
      </motion.div>

      <div className="relative mx-auto grid max-w-[1440px] gap-10 px-[6%] pb-12 pt-16 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.75fr_0.9fr_1.3fr_1fr]">
        <Reveal direction="up">
          <Logo />
          <p className="mt-3 text-[13px] text-brand-900/80">Chemistry for a Better Tomorrow</p>
        </Reveal>

        <Col title="Quick Links" delay={0.1}>
          <ul className="space-y-2.5 text-[13px] text-brand-900/85">
            {quick.map((l) => (
              <li key={l}>
                <a className="inline-block transition hover:translate-x-1 hover:text-brand-600" href="#home">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </Col>

        <Col title="Resources" delay={0.2}>
          <ul className="space-y-2.5 text-[13px] text-brand-900/85">
            {resources.map((l) => (
              <li key={l}>
                <a className="inline-block transition hover:translate-x-1 hover:text-brand-600" href="#faq">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </Col>

        <Col title="Contact Us" delay={0.3}>
          <ul className="space-y-3.5 text-[13px] text-brand-900/85">
            <li className="flex items-center gap-3">
              <Phone className="h-[18px] w-[18px] text-brand-900" /> +91 98765 43210
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-[18px] w-[18px] text-brand-900" /> info@neelgirichemicals.com
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="h-[18px] w-[18px] text-brand-900" /> Bangalore, India
            </li>
          </ul>
        </Col>

        <Col title="Follow Us" delay={0.4}>
          <div className="flex gap-2.5">
            {socials.map(({ icon: Icon, label }) => (
              <motion.a
                key={label}
                href="#"
                aria-label={label}
                whileHover={{ y: -5, scale: 1.12 }}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-200/80 text-brand-900 transition hover:bg-brand-900 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </motion.a>
            ))}
          </div>
        </Col>
      </div>

      <div className="relative mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-2 px-[6%] pb-6 pt-2 text-[12px] text-brand-900/80 md:flex-row">
        <p>© 2025 Neelgiri Chemicals. All Rights Reserved.</p>
        <p>
          <a href="#" className="hover:text-brand-600">Privacy Policy</a> |{" "}
          <a href="#" className="hover:text-brand-600">Terms &amp; Conditions</a>
        </p>
      </div>
    </footer>
  );
}
