export const WORK_COLORS = ["sage", "blue", "rose", "lavender", "amber"];

export function withPlante(projects) {
  const values = Array.isArray(projects) ? projects.filter(Boolean) : [];
  return values.some((project) => project.slug === "plante")
    ? values
    : [PLANTE_PREVIEW, ...values];
}

export function workFolderImages(project) {
  const direct = (project?.thumbnails || []).filter((photo) => photo?.url);
  const fromEntries = (project?.entries || []).map((entry) => entry.image).filter((photo) => photo?.url);
  return (direct.length ? direct : fromEntries).slice(0, 3);
}

export function workFolderColor(project, index) {
  return WORK_COLORS.includes(project?.folderColor)
    ? project.folderColor
    : WORK_COLORS[index % WORK_COLORS.length];
}
