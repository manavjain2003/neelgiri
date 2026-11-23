"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Check,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  FileText,
  Headphones,
  MessageCircle,
  Package,
  Phone,
  Send,
  ShieldCheck,
  Truck,
} from "lucide-react";
import ProductMedia from "./ProductMedia";
import ProductCard from "./ProductCard";
import { formatPrice } from "@/lib/products";
import { company, whatsappLink } from "@/lib/company";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "applications", label: "Applications" },
  { id: "specifications", label: "Specifications" },
  { id: "how-to-order", label: "How to order" },
  { id: "faqs", label: "FAQs" },
];

const trust = [
  { icon: ShieldCheck, text: "ISO-certified supplier" },
  { icon: BadgeCheck, text: "Quality-assured materials" },
  { icon: Headphones, text: "Responsive support" },
];

const steps = [
  { icon: Send, title: "Send your enquiry", text: "Tell us the product, quantity and delivery location." },
  { icon: ClipboardList, title: "Get a quote", text: "Our team replies with current pricing and availability." },
  { icon: FileText, title: "Confirm the details", text: "Review grade, packaging and any technical information." },
  { icon: Truck, title: "Receive your order", text: "We dispatch and keep you updated until delivery." },
];

const stats = [
  { value: "2004", label: "Operating since" },
  { value: "280+", label: "Raw materials" },
  { value: "15", label: "Industries served" },
  { value: "ISO", label: "Certified supply" },
];

const sectionTitle =
  "text-[24px] font-extrabold tracking-[-0.02em] text-[#102044] sm:text-[28px]";

