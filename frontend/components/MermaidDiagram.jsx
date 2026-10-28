"use client";

import { useEffect, useId, useRef, useState } from "react";

// Load the pinned ESM build only when a diagram is visible in a post.
// Mermaid runs in the browser; authored source is never interpreted as HTML.
let mermaidPromise;
function loadMermaid() {
  if (!mermaidPromise) {
    mermaidPromise = import(/* webpackIgnore: true */ "https://cdn.jsdelivr.net/npm/mermaid@11.12.2/dist/mermaid.esm.min.mjs")
      .then(({ default: mermaid }) => {
        mermaid.initialize({ startOnLoad: false, securityLevel: "strict", theme: "neutral", suppressErrorRendering: true });
        return mermaid;
      })
      .catch((error) => {
        mermaidPromise = undefined;
        throw error;
      });
  }
  return mermaidPromise;
}

export default function MermaidDiagram({ value }) {
  const source = value?.code?.trim() || "";
  const reactId = useId();
  const diagramId = "mermaid-" + reactId.replace(/[^a-zA-Z0-9_-]/g, "");
  const containerRef = useRef(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    if (!source) return;
    setError("");
    loadMermaid()
      .then((mermaid) => mermaid.render(diagramId, source))
      .then(({ svg, bindFunctions }) => {
        if (cancelled || !containerRef.current) return;
        // Mermaid sanitizes the output with securityLevel: strict.
        containerRef.current.innerHTML = svg;
        bindFunctions?.(containerRef.current);
      })
      .catch(() => {
        if (!cancelled) setError("다이어그램을 표시할 수 없습니다. Mermaid 문법을 확인해 주세요.");
      });
    return () => {
      cancelled = true;
      if (containerRef.current) containerRef.current.replaceChildren();
    };
  }, [diagramId, source]);

  if (!source) return null;
  return (
    <figure className="blog-diagram my-8">
      {value?.title && <figcaption className="blog-diagram-title">{value.title}</figcaption>}
      <div ref={containerRef} role="img" aria-label={value?.title || "Mermaid diagram"} className="blog-diagram-canvas" />
      {error && (
        <div className="blog-diagram-error" role="alert">
          <p>{error}</p>
          <pre>{source}</pre>
        </div>
      )}
    </figure>
  );
}
