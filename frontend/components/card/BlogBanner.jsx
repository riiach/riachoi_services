"use client"

import React from "react";
import Tag from "../ui/Tag";
import { matchesCategory } from "../../lib/util/category-filter";
import Image from "next/image";
import { useCategory } from "../../context/category"
import { urlFor } from "../../sanity/image"

const BlogBanner = ( { posts=[], categories=[] }) => {
  const { selectedCategory, selectedSubCategory } = useCategory();

  const defaultBanner = {
    title: "See how I build and work on my projects.",
    description: "Welcome to my blog, where I share my knowledge and demonstrate how I'm a consistent learner for programming.",
    image: "/profile.jpg",
    alt: "Blog banner",
  };

  const selectedCategoryData =
    selectedCategory === "all"
      ? null
      : categories.find((category) => !category.parent && category.title === selectedCategory);

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

  const currentPostCount = posts.filter((post) => matchesCategory(post, selectedCategory, selectedSubCategory)).length;

  return (
    <section aria-label="Blog category banner" className="relative isolate mb-12 flex min-h-96 w-full flex-col justify-end overflow-hidden rounded-2xl bg-slate-900 text-left text-white md:min-h-[28rem]">
      <Image
        src={currentBanner.image}
        alt={currentBanner.alt || "Blog banner"}
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/25" />
      <div className="relative flex max-w-4xl flex-col items-start gap-4 p-6 sm:p-10">
        <Tag tag={`${currentPostCount} posts`} useFor="main_banner" />
        <h1 className="text-left text-3xl leading-tight font-semibold sm:text-4xl lg:text-5xl">
          {currentBanner.title}
        </h1>
        {currentBanner.description && (
          <p className="max-w-3xl text-left text-base leading-relaxed text-white/90 sm:text-lg">{currentBanner.description}</p>
        )}
      </div>
    </section>
  );
};
export default BlogBanner;
