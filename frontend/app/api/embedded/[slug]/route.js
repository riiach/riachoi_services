import { ImageResponse } from "next/og";
import { getPost } from "../../../../sanity/data";
import { urlFor } from "../../../../sanity/image";

export const runtime = "nodejs";

const sizes = {
  og: [1200, 630],
  feed: [1080, 1350],
  story: [1080, 1920],
};

export async function GET(request, { params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return new Response("Post not found", { status: 404 });

  const format = new URL(request.url).searchParams.get("format") || "og";
  if (!(format in sizes)) return new Response("Invalid image format", { status: 400 });

  const [width, height] = sizes[format];
  const tall = format !== "og";
  const title = post.seoTitle || post.title || "";
  const subtitle = post.summary || post.seoDescription || "";
  const cover = post.featuredImage
    ? urlFor(post.featuredImage).width(width).height(height).fit("crop").url()
    : post.featuredImageUrl;
  const logoUrl = new URL("/new_logo_white.png", request.url).toString();

  return new ImageResponse(
    (
      <div style={{ display: "flex", position: "relative", width: "100%", height: "100%", backgroundColor: "#343b47", color: "#fff", fontFamily: "sans-serif" }}>
        {cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={cover} alt="" style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover" }} />
        )}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(to top, rgba(0,0,0,.94), rgba(0,0,0,.48) 55%, rgba(0,0,0,.28))" }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", position: "absolute", inset: 0, padding: tall ? 76 : 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoUrl} width={48} height={48} alt="" style={{ objectFit: "contain" }} />
            <span style={{ fontSize: 34, letterSpacing: "-.7px" }}>Ria Choi</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: "95%" }}>
            <div style={{ fontSize: tall ? 76 : 64, lineHeight: 1.12, fontWeight: 700, letterSpacing: "-2px", overflow: "hidden", textOverflow: "ellipsis", display: "block" }}>{title}</div>
            {subtitle && <div style={{ marginTop: 24, fontSize: tall ? 34 : 28, lineHeight: 1.35, color: "#e5e5e5", overflow: "hidden", textOverflow: "ellipsis", display: "block" }}>{subtitle}</div>}
          </div>
        </div>
      </div>
    ),
    { width, height, headers: { "Cache-Control": "public, max-age=0, s-maxage=3600", "Content-Disposition": `inline; filename="ria-choi-${format}.png"` } }
  );
}
