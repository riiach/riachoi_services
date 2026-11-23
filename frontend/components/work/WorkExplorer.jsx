"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { workFolderColor, workFolderImages } from "../../lib/work";

export default function WorkExplorer({ projects }) {
  return (
    <section className="work-shell">
      <header className="work-intro">
        <div>
          <p className="work-eyebrow">SELECTED COLLABORATIONS</p>
          <h1 className="work-heading">Work<span className="work-heading-dot">.</span></h1>
          <p className="work-lead">A collection of thoughtful projects, organized one folder at a time.</p>
        </div>
        <span className="work-count">{projects.length} {projects.length === 1 ? "PROJECT" : "PROJECTS"}</span>
      </header>
      <div className="work-folder-grid">
        {projects.map((project, index) => {
          const images = workFolderImages(project);
          const color = workFolderColor(project, index);
          return (
            <Link
              className="work-folder-link"
              key={project._id || project.slug}
              href={"/work/" + encodeURIComponent(project.slug)}
              aria-label={"Open " + project.title + " project"}
            >
              <div className={"work-folder work-folder--" + color}>
                <span className="work-folder__tab" aria-hidden="true" />
                <div className="work-folder__previews" aria-hidden="true">
                  {images.map((photo, imageIndex) => (
                    <span
                      key={photo._key || photo.url || imageIndex}
                      className={"work-folder__preview work-folder__preview--" + (imageIndex + 1)}
                    >
                      <Image src={photo.url} alt="" fill sizes="180px" className="object-cover" />
                      {(project.entries?.[imageIndex]?.workType || project.workTypes?.[imageIndex]) && (
                        <span className="work-folder__preview-label">{project.entries?.[imageIndex]?.workType || project.workTypes?.[imageIndex]}</span>
                      )}
                    </span>
                  ))}
                </div>
                <div className="work-folder__front">
                  <span className="work-folder__glassshine" />
                  <span className="work-folder__title">{project.title}</span>
                  <span className="work-folder__bottom">
                    <span>{project.entries?.length || 0} work {(project.entries?.length || 0) === 1 ? "piece" : "pieces"}</span>
                    <ArrowUpRight aria-hidden="true" size={19} strokeWidth={1.5} />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
