"use client"

import React from "react";

const SubscribeButton = () => {
  return (
    <div className="group relative w-fit h-fit px-6 py-4 bg-dark text-white rounded-full overflow-hidden cursor-pointer">

      <span className="block transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-[150%]">
        Subscribe
      </span>

      <span className="absolute inset-0 flex items-center justify-center translate-y-[150%] transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0">
        Subscribe
      </span>

    </div>
  );
};
export default SubscribeButton;
