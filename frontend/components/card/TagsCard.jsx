"use client"

import React from "react";
import Tag from "../ui/Tag";

const TagsCard = () => {
  return (
    <div className="w-full h-auto flex flex-col items-start justify-start gap-6 bg-primary p-8 rounded-2xl">
      <h1 className="text-2xl font-semibold">
        Tags
      </h1>
      <div className="w-full h-auto flex flex-row overflow-auto gap-4">
        <Tag
          tag="tag"
        />
      </div>
    </div>
  );
};
export default TagsCard;
