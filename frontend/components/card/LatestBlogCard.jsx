"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Tag from "../ui/Tag";

export default function LatestBlogCard({ posts = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const index = activeIndex % Math.max(posts.length, 1);
  const post = posts[index];
  const tags = post?.keyword?.split(/\s+/).filter(Boolean).slice(0, 3) || [];

  return (
    <section aria-label="Latest blog posts" className="relative isolate flex min-h-96 w-full flex-col overflow-hidden rounded-3xl bg-slate-900 text-white shadow-lg">
      {post?.imageUrl && (
        <Image key={post.imageUrl} src={post.imageUrl} alt="" fill sizes="(min-width: 768px) 342px, 100vw" className="-z-20 object-cover" />
      )}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/50 to-black/35" />
      <Link href="/blog" className="ml-auto flex items-center gap-2 p-5 text-sm font-medium hover:underline focus-visible:outline-2 focus-visible:outline-white">
        Go Read My Blog
        <span className="rounded-full border border-white/40 bg-white/20 p-2 backdrop-blur-md"><ArrowUpRight aria-hidden="true" className="h-4 w-4" /></span>
      </Link>
      {post ? (
        <div className="mt-auto p-5 pt-12">
          <div className="mb-3 flex flex-wrap gap-2">{tags.map((tag) => <Tag key={tag} tag={tag} />)}</div>
          <div aria-live="polite" aria-atomic="true">
            <Link href={`/blog/${post.slug}`} className="group block rounded-lg focus-visible:outline-2 focus-visible:outline-white">
              <h2 className="text-2xl leading-tight font-semibold group-hover:underline">{post.title}</h2>
              {post.summary && <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/85">{post.summary}</p>}
            </Link>
          </div>
          {posts.length > 1 && (
            <div className="mt-5 flex items-center justify-between">
              <p className="text-xs text-white/75">{index + 1} / {posts.length}</p>
              <div className="flex gap-2">
                <button type="button" aria-label="Previous blog post" onClick={() => setActiveIndex((index + posts.length - 1) % posts.length)} className="rounded-full border border-white/40 bg-white/15 p-2 backdrop-blur-md transition-colors hover:bg-white/30"><ChevronLeft aria-hidden="true" className="h-4 w-4" /></button>
                <button type="button" aria-label="Next blog post" onClick={() => setActiveIndex((index + 1) % posts.length)} className="rounded-full border border-white/40 bg-white/15 p-2 backdrop-blur-md transition-colors hover:bg-white/30"><ChevronRight aria-hidden="true" className="h-4 w-4" /></button>
              </div>
            </div>
          )}
        </div>
      ) : <p className="mt-auto p-5 text-sm">New stories are coming soon.</p>}
    </section>
  );
}
