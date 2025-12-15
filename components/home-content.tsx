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
            {/* Left Content */}
            <div className="space-y-8 order-2 lg:order-1">
              {/* Header with decorative elements */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <motion.div
                    className="h-px flex-1 bg-gradient-to-r from-transparent to-accent/30"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  />
                  <span className="font-mono text-accent text-xl">01.</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl md:text-5xl font-bold text-foreground">
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
              </div>

              {/* Content with enhanced styling */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="space-y-4 text-lg text-foreground/80 leading-relaxed"
                >
                  <p className="relative pl-4 border-l-2 border-accent/30">
                    Hello! My name is <span className="text-accent font-semibold">{personalInfo.name}</span> and I enjoy creating things that live on
                    the internet. I am a <span className="text-accent font-semibold">{personalInfo.role}</span> based in {personalInfo.location}.
                  </p>
                  <p className="relative pl-4 border-l-2 border-accent/30">
                    {personalInfo.description}
                  </p>
                </motion.div>

                {/* Tech Stack Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-px w-8 bg-accent/50" />
                    <p className="text-sm font-mono text-accent uppercase tracking-wider">Tech Stack</p>
                  </div>
                  
                  {/* Animated Tech Badges */}
                  <div className="flex flex-wrap gap-3">
                    {[...skills.frontend, ...skills.backend, ...skills.cloudDevOps].slice(0, 12).map((tech, index) => (
                      <motion.li
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.05 * index }}
                        whileHover={{ 
                          y: -4,
                          scale: 1.05,
                          transition: { duration: 0.2 }
                        }}
                        className="group relative px-4 py-2 bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 rounded-lg text-accent text-sm font-mono hover:border-accent/40 transition-all cursor-default list-none"
                      >
                        <span className="relative z-10">{tech}</span>
                        <motion.div
                          className="absolute inset-0 bg-accent/5 rounded-lg opacity-0 group-hover:opacity-100"
                          transition={{ duration: 0.2 }}
                        />
                      </motion.li>
                    ))}
                  </div>
                </motion.div>

                {/* View More Link for Desktop */}
                <motion.a
                  href="/about"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ x: 5 }}
                  className="hidden lg:inline-flex items-center gap-2 text-sm font-mono text-accent hover:underline group"
                >
                  Explore more about me
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.a>
              </div>
            </div>
            
            {/* Right Image with Enhanced Effects */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative group order-1 lg:order-2"
            >
              {/* Decorative Background Elements */}
              <div className="absolute inset-0 flex items-center justify-center -z-10">
                <motion.div
                  className="w-[90%] h-[90%] rounded-full bg-accent/20 blur-3xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.3, 0.2]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
              
              {/* Geometric accent shapes with animations */}
              <motion.div
                className="absolute bottom-0 right-0 w-3/5 h-3/5 rounded-tl-[100px] rounded-br-2xl bg-gradient-to-br from-accent to-accent/70 -z-10"
                animate={{
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <motion.div
                className="absolute top-0 left-0 w-3/5 h-3/5 rounded-tr-[100px] rounded-bl-2xl bg-gradient-to-tl from-accent to-accent/70 -z-10"
                animate={{
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
              
              {/* Main Image Container */}
              <div className="relative z-10 aspect-square w-full max-w-[400px] mx-auto">
                <motion.div
                  className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-2 border-foreground/10 bg-background"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src="/ali pic.png"
                    alt={personalInfo.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Gradient Overlay on Hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-accent/20 via-transparent to-transparent"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Decorative Corner Accents */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-accent/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-accent/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
                
                {/* Floating Badge */}
                <motion.div
                  className="absolute -bottom-4 -right-4 bg-accent text-white px-4 py-2 rounded-full shadow-lg text-sm font-semibold"
                  initial={{ scale: 0, rotate: -10 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  Available for work
                </motion.div>
              </div>
              
              {/* Shadow Frame */}
              <motion.div
                className="absolute top-4 left-4 -z-10 h-full w-full max-w-[400px] mx-auto rounded-2xl border-2 border-accent/30"
                initial={{ x: 0, y: 0 }}
                whileHover={{ x: 8, y: 8 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.div>
        </Section>

        {/* Experience Section */}
        <Section id="experience">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-5xl mx-auto"
          >
            {/* Header with decorative elements */}
            <div className="mb-16 space-y-6">
              <div className="flex items-center gap-4">
                <span className="font-mono text-accent text-xl">02.</span>
                <motion.div
                  className="h-px flex-1 bg-gradient-to-r from-accent/30 to-transparent"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <h2 className="text-3xl md:text-5xl font-bold text-foreground">
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
            </div>
            
            {/* Enhanced Timeline */}
            <div className="relative">
              {/* Animated Timeline Line */}
              <motion.div
                className="absolute left-0 md:left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-accent/50 to-transparent"
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
              />
              
              {/* Glowing effect on timeline */}
              <motion.div
                className="absolute left-0 md:left-6 top-0 w-0.5 h-32 bg-gradient-to-b from-accent to-transparent blur-sm"
                animate={{
                  y: [0, 300, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <div className="space-y-12 md:space-y-16">
                {experience.slice(0, 2).map((job, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2, duration: 0.6 }}
                    className="relative pl-8 md:pl-16 group"
                  >
                    {/* Animated Node */}
                    <div className="absolute left-0 md:left-6 top-6 -translate-x-1/2">
                      <motion.div
                        className="relative"
                        whileHover={{ scale: 1.2 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Outer glow ring */}
                        <motion.div
                          className="absolute inset-0 rounded-full bg-accent/30 blur-md"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 0.8, 0.5]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.5
                          }}
                        />
                        {/* Main node */}
                        <div className="relative w-5 h-5 rounded-full bg-background border-2 border-accent group-hover:bg-accent transition-all duration-300 shadow-lg shadow-accent/50">
                          <motion.div
                            className="absolute inset-0 rounded-full bg-accent"
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 + 0.5, type: "spring", stiffness: 200 }}
                          />
                        </div>
                      </motion.div>
                    </div>
                    
                    {/* Experience Card */}
                    <motion.div
                      className="relative p-6 md:p-8 rounded-2xl bg-gradient-to-br from-foreground/5 to-foreground/[0.02] border border-foreground/10 hover:border-accent/40 transition-all duration-500 backdrop-blur-sm overflow-hidden group/card"
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Gradient border effect on hover */}
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
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
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-accent/10 to-transparent rounded-bl-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                      
                      <div className="relative z-10">
                        {/* Header */}
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                          <div>
                            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                              {job.position} <span className="text-accent">@ {job.company}</span>
                            </h3>
                            <div className="flex flex-wrap items-center gap-3 font-mono text-xs md:text-sm text-foreground/60">
                              <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {job.duration}
                              </span>
                              <span className="text-foreground/30">•</span>
                              <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {job.location}
                              </span>
                            </div>
                          </div>
                          
                          {/* Project count badge */}
                          <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 + 0.6, type: "spring" }}
                            className="flex items-center gap-2 px-3 py-1.5 bg-accent/10 border border-accent/30 rounded-full text-accent text-xs font-semibold whitespace-nowrap"
                          >
                            <span>{job.projects.length} {job.projects.length === 1 ? 'Project' : 'Projects'}</span>
                          </motion.div>
                        </div>
                        
                        {/* Projects */}
                        <div className="space-y-6 mt-6">
                          {job.projects.map((project, pIndex) => (
                            <motion.div
                              key={pIndex}
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.2 + pIndex * 0.1 }}
                              className="space-y-3"
                            >
                              {/* Project name with icon */}
                              <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                <h4 className="text-base md:text-lg font-semibold text-foreground/90">{project.name}</h4>
                              </div>
                              
                              {/* Achievements */}
                              <ul className="space-y-2 pl-4">
                                {project.achievements.slice(0, 3).map((point, i) => (
                                  <motion.li
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2 + pIndex * 0.1 + i * 0.05 }}
                                    className="flex items-start gap-3 text-foreground/75 text-sm leading-relaxed"
                                  >
                                    <span className="mt-1.5 text-accent text-xs">▹</span>
                                    <span>{point}</span>
                                  </motion.li>
                                ))}
                              </ul>
                              
                              {/* Tech stack for project */}
                              {project.technologies && project.technologies.length > 0 && (
                                <div className="flex flex-wrap gap-2 pt-2">
                                  {project.technologies.slice(0, 5).map((tech, techIndex) => (
                                    <motion.span
                                      key={tech}
                                      initial={{ opacity: 0, scale: 0.8 }}
                                      whileInView={{ opacity: 1, scale: 1 }}
                                      viewport={{ once: true }}
                                      transition={{ delay: index * 0.2 + pIndex * 0.1 + techIndex * 0.03 }}
                                      whileHover={{ y: -2, scale: 1.05 }}
                                      className="px-2 py-1 bg-accent/5 border border-accent/20 rounded text-accent text-xs font-mono hover:bg-accent/10 hover:border-accent/40 transition-all cursor-default"
                                    >
                                      {tech}
                                    </motion.span>
                                  ))}
                                </div>
                              )}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
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
            className="w-full max-w-5xl mx-auto"
          >
            {/* Enhanced Header */}
            <div className="text-center mb-20 space-y-6">
              <div className="flex items-center justify-center gap-3">
                <motion.div
                  className="h-px w-12 bg-gradient-to-r from-transparent to-accent"
                  initial={{ width: 0 }}
                  whileInView={{ width: 48 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
                <p className="font-mono text-accent text-sm tracking-[0.2em] uppercase">
                  04. {t("contact.sectionPrefix")}
                </p>
                <motion.div
                  className="h-px w-12 bg-gradient-to-l from-transparent to-accent"
                  initial={{ width: 0 }}
                  whileInView={{ width: 48 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </div>
              
              <h2 className="text-5xl md:text-7xl font-bold text-foreground tracking-tight">
                {t("contact.title")}
              </h2>
              
              <p className="text-lg md:text-xl text-foreground/70 leading-relaxed max-w-2xl mx-auto">
                {t("contact.subtitle")}
              </p>
            </div>
            
            {/* Orbital Contact System */}
            <div className="relative">
              {/* Animated Background Pattern - Constellation Effect */}
              <div className="absolute inset-0 -z-10 overflow-hidden rounded-3xl">
                <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent opacity-50" />
                
                {/* Grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--accent)_1px,transparent_1px),linear-gradient(to_bottom,var(--accent)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.05]" />
                
                {/* Floating particles with connections */}
                {[...Array(20)].map((_, i) => {
                  const startX = (i * 37) % 100;
                  const startY = (i * 53) % 100;
                  const duration = 15 + (i % 10);
                  
                  return (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-accent/40"
                      initial={{ x: `${startX}%`, y: `${startY}%` }}
                      animate={{
                        x: [`${startX}%`, `${(startX + 10) % 100}%`, `${startX}%`],
                        y: [`${startY}%`, `${(startY + 15) % 100}%`, `${startY}%`],
                        opacity: [0.2, 0.5, 0.2],
                      }}
                      transition={{
                        duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  );
                })}
                
                {/* Pulsing glow effects */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[100px]"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
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

