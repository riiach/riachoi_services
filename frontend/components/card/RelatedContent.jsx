"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const RelatedContent = ({ posts = [], post }) => {
  const scrollRef = useRef(null); // Stores the carousel DOM element

  const getWords = (text = "") => {
    return text
      .toLowerCase() // Converts text to lowercase
      .replace(/[^\w\s]/g, "") // Removes punctuation
      .split(/\s+/) // Splits text by spaces
      .filter((word) => word.length > 3); // Removes short words
  };

  const currentWords = getWords(post?.seoDescription); // Gets words from current post SEO description

  const relatedPosts = posts
    .filter((item) => item.id !== post?.id) // Removes the current post
    .map((item) => {
      const itemWords = getWords(item?.seoDescription); // Gets words from each post SEO description

      const matchedWords = itemWords.filter((word) =>
        currentWords.includes(word)
      ); // Finds matching words

      return {
        ...item,
        matchedWords,
        matchCount: matchedWords.length,
      };
    })
    .filter((item) => item.matchCount > 0) // Keeps only related posts
    .sort((a, b) => b.matchCount - a.matchCount); // Sorts by most related first

  const scrollCarousel = (direction) => {
    if (!scrollRef.current) return; // Prevents error when ref is not ready

    scrollRef.current.scrollBy({
      left: direction === "left" ? -320 : 320, // Moves carousel left or right
      behavior: "smooth", // Adds smooth scrolling animation
    });
  };

  return (
    <div className="group relative w-full h-fit p-6 flex flex-col bg-primary rounded-2xl overflow-hidden">
      <h1 className="text-2xl font-semibold text-foreground mb-4">
        Related contents
      </h1>

      {/* Left button - desktop only */}
      <button
        type="button"
        onClick={() => scrollCarousel("left")}
        className="
          hidden md:flex
          absolute left-4 top-1/2 z-20
          w-12 h-12 rounded-full
          bg-white text-black
          items-center justify-center
          shadow-lg
          opacity-0 group-hover:opacity-100
          transition-all duration-300
          hover:scale-105
        "
      >
        <ChevronLeft size={26} />
      </button>

      {/* Right button - desktop only */}
      <button
        type="button"
        onClick={() => scrollCarousel("right")}
        className="
          hidden md:flex
          absolute right-4 top-1/2 z-20
          w-12 h-12 rounded-full
          bg-white text-black
          items-center justify-center
          shadow-lg
          opacity-0 group-hover:opacity-100
          transition-all duration-300
          hover:scale-105
        "
      >
        <ChevronRight size={26} />
      </button>

      <div
        ref={scrollRef}
        className="
          w-full h-auto
          flex flex-row gap-4
          overflow-x-auto
          scroll-smooth
          scrollbar-hide
        "
      >
        {relatedPosts.map((item) => (
          <div
            key={item.id}
            className="
              min-w-[260px] md:min-w-[300px]
              flex flex-col h-auto
              items-start justify-start gap-2
              group/card
            "
          >
            <div className="relative w-full h-36 aspect-video shrink-0 overflow-hidden rounded-xl">
              <Image
                src={item.featuredImage}
                alt={item.title}
                fill
                unoptimized
                className="
                  object-cover
                  group-hover/card:scale-105
                  transition-transform duration-500
                "
              />
            </div>

            <h1
              className="
                text-lg font-semibold line-clamp-2 text-foreground
                group-hover/card:text-accent
                transition-all duration-300 ease-in-out
              "
            >
              {item.title}
            </h1>

            <p className="text-sm font-semibold text-foreground/70">
              {item.publishedAt}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedContent;