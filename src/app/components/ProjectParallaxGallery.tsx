"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type GalleryImage = {
  src: string;
  alt: string;
  position?: string;
};

const images: GalleryImage[] = [
  { src: "/images/test/SKANv2.png", alt: "SKAN drone campaign composition" },
  { src: "/images/test/Edit.png", alt: "InfinitePay black card render" },
  { src: "/images/test/Edit03.png", alt: "InfinitePay white card render" },
  { src: "/images/test/F2 2.png", alt: "Black SKAN drone render" },
  { src: "/images/test/btc_720.png", alt: "Bitcoin product interface render" },
];

export function ProjectParallaxGallery() {
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
    <section className="project-parallax-gallery" ref={galleryRef} aria-label="Project image study">
      <ParallaxFrame image={images[0]} className="project-parallax-wide" priority />

      <div className="project-parallax-pair">
        <ParallaxFrame image={images[1]} className="project-parallax-square" />
        <ParallaxFrame image={images[2]} className="project-parallax-square" />
      </div>

      <ParallaxFrame image={images[3]} className="project-parallax-wide project-parallax-shallow" />
      <ParallaxFrame image={images[4]} className="project-parallax-square project-parallax-centered" />
    </section>
  );
}

function ParallaxFrame({
  image,
  className,
  priority = false,
}: {
  image: GalleryImage;
  className: string;
  priority?: boolean;
}) {
  return (
    <figure className={`project-parallax-frame ${className}`} data-parallax-frame>
      <div className="project-parallax-image" data-parallax-image>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 88vw"
          style={{ objectPosition: image.position ?? "center center" }}
        />
      </div>
    </figure>
  );
}
