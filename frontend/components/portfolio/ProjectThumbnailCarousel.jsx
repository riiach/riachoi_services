"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { getSwipeDirection, getWrappedImageIndex } from "../../lib/util/portfolio-swipe";

const slideInterval = 1400;

export default function ProjectThumbnailCarousel({ images, title }) {
  const [position, setPosition] = useState(1);
  const [hovered, setHovered] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [animate, setAnimate] = useState(true);
  const touchStart = useRef(null);
  const count = images.length;
  const currentIndex = getWrappedImageIndex(position, count);
  const slides = count > 1 ? [images[count - 1], ...images, images[0]] : images;
  const slideCount = slides.length;

  const changeSlide = (direction) => {
    if (count < 2) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setAnimate(!reducedMotion);
    setPosition((current) => reducedMotion
      ? getWrappedImageIndex(current + direction, count) + 1
      : current + direction
    );
  };

  useEffect(() => {
    if (!hovered || count < 2) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let interval;
    const sync = () => {
      window.clearInterval(interval);
      if (!motion.matches) interval = window.setInterval(() => {
        setPosition((current) => current + 1);
      }, slideInterval);
    };
    sync();
    motion.addEventListener("change", sync);
    return () => {
      motion.removeEventListener("change", sync);
      window.clearInterval(interval);
    };
  }, [count, hovered]);

  const resetTouch = () => {
    touchStart.current = null;
    setDragOffset(0);
    setAnimate(true);
  };

  return (
    <div
      aria-label={title + " thumbnails"}
      aria-roledescription="carousel"
      className="relative aspect-[4/3] overflow-hidden rounded-xl bg-primary"
      style={{ touchAction: count > 1 ? "pan-y" : "auto" }}
      onPointerEnter={(event) => {
        if (count < 2 || event.pointerType !== "mouse") return;
        setAnimate(true);
        setHovered(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType !== "mouse") return;
        setHovered(false);
        setAnimate(false);
        setPosition(1);
        setDragOffset(0);
      }}
      onTouchStart={(event) => {
        if (count < 2 || event.touches.length !== 1 || event.target.closest?.("button")) return;
        const touch = event.touches[0];
        touchStart.current = {
          x: touch.clientX,
          y: touch.clientY,
          width: event.currentTarget.getBoundingClientRect().width,
          axis: null,
        };
        setHovered(false);
        setAnimate(false);
      }}
      onTouchMove={(event) => {
        const start = touchStart.current;
        if (!start || event.touches.length !== 1) return;
        const dx = event.touches[0].clientX - start.x;
        const dy = event.touches[0].clientY - start.y;
        if (!start.axis && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) {
          start.axis = Math.abs(dx) > Math.abs(dy) ? "horizontal" : "vertical";
        }
        if (start.axis === "horizontal") {
          setDragOffset(Math.max(-start.width, Math.min(start.width, dx)));
        }
      }}
      onTouchEnd={(event) => {
        const start = touchStart.current;
        if (!start) return;
        const touch = event.changedTouches[0];
        const direction = touch
          ? getSwipeDirection(touch.clientX - start.x, touch.clientY - start.y, start.width)
          : 0;
        resetTouch();
        if (direction) changeSlide(direction);
      }}
      onTouchCancel={resetTouch}
    >
      <div
        className={`flex h-full ease-out motion-reduce:transition-none ${animate ? "transition-transform duration-300" : ""}`}
        style={{
          width: `${slideCount * 100}%`,
          transform: `translate3d(calc(${(-position * 100) / slideCount}% + ${dragOffset}px), 0, 0)`,
        }}
        onTransitionEnd={(event) => {
          if (event.target !== event.currentTarget || event.propertyName !== "transform" || count < 2) return;
          if (position !== 0 && position !== count + 1) return;
          setAnimate(false);
          setPosition(position === 0 ? count : 1);
          // Jump from the duplicate edge image to its original without a visible transition.
          window.requestAnimationFrame(() => window.requestAnimationFrame(() => setAnimate(true)));
        }}
      >
        {slides.map((image, slot) => {
          const duplicate = count > 1 && (slot === 0 || slot === slideCount - 1);
          return (
            <div
              key={image.key + "-" + slot}
              className="relative h-full shrink-0"
              style={{ width: `${100 / slideCount}%` }}
              aria-hidden={duplicate || slot !== position}
            >
              <Image
                src={image.src}
                alt={duplicate ? "" : image.alt}
                unoptimized={image.unoptimized}
                fill
                draggable={false}
                sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 100vw"
                className="select-none object-cover"
              />
            </div>
          );
        })}
      </div>
      {count > 1 && (
        <button
          type="button"
          aria-label={`${title}: next thumbnail (image ${currentIndex + 1} of ${count})`}
          onClick={() => {
            setHovered(false);
            changeSlide(1);
          }}
          className="absolute right-2 bottom-2 min-h-8 cursor-pointer rounded-full bg-black/70 px-3 text-xs tabular-nums text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {currentIndex + 1} / {count}
        </button>
      )}
    </div>
  );
}
