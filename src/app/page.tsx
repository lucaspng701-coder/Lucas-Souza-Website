"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { ProjectCard } from "./components/ProjectCard";
import { FooterSocialLinks } from "./components/FooterSocialLinks";
import { filters, getProjectCategories, projects, type ProjectFilter } from "@/data/projects";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ABOUT_COPY =
  "Finding new ways to make cool things. From brand campaigns to product videos and broadcast graphics, I love giving ideas a life of their own.";

const ABOUT_EMPHASIS = new Set([
  0,
  5, 6,
  19, 20, 21,
]);

const clientLogos = [
  { id: "coca-cola", src: "/clients/coca-cola.svg", alt: "Coca-Cola" },
  { id: "ikea", src: "/clients/ikea.svg", alt: "IKEA" },
  { id: "teachable", src: "/clients/teachable.svg", alt: "Teachable" },
  { id: "infinitepay", src: "/clients/infinitepay.svg", alt: "InfinitePay" },
  { id: "vizuo", src: "/clients/vizuo.svg", alt: "Vizuo" },
  { id: "drata", src: "/clients/drata.svg", alt: "Drata" },
  { id: "jurafuchs", src: "/clients/jurafuchs.svg", alt: "JuraFuchs" },
];

function VideoShowreel() {
  return (
    <section className="showreel-section section-pad" id="reel" aria-label="Showreel">
      <div className="showreel-inner">
        <div className="video-frame">
          <iframe
            src="https://player.vimeo.com/video/1095848173?autoplay=1&muted=1&loop=1&autopause=0&controls=1&title=0&byline=0&portrait=0&dnt=1"
            title="Lucas Souza motion design showreel"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const pageRef = useRef<HTMLElement>(null);
  const bioPortraitRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("All");

  const filteredProjects = useMemo(
    () =>
      activeFilter === "All"
        ? projects
        : projects.filter((project) => getProjectCategories(project).includes(activeFilter)),
    [activeFilter],
  );

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const intro = gsap.timeline({
          defaults: { duration: 1.05, ease: "power4.out" },
        });

        intro.from(".hero-line-text", {
          yPercent: 115,
          rotation: 2,
          stagger: 0.1,
        });

        intro.from(
          ".hero-meta",
          { y: 18, autoAlpha: 0, stagger: 0.08, duration: 0.65 },
          0.35,
        );

        gsap.fromTo(
          ".video-frame",
          { clipPath: "inset(12% 8% 12% 8%)", scale: 0.96 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".video-frame",
              start: "top 88%",
              end: "top 28%",
              scrub: 0.8,
            },
          },
        );

        gsap.from(".client-logo-slot", {
          y: 24,
          autoAlpha: 0,
          stagger: 0.06,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".clients-section",
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.to(".bio-word", {
          color: "rgba(242, 240, 234, 1)",
          stagger: 0.055,
          ease: "none",
          scrollTrigger: {
            trigger: ".bio-section",
            start: "top 72%",
            end: "bottom 38%",
            scrub: 0.7,
          },
        });

        gsap.fromTo(
          bioPortraitRef.current,
          { yPercent: -38 },
          {
            yPercent: 38,
            force3D: false,
            ease: "none",
            scrollTrigger: {
              trigger: ".bio-section",
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          },
        );

        gsap.from(".projects-title-line", {
          yPercent: 115,
          rotation: 2,
          stagger: 0.1,
          duration: 1.05,
          ease: "power4.out",
          transformOrigin: "left bottom",
          scrollTrigger: {
            trigger: ".projects-heading",
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.from(".contact-title-line", {
          yPercent: 115,
          rotation: 2,
          stagger: 0.1,
          duration: 1.05,
          ease: "power4.out",
          transformOrigin: "left bottom",
          scrollTrigger: {
            trigger: ".contact-copy",
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        });
      }, pageRef);

      return () => mm.revert();
    },
    { scope: pageRef },
  );

  useGSAP(
    () => {
      const grid = pageRef.current?.querySelector<HTMLElement>(".client-logo-grid");
      if (!grid) return;

      const mm = gsap.matchMedia();

      mm.add(
        "(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)",
        () => {
          const magnets = gsap.utils.toArray<HTMLElement>(
            ".client-logo-magnet",
            grid,
          );
          const slots = gsap.utils.toArray<HTMLElement>(
            ".client-logo-slot",
            grid,
          );
          const setters = magnets.map((magnet) => {
            const scaleX = gsap.quickTo(magnet, "scaleX", {
              duration: 0.38,
              ease: "power3.out",
            });
            const scaleY = gsap.quickTo(magnet, "scaleY", {
              duration: 0.38,
              ease: "power3.out",
            });

            return {
              scale: (value: number) => {
                scaleX(value);
                scaleY(value);
              },
              x: gsap.quickTo(magnet, "x", {
                duration: 0.48,
                ease: "power3.out",
              }),
              y: gsap.quickTo(magnet, "y", {
                duration: 0.48,
                ease: "power3.out",
              }),
            };
          });

          const resetMagnets = () => {
            setters.forEach((setter) => {
              setter.scale(1);
              setter.x(0);
              setter.y(0);
            });
          };

          const handlePointerMove = (event: PointerEvent) => {
            const gridRect = grid.getBoundingClientRect();
            const radius = Math.max(240, gridRect.width * 0.22);
            const positions = slots.map((slot) => {
              const rect = slot.getBoundingClientRect();
              const dx = event.clientX - (rect.left + rect.width / 2);
              const dy = event.clientY - (rect.top + rect.height / 2);
              const distance = Math.hypot(dx, dy);
              const proximity = gsap.utils.clamp(0, 1, 1 - distance / radius);

              return { dx, dy, proximity };
            });

            positions.forEach(({ dx, dy, proximity }, index) => {
              setters[index].scale(1.004 + proximity * 0.075);
              setters[index].x(dx * proximity * 0.035);
              setters[index].y(dy * proximity * 0.035);
            });
          };

          grid.addEventListener("pointermove", handlePointerMove, { passive: true });
          grid.addEventListener("pointerleave", resetMagnets);

          return () => {
            grid.removeEventListener("pointermove", handlePointerMove);
            grid.removeEventListener("pointerleave", resetMagnets);
            gsap.set(magnets, { clearProps: "transform" });
          };
        },
        grid,
      );

      return () => mm.revert();
    },
    { scope: pageRef },
  );

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.fromTo(
        ".project-card",
        { y: 42, autoAlpha: 0, scale: 0.985 },
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 0.72,
          stagger: 0.07,
          ease: "power3.out",
          clearProps: "transform,opacity,visibility",
          onComplete: () => ScrollTrigger.refresh(),
        },
      );
    },
    { dependencies: [activeFilter], scope: pageRef, revertOnUpdate: true },
  );

  return (
    <main ref={pageRef} className="site-shell">
      <section className="hero grid-surface section-pad" id="top">
        <div className="hero-topline hero-meta">
          <span>Motion Designer</span>
          <span>Florianópolis, Brazil · 27.59° S</span>
        </div>

        <div className="hero-copy">
          <h1 className="hero-title hero-title-intro" aria-label="Hi, I'm Lucas Souza, a Brazil based Motion Designer and Art Director">
            <span className="hero-line"><span className="hero-line-text">Hi, I&apos;m Lucas Souza,</span></span>
            <span className="hero-line hero-line-indent"><span className="hero-line-text">a Brazil based</span></span>
            <span className="hero-line"><span className="hero-line-text">Motion Designer</span></span>
            <span className="hero-line hero-line-last"><span className="hero-line-text">&amp; Art Director</span></span>
          </h1>
          <p className="hero-subtitle hero-meta">
            with 8+ years of experience in 2D and 3D animation. I&apos;ve worked on brand campaigns,
            product videos, broadcast graphics, and everything in between, always focused on making
            ideas feel alive.
          </p>
        </div>

        <div className="hero-bottom hero-meta">
          <a href="#reel">Scroll to explore <span aria-hidden="true">↓</span></a>
        </div>
      </section>

      <section className="clients-section section-pad" aria-label="Selected clients">
        <div className="client-logo-grid">
          {clientLogos.map((logo) => (
            <div className="client-logo-slot" key={logo.alt}>
              <div className="client-logo-magnet">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={300}
                  height={100}
                  className={`client-logo-image client-logo--${logo.id}`}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <VideoShowreel />

      <section className="bio-section section-pad grid-surface" aria-labelledby="about-title">
        <div ref={bioPortraitRef} className="bio-portrait" aria-hidden="true">
          <Image
            src="/images/Lucas_Souza_Photo.png"
            alt=""
            width={1254}
            height={1254}
            sizes="(max-width: 640px) 56vw, 22vw"
            className="bio-portrait-image"
          />
        </div>
        <h2 className="sr-only" id="about-title">About Lucas</h2>
        <p className="bio-reveal-copy" aria-label={ABOUT_COPY}>
          {ABOUT_COPY.split(" ").map((word, index) => (
            <span
              className={ABOUT_EMPHASIS.has(index) ? "bio-word bio-word-emphasis" : "bio-word"}
              aria-hidden="true"
              key={`${word}-${index}`}
            >
              {word}{" "}
            </span>
          ))}
        </p>
      </section>

      <section className="projects-section section-pad grid-surface" id="work">
        <div className="projects-inner">
          <div className="projects-heading" aria-label="Selected works">
            <span className="projects-title-mask"><span className="projects-title-line">Selected</span></span>
            <span className="projects-title-mask projects-title-indent"><span className="projects-title-line">works</span></span>
          </div>

          <div className="filter-bar" role="group" aria-label="Filter projects by category">
            {filters.map((filter, index) => (
              <button
                key={filter}
                type="button"
                className={activeFilter === filter ? "filter-button is-active" : "filter-button"}
                aria-pressed={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {filter}
              </button>
            ))}
          </div>

          <div className="projects-grid" aria-live="polite">
            {filteredProjects.map((project, index) => (
              <ProjectCard project={project} index={index} key={project.id} />
            ))}
          </div>

          <div className="works-cta">
            <Link href="/work">View all work <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>

      <section className="contact-section section-pad" id="contact">
        <div className="contact-copy">
          <p>Have a project in mind?</p>
          <h2 aria-label="Let's Talk.">
            <span className="contact-title-mask" aria-hidden="true">
              <span className="contact-title-line">Let&apos;s</span>
            </span>
            <span className="contact-title-mask" aria-hidden="true">
              <em className="contact-title-line">Talk.</em>
            </span>
          </h2>
        </div>

        <div className="contact-links">
          <a href="mailto:lucassouzajr@gmail.com">lucassouzajr@gmail.com <span aria-hidden="true">↗</span></a>
          <Link href="/contact">Start a project <span aria-hidden="true">↗</span></Link>
        </div>

        <FooterSocialLinks />

        <div className="footer-note">
          <span>Lucas Souza © 2026</span>
          <span>Design · Motion · Interaction</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </section>
    </main>
  );
}
