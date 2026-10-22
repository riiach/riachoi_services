import Image from "next/image";
import Footer from "../components/layout/Footer";
import Hero from "../sections/main/Hero";
import LatestBlogCard from "../components/card/LatestBlogCard";
import { getPosts } from "../sanity/data";
import { urlFor } from "../sanity/image";

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
    <main aria-label="Ria Choi Digital Solution Studio" className="relative isolate flex h-auto w-full flex-col justify-between p-3 md:min-h-dvh md:flex-row md:gap-6 md:p-5 lg:py-16">
      <Image
        src="/Serene%20Green%20Hills.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />
      <div className="flex min-w-0 flex-col gap-4 pt-12 md:w-[min(24rem,calc((100vw-4rem)*0.375))] md:shrink-0">
        <div className="w-full"><LatestBlogCard posts={latestPosts} /></div>
        <div />
        <div />
      </div>
      <div className="flex w-full min-w-0 flex-col justify-between gap-4 pt-12 md:flex-1 md:max-w-[calc((100%-1.5rem)*2/3)] 2xl:px-32">
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
