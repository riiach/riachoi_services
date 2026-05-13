"use client"

import React, { useContext } from "react";
import Tag from "../ui/Tag";
import { useSearchTag } from "../../context/searchTag";
import Link from "next/link"

const TagsCard = ( {posts} ) => {
  const { selectedTag, setSelectedTag } = useSearchTag();
  const allKeywords = [
    ...new Set(
      posts.flatMap(
        (post) =>
          post.keyword
            ?.split(" ")
            .map((word) => word.trim())
            .filter(Boolean) || []
      )
    ),
  ];
  return (
    <div className="w-full h-auto flex flex-col items-start justify-start gap-6 bg-primary p-8 rounded-2xl shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
      <h1 className="text-2xl font-bold">
        Tags
      </h1>
      <div className="w-full h-auto flex flex-row flex-wrap gap-4">
        {allKeywords.map((tag, index) => (
          <Link
            href={`/search?tag=${encodeURIComponent(tag)}`}
            key={index}
            onClick={() => setSelectedTag(tag)}
            className="cursor-pointer"
          >
            <Tag
              tag={tag}
            />
          </Link>

        ))}
      </div>
    </div>
  );
};
export default TagsCard;
