"use client"

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Project = ( { posts } ) => {
  const projectPosts = posts.filter((post) => post.categories.some((category) => category.title === "Project"));

  return (
    <section className="w-full h-[80vh] bg-background rounded-2xl flex flex-col items-center pt-8 md:pt-12 xl:pt-24 gap-12 mb-12 p-2 border border-red-500">
      <div className="w-full h-full relative group">
        {/* Left button - desktop only */}
        <button
          type="button"
          className=" custom-prev
          hidden md:flex
          absolute left-4 top-1/2 z-20
          w-12 h-12 rounded-full
          bg-white text-black
          items-center justify-center
          shadow-lg
          opacity-0 group-hover:opacity-100
          transition-all duration-300
          hover:scale-105
        "
        >
          <ChevronLeft size={26} />
        </button>

        {/* Right button - desktop only */}
        <button
          type="button"
          className=" custom-next
          hidden md:flex
          absolute right-4 top-1/2 z-20
          w-12 h-12 rounded-full
          bg-white text-black
          items-center justify-center
          shadow-lg
          opacity-0 group-hover:opacity-100
          transition-all duration-300
          hover:scale-105
        "
        >
          <ChevronRight size={26} />
        </button>

        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".custom-prev",
            nextEl: ".custom-next",
          }}
          spaceBetween={20}
          slidesPerView={1}
        >
          {projectPosts.map((post, index) => (
            <SwiperSlide
              key={index}
              className="w-full h-full relative rounded-2xl"
            >
              <Image
                src={post?.featuredImage}
                alt={post?.title}
                fill
                className="object-cover rounded-2xl"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};
export default Project;
