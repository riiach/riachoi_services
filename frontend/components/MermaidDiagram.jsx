"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Maximize2, X, ZoomIn, ZoomOut } from "lucide-react";

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

const clampZoom = (value) => Math.max(0.1, Math.min(4, value));

export default function MermaidDiagram({ value }) {
  const source = value?.code?.trim() || "";
  const reactId = useId();
  const diagramId = "mermaid-" + reactId.replace(/[^a-zA-Z0-9_-]/g, "");
  const inlineRef = useRef(null);
  const expandedRef = useRef(null);
  const svgRef = useRef(null);
  const openButtonRef = useRef(null);
  const closeButtonRef = useRef(null);
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [size, setSize] = useState({ width: 800, height: 450 });

  useEffect(() => {
    let cancelled = false;
    if (!source) return;
    setError("");
    setReady(false);
    setExpanded(false);
    loadMermaid()
      .then((mermaid) => mermaid.render(diagramId, source))
      .then(({ svg, bindFunctions }) => {
        if (cancelled || !inlineRef.current) return;
        // Mermaid sanitizes the output with securityLevel: strict.
        inlineRef.current.innerHTML = svg;
        bindFunctions?.(inlineRef.current);
        const element = inlineRef.current.querySelector("svg");
        svgRef.current = element;
        if (element) {
          const bounds = element.viewBox?.baseVal;
          const width = bounds?.width || Number.parseFloat(element.getAttribute("width")) || 800;
          const height = bounds?.height || Number.parseFloat(element.getAttribute("height")) || 450;
          setSize({ width, height });
          setReady(true);
        }
      })
      .catch(() => {
        if (!cancelled) setError("다이어그램을 표시할 수 없습니다. Mermaid 문법을 확인해 주세요.");
      });
    return () => {
      cancelled = true;
      svgRef.current = null;
      inlineRef.current?.replaceChildren();
      expandedRef.current?.replaceChildren();
    };
  }, [diagramId, source]);

  // Move the same SVG between views so Mermaid IDs, markers and links remain unique.
  useEffect(() => {
    const target = expanded ? expandedRef.current : inlineRef.current;
    if (target && svgRef.current) target.appendChild(svgRef.current);
  }, [expanded, ready]);

  useEffect(() => {
    if (!expanded) return;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setExpanded(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, [expanded]);

  const open = () => {
    if (!svgRef.current) return;
    const fit = Math.min(1, (window.innerWidth - 80) / size.width, (window.innerHeight - 160) / size.height);
    setZoom(clampZoom(fit));
    setExpanded(true);
  };

  if (!source) return null;
  const title = value?.title || "Mermaid diagram";
  return (
    <figure className="blog-diagram my-8">
      <div className="blog-diagram-heading">
        {value?.title && <figcaption className="blog-diagram-title">{value.title}</figcaption>}
        <button ref={openButtonRef} type="button" className="blog-diagram-control" onClick={open} disabled={!ready} aria-label="다이어그램 크게 보기" title="크게 보기">
          <Maximize2 size={18} aria-hidden="true" />
        </button>
      </div>
      <div ref={inlineRef} role="img" aria-label={title} className="blog-diagram-canvas" />
      {error && (
        <div className="blog-diagram-error" role="alert">
          <p>{error}</p>
          <pre>{source}</pre>
        </div>
      )}
      {expanded && createPortal(
        <div className="blog-diagram-overlay">
          <button type="button" className="blog-diagram-backdrop" aria-label="확대 보기 닫기" onClick={() => setExpanded(false)} />
          <div className="blog-diagram-dialog" role="dialog" aria-modal="true" aria-label={title}>
            <div className="blog-diagram-toolbar">
              <span className="blog-diagram-dialog-title">{title}</span>
              <div className="blog-diagram-actions">
                <button type="button" className="blog-diagram-control" aria-label="축소" title="축소" disabled={zoom <= 0.1} onClick={() => setZoom((current) => clampZoom(Number((current / 1.25).toFixed(2))))}>
                  <ZoomOut size={18} aria-hidden="true" />
                </button>
                <span className="blog-diagram-zoom" aria-live="polite">{Math.round(zoom * 100)}%</span>
                <button type="button" className="blog-diagram-control" aria-label="확대" title="확대" disabled={zoom >= 4} onClick={() => setZoom((current) => clampZoom(Number((current * 1.25).toFixed(2))))}>
                  <ZoomIn size={18} aria-hidden="true" />
                </button>
                <button ref={closeButtonRef} type="button" className="blog-diagram-control" aria-label="닫기" title="닫기" onClick={() => setExpanded(false)}>
                  <X size={18} aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="blog-diagram-viewport">
              <div className="blog-diagram-stage" style={{ width: Math.ceil(size.width * zoom), height: Math.ceil(size.height * zoom) }}>
                <div ref={expandedRef} role="img" aria-label={title} className="blog-diagram-canvas blog-diagram-canvas-expanded" />
              </div>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </figure>
  );
}
