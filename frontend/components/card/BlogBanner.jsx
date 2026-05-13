"use client"

import React from "react";
import Tag from "../ui/Tag";
import Social from "../ui/Social"
import Image from "next/image";
import { useCategory } from "../../context/category"
import { urlFor } from "../../sanity/image"

const BlogBanner = ( { posts=[], categories=[] }) => {
  const { selectedCategory } = useCategory();

  const defaultBanner = {
    title: "See what skills I use to create something amazing",
    description: "Welcome to my blog, where I share my knowledge and demonstrate how I'm a consistent learner for programming. I hope these contents could help those programmers who just started on learning.",
    image: "/profile.png",
    alt: "Blog banner",
  };

  const selectedCategoryData =
    selectedCategory === "all"
      ? null
      : categories.find((category) => category.title === selectedCategory);

  const currentBanner = selectedCategoryData
    ? {
      title: selectedCategoryData.heading || selectedCategoryData.title,
      description: selectedCategoryData.headingDescription || "",
      image:
        selectedCategoryData?.bannerImageUrl?.trim() ||
        (selectedCategoryData?.bannerImage?.asset?._ref
          ? urlFor(selectedCategoryData.bannerImage)
            .width(1200)
            .height(675)
            .url()
          : defaultBanner.image),
      alt: selectedCategoryData.bannerImageAlt || selectedCategoryData.title,
    }
    : defaultBanner;

  const currentPostCount =
    selectedCategory === "all"
      ? posts.length
      : posts.filter((post) =>
        post.categories?.some(
          (category) => category.title === selectedCategory
        )
      ).length;

  return (
    <div className="w-full h-fit p-2 bg-primary flex flex-col md:flex-row items-center justify-center rounded-2xl overflow-reverse mb-12 shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
      <div className="order-2 md:order-1 w-full md:w-1/2 h-full p-8 flex flex-col items-center justify-start gap-8">
        <Tag
          tag={`${currentPostCount} posts`}
          useFor="banner"
        />
        <h1
          className="text-4xl font-semibold text-center"
        >
          {currentBanner.title}
        </h1>
        <div className="w-full xl:w-[80%]">
          <p
            className="text-center text-lg"
          >
            {currentBanner.description}
          </p>
        </div>

        <Social />
      </div>

      <div className="order-1 md:order-2 relative w-full md:w-1/2 aspect-[16/9] rounded-2xl">
        <Image
          src={currentBanner.image}
          alt={currentBanner.alt || "Blog banner"}
          fill
          className="rounded-2xl object-cover"
        />
      </div>
    </div>
  );
};
export default BlogBanner;
