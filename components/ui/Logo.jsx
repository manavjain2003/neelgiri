import Link from "next/link";

export function FlaskMark({ className = "h-11 w-11" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8fd0f7" />
          <stop offset="1" stopColor="#1a68a0" />
        </linearGradient>
      </defs>
      <path
        d="M19 5h10M21 5v14L9 38a4 4 0 003.5 6h23a4 4 0 003.5-6L27 19V5"
        stroke="#154f7b"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14 33h20l4.5 8a2 2 0 01-1.8 3H11.3a2 2 0 01-1.8-3L14 33z" fill="url(#logoGrad)" />
      <path d="M24 40c-4-1-5-5 0-8 5 3 4 7 0 8z" fill="#fff" fillOpacity="0.8" />
    </svg>
  );
}

/*
  variant="dark"  → navy wordmark, for light backgrounds (navbar)
  variant="light" → original white wordmark, for dark backgrounds (footer)
*/
export default function Logo({ variant = "dark", className = "h-[52px] w-auto" }) {
  return (
    <Link href="/" aria-label="Neelgiri Chemicals – home" className="inline-flex shrink-0 items-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={variant === "dark" ? "/logo-dark.png" : "/logo-light.png"}
        alt="Neelgiri Chemicals"
        className={className}
      />
    </Link>
  );
}
