"use client"

import React, { useState } from "react";
import TagRound from "./ui/TagRound";
import { useCategory } from "../context/category"

const Category = ({ posts }) => {
  const { selectedCategory, setSelectedCategory } = useCategory();

  const allCategories = [
    ...new Set(
      posts.flatMap((post) =>
        post.categories?.map((category) => category.title) || []
      )
    ),
  ];

  return (
    <div className="w-full h-auto flex flex-col items-start justify-start gap-6 mb-12">
      <h1
        className="text-4xl font-semibold"
      >
        Explore by category
      </h1>

      {/* ListCard */}
      <div className="w-full h-auto flex flex-row overflow-auto gap-4 flex-wrap">
        <button
          type="button"
          onClick={() => setSelectedCategory("all")}
        >
          <TagRound
            tag="All"
            useFor="blog"
            bg={selectedCategory === "all" ? "bg-accent" : "bg-primary"}
          />
        </button>

        {allCategories.map((category, index) => (
          <button
          key={index}
          onClick={() => setSelectedCategory(`${category}`)}
          type="button"
          >
            <TagRound
              tag={category}
              bg={selectedCategory === `${category}` ? "bg-accent" : "bg-primary"}
            />
          </button>
        ))}
      </div>
    </div>
  );
};
export default Category;
