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
        (["About", "Services"].includes(category.title) || ["About", "Services"].includes(category.parent?.title))
      )
  );

  const filteredCategories = categories.filter(
    (category) =>
      category.title !== "About" &&
      category.title !== "Services" &&
      !["About", "Services"].includes(category.parent?.title)
  );

  return (
    <main className="bg-background min-h-screen px-4 pt-24 xl:px-10 2xl:px-48">
      <div className="grid min-w-0 grid-cols-1 items-start gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] xl:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <aside className="order-2 min-w-0 md:order-1 md:self-stretch md:flex"><SidePanel posts={filteredPosts} /></aside>
        <div className="order-1 min-w-0 md:order-2">
          <Category categories={filteredCategories} />
          <BlogBanner posts={filteredPosts} categories={filteredCategories} />
          <BlogList posts={filteredPosts} />
        </div>
      </div>

    </main>
  );
}