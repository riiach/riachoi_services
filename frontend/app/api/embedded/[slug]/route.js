import { ImageResponse } from "next/og";
import { getPost } from "../../../../sanity/data";
import { urlFor } from "../../../../sanity/image";

export const runtime = "nodejs";

const sizes = {
  og: [1200, 630],
  card: [900, 1200],
  feed: [1080, 1350],
  story: [1080, 1920],
};

export async function GET(request, { params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return new Response("Post not found", { status: 404 });

  const format = new URL(request.url).searchParams.get("format") || "og";
  if (!Object.hasOwn(sizes, format)) {
    return new Response("Invalid image format", { status: 400 });
  }

  const [width, height] = sizes[format];
  const tall = height > width;
  const title = post.seoTitle || post.title || "";
  const subtitle = post.summary || post.seoDescription || "";
  const cover = post.featuredImage
    ? urlFor(post.featuredImage).width(width).height(height).fit("crop").url()
    : post.featuredImageUrl;
  const logoUrl = new URL("/new_logo_white.png", request.url).toString();
  const padding = tall ? 58 : 54;

  return new ImageResponse(
    (
      <div style={{ display: "flex", position: "relative", width, height, backgroundColor: "#343b47", color: "#fff", fontFamily: "sans-serif", overflow: "hidden" }}>
        {cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cover}
            alt=""
            width={width}
            height={height}
            style={{ position: "absolute", top: 0, left: 0, width, height, objectFit: "cover" }}
          />
        )}
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: 0,
            left: 0,
            width,
            height,
            backgroundImage: "linear-gradient(to top, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.25) 100%)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "absolute",
            top: 0,
            left: 0,
            width,
            height,
            padding,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoUrl} alt="" width={40} height={40} style={{ objectFit: "contain" }} />
            <span style={{ fontSize: tall ? 27 : 28, fontWeight: 400, letterSpacing: "-0.5px" }}>Ria Choi</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: "94%" }}>
            <div style={{ display: "flex", fontSize: tall ? 58 : 60, lineHeight: 1.12, fontWeight: 700, letterSpacing: "-1.7px", overflowWrap: "break-word" }}>
              {title}
            </div>
            {subtitle && (
              <div style={{ display: "flex", marginTop: 15, fontSize: tall ? 25 : 26, lineHeight: 1.35, color: "#f0f0f0", overflowWrap: "break-word" }}>
                {subtitle}
              </div>
            )}
          </div>
        </div>
      </div>
    ),
    {
      width,
      height,
      headers: {
        "Cache-Control": "public, max-age=0, s-maxage=3600",
        "Content-Disposition": `inline; filename="ria-choi-${format}.png"`,
      },
    }
  );
}
