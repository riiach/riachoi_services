"use client"

import React from "react";
import BlogList from "../../sections/blog/BlogList"
import SidePanel from "../../sections/blog/SidePanel"

const Blog = ( {posts, mainPosts} ) => {
  return (
    <section className="min-h-screen bg-background">
      <div className="w-full h-auto gap-8 flex flex-col md:flex-row">
        <BlogList posts={mainPosts} />
        <div className="w-full md:w-2/4 xl:w-1/3 h-auto ">
          <SidePanel posts={posts} />
        </div>
      </div>
    </section>
  )
};
export default Blog;
