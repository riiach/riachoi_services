"use client";

import { useEffect, useId, useRef, useState } from "react";
import DotNavigation from "./ui/DotNavigation";
import { getArticleHeadings } from "../lib/util/article-headings";

const sizes = { h1: "text-lg font-semibold", h2: "text-base", h3: "text-sm text-foreground/65" };

export default function ArticleNavigation({ value }) {
  const [open, setOpen] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const container = useRef(null);
  const trigger = useRef(null);
  const menuId = useId();
  const headings = getArticleHeadings(value);

  useEffect(() => {
    if (!open) return;
    function outside(event) {
      if (!container.current?.contains(event.target)) setOpen(false);
    }
    function escape(event) {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    }
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);

  useEffect(() => {
    const footer = document.querySelector('[aria-label="Site footer"] footer') || document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(([entry]) => {
      setFooterVisible(entry.isIntersecting);
      if (entry.isIntersecting) setOpen(false);
    });
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  if (!headings.length) return null;
  return (
    <div ref={container} aria-hidden={footerVisible} inert={footerVisible} className={`fixed right-5 bottom-6 z-30 flex flex-col items-end gap-3 transition-opacity duration-200 motion-reduce:transition-none md:right-8 ${footerVisible ? "invisible pointer-events-none opacity-0" : "visible opacity-100"}`}>
      <nav id={menuId} aria-label="Article headings" aria-hidden={!open} inert={!open} className={`absolute right-0 bottom-full mb-3 max-h-[calc(100dvh-7rem)] w-max min-w-[min(16rem,calc(100vw-2.5rem))] max-w-[calc(100vw-2.5rem)] md:max-w-[calc(100vw-4rem)] overflow-y-auto rounded-2xl border border-white/40 bg-white/35 p-4 text-right shadow-lg backdrop-blur-xl dark:bg-black/35 transition-[opacity,transform,visibility] duration-200 motion-reduce:transition-none ${open ? "visible translate-y-0 opacity-100" : "invisible translate-y-2 opacity-0"}`}>
        <ul className="space-y-2">
          {headings.map((heading) => <li key={heading.id}><a href={`#${encodeURIComponent(heading.id)}`} className={`block leading-snug [overflow-wrap:anywhere] transition-opacity hover:opacity-60 ${sizes[heading.level]}`} onClick={(event) => {
            const target = document.getElementById(heading.id);
            if (!target) return;
            event.preventDefault();
            setOpen(false);
            target.focus({ preventScroll: true });
            target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
            window.history.replaceState(window.history.state, "", `#${encodeURIComponent(heading.id)}`);
          }}>{heading.title}</a></li>)}
        </ul>
      </nav>
      <button ref={trigger} type="button" aria-label="Article headings" aria-expanded={open} aria-controls={menuId} onClick={() => setOpen((current) => !current)} className="flex size-10 items-center justify-center rounded-full bg-black text-white shadow-md transition-transform duration-200 hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none dark:bg-white dark:text-black">
        <DotNavigation open={open} className="size-5" />
      </button>
    </div>
  );
}
