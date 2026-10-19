import { getPosts, getCategories } from "../../sanity/data";
// app/blog/page.jsx - Blog ListCard Page

export const revalidate = false;

import BlogBanner from "../../components/card/BlogBanner"
import Category from "../../components/Category"
import BlogList from "../../sections/blog/BlogList"
import SidePanel from "../../sections/blog/SidePanel"

export const metadata = {
  title: "Blog | Ria Choi",
  description: "Development articles and projects",
};

export default async function Blog() {
  const posts = await getPosts();
  const categories = await getCategories();

  const filteredPosts = posts.filter(
    (post) =>
      !post.categories?.some((category) =>
        ["About", "Services"].includes(category.title)
      )
  );

  const filteredCategories = categories.filter(
    (category) =>
      category.title !== "About" &&
      category.title !== "Services"
  );

  return (
    <main className="min-h-screen p-4 xl:px-10 2xl:px-48 bg-background">
      <Category posts={filteredPosts} categories={filteredCategories} />
      <BlogBanner posts={filteredPosts} categories={filteredCategories} />
      <div className="w-full h-auto gap-8 flex flex-col md:flex-row">
        <BlogList posts={filteredPosts} />
        <div className="w-full md:w-2/4 xl:w-1/3 h-auto ">
          <SidePanel posts={filteredPosts} />
        </div>
      </div>
    </main>
  )
}