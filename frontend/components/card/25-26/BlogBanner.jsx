"use client"

import React from "react";
import Tag from "../../ui/Tag";
import Social from "../../ui/Social"
import Image from "next/image";
import { useCategory } from "../../../context/category"
import { urlFor } from "../../../sanity/image"

const BlogBanner = ( { posts=[], categories=[] }) => {
  const { selectedCategory } = useCategory();

  const defaultBanner = {
    title: "See what skills I use to create something amazing",
    description: "Welcome to my blog, where I share my knowledge and demonstrate how I'm a consistent learner for programming. I hope these contents could help those programmers who just started on learning.",
    image: "/profile.jpg",
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
    <div className="overflow-reverse backdrop-blur-x mb-12 flex h-fit w-full flex-col items-center justify-center rounded-2xl border border-white/45 bg-white/35 p-6 shadow-[0_12px_48px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.5)] md:flex-row">
      <div className="order-2 flex h-full w-full flex-col items-center justify-start gap-8 p-8 md:order-1 md:w-1/2">
        <Tag tag={`${currentPostCount} posts`} useFor="banner" />
        <h1 className="text-center text-4xl font-semibold">
          {currentBanner.title}
        </h1>
        <div className="w-full xl:w-[80%]">
          <p className="text-center text-lg">{currentBanner.description}</p>
        </div>

        <Social />
      </div>

      <div className="relative order-1 aspect-[16/9] w-full rounded-2xl md:order-2 md:w-1/2">
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
