// app/blog/[slug]/page.jsx

import { getBlogPosts, getBlogPostBySlug } from "../../../lib/dropinblog";

import ContentBanner from "../../../components/card/ContentBanner";

import BlogContent from "../../../sections/content/BlogContent";
import SidePanel from "../../../sections/blog/SidePanel";
import ShareCard from "../../../components/card/Share";

export default async function BlogPostPage({ params }) {
  const { slug } = await params;

  const data = await getBlogPosts();
  const posts = data?.data?.posts || data?.posts || [];

  const content = await getBlogPostBySlug(slug);

  const post = posts.find((post) => post.slug === slug);

  if (!post) {
    return <main>Post not found</main>;
  }

  return (
    <main className="w-full min-h-screen p-4 xl:px-10 2xl:px-48 bg-background">
      <ContentBanner post={post} />

      <div className="w-full grid grid-cols-1 xl:grid-cols-12 gap-8">

        {/* Left */}
        <aside className="hidden xl:block xl:col-span-1">
          <ShareCard />
        </aside>

        {/* Center */}
        <section className="xl:col-span-7">
          <BlogContent
            posts={posts}
            post={post}
            content={content}
          />
        </section>

        {/* Right */}
        <aside className="xl:col-span-4">
          <SidePanel posts={posts} />
        </aside>

      </div>
    </main>
  );
}