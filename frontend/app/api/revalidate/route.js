import { revalidatePath, revalidateTag } from "next/cache";
import { parseBody } from "next-sanity/webhook";

export async function POST(request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return Response.json({ error: "Webhook is not configured" }, { status: 503 });
  }

  let parsed;
  try {
    // The SDK checks the Sanity signature and waits for Content Lake consistency.
    parsed = await parseBody(request, secret);
  } catch {
    return Response.json({ error: "Invalid webhook" }, { status: 400 });
  }
  if (!parsed.isValidSignature) {
    return Response.json({ error: "Invalid signature" }, { status: 401 });
  }

  const body = parsed.body;
  if (!body || !["post", "category", "subCategory", "author", "portfolio"].includes(body._type) ||
      typeof body._id !== "string" || !body._id) {
    return Response.json({ error: "Invalid document" }, { status: 400 });
  }
  if (body._id.startsWith("drafts.") || body._id.startsWith("versions.")) {
    return Response.json({ revalidated: false });
  }

  // All pages share posts in the header, so any published CMS change affects them.
  // Expire on the event, then regenerate only pages that receive another request.
  revalidateTag("sanity-content", { expire: 0 });
  revalidatePath("/blog");
  revalidatePath("/portfolio");
  revalidatePath("/");
  // Revalidate an updated post route when the webhook includes a slug.
  const slug = body.slug?.current || (typeof body.slug === "string" ? body.slug : null);
  if (body._type === "post" && slug && /^[a-zA-Z0-9_-]+$/.test(slug)) {
    revalidatePath(`/blog/${slug}`);
  }
  if (body._type === "portfolio" && slug && /^[a-zA-Z0-9_-]+$/.test(slug)) {
    revalidatePath(`/portfolio/${slug}`);
  }
  return Response.json({ revalidated: true });
}
