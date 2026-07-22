import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectLoopVideo } from "@/app/components/ProjectLoopVideo";
import { getProject, getProjectCategories, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return {};

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

  if (!project) notFound();

  const currentIndex = projects.findIndex((item) => item.id === project.id);
  const nextProject = projects[(currentIndex + 1) % projects.length];

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
            <div><dt>Discipline</dt><dd>{project.discipline}</dd></div>
            {project.year && <div><dt>Year</dt><dd>{project.year}</dd></div>}
          </dl>
        </div>
      </section>

      <section className="project-page-media section-pad" aria-label={`${project.title} visual`}>
        {project.vimeoId ? (
          <div className="project-video-frame">
            <iframe
              src={`https://player.vimeo.com/video/${project.vimeoId}?title=0&byline=0&portrait=0&dnt=1`}
              title={`${project.title} video`}
              allow="fullscreen; picture-in-picture"
              loading="lazy"
              allowFullScreen
            />
          </div>
        ) : project.coverVideo ? (
          <div className="project-video-frame">
            <ProjectLoopVideo video={project.coverVideo} className="project-page-cover-video" />
          </div>
        ) : (
          <div className="project-visual project-visual-large" data-visual={project.visual}>
            <span className="project-index">LS / {String(currentIndex + 1).padStart(2, "0")}</span>
            <div className="visual-object" aria-hidden="true" />
            <span className="project-view">Case study / selected frame</span>
          </div>
        )}
      </section>

      <section className="project-page-notes section-pad">
        <div>
          <span className="notes-label">Approach</span>
          <p>The work is shaped through quick visual tests, clear systems and careful attention to how every transition feels in context.</p>
        </div>
        <div>
          <span className="notes-label">Services</span>
          <ul>{project.services.map((service) => <li key={service}>{service}</li>)}</ul>
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
