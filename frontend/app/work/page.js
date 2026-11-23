import "./work.css";
import WorkExplorer from "../../components/work/WorkExplorer";
import { getWorkProjects } from "../../sanity/data";

export const revalidate = 60;
export const metadata = {
  title: "Work | Ria Choi",
  description: "Selected client projects and interactive work by Ria Choi.",
};

export default async function WorkPage() {
  const projects = await getWorkProjects();
  return (
    <main aria-label="Work" className="min-h-dvh">
      <WorkExplorer projects={projects} />
    </main>
  );
}