export default function ProductDetail({ product, related = [] }) {
  const [open, setOpen] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const hasPrice = typeof product.price === "number";
  const quoteHref = `/contact?product=${product.slug}`;

  const images = product.images?.length ? product.images : [product.image];

  return (
    <div className="bg-[#f8faff] text-[#101d3d]">
      <div className="mx-auto max-w-[1440px] px-5 pb-16 pt-[calc(2rem+82px)] sm:px-8 lg:px-10">
        {/* breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-1.5 text-[13px] font-semibold text-[#687792]"
        >
          <Link href="/" className="hover:text-[#0866f5]">
            Home
          </Link>
          <ChevronRight size={14} />
          <Link href="/products" className="hover:text-[#0866f5]">
            Products
          </Link>
          <ChevronRight size={14} />
          <Link
            href={`/products?category=${product.category}`}
            className="hover:text-[#0866f5]"
          >
            {product.categoryLabel}
          </Link>
          <ChevronRight size={14} />
          <span className="text-[#102044]">{product.name}</span>
        </nav>

        {/* hero */}
        <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="lg:sticky lg:top-[110px] lg:self-start">
            <div className="aspect-square overflow-hidden rounded-[22px] border border-[#dce6f2] bg-white shadow-[0_18px_40px_rgba(20,75,150,0.08)]">
              <ProductMedia
                product={product}
                image={images[activeImage]}
                padding="p-8"
              />
            </div>

            {images.length > 1 && (
              <div className="mt-3 grid grid-cols-4 gap-2.5 sm:grid-cols-5">
                {images.map((img, i) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    aria-label={`View image ${i + 1}`}
                    className={`aspect-square overflow-hidden rounded-xl border bg-white p-2 transition-all ${
                      activeImage === i
                        ? "border-[#0866f5] ring-2 ring-[#0866f5]/25"
                        : "border-[#dce6f2] hover:border-[#0866f5]/50"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="h-full w-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <span className="inline-block rounded-full border border-[#cfe0fa] bg-white px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#0866f5]">
              {product.categoryLabel}
            </span>
            <h1 className="mt-3 text-[32px] font-extrabold leading-[1.15] tracking-[-0.03em] text-[#102044] sm:text-[40px]">
              {product.name}
            </h1>
            <p className="mt-3 text-[15.5px] leading-[1.8] text-[#52627e]">
              {product.overview}
            </p>

            <p className="mt-5 text-[30px] font-extrabold text-[#0c2452]">
              {hasPrice ? (
                <>
                  {formatPrice(product.price)}
                  <span className="text-[16px] font-semibold text-[#8794aa]">
                    {" "}
                    / {product.priceUnit}
                  </span>
                </>
              ) : (
                <span className="text-[20px] font-bold text-[#687792]">
                  Price on request
                </span>
              )}
            </p>
            {hasPrice && (
              <p className="mt-1 text-[13px] text-[#8794aa]">
                Indicative price – final quote depends on quantity and packaging.
              </p>
            )}

            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {product.uses.map((u) => (
                <li
                  key={u}
                  className="flex items-center gap-2 text-[14.5px] font-semibold text-[#18315b]"
                >
                  <span className="grid h-5.5 w-5.5 place-items-center rounded-full bg-[#eaf2ff] text-[#0866f5]">
                    <Check size={13} />
                  </span>
                  {u}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={quoteHref}
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#0a2e6e] px-6 text-[14.5px] font-bold text-white shadow-soft transition-colors hover:bg-[#123f91]"
              >
                Get a Quote <ArrowRight size={16} />
              </Link>
              <a
                href={whatsappLink(
                  `Hello, I would like a quote for ${product.name}.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-[#b9cbe4] bg-white px-5 text-[14.5px] font-bold text-[#18315b] transition-all hover:border-[#0866f5] hover:bg-[#f2f7ff]"
              >
                <MessageCircle size={16} /> WhatsApp
              </a>
              <a
                href={`tel:${company.phoneHref}`}
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-[#b9cbe4] bg-white px-5 text-[14.5px] font-bold text-[#18315b] transition-all hover:border-[#0866f5] hover:bg-[#f2f7ff]"
              >
                <Phone size={16} /> {company.phone}
              </a>
            </div>

            {/* trust strip */}
            <div className="mt-7 grid gap-3 rounded-[16px] border border-[#dce6f2] bg-white p-4 sm:grid-cols-3">
              {trust.map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2.5 text-[13.5px] font-bold text-[#18315b]"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#eaf2ff] text-[#0866f5]">
                    <Icon size={19} />
                  </span>
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* in-page navigation */}
        <div className="sticky top-[82px] z-30 -mx-5 mt-12 overflow-x-auto border-y border-[#dce6f2] bg-[#f8faff]/90 px-5 backdrop-blur sm:-mx-8 sm:px-8 lg:-mx-10 lg:px-10">
          <div className="flex gap-1 whitespace-nowrap py-2.5">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="rounded-full px-4 py-2 text-[14px] font-bold text-[#52627e] transition-colors hover:bg-white hover:text-[#0866f5]"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* overview + key features */}
        <section id="overview" className="mt-12 scroll-mt-[150px]">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h2 className={sectionTitle}>Product overview</h2>
              <p className="mt-4 text-[15.5px] leading-[1.9] text-[#52627e]">
                {product.overview}
              </p>
              <p className="mt-4 text-[15.5px] leading-[1.9] text-[#52627e]">
                {product.about}
              </p>
            </div>

            <div className="rounded-[20px] border border-[#dce6f2] bg-white p-6 shadow-[0_18px_40px_rgba(20,75,150,0.06)]">
              <h3 className="text-[18px] font-extrabold text-[#102044]">
                Key features
              </h3>
              <ul className="mt-4 grid gap-3.5">
                {product.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 text-[15px] font-semibold leading-snug text-[#18315b]"
                  >
                    <span className="mt-0.5 grid h-5.5 w-5.5 shrink-0 place-items-center rounded-full bg-[#0866f5] text-white">
                      <Check size={13} strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* applications */}
        <section id="applications" className="mt-14 scroll-mt-[150px]">
          <h2 className={sectionTitle}>Applications &amp; industries</h2>
          <p className="mt-2 max-w-2xl text-[15.5px] leading-[1.8] text-[#52627e]">
            Where {product.name} is commonly used.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {product.uses.map((u, i) => (
              <div
                key={u}
                className="group relative overflow-hidden rounded-[18px] border border-[#dce6f2] bg-white p-5 transition-all hover:-translate-y-1 hover:border-[#0866f5]/40 hover:shadow-[0_18px_36px_rgba(20,75,150,0.12)]"
              >
                <span className="text-[36px] font-black leading-none text-[#0866f5]/15 transition-colors group-hover:text-[#0866f5]/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 text-[16px] font-extrabold leading-snug text-[#102044]">
                  {u}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* specifications + supply */}
        <section id="specifications" className="mt-14 scroll-mt-[150px]">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className={sectionTitle}>Specifications</h2>
              <dl className="mt-4 overflow-hidden rounded-[16px] border border-[#dce6f2] bg-white">
                {product.specifications.map((row, i) => (
                  <div
                    key={row.parameter}
                    className={`grid grid-cols-[40%_1fr] gap-3 px-5 py-4 text-[14.5px] ${
                      i % 2 ? "bg-[#f8faff]" : ""
                    }`}
                  >
                    <dt className="font-bold text-[#52627e]">{row.parameter}</dt>
                    <dd className="font-semibold text-[#101d3d]">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <h2 className={`${sectionTitle} flex items-center gap-2`}>
                <Package className="text-[#0866f5]" size={24} /> Supply &amp;
                packaging
              </h2>
              <dl className="mt-4 overflow-hidden rounded-[16px] border border-[#dce6f2] bg-white">
                {product.supply.map((row, i) => (
                  <div
                    key={row.parameter}
                    className={`grid grid-cols-[40%_1fr] gap-3 px-5 py-4 text-[14.5px] ${
                      i % 2 ? "bg-[#f8faff]" : ""
                    }`}
                  >
                    <dt className="font-bold text-[#52627e]">{row.parameter}</dt>
                    <dd className="font-semibold text-[#101d3d]">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* how to order */}
        <section id="how-to-order" className="mt-14 scroll-mt-[150px]">
          <h2 className={sectionTitle}>How to order</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ icon: Icon, title, text }, i) => (
              <div
                key={title}
                className="relative rounded-[18px] border border-[#dce6f2] bg-white p-5"
              >
                <span className="absolute right-4 top-3 text-[32px] font-black text-[#0866f5]/10">
                  {i + 1}
                </span>
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#eaf2ff] text-[#0866f5]">
                  <Icon size={24} />
                </span>
                <h3 className="mt-4 text-[16.5px] font-extrabold text-[#102044]">
                  {title}
                </h3>
                <p className="mt-1.5 text-[14.5px] leading-[1.7] text-[#52627e]">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* why Neelgiri */}
        <section className="mt-14 overflow-hidden rounded-[26px] bg-[linear-gradient(145deg,#0a3aa8,#0b5bf5_62%,#2f6bff)] px-6 py-10 text-white shadow-[0_34px_70px_-28px_rgba(11,91,245,0.75)] sm:px-10">
          <div className="max-w-2xl">
            <h2 className="text-[26px] font-extrabold tracking-tight sm:text-[32px]">
              Why buy from Neelgiri Chemicals
            </h2>
            <p className="mt-3 text-[15.5px] leading-[1.8] text-white/80">
              A dependable raw-material partner for paint, plastics, adhesive,
              rubber and road-construction customers.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl bg-white/10 p-5 ring-1 ring-white/20"
              >
                <div className="text-[32px] font-extrabold leading-none sm:text-[40px]">
                  {s.value}
                </div>
                <div className="mt-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-white/75">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section id="faqs" className="mt-14 scroll-mt-[150px]">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
            <div>
              <h2 className={sectionTitle}>Frequently asked questions</h2>
              <div className="mt-4 space-y-2.5">
                {product.faqs.map((f, i) => (
                  <div
                    key={f.q}
                    className="rounded-[14px] border border-[#dce6f2] bg-white"
                  >
                    <button
                      type="button"
                      onClick={() => setOpen(open === i ? -1 : i)}
                      aria-expanded={open === i}
                      className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left text-[14.5px] font-bold text-[#101d3d]"
                    >
                      {f.q}
                      <ChevronDown
                        size={17}
                        className={`shrink-0 transition-transform ${
                          open === i ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {open === i && (
                      <p className="px-4 pb-4 text-[14.5px] leading-[1.7] text-[#52627e]">
                        {f.a}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <aside className="h-fit rounded-[20px] border border-[#dce6f2] bg-white p-6 lg:sticky lg:top-[150px]">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#eaf2ff] text-[#0866f5]">
                <Headphones size={26} />
              </span>
              <h3 className="mt-4 text-[18px] font-extrabold text-[#102044]">
                Still have questions?
              </h3>
              <p className="mt-2 text-[14.5px] leading-[1.7] text-[#52627e]">
                Talk to our team about grades, quantities and delivery.
              </p>
              <a
                href={`tel:${company.phoneHref}`}
                className="mt-4 flex items-center gap-2 text-[14.5px] font-bold text-[#18315b] hover:text-[#0866f5]"
              >
                <Phone size={16} /> {company.phone}
              </a>
              <a
                href={whatsappLink(
                  `Hello, I have a question about ${product.name}.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center gap-2 text-[14.5px] font-bold text-[#18315b] hover:text-[#0866f5]"
              >
                <MessageCircle size={16} /> Chat on WhatsApp
              </a>
            </aside>
          </div>
        </section>

        {/* closing CTA */}
        <section className="mt-14 flex flex-col items-start justify-between gap-5 rounded-[22px] border border-[#cfe0fa] bg-white p-7 shadow-[0_18px_40px_rgba(20,75,150,0.08)] sm:flex-row sm:items-center sm:p-9">
          <div>
            <h2 className="text-[24px] font-extrabold tracking-tight text-[#102044] sm:text-[28px]">
              Need {product.name}?
            </h2>
            <p className="mt-1.5 text-[15.5px] text-[#52627e]">
              Send us your quantity and location for a quick quote.
            </p>
          </div>
          <Link
            href={quoteHref}
            className="inline-flex min-h-[50px] shrink-0 items-center gap-2 rounded-full bg-[#0a2e6e] px-7 text-[15px] font-bold text-white shadow-soft transition-colors hover:bg-[#123f91]"
          >
            Get a Quote <ArrowRight size={17} />
          </Link>
        </section>

        {/* related */}
        {related.length > 0 && (
          <section className="mt-14">
            <h2 className={sectionTitle}>Related products</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}