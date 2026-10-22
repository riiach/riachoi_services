"use client"

import React from "react";

const Tag = ( { tag, useFor } ) => {
  return (
    <div className={`w-fit h-fit px-3 py-1 flex items-center justify-center rounded-lg text-[#111111] bg-secondary font-semibold font-mono tracking-wide
    ${useFor === "banner" ? "text-lg" : "text-base"}
    `}>
      <p>{tag}</p>
    </div>
  );
};
export default Tag;
