import type { ProjectMedia } from "@/lib/project-media";

interface ProjectMediaGalleryProps {
  media: ProjectMedia;
  projectName: string;
}

export function ProjectMediaGallery({ media, projectName }: ProjectMediaGalleryProps) {
  const uniqueGallery = Array.from(new Set(media.gallery));

  return (
    <section className="mb-10" aria-labelledby="project-screenshots-heading">
      <h2
        id="project-screenshots-heading"
        className="text-xl font-semibold text-foreground mb-4"
      >
        Product screenshots
      </h2>

      {media.video && (
        <div className="mb-6 overflow-hidden rounded-xl border border-foreground/10 bg-foreground/[0.02]">
          <video
            className="w-full aspect-video bg-black"
            controls
            playsInline
            preload="metadata"
            poster={media.cover}
            aria-label={`${projectName} demo video`}
          >
            <source src={media.video} type="video/mp4" />
            Your browser does not support embedded video.
          </video>
          <p className="px-4 py-2 text-xs text-foreground/50 border-t border-foreground/10">
            Walkthrough — {projectName}
          </p>
        </div>
      )}

      <div className="flex flex-col gap-6">
        {uniqueGallery.map((src, index) => (
          <figure
            key={src}
            className="overflow-hidden rounded-xl border border-foreground/10 bg-foreground/[0.02]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`${media.alt} — screen ${index + 1}`}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              className="block w-full h-auto max-w-full"
            />
          </figure>
        ))}
      </div>
    </section>
  );
}
