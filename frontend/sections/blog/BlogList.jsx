"use client";

import React, { useEffect, useState } from "react";
import BlogListCard from "../../components/card/BlogListCard";
import { useCategory } from "../../context/category";

const PAGE_SIZE = 10;

const BlogList = ({ posts = [] }) => {
  const { selectedCategory } = useCategory();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [selectedCategory, posts]);

  const filteredPosts =
    selectedCategory === "all"
      ? posts
      : posts.filter((post) =>
          post.categories?.some(
            (category) => category.title === selectedCategory
          )
        );

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    const aPinned =
      a.pinned === 1 ||
      a.pinned === "1" ||
      a.pinned === true;

    const bPinned =
      b.pinned === 1 ||
      b.pinned === "1" ||
      b.pinned === true;

    return Number(bPinned) - Number(aPinned);
  });

  const visiblePosts = sortedPosts.slice(0, visibleCount);
  const hasMore = visibleCount < sortedPosts.length;

  return (
    <section className="w-full md:w-2/4 xl:w-2/3">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {visiblePosts.map((post, index) => (
          <BlogListCard key={post.id || index} post={post} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-10 flex w-full justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
            className="rounded-full bg-accent px-6 py-3 text-base font-semibold text-white transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            View More
          </button>
        </div>
      )}
    </section>
  );
};

export default BlogList;
