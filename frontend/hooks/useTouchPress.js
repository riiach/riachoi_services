"use client";

import { useEffect, useRef, useState } from "react";

export default function useTouchPress() {
  const [pressed, setPressed] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  return {
    "data-touch-pressed": pressed || undefined,
    onPointerDown(event) {
      if (event.pointerType !== "touch" && event.pointerType !== "pen") return;
      window.clearTimeout(timerRef.current);
      setPressed(true);
      // Keep a quick tap visible long enough for the slow transition to run.
      timerRef.current = window.setTimeout(() => setPressed(false), 700);
    },
    onPointerCancel() {
      window.clearTimeout(timerRef.current);
      setPressed(false);
    },
  };
}
