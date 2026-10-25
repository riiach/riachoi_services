"use client";

import { createElement, useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CopyCodeButton({ code }) {
  const [status, setStatus] = useState("idle");
  useEffect(() => {
    if (status === "idle") return;
    const timer = window.setTimeout(() => setStatus("idle"), 2000);
    return () => window.clearTimeout(timer);
  }, [status]);

  async function copyCode() {
    setStatus("idle");
    try {
      await navigator.clipboard.writeText(code);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
  }

  const label = status === "copied" ? "Code copied" : "Copy code";
  return createElement("button", {
    type: "button",
    onClick: copyCode,
    "aria-label": label,
    title: status === "error" ? "Unable to copy. Please try again." : label,
    className: "flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none",
  },
  createElement(status === "copied" ? Check : Copy, { "aria-hidden": true, className: "size-4" }),
  createElement("span", { role: "status", "aria-live": "polite", className: "sr-only" },
    status === "copied" ? "Code copied to clipboard." : status === "error" ? "Unable to copy. Please try again." : ""));
}
