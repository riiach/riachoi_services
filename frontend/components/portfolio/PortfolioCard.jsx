"use client";

import Link from "next/link";
import { getPortfolioImages } from "../../lib/util/portfolio-images";
import { urlFor } from "../../sanity/image";
import { getProjectHref, getProjectTags } from "../../lib/util/portfolio";
import ProjectImageStack from "./ProjectImageStack";
import PortfolioTag from "./PortfolioTag";

export default function PortfolioCard({ project }) {
  const images = getPortfolioImages(project, (image) => urlFor(image).width(900).height(675).url());
  const count = images.length;
  const href = getProjectHref(project);

  return (
    <article className="relative min-w-0">
      {count ? <ProjectImageStack images={images} title={project.title} /> : <div className="aspect-[4/3] rounded-xl bg-primary" />}
      <h3 className="mt-4 text-base leading-snug font-medium sm:text-lg"><Link href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4">{project.title}<svg aria-hidden="true" className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 19 19 5M8 5h11v11" /></svg></Link></h3>
      <div className="mt-3 flex flex-wrap gap-2">{getProjectTags(project).map((tag) => <PortfolioTag key={tag}>{tag}</PortfolioTag>)}</div>
    </article>
  );
}
