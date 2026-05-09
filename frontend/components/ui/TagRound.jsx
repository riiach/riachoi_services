"use client"

import React from "react";

const TagRound = ({ tag, useFor, bg = "bg-primary" }) => {
  return (
    <div className={`w-fit h-fit px-4 py-2 flex items-center justify-center rounded-full font-semibold
    hover:bg-accent hover:text-white transition-all duration-400 ease-in-out
    ${useFor === "blog" ? "text-lg" : "text-base"}
    ${bg === "bg-primary" ? "bg-primary text-foreground" : "bg-accent text-white"}
    `}>
      <p>{tag}</p>
    </div>
  );
};
export default TagRound;
