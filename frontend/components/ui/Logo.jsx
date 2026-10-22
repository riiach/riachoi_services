"use client"

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function Logo({ className = "text-2xl", w = 26, h = 26 }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const logo = resolvedTheme === "dark" ? "/new_logo_white.png" : "/new_logo_black.png";
  const textColor = resolvedTheme === "dark" ? "text-white" : "text-foreground";

  return (
    <div className="items-center flex flex-row">
      <Image src={logo} alt="logo" width={w} height={h} className="mr-2" unoptimized />
      <span
        className={`font-logo text-{textColor} inline-flex items-baseline font-normal tracking-tight whitespace-nowrap ${className}`}
      >
        Ria Choi
      </span>
    </div>
  );
}
