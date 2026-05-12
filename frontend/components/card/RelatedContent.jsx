"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { urlFor } from "../../sanity/image";

const RelatedContent = ({ post }) => {
  const scrollRef = useRef(null);

  const scrollCarousel = (direction) => {
    if (!scrollRef.current) return;

    const scrollAmount = 320;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const month = date.toLocaleString("en-US", {
      month: "long",
    });

    const day = date.getDate();

    const year = date.getFullYear();

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

    return `${month} ${day}${getOrdinal(day)}, ${year}`;
  };


  return (
    <div className="group relative w-full h-fit p-6 flex flex-col bg-primary rounded-2xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
      <h1 className="text-2xl font-semibold text-foreground mb-4">
        Related contents
      </h1>

      {post?.relatedContents?.length > 0 &&
        <>
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
        </>
      }

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
        {post?.relatedContents?.map((item) => {
          const imageUrl =
          item?.featuredImageUrl || (item?.featuredImage ? urlFor(item.featuredImage).width(1200).height(675).url() : null);

          return (
              <div
                key={item.id}
                className="
              min-w-[260px] md:min-w-[300px]
              flex flex-col h-auto
              items-start justify-start gap-2
              group/card
            "
              >
                <Link
                  href={`/blog/${item.slug}`}
                  className="relative w-full h-36 aspect-video shrink-0 overflow-hidden rounded-xl"
                >
                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover
                  group-hover/card:scale-105
                  transition-transform duration-500"
                    />
                  )}
                </Link>

                <Link
                  href={`/blog/${item.slug}`}
                  className="
                text-lg font-semibold line-clamp-2 text-foreground
                group-hover/card:text-accent
                transition-all duration-300 ease-in-out
              "
                >
                  {item.title}
                </Link>

                <p className="text-sm font-semibold text-foreground/70">
                  {formatDate(item.publishedAt) || "Unknown date"}
                </p>
              </div>
          )
        })}
      </div>
    </div>
  );
};

export default RelatedContent;