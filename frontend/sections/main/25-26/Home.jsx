import { getPosts } from "../../../sanity/data";

import Hero from "./Hero";
import Project from "../Project";
import Services from "../Services";
import Blog from "../Blog";



export default async function Home2526() {
  const posts = await getPosts();

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