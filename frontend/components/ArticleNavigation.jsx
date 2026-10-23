"use client";

import { useEffect, useId, useRef, useState } from "react";
import { getArticleHeadings } from "../lib/util/article-headings";

const sizes = { h1: "text-lg font-semibold", h2: "pl-2 text-base", h3: "pl-4 text-sm text-foreground/65" };

export default function ArticleNavigation({ value }) {
  const [open, setOpen] = useState(false);
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

  if (!headings.length) return null;
  return (
    <div ref={container} className="fixed right-5 bottom-6 z-30 flex flex-col items-end gap-3 md:right-8">
      <nav id={menuId} aria-label="Article headings" aria-hidden={!open} inert={!open} className={`absolute right-0 bottom-full mb-3 max-h-[min(60dvh,28rem)] w-64 max-w-[calc(100vw-2.5rem)] overflow-y-auto rounded-2xl border border-foreground/10 bg-background/95 p-4 shadow-lg backdrop-blur-xl transition-[opacity,transform,visibility] duration-200 motion-reduce:transition-none ${open ? "visible translate-y-0 opacity-100" : "invisible translate-y-2 opacity-0"}`}>
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
      <button ref={trigger} type="button" aria-label="Article headings" aria-expanded={open} aria-controls={menuId} onClick={() => setOpen((current) => !current)} className="flex size-11 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2">
        <span aria-hidden="true" className="size-6 rounded-full bg-black shadow-md transition-transform duration-200 hover:scale-110 motion-reduce:transition-none" />
      </button>
    </div>
  );
}
