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
    <div className="w-full h-auto flex flex-col items-start justify-center gap-6 bg-primary rounded-2xl p-8 shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
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

      <p>
        Currently pursuing a degree in Computer Science at Oregon State University.
        <br />
        With years of hands-on experience, creativity, and passion for technology, I strive to build digital experiences that are both functional and meaningful.
        <br />
        What I do best is transforming a brand&apos;s vision into a modern, engaging, and user-focused website.
        <br />
        I am constantly exploring new technologies and better solutions to help my clients grow and succeed online.
        <br />
      </p>
      <p className="-mt-4 text-accent">
          Don&apos;t be afraid to reach out!
          <br />
          I&apos;m always open for collaborations with creative artists, designers, and developers :)
      </p>
      <Social />
    </div>
  );
};
export default NameCard;
