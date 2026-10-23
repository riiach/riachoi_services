"use client";

import { useState } from "react";
import PortfolioFilters from "./PortfolioFilters";
import { filterPortfolioProjects, getPortfolioTags, groupPortfolioProjects } from "../../lib/util/portfolio";
import PortfolioCard from "./PortfolioCard";

export default function PortfolioList({ projects = [] }) {
  const [selectedTag, setSelectedTag] = useState(null);
  const tags = getPortfolioTags(projects);
  const years = groupPortfolioProjects(filterPortfolioProjects(projects, selectedTag));
  return (
    <section aria-label="Portfolio projects" className="min-w-0 w-full">
      <PortfolioFilters tags={tags} selectedTag={selectedTag} onSelect={setSelectedTag} />
      <div className="mt-12 space-y-16">
        {years.map(({ year, months }) => <section key={year} aria-label={`${year} projects`}>
          <h2 className="mb-8 font-logo text-4xl">{year}</h2>
          <div className="grid grid-cols-1 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 xl:grid-cols-4 xl:gap-x-8">
            {months.flatMap((month) => month.projects.map((project, index) => <div key={project._id || project.slug} className="min-w-0">
              {year !== "Ongoing" && <div className="mb-5 min-h-5 text-sm text-foreground/60">{index === 0 && month.label && <time dateTime={project.projectDate}>{month.label}</time>}</div>}
              <PortfolioCard project={project} />
            </div>))}
          </div>
        </section>)}
        {!years.length && <p className="py-12 text-foreground/60">{projects.length ? "No projects match this tag." : "New projects are coming soon."}</p>}
      </div>
    </section>
  );
}
