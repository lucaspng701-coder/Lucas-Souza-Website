"use client";

import Player from "@vimeo/player";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  FaBehance,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Category = "All" | "3D Motion" | "2D Motion" | "Interactive";

const filters: Category[] = ["All", "3D Motion", "2D Motion", "Interactive"];

const projects = [
  {
    id: "lumen",
    title: "Lumen",
    category: "3D Motion" as const,
    discipline: "Art direction · CGI",
    year: "2026",
    visual: "orb",
  },
  {
    id: "orbit",
    title: "Orbit Studies",
    category: "3D Motion" as const,
    discipline: "Form study · Simulation",
    year: "2025",
    visual: "orbit",
  },
  {
    id: "flux",
    title: "Flux Titles",
    category: "2D Motion" as const,
    discipline: "Title design · Type",
    year: "2025",
    visual: "type",
  },
  {
    id: "signal",
    title: "Signal Bloom",
    category: "2D Motion" as const,
    discipline: "Identity · Motion system",
    year: "2024",
    visual: "signal",
  },
  {
    id: "nova",
    title: "Nova Interface",
    category: "Interactive" as const,
    discipline: "UX/UI · Prototyping",
    year: "2026",
    visual: "interface",
  },
  {
    id: "kinetic",
    title: "Kinetic Commerce",
    category: "Interactive" as const,
    discipline: "Interaction · Web design",
    year: "2025",
    visual: "kinetic",
  },
];

function VideoShowreel() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<Player | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!iframeRef.current) return;

    const player = new Player(iframeRef.current);
    playerRef.current = player;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    player.on("play", handlePlay);
    player.on("pause", handlePause);

    return () => {
      player.off("play", handlePlay);
      player.off("pause", handlePause);
      playerRef.current = null;
    };
  }, []);

  const togglePlayback = async () => {
    const player = playerRef.current;
    if (!player) return;

    try {
      if (isPlaying) {
        await player.pause();
      } else {
        await player.play();
      }
    } catch {
      // Vimeo can reject playback briefly while the player is still loading.
    }
  };

  return (
    <section className="showreel-section section-pad" id="reel" aria-label="Showreel">
      <div className="section-kicker reveal-copy">
        <span>01 / Showreel</span>
        <span>Sound off · Loop on</span>
      </div>

      <div className="video-frame">
        <iframe
          ref={iframeRef}
          src="https://player.vimeo.com/video/1095848173?autoplay=1&muted=1&loop=1&autopause=0&controls=0&title=0&byline=0&portrait=0&dnt=1"
          title="Lucas Souza motion design showreel"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
        <button
          className="video-control"
          type="button"
          onClick={togglePlayback}
          aria-label={isPlaying ? "Pause showreel" : "Play showreel"}
        >
          <span className="video-control-icon" aria-hidden="true">
            {isPlaying ? "Ⅱ" : "▶"}
          </span>
          <span>{isPlaying ? "Pause" : "Play"}</span>
        </button>
        <div className="video-corner video-corner-top" aria-hidden="true">LS® / 26</div>
        <div className="video-corner video-corner-bottom" aria-hidden="true">00:54 LOOP</div>
      </div>
    </section>
  );
}

