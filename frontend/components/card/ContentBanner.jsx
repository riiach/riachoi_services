"use client"

import React from "react";
import Image from "next/image";
import { urlFor } from "../../sanity/image";

const ContentBanner = ( { post } ) => {

  const imageUrl =
    post?.featuredImageUrl || (post?.featuredImage ? urlFor(post.featuredImage).width(1000).height(450).url() : null);

  return (
    <div className="w-full h-[80dvh] bg-primary p-2 rounded-2xl mb-20 shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
      <div className="w-full h-full rounded-2xl relative">
        {imageUrl &&
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className="object-cover rounded-2xl"
          />
        }
      </div>
    </div>
  );
};
export default ContentBanner;
