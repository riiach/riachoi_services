"use client"

import React from "react";
import ArticleNavigation from "../../components/ArticleNavigation";
import Tag from "../../components/ui/Tag"
import ShareWide from "../../components/card/ShareWide"
import RelatedContent from "../../components/card/RelatedContent";
import ContentBanner from "../../components/card/ContentBanner";
import PortableContent from "../../components/PortableContent";

const BlogContent = ({ post, showExtras = true }) => {
  const tags =
    post?.keyword
      ?.split(",")
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
    <article className="flex h-auto w-full min-w-0 flex-col gap-4 [overflow-wrap:anywhere]">
      <header className="order-2 mb-3 flex min-w-0 flex-col items-start gap-4 md:order-1">
        <h1 className="text-foreground text-3xl leading-tight font-bold md:text-4xl xl:text-5xl">{post.title}</h1>
        {post.summary && <p className="text-lg leading-relaxed text-foreground/65">{post.summary}</p>}
        <div className="flex w-full flex-wrap gap-2">{tags.map((tag, index) => <Tag key={index} tag={tag} />)}</div>
        <p className="text-sm text-foreground/65">{post?.author?.name} • {formatDate(post?.publishedAt)}</p>
      </header>
      <div className="order-1 md:order-2"><ContentBanner post={post} /></div>
      <div className="blog-content order-3 min-w-0 w-full">
        <PortableContent value={post.content} />
      </div>
      {showExtras && <ArticleNavigation value={post.content} />}
      {showExtras && <div className="order-4"><ShareWide title={post.title} /></div>}
      {showExtras && <div className="order-5 min-w-0"><RelatedContent post={post} /></div>}
    </article>
  );
};
export default BlogContent;
