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
      className="relative isolate flex min-h-dvh w-full flex-col justify-between p-3 md:flex-row md:gap-6 md:p-5 lg:py-16"
    >
      <DaisyBackground />
      <div className="flex w-[calc(100vw-1.5rem)] max-w-[calc(100vw-1.5rem)] min-w-0 flex-col gap-4 pt-26 md:pt-18 lg:pt-6 md:w-[clamp(18rem,calc(12rem_+_12vw),30rem)] md:shrink-0 2xl:ml-21">
        <div className="w-full shrink-0">
          <LatestBlogCard posts={latestPosts} />
        </div>
        <div className="shrink-0">
          <Contact />
        </div>
        <div className="flex min-h-54 flex-1">
          <About />
        </div>
      </div>
      <div className="flex w-full min-w-0 flex-col justify-between gap-4 pt-12 md:max-w-[calc((100%-1.5rem)*2/3)] md:flex-1 2xl:px-32">
        <div className="flex min-w-0 flex-1 items-center justify-center">
          <Hero />
        </div>
        <div className="h-fit w-full shrink-0">
          <Footer />
        </div>
      </div>
    </main>
  );
}
