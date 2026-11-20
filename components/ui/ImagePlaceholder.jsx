import { ImageIcon } from "lucide-react";

/**
 * Renders your image when `src` is provided,
 * otherwise a light-blue placeholder box labelled with what to put there.
 */
export default function ImagePlaceholder({
  src,
  alt = "",
  label = "Your image here",
  className = "",
  imgClassName = "object-cover",
  rounded = "rounded-2xl",
  icon = true,
}) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={src}
        alt={alt || label}
        className={`h-full w-full ${imgClassName} ${rounded} ${className}`}
      />
    );
  }

  return (
    <div
      className={`relative flex h-full w-full flex-col items-center justify-center gap-1.5 overflow-hidden border-2 border-dashed border-brand-300 bg-gradient-to-br from-brand-100 via-white to-brand-200 text-center text-brand-600 ${rounded} ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 animate-shimmer bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.7)_50%,transparent_70%)] bg-[length:200%_100%]" />
      {icon && <ImageIcon className="relative h-6 w-6 opacity-70" />}
      <span className="relative px-2 text-[11px] font-medium leading-tight">
        {label}
      </span>
    </div>
  );
}
