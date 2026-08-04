"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { type MouseEvent, useMemo, useRef, useState } from "react";
import { FooterSocialLinks } from "./components/FooterSocialLinks";
import { ProjectCard } from "./components/ProjectCard";
import { HeroKineticGrid } from "./components/HeroKineticGrid";
import { filters, getProjectCategories, visibleProjects, type ProjectFilter } from "@/data/projects";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

const clientLogos = [
  { id: "coca-cola", src: "/clients/coca-cola.svg", name: "Coca-Cola" },
  { id: "ikea", src: "/clients/ikea.svg", name: "IKEA" },
  { id: "teachable", src: "/clients/teachable.svg", name: "Teachable" },
  { id: "infinitepay", src: "/clients/infinitepay.svg", name: "InfinitePay" },
  { id: "vizuo", src: "/clients/vizuo.svg", name: "Vizuo" },
  { id: "drata", src: "/clients/drata.svg", name: "Drata" },
  { id: "jurafuchs", src: "/clients/jurafuchs.svg", name: "Jurafuchs" },
];

const services = [
  {
    title: "Product and launch videos",
    description:
      "60 to 90 second films for homepages, launches and feature releases.",
  },
  {
    title: "UI and interface animation",
    description:
      "Bringing product screens into motion, without relying on raw screen recordings.",
  },
  {
    title: "Campaign and social assets",
    description:
      "Every piece resized and adapted for each platform, ready to post.",
  },
  {
    title: "Brand motion systems",
    description:
      "Reusable templates and guidelines so your team can keep producing between projects.",
  },
] as const;

