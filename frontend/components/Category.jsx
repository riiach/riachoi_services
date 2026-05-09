"use client"

import React from "react";
import TagRound from "./ui/TagRound";

const Category = () => {
  return (
    <div className="w-full h-auto flex flex-col items-start justify-start gap-4 mb-12">
      <h1
        className="text-4xl font-semibold"
      >
        Explore by category
      </h1>

      {/* ListCard */}
      <div className="w-full h-auto flex flex-row overflow-auto gap-4">
        <TagRound
          tag="All"
          useFor="blog"
        />
      </div>
    </div>
  );
};
export default Category;
