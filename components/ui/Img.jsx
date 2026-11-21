"use client";

import { useState } from "react";

// Free stock photos from Pexels (https://www.pexels.com) — hot-linked directly.
// Swap any photo by changing the numeric ID, or pass a full URL to <Img src="..." />.
export const pexels = (id, w = 800) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

/*
  `src` can be a single URL or a list of candidates. If one fails to load the
  next is tried; when none load a soft gradient is shown instead.
*/
export default function Img({ src, alt = "", className = "", ...rest }) {
  const list = (Array.isArray(src) ? src : [src]).filter(Boolean);
  const key = list.join("|");
  const [state, setState] = useState({ key, i: 0 });
  const i = state.key === key ? state.i : 0;

  if (!list.length || i >= list.length) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`bg-gradient-to-br from-brand-100 via-white to-brand-200 ${className}`}
      />
    );
  }

  const url = list[i];
  const remote = /^https?:\/\//.test(url);
  // default to object-cover unless the caller picked an object-fit itself
  const fit = /\bobject-(contain|cover|fill|none|scale-down)\b/.test(className) ? "" : "object-cover";

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      key={url}
      src={url}
      alt={alt}
      loading="lazy"
      decoding="async"
      {...(remote ? { referrerPolicy: "no-referrer" } : {})}
      onError={() => setState({ key, i: i + 1 })}
      className={`${fit} ${className}`}
      {...rest}
    />
  );
}
