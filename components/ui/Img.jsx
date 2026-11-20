"use client";

import { useState } from "react";

// Free stock photos from Pexels (https://www.pexels.com) — hot-linked directly.
// Swap any photo by changing the numeric ID, or pass a full URL to <Img src="..." />.
export const pexels = (id, w = 800) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export default function Img({ src, alt = "", className = "", ...rest }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`bg-gradient-to-br from-brand-100 via-white to-brand-200 ${className}`}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
      {...rest}
    />
  );
}
