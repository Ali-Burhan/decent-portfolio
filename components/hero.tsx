"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useAnimation,
  useInView,
  AnimatePresence,
} from "framer-motion";
import portfolioData from "../data/portfolio.json";
import { useI18n } from "@/lib/i18n";

interface Particle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  opacity: number;
}

const ScrambleText = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "!<>-_\\/[]{}—=+*^?#________";

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{displayText}</span>;
};

export function Hero() {
  const {
    personalInfo,
    socialLinks,
    skills,
    experience,
    education,
    highlights,
    freelanceProjects,
  } = portfolioData;
  const { t } = useI18n();
  const [showDetails, setShowDetails] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      {/* Gradient Orbs - Optimized with GPU acceleration */}
      <div
        className="absolute top-0 -left-4 w-96 h-96 rounded-full animate-blob opacity-50 mix-blend-multiply dark:mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
          transform: "translate3d(0, 0, 0)", // GPU acceleration
        }}
      ></div>
      <div
        className="absolute top-0 right-4 w-96 h-96 rounded-full animate-blob animation-delay-2000 opacity-50 mix-blend-multiply dark:mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
          transform: "translate3d(0, 0, 0)", // GPU acceleration
        }}
      ></div>
      <div
        className="absolute -bottom-8 left-20 w-96 h-96 rounded-full animate-blob animation-delay-4000 opacity-50 mix-blend-multiply dark:mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
          transform: "translate3d(0, 0, 0)", // GPU acceleration
        }}
      ></div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(var(--accent)_1px,transparent_1px),linear-gradient(90deg,var(--accent)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)] opacity-[0.03]"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block mb-6"
            >
              <span className="px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent text-sm font-mono backdrop-blur-sm">
                👋 {personalInfo.availability}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-6 leading-none"
            >
              <span className="text-foreground">
                {t("hero.greetingPrefix")}
              </span>
              <br />
              <span className="bg-gradient-to-r from-accent via-accent/80 to-accent bg-clip-text text-transparent animate-gradient">
                <ScrambleText text={personalInfo.name} />
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mb-8"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground/80 mb-4">
                <ScrambleText
                  text={personalInfo.role}
                  className="text-foreground/80"
                />
              </h2>
              <p className="text-lg sm:text-xl text-foreground/60 leading-relaxed max-w-xl">
                {personalInfo.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#projects"
                className="group relative px-8 py-4 bg-accent rounded-xl text-white font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-accent/50"
              >
                <span className="relative z-10">{t("hero.viewMyWork")}</span>
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>

              <a
                href="#contact"
                className="group px-8 py-4 bg-foreground/5 backdrop-blur-sm border border-foreground/10 rounded-xl text-foreground font-semibold transition-all duration-300 hover:bg-foreground/10 hover:border-foreground/20 hover:scale-105"
              >
                {t("hero.letsTalk")}
                <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-12 flex items-center gap-6"
            >
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-foreground transition-colors duration-300"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-foreground transition-colors duration-300"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-foreground transition-colors duration-300"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Content - Enhanced Professional Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full h-[600px]">
              {/* Main dashboard card with glassmorphism */}
              <motion.div
                animate={{
                  y: [0, -16, 0],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-x-6 top-10 bottom-10 bg-gradient-to-br from-foreground/[0.03] via-background/95 to-foreground/[0.05] backdrop-blur-2xl rounded-3xl border border-foreground/10 shadow-2xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--accent)_0,_transparent_50%)] opacity-30" />
                <div className="absolute inset-0 bg-[linear-gradient(var(--accent)_1px,transparent_1px),linear-gradient(90deg,var(--accent)_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.02]" />

                <div className="relative h-full flex flex-col gap-4 p-6 overflow-y-auto scrollbar-thin">
                  {/* Header with status */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-foreground/40 mb-1">
                        Professional Profile
                      </p>
                      <h3 className="text-lg font-bold text-foreground/90 mb-0.5">
                        {personalInfo.name}
                      </h3>
                      <p className="text-sm text-foreground/70 mb-1">
                        {personalInfo.role}
                      </p>
                      <p className="text-[11px] text-foreground/50 flex items-center gap-1.5">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        {personalInfo.location}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
                        <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-[10px] font-mono text-green-600 dark:text-green-400">Available</span>
                      </div>
                      <p className="text-[9px] text-foreground/40 mt-0.5">{personalInfo.availability}</p>
                    </div>
                  </div>

                  {/* Key Highlights - Real Stats */}
                  <div className="grid grid-cols-3 gap-2.5 text-xs">
                    <motion.div 
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="group relative rounded-2xl border border-foreground/10 bg-gradient-to-br from-accent/5 to-accent/10 p-3 overflow-hidden cursor-default"
                    >
                      <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative">
                        <p className="text-[10px] font-mono text-foreground/50 mb-1">Sites Deployed</p>
                        <p className="text-2xl font-bold text-accent">{highlights.sitesDeployed}</p>
                        <p className="text-[9px] text-foreground/40 mt-0.5">in {highlights.countriesServed} countries</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="group relative rounded-2xl border border-foreground/10 bg-gradient-to-br from-accent/5 to-accent/10 p-3 overflow-hidden cursor-default"
                    >
                      <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative">
                        <p className="text-[10px] font-mono text-foreground/50 mb-1">Performance</p>
                        <p className="text-2xl font-bold text-accent">+{highlights.performanceImprovement}</p>
                        <p className="text-[9px] text-foreground/40 mt-0.5">optimization</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="group relative rounded-2xl border border-foreground/10 bg-gradient-to-br from-accent/5 to-accent/10 p-3 overflow-hidden cursor-default"
                    >
                      <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative">
                        <p className="text-[10px] font-mono text-foreground/50 mb-1">AI Impact</p>
                        <p className="text-2xl font-bold text-accent">-{highlights.teacherWorkloadReduction}</p>
                        <p className="text-[9px] text-foreground/40 mt-0.5">workload reduction</p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Interactive Experience & Education Cards */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    {/* Experience Card */}
                    <motion.div
                      onHoverStart={() => setHoveredCard('experience')}
                      onHoverEnd={() => setHoveredCard(null)}
                      whileHover={{ scale: 1.02 }}
                      className="relative rounded-2xl border border-foreground/10 bg-background/60 p-3.5 cursor-pointer overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <div className="relative">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-foreground/50">
                            Experience
                          </p>
                          <motion.svg 
                            animate={{ rotate: hoveredCard === 'experience' ? 180 : 0 }}
                            className="w-3 h-3 text-accent"
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </motion.svg>
                        </div>
                        
                        <AnimatePresence mode="wait">
                          {hoveredCard === 'experience' ? (
                            <motion.div
                              key="exp-detail"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.2 }}
                              className="space-y-2"
                            >
                              {experience.slice(0, 2).map((exp, idx) => (
                                <div key={idx} className="pb-2 border-b border-foreground/5 last:border-0 last:pb-0">
                                  <p className="text-[11px] font-semibold text-foreground/90">{exp.company}</p>
                                  <p className="text-[10px] text-foreground/60">{exp.position}</p>
                                  <p className="text-[9px] text-accent/80 mt-0.5">{exp.duration}</p>
                                </div>
                              ))}
                            </motion.div>
                          ) : (
                            <motion.div
                              key="exp-summary"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <p className="text-sm font-semibold text-foreground/90 mb-1">
                                {experience.length} Companies
                              </p>
                              <p className="text-[10px] text-foreground/60 leading-relaxed">
                                {experience[0].company} · {experience[1]?.company}
                              </p>
                              <p className="text-[9px] text-accent/70 mt-1.5">Hover to see details →</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>

                    {/* Education Card */}
                    <motion.div
                      onHoverStart={() => setHoveredCard('education')}
                      onHoverEnd={() => setHoveredCard(null)}
                      whileHover={{ scale: 1.02 }}
                      className="relative rounded-2xl border border-foreground/10 bg-background/60 p-3.5 cursor-pointer overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <div className="relative">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-foreground/50">
                            Education
                          </p>
                          <motion.svg 
                            animate={{ rotate: hoveredCard === 'education' ? 180 : 0 }}
                            className="w-3 h-3 text-accent"
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </motion.svg>
                        </div>
                        
                        <AnimatePresence mode="wait">
                          {hoveredCard === 'education' ? (
                            <motion.div
                              key="edu-detail"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.2 }}
                              className="space-y-2"
                            >
                              {education.map((edu, idx) => (
                                <div key={idx} className="pb-2 border-b border-foreground/5 last:border-0 last:pb-0">
                                  <p className="text-[11px] font-semibold text-foreground/90">{edu.degree}</p>
                                  <p className="text-[10px] text-foreground/60">{edu.institution}</p>
                                  <div className="flex items-center justify-between mt-0.5">
                                    <p className="text-[9px] text-accent/80">{edu.duration}</p>
                                    <span className={`text-[8px] px-2 py-0.5 rounded-full ${
                                      edu.status === 'In Progress' 
                                        ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' 
                                        : 'bg-green-500/10 text-green-600 dark:text-green-400'
                                    }`}>
                                      {edu.status}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </motion.div>
                          ) : (
                            <motion.div
                              key="edu-summary"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <p className="text-sm font-semibold text-foreground/90 mb-1">
                                {education[0].degree.split(' ')[0]}
                              </p>
                              <p className="text-[10px] text-foreground/60 leading-relaxed">
                                {education[0].institution}
                              </p>
                              <p className="text-[9px] text-accent/70 mt-1.5">Hover to see details →</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  </div>

                  {/* Tech Stack Overview */}
                  <div className="rounded-2xl border border-foreground/10 bg-background/40 p-3.5">
                    <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-foreground/50 mb-2.5">
                      Tech Stack
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <div>
                        <p className="text-foreground/60 mb-1.5">Frontend</p>
                        <div className="flex flex-wrap gap-1">
                          {skills.frontend.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 rounded-md bg-accent/10 text-accent border border-accent/20"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-foreground/60 mb-1.5">Backend</p>
                        <div className="flex flex-wrap gap-1">
                          {skills.backend.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 rounded-md bg-accent/10 text-accent border border-accent/20"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expandable Profile Summary - Enhanced with Real Data */}
                  <div className="mt-auto">
                    <motion.button
                      type="button"
                      onClick={() => setShowDetails((v) => !v)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl border border-foreground/15 bg-gradient-to-r from-accent/5 to-accent/10 hover:from-accent/10 hover:to-accent/15 transition-all duration-300 group"
                    >
                      <span className="text-[11px] font-mono text-foreground/80 group-hover:text-accent transition-colors">
                        {showDetails ? "Hide detailed profile" : "View detailed profile"}
                      </span>
                      <motion.svg
                        animate={{ rotate: showDetails ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-4 h-4 text-accent"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </motion.svg>
                    </motion.button>

                    <AnimatePresence initial={false}>
                      {showDetails && (
                        <motion.div
                          key="hero-details"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-3 rounded-2xl border border-foreground/10 bg-gradient-to-br from-background/90 to-background/70 backdrop-blur-sm p-4 space-y-3">
                            {/* Professional Summary */}
                            <div>
                              <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-accent/80 mb-2">
                                Professional Summary
                              </p>
                              <p className="text-[11px] text-foreground/80 leading-relaxed">
                                {personalInfo.description}
                              </p>
                            </div>

                            {/* Key Achievements */}
                            <div>
                              <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-accent/80 mb-2">
                                Key Achievements
                              </p>
                              <ul className="space-y-1.5">
                                {experience[0].projects[1].achievements.slice(0, 3).map((achievement, idx) => (
                                  <li key={idx} className="flex gap-2 text-[10px] text-foreground/70">
                                    <span className="text-accent mt-0.5">▹</span>
                                    <span className="leading-relaxed">{achievement}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Freelance Highlight */}
                            {freelanceProjects.length > 0 && (
                              <div className="pt-2 border-t border-foreground/5">
                                <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-accent/80 mb-2">
                                  Featured Project
                                </p>
                                <div className="rounded-lg bg-accent/5 border border-accent/10 p-2.5">
                                  <p className="text-[11px] font-semibold text-foreground/90 mb-1">
                                    {freelanceProjects[0].name}
                                  </p>
                                  <p className="text-[10px] text-foreground/70 mb-2">
                                    {freelanceProjects[0].description}
                                  </p>
                                  <div className="flex flex-wrap gap-1">
                                    {freelanceProjects[0].technologies.slice(0, 4).map((tech) => (
                                      <span
                                        key={tech}
                                        className="text-[9px] px-2 py-0.5 rounded-md bg-accent/10 text-accent"
                                      >
                                        {tech}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>


            </div>
          </motion.div>
        </div>

        {/* Tech Stack Pills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-20 flex flex-wrap justify-center gap-3"
        >
          {[...skills.frontend, ...skills.backend]
            .slice(0, 8)
            .map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.4 }}
                className="px-4 py-2 bg-foreground/5 backdrop-blur-sm border border-foreground/10 rounded-full text-foreground/60 text-sm hover:bg-foreground/10 hover:border-accent/30 hover:text-accent transition-all duration-300 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-foreground/50"
        >
          <span className="text-xs font-mono">{t("hero.scroll")}</span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>

      <style jsx>{`
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes blob {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(20px, -30px, 0) scale(1.05);
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-blob {
          animation: blob 7s ease-in-out infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}
