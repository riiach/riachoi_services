"use client";

import React from "react";
import TagRound from "./ui/TagRound";
import { useCategory } from "../context/category";

const Category = ({ categories = [] }) => {
  const { selectedCategory, setSelectedCategory } = useCategory();

  return (
    <div className="mb-12 flex h-auto w-full flex-col items-start justify-start gap-6">
      <h1 className="text-4xl font-bold">
        Explore by category
      </h1>

      <div className="flex h-auto w-full flex-row flex-wrap gap-4 overflow-auto">
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

        {categories.map((category) => (
          <button
            key={category._id}
            type="button"
            onClick={() => setSelectedCategory(category.title)}
          >
            <TagRound
              tag={category.title}
              useFor="blog"
              bg={
                selectedCategory === category.title
                  ? "bg-accent"
                  : "bg-primary"
              }
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Category;