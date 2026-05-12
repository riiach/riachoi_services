import Hero from "../sections/main/Hero";
import Project from "../sections/main/Project";
import Services from "../sections/main/Services";
import Blog from "../sections/main/Blog";

import { client } from "../sanity/client";
import { POSTS_QUERY } from "../sanity/queries";

export const metadata = {
  title: "Ria Choi Digital Solution Studio",
  description: "Our studio is...",
};

export default async function Home() {
  const posts = await client.fetch(POSTS_QUERY);

  const mainPosts = posts.filter((post) =>
    post.categories?.some((category) => category.title === "Services")
  );

  const popularPosts = posts.filter(
    (post) =>
      !post.categories?.some((category) =>
        ["About", "Services"].includes(category.title)
      )
  );

  return (
    <div className="min-h-screen bg-background p-4 xl:px-10 2xl:px-48">
      <Hero />
      <Project posts={posts} />
      <Services />
      <Blog posts={popularPosts} mainPosts={mainPosts} />
    </div>
  );
}