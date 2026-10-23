import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPortfolioProject } from "../../../sanity/data";
import { getPortfolioImages } from "../../../lib/util/portfolio-images";
import { urlFor } from "../../../sanity/image";
import { getProjectTags } from "../../../lib/util/portfolio";
import PortfolioTag from "../../../components/portfolio/PortfolioTag";
import PortableContent from "../../../components/PortableContent";
import ArticleNavigation from "../../../components/ArticleNavigation";

export const revalidate = 60;
export function generateStaticParams() { return []; }

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getPortfolioProject(slug);
  return project ? { title: `${project.title} | Ria Choi`, description: project.summary || "" } : { title: "Project not found" };
}

export default async function PortfolioProject({ params }) {
  const { slug } = await params;
  const project = await getPortfolioProject(slug);
  if (!project) notFound();
  const images = getPortfolioImages(project, (image) => urlFor(image).width(1600).url());
  return (
    <main className="min-h-screen px-4 pt-24 pb-4 xl:px-10 2xl:px-48">
      <article className="mx-auto w-full min-w-0 max-w-5xl [overflow-wrap:anywhere]">
        <Link href="/portfolio" className="text-sm text-foreground/60 transition-opacity hover:opacity-60">← Portfolio</Link>
        <header className="my-8 space-y-4">
          <h1 className="text-3xl leading-tight font-semibold md:text-5xl">{project.title}</h1>
          {project.summary && <p className="text-lg text-foreground/65">{project.summary}</p>}
          <div className="flex flex-wrap gap-2">{getProjectTags(project).map((tag) => <PortfolioTag key={tag}>{tag}</PortfolioTag>)}</div>
          {project.projectDate && <time dateTime={project.projectDate} className="block text-sm text-foreground/60">{project.projectDate}</time>}
        </header>
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {images.map((image, index) => <div key={image.key} className={`relative overflow-hidden rounded-2xl bg-primary ${index === 0 ? "aspect-video md:col-span-2" : "aspect-[4/3]"}`}>
            <Image src={image.src} unoptimized={image.unoptimized} alt={image.alt} fill sizes={index === 0 ? "(min-width: 1280px) 1024px, 100vw" : "(min-width: 768px) 50vw, 100vw"} className="object-cover" />
          </div>)}
        </div>
        {project.content?.length > 0 && <div className="blog-content"><PortableContent value={project.content} /></div>}
        <ArticleNavigation value={project.content} />
      </article>
    </main>
  );
}
