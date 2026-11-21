"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import ProductCard from "./ProductCard";
import { categories, products } from "@/lib/products";
import { iconFor } from "./categoryIcons";

const PAGE_SIZE = 24;

export default function ProductCatalogue() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const requested = params.get("category");
  const active = categories.some((c) => c.id === requested) ? requested : "all";

  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(PAGE_SIZE);

  const counts = useMemo(() => {
    const map = { all: products.length };
    products.forEach((p) => (map[p.category] = (map[p.category] || 0) + 1));
    return map;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter(
      (p) =>
        (active === "all" || p.category === active) &&
        (!q || p.name.toLowerCase().includes(q) || p.categoryLabel.toLowerCase().includes(q))
    );
  }, [active, query]);

  const setCategory = (id) => {
    setLimit(PAGE_SIZE);
    router.replace(id === "all" ? pathname : `${pathname}?category=${id}`, { scroll: false });
  };

  const activeCategory = categories.find((c) => c.id === active);
  const shown = filtered.slice(0, limit);

  return (
    <section id="catalogue" className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
      {/* category tabs */}
      <div className="flex flex-wrap gap-2.5" role="tablist" aria-label="Product categories">
        {[{ id: "all", label: "All Products", icon: "flask" }, ...categories].map((c) => {
          const Icon = iconFor(c.icon);
          const isActive = c.id === active;
          return (
            <button
              key={c.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setCategory(c.id)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[13px] font-bold transition-all ${
                isActive
                  ? "border-[#0a2e6e] bg-[#0a2e6e] text-white shadow-[0_10px_24px_rgba(10,46,110,0.25)]"
                  : "border-[#cfdcee] bg-white text-[#18315b] hover:border-[#0866f5] hover:text-[#0866f5]"
              }`}
            >
              <Icon size={15} />
              {c.label}
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] ${
                  isActive ? "bg-white/20 text-white" : "bg-[#eaf2ff] text-[#0866f5]"
                }`}
              >
                {counts[c.id] ?? 0}
              </span>
            </button>
          );
        })}
      </div>

      {/* category blurb + search */}
      <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-[760px]">
          <h2 className="text-[24px] font-extrabold tracking-[-0.03em] text-[#102044] sm:text-[30px]">
            {activeCategory ? activeCategory.label : "All Products"}
          </h2>
          <p className="mt-2 text-[14px] leading-[1.75] text-[#52627e]">
            {activeCategory
              ? activeCategory.blurb
              : "Rutile titanium dioxide, road-marking materials and machines, glass beads, hydrocarbon resins, stearates, starch and industrial chemicals – ask us about any of our 280+ raw materials."}
          </p>
        </div>

        <label className="relative block w-full lg:w-[340px]">
          <span className="sr-only">Search products</span>
          <Search size={17} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8794aa]" />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setLimit(PAGE_SIZE);
            }}
            placeholder="Search products…"
            className="h-11 w-full rounded-[12px] border border-[#cfdcee] bg-white pl-10 pr-10 text-[14px] text-[#101d3d] outline-none transition focus:border-[#0866f5] focus:ring-4 focus:ring-[#0866f5]/10"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full text-[#687792] hover:bg-[#eaf2ff]"
            >
              <X size={15} />
            </button>
          )}
        </label>
      </div>

      <p className="mt-6 text-[12px] font-bold uppercase tracking-[0.12em] text-[#8794aa]">
        Showing {shown.length} of {filtered.length} products
      </p>

      {filtered.length === 0 ? (
        <div className="mt-6 rounded-[18px] border border-dashed border-[#b9cbe4] bg-white p-10 text-center">
          <p className="text-[16px] font-bold text-[#101d3d]">No products match your search.</p>
          <p className="mt-1 text-[13px] text-[#687792]">
            We supply 280+ raw materials – contact us and we will source it for you.
          </p>
          <button
            type="button"
            onClick={() => setQuery("")}
            className="mt-4 rounded-[10px] bg-[#0a2e6e] px-5 py-2.5 text-[12px] font-bold text-white"
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {shown.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      {shown.length < filtered.length && (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setLimit((n) => n + PAGE_SIZE)}
            className="rounded-full border border-[#b9cbe4] bg-white px-7 py-3 text-[13px] font-bold text-[#18315b] transition-all hover:border-[#0866f5] hover:text-[#0866f5]"
          >
            Show more products
          </button>
        </div>
      )}
    </section>
  );
}
