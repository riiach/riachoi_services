import Link from "next/link";
import Image from "next/image";
import { urlFor } from "../../sanity/image";

export default function EmbeddedCard({ post, className = "" }) {
  if (!post?.slug) return null;

  const title = post.seoTitle || post.title;
  const subtitle = post.summary || post.seoDescription || "";
  const cover = post.featuredImage
    ? urlFor(post.featuredImage).width(1200).height(800).fit("crop").url()
    : post.featuredImageUrl;

  return (
    <Link
      href={`/blog/${encodeURIComponent(post.slug)}`}
      aria-label={`Read ${title}`}
      className={`group relative isolate block aspect-[1200/630] w-full overflow-hidden rounded-[28px] bg-[#343b47] text-white shadow-lg focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-blue-500 ${className}`}
    >
      {cover && (
        // Remote author-provided URLs are supported as well as Sanity-hosted images.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={cover} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/25" />
      <div className="absolute inset-0 flex flex-col justify-between p-[6%]">
        <div className="flex items-center gap-3">
          <Image src="/new_logo_white.png" alt="" width={42} height={42} unoptimized className="h-7 w-7 object-contain sm:h-10 sm:w-10" />
          <span className="font-logo text-lg font-normal tracking-tight sm:text-2xl">Ria Choi</span>
        </div>
        <div className="max-w-[92%]">
          <h2 className="line-clamp-2 text-[clamp(1.25rem,3.4vw,3rem)] font-semibold leading-tight tracking-tight">{title}</h2>
          {subtitle && <p className="mt-2 line-clamp-2 text-[clamp(.75rem,1.55vw,1.25rem)] leading-snug text-white/85">{subtitle}</p>}
        </div>
      </div>
    </Link>
  );
}
