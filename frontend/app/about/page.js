import { getAboutPosts } from "../../sanity/data";
import BlogContent from "../../sections/content/BlogContent";

export const revalidate = false;
export const metadata = { title: "About me | Ria Choi", description: "Get to know Ria Choi" };

export default async function About() {
  const posts = await getAboutPosts();
  return (
    <>
      <main className="min-h-screen w-full bg-background px-[var(--page-gutter)] pt-24 pb-4">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-16">
          {posts.length ? posts.map((post) => <BlogContent key={post._id || post.slug} post={post} showExtras={false} />) : <div className="py-16"><h1 className="text-4xl font-semibold">About me</h1><p className="mt-4 text-foreground/65">Thanks for trying to get to know me, I&apos;ll update about myself very soon. I am a bit shy person, so it takes time for me to share about my story :)</p></div>}
        </div>
      </main>
    </>
  );
}
