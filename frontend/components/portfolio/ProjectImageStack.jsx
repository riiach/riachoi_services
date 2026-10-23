"use client";

import { useState } from "react";
import Image from "next/image";

const spread = [
  { top: 26, left: 26, rotation: -8 },
  { top: 25, left: 74, rotation: 7 },
  { top: 74, left: 25, rotation: 5 },
  { top: 73, left: 74, rotation: -6 },
];

export default function ProjectImageStack({ images, title }) {
  const [expanded, setExpanded] = useState(false);
  const visibleImages = images.slice(0, 4);
  const multiple = visibleImages.length > 1;

  return (
    <button
      type="button"
      aria-label={`${expanded ? "Collapse" : "Expand"} ${title} thumbnails`}
      aria-expanded={expanded}
      onClick={() => setExpanded((value) => !value)}
      onPointerEnter={(event) => { if (event.pointerType === "mouse") setExpanded(true); }}
      onPointerLeave={(event) => { if (event.pointerType === "mouse") setExpanded(false); }}
      disabled={!multiple}
      className="relative block aspect-[4/3] w-full cursor-pointer rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-default"
    >
      {visibleImages.map((image, index) => {
        const position = spread[index];
        const offset = index - (visibleImages.length - 1) / 2;

        return (
          <span
            key={image.key}
            className="absolute aspect-[4/3] overflow-hidden rounded-lg border border-black/10 bg-white shadow-md transition-[top,left,width,transform] duration-500 ease-out motion-reduce:transition-none"
            style={{
              top: expanded ? `${position.top}%` : "50%",
              left: expanded ? `${position.left}%` : "50%",
              width: expanded ? "42%" : "78%",
              zIndex: visibleImages.length - index,
              transform: expanded
                ? `translate(-50%, -50%) rotate(${position.rotation}deg)`
                : `translate(calc(-50% + ${offset * 6}%), calc(-50% - ${index * 4}%)) rotate(${offset * 7}deg)`,
            }}
          >
            <Image
              src={image.src}
              unoptimized={image.unoptimized}
              alt={image.alt}
              fill
              sizes="(min-width: 1280px) 12vw, (min-width: 768px) 30vw, 90vw"
              className="object-cover"
            />
          </span>
        );
      })}
    </button>
  );
}
