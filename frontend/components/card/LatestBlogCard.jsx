"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Tag from "../ui/Tag";
import TextAction from "../ui/TextAction";

function PostContent({ post, compact, outgoing = false }) {
  const tags = post.keyword?.split(",").map((tag) => tag.trim()).filter(Boolean).slice(0, 3) || [];
  return (
    <>
      <div className="mb-3 flex flex-wrap gap-2">
        {tags.map((tag) => <Tag key={tag} useFor="main_banner" tag={tag} />)}
      </div>
      <Link href={`/blog/${post.slug}`} tabIndex={outgoing ? -1 : undefined} className="block rounded-lg transition-opacity duration-300 hover:opacity-70 focus-visible:outline-2 focus-visible:outline-white">
        <h2 className={`line-clamp-2 font-semibold leading-tight ${compact ? "text-xl" : "text-3xl"}`}><span>{post.title}</span></h2>
        {post.summary && <p className={`mt-2 text-sm leading-relaxed text-white/85 ${compact ? "line-clamp-2" : "line-clamp-3"}`}>{post.summary}</p>}
      </Link>
    </>
  );
}

export default function LatestBlogCard({ posts = [], compact = false }) {
  const [slide, setSlide] = useState({ index: 0, previous: null, direction: 1, sequence: 0 });
  const count = posts.length;
  const index = slide.index % Math.max(count, 1);
  const post = posts[index];
  const previous = slide.previous === null ? null : posts[slide.previous % Math.max(count, 1)];

  useEffect(() => {
    if (slide.previous === null) return;
    const timer = window.setTimeout(() => setSlide((current) => ({ ...current, previous: null })), 450);
    return () => window.clearTimeout(timer);
  }, [slide.sequence, slide.previous]);

  function changeSlide(direction) {
    setSlide((current) => ({
      index: (current.index + direction + count) % count,
      previous: current.index,
      direction,
      sequence: current.sequence + 1,
    }));
  }

  return (
    <section aria-label="Latest blog posts" className={`relative isolate w-full overflow-hidden rounded-3xl bg-slate-900 text-white shadow-lg ${compact ? "h-full min-h-0" : "min-h-96"}`} style={{ "--slide-direction": slide.direction }}>
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        {previous?.imageUrl && <div key={`previous-${slide.sequence}`} className="blog-image-out absolute inset-0"><Image src={previous.imageUrl} alt="" fill sizes="(min-width: 768px) 342px, 100vw" className="object-cover" /></div>}
        {post?.imageUrl && <div key={`current-${slide.sequence}`} className={`absolute inset-0 ${slide.sequence ? "blog-image-in" : ""}`}><Image src={post.imageUrl} alt="" fill sizes="(min-width: 768px) 342px, 100vw" className="object-cover" /></div>}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/35" />
      </div>
      <div className="flex h-full min-h-0 flex-col gap-3 p-5">
        <TextAction href="/blog" className="shrink-0 self-end text-white">Go Read My Blog</TextAction>
        {post ? (
          <>
            <div className="grid min-h-0 flex-1 items-end">
              {previous && <div key={`out-${slide.sequence}`} aria-hidden="true" inert className="blog-slide-out pointer-events-none col-start-1 row-start-1 min-w-0"><PostContent post={previous} compact={compact} outgoing /></div>}
              <div key={`in-${slide.sequence}`} aria-live="polite" aria-atomic="true" className={`col-start-1 row-start-1 min-w-0 ${slide.sequence ? "blog-slide-in" : ""}`}><PostContent post={post} compact={compact} /></div>
            </div>
            {count > 1 && (
              <div className="flex shrink-0 items-center justify-between gap-2">
                <p className="text-xs text-white/75">{index + 1} / {count}</p>
                <div className="flex gap-2">
                  <button type="button" aria-label="Previous blog post" onClick={() => changeSlide(-1)} className="cursor-pointer rounded-full border border-white/40 bg-white/15 p-1.5 backdrop-blur-md transition-opacity duration-300 hover:opacity-60 focus-visible:outline-2 focus-visible:outline-white"><ChevronLeft aria-hidden="true" className="size-4" /></button>
                  <button type="button" aria-label="Next blog post" onClick={() => changeSlide(1)} className="cursor-pointer rounded-full border border-white/40 bg-white/15 p-1.5 backdrop-blur-md transition-opacity duration-300 hover:opacity-60 focus-visible:outline-2 focus-visible:outline-white"><ChevronRight aria-hidden="true" className="size-4" /></button>
                </div>
              </div>
            )}
          </>
        ) : <p className="mt-auto text-sm">New stories are coming soon.</p>}
      </div>
    </section>
  );
}
