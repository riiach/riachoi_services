"use client"

import React from "react";

const AnimatedButton = ({ type = "button", text }) => {
  return (
    <button
      type={type}
      className="group bg-accent relative h-fit w-fit cursor-pointer overflow-hidden rounded-full px-6 py-4 text-white"
    >
      <span className="block transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-[150%]">
        {text}
      </span>

      <span className="absolute inset-0 outline-none ring-0 focus:ring-0 flex translate-y-[150%] items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0">
        {text}
      </span>
    </button>
  );
};
export default AnimatedButton;
