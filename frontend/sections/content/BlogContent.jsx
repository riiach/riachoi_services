"use client"

import React from "react";
import Tag from "../../components/ui/Tag"
import ShareWide from "../../components/card/ShareWide"
import RelatedContent from "../../components/card/RelatedContent";
import PortableContent from "../../components/PortableContent";

const BlogContent = ({ post }) => {
  const tags =
    post?.keyword
      ?.split(" ")
      .map((tag) => tag.trim())
      .filter(Boolean) || [];

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
    <div className="w-full h-auto flex flex-col gap-4">
      <div className="w-full h-auto flex flex-row flex-wrap gap-2">
        {tags.map((tag, index) => (
          <Tag
            key={index}
            tag={tag}
          />
        ))}
      </div>

      <div className="w-full md:w-4/5 h-auto flex flex-col gap-8 mb-6">
        <h1 className="text-5xl font-bold text-foreground leading-14">
          {post.title}
        </h1>
        <p className="text-xl font-semibold text-gray-500 font-mono">
          {post.summary}
        </p>
        <p className="text-foreground font-semibold">{post?.author?.name} • {formatDate(post?.publishedAt)}</p>
      </div>

      <div className="border border-b border-gray-200"></div>

      <div className="blog-content w-full">
        <PortableContent value={post.content} />
      </div>

      <ShareWide />
      <RelatedContent post={post}/>
    </div>
  );
};
export default BlogContent;
