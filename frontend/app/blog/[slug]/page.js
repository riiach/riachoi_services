export const revalidate = false;

// Generate posts on first request, including newly published slugs.
export function generateStaticParams() {
  return [];
}

// app/blog/[slug]/page.jsx
import { notFound } from "next/navigation";
import { getPost, getPosts } from "../../../sanity/data";

import BlogContent from "../../../sections/content/BlogContent";
import SidePanel from "../../../sections/blog/SidePanel";

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

  const posts = await getPosts();

  return (
    <main className="min-h-screen w-full bg-background px-4 pt-24 pb-4 xl:px-10 2xl:px-48">
      <div className="grid w-full min-w-0 grid-cols-1 items-start gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] xl:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <aside className="order-2 min-w-0 md:order-1 md:self-stretch md:flex"><SidePanel posts={posts} /></aside>
        <section className="order-1 min-w-0 md:order-2"><BlogContent post={post} /></section>
      </div>
    </main>
  );
}
