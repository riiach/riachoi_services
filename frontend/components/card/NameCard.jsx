"use client"

import React from "react";
import Logo from "../ui/Logo";
import Social from "../ui/Social";

const NameCard = () => {


  return (
    <div className="w-full h-auto flex flex-col items-start justify-center gap-6 bg-primary rounded-2xl p-8 shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
      {/* Logo */}
      <div
        className="text-3xl font-bold tracking-tight text-foreground flex flex-row"
      >
        <Logo className="text-4xl sm:text-5xl" h={42} w={42} />
      </div>

      <p>
          Currently pursuing a degree in Computer Science at Oregon State University.
          <br />
          With years of hands-on experience, creativity, and passion for technology, I strive to build digital experiences that are both functional and meaningful.
          <br />
          What I do best is to understand a project&apos;s structure and find the right technology to for it.
          <br />
          I always plan carefully and think things through in depth.
      </p>
      <p className="-mt-4 text-accent">
          Don&apos;t be afraid to reach out!
      </p>
      <Social />
    </div>
  );
};
export default NameCard;
