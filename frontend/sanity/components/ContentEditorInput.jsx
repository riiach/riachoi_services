"use client";

import { useState } from "react";
import { Maximize2 } from "lucide-react";

export function HighlightDecorator({ children }) {
  return <span className="rounded-sm bg-yellow-200 px-1 text-black">{children}</span>;
}

export function TextColorAnnotation(props) {
  return <span style={{ color: props.value?.color }}>{props.renderDefault(props)}</span>;
}

export function HighlightAnnotation(props) {
  return <span style={{ backgroundColor: props.value?.color, color: "#111111", borderRadius: "2px", padding: "0 2px" }}>{props.renderDefault(props)}</span>;
}

export default function ContentEditorInput(props) {
  const [expandedSession, setExpandedSession] = useState(0);
  return (
    <div className="min-w-0">
      <div key={expandedSession}>
        {props.renderDefault({ ...props, initialFullscreen: expandedSession > 0 || props.initialFullscreen })}
      </div>
      <button type="button" onClick={() => setExpandedSession((session) => session + 1)} className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-current/20 px-4 py-3 text-sm font-medium transition-opacity hover:opacity-60">
        <Maximize2 aria-hidden="true" className="size-4" />크게 보기 · 전체 화면 편집
      </button>
    </div>
  );
}