export default function Home() {
  const pageRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState<Category>("All");

  const filteredProjects = useMemo(
    () =>
      activeFilter === "All"
        ? projects
        : projects.filter((project) => project.category === activeFilter),
    [activeFilter],
  );

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          desktop: "(min-width: 800px)",
        },
        (context) => {
          const { motion, desktop } = context.conditions as {
            motion: boolean;
            desktop: boolean;
          };

          if (!motion) {
            gsap.set(".hero-line-text, .hero-meta, .site-header", {
              clearProps: "all",
            });
            return;
          }

          const intro = gsap.timeline({
            defaults: { duration: 1.05, ease: "power4.out" },
          });

          intro
            .from(".site-header", { y: -24, autoAlpha: 0, duration: 0.7 })
            .from(
              ".hero-line-text",
              { yPercent: 115, rotation: 2, stagger: 0.09 },
              0.08,
            )
            .from(
              ".hero-meta",
              { y: 18, autoAlpha: 0, stagger: 0.08, duration: 0.65 },
              0.62,
            )
            .from(
              ".hero-mark",
              { scale: 0.4, rotation: -45, autoAlpha: 0, duration: 0.8 },
              0.4,
            );

          gsap.to(".hero-mark", {
            rotation: 150,
            yPercent: 42,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero",
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          });

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

          gsap.from(".reveal-copy", {
            y: 30,
            autoAlpha: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".showreel-section",
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          });

          gsap.from(".projects-title-line", {
            yPercent: 110,
            stagger: 0.08,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: ".projects-heading",
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          });

          if (desktop) {
            gsap.to(".contact-orbit", {
              rotation: 120,
              ease: "none",
              scrollTrigger: {
                trigger: ".contact-section",
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            });
          }
        },
        pageRef,
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
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Lucas Souza, back to top">
          LUCAS<span>®</span>SOUZA
        </a>
        <nav className="top-nav" aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
        </nav>
        <span className="availability"><i aria-hidden="true" /> Available for selected work</span>
      </header>

      <section className="hero grid-surface section-pad" id="top">
        <div className="hero-topline hero-meta">
          <span>Motion designer &amp; creative developer</span>
          <span>Florianópolis, Brazil · 27.59° S</span>
        </div>

        <h1 className="hero-title" aria-label="I help brands bring ideas to life with design and motion.">
          <span className="hero-line"><span className="hero-line-text">I help brands</span></span>
          <span className="hero-line hero-line-indent"><span className="hero-line-text">bring ideas</span></span>
          <span className="hero-line"><span className="hero-line-text">to life with</span></span>
          <span className="hero-line hero-line-last"><span className="hero-line-text">design &amp; motion<span className="acid-dot">.</span></span></span>
        </h1>

        <div className="hero-bottom hero-meta">
          <p>Turning strategy into expressive visuals, tactile interfaces and motion that makes ideas feel real.</p>
          <a href="#reel">Scroll to explore <span aria-hidden="true">↓</span></a>
        </div>

        <div className="hero-mark" aria-hidden="true">
          <span>MAKE</span><span>IT</span><span>MOVE</span>
        </div>
      </section>

      <VideoShowreel />

      <section className="projects-section section-pad grid-surface" id="work">
        <div className="section-kicker">
          <span>02 / Selected work</span>
          <span>{String(filteredProjects.length).padStart(2, "0")} projects</span>
        </div>

        <div className="projects-heading" aria-label="Selected experiments">
          <span className="projects-title-mask"><span className="projects-title-line">Selected</span></span>
          <span className="projects-title-mask projects-title-indent"><span className="projects-title-line">experiments</span></span>
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
            <article className="project-card" key={project.id}>
              <div className="project-visual" data-visual={project.visual}>
                <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
                <div className="visual-object" aria-hidden="true" />
                <span className="project-view">Selected study</span>
              </div>
              <div className="project-info">
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.discipline}</p>
                </div>
                <div className="project-meta">
                  <span>{project.category}</span>
                  <span>{project.year}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-section section-pad" id="contact">
        <div className="section-kicker">
          <span>03 / Contact</span>
          <span>Open for collaborations</span>
        </div>

        <div className="contact-copy">
          <p>Have a project in mind?</p>
          <h2>Let&apos;s make<br />it <em>move.</em></h2>
          <div className="contact-orbit" aria-hidden="true"><span>HELLO</span></div>
        </div>

        <div className="contact-links">
          <a href="mailto:lucassouzajr@gmail.com">lucassouzajr@gmail.com <span aria-hidden="true">↗</span></a>
          <a href="https://wa.me/5548999009117" target="_blank" rel="noreferrer">WhatsApp · +55 48 99900-9117 <span aria-hidden="true">↗</span></a>
        </div>

        <div className="footer-note">
          <span>Lucas Souza © 2026</span>
          <span>Design · Motion · Interaction</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </section>

      <aside className="social-dock" aria-label="Social links">
        <span className="social-dock-label">Follow</span>
        <a href="https://www.linkedin.com/in/lucas-souza-82a595137/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
        <a href="https://www.instagram.com/_lucas.png/" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
        <a href="https://x.com/insomni4_jpg" target="_blank" rel="noreferrer" aria-label="X"><FaXTwitter /></a>
        <a href="https://www.behance.net/lucas_png" target="_blank" rel="noreferrer" aria-label="Behance"><FaBehance /></a>
        <span className="social-dock-rule" aria-hidden="true" />
        <a href="https://wa.me/5548999009117" target="_blank" rel="noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
      </aside>
    </main>
  );
}
