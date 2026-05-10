"use client"

import React from "react";
import Link from "next/link";

const AnimatedButton = ({ type = "button", text, href, w, h }) => {
    if (href) {
        return (
            <Link
                href={href}
                className={`${w === "w-full" ? "w-full" : "w-fit"} ${h === "py-2" ? "py-2" : "py-4"} group bg-accent relative h-fit cursor-pointer overflow-hidden rounded-full px-6 text-white`}
            >
              <span className="block transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-[150%]">
                {text}
              </span>

                <span className="absolute inset-0 outline-none ring-0 focus:ring-0 flex translate-y-[150%] items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0">
                {text}
              </span>
            </Link>
        )
    }

   return (
          <button
              type={type}
              className={`${w === "w-full" ? "w-full" : "w-fit"} ${h === "py-2" ? "py-2" : "py-4"} group bg-accent relative h-fit cursor-pointer overflow-hidden rounded-full px-6 text-white`}
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
