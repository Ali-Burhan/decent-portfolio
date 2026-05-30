"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FolderKanban, ExternalLink, ArrowUpRight, Images } from "lucide-react";
import portfolioData from "@/data/portfolio.json";
import { getCaseStudyBySlug } from "@/lib/projects";
import { getProjectMedia } from "@/lib/project-media";
import {
  OsWindowBody,
  OsSectionTitle,
  OsCard,
  OsBadge,
  OsTag,
  osMotion,
} from "../window-ui";

export function ProjectsContent() {
  const { experience, freelanceProjects } = portfolioData;

  const allProjects = [
    ...experience.flatMap((exp) =>
      exp.projects.map((p) => ({
        ...p,
        company: exp.company,
        type: "Work" as const,
        slug: "slug" in p && p.slug ? p.slug : undefined,
      }))
    ),
    ...freelanceProjects.map((p) => ({
      ...p,
      company: "Freelance",
      type: "Freelance" as const,
      slug: "slug" in p && p.slug ? p.slug : undefined,
    })),
  ];

  return (
    <OsWindowBody>
      <motion.div
        variants={osMotion.container}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        <motion.div variants={osMotion.item}>
          <OsSectionTitle icon={FolderKanban}>Projects</OsSectionTitle>
          <p className="mt-2 text-xs leading-relaxed text-[var(--os-text-muted)]">
            Production work with embedded screenshots. Open a case study for the full
            gallery and demo video.
          </p>
        </motion.div>

        {allProjects.map((project, index) => {
          const media = project.slug ? getProjectMedia(project.slug) : null;
          const hasCaseStudy = Boolean(
            project.slug && getCaseStudyBySlug(project.slug)
          );
          const extraShots = media
            ? Array.from(new Set(media.gallery)).filter((src) => src !== media.cover)
            : [];

          return (
            <motion.div key={project.name + index} variants={osMotion.item}>
              <OsCard className="overflow-hidden p-4 md:p-5">
                  <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-semibold text-[var(--os-text-primary)]">
                          {project.name}
                        </h3>
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-md p-1 text-[var(--os-accent)] hover:bg-[var(--os-accent-muted)]"
                            title="Live project"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-[var(--os-text-muted)]">
                        {project.company}
                      </p>
                    </div>
                    <OsBadge variant={project.type === "Work" ? "accent" : "success"}>
                      {project.type}
                    </OsBadge>
                  </div>

                  {project.description && (
                    <p className="mb-3 text-sm leading-relaxed text-[var(--os-text-secondary)]">
                      {project.description}
                    </p>
                  )}

                  {media && (
                    <div className="mb-4 overflow-hidden rounded-xl border border-[var(--os-border)] bg-[var(--os-surface-muted)]">
                      <p className="border-b border-[var(--os-border)] px-3 py-2 text-[10px] font-semibold uppercase tracking-wide text-[var(--os-text-muted)]">
                        Screenshots
                      </p>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={media.cover}
                        alt={media.alt}
                        loading={index === 0 ? "eager" : "lazy"}
                        decoding="async"
                        className="block max-h-56 w-full object-cover object-top"
                      />

                      {extraShots.length > 0 && (
                        <div className="border-t border-[var(--os-border)] p-3">
                          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-[var(--os-text-muted)]">
                            More screens
                          </p>
                          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                            {extraShots.slice(0, 6).map((src, shotIndex) => (
                              <figure
                                key={src}
                                className="overflow-hidden rounded-lg border border-[var(--os-border)] bg-[var(--os-surface)]"
                              >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={src}
                                  alt={`${media.alt} — ${shotIndex + 2}`}
                                  loading="lazy"
                                  decoding="async"
                                  className="block h-auto w-full"
                                />
                              </figure>
                            ))}
                          </div>
                          {extraShots.length > 6 && hasCaseStudy && (
                            <Link
                              href={`/projects/${project.slug}`}
                              className="mt-2 inline-flex text-[10px] font-semibold text-[var(--os-accent)] hover:underline"
                            >
                              +{extraShots.length - 6} more in case study →
                            </Link>
                          )}
                        </div>
                      )}

                      {media.video && (
                        <div className="border-t border-[var(--os-border)] p-3">
                          <p className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--os-text-muted)]">
                            <Images className="h-3.5 w-3.5" aria-hidden />
                            Demo
                          </p>
                          <video
                            className="w-full rounded-lg border border-[var(--os-border)] bg-black"
                            controls
                            playsInline
                            preload="metadata"
                            poster={media.cover}
                          >
                            <source src={media.video} type="video/mp4" />
                          </video>
                        </div>
                      )}
                    </div>
                  )}

                  {project.achievements && project.achievements.length > 0 && (
                    <ul className="mb-3 space-y-1.5">
                      {project.achievements.slice(0, 2).map((achievement, aIndex) => (
                        <li
                          key={aIndex}
                          className="flex gap-2 text-xs text-[var(--os-text-secondary)]"
                        >
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--os-accent)]" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {hasCaseStudy && (
                    <Link
                      href={`/projects/${project.slug}`}
                      className="mb-3 inline-flex items-center gap-1 text-xs font-semibold text-[var(--os-accent)] hover:underline"
                    >
                      Full case study & all screenshots
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  )}

                  {project.technologies && (
                    <div className="flex flex-wrap gap-1.5 border-t border-[var(--os-border)] pt-3">
                      {project.technologies.map((tech) => (
                        <OsTag key={tech}>{tech}</OsTag>
                      ))}
                    </div>
                  )}
              </OsCard>
            </motion.div>
          );
        })}
      </motion.div>
    </OsWindowBody>
  );
}
