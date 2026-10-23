import Image from "next/image";
import plasticDaisy from "../../public/Plastic Daisy BG.png";
import { getPosts, getCategories } from "../../sanity/data";
// app/blog/page.jsx - Blog ListCard Page
import SiteFooter from "../../components/layout/SiteFooter"

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
      <div className="grid min-w-0 grid-cols-1 items-start gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <aside className="order-2 min-w-0 md:order-1 md:self-stretch"><SidePanel posts={filteredPosts} /></aside>
        <div className="order-1 min-w-0 md:order-2">
          <Category categories={filteredCategories} />
          <BlogBanner posts={filteredPosts} categories={filteredCategories} />
          <BlogList posts={filteredPosts} />
        </div>
      </div>

      <div className="relative isolate mt-16 -mx-4 grid overflow-hidden xl:-mx-10 2xl:-mx-48">
        <Image
          src={plasticDaisy}
          alt="Plastic daisies"
          sizes="100vw"
          className="col-start-1 row-start-1 h-[600px] w-full self-end object-cover [mask-image:linear-gradient(to_bottom,transparent,black_30%)] md:h-auto"
        />

        <div className="z-10 col-start-1 row-start-1 w-full self-end p-4 pb-6 md:p-0 md:pb-50">
          <SiteFooter />
        </div>
      </div>
    </main>
  );
}