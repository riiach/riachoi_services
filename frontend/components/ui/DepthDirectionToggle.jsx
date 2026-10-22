"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function DepthDirectionToggle({ direction, onDirectionChange }) {
  return (
    <div role="group" aria-label="배경 3D 방향" className="flex gap-3 rounded-full bg-gradient-to-b from-neutral-300 to-neutral-100 p-2 shadow-[inset_0_2px_4px_#00000026,0_1px_0_#ffffffcc]">
      {[
        { value: -1, label: "배경을 왼쪽으로 움직이기", Icon: ChevronLeft },
        { value: 1, label: "배경을 오른쪽으로 움직이기", Icon: ChevronRight },
      ].map(({ value, label, Icon }) => (
        <button
          key={value}
          type="button"
          aria-label={label}
          aria-pressed={direction === value}
          onClick={() => onDirectionChange(direction === value ? 0 : value)}
          className={`flex size-12 items-center justify-center rounded-full border border-white/70 text-neutral-600 transition-[box-shadow,transform,background] duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-600 motion-reduce:transition-none ${direction === value
            ? "translate-y-0.5 bg-gradient-to-b from-neutral-200 to-neutral-100 shadow-[inset_0_2px_5px_#00000026,0_1px_1px_#ffffff]"
            : "bg-gradient-to-b from-white to-neutral-200 shadow-[0_5px_7px_#00000026,inset_0_2px_2px_#ffffff] hover:-translate-y-0.5 active:translate-y-0.5"}`}
        >
          <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
        </button>
      ))}
    </div>
  );
}
