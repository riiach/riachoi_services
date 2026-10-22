"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Tag from "../ui/Tag";
import styles from "./LatestBlogCard.module.css";

function PostContent({ post, compact, outgoing = false }) {
  const tags = post.keyword?.split(/\s+/).filter(Boolean).slice(0, 3) || [];
  return (
    <>
      <div className={`${styles.tags} ${compact ? styles.compactTags : ""}`}>
        {tags.map((tag) => <Tag key={tag} tag={tag} />)}
      </div>
      <Link href={`/blog/${post.slug}`} tabIndex={outgoing ? -1 : undefined} className={styles.postLink}>
        <h2 className={`${styles.title} ${compact ? styles.compactTitle : ""}`}><span className={styles.underline}>{post.title}</span></h2>
        {post.summary && <p className={`${styles.summary} ${compact ? styles.compactSummary : ""}`}>{post.summary}</p>}
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
    <section aria-label="Latest blog posts" className={`${styles.card} ${compact ? styles.compact : ""}`} style={{ "--slide-direction": slide.direction }}>
      <div aria-hidden="true" className={styles.background}>
        {previous?.imageUrl && <div key={`previous-${slide.sequence}`} className={`${styles.imageLayer} ${styles.imageOut}`}><Image src={previous.imageUrl} alt="" fill sizes="(min-width: 768px) 342px, 100vw" className="object-cover" /></div>}
        {post?.imageUrl && <div key={`current-${slide.sequence}`} className={`${styles.imageLayer} ${slide.sequence ? styles.imageIn : ""}`}><Image src={post.imageUrl} alt="" fill sizes="(min-width: 768px) 342px, 100vw" className="object-cover" /></div>}
        <div className={styles.shade} />
      </div>
      <div className={styles.body}>
        <Link href="/blog" className={`${styles.blogLink} ${styles.controls}`}>
          <span className={styles.underline}>Go Read My Blog</span>
          <span className={styles.linkIcon}><ArrowUpRight aria-hidden="true" className="size-4" /></span>
        </Link>
        {post ? (
          <>
            <div className={styles.content}>
              {previous && <div key={`out-${slide.sequence}`} aria-hidden="true" inert className={`${styles.post} ${styles.slideOut}`}><PostContent post={previous} compact={compact} outgoing /></div>}
              <div key={`in-${slide.sequence}`} aria-live="polite" aria-atomic="true" className={`${styles.post} ${slide.sequence ? styles.slideIn : ""}`}><PostContent post={post} compact={compact} /></div>
            </div>
            {count > 1 && (
              <div className={styles.navigation}>
                <p className={styles.counter}>{index + 1} / {count}</p>
                <div className={`${styles.arrows} ${styles.controls}`}>
                  <button type="button" aria-label="Previous blog post" onClick={() => changeSlide(-1)} className={styles.arrowButton}><ChevronLeft aria-hidden="true" className="size-4" /></button>
                  <button type="button" aria-label="Next blog post" onClick={() => changeSlide(1)} className={styles.arrowButton}><ChevronRight aria-hidden="true" className="size-4" /></button>
                </div>
              </div>
            )}
          </>
        ) : <p className={styles.empty}>New stories are coming soon.</p>}
      </div>
    </section>
  );
}
