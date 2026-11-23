"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Expand, Minimize2, X } from "lucide-react";
import { workFolderColor } from "../../lib/work";
import Tag from "../ui/Tag";

function WorkWindow({ entry, onClose }) {
  const [maximized, setMaximized] = useState(false);
  const closeRef = useRef(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab") {
        const buttons = Array.from(document.querySelectorAll(".work-window__toolbar button"));
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      previousFocus?.focus?.();
    };
  }, [onClose]);

  return (
    <div
      className="work-window-backdrop"
      role="presentation"
      onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={(entry.title || entry.workType || "Work") + " interactive workspace"}
        className={"work-window" + (maximized ? " work-window--maximized" : "")}
      >
        <div className="work-window__toolbar">
          <button ref={closeRef} type="button" title="Close" aria-label="Close workspace" onClick={onClose}>
            <X size={20} strokeWidth={1.8} />
          </button>
          <button
            type="button"
            title={maximized ? "Restore size" : "Expand to full screen"}
            aria-label={maximized ? "Restore workspace size" : "Expand workspace"}
            onClick={() => setMaximized((value) => !value)}
          >
            {maximized ? <Minimize2 size={19} strokeWidth={1.8} /> : <Expand size={19} strokeWidth={1.8} />}
          </button>
        </div>
        <div className="work-window__canvas" aria-label="Empty interactive workspace" />
      </div>
    </div>
  );
}

function WorkPiece({ entry, index, onOpen }) {
  const type = entry.workType || "Work";
  const title = entry.title || type;
  const image = entry.image;
  const details = [
    entry.duration && { label: "TIME", value: entry.duration },
    typeof entry.price === "number" && { label: "PRICE", value: new Intl.NumberFormat("en-US", { style: "currency", currency: entry.currency || "USD", maximumFractionDigits: 2 }).format(entry.price) },
    entry.client && { label: "CLIENT", value: entry.client },
  ].filter(Boolean);

  return (
    <button className="work-piece" type="button" onClick={() => onOpen(entry)} aria-label={"Open " + title + " workspace"}>
      <div className="work-piece__copy">
        <Tag tag={`${String(index + 1).padStart(2, "0")} / ${type}`} />
        <h2>{title}</h2>
        <p>{entry.description || "Explore this piece of work in its interactive workspace."}</p>
        {details.length > 0 && (
          <dl className="work-piece__meta">
            {details.map((detail) => (
              <div key={detail.label}><dt>{detail.label}</dt><dd>{detail.value}</dd></div>
            ))}
          </dl>
        )}
        <span className="work-piece__action">Explore workspace <span aria-hidden="true">↗</span></span>
      </div>
      <div className={"work-piece__art work-piece__art--" + (index % 5)}>
        {image?.url && <Image src={image.url} alt={image.alt || title} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />}
      </div>
    </button>
  );
}

export default function WorkProjectDetail({ project }) {
  const [active, setActive] = useState(null);
  const entries = project.entries || [];
  const onClose = () => setActive(null);

  return (
    <section className={"work-shell work-detail work-detail--" + workFolderColor(project, 0)}>
      <Link href="/work" className="work-back"><ArrowLeft aria-hidden="true" size={17} /> All work</Link>
      <header className="work-detail__header">
        <p className="work-eyebrow">PROJECT / {project.title.toUpperCase()}</p>
        <h1 className="work-heading">{project.title}<span className="work-heading-dot">.</span></h1>
        <p className="work-lead">{entries.length} {entries.length === 1 ? "piece of work" : "pieces of work"}</p>
      </header>
      {entries.length ? (
        <div className="work-pieces">
          {entries.map((entry, index) => <WorkPiece entry={entry} index={index} key={entry._id || index} onOpen={setActive} />)}
        </div>
      ) : (
        <div className="work-empty">
          <p>Nothing in this folder yet.</p>
          <span>Project work will appear here as soon as it is published.</span>
        </div>
      )}
      {active && <WorkWindow entry={active} onClose={onClose} />}
    </section>
  );
}
