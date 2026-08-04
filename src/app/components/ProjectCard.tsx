import Image from "next/image";
import Link from "next/link";
import { type Project } from "@/data/projects";
import { ProjectLoopVideo } from "./ProjectLoopVideo";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link className="project-card" href={`/work/${project.id}`}>
      <article>
        <div
          className="project-visual"
          data-visual={project.coverVimeoId || project.coverVideo || project.coverImage ? undefined : project.visual}
          data-has-video={project.coverVimeoId || project.coverVideo ? "true" : undefined}
          data-has-image={project.coverImage ? "true" : undefined}
        >
          {project.coverVimeoId ? (
            <iframe
              className="project-cover-video project-cover-vimeo"
              src={`https://player.vimeo.com/video/${project.coverVimeoId}?autoplay=1&muted=1&loop=1&background=1&autopause=0&title=0&byline=0&portrait=0&dnt=1`}
              title={`${project.title} animated project cover by Lucas Souza`}
              allow="autoplay; fullscreen; picture-in-picture"
              loading="lazy"
              tabIndex={-1}
            />
          ) : project.coverVideo ? (
            <ProjectLoopVideo
              video={project.coverVideo}
              className="project-cover-video"
              label={`${project.title} preview — SaaS product animation by Lucas Souza, 2D motion designer`}
            />
          ) : project.coverImage ? (
            <Image
              className="project-cover-image"
              src={project.coverImage.src}
              alt={project.coverImage.alt}
              fill
              sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"
            />
          ) : (
            <div className="visual-object" aria-hidden="true" />
          )}
          <span className="project-view">View project ↗</span>
        </div>
        <div className="project-info">
          <div>
            <h3>{project.title}</h3>
            <p>{project.discipline}</p>
          </div>
        </div>
      </article>
    </Link>
  );
}
