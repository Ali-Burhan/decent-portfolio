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
    <div className="relative min-h-screen bg-background text-foreground selection:bg-accent/30 overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] opacity-20" />
      
      {/* Animated gradient orbs */}
      <motion.div 
        className="fixed top-0 right-0 -z-10 h-[600px] w-[600px] rounded-full bg-accent/20 blur-[120px] opacity-30"
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="fixed bottom-0 left-0 -z-10 h-[600px] w-[600px] rounded-full bg-accent/20 blur-[120px] opacity-30"
        animate={{ 
          scale: [1.2, 1, 1.2],
          x: [0, -50, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <Nav />

      <main>
        <Section className="pt-32 pb-20">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
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
                    02. {t("experience.title")}
                  </p>
                  <motion.div
                    className="h-px w-12 bg-gradient-to-l from-transparent to-accent"
                    initial={{ width: 0 }}
                    animate={{ width: 48 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold">
                  A journey through
                  <span className="block mt-2 bg-gradient-to-r from-accent via-accent/80 to-accent bg-clip-text text-transparent">
                    my work experience
                  </span>
                </h1>
                
                <p className="text-foreground/70 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
                  From early experiments to production-grade platforms, here's a closer look at the
                  companies, products, and teams I've had the chance to build with.
                </p>
              </div>
            </motion.div>

            {/* Enhanced Timeline */}
            <div className="relative mt-16">
              {/* Vertical Timeline Line */}
              <motion.div
                className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-accent/50 to-transparent"
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                transition={{ duration: 1.5, delay: 0.3 }}
              />
              
              {/* Glowing moving light effect */}
              <motion.div
                className="absolute left-4 md:left-1/2 top-0 w-0.5 h-40 bg-gradient-to-b from-accent to-transparent blur-sm"
                animate={{
                  y: [0, 500, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              <div className="space-y-20">
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
                    {/* Timeline Node */}
                    <div className="absolute left-4 md:left-1/2 top-8 -translate-x-1/2 z-10">
                      <motion.div
                        className="relative"
                        whileHover={{ scale: 1.3 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Pulsing glow ring */}
                        <motion.div
                          className="absolute inset-0 rounded-full bg-accent/30 blur-lg"
                          animate={{
                            scale: [1, 1.8, 1],
                            opacity: [0.4, 0.8, 0.4]
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            delay: index * 0.3
                          }}
                        />
                        {/* Main node */}
                        <div className="relative w-6 h-6 rounded-full bg-background border-2 border-accent shadow-lg shadow-accent/50">
                          <motion.div
                            className="absolute inset-1 rounded-full bg-accent"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + 0.5, type: "spring", stiffness: 200 }}
                          />
                        </div>
                      </motion.div>
                    </div>

                    {/* Left/Right Content */}
                    <div className="md:w-1/2 flex flex-col gap-3 pl-12 md:pl-0">
                      <motion.span
                        initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                        className="inline-flex items-center gap-2 text-xs font-mono text-accent/80 uppercase tracking-[0.2em]"
                      >
                        <span className="h-px w-6 bg-accent" />
                        {job.duration}
                      </motion.span>
                      <motion.h2
                        initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                        className="text-2xl md:text-3xl font-bold text-foreground"
                      >
                        {job.position}{" "}
                        <span className="text-accent">@ {job.company}</span>
                      </motion.h2>
                      <motion.p
                        initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.4 }}
                        className="text-sm text-foreground/60 flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {job.location}
                      </motion.p>
                    </div>

                    {/* Experience Card */}
                    <motion.div
                      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                      className="md:w-1/2 pl-12 md:pl-0"
                    >
                      <motion.div
                        className="relative rounded-2xl border border-foreground/10 bg-gradient-to-br from-foreground/5 to-foreground/[0.02] p-6 md:p-8 backdrop-blur-sm shadow-xl overflow-hidden group"
                        whileHover={{ y: -6, scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Animated gradient border on hover */}
                        <motion.div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            background: "linear-gradient(135deg, var(--accent) 0%, transparent 50%, var(--accent) 100%)",
                            backgroundSize: "200% 200%",
                          }}
                          animate={{
                            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        />
                        
                        {/* Corner accent */}
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-accent/10 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <div className="relative z-10 space-y-6">
                          {job.projects.map((project, pIndex) => (
                            <motion.div
                              key={project.name + pIndex}
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.1 + pIndex * 0.1 }}
                              className="space-y-3"
                            >
                              {/* Project Header */}
                              <div className="flex items-start justify-between gap-3 flex-wrap">
                                <div className="flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                  <h3 className="text-base md:text-lg font-semibold text-foreground">
                                    {project.name}
                                  </h3>
                                </div>
                                
                                {/* Tech badges */}
                                <div className="flex flex-wrap gap-1.5">
                                  {project.technologies?.slice(0, 4).map((tech, techIndex) => (
                                    <motion.span
                                      key={tech}
                                      initial={{ opacity: 0, scale: 0.8 }}
                                      whileInView={{ opacity: 1, scale: 1 }}
                                      viewport={{ once: true }}
                                      transition={{ delay: index * 0.1 + pIndex * 0.1 + techIndex * 0.03 }}
                                      whileHover={{ y: -2, scale: 1.05 }}
                                      className="px-2 py-0.5 rounded text-[10px] md:text-[11px] font-mono bg-accent/5 border border-accent/20 text-accent hover:bg-accent/10 hover:border-accent/40 transition-all cursor-default"
                                    >
                                      {tech}
                                    </motion.span>
                                  ))}
                                </div>
                              </div>
                              
                              {/* Achievements */}
                              <ul className="space-y-2.5">
                                {project.achievements.slice(0, 4).map((point, i) => (
                                  <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 + pIndex * 0.1 + i * 0.05 }}
                                    className="flex items-start gap-3 text-foreground/75 text-sm leading-relaxed"
                                  >
                                    <span className="mt-1.5 text-accent text-xs">▹</span>
                                    <span>{point}</span>
                                  </motion.li>
                                ))}
                              </ul>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </motion.div>
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
