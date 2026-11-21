"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slideInterval = 1400;

export default function ProjectThumbnailCarousel({ images, title }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [engaged, setEngaged] = useState(false);
  const count = images.length;
  const currentIndex = activeIndex % count;

  useEffect(() => {
    if (!hovered || count < 2) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let interval;
    const sync = () => {
      window.clearInterval(interval);
      if (!motion.matches) interval = window.setInterval(() => {
        setActiveIndex((index) => (index + 1) % count);
      }, slideInterval);
    };
    sync();
    motion.addEventListener("change", sync);
    return () => {
      motion.removeEventListener("change", sync);
      window.clearInterval(interval);
    };
  }, [count, hovered]);

  return (
    <div
      className="relative aspect-[4/3] overflow-hidden rounded-xl bg-primary"
      onPointerEnter={(event) => {
        if (count < 2 || event.pointerType !== "mouse") return;
        setEngaged(true);
        setHovered(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType !== "mouse") return;
        setHovered(false);
        setActiveIndex(0);
      }}
    >
      {images.map((image, index) => (index === 0 || engaged) && (
        <Image
          key={image.key}
          src={image.src}
          alt={image.alt}
          aria-hidden={index !== currentIndex}
          unoptimized={image.unoptimized}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw"
          className={`object-cover transition-opacity duration-300 motion-reduce:transition-none ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      {count > 1 && (
        <button
          type="button"
          aria-label={`${title}: next thumbnail (image ${currentIndex + 1} of ${count})`}
          onClick={() => {
            setEngaged(true);
            setHovered(false);
            setActiveIndex((index) => (index + 1) % count);
          }}
          className="absolute right-2 bottom-2 min-h-8 cursor-pointer rounded-full bg-black/70 px-3 text-xs tabular-nums text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {currentIndex + 1} / {count}
        </button>
      )}
    </div>
  );
}
