"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProjectImageStack({ images, title }) {
  const [expanded, setExpanded] = useState(false);
  const visibleImages = images.slice(0, 4);
  const multiple = visibleImages.length > 1;
  return (
    <button type="button" aria-label={`${expanded ? "Collapse" : "Expand"} ${title} thumbnails`} aria-expanded={expanded} onClick={() => setExpanded((value) => !value)} onMouseEnter={() => setExpanded(true)} onMouseLeave={() => setExpanded(false)} onFocus={() => setExpanded(true)} onBlur={() => setExpanded(false)} disabled={!multiple} className="relative block aspect-[4/3] w-full cursor-pointer rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-default">
      {visibleImages.map((image, index) => {
        const visibleCount = visibleImages.length;
        const fan = index - (visibleCount - 1) / 2;
        return <span key={image.key} className="absolute top-1/2 left-1/2 aspect-[4/3] overflow-hidden rounded-lg border border-black/10 bg-white shadow-md transition-[transform,width] duration-500 ease-out motion-reduce:transition-none" style={{ width: expanded ? `${Math.max(48, 75 - (visibleCount - 1) * 7)}%` : "78%", zIndex: visibleCount - index, transform: `translate(calc(-50% + ${fan * (expanded ? 68 : 5)}%), calc(-50% + ${expanded ? Math.abs(fan) * 4 : -index * 2}%)) rotate(${fan * (expanded ? 4 : 3)}deg)` }}>
          <Image src={image.src} unoptimized={image.unoptimized} alt={image.alt} fill sizes="(min-width: 768px) 40vw, 75vw" className="object-cover" />
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-white/15 backdrop-blur-[0.5px]" />
        </span>;
      })}
    </button>
  );
}
