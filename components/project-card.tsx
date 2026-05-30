"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ProjectCoverImage } from "@/components/project-cover-image";

interface Project {
  name: string;
  description: string;
  technologies: string[];
  achievements?: string[];
  type?: string;
  liveUrl?: string;
  repoUrl?: string;
  url?: string | null;
  slug?: string;
}

interface ProjectCardProps {
  project: Project;
  index?: number;
}

const getGradient = (name: string) => {
  const gradients = [
    "from-violet-500/20 via-purple-500/10 to-fuchsia-500/20",
    "from-blue-500/20 via-cyan-500/10 to-teal-500/20",
    "from-emerald-500/20 via-green-500/10 to-lime-500/20",
    "from-orange-500/20 via-amber-500/10 to-yellow-500/20",
    "from-rose-500/20 via-pink-500/10 to-red-500/20",
    "from-indigo-500/20 via-blue-500/10 to-sky-500/20",
  ];
  return gradients[name.length % gradients.length];
};

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const gradient = getGradient(project.name);
  const liveUrl = project.liveUrl ?? project.url;
  const caseStudyHref = project.slug ? `/projects/${project.slug}` : null;

  const typeBadge = project.type ? (
    <div className="absolute top-4 left-4 z-10">
      <span className="rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-foreground/80 backdrop-blur-sm dark:bg-black/50">
        {project.type}
      </span>
    </div>
  ) : null;

  const topRight = (
    <div className="absolute top-4 right-4 z-10 flex gap-2">
      {project.repoUrl && (
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-foreground/70 backdrop-blur-sm transition-all hover:scale-110 hover:text-accent dark:bg-black/50"
          aria-label="View source code"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
        </a>
      )}
      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-foreground/70 backdrop-blur-sm transition-all hover:scale-110 hover:text-accent dark:bg-black/50"
          aria-label="View live demo"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      )}
    </div>
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group h-full"
    >
      <div className="relative h-full overflow-hidden rounded-xl border border-foreground/10 bg-background transition-all duration-300 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5">
        <ProjectCoverImage
          slug={project.slug}
          projectName={project.name}
          gradientClass={gradient}
          typeBadge={typeBadge}
          topRight={topRight}
        />

        <div className="p-5">
          <h3 className="mb-2 line-clamp-1 text-lg font-semibold text-foreground transition-colors group-hover:text-accent">
            {project.name}
          </h3>

          <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-foreground/60">
            {project.description}
          </p>

          {project.achievements && project.achievements.length > 0 && (
            <div className="mb-4 flex items-start gap-2 rounded-lg border border-accent/10 bg-accent/5 p-3">
              <svg className="mt-0.5 h-4 w-4 shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="line-clamp-2 text-xs leading-relaxed text-foreground/70">
                {project.achievements[0]}
              </span>
            </div>
          )}

          {caseStudyHref && (
            <Link
              href={caseStudyHref}
              className="mb-3 inline-block text-sm font-medium text-accent hover:underline"
            >
              Read case study →
            </Link>
          )}

          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded border border-foreground/5 bg-foreground/5 px-2 py-0.5 text-[10px] font-medium text-foreground/60"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="rounded px-2 py-0.5 text-[10px] font-medium text-foreground/40">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-accent via-accent/80 to-accent/60 transition-transform duration-300 group-hover:scale-x-100" />
      </div>
    </motion.article>
  );
}
