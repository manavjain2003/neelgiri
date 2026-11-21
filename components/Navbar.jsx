"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import Logo from "@/components/ui/Logo";
import QuoteModal from "@/components/ui/QuoteModal"; // adjust path if needed

const links = [
  { label: "Home", id: "home", link: "/" },
  { label: "About Us", id: "about", link: "/about" },
  { label: "Products", id: "products", link: "/products", dropdown: true },
  { label: "Contact", id: "contact", link: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );

    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-gradient-to-r from-[#0a1628]/95 via-[#132337]/90 to-[#1a2f4a]/85 shadow-[0_8px_32px_-12px_rgba(10,22,40,0.6)] backdrop-blur-xl border-b border-white/10"
          : "bg-gradient-to-r from-[#0a1628]/80 via-[#132337]/70 to-[#1a2f4a]/60 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-[82px] max-w-[1440px] items-center justify-between px-[5%] lg:px-[7%]">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex xl:gap-9">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.link}
              className={`relative flex items-center gap-1 py-1 text-[15px] xl:text-[16px] font-semibold transition-colors ${
                active === l.id
                  ? "text-white"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {l.label}

              {l.dropdown && <ChevronDown className="h-4 w-4" />}

              {active === l.id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-white to-white/60"
                />
              )}
            </a>
          ))}
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <motion.button
            type="button"
            onClick={() => setQuoteOpen(true)}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            className="hidden items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-[14px] font-semibold text-white shadow-lg backdrop-blur-sm hover:bg-white/25 sm:inline-flex bg-brand-500"
          >
            Get a Quote
            <ArrowRight className="h-4 w-4" />
          </motion.button>

          <button
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
            className="rounded-lg p-2 text-white lg:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/10 bg-gradient-to-b from-[#0a1628]/95 via-[#132337]/95 to-[#1a2f4a]/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {links.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="rounded-lg px-3 py-3 text-base font-semibold text-white/90 hover:bg-white/10"
                >
                  {l.label}
                </motion.a>
              ))}

              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setQuoteOpen(true);
                }}
                className="mt-2 flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-base font-semibold text-white backdrop-blur-sm bg-brand-500"
              >
                Get a Quote
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quote Modal (portaled to document.body, so header blur/sticky won't clip it) */}
      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} />
    </motion.header>
  );
}