"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/section";
import portfolioData from "@/data/portfolio.json";
import { useI18n } from "@/lib/i18n";
import { Nav } from "@/components/nav";

export default function ExperiencePage() {
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
    <div className="relative min-h-screen bg-background text-foreground selection:bg-accent/30">
      <div className="fixed inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] opacity-20" />
      <div className="fixed top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-accent/20 blur-[100px] opacity-30 animate-pulse" />
      <div className="fixed bottom-0 left-0 -z-10 h-[500px] w-[500px] rounded-full bg-accent/20 blur-[100px] opacity-30 animate-pulse delay-1000" />

      <Nav />

      <main>
        <Section className="pt-32">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12 space-y-4 text-center"
            >
              <p className="font-mono text-accent text-sm tracking-[0.2em] uppercase">
                02. {t("experience.title")}
              </p>
              <h1 className="text-4xl md:text-5xl font-bold">
                A journey through
                <span className="block bg-gradient-to-r from-accent via-accent/80 to-accent bg-clip-text text-transparent">
                  my work experience
                </span>
              </h1>
              <p className="text-foreground/70 max-w-2xl mx-auto text-sm md:text-base">
                From early experiments to production-grade platforms, here&apos;s a closer look at the
                companies, products, and teams I&apos;ve had the chance to build with.
              </p>
            </motion.div>

            <div className="relative mt-12">
              <div className="absolute left-4 md:left-1/2 h-full w-px bg-gradient-to-b from-accent/40 via-foreground/10 to-transparent" />

              <div className="space-y-16">
                {timeline.map((job, index) => (
                  <motion.div
                    key={job.company + index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`relative flex flex-col md:flex-row gap-8 md:gap-16 ${
                      index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
                    }`}
                  >
                    <div className="md:w-1/2 flex flex-col gap-2">
                      <span className="inline-flex items-center gap-2 text-xs font-mono text-accent/80 uppercase tracking-[0.2em]">
                        <span className="h-px w-4 bg-accent" />
                        {job.duration}
                      </span>
                      <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                        {job.position}{" "}
                        <span className="text-accent">@ {job.company}</span>
                      </h2>
                      <p className="text-sm text-foreground/60">{job.location}</p>
                    </div>

                    <div className="md:w-1/2">
                      <div className="relative rounded-2xl border border-foreground/10 bg-foreground/5/50 p-6 backdrop-blur-xl shadow-xl">
                        <div className="absolute -left-3 top-6 h-6 w-6 rounded-full border-2 border-accent bg-background" />
                        <div className="absolute -left-[1.65rem] top-8 h-2 w-2 rounded-full bg-accent" />

                        <div className="space-y-4 text-sm text-foreground/80">
                          {job.projects.map((project, pIndex) => (
                            <div key={project.name + pIndex} className="space-y-2">
                              <div className="flex items-center justify-between gap-3">
                                <h3 className="text-base md:text-lg font-semibold text-foreground">
                                  {project.name}
                                </h3>
                                <div className="flex flex-wrap gap-1 text-[11px] font-mono text-accent/80">
                                  {project.technologies?.slice(0, 4).map((tech) => (
                                    <span
                                      key={tech}
                                      className="px-2 py-1 rounded-full bg-accent/5 border border-accent/20"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <ul className="space-y-2">
                                {project.achievements.slice(0, 4).map((point, i) => (
                                  <li
                                    key={i}
                                    className="flex items-start gap-3 text-foreground/75"
                                  >
                                    <span className="mt-1.5 text-accent text-xs">▹</span>
                                    <span>{point}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
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
