"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../../sanity/image";

const ListCard = ({ posts = [] }) => {
  // Filters pinned/popular posts
  const pinnedPosts = posts.filter(
    (post) =>
      post.pinned === 1 ||
      post.pinned === "1" ||
      post.pinned === true
  );

  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = date.getDate();

    const getOrdinal = (n) => {
      if (n > 3 && n < 21) return "th";

      switch (n % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    const month = date.toLocaleString("en-US", {
      month: "long",
    });

    const year = date.getFullYear();

    return `${month} ${day}${getOrdinal(day)}, ${year}`;
  }



  return (
    <div className="justify-center bg-primary flex h-auto w-full flex-col items-start gap-6 rounded-2xl p-8 shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
      <h1 className="text-2xl font-bold">
        Popular posts
      </h1>

      <div className="flex w-full flex-col gap-4">
        <div className="flex h-auto w-full flex-col items-center gap-4">
          {pinnedPosts.map((post) => {
            const imageUrl =
              post?.featuredImageUrl ||
              (post?.featuredImage
                ? urlFor(post.featuredImage)
                    .width(800)
                    .height(450)
                    .url()
              : null);
      
            return (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex w-full flex-row items-center gap-4 cursor-pointer"
              >
                {imageUrl && (
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
                    <Image
                      src={imageUrl}
                      alt={post.title}
                      fill
                      unoptimized
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <h1 className="line-clamp-2 text-lg font-semibold transition group-hover:text-accent">
                    {post.title}
                  </h1>

                  <p className="text-sm font-semibold">
                    {formatDate(post.publishedAt) || "Unknown date"}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default ListCard;
