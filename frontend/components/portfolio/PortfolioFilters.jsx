"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import PortfolioTag from "./PortfolioTag";

export default function PortfolioFilters({ tags, selectedTag, onSelect }) {
  const [expanded, setExpanded] = useState(false);
  const [overflows, setOverflows] = useState(false);
  const list = useRef(null);
  const id = useId();

  useEffect(() => {
    const element = list.current;
    const update = () => setOverflows(element.scrollHeight > 104);
    const observer = new ResizeObserver(update);
    observer.observe(element);
    update();
    return () => observer.disconnect();
  }, [tags]);

  const Icon = expanded ? ChevronUp : ChevronDown;
  return (
    <div className="relative pb-5 md:pb-0">
      <div className="relative">
        <div ref={list} id={id} role="group" aria-label="Portfolio tags"
          onFocusCapture={(event) => {
            if (event.target.getBoundingClientRect().bottom > list.current.getBoundingClientRect().bottom) setExpanded(true);
          }}
          className={`flex flex-wrap items-center gap-2.5 overflow-hidden py-2 md:max-h-none md:gap-3 ${expanded ? "max-h-none" : "max-h-[104px]"}`}>
          {[null, ...tags].map((tag) => <button type="button" key={tag === null ? "all" : `tag:${tag}`} aria-pressed={selectedTag === tag} onClick={() => onSelect(tag)} className="cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 transition-opacity hover:opacity-60"><PortfolioTag active={selectedTag === tag} large>{tag || "All"}</PortfolioTag></button>)}
        </div>
        {!expanded && overflows && <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-background via-background/65 to-transparent backdrop-blur-[4px] [mask-image:linear-gradient(transparent,black_65%)] md:hidden" />}
      </div>
      {overflows && <button type="button" aria-label={expanded ? "Collapse portfolio tags" : "Expand portfolio tags"} aria-expanded={expanded} aria-controls={id} onClick={() => setExpanded((value) => !value)} className="relative mx-auto -mt-1 flex size-8 cursor-pointer items-center justify-center bg-transparent text-black dark:text-white focus-visible:outline-2 focus-visible:outline-offset-4 md:hidden"><Icon aria-hidden="true" className="size-4" /></button>}
    </div>
  );
}
