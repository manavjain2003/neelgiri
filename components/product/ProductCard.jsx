import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import ProductMedia from "./ProductMedia";
import { formatPrice } from "@/lib/products";

export default function ProductCard({ product }) {
  const hasPrice = typeof product.price === "number";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-[#dce6f2] bg-white shadow-[0_8px_26px_rgba(20,75,150,0.07)] transition-all duration-300 hover:-translate-y-1 hover:border-[#b8d2f7] hover:shadow-[0_22px_44px_rgba(20,75,150,0.16)]">
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-[4/3] overflow-hidden bg-white"
        aria-label={product.name}
      >
        <ProductMedia
          product={product}
          className="transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full border border-[#cfe0fa] bg-white/90 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#0866f5] backdrop-blur">
          {product.categoryLabel}
        </span>
      </Link>

      <div className="flex flex-1 flex-col border-t border-[#eef3fa] p-4">
        <h3 className="line-clamp-2 min-h-[2.6em] text-[15px] font-extrabold leading-[1.3] tracking-[-0.01em] text-[#101d3d]">
          <Link href={`/products/${product.slug}`} className="hover:text-[#0866f5]">
            {product.name}
          </Link>
        </h3>

        <p className="mt-2 text-[13px] font-bold text-[#0c2452]">
          {hasPrice ? (
            <>
              {formatPrice(product.price)}
              <span className="font-semibold text-[#8794aa]"> / {product.priceUnit}</span>
            </>
          ) : (
            <span className="font-semibold text-[#687792]">Price on request</span>
          )}
        </p>

        <div className="mt-4 flex items-center gap-2 pt-1">
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex min-h-[40px] flex-1 items-center justify-center gap-1.5 rounded-[10px] bg-[#0a2e6e] px-3 text-[12px] font-bold text-white transition-colors hover:bg-[#123f91]"
          >
            View details <ArrowRight size={14} />
          </Link>
          <Link
            href={`/contact?product=${product.slug}`}
            aria-label={`Get a quote for ${product.name}`}
            className="inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-[10px] border border-[#b9cbe4] bg-white px-3 text-[12px] font-bold text-[#18315b] transition-all hover:border-[#0866f5] hover:bg-[#f2f7ff]"
          >
            <MessageCircle size={14} /> Quote
          </Link>
        </div>
      </div>
    </article>
  );
}
