"use client"

import React from 'react'
import BlogListCard from '../../../components/card/BlogListCard'

const BlogList = () => {
    return (
        <section className="w-full md:w-2/4 xl:w-2/3 h-auto grid grid-cols-1 xl:grid-cols-2 gap-8">
            <BlogListCard />
            <BlogListCard />
          <BlogListCard />
          <BlogListCard />
        </section>
    )
}
export default BlogList
