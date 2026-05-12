"use client"

import React from "react";
import Link from "next/link";

const AnimatedButton = ({ type = "button", text, href, w = "w-fit", h = "py-4" }) => {
    if (href) {
        return (
          <Link
            href={href}
            className={`${w} ${h} group bg-accent relative flex h-fit cursor-pointer items-center justify-center overflow-hidden rounded-full px-4 md:px-6 text-white whitespace-nowrap`}
          >
            <span className="block transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-[150%]">
              {text}
            </span>

            <span className="absolute inset-0 flex translate-y-[150%] items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0">
              {text}
            </span>
          </Link>
        )
    }

   return (
         <button
           type={type}
           className={`${w} ${h} group bg-accent relative flex h-fit cursor-pointer items-center justify-center overflow-hidden rounded-full px-4 md:px-6 text-white whitespace-nowrap`}
         >
           <span className="block text-center transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-[150%]">
              {text}
           </span>

           <span className="absolute inset-0 flex items-center justify-center whitespace-nowrap transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] translate-y-[150%] group-hover:translate-y-0">
              {text}
           </span>
         </button>
   );
};
export default AnimatedButton;
