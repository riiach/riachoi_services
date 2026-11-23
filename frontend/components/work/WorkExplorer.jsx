"use client";

import Image from "next/image";
import Link from "next/link";
import { workFolderColor, workFolderImages } from "../../lib/work";

export default function WorkExplorer({ projects }) {
  return (
    <section className="work-shell work-shell--folders" aria-label="Work projects">
      <div className="work-folder-count" aria-live="polite">{projects.length} {projects.length === 1 ? "PROJECT" : "PROJECTS"}</div>
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
                <div className="work-folder__back" aria-hidden="true" />
                <div className="work-folder__previews" aria-hidden="true">
                  {images.map((photo, imageIndex) => (
                    <span
                      key={photo._key || photo.url || imageIndex}
                      className={"work-folder__preview work-folder__preview--" + (imageIndex + 1)}
                    >
                      <Image src={photo.url} alt="" fill sizes="(max-width: 640px) 350px, 260px" className="object-cover" />
                      {(project.entries?.[imageIndex]?.workType || project.workTypes?.[imageIndex]) && (
                        <span className="work-folder__preview-label">
                          {project.entries?.[imageIndex]?.workType || project.workTypes?.[imageIndex]}
                        </span>
                      )}
                    </span>
                  ))}
                </div>
                <div className="work-folder__front" aria-hidden="true">
                  <span className="work-folder__glassshine" />
                  <span className="work-folder__title">{project.title}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
