import type { Metadata } from "next";
import { PageTitleReveal } from "../components/PageTitleReveal";
import { ProjectCard } from "../components/ProjectCard";
import { FooterSocialLinks } from "../components/FooterSocialLinks";
import { visibleProjects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Work — Lucas Souza",
  description: "Selected 3D, 2D and interactive motion work by Lucas Souza.",
};

export default function WorkPage() {
  return (
    <main className="inner-page work-index grid-surface">
      <section className="page-hero section-pad">
        <div className="page-eyebrow">
          <span>Selected archive</span>
          <span>Motion · Design · Interaction</span>
        </div>
        <PageTitleReveal firstLine="Selected" secondLine="Works." />
        <p>A collection of motion systems, visual experiments and interactive experiences.</p>
      </section>

      <section className="work-index-grid section-pad" aria-label="All projects">
        <div className="projects-grid projects-grid-index">
          {visibleProjects.map((project) => (
            <ProjectCard project={project} key={project.id} />
          ))}
        </div>
      </section>

      <footer className="inner-social-footer section-pad">
        <FooterSocialLinks dark />
      </footer>
    </main>
  );
}
