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
      className="relative isolate flex min-h-dvh w-full flex-col gap-5 px-3 pt-24 pb-3 md:h-dvh md:flex-row md:gap-6 md:p-5"
    >
      <DaisyBackground />
      <div className="contents md:grid md:min-h-0 md:min-w-0 md:w-[clamp(18rem,calc(12rem_+_12vw),30rem)] md:shrink-0 md:grid-rows-[minmax(0,1fr)_15.5rem_minmax(0,0.65fr)] md:gap-3 md:pt-18">
        <div className="hidden min-h-0 w-full md:block">
          <LatestBlogCard posts={latestPosts} compact />
        </div>
        <div className="order-2 h-90 md:h-64 shrink-0 md:order-none md:h-auto">
          <Contact />
        </div>
        <div className="order-3 flex h-80 min-h-0 md:order-none md:h-auto">
          <About />
        </div>
      </div>
      <div className="contents md:flex md:min-h-0 md:w-full md:min-w-0 md:flex-1 md:flex-col md:justify-between md:gap-2 2xl:px-16">
        <div className="order-first flex min-h-[32dvh] min-w-0 items-center justify-center py-8 md:order-none md:min-h-0 md:flex-1 md:py-0">
          <Hero compact />
        </div>
        <div className="order-4 h-fit w-full shrink-0 md:order-none">
          <Footer />
        </div>
      </div>
    </main>
  );
}
