export const revalidate = false;

// Generate posts on first request, including newly published slugs.
export function generateStaticParams() {
  return [];
}

// app/blog/[slug]/page.jsx
import { notFound } from "next/navigation";
import { getPost, getPosts } from "../../../sanity/data";
import { urlFor } from "../../../sanity/image";

import ContentBanner from "../../../components/card/ContentBanner";
import BlogContent from "../../../sections/content/BlogContent";
import SidePanel from "../../../sections/blog/SidePanel";
import ShareCard from "../../../components/card/Share";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.summary || "",
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;

  const post = await getPost(slug);

  if (!post) notFound();

  const imageUrl =
    post?.featuredImageUrl || (post?.featuredImage ? urlFor(post.featuredImage).width(1000).height(450).url() : null);

  const posts = await getPosts();

  return (
    <main className="min-h-screen w-full bg-background p-4 xl:px-10 2xl:px-48">
      <ContentBanner post={post} />

      <div className="grid w-full grid-cols-1 gap-8 xl:grid-cols-12">
        {/* Left */}
        <aside className="hidden xl:col-span-1 xl:block">
          <ShareCard />
        </aside>

        {/* Center */}
        <section className="xl:col-span-7">
          <BlogContent post={post} imageUrl={imageUrl} />
        </section>

        {/* Right */}
        <aside className="xl:col-span-4">
          <SidePanel posts={posts} />
        </aside>
      </div>
    </main>
  );
}