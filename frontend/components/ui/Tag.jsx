"use client"

import React from "react";

const Tag = ( { tag, theme } ) => {
  return (
    <div className={`w-fit h-fit px-3 py-1 flex items-center justify-center rounded-lg text-dark
    ${theme === "white" ? "bg-white" : ""}
    ${theme === "gray" ? "bg-gray-200" : ""}
    `}>
      <p>{tag}</p>
    </div>
  );
};
export default Tag;
