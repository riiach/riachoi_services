"use client"

import React from "react";
import Tag from "../ui/Tag";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Pin } from "lucide-react";
import { urlFor } from "../../sanity/image";

const BlogListCard = ({post}) => {
  const tags = post?.keyword?.split(" ") || [];
  const pinned = post?.pinned === 1 || post?.pinned === "1" || post?.pinned === true;
  const pathname = usePathname();
  const isHome = pathname === "/";
  const imageUrl =
    post?.featuredImageUrl ||
    (post?.featuredImage
      ? urlFor(post.featuredImage).width(800).height(450).url()
      : null);

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
    <Link
      href={`/blog/${post.slug}`}
      className="bg-primary flex h-fit flex-col gap-4 rounded-2xl p-2 shadow-[0_1px_2px_rgba(0,0,0,0.08)] group"
    >
        {imageUrl && (
          <div
          className="relative aspect-video w-full overflow-hidden rounded-xl"
          >
            <Image
              src={imageUrl}
              alt={post.title || "Blog Thumbnail"}
              fill
              className="rounded-xl object-cover transition-all duration-200 ease-in group-hover:scale-102"
            />
            {pinned && !isHome && (
              <div className="absolute top-4 right-1 w-10 h-10">
                <Pin className="w-6 h-6 text-[#eeeeee] rotate-45" />
              </div>
            )}
          </div>
        )}
      </div>
      <div className="pt-4 px-4 flex flex-col justify-between items-between">
        <div className="flex h-auto w-full flex-col gap-2">
          <div className="w-auto h-auto flex flex-row gap-2 overflow-auto flex-wrap">
            {tags.map((tag, index) => (
              <div key={index} className="flex flex-row gap-2 overflow-auto">
                <Tag tag={tag} />
              </div>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-foreground text-2xl font-semibold group-hover:text-accent transition-all duration-200 ease-in-out ">
            {post.title}
          </h1>
        </div>

        {/* Description */}
        <div className="mt-4 mb-4 flex w-full flex-row gap-2">
          <p>{post?.author?.name}</p>
          <p>•</p>
          <p>{formatDate(post.publishedAt)}</p>
        </div>
      </div>
    </Link>
  );
};
export default BlogListCard;
