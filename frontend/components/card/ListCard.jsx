"use client"

import React from "react";
import Image from "next/image";

const ListCard = ({ posts = [] }) => {
  const pinnedPosts = posts.filter((post) => post.pinned === 1 || post.pinned === "1" || post.pinned === true);
  console.log("posts:", posts);
  console.log("pinnedPosts:", pinnedPosts);

  return (
    <div className="justify-center bg-primary flex h-auto w-full flex-col items-start gap-6 rounded-2xl p-8">
      <h1 className="text-2xl font-semibold">Popular posts</h1>
      <div className="flex w-full flex-col gap-4">
        <div className="flex h-auto w-full flex-col items-center gap-4">
          {pinnedPosts.map((post) => (
            <div key={post.id} className="flex w-full flex-row items-center gap-4">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <h1 className="text-lg font-semibold line-clamp-2">
                  {post.title}
                </h1>

                <p className="text-sm font-semibold">{post.publishedAt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ListCard;
