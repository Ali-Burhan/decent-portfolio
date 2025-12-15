"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/section";
import { Nav } from "@/components/nav";
import { ProjectCard } from "@/components/project-card";
import portfolioData from "@/data/portfolio.json";
import { useI18n } from "@/lib/i18n";

export default function ProjectsPage() {
  const { experience, freelanceProjects } = portfolioData;
  const { t } = useI18n();
  const [filter, setFilter] = useState<"all" | "work" | "freelance">("all");

  const allProjects = useMemo(
    () => [
      ...experience.flatMap((exp) =>
        (exp.projects || []).map((p) => ({ ...p, type: "Work" as const }))
      ),
      ...freelanceProjects.map((p) => ({ ...p, type: "Freelance" as const })),
    ],
    [experience, freelanceProjects]
  );

  const filteredProjects = useMemo(() => {
    if (filter === "all") return allProjects;
    return allProjects.filter(p => p.type.toLowerCase() === filter);
  }, [allProjects, filter]);

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-accent/30 overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] opacity-20" />
      
      {/* Animated gradient orbs */}
      <motion.div 
        className="fixed top-0 right-0 -z-10 h-[600px] w-[600px] rounded-full bg-accent/20 blur-[120px] opacity-30"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.4, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="fixed bottom-0 left-0 -z-10 h-[600px] w-[600px] rounded-full bg-accent/20 blur-[120px] opacity-30"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.3, 0.4]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      
      {/* Floating geometric shapes */}
      <motion.div
        className="fixed top-1/4 left-1/4 -z-10 w-32 h-32 border-2 border-accent/10 rounded-lg"
        animate={{ 
          rotate: [0, 360],
          y: [0, -20, 0]
        }}
        transition={{ 
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
        }}
      />
      <motion.div
        className="fixed bottom-1/3 right-1/4 -z-10 w-24 h-24 border-2 border-accent/10 rounded-full"
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 20, 0]
        }}
        transition={{ 
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      <Nav />

      <main>
        <Section className="pt-32 pb-20">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-16 space-y-6"
            >
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3">
                  <motion.div
                    className="h-px w-12 bg-gradient-to-r from-transparent to-accent"
                    initial={{ width: 0 }}
                    animate={{ width: 48 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                  <p className="font-mono text-accent text-sm tracking-[0.2em] uppercase">
                    03. {t("projects.title")}
                  </p>
                  <motion.div
                    className="h-px w-12 bg-gradient-to-l from-transparent to-accent"
                    initial={{ width: 0 }}
                    animate={{ width: 48 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold">
                  A curated collection of
                  <span className="block mt-2 bg-gradient-to-r from-accent via-accent/80 to-accent bg-clip-text text-transparent">
                    things I&apos;ve built
                  </span>
                </h1>
                
                <p className="text-foreground/70 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
                  Explore a mix of production work and freelance projects—from complex dashboards
                  and internal tooling to marketing sites and experimental interfaces. Each card
                  highlights the impact, constraints, and technologies that shaped the final
                  solution.
                </p>
              </div>

              {/* Filter Tabs & Stats */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
                {/* Filter Buttons */}
                <div className="flex items-center gap-2 p-1 bg-foreground/5 rounded-xl border border-foreground/10 backdrop-blur-sm">
                  {[
                    { label: "All Projects", value: "all" as const, count: allProjects.length },
                    { label: "Work", value: "work" as const, count: allProjects.filter(p => p.type === "Work").length },
                    { label: "Freelance", value: "freelance" as const, count: allProjects.filter(p => p.type === "Freelance").length }
                  ].map((tab) => (
                    <motion.button
                      key={tab.value}
                      onClick={() => setFilter(tab.value)}
                      className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        filter === tab.value
                          ? "text-white"
                          : "text-foreground/60 hover:text-foreground"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {filter === tab.value && (
                        <motion.div
                          layoutId="filter-bg"
                          className="absolute inset-0 bg-accent rounded-lg"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-2">
                        {tab.label}
                        <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                          filter === tab.value 
                            ? "bg-white/20" 
                            : "bg-foreground/10"
                        }`}>
                          {tab.count}
                        </span>
                      </span>
                    </motion.button>
                  ))}
                </div>

                {/* Project Count Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full"
                >
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-sm font-medium text-accent">
                    {filteredProjects.length} {filteredProjects.length === 1 ? 'Project' : 'Projects'}
                  </span>
                </motion.div>
              </div>
            </motion.div>

            {/* Projects Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={filter}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid gap-8 lg:grid-cols-2"
              >
                {filteredProjects.map((project, index) => (
                  <ProjectCard key={project.name + index} project={project} index={index} />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-foreground/80 mb-2">No projects found</h3>
                <p className="text-foreground/60">Try selecting a different filter</p>
              </motion.div>
            )}
          </div>
        </Section>
      </main>
    </div>
  );
}
