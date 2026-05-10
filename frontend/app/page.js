import Image from "next/image";
import Hero from "../sections/main/Hero"
import Project from "../sections/main/Project"
import { getBlogPosts } from "../lib/dropinblog"

export const metadata = {
  title: "Ria Choi | Web Content Creator",
  description: "Ria Choi is a web content creator specializing in creating engaging and beautiful websites.",
};

export default async function Home() {
  const data = await getBlogPosts();
  const posts = data?.data?.posts || data?.posts || [];

  return (
    <div className="min-h-screen p-4 xl:px-10 2xl:px-48 bg-background">
        <Hero />
        <Project posts={posts} />
    </div>
  );
}
