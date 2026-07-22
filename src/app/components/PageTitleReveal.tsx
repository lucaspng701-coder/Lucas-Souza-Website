"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

type PageTitleRevealProps = {
  firstLine: string;
  secondLine: string;
};

export function PageTitleReveal({ firstLine, secondLine }: PageTitleRevealProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".page-title-reveal-line", {
          yPercent: 115,
          rotation: 2,
          stagger: 0.1,
          duration: 1.05,
          ease: "power4.out",
          transformOrigin: "left bottom",
        });
      });

      return () => media.revert();
    },
    { scope: titleRef },
  );

  return (
    <h1 ref={titleRef} aria-label={`${firstLine} ${secondLine}`}>
      <span className="page-title-reveal-mask" aria-hidden="true">
        <span className="page-title-reveal-line">{firstLine}</span>
      </span>
      <span className="page-title-reveal-mask" aria-hidden="true">
        <em className="page-title-reveal-line">{secondLine}</em>
      </span>
    </h1>
  );
}
