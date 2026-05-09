"use client"

import React from "react";
import Tag from "../../../components/ui/Tag"
import ShareWide from "../../../components/card/ShareWide"
import RelatedContent from "../../../components/card/RelatedContent";

const BlogContent = ({posts, post, content}) => {
  const tags = post.keyword
    ?.split(" ") || []
  const blogContent =
    content?.post?.content ||
    content?.content ||
    post?.content ||
    "";

  const cleanedContent = blogContent.replace(/<p><br><\/p>/g, "");

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
        <p className="text-xl font-semibold text-gray-400">
          {post.summary}
        </p>
        <p className="text-foreground font-semibold">{post?.author.name} • {post?.publishedAt}</p>
      </div>

      <div className="border border-b border-gray-200"></div>

      <div
        className="blog-content max-w-4xl mx-auto"
        dangerouslySetInnerHTML={{
          __html: cleanedContent,
        }}
      />
      <ShareWide />
      <RelatedContent posts={posts} post={post}/>
    </div>
  );
};
export default BlogContent;
