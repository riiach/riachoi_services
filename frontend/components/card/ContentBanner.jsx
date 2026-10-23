"use client"

import React from "react";
import Image from "next/image";
import { urlFor } from "../../sanity/image";

const ContentBanner = ( { post } ) => {

  const imageUrl =
    post?.featuredImageUrl || (post?.featuredImage ? urlFor(post.featuredImage).width(1600).height(900).url() : null);

  return (
    <div className="w-full aspect-video bg-primary rounded-2xl mb-8 overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
      <div className="relative h-full w-full rounded-2xl">
        {imageUrl &&
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            sizes="(min-width: 768px) 66vw, 100vw"
            className="object-cover rounded-2xl"
          />
        }
      </div>
    </div>
  );
};
export default ContentBanner;
