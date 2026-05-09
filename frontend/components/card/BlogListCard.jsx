"use client"

import React from "react";
import Tag from "../ui/Tag";
import Image from "next/image";

const BlogListCard = () => {
  return (
    <div className="w-flex-1 h-auto rounded-2xl flex flex-col gap-4 p-2 bg-primary">
      <div className="w-full aspect-video rounded-xl relative">
        <Image
          src="https://images.unsplash.com/photo-1773332611612-ffdaa753afb1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="thumbnail"
          fill
          className="object-cover rounded-xl"
        />
      </div>
      <div className="p-4">
        <div className="w-full h-auto flex flex-col gap-2">
          {/* Tags */}
          <div className="flex flex-row gap-2 overflow-auto">
            <Tag
              tag="Travel"
            />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-semibold text-foreground">
            The most breathtaking scenic hikes you need to experience
          </h1>
        </div>

        {/* Description */}
        <div className="w-full h-auto flex flex-row gap-2 mt-4">
          <p>by Storied Themes</p>
          <p>•</p>
          <p>September 17, 2026</p>
        </div>
      </div>

    </div>
  );
};
export default BlogListCard;
