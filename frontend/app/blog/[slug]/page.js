// app/blog/[slug]/page.jsx

export default function BlogPostPage({ params }) {
  const { slug } = params;

  return (
    <main>
      <h1>Blog Post</h1>
      <p>Current slug: {slug}</p>
    </main>
  );
}