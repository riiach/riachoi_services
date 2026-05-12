export async function getBlogPosts() {
  const response = await fetch(
    `https://api.dropinblog.com/v1/json/?b=${process.env.DROPINBLOG_BLOG_ID}`,
    {
      next: { revalidate: 1800 }, // Cache for 30 min
    }
  );

  if (!response.ok) {
    return [];
  }

  return response.json();
}

const BLOG_ID = process.env.DROPINBLOG_BLOG_ID;
const API_KEY = process.env.DROPINBLOG_API_KEY;

export async function getBlogPostBySlug(slug) {
  const res = await fetch(
    `https://api.dropinblog.com/v2/blog/${BLOG_ID}/posts/slug/${slug}`,
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return [];
  }

  const data = await res.json();

  return data?.data?.post || data?.post || data?.data || data;
}