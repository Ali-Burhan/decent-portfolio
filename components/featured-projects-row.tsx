"use client";

import Link from "next/link";
import { getProjectMedia, PROJECT_MEDIA } from "@/lib/project-media";

const FEATURED_SLUGS = Object.keys(PROJECT_MEDIA);

interface FeaturedProjectsRowProps {
  variant?: "os" | "site";
  onProjectClick?: (slug: string) => void;
}

export function FeaturedProjectsRow({
  variant = "site",
  onProjectClick,
}: FeaturedProjectsRowProps) {
  const isOs = variant === "os";

  return (
    <div
      className={
        isOs
          ? "pointer-events-auto mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-3 px-4 sm:grid-cols-4 sm:gap-4"
          : "mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4"
      }
    >
      {FEATURED_SLUGS.map((slug) => {
        const media = getProjectMedia(slug);
        if (!media) return null;

        const label = media.alt.split("—")[0]?.trim() ?? slug;
        const inner = (
          <>
            <div className="relative h-28 w-full overflow-hidden bg-foreground/5 sm:h-32">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={media.cover}
                alt={media.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
              />
              <div
                className={
                  isOs
                    ? "pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--os-window)]/90 via-transparent to-transparent"
                    : "pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent"
                }
              />
            </div>
            <p
              className={
                isOs
                  ? "truncate px-2 py-2 text-center text-[10px] font-semibold text-[var(--os-text-primary)] sm:text-xs"
                  : "truncate px-2 py-2 text-center text-xs font-semibold text-foreground"
              }
            >
              {label}
            </p>
          </>
        );

        const cardClass = isOs
          ? "group overflow-hidden rounded-xl border border-[var(--os-border)] bg-[var(--os-surface)] shadow-md transition-all hover:border-[var(--os-accent)]/40 hover:shadow-lg"
          : "group overflow-hidden rounded-xl border border-foreground/10 bg-background shadow-sm transition-all hover:border-accent/40 hover:shadow-md";

        if (onProjectClick) {
          return (
            <button
              key={slug}
              type="button"
              onClick={() => onProjectClick(slug)}
              className={`${cardClass} w-full text-left`}
            >
              {inner}
            </button>
          );
        }

        return (
          <Link key={slug} href={`/projects/${slug}`} className={cardClass}>
            {inner}
          </Link>
        );
      })}
    </div>
  );
}
