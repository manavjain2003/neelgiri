import Img from "@/components/ui/Img";
import { categoryById } from "@/lib/products";
import { iconFor } from "./categoryIcons";


export default function ProductMedia({ product, image , className = "", padding = "p-5" }) {
  const src = image ?? product.image;
  if (product.images?.length) {
    return (
      <Img
        src={product.images}
        alt={product.name}
        className={`h-full w-full object-contain ${padding} ${className}`}
      />
    );
  }

  const cat = categoryById[product.category];
  const Icon = iconFor(cat?.icon);

  return (
    <div
      role="img"
      aria-label={`${product.name} – photo coming soon`}
      className={`relative flex h-full w-full flex-col items-center justify-center gap-3 overflow-hidden bg-gradient-to-br from-brand-50 via-white to-brand-200 text-center ${className}`}
    >
      <span className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full border-[18px] border-brand-200/60" />
      <span className="pointer-events-none absolute -bottom-10 -left-10 h-36 w-36 rounded-full border-[20px] border-brand-100" />
      <span className="relative grid h-16 w-16 place-items-center rounded-2xl bg-white text-brand-700 shadow-soft ring-1 ring-brand-100">
        <Icon className="h-8 w-8" strokeWidth={1.5} />
      </span>
      <span className="relative px-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-brand-800/80">
        {cat?.label}
      </span>
    </div>
  );
}
