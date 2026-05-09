"use client"

import React from "react";
import Tag from "../ui/Tag";
import Image from "next/image";
import Link from "next/link";

const BlogListCard = ({post}) => {
  const tags = post?.keyword?.split(" ") || [];
  
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="w-flex-1 bg-primary flex h-fit flex-col gap-4 rounded-2xl p-2 shadow-[0_1px_2px_rgba(0,0,0,0.08)] group"
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-xl">
        {post?.featuredImage && (
          <Image
            src={post.featuredImage}
            alt={post.title || "Blog Thumbnail"}
            fill
            className="rounded-xl object-cover transition-all duration-200 ease-in group-hover:scale-102"
          />
        )}
      </div>
      <div className="p-4">
        <div className="flex h-auto w-full flex-col gap-2">
          <div className="w-auto h-auto flex flex-row gap-2 overflow-auto flex-wrap">
            {tags.map((tag, index) => (
              <div key={index} className="flex flex-row gap-2 overflow-auto">
                <Tag tag={tag} />
              </div>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-foreground text-2xl font-semibold group-hover:text-accent transition-all duration-200 ease-in-out">
            {post.title}
          </h1>
        </div>

        {/* Description */}
        <div className="mt-4 flex h-auto w-full flex-row gap-2">
          <p>{post?.author?.name}</p>
          <p>•</p>
          <p>{post.publishedAt}</p>
        </div>
      </div>
    </Link>
  );
};
export default BlogListCard;
