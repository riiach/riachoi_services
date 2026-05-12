"use client"

import React from 'react'
import BlogListCard from "../../components/card/BlogListCard";
import { useCategory } from "../../context/category";

const BlogList = ({ posts = [] }) => {
    const { selectedCategory } = useCategory();
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

    return (
        <section className="w-full md:w-2/4 xl:w-2/3 grid grid-cols-1 xl:grid-cols-2 gap-8">
          {sortedPosts.map((post, index) => (
            <BlogListCard
              key={post.id || index}
              post={post}
            />
          ))}
        </section>
    )
}
export default BlogList
