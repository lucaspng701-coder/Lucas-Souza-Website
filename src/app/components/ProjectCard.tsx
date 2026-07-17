import Link from "next/link";
import type { Project } from "@/data/projects";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link className="project-card" href={`/work/${project.id}`}>
      <article>
        <div className="project-visual" data-visual={project.visual}>
          <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
          <div className="visual-object" aria-hidden="true" />
          <span className="project-view">View project ↗</span>
        </div>
        <div className="project-info">
          <div>
            <h3>{project.title}</h3>
            <p>{project.discipline}</p>
          </div>
          <div className="project-meta">
            <span>{project.category}</span>
            {project.year && <span>{project.year}</span>}
          </div>
        </div>
      </article>
    </Link>
  );
}
