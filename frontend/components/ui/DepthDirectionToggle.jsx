"use client";

import { useEffect, useRef, useState } from "react";

export default function DepthDirectionToggle({ onDirectionChange }) {
  const dragRef = useRef(null);
  const timerRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const [dragging, setDragging] = useState(false);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  function springBack(direction) {
    if (dragRef.current) dragRef.current.triggered = true;
    setDragging(false);
    setOffset(0);
    onDirectionChange(direction);
    window.clearTimeout(timerRef.current);
    // Return even while the pointer is still held. One pulse per drag.
    timerRef.current = window.setTimeout(() => onDirectionChange(0), 180);
  }

  function endDrag(event) {
    dragRef.current = null;
    setDragging(false);
    setOffset(0);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  return (
    <div className="flex h-10 w-22 items-center justify-center rounded-full bg-gradient-to-b from-neutral-300 to-neutral-100 shadow-[inset_0_2px_4px_#00000026,0_1px_0_#ffffffcc]">
      <button
        type="button"
        aria-label="배경 움직이기: 좌우로 드래그하거나 방향키를 누르세요"
        title="Drag left or right"
        onPointerDown={(event) => {
          if (event.button !== 0) return;
          event.currentTarget.setPointerCapture(event.pointerId);
          dragRef.current = { x: event.clientX, triggered: false };
          setDragging(true);
        }}
        onPointerMove={(event) => {
          const drag = dragRef.current;
          if (!drag || drag.triggered) return;
          const distance = Math.max(-22, Math.min(22, event.clientX - drag.x));
          setOffset(distance);
          if (Math.abs(distance) >= 18) springBack(Math.sign(distance));
        }}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onLostPointerCapture={() => {
          dragRef.current = null;
          setDragging(false);
          setOffset(0);
        }}
        onKeyDown={(event) => {
          if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
          event.preventDefault();
          if (!event.repeat) springBack(event.key === "ArrowLeft" ? -1 : 1);
        }}
        style={{ transform: `translateX(${offset}px)` }}
        className={`flex size-8 touch-none items-center justify-center rounded-full border border-white/80 bg-gradient-to-b from-white to-neutral-200 text-neutral-500 shadow-[0_3px_5px_#00000026,inset_0_1px_2px_#ffffff] select-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-600 ${dragging ? "cursor-grabbing" : "cursor-grab transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"}`}
      >
      </button>
    </div>
  );
}
