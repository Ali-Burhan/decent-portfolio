"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/section";
import portfolioData from "@/data/portfolio.json";
import { useI18n } from "@/lib/i18n";
import { Nav } from "@/components/nav";

export function ExperienceContent() {
  const { experience } = portfolioData;
  const { t } = useI18n();

  const timeline = useMemo(
    () =>
      experience.map((job) => ({
        ...job,
        projects: job.projects ?? [],
      })),
    [experience]
  );

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Subtle background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/5 via-background to-background" />
      </div>

      <Nav />

      <main>
        <Section className="pt-28 pb-20">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <p className="text-accent font-mono text-sm mb-3">
                {t("experience.title")}
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Work Experience
              </h1>
              <p className="text-foreground/60 text-lg max-w-2xl">
                My professional journey building scalable applications and leading technical initiatives.
              </p>
            </motion.div>

            {/* Timeline */}
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-foreground/10" />

              <div className="space-y-12">
                {timeline.map((job, index) => (
                  <motion.div
                    key={job.company + index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative pl-8 md:pl-20"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-0 md:left-8 top-2 -translate-x-1/2">
                      <div className="w-3 h-3 rounded-full bg-accent ring-4 ring-background" />
                    </div>

                    {/* Date badge - mobile */}
                    <div className="md:hidden mb-2">
                      <span className="text-xs font-mono text-accent bg-accent/10 px-2 py-1 rounded">
                        {job.duration}
                      </span>
                    </div>

                    {/* Content card */}
                    <div className="relative rounded-xl border border-foreground/10 bg-foreground/[0.02] p-6 hover:bg-foreground/[0.04] transition-colors">
                      {/* Date badge - desktop */}
                      <div className="hidden md:block absolute -left-32 top-2 w-24 text-right">
                        <span className="text-xs font-mono text-foreground/50">
                          {job.duration}
                        </span>
                      </div>

                      {/* Header */}
                      <div className="mb-4">
                        <h2 className="text-xl font-semibold text-foreground">
                          {job.position}
                        </h2>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-accent font-medium">{job.company}</span>
                          <span className="text-foreground/30">·</span>
                          <span className="text-foreground/50 text-sm flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {job.location}
                          </span>
                        </div>
                      </div>

                      {/* Projects */}
                      <div className="space-y-6">
                        {job.projects.map((project, pIndex) => (
                          <div
                            key={project.name + pIndex}
                            className={pIndex > 0 ? "pt-6 border-t border-foreground/5" : ""}
                          >
                            {/* Project name & tech */}
                            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                              <h3 className="font-medium text-foreground">
                                {project.name}
                              </h3>
                              <div className="flex flex-wrap gap-1.5">
                                {project.technologies?.slice(0, 4).map((tech) => (
                                  <span
                                    key={tech}
                                    className="px-2 py-0.5 text-[10px] font-mono rounded bg-foreground/5 text-foreground/60"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Achievements */}
                            <ul className="space-y-2">
                              {project.achievements.slice(0, 3).map((point, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-3 text-sm text-foreground/70"
                                >
                                  <span className="mt-2 w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                                  <span className="leading-relaxed">{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Section>
      </main>
    </div>
  );
}
