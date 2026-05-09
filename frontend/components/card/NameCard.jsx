"use client"

import React, { useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import Social from "../ui/Social";

const NameCard = () => {
  const { resolvedTheme } = useTheme();

  const logoSrc =
    resolvedTheme === "dark"
      ? "/Ria Choi White.svg"
      : "/logo.svg";
  const isDark = resolvedTheme === "dark";

  return (
    <div className="w-full h-auto flex flex-col items-start justify-center gap-6 bg-primary rounded-2xl p-8">
      {/* Logo */}
      <div
        className="text-3xl font-bold tracking-tight text-foreground flex flex-row"
      >
        <Image
          key={logoSrc}
          src={logoSrc}
          alt="RiaChoi Text Logo"
          width={180}
          height={35}
          priority
          className="mr-2 h-[35px] w-auto"
        />
        <span className="text-accent">.</span>
      </div>

      <p>This is the inner description of the namecard</p>
      <Social />
    </div>
  );
};
export default NameCard;
