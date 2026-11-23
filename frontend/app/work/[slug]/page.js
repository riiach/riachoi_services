import "../work.css";
import { notFound } from "next/navigation";
import WorkProjectDetail from "../../../components/work/WorkProjectDetail";
import { getWorkProject } from "../../../sanity/data";

export const dynamic = "force-dynamic";
export function generateStaticParams() { return []; }

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getWorkProject(slug);
  return project
    ? { title: project.title + " | Work | Ria Choi", description: "Explore " + project.title + " project work." }
    : { title: "Project not found | Work" };
}

export default async function WorkDetailPage({ params }) {
  const { slug } = await params;
  const project = await getWorkProject(slug);
  if (!project) notFound();

  return (
    <main aria-label={project.title + " work"} className="min-h-dvh">
      <WorkProjectDetail project={project} />
    </main>
  );
}
