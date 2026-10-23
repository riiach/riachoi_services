"use client";

import { useState } from "react";
import { filterPortfolioProjects, getPortfolioTags, groupPortfolioProjects } from "../../lib/util/portfolio";
import HorizontalScroll from "../ui/HorizontalScroll";
import PortfolioCard from "./PortfolioCard";
import PortfolioTag from "./PortfolioTag";

export default function PortfolioList({ projects = [] }) {
  const [selectedTag, setSelectedTag] = useState(null);
  const tags = getPortfolioTags(projects);
  const years = groupPortfolioProjects(filterPortfolioProjects(projects, selectedTag));
  return (
    <section aria-label="Portfolio projects" className="min-w-0 w-full">
      <HorizontalScroll role="group" label="Portfolio tags" className="flex items-center gap-2 py-2">
        {[null, ...tags].map((tag) => <button type="button" key={tag === null ? "all" : `tag:${tag}`} aria-pressed={selectedTag === tag} onClick={() => setSelectedTag(tag)} className="shrink-0 cursor-pointer whitespace-nowrap rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 transition-opacity hover:opacity-60"><PortfolioTag active={selectedTag === tag}>{tag || "All"}</PortfolioTag></button>)}
      </HorizontalScroll>
      <div className="mt-12 space-y-16">
        {years.map(({ year, months }) => <section key={year} aria-label={`${year} projects`}>
          <h2 className="mb-8 border-b border-foreground/15 pb-4 font-logo text-4xl">{year}</h2>
          <div className="space-y-12">{months.map((month) => <section key={month.key} aria-label={`${month.label} ${year}`}>
            {month.label && <h3 className="mb-6 text-sm text-foreground/60">{month.label}</h3>}
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 xl:grid-cols-4 [@media(min-width:48rem)_and_(pointer:coarse)]:grid-cols-3">
              {month.projects.map((project) => <PortfolioCard key={project._id || project.slug} project={project} />)}
            </div>
          </section>)}</div>
        </section>)}
        {!years.length && <p className="py-12 text-foreground/60">{projects.length ? "No projects match this tag." : "New projects are coming soon."}</p>}
      </div>
    </section>
  );
}
