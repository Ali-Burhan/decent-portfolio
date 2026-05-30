import type { ReactNode } from "react";
import { getProjectMedia } from "@/lib/project-media";
import { ProjectScreenshot } from "@/components/project-screenshot";

interface ProjectCoverImageProps {
  slug?: string;
  projectName: string;
  gradientClass: string;
  typeBadge?: ReactNode;
  topRight?: ReactNode;
  /** Taller hero-style cover (case study pages, featured rows) */
  tall?: boolean;
}

export function ProjectCoverImage({
  slug,
  projectName,
  gradientClass,
  typeBadge,
  topRight,
  tall = false,
}: ProjectCoverImageProps) {
  const media = getProjectMedia(slug);
  const heightClass = tall ? "h-52 md:h-64" : "h-44 md:h-48";

  if (!media) {
    return (
      <div className={`relative ${heightClass} overflow-hidden bg-gradient-to-br ${gradientClass}`}>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-4 right-4 h-16 w-16 rotate-12 rounded-lg border border-white/20" />
          <div className="absolute bottom-2 left-6 h-8 w-8 rounded-full border border-white/20" />
        </div>
        {typeBadge}
        {topRight}
      </div>
    );
  }

  return (
    <div className={`relative ${heightClass} overflow-hidden bg-foreground/5`}>
      <ProjectScreenshot
        src={media.cover}
        alt={media.alt || `${projectName} screenshot`}
        fill
        priority
        className="transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/15 to-transparent" />
      {typeBadge}
      {topRight}
    </div>
  );
}