function VideoShowreel() {
  return (
    <section
      className="showreel-section section-pad"
      id="reel"
      aria-label="Lucas Souza motion design showreel"
    >
      <div className="showreel-inner">
        <div className="video-frame">
          <iframe
            src="https://player.vimeo.com/video/1095848173?autoplay=1&muted=1&loop=1&autopause=0&controls=1&title=0&byline=0&portrait=0&dnt=1"
            title="SaaS product launch video showreel by Lucas Souza, 2D and 3D motion designer"
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
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("All");

  const filteredProjects = useMemo(
    () =>
      activeFilter === "All"
        ? visibleProjects
        : visibleProjects.filter((project) => getProjectCategories(project).includes(activeFilter)),
    [activeFilter],
  );

  const handleWatchReel = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const reel = document.getElementById("reel");
    if (!reel) return;

    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTo(reel, true, "top top");
      return;
    }

    reel.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  };

  const handleBackToTop = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTo(0, true);
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

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

        gsap.to(".service-word", {
          color: "rgba(242, 240, 234, 1)",
          stagger: 0.025,
          ease: "none",
          scrollTrigger: {
            trigger: ".what-i-do-section",
            start: "top 68%",
            end: "bottom 42%",
            scrub: 0.7,
          },
        });

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

        gsap.from(".what-title-line", {
          yPercent: 115,
          rotation: 2,
          duration: 1.05,
          ease: "power4.out",
          transformOrigin: "left bottom",
          scrollTrigger: {
            trigger: ".what-i-do-heading",
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

  useGSAP(
    (_, contextSafe) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      if (!contextSafe) return;

      const links = gsap.utils.toArray<HTMLAnchorElement>(
        ".gsap-action-link",
        pageRef.current,
      );

      const cleanups = links.map((link) => {
        const label = link.querySelector<HTMLElement>("[data-action-label]");
        const fill = link.querySelector<HTMLElement>("[data-action-fill]");
        const restingColor = getComputedStyle(link).color;

        const enter = contextSafe(() => {
          gsap.to(fill, {
            scaleX: 1,
            duration: 0.55,
            ease: "power4.out",
            overwrite: "auto",
          });
          gsap.to(label, {
            x: 9,
            duration: 0.45,
            ease: "power3.out",
            overwrite: "auto",
          });
          gsap.to(link, {
            color: "#070707",
            duration: 0.25,
            overwrite: "auto",
          });
        });

        const leave = contextSafe(() => {
          gsap.to(fill, {
            scaleX: 0,
            transformOrigin: "right center",
            duration: 0.45,
            ease: "power3.inOut",
            overwrite: "auto",
            onComplete: () => gsap.set(fill, { transformOrigin: "left center" }),
          });
          gsap.to(label, {
            x: 0,
            duration: 0.4,
            ease: "power3.out",
            overwrite: "auto",
          });
          gsap.to(link, {
            color: restingColor,
            duration: 0.25,
            overwrite: "auto",
          });
        });

        link.addEventListener("pointerenter", enter);
        link.addEventListener("pointerleave", leave);
        link.addEventListener("focus", enter);
        link.addEventListener("blur", leave);

        return () => {
          link.removeEventListener("pointerenter", enter);
          link.removeEventListener("pointerleave", leave);
          link.removeEventListener("focus", enter);
          link.removeEventListener("blur", leave);
        };
      });

      return () => cleanups.forEach((cleanup) => cleanup());
    },
    { scope: pageRef },
  );

  return (
    <main ref={pageRef} className="site-shell">
      <section className="hero grid-surface section-pad" id="top">
        <HeroKineticGrid />
        <div className="hero-topline hero-meta">
          <span>Available for new projects</span>
          <span>Replies within 2 hours</span>
        </div>

        <div className="hero-copy">
          <h1
            className="hero-title hero-title-intro"
            aria-label="Hi, I'm Lucas Souza. Motion Designer and Art Director. Based in Brazil."
          >
            <span className="hero-line">
              <span className="hero-line-text">Hi, I&apos;m Lucas Souza.</span>
            </span>
            <span className="hero-line">
              <span className="hero-line-text">Motion Designer</span>
            </span>
            <span className="hero-line hero-line-indent">
              <span className="hero-line-text">&amp; Art Director</span>
            </span>
            <span className="hero-line hero-line-last">
              <span className="hero-line-text">Based in Brazil.</span>
            </span>
          </h1>
            <p className="hero-subtitle hero-meta">
              Motion designer and art director. 8+ years in 2D and 3D, working
              with product and marketing teams in the US and Europe.
            </p>

          <div className="hero-actions hero-meta">
            <Link className="hero-cta hero-cta-primary" href="/contact">
              Start a project <span aria-hidden="true">↗</span>
            </Link>
            <a className="hero-cta" href="#reel" onClick={handleWatchReel}>
              Watch the reel <span aria-hidden="true">↓</span>
            </a>
          </div>

        </div>
      </section>

      <section className="clients-section section-pad" aria-labelledby="trusted-by-title">
        <p className="clients-label" id="trusted-by-title">Companies that I&apos;ve worked with</p>
        <div className="client-logo-grid">
          {clientLogos.map((logo) => (
            <div className="client-logo-slot" key={logo.name}>
              <div className="client-logo-magnet">
                <Image
                  src={logo.src}
                  alt={`${logo.name} client logo — motion design work by Lucas Souza`}
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

      <section className="projects-section section-pad grid-surface" id="work">
        <div className="projects-inner">
          <div className="projects-heading" aria-label="Selected works">
            <span className="projects-title-mask"><span className="projects-title-line">Selected</span></span>
            <span className="projects-title-mask projects-title-indent"><span className="projects-title-line">Works</span></span>
          </div>

          <div className="filter-bar" role="group" aria-label="Filter projects by category">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={activeFilter === filter ? "filter-button is-active" : "filter-button"}
                aria-pressed={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="projects-grid" aria-live="polite">
            {filteredProjects.map((project) => (
              <ProjectCard project={project} key={project.id} />
            ))}
          </div>

          <div className="works-cta">
            <Link className="gsap-action-link" href="/work">
              <span data-action-label>View all work</span>
              <span data-action-arrow aria-hidden="true">→</span>
              <span className="action-hover-fill" data-action-fill aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section
        className="what-i-do-section section-pad grid-surface"
        id="services"
        aria-labelledby="what-i-do-title"
      >
        <h2 className="what-i-do-heading projects-heading" id="what-i-do-title">
          <span className="projects-title-mask">
            <span className="what-title-line">What I</span>
          </span>
          <span className="projects-title-mask projects-title-indent">
            <span className="what-title-line">Do</span>
          </span>
        </h2>

        <div className="services-list">
          {services.map((service, index) => (
            <article className="service-item" key={service.title}>
              <span className="service-index">{String(index + 1).padStart(2, "0")}</span>
              <h3>{service.title}</h3>
              <p aria-label={service.description}>
                {service.description.split(" ").map((word, wordIndex) => (
                  <span
                    className="service-word"
                    aria-hidden="true"
                    key={`${word}-${wordIndex}`}
                  >
                    {word}{" "}
                  </span>
                ))}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-section section-pad" id="contact">
        <div className="contact-copy">
          <p>Have a SaaS product to show?</p>
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
          <a className="gsap-action-link" href="mailto:lucassouzajr@gmail.com">
            <span data-action-label>lucassouzajr@gmail.com</span>
            <span data-action-arrow aria-hidden="true">→</span>
            <span className="action-hover-fill" data-action-fill aria-hidden="true" />
          </a>
          <Link className="gsap-action-link" href="/contact">
            <span data-action-label>Start a project</span>
            <span data-action-arrow aria-hidden="true">→</span>
            <span className="action-hover-fill" data-action-fill aria-hidden="true" />
          </Link>
        </div>

        <FooterSocialLinks />

        <div className="footer-note">
          <span>Lucas Souza © 2026 · Motion Design · Art Direction · Working with teams in the US and Europe</span>
          <a href="#top" onClick={handleBackToTop}>Back to top ↑</a>
        </div>
      </section>
    </main>
  );
}
