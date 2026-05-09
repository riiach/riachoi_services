// app/blog/page.jsx - Blog ListCard Page

import BlogBanner from "../../components/card/BlogBanner"
import Category from "../../components/Category"
import BlogList from "../sections/blog/BlogList"
import SidePanel from "../sections/blog/SidePanel"
import { getBlogPosts } from "../../lib/dropinblog";

export const metadata = {
  title: "Blog | Ria Choi",
  description: "Development articles and projects",
};

export default async function Blog() {
  const data = await getBlogPosts();
  const posts = data?.data?.posts || data?.posts || [];

  return (
    <main className="min-h-screen p-4 xl:px-10 2xl:px-48 bg-background">
      <Category posts={posts} />
      <BlogBanner />
      <div className="w-full h-auto gap-8 flex flex-col md:flex-row">
        <BlogList posts={posts} />
        <div className="w-full md:w-2/4 xl:w-1/3 h-auto ">
          <SidePanel posts={posts} />
        </div>
      </div>
    </main>
  )
}