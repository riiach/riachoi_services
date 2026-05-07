"use client"

import React from "react";

const Tag = ( { tag } ) => {
  return (
    <div className="w-fit h-fit px-3 py-1 flex items-center justify-center bg-gray-200 rounded-lg">
      <p>{tag}</p>
    </div>
  );
};
export default Tag;
