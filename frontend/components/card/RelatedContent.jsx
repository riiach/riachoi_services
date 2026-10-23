"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { urlFor } from "../../sanity/image";

export default function RelatedContent({ post }) {
  const scrollRef = useRef(null);
  const items = post?.relatedContents?.filter((item) => item?.slug) || [];
  if (!items.length) return null;

  function scroll(direction) {
    scrollRef.current?.scrollBy({ left: direction * 316, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  return (
    <section aria-label="Related contents" className="min-w-0 w-full rounded-2xl bg-primary p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-2xl font-semibold">Related contents</h2>
        {items.length > 1 && <div className="flex gap-2">
          <button type="button" aria-label="Previous related articles" onClick={() => scroll(-1)} className="rounded-full p-2 transition-opacity hover:opacity-60"><ChevronLeft className="size-5" /></button>
          <button type="button" aria-label="Next related articles" onClick={() => scroll(1)} className="rounded-full p-2 transition-opacity hover:opacity-60"><ChevronRight className="size-5" /></button>
        </div>}
      </div>
      <div ref={scrollRef} className="flex w-full snap-x snap-mandatory gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {items.map((item) => {
          const image = item.featuredImageUrl || (item.featuredImage ? urlFor(item.featuredImage).width(900).height(675).url() : null);
          return <Link key={item._id || item.slug} href={`/blog/${item.slug}`} className="group/card relative flex aspect-[4/3] w-[300px] max-w-full shrink-0 snap-start items-end overflow-hidden rounded-xl bg-neutral-800 p-5 text-white">
            {image && <Image src={image} alt="" fill sizes="300px" className="object-cover transition-transform duration-500 group-hover/card:scale-105 motion-reduce:transition-none" />}
            <div aria-hidden="true" className="absolute inset-0 bg-black/45" />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="relative z-10 w-full">
              {item.publishedAt && <p className="mb-2 text-xs text-white/80">{new Date(item.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}</p>}
              <h3 className="line-clamp-3 text-lg leading-snug font-semibold">{item.title}</h3>
            </div>
          </Link>;
        })}
      </div>
    </section>
  );
}
