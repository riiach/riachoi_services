import { ExternalLink, Link2 } from "lucide-react";
import { getLinkEmbed } from "../lib/util/link-embed.mjs";

export default function LinkEmbed({ value }) {
  const embed = getLinkEmbed(value?.url);
  if (!embed) return null;

  const title = value?.title?.trim() || embed.provider || embed.site;
  const description = value?.description?.trim();
  return (
    <figure className="blog-link-embed my-8">
      {embed.src ? (
        <>
          <div className={`blog-link-embed-frame ${embed.tall ? "blog-link-embed-frame-tall" : ""}`}>
            <iframe
              src={embed.src}
              title={title}
              loading="lazy"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              sandbox="allow-scripts allow-same-origin allow-popups allow-presentation"
            />
          </div>
          <figcaption className="blog-link-embed-footer">
            <span>{value?.title || embed.provider}</span>
            <a href={embed.href} target="_blank" rel="noopener noreferrer">
              원본 보기 <ExternalLink size={14} aria-hidden="true" />
            </a>
          </figcaption>
        </>
      ) : (
        <a className="blog-link-embed-card" href={embed.href} target="_blank" rel="noopener noreferrer">
          <span className="blog-link-embed-symbol"><Link2 size={22} aria-hidden="true" /></span>
          <span className="blog-link-embed-details">
            <span className="blog-link-embed-domain">{embed.site}</span>
            <span className="blog-link-embed-title">{title}</span>
            {description && <span className="blog-link-embed-description">{description}</span>}
            <span className="blog-link-embed-url">{embed.href}</span>
          </span>
          <ExternalLink size={18} className="blog-link-embed-external" aria-hidden="true" />
        </a>
      )}
    </figure>
  );
}
