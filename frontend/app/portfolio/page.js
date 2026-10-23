import { getPortfolioProjects } from "../../sanity/data";
import PortfolioList from "../../components/portfolio/PortfolioList";

export const revalidate = 60;
export const metadata = { title: "Portfolio | Ria Choi", description: "Projects by Ria Choi" };

export default async function Portfolio() {
  const projects = await getPortfolioProjects();
  return (
    <main aria-label="Portfolio" className="min-h-dvh px-4 pt-24 pb-4 xl:px-10 2xl:px-48">
      <h1 className="sr-only">Portfolio</h1>
      <div aria-hidden="true" className="h-[clamp(12rem,30dvh,26rem)]" />
      <PortfolioList projects={projects} />
    </main>
  );
}
