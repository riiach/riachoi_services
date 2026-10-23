export function getProjectTags(project) {
  const tags = Array.isArray(project?.tags) ? project.tags : [];
  const unique = new Map();
  for (const tag of tags) {
    if (typeof tag !== "string" || !tag.trim()) continue;
    const label = tag.trim();
    if (!unique.has(label.toLowerCase())) unique.set(label.toLowerCase(), label);
  }
  return [...unique.values()];
}

export function getPortfolioTags(projects) {
  return getProjectTags({ tags: projects.flatMap(getProjectTags) });
}

export function filterPortfolioProjects(projects, tag) {
  if (!tag) return projects;
  return projects.filter((project) => getProjectTags(project).some((item) => item.toLowerCase() === tag.toLowerCase()));
}

export function groupPortfolioProjects(projects) {
  const years = new Map();
  const sorted = [...projects].sort((a, b) => (b.projectDate || "").localeCompare(a.projectDate || ""));
  for (const project of sorted) {
    const date = /^(\d{4})-(0[1-9]|1[0-2])-\d{2}$/.exec(project.projectDate || "");
    const year = date?.[1] || "Undated";
    const month = date?.[2] || "00";
    if (!years.has(year)) years.set(year, new Map());
    const months = years.get(year);
    if (!months.has(month)) months.set(month, []);
    months.get(month).push(project);
  }
  return [...years].map(([year, months]) => ({
    year,
    months: [...months].map(([month, projects]) => ({
      key: `${year}-${month}`,
      label: month === "00" ? "" : new Date(Date.UTC(Number(year), Number(month) - 1, 1)).toLocaleDateString("en-US", { month: "long", timeZone: "UTC" }),
      projects,
    })),
  }));
}
