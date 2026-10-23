"use client";

import { useState } from "react";
import { groupPortfolioProjects } from "../../lib/util/portfolio";
import PortfolioCard from "./PortfolioCard";

export default function PortfolioList({ projects = [] }) {
  const [openProject, setOpenProject] = useState(null);
  const years = groupPortfolioProjects(projects);
  return (
    <section aria-label="Portfolio projects" className="min-w-0 w-full">
      <div className="space-y-16">
        {years.map(({ year, months }) => <section key={year} aria-label={`${year} projects`}>
          <h2 className="mb-8 font-logo text-4xl">{year}</h2>
          <div className="grid grid-cols-1 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 xl:grid-cols-4 xl:gap-x-8">
            {months.flatMap((month) => month.projects.map((project, index) => <div key={project._id || project.slug} className="min-w-0">
              {year !== "Ongoing" && <div className="mb-5 min-h-5 text-sm text-foreground/60">{index === 0 && month.label && <time dateTime={project.projectDate}>{month.label}</time>}</div>}
              <PortfolioCard project={project} expanded={openProject === project} onExpandedChange={(expanded) => setOpenProject((current) => expanded ? project : current === project ? null : current)} />
            </div>))}
          </div>
        </section>)}
        {!years.length && <p className="py-12 text-foreground/60">New projects are coming soon.</p>}
      </div>
    </section>
  );
}
