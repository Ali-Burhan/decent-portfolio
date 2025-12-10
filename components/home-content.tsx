"use client";
import React, { useMemo } from "react";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Section } from "@/components/section";
import { ContactForm } from "@/components/contact-form";
import { motion } from "framer-motion";
import portfolioData from "../data/portfolio.json";
import { useI18n } from "@/lib/i18n";
import { ProjectCard } from "@/components/project-card";

export function HomeContent() {
  const { personalInfo, experience, freelanceProjects, skills, socialLinks } = portfolioData;
  const { t } = useI18n();

  // Memoize projects array to prevent recalculation on every render
  const allProjects = useMemo(() => [
    ...experience.flatMap(exp => exp.projects.map(p => ({ ...p, type: "Work" }))),
    ...freelanceProjects.map(p => ({ ...p, type: "Freelance" }))
  ], [experience, freelanceProjects]);

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-accent/30">
      {/* Background Gradient Effect */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] opacity-20"></div>
      <div className="fixed top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-accent/20 blur-[100px] opacity-30 animate-pulse"></div>
      <div className="fixed bottom-0 left-0 -z-10 h-[500px] w-[500px] rounded-full bg-accent/20 blur-[100px] opacity-30 animate-pulse delay-1000"></div>

      <Nav />

      <main>
        <Hero />

        {/* About Section */}
        <Section id="about">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 0.8 }}
            className="grid gap-16 lg:grid-cols-2 items-center"
          >
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="flex items-center text-3xl md:text-5xl font-bold text-foreground">
                  <span className="mr-4 font-mono text-accent text-2xl">01.</span> 
                  {t("about.title")}
                </h2>
                <motion.a
                  href="/about"
                  whileHover={{ x: 5 }}
                  className="group flex items-center gap-2 text-sm font-mono text-accent hover:underline lg:hidden"
                >
                  View More
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.a>
              </div>
              <div className="space-y-6 text-lg text-foreground/80 leading-relaxed">
                <p>
                  Hello! My name is {personalInfo.name} and I enjoy creating things that live on
                  the internet. I am a {personalInfo.role} based in {personalInfo.location}.
                </p>
                <p>
                  {personalInfo.description}
                </p>
                <p>{t("about.techIntro")}</p>
                <ul className="flex flex-wrap gap-3">
                  {[...skills.frontend, ...skills.backend, ...skills.cloudDevOps].slice(0, 12).map((tech) => (
                    <li key={tech} className="px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent text-sm font-mono hover:bg-accent/20 transition-colors cursor-default">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="relative group perspective-1000">
              {/* Accent Background Shape - positioned behind */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[85%] h-[85%] rounded-full bg-accent blur-2xl" />
              </div>
              
              {/* Geometric accent shape - top right */}
              <div className="absolute bottom-0 right-0 w-3/5 h-3/5 rounded-tl-[100px] rounded-br-2xl bg-gradient-to-br from-accent to-accent/70 -z-10" />
              
              {/* Geometric accent shape - bottom left */}
              <div className="absolute top-0 left-0 w-3/5 h-3/5 rounded-tr-[100px] rounded-bl-2xl bg-gradient-to-tl from-accent to-accent/70 -z-10" />
              
              {/* Main Image */}
              <div className="relative z-10 aspect-square w-full max-w-[400px] mx-auto rounded-2xl overflow-hidden shadow-2xl border-2 border-foreground/10 bg-background transition-transform duration-500 group-hover:scale-105">
                <img
                  src="/ali pic.png"
                  alt={personalInfo.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="absolute top-4 left-4 -z-10 h-full w-full max-w-[400px] mx-auto rounded-2xl border-2 border-accent/50 transition-transform duration-500 group-hover:translate-x-4 group-hover:translate-y-4"></div>
            </div>
          </motion.div>
        </Section>

        {/* Experience Section */}
        <Section id="experience">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-between mb-16">
              <h2 className="flex items-center text-3xl md:text-5xl font-bold text-foreground">
                <span className="mr-4 font-mono text-accent text-2xl">02.</span> 
                {t("experience.title")}
              </h2>
              <motion.a
                href="/experience"
                whileHover={{ x: 5 }}
                className="group flex items-center gap-2 text-sm font-mono text-accent hover:underline"
              >
                View All
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </motion.a>
            </div>
            
            <div className="relative border-l-2 border-foreground/10 ml-3 md:ml-6 space-y-12">
              {experience.slice(0, 2).map((job, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  className="relative pl-8 md:pl-12 group"
                >
                  <div className="absolute -left-[9px] top-2 h-4 w-4 rounded-full bg-background border-2 border-accent group-hover:bg-accent transition-colors duration-300"></div>
                  <div className="p-6 rounded-2xl bg-foreground/5 border border-foreground/5 hover:border-accent/30 hover:bg-foreground/10 transition-all duration-300 backdrop-blur-sm">
                    <h3 className="text-xl md:text-2xl font-bold text-foreground">
                      {job.position} <span className="text-accent">@ {job.company}</span>
                    </h3>
                    <p className="font-mono text-sm text-foreground/60 mb-4 mt-1">{job.duration} | {job.location}</p>
                    
                    {/* Display projects within the job if available, or just achievements if we want to simplify */}
                    <div className="space-y-4">
                      {job.projects.map((project, pIndex) => (
                        <div key={pIndex} className="mt-4">
                          <h4 className="text-lg font-semibold text-foreground/90 mb-2">{project.name}</h4>
                          <ul className="space-y-2">
                            {project.achievements.slice(0, 3).map((point, i) => (
                              <li key={i} className="flex items-start gap-3 text-foreground/80 text-sm">
                                <span className="mt-1.5 text-accent text-xs">▹</span>
                                {point}
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
          </motion.div>
        </Section>

        {/* Projects Section */}
        <Section id="projects">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-between mb-16">
              <h2 className="flex items-center text-3xl md:text-5xl font-bold text-foreground">
                <span className="mr-4 font-mono text-accent text-2xl">03.</span> 
                {t("projects.title")}
              </h2>
              <motion.a
                href="/projects"
                whileHover={{ x: 5 }}
                className="group flex items-center gap-2 text-sm font-mono text-accent hover:underline"
              >
                View All
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </motion.a>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {allProjects.slice(0, 6).map((project, index) => (
                <ProjectCard key={project.name + index} project={project} index={index} />
              ))}
            </div>
          </motion.div>
        </Section>

        {/* Contact Section */}
        <Section id="contact">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <div className="text-center mb-16">
              <p className="font-mono text-accent mb-4">{t("contact.sectionPrefix")}</p>
              <h2 className="mb-6 text-5xl md:text-6xl font-bold text-foreground">{t("contact.title")}</h2>
              <p className="mb-8 text-lg md:text-xl text-foreground/70 leading-relaxed max-w-2xl mx-auto">
                {t("contact.subtitle")}
              </p>
            </div>
            
            {/* Orbital Contact System */}
            <div className="relative max-w-5xl mx-auto">
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 -z-10 overflow-hidden">
                {/* Grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--accent)_1px,transparent_1px),linear-gradient(to_bottom,var(--accent)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.03]" />
                
                {/* Floating particles */}
                {[...Array(30)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-accent"
                    initial={{
                      x: `${Math.random() * 100}%`,
                      y: `${Math.random() * 100}%`,
                      opacity: 0,
                    }}
                    animate={{
                      y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                      x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                      opacity: [0, 0.6, 0],
                      scale: [0, 1.5, 0],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 4,
                      repeat: Infinity,
                      delay: i * 0.1,
                      ease: "easeInOut",
                    }}
                  />
                ))}
                
                {/* Pulsing glow effects */}
                <motion.div
                  className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-accent/10 blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-accent/10 blur-3xl"
                  animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.5, 0.3, 0.5],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                />
              </div>

              {/* Central Contact Form */}
              <div className="relative z-10 max-w-2xl mx-auto">
                <ContactForm />
              </div>
              
              {/* Orbiting Social Links */}
              <div className="absolute inset-0 pointer-events-none hidden lg:block">
                {/* Orbital paths - now visible */}
                <motion.div
                  className="absolute inset-0"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute inset-0 border border-accent/10 rounded-full" style={{ width: '90%', height: '90%', margin: 'auto', top: 0, bottom: 0, left: 0, right: 0 }} />
                </motion.div>
                
                {/* LinkedIn - Top Left */}
                <motion.a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pointer-events-auto absolute group"
                  style={{ top: "10%", left: "5%" }}
                  whileHover={{ scale: 1.3, rotate: 10 }}
                  animate={{
                    y: [0, -15, 0],
                  }}
                  transition={{
                    y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  }}
                >
                  <div className="relative">
                    {/* Enhanced Glow Ring */}
                    <motion.div
                      className="absolute inset-0 rounded-full bg-blue-500/30 blur-xl"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                    {/* Planet with gradient border */}
                    <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center text-4xl shadow-2xl group-hover:shadow-blue-500/70 transition-all border-4 border-blue-300/50 group-hover:border-blue-300">
                      💼
                    </div>
                    {/* Label */}
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-sm font-semibold text-blue-500 bg-background/95 backdrop-blur-sm px-4 py-2 rounded-full border-2 border-blue-500/50 shadow-lg">
                        {t("contact.linkedIn")}
                      </span>
                    </div>
                  </div>
                </motion.a>

                {/* GitHub - Top Right */}
                <motion.a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pointer-events-auto absolute group"
                  style={{ top: "10%", right: "5%" }}
                  whileHover={{ scale: 1.3, rotate: -10 }}
                  animate={{
                    y: [0, -20, 0],
                  }}
                  transition={{
                    y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
                  }}
                >
                  <div className="relative">
                    <motion.div
                      className="absolute inset-0 rounded-full bg-purple-500/30 blur-xl"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 0.3,
                      }}
                    />
                    <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 flex items-center justify-center text-4xl shadow-2xl group-hover:shadow-purple-500/70 transition-all border-4 border-purple-300/50 group-hover:border-purple-300">
                      👨‍💻
                    </div>
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-sm font-semibold text-purple-500 bg-background/95 backdrop-blur-sm px-4 py-2 rounded-full border-2 border-purple-500/50 shadow-lg">
                        {t("contact.github")}
                      </span>
                    </div>
                  </div>
                </motion.a>

                {/* Twitter - Bottom Left */}
                <motion.a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pointer-events-auto absolute group"
                  style={{ bottom: "15%", left: "8%" }}
                  whileHover={{ scale: 1.3, rotate: 10 }}
                  animate={{
                    y: [0, -18, 0],
                  }}
                  transition={{
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 },
                  }}
                >
                  <div className="relative">
                    <motion.div
                      className="absolute inset-0 rounded-full bg-cyan-500/30 blur-xl"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 0.6,
                      }}
                    />
                    <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 via-cyan-500 to-cyan-600 flex items-center justify-center text-4xl shadow-2xl group-hover:shadow-cyan-500/70 transition-all border-4 border-cyan-300/50 group-hover:border-cyan-300">
                      🐦
                    </div>
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-sm font-semibold text-cyan-500 bg-background/95 backdrop-blur-sm px-4 py-2 rounded-full border-2 border-cyan-500/50 shadow-lg">
                        {t("contact.twitter")}
                      </span>
                    </div>
                  </div>
                </motion.a>

                {/* Email - Bottom Right */}
                <motion.a
                  href={`mailto:${personalInfo.email}`}
                  className="pointer-events-auto absolute group"
                  style={{ bottom: "15%", right: "8%" }}
                  whileHover={{ scale: 1.3, rotate: -10 }}
                  animate={{
                    y: [0, -22, 0],
                  }}
                  transition={{
                    y: { duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 1.5 },
                  }}
                >
                  <div className="relative">
                    <motion.div
                      className="absolute inset-0 rounded-full blur-xl"
                      style={{ backgroundColor: 'var(--accent)', opacity: 0.3 }}
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.3, 0.7, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 0.9,
                      }}
                    />
                    <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-accent to-accent flex items-center justify-center text-4xl shadow-2xl transition-all border-4 border-accent/50 group-hover:border-accent" style={{ filter: 'brightness(1.1)' }}>
                      📧
                    </div>
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-sm font-semibold text-accent bg-background/95 backdrop-blur-sm px-4 py-2 rounded-full border-2 border-accent/50 shadow-lg">
                        {t("contact.email")}
                      </span>
                    </div>
                  </div>
                </motion.a>

                {/* Enhanced Connecting Lines (Constellation Effect) */}
                <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none">
                  <motion.line
                    x1="10%" y1="15%" x2="90%" y2="15%"
                    stroke="var(--accent)"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1, strokeDashoffset: [0, -10] }}
                    transition={{ 
                      pathLength: { duration: 2, delay: 0.5 },
                      strokeDashoffset: { duration: 2, repeat: Infinity, ease: "linear" }
                    }}
                  />
                  <motion.line
                    x1="10%" y1="15%" x2="12%" y2="80%"
                    stroke="var(--accent)"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1, strokeDashoffset: [0, -10] }}
                    transition={{ 
                      pathLength: { duration: 2, delay: 0.7 },
                      strokeDashoffset: { duration: 2, repeat: Infinity, ease: "linear", delay: 0.5 }
                    }}
                  />
                  <motion.line
                    x1="90%" y1="15%" x2="88%" y2="80%"
                    stroke="var(--accent)"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1, strokeDashoffset: [0, -10] }}
                    transition={{ 
                      pathLength: { duration: 2, delay: 0.9 },
                      strokeDashoffset: { duration: 2, repeat: Infinity, ease: "linear", delay: 1 }
                    }}
                  />
                  <motion.line
                    x1="12%" y1="80%" x2="88%" y2="80%"
                    stroke="var(--accent)"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1, strokeDashoffset: [0, -10] }}
                    transition={{ 
                      pathLength: { duration: 2, delay: 1.1 },
                      strokeDashoffset: { duration: 2, repeat: Infinity, ease: "linear", delay: 1.5 }
                    }}
                  />
                </svg>
              </div>

              {/* Mobile: Enhanced List Below Form */}
              <div className="lg:hidden mt-12 flex flex-wrap justify-center gap-6">
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-2xl shadow-lg hover:scale-110 transition-transform">💼</a>
                <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-2xl shadow-lg hover:scale-110 transition-transform">👨‍💻</a>
                <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-2xl shadow-lg hover:scale-110 transition-transform">🐦</a>
                <a href={`mailto:${personalInfo.email}`} className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-accent flex items-center justify-center text-2xl shadow-lg hover:scale-110 transition-transform">📧</a>
              </div>
            </div>
          </motion.div>
        </Section>
      </main>
    </div>
  );
}

