import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectParallaxGallery } from "@/app/components/ProjectParallaxGallery";
import { ProjectLoopVideo } from "@/app/components/ProjectLoopVideo";
import { getProject, getProjectCategories, visibleProjects } from "@/data/projects";

export function generateStaticParams() {
  return visibleProjects.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project || project.hidden) return {};

  return {
    title: `${project.title} — Lucas Souza`,
    description: project.summary,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project || project.hidden) notFound();

  const currentIndex = visibleProjects.findIndex((item) => item.id === project.id);
  const nextProject = visibleProjects[(currentIndex + 1) % visibleProjects.length];

  return (
    <main className="inner-page project-page">
      <section className="project-page-hero section-pad">
        <div className="page-eyebrow">
          <Link href="/work">← All work</Link>
          <span>{getProjectCategories(project).join(" / ")}{project.year ? ` / ${project.year}` : ""}</span>
        </div>
        <h1>{project.title}</h1>
        <div className="project-page-intro">
          <p>{project.summary}</p>
          <dl>
            <div>
              <dt>Software used</dt>
              <dd>
                <ul>
                  {project.software.map((software) => (
                    <li key={software}>{software}</li>
                  ))}
                </ul>
              </dd>
            </div>
            {project.year && <div><dt>Year</dt><dd>{project.year}</dd></div>}
          </dl>
        </div>
      </section>

      <section className="project-page-overview section-pad">
        <span className="notes-label">About the project</span>
        <p>{project.description}</p>
      </section>

      <section className="project-page-media section-pad" aria-label={`${project.title} visual`}>
        {project.vimeoId ? (
          <div className="project-video-frame">
            <iframe
              src={`https://player.vimeo.com/video/${project.vimeoId}?title=0&byline=0&portrait=0&dnt=1`}
              title={`${project.title} product video by Lucas Souza, motion designer and art director`}
              allow="fullscreen; picture-in-picture"
              loading="lazy"
              allowFullScreen
            />
          </div>
        ) : project.coverVideo ? (
          <div className="project-video-frame">
            <ProjectLoopVideo
              video={project.coverVideo}
              className="project-page-cover-video"
              label={`${project.title} project video by Lucas Souza, motion designer and art director`}
            />
          </div>
        ) : (
          <div className="project-visual project-visual-large" data-visual={project.visual}>
            <div className="visual-object" aria-hidden="true" />
            <span className="project-view">Case study / selected frame</span>
          </div>
        )}
      </section>

      {project.gallery?.length ? (
        <ProjectParallaxGallery
          projectTitle={project.title}
          rows={project.gallery}
        />
      ) : null}

      {project.detailVideos?.map((video) => (
        <section
          className="project-detail-media section-pad"
          aria-label={video.title}
          key={video.src}
        >
          <span className="notes-label">{video.label ?? "Project film"}</span>
          <div className="project-video-frame project-detail-video-frame">
            <video
              controls
              playsInline
              preload="metadata"
              aria-label={`${video.title} by Lucas Souza, 2D motion designer`}
            >
              <source src={video.src} type="video/mp4" />
            </video>
          </div>
        </section>
      ))}

      <section className="project-page-notes section-pad">
        <div className="project-page-facts">
          <div className="project-page-fact">
            <span className="notes-label">Client</span>
            <ul>{project.client.map((client) => <li key={client}>{client}</li>)}</ul>
          </div>
          <div className="project-page-fact">
            <span className="notes-label">Services</span>
            <ul>{project.services.map((service) => <li key={service}>{service}</li>)}</ul>
          </div>
        </div>
      </section>

      <Link className="next-project section-pad" href={`/work/${nextProject.id}`}>
        <span className="next-project-label">Next Project</span>
        <strong>{nextProject.title}</strong>
        <span aria-hidden="true">↗</span>
      </Link>
    </main>
  );
}
