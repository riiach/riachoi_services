import { getCategories, getPortfolioProjects } from "../../sanity/data";
import Category from "../../components/Category";
import PortfolioList from "../../components/portfolio/PortfolioList";
import { CategoryProvider } from "../../context/category";

export const revalidate = 60;
export const metadata = { title: "Portfolio | Ria Choi", description: "Projects by Ria Choi" };

export default async function Portfolio() {
  const [projects, categories] = await Promise.all([getPortfolioProjects(), getCategories()]);
  return (
    <main aria-label="Portfolio" className="min-h-dvh px-4 pt-24 pb-4 xl:px-10 2xl:px-48">
      <h1 className="sr-only">Portfolio</h1>
      <CategoryProvider>
        <Category categories={categories} headingAs="h2" />
        <PortfolioList projects={projects} />
      </CategoryProvider>
    </main>
  );
}
