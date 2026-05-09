export async function getBlogPosts() {
  const response = await fetch(
    `https://api.dropinblog.com/v1/json/?b=${process.env.DROPINBLOG_BLOG_ID}`,
    {
      next: { revalidate: 1800 }, // Cache for 30 min
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch DropInBlog posts");
  }

  return response.json();
}