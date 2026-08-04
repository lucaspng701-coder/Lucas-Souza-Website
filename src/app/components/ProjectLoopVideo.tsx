"use client";

import type { ProjectCoverVideo } from "@/data/projects";
import { useEffect, useRef } from "react";

export function ProjectLoopVideo({
  video,
  className,
  label,
}: {
  video: ProjectCoverVideo;
  className: string;
  label: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    let isVisible = false;
    let isMounted = true;
    let resumeFrame = 0;

    videoElement.defaultMuted = true;
    videoElement.muted = true;

    const playVisibleVideo = () => {
      if (!isMounted || !isVisible || document.hidden) return;

      if (
        Number.isFinite(videoElement.duration) &&
        videoElement.currentTime >= videoElement.duration - 0.08
      ) {
        videoElement.currentTime = 0;
      }

      void videoElement.play().catch(() => {
        // Muted playback is retried when the card re-enters the viewport.
      });
    };

    const handlePause = () => {
      if (!isMounted || !isVisible || document.hidden) return;
      window.cancelAnimationFrame(resumeFrame);
      resumeFrame = window.requestAnimationFrame(playVisibleVideo);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        videoElement.pause();
      } else {
        playVisibleVideo();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting && entry.intersectionRatio > 0.08;

        if (isVisible) {
          playVisibleVideo();
        } else {
          videoElement.pause();
        }
      },
      { threshold: [0, 0.08, 0.25] },
    );

    observer.observe(videoElement);
    videoElement.addEventListener("canplay", playVisibleVideo);
    videoElement.addEventListener("ended", playVisibleVideo);
    videoElement.addEventListener("pause", handlePause);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      isMounted = false;
      isVisible = false;
      window.cancelAnimationFrame(resumeFrame);
      observer.disconnect();
      videoElement.removeEventListener("canplay", playVisibleVideo);
      videoElement.removeEventListener("ended", playVisibleVideo);
      videoElement.removeEventListener("pause", handlePause);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className={className}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      aria-label={label}
    >
      {video.webm ? <source src={video.webm} type="video/webm" /> : null}
      <source src={video.mp4} type="video/mp4" />
    </video>
  );
}
