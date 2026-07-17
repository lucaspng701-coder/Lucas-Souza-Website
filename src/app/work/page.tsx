import type { Metadata } from "next";
import { ProjectCard } from "../components/ProjectCard";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Work — Lucas Souza",
  description: "Selected 3D, 2D and interactive motion work by Lucas Souza.",
};

export default function WorkPage() {
  return (
    <main className="inner-page work-index grid-surface">
      <section className="page-hero section-pad">
        <div className="page-eyebrow">
          <span>Index / 01—{String(projects.length).padStart(2, "0")}</span>
          <span>Motion · Design · Interaction</span>
        </div>
        <h1>Selected<br /><em>work.</em></h1>
        <p>A collection of motion systems, visual experiments and interactive experiences.</p>
      </section>

      <section className="work-index-grid section-pad" aria-label="All projects">
        <div className="projects-grid projects-grid-index">
          {projects.map((project, index) => (
            <ProjectCard project={project} index={index} key={project.id} />
          ))}
        </div>
      </section>
    </main>
  );
}
