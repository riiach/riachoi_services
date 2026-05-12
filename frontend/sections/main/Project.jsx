"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Tag from "../../components/ui/Tag";

import "swiper/css";
import "swiper/css/navigation";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { urlFor } from "../../sanity/image";

const Project = ({ posts }) => {
  const projectPosts = posts.filter((post) =>
    post.categories?.some((category) => category.title === "Project")
  );

  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = date.getDate();

    const getOrdinal = (n) => {
      if (n > 3 && n < 21) return "th";

      switch (n % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    const month = date.toLocaleString("en-US", {
      month: "long",
    });

    const year = date.getFullYear();

    return `${month} ${day}${getOrdinal(day)}, ${year}`;
  }

  return (
    <section className="mb-12 flex h-[80vh] w-full flex-col items-center rounded-2xl bg-primary p-2">
      <div className="group relative h-full w-full">
        <button
          type="button"
          className="custom-prev absolute left-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black opacity-0 shadow-lg transition-all duration-300 hover:scale-105 group-hover:opacity-100 md:flex"
        >
          <ChevronLeft size={26} />
        </button>

        <button
          type="button"
          className="custom-next absolute right-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-black opacity-0 shadow-lg transition-all duration-300 hover:scale-105 group-hover:opacity-100 md:flex"
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
          className="h-full w-full rounded-xl"
          allowTouchMove={true}
          grabCursor={true}
          touchRatio={1}
          resistanceRatio={0.85}
        >
          {projectPosts.map((post, index) => {
            const imageUrl =
              post?.featuredImageUrl ||
              (post?.featuredImage
                ? urlFor(post.featuredImage)
                  .width(1600)
                  .height(900)
                  .url()
                : null);

            return (
              <SwiperSlide
                key={post._id || index}
                className="relative h-full w-full overflow-hidden rounded-xl"
              >
                {({ isActive }) => (
                  <>
                    {imageUrl && (
                      <Image
                        src={imageUrl}
                        alt={post?.title || "Project image"}
                        fill
                        className="rounded-xl object-cover"
                      />
                    )}

                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    <div className="absolute bottom-0 left-0 flex h-fit w-full flex-col items-start justify-center p-4 md:w-[90%] md:p-12 lg:p-16 xl:px-24">
                      <div
                        className={`mb-4 flex flex-wrap gap-2 transition-all delay-150 duration-700 ease-out ${
                          isActive
                            ? "translate-y-0 opacity-100"
                            : "translate-y-6 opacity-0"
                        }`}
                      >
                        {post?.keyword?.split(" ").map((tag, idx) => (
                          <Tag key={idx} tag={tag} />
                        ))}
                      </div>

                      <h1
                        className={`text-2xl font-semibold text-white transition-all delay-300 duration-700 ease-out md:text-5xl ${
                          isActive
                            ? "translate-y-0 opacity-100"
                            : "translate-y-8 opacity-0"
                        }`}
                      >
                        {post?.title}
                      </h1>

                      <div
                        className={`mt-4 flex h-auto w-full flex-row gap-2 font-semibold text-white transition-all delay-500 duration-700 ease-out ${
                          isActive
                            ? "translate-y-0 opacity-100"
                            : "translate-y-8 opacity-0"
                        }`}
                      >
                        <p>{post?.author?.name}</p>
                        <p>•</p>
                        <p>{formatDate(post?.publishedAt)}</p>
                      </div>
                    </div>
                  </>
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default Project;