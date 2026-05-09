"use client"

import React from "react";
import Tag from "../ui/Tag";

const TagsCard = ( {posts} ) => {
  const allKeywords = [
    ...new Set(
      posts.flatMap((post) =>
        post.keyword
          ?.split(" ")
          .map((word) => word.trim().toLowerCase()) || []
      )
    ),
  ];
  return (
    <div className="w-full h-auto flex flex-col items-start justify-start gap-6 bg-primary p-8 rounded-2xl">
      <h1 className="text-2xl font-semibold">
        Tags
      </h1>
      <div className="w-full h-auto flex flex-row flex-wrap gap-4">
        {allKeywords.map((tag, index) => (
          <Tag
            key={index}
            tag={tag}
          />
        ))}
      </div>
    </div>
  );
};
export default TagsCard;
