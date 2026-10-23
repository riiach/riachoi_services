"use client";

import Link from "next/link";
import { getPortfolioImages } from "../../lib/util/portfolio-images";
import { urlFor } from "../../sanity/image";
import { getProjectHref, getProjectTags } from "../../lib/util/portfolio";
import ProjectImageStack from "./ProjectImageStack";
import PortfolioTag from "./PortfolioTag";

export default function PortfolioCard({ project, expanded, onExpandedChange }) {
  const images = getPortfolioImages(project, (image) => urlFor(image).width(900).height(675).url());
  const count = images.length;
  const href = getProjectHref(project);

  return (
    <article className="relative min-w-0 rounded-3xl border border-white/60 bg-white/35 p-4 shadow-[0_4px_20px_rgba(0,0,0,0.05)] backdrop-blur-xl md:p-5 dark:border-white/15 dark:bg-white/5 dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
      {count ? <ProjectImageStack images={images} title={project.title} expanded={expanded} onExpandedChange={onExpandedChange} /> : <div className="aspect-[4/3] rounded-xl bg-primary" />}
      <h3 className="mt-4 text-center text-base leading-snug font-medium sm:text-lg"><Link href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4">{project.title}<svg aria-hidden="true" className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 19 19 5M8 5h11v11" /></svg></Link></h3>
      <div className="mt-3 flex flex-wrap justify-center gap-2">{getProjectTags(project).map((tag) => <PortfolioTag key={tag}>{tag}</PortfolioTag>)}</div>
    </article>
  );
}
