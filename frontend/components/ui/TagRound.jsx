"use client"

import React from "react";

const TagRound = ({ tag, useFor }) => {
  return (
    <div className={`w-fit h-fit px-4 py-2 flex items-center justify-center rounded-full text-foreground bg-primary font-semibold
    hover:bg-accent hover:text-white transition-all duration-400 ease-in-out
    ${useFor === "blog" ? "text-lg" : "text-base"}
    `}>
      <p>{tag}</p>
    </div>
  );
};
export default TagRound;
