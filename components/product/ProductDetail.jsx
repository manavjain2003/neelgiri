"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown, ChevronRight, MessageCircle, Phone } from "lucide-react";
import Img from "@/components/ui/Img";
import ProductMedia from "./ProductMedia";
import ProductCard from "./ProductCard";
import { formatPrice } from "@/lib/products";
import { company, whatsappLink } from "@/lib/company";

export default function ProductDetail({ product, related = [] }) {
  const [open, setOpen] = useState(0);
  const hasPrice = typeof product.price === "number";

  return (
    <div className="bg-[#f8faff] text-[#101d3d]">
      <div className="mx-auto max-w-[1440px] px-5 pb-12 pt-[calc(2rem+82px)] sm:px-8 lg:px-10">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-[12px] font-semibold text-[#687792]">
          <Link href="/" className="hover:text-[#0866f5]">Home</Link>
          <ChevronRight size={13} />
          <Link href="/products" className="hover:text-[#0866f5]">Products</Link>
          <ChevronRight size={13} />
          <Link href={`/products?category=${product.category}`} className="hover:text-[#0866f5]">
            {product.categoryLabel}
          </Link>
        </nav>

        <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="aspect-square overflow-hidden rounded-[22px] border border-[#dce6f2] bg-white shadow-[0_18px_40px_rgba(20,75,150,0.08)]">
            <ProductMedia product={product} padding="p-8" />
          </div>

          <div>
            <span className="inline-block rounded-full border border-[#cfe0fa] bg-white px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#0866f5]">
              {product.categoryLabel}
            </span>
            <h1 className="mt-3 text-[28px] font-extrabold leading-[1.15] tracking-[-0.03em] text-[#102044] sm:text-[36px]">
              {product.name}
            </h1>
            <p className="mt-3 text-[14px] leading-[1.8] text-[#52627e]">{product.overview}</p>

            <p className="mt-5 text-[26px] font-extrabold text-[#0c2452]">
              {hasPrice ? (
                <>
                  {formatPrice(product.price)}
                  <span className="text-[15px] font-semibold text-[#8794aa]"> / {product.priceUnit}</span>
                </>
              ) : (
                <span className="text-[18px] font-bold text-[#687792]">Price on request</span>
              )}
            </p>
            {hasPrice && (
              <p className="mt-1 text-[12px] text-[#8794aa]">Indicative price – final quote depends on quantity and packaging.</p>
            )}

            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {product.uses.map((u) => (
                <li key={u} className="flex items-center gap-2 text-[13px] font-semibold text-[#18315b]">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-[#eaf2ff] text-[#0866f5]">
                    <Check size={12} />
                  </span>
                  {u}
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={`/contact?product=${product.slug}`}
                className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-[#0a2e6e] px-6 text-[13px] font-bold text-white shadow-soft transition-colors hover:bg-[#123f91]"
              >
                Get a Quote <ArrowRight size={15} />
              </Link>
              <a
                href={whatsappLink(`Hello, I would like a quote for ${product.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-[#b9cbe4] bg-white px-5 text-[13px] font-bold text-[#18315b] transition-all hover:border-[#0866f5] hover:bg-[#f2f7ff]"
              >
                <MessageCircle size={15} /> WhatsApp
              </a>
              <a
                href={`tel:${company.phoneHref}`}
                className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-[#b9cbe4] bg-white px-5 text-[13px] font-bold text-[#18315b] transition-all hover:border-[#0866f5] hover:bg-[#f2f7ff]"
              >
                <Phone size={15} /> {company.phone}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section>
            <h2 className="text-[22px] font-extrabold tracking-[-0.02em] text-[#102044]">Specifications</h2>
            <dl className="mt-4 overflow-hidden rounded-[16px] border border-[#dce6f2] bg-white">
              {product.specifications.map((row, i) => (
                <div key={row.parameter} className={`grid grid-cols-[40%_1fr] gap-3 px-5 py-3.5 text-[13px] ${i % 2 ? "bg-[#f8faff]" : ""}`}>
                  <dt className="font-bold text-[#52627e]">{row.parameter}</dt>
                  <dd className="font-semibold text-[#101d3d]">{row.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section>
            <h2 className="text-[22px] font-extrabold tracking-[-0.02em] text-[#102044]">FAQs</h2>
            <div className="mt-4 space-y-2.5">
              {product.faqs.map((f, i) => (
                <div key={f.q} className="rounded-[14px] border border-[#dce6f2] bg-white">
                  <button
                    type="button"
                    onClick={() => setOpen(open === i ? -1 : i)}
                    aria-expanded={open === i}
                    className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left text-[13px] font-bold text-[#101d3d]"
                  >
                    {f.q}
                    <ChevronDown size={16} className={`shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
                  </button>
                  {open === i && <p className="px-4 pb-4 text-[13px] leading-[1.7] text-[#52627e]">{f.a}</p>}
                </div>
              ))}
            </div>
          </section>
        </div>

        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="text-[22px] font-extrabold tracking-[-0.02em] text-[#102044]">Related products</h2>
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
