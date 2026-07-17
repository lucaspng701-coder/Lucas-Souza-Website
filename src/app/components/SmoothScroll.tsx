"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

export function SmoothScroll({ children }: { children: ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const smoother = ScrollSmoother.get();
    smoother?.paused(true);

    const resetScroll = () => {
      window.scrollTo(0, 0);
      smoother?.scrollTop(0);
    };

    resetScroll();

    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      resetScroll();
      ScrollTrigger.refresh();

      secondFrame = window.requestAnimationFrame(() => {
        resetScroll();
        smoother?.paused(false);
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      smoother?.paused(false);
    };
  }, [pathname]);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add(
        {
          desktop: "(min-width: 769px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { desktop, reduceMotion } = context.conditions ?? {};
          if (!desktop || reduceMotion) return;

          const smoother = ScrollSmoother.create({
            wrapper: wrapperRef.current,
            content: contentRef.current,
            smooth: 1,
            smoothTouch: 0,
            effects: true,
          });

          return () => smoother.kill();
        },
      );

      return () => media.revert();
    },
    { scope: wrapperRef },
  );

  return (
    <div id="smooth-wrapper" ref={wrapperRef}>
      <div id="smooth-content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
}
