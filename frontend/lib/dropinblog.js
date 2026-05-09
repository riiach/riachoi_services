// lib/dropinblog.js

export async function getBlogPosts() {
  const response = await fetch(
    `https://api.dropinblog.com/v1/json/?b=${process.env.DROPINBLOG_ACCOUNT_ID}`,
    {
      next: { revalidate: 3600 }, // Cache for 1 hour
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch DropInBlog posts");
  }

  return response.json();
}