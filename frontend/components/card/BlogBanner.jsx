"use client"

import React from "react";
import Tag from "../ui/Tag";
import Social from "../ui/Social"
import Image from "next/image";

const BlogBanner = () => {
  return (
    <div className="w-full h-fit p-2 bg-primary flex flex-col md:flex-row items-center justify-center rounded-2xl overflow-reverse mb-12">
      <div className="order-2 md:order-1 w-full md:w-1/2 h-full p-6 md:p-2 flex flex-col items-center justify-start gap-8">
        <Tag
          tag="30 posts"
          useFor="banner"
        />
        <h1
          className="text-4xl font-semibold text-center"
        >
          Everything About JavaScript
        </h1>
        <p
          className="text-xl text-center"
        >
          This is the blog contents for JavaScript
        </p>
        <Social />
      </div>

      <div className="order-2 md:order-1 relative w-full md:w-1/2 aspect-[16/9] rounded-lg">
        <Image
          src="https://images.unsplash.com/photo-1666717716106-9f9e164e188f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="blog banner"
          fill
          className="rounded-lg"
        />
      </div>
    </div>
  );
};
export default BlogBanner;
