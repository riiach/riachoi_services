"use client"

import React from "react";

const TagRound = ({ tag, useFor }) => {
  return (
    <div className={`w-fit h-fit px-3 py-1 flex items-center justify-center rounded-full text-white bg-accent font-semibold
    ${useFor === "blog" ? "text-lg" : "text-base"}
    `}>
      <p>{tag}</p>
    </div>
  );
};
export default TagRound;
