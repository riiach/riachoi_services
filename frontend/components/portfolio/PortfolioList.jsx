"use client";

import { useState } from "react";
import { filterPortfolioProjects, getPortfolioTags, groupPortfolioProjects } from "../../lib/util/portfolio";
import PortfolioCard from "./PortfolioCard";
import PortfolioTag from "./PortfolioTag";

export default function PortfolioList({ projects = [] }) {
  const [selectedTag, setSelectedTag] = useState(null);
  const tags = getPortfolioTags(projects);
  const years = groupPortfolioProjects(filterPortfolioProjects(projects, selectedTag));
  return (
    <section aria-label="Portfolio projects" className="min-w-0 w-full">
      <div role="group" aria-label="Portfolio tags" className="flex flex-wrap items-center gap-2.5 py-2 md:gap-3">
        {[null, ...tags].map((tag) => <button type="button" key={tag === null ? "all" : `tag:${tag}`} aria-pressed={selectedTag === tag} onClick={() => setSelectedTag(tag)} className="cursor-pointer rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 transition-opacity hover:opacity-60"><PortfolioTag active={selectedTag === tag} large>{tag || "All"}</PortfolioTag></button>)}
      </div>
      <div className="mt-12 space-y-16">
        {years.map(({ year, months }) => <section key={year} aria-label={`${year} projects`}>
          <h2 className="mb-8 font-logo text-4xl">{year}</h2>
          <div className="space-y-10">
            {months.map((month) => <div key={month.key}>
              {month.label && <h3 className="mb-5 text-sm text-foreground/60">{month.label}</h3>}
              <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 xl:grid-cols-4 xl:gap-x-8">
                {month.projects.map((project) => <div key={project._id || project.slug} className="min-w-0"><PortfolioCard project={project} /></div>)}
              </div>
            </div>)}
          </div>
        </section>)}
        {!years.length && <p className="py-12 text-foreground/60">{projects.length ? "No projects match this tag." : "New projects are coming soon."}</p>}
      </div>
    </section>
  );
}
