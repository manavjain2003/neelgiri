"use client";

import { useId } from "react";

const BODY =
  "M78 16 L78 92 C78 122 20 188 20 238 C20 256 30 264 48 264 L152 264 C170 264 180 256 180 238 C180 188 122 122 122 92 L122 16 Z";

/** Glass Erlenmeyer flask illustration with light-blue liquid and a leaf. */
export default function Flask({ className = "" }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 200 280" className={className} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={`liq-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c9ecff" />
          <stop offset="0.55" stopColor="#73c0f0" />
          <stop offset="1" stopColor="#2b86cc" />
        </linearGradient>
        <linearGradient id={`glass-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.75" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.12" />
        </linearGradient>
        <clipPath id={`clip-${id}`}>
          <path d={BODY} />
        </clipPath>
      </defs>

      <path d={BODY} fill={`url(#glass-${id})`} />
      <g clipPath={`url(#clip-${id})`}>
        <path d="M0 168 Q50 156 100 170 T200 164 L200 280 L0 280 Z" fill={`url(#liq-${id})`} />
        <path d="M100 252 C70 242 64 206 100 186 C136 206 130 242 100 252 Z" fill="#ffffff" fillOpacity="0.55" />
        <path d="M100 250 L100 198" stroke="#2b86cc" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" />
        <circle cx="52" cy="214" r="5" fill="#fff" fillOpacity="0.7" />
        <circle cx="146" cy="200" r="4" fill="#fff" fillOpacity="0.7" />
        <circle cx="132" cy="232" r="3" fill="#fff" fillOpacity="0.6" />
      </g>
      <path d={BODY} stroke="#ffffff" strokeOpacity="0.95" strokeWidth="4" strokeLinejoin="round" />
      <rect x="70" y="8" width="60" height="14" rx="7" fill="#ffffff" fillOpacity="0.9" />
      <path d="M92 28 V86" stroke="#ffffff" strokeOpacity="0.9" strokeWidth="5" strokeLinecap="round" />
      <path d="M44 198 C40 214 42 228 48 240" stroke="#ffffff" strokeOpacity="0.85" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}
