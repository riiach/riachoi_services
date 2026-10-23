"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getPortfolioImages } from "../../lib/util/portfolio-images";
import { urlFor } from "../../sanity/image";
import { getProjectHref, getProjectTags } from "../../lib/util/portfolio";
import ProjectImageStack from "./ProjectImageStack";
import PortfolioTag from "./PortfolioTag";

export default function PortfolioCard({ project }) {
  const [hovering, setHovering] = useState(false);
  const [index, setIndex] = useState(0);
  const images = getPortfolioImages(project, (image) => urlFor(image).width(900).height(675).url());
  const count = images.length;
  const href = getProjectHref(project);

  useEffect(() => {
    if (!hovering || count < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % count), 1000);
    return () => window.clearInterval(timer);
  }, [hovering, count]);

  function start() {
    if (count > 1) setIndex(1);
    setHovering(true);
  }
  function stop() {
    setHovering(false);
    setIndex(0);
  }

  return (
    <article className="relative min-w-0" onPointerEnter={start} onPointerLeave={stop}>
      {count ? <>
        <div className="relative z-10 md:hidden [@media(pointer:coarse)]:block"><ProjectImageStack images={images} title={project.title} /></div>
        <div className="relative hidden aspect-[4/3] w-full overflow-hidden rounded-xl bg-primary focus-visible:outline-2 focus-visible:outline-offset-4 md:block [@media(pointer:coarse)]:hidden">
          {images.map((image, position) => <Image key={image.key} src={image.src} unoptimized={image.unoptimized} alt={image.alt} aria-hidden={position !== index % Math.max(count, 1)} fill sizes="(min-width: 1536px) 20vw, (min-width: 1280px) 25vw, 33vw" className={`object-cover transition-opacity duration-300 motion-reduce:transition-none ${position === index % Math.max(count, 1) ? "opacity-100" : "opacity-0"}`} />)}
        </div>
      </> : <div className="block aspect-[4/3] rounded-xl bg-primary" />}
      <h3 className="mt-4 text-base leading-snug font-medium sm:text-lg"><Link href={href} target="_blank" rel="noopener noreferrer" onFocus={start} onBlur={stop} className="after:absolute after:inset-0 after:rounded-xl after:content-[''] transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4">{project.title}</Link></h3>
      <div className="mt-3 flex flex-wrap gap-2">{getProjectTags(project).map((tag) => <PortfolioTag key={tag}>{tag}</PortfolioTag>)}</div>
    </article>
  );
}
