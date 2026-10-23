"use client";

import React, { useState } from "react";
import BlogListCard from "../../components/card/BlogListCard";
import { useCategory } from "../../context/category";

import { matchesCategory } from "../../lib/util/category-filter";

const PAGE_SIZE = 10;

const BlogList = ({ posts = [] }) => {
  const { selectedCategory, selectedSubCategory } = useCategory();
  return <FilteredBlogList key={JSON.stringify([selectedCategory, selectedSubCategory])} posts={posts} selectedCategory={selectedCategory} selectedSubCategory={selectedSubCategory} />;
};

function FilteredBlogList({ posts, selectedCategory, selectedSubCategory }) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const filteredPosts = posts.filter((post) => matchesCategory(post, selectedCategory, selectedSubCategory));

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
    <section className="min-w-0 w-full">
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
            className="rounded-full button-3d px-6 py-3 text-base font-semibold transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
          >
            View More
          </button>
        </div>
      )}
    </section>
  );
};

export default BlogList;
