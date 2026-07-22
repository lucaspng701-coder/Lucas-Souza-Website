import Link from "next/link";
import { getProjectCategories, type Project } from "@/data/projects";
import { ProjectLoopVideo } from "./ProjectLoopVideo";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link className="project-card" href={`/work/${project.id}`}>
      <article>
        <div
          className="project-visual"
          data-visual={project.coverVideo ? undefined : project.visual}
          data-has-video={project.coverVideo ? "true" : undefined}
        >
          {project.coverVideo ? (
            <ProjectLoopVideo video={project.coverVideo} className="project-cover-video" />
          ) : (
            <div className="visual-object" aria-hidden="true" />
          )}
          <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
          <span className="project-view">View project ↗</span>
        </div>
        <div className="project-info">
          <div>
            <h3>{project.title}</h3>
            <p>{project.discipline}</p>
          </div>
          <div className="project-meta">
            <span>{getProjectCategories(project).join(" / ")}</span>
            {project.year && <span>{project.year}</span>}
          </div>
        </div>
      </article>
    </Link>
  );
}
