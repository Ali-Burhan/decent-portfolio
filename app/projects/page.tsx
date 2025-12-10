"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/section";
import { Nav } from "@/components/nav";
import { ProjectCard } from "@/components/project-card";
import portfolioData from "@/data/portfolio.json";
import { useI18n } from "@/lib/i18n";

export default function ProjectsPage() {
  const { experience, freelanceProjects } = portfolioData;
  const { t } = useI18n();

  const allProjects = useMemo(
    () => [
      ...experience.flatMap((exp) =>
        (exp.projects || []).map((p) => ({ ...p, type: "Work" as const }))
      ),
      ...freelanceProjects.map((p) => ({ ...p, type: "Freelance" as const })),
    ],
    [experience, freelanceProjects]
  );

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-accent/30">
      <div className="fixed inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] opacity-20" />
      <div className="fixed top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-accent/20 blur-[100px] opacity-30 animate-pulse" />
      <div className="fixed bottom-0 left-0 -z-10 h-[500px] w-[500px] rounded-full bg-accent/20 blur-[100px] opacity-30 animate-pulse delay-1000" />

      <Nav />

      <main>
        <Section className="pt-32">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12 space-y-4 text-center"
            >
              <p className="font-mono text-accent text-sm tracking-[0.2em] uppercase">
                03. {t("projects.title")}
              </p>
              <h1 className="text-4xl md:text-5xl font-bold">
                A curated collection of
                <span className="block bg-gradient-to-r from-accent via-accent/80 to-accent bg-clip-text text-transparent">
                  things I&apos;ve built
                </span>
              </h1>
              <p className="text-foreground/70 max-w-2xl mx-auto text-sm md:text-base">
                Explore a mix of production work and freelance projects—from complex dashboards
                and internal tooling to marketing sites and experimental interfaces. Each card
                highlights the impact, constraints, and technologies that shaped the final
                solution, so you can get a feel for how I think about shipping real products.
              </p>
            </motion.div>

            <div className="grid gap-6 md:gap-8 md:grid-cols-2 xl:grid-cols-3">
              {allProjects.map((project, index) => (
                <ProjectCard key={project.name + index} project={project} index={index} />
              ))}
            </div>
          </div>
        </Section>
      </main>
    </div>
  );
}
