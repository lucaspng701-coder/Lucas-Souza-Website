import type { ProjectCoverVideo } from "@/data/projects";

export function ProjectLoopVideo({
  video,
  className,
}: {
  video: ProjectCoverVideo;
  className: string;
}) {
  return (
    <video
      className={className}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      aria-hidden="true"
    >
      <source src={video.webm} type="video/webm" />
      <source src={video.mp4} type="video/mp4" />
    </video>
  );
}
