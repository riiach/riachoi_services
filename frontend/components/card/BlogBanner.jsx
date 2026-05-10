"use client"

import React from "react";
import Tag from "../ui/Tag";
import Social from "../ui/Social"
import Image from "next/image";
import { useCategory } from "../../context/category"

const BlogBanner = ( { posts=[] }) => {
  const { selectedCategory } = useCategory();
  const bannerContent = [
    {
      category: "all",
      title: "See what skills I use to create something amazing.",
      description: "Welcome to my blog, where I share my knowledge and demonstrate how I'm a consistent learner for programming. I hope these contents could help those programmers who just started on learning.",
      image: "/profile.png"
    },
    {
      category: "Tips",
      title: "Connecting Systems at Scale",
      description: "APIs, HTTP communication, infrastructure networking, webhooks, proxies, and system-to-system communication patterns."
    },
    {
      category: "Tutorial",
      title: "Learn Through Real Projects",
      description: "Step-by-step guides, implementation breakdowns, and practical lessons learned while building production-ready applications."
    },
    {
      category: "Database",
      title: "Designing Reliable Data Systems",
      description: "Database architecture, schema design, query optimization, indexing, migrations, and data consistency strategies for scalable applications."
    },
    {
      category: "ORM",
      title: "Modern Data Access with ORMs",
      description: "Working with Prisma, JPA, Hibernate, and other ORM tools to build clean, maintainable, and efficient backend systems."
    },
    {
      category: "Cloud Engineering",
      title: "Cloud Engineering",
      description: "Cloud Engineering",
    },
    {
      category: "Networking",
      title: "Connecting Systems at Scale",
      description: "APIs, HTTP communication, infrastructure networking, webhooks, proxies, and system-to-system communication patterns."
    },
    {
      category: "Auth",
      title: "Secure Authentication & Authorization",
      description: "Authentication flows, JWT, OAuth, role-based access control, session management, and backend security best practices."
    },
    {
      category: "Tutorial",
      title: "Learn Through Real Projects",
      description: "Step-by-step guides, implementation breakdowns, and practical lessons learned while building production-ready applications."
    },
    {
      category: "Tech",
      title: "Tech Events & Industry News",
      description: "Updates, highlights, and insights from hackathons, conferences, product launches, developer meetups, and major events shaping the tech industry."
    },
  ];

  const currentBanner =
    bannerContent.find((item) => item.category === selectedCategory) ||
    bannerContent[0];

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

      <div className="order-1 md:order-2 relative w-full md:w-1/2 aspect-[16/9] rounded-lg">
        <Image
          src={currentBanner.image}
          alt="blog banner"
          fill
          className="rounded-lg object-cover"
        />
      </div>
    </div>
  );
};
export default BlogBanner;
