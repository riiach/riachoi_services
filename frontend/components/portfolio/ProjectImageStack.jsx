"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProjectImageStack({ images, title }) {
  const [expanded, setExpanded] = useState(false);
  const multiple = images.length > 1;
  return (
    <button type="button" aria-label={`${expanded ? "Collapse" : "Expand"} ${title} thumbnails`} aria-expanded={expanded} onClick={() => setExpanded((value) => !value)} disabled={!multiple} className="relative block cursor-pointer aspect-[4/3] w-full rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-default">
      {images.map((image, index) => {
        const offset = index - (images.length - 1) / 2;
        return <span key={image.key} className="absolute top-1/2 left-1/2 aspect-[4/3] overflow-hidden rounded-lg border border-black/10 bg-white shadow-md transition-[transform,width] duration-500 ease-out motion-reduce:transition-none" style={{ width: expanded ? "64%" : "76%", zIndex: images.length - index, transform: `translate(calc(-50% + ${offset * (expanded ? 12 : 3)}%), calc(-50% + ${expanded ? Math.abs(offset) * 4 : -index * 2}%)) rotate(${offset * (expanded ? 12 : 4)}deg)` }}>
          <Image src={image.src} unoptimized={image.unoptimized} alt={image.alt} fill sizes="(min-width: 768px) 25vw, 40vw" className="object-cover" />
        </span>;
      })}
    </button>
  );
}
