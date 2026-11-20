"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import Logo from "@/components/ui/Logo";

const links = [
  { label: "Home", id: "home" },
  { label: "About Us", id: "about" },
  { label: "Products", id: "products", dropdown: true },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
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
        entries.forEach(
          (e) => e.isIntersecting && setActive(e.target.id)
        ),
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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gradient-to-r from-brand-200/90 via-white/85 to-white/80 shadow-[0_10px_30px_-14px_rgba(33,131,199,0.35)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[82px] max-w-[1440px] items-center justify-between px-[5%] lg:px-[7%]">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex xl:gap-9">
          {links.map((l) => (
            <a
              key={l.label}
              href={`#${l.id}`}
              className={`relative flex items-center gap-1 py-1 text-[15px] xl:text-[16px] font-semibold transition-colors ${
                active === l.id
                  ? "text-brand-900"
                  : "text-brand-900/80 hover:text-brand-600"
              }`}
            >
              {l.label}

              {l.dropdown && (
                <ChevronDown className="h-4 w-4" />
              )}

              {active === l.id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-brand-700 to-brand-300"
                />
              )}
            </a>
          ))}
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            className="hidden items-center gap-2 rounded-full bg-brand-900 px-6 py-3 text-[14px] font-semibold text-white shadow-soft sm:inline-flex"
          >
            Get a Quote
            <ArrowRight className="h-4 w-4" />
          </motion.a>

          <button
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
            className="rounded-lg p-2 text-brand-900 lg:hidden"
          >
            {open ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
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
            className="overflow-hidden border-t border-brand-100 bg-gradient-to-b from-brand-200/95 via-white/95 to-white/95 backdrop-blur-xl lg:hidden"
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
                  className="rounded-lg px-3 py-3 text-base font-semibold text-brand-900 hover:bg-brand-50"
                >
                  {l.label}
                </motion.a>
              ))}

              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="btn-primary mt-2 justify-center text-base"
              >
                Get a Quote
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}