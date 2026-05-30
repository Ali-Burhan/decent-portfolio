"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import portfolioData from "@/data/portfolio.json";
import { getProjectMedia } from "@/lib/project-media";
import { ProjectScreenshot } from "@/components/project-screenshot";
import {
  OsWindowBody,
  OsSectionTitle,
  OsCard,
  OsBadge,
  OsTag,
  osMotion,
} from "../window-ui";

export function ExperienceContent() {
  const { experience, education } = portfolioData;

  return (
    <OsWindowBody>
      <motion.div
        variants={osMotion.container}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        <section>
          <motion.div variants={osMotion.item}>
            <OsSectionTitle icon={Briefcase}>Work experience</OsSectionTitle>
          </motion.div>

          <div className="relative space-y-4 pl-1">
            <div
              className="absolute bottom-2 left-[11px] top-2 w-px bg-gradient-to-b from-[var(--os-accent)] via-[var(--os-border)] to-transparent"
              aria-hidden
            />
            {experience.map((job, index) => (
              <motion.div key={index} variants={osMotion.item} className="relative pl-8">
                <span
                  className="absolute left-0 top-5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[var(--os-window)] bg-[var(--os-accent)] text-[10px] font-bold text-white shadow-sm"
                  aria-hidden
                >
                  {index + 1}
                </span>
                <OsCard>
                  <div className="mb-4 flex flex-col gap-3 border-b border-[var(--os-border)] pb-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-[var(--os-text-primary)]">
                        {job.position}
                      </h3>
                      <p className="text-sm font-medium text-[var(--os-accent)]">{job.company}</p>
                    </div>
                    <div className="flex flex-col gap-1 text-xs text-[var(--os-text-muted)]">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {job.duration}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" />
                        {job.location}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {job.projects.map((project, pIndex) => {
                      const slug = "slug" in project ? (project as { slug?: string }).slug : undefined;
                      const media = getProjectMedia(slug);

                      return (
                      <div
                        key={pIndex}
                        className="overflow-hidden rounded-lg border border-[var(--os-border)] bg-[var(--os-surface-muted)]"
                      >
                        {media && slug && (
                          <div className="relative h-32 w-full overflow-hidden border-b border-[var(--os-border)]">
                            <ProjectScreenshot src={media.cover} alt={media.alt} fill />
                          </div>
                        )}
                        <div className="p-3.5">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <h4 className="text-sm font-semibold text-[var(--os-text-primary)]">
                            {project.name}
                          </h4>
                          {project.url && (
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[var(--os-accent)] hover:opacity-80"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          )}
                        </div>
                        {project.duration && (
                          <p className="mb-2 text-[11px] text-[var(--os-text-muted)]">
                            {project.duration}
                          </p>
                        )}
                        {project.description && (
                          <p className="mb-2 text-xs leading-relaxed text-[var(--os-text-secondary)]">
                            {project.description}
                          </p>
                        )}
                        <ul className="mb-2 space-y-1">
                          {project.achievements.map((achievement, aIndex) => (
                            <li
                              key={aIndex}
                              className="flex gap-2 text-xs text-[var(--os-text-secondary)]"
                            >
                              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--os-accent)]" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                        {project.technologies && (
                          <div className="flex flex-wrap gap-1">
                            {project.technologies.map((tech) => (
                              <OsTag key={tech}>{tech}</OsTag>
                            ))}
                          </div>
                        )}
                        {slug && media && (
                          <Link
                            href={`/projects/${slug}`}
                            className="mt-3 inline-flex text-xs font-semibold text-[var(--os-accent)] hover:underline"
                          >
                            View screenshots →
                          </Link>
                        )}
                        </div>
                      </div>
                      );
                    })}
                  </div>
                </OsCard>
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <motion.div variants={osMotion.item}>
            <OsSectionTitle icon={GraduationCap}>Education</OsSectionTitle>
          </motion.div>
          <div className="grid gap-3">
            {education.map((edu, index) => (
              <motion.div key={index} variants={osMotion.item}>
                <OsCard className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--os-accent-muted)] text-[var(--os-accent)]">
                    <GraduationCap className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-[var(--os-text-primary)]">
                      {edu.degree}
                    </h3>
                    <p className="text-xs text-[var(--os-text-secondary)]">{edu.institution}</p>
                    {edu.location && (
                      <p className="mt-1 text-xs text-[var(--os-text-muted)]">{edu.location}</p>
                    )}
                    {edu.focus && (
                      <p className="mt-2 text-xs italic text-[var(--os-text-secondary)]">
                        Focus: {edu.focus}
                      </p>
                    )}
                    <div className="mt-3 flex flex-wrap gap-2">
                      <OsBadge variant="accent">{edu.duration}</OsBadge>
                      <OsBadge variant="muted">{edu.status}</OsBadge>
                    </div>
                  </div>
                </OsCard>
              </motion.div>
            ))}
          </div>
        </section>
      </motion.div>
    </OsWindowBody>
  );
}
