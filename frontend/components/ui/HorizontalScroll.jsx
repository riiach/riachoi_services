"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HorizontalScroll({ children, as: Element = "div", className = "", label, role }) {
  const scroller = useRef(null);
  const [edges, setEdges] = useState({ left: false, right: false });

  useEffect(() => {
    const element = scroller.current;
    function update() {
      setEdges({ left: element.scrollLeft > 1, right: element.scrollLeft + element.clientWidth < element.scrollWidth - 1 });
    }
    update();
    element.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(element);
    for (const child of element.children) observer.observe(child);
    document.fonts.ready.then(update);
    return () => {
      element.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [children]);

  function scroll(direction) {
    const element = scroller.current;
    element.scrollBy({ left: direction * element.clientWidth * 0.7, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  return (
    <div className="group/scroll relative min-w-0 w-full">
      <Element ref={scroller} role={role} aria-label={label} className={`scrollbar-hide w-full overflow-x-auto touch-pan-x ${className}`}>{children}</Element>
      {[{ side: "left", direction: -1, Icon: ChevronLeft }, { side: "right", direction: 1, Icon: ChevronRight }].map(({ side, direction, Icon }) => edges[side] && (
        <button key={side} type="button" aria-label={`Scroll ${label.toLowerCase()} ${side}`} onClick={() => scroll(direction)} className={`pointer-events-none absolute top-1/2 z-10 hidden size-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/35 text-foreground opacity-0 shadow-sm backdrop-blur-md transition-opacity duration-200 group-hover/scroll:pointer-events-auto group-hover/scroll:opacity-100 group-focus-within/scroll:pointer-events-auto group-focus-within/scroll:opacity-100 focus-visible:pointer-events-auto focus-visible:opacity-100 motion-reduce:transition-none xl:flex [@media(pointer:coarse)]:hidden ${side === "left" ? "left-0" : "right-0"}`}>
          <Icon aria-hidden="true" className="size-4" />
        </button>
      ))}
    </div>
  );
}
