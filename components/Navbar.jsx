"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { categories } from "@/lib/products";

const links = [
  { label: "Home", id: "home", link: "/" },
  { label: "About Us", id: "about", link: "/about" },
  { label: "Products", id: "products", link: "/products", dropdown: true },
  { label: "Contact", id: "contact", link: "/contact" },
];

const isActive = (pathname, href) =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

export default function Navbar() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        scrolled || open
          ? "bg-gradient-to-r from-brand-200/90 via-white/85 to-white/80 shadow-[0_10px_30px_-14px_rgba(33,131,199,0.35)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[82px] max-w-[1440px] items-center justify-between px-[5%] lg:px-[7%]">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex xl:gap-9" aria-label="Main">
          {links.map((l) => {
            const active = isActive(pathname, l.href);
            const linkCls = `relative flex items-center gap-1 py-1 text-[15px] font-semibold transition-colors xl:text-[16px] ${
              active ? "text-brand-900" : "text-brand-900/80 hover:text-brand-600"
            }`;

            const underline = active && (
              <motion.span
                layoutId="nav-underline"
                className="absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-brand-700 to-brand-300"
              />
            );

            if (!l.dropdown) {
              return (
                <Link key={l.label} href={l.href} className={linkCls}>
                  {l.label}
                  {underline}
                </Link>
              );
            }

            return (
              <div key={l.label} className="group relative">
                <Link href={l.href} className={linkCls}>
                  {l.label}
                  <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
                  {underline}
                </Link>

                {/* hover / keyboard-focus dropdown */}
                <div className="invisible absolute left-1/2 top-full z-10 w-[270px] -translate-x-1/2 translate-y-1 pt-3 opacity-0 transition duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <ul className="overflow-hidden rounded-2xl border border-brand-100 bg-white/95 p-2 shadow-glass backdrop-blur-xl">
                    <li>
                      <Link
                        href="/products"
                        className="block rounded-xl px-3.5 py-2.5 text-[14px] font-bold text-brand-900 hover:bg-brand-50"
                      >
                        All Products
                      </Link>
                    </li>
                    {categories.map((c) => (
                      <li key={c.id}>
                        <Link
                          href={`/products?category=${c.id}`}
                          className="block rounded-xl px-3.5 py-2.5 text-[14px] font-medium text-brand-900/85 transition-colors hover:bg-brand-50 hover:text-brand-700"
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </nav>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            className="hidden items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-[14px] font-semibold text-white shadow-lg backdrop-blur-sm hover:bg-white/25 sm:inline-flex bg-brand-500" 
          >
            Get a Quote
            <ArrowRight className="h-4 w-4" />
          </motion.a>

          <button
            aria-label="Toggle menu"
            aria-expanded={open}
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
            <div className="flex max-h-[calc(100vh-82px)] flex-col gap-1 overflow-y-auto px-5 py-4">
              {links.map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="rounded-lg px-3 py-3 text-base font-semibold text-white/90 hover:bg-white/10"
                >
                  <Link
                    href={l.href}
                    className={`block rounded-lg px-3 py-3 text-base font-semibold hover:bg-brand-50 ${
                      isActive(pathname, l.href) ? "bg-brand-50 text-brand-700" : "text-brand-900"
                    }`}
                  >
                    {l.label}
                  </Link>

                  {l.dropdown && (
                    <div className="ml-3 mt-1 grid grid-cols-1 gap-0.5 border-l-2 border-brand-200 pl-3">
                      {categories.map((c) => (
                        <Link
                          key={c.id}
                          href={`/products?category=${c.id}`}
                          className="rounded-md px-2 py-1.5 text-[14px] font-medium text-brand-900/75 hover:bg-brand-50 hover:text-brand-700"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}

              <Link href="/contact" className="btn-primary mt-2 justify-center text-base">
                Get a Quote
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
