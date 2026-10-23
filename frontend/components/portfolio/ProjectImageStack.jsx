"use client";

import { useState } from "react";
import Image from "next/image";

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
        const column = index % 2;
        const row = Math.floor(index / 2);
        const offset = index - (visibleImages.length - 1) / 2;

        return (
          <span
            key={image.key}
            className="absolute aspect-[4/3] overflow-hidden rounded-lg border border-black/10 bg-white shadow-md transition-[top,left,width,transform] duration-500 ease-out motion-reduce:transition-none"
            style={{
              top: expanded ? `${25 + row * 50}%` : "50%",
              left: expanded ? `${25 + column * 50}%` : "50%",
              width: expanded ? "46%" : "78%",
              zIndex: visibleImages.length - index,
              transform: expanded
                ? "translate(-50%, -50%) rotate(0deg)"
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
