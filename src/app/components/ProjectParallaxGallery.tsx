"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";
import type {
  ProjectGalleryImage,
  ProjectGalleryRow,
} from "@/data/projects";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function ProjectParallaxGallery({
  projectTitle,
  rows,
}: {
  projectTitle: string;
  rows: ProjectGalleryRow[];
}) {
  const galleryRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add(
        {
          animate: "(prefers-reduced-motion: no-preference)",
          desktop: "(min-width: 769px)",
        },
        (context) => {
          if (!context.conditions?.animate) return;

          const distance = context.conditions.desktop ? 8 : 4;
          const frames = gsap.utils.toArray<HTMLElement>("[data-parallax-frame]");

          frames.forEach((frame) => {
            const image = frame.querySelector<HTMLElement>("[data-parallax-image]");
            if (!image) return;

            gsap.fromTo(
              image,
              { yPercent: -distance },
              {
                yPercent: distance,
                ease: "none",
                scrollTrigger: {
                  trigger: frame,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                  invalidateOnRefresh: true,
                },
              },
            );
          });
        },
      );

      return () => media.revert();
    },
    { scope: galleryRef },
  );

  return (
    <section
      className="project-parallax-gallery"
      ref={galleryRef}
      aria-label={`${projectTitle} gallery`}
    >
      {rows.map((row, rowIndex) =>
        row.type === "pair" ? (
          <div className="project-parallax-pair" key={`pair-${rowIndex}`}>
            {row.images.map((image) => (
              <ParallaxFrame
                image={image}
                className={`project-parallax-${image.aspect}`}
                key={image.src}
                sizes="(max-width: 768px) 100vw, 44vw"
              />
            ))}
          </div>
        ) : (
          <ParallaxFrame
            image={row.image}
            className={`project-parallax-${row.image.aspect}${
              row.width === "narrow" ? " project-parallax-centered" : ""
            }`}
            key={row.image.src}
            priority={rowIndex === 0}
            sizes={
              row.width === "narrow"
                ? "(max-width: 768px) 100vw, 55vw"
                : "(max-width: 768px) 100vw, 88vw"
            }
          />
        ),
      )}
    </section>
  );
}

function ParallaxFrame({
  image,
  className,
  priority = false,
  sizes,
}: {
  image: ProjectGalleryImage;
  className: string;
  priority?: boolean;
  sizes: string;
}) {
  return (
    <figure className={`project-parallax-frame ${className}`} data-parallax-frame>
      <div className="project-parallax-image" data-parallax-image>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={priority}
          sizes={sizes}
          style={{ objectPosition: image.position ?? "center center" }}
        />
      </div>
    </figure>
  );
}
