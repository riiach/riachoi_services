import DaisyBackground from "../components/background/DaisyBackground";
import Footer from "../components/layout/Footer";
import Hero from "../sections/main/Hero";
import LatestBlogCard from "../components/card/LatestBlogCard";
import { getPosts } from "../sanity/data";
import { urlFor } from "../sanity/image";
import Contact from "../sections/main/Contact";
import About from "../sections/main/About";

export const metadata = {
  title: "Ria Choi Digital Solution Studio",
  description: "Online web development studio that provides high-quality web solutions. Customized websites for your business.",
};

export default async function Home() {
  const posts = await getPosts();
  const latestPosts = posts
    .filter((post) => post.slug && !post.categories?.some((category) => ["About", "Services"].includes(category.title)))
    .slice(0, 5)
    .map((post) => ({
      id: post._id,
      title: post.title,
      slug: post.slug,
      summary: post.summary,
      keyword: post.keyword,
      imageUrl: post.featuredImageUrl || (post.featuredImage?.asset?._ref ? urlFor(post.featuredImage).width(1000).height(750).url() : null),
    }));
  return (
    <main
      aria-label="Ria Choi Digital Solution Studio"
      className="relative isolate grid h-dvh w-full grid-rows-[minmax(0,1fr)_auto] gap-3 p-3 md:flex md:gap-6 md:p-5"
    >
      <DaisyBackground />
      <div className="grid min-h-0 min-w-0 grid-rows-[minmax(0,1fr)_auto_minmax(0,0.65fr)] gap-3 pt-20 md:w-[clamp(18rem,calc(12rem_+_12vw),30rem)] md:shrink-0 md:grid-rows-[minmax(0,1fr)_15rem_minmax(0,0.65fr)] md:pt-18 2xl:ml-21">
        <div className="min-h-0 w-full">
          <LatestBlogCard posts={latestPosts} compact />
        </div>
        <div className="shrink-0">
          <Contact />
        </div>
        <div className="flex min-h-0">
          <About />
        </div>
      </div>
      <div className="flex min-h-0 w-full min-w-0 flex-col justify-between gap-2 md:flex-1 2xl:px-16">
        <div className="flex min-h-0 min-w-0 flex-1 items-center justify-center">
          <Hero compact />
        </div>
        <div className="h-fit w-full shrink-0">
          <Footer />
        </div>
      </div>
    </main>
  );
}
