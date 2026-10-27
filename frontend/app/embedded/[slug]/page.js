import { notFound } from "next/navigation";
import { getPost } from "../../../sanity/data";
import EmbeddedCard from "../../../components/Embedded/EmbeddedCard";

export const revalidate = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: `${post.title} | Ria Choi`,
    description: post.summary || post.seoDescription || "",
    robots: { index: false, follow: true },
  };
}

export default async function EmbeddedPostPage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <main className="mx-auto flex min-h-[65vh] w-full max-w-5xl items-center px-4 py-28 sm:px-8">
      <EmbeddedCard post={post} />
    </main>
  );
}
