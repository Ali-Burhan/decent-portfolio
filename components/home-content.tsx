"use client";
import React, { useMemo } from "react";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Section } from "@/components/section";
import { ContactForm } from "@/components/contact-form";
import { motion } from "framer-motion";
import portfolioData from "../data/portfolio.json";

export function HomeContent() {
  const { personalInfo, experience, freelanceProjects, skills, socialLinks } = portfolioData;

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
              <h2 className="flex items-center text-3xl md:text-5xl font-bold text-foreground">
                <span className="mr-4 font-mono text-accent text-2xl">01.</span> 
                About Me
              </h2>
              <div className="space-y-6 text-lg text-foreground/80 leading-relaxed">
                <p>
                  Hello! My name is {personalInfo.name} and I enjoy creating things that live on
                  the internet. I am a {personalInfo.role} based in {personalInfo.location}.
                </p>
                <p>
                  {personalInfo.description}
                </p>
                <p>Here are a few technologies I&apos;ve been working with recently:</p>
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
              <div className="relative z-10 aspect-square w-full max-w-[400px] mx-auto rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 overflow-hidden shadow-2xl transition-transform duration-500 group-hover:rotate-y-12 group-hover:rotate-x-6">
                {/* Placeholder for Image */}
                <div className="flex h-full items-center justify-center text-foreground/20 text-6xl font-bold">
                  IMG
                </div>
                <div className="absolute inset-0 bg-accent/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
            <h2 className="mb-16 flex items-center text-3xl md:text-5xl font-bold text-foreground">
              <span className="mr-4 font-mono text-accent text-2xl">02.</span> 
              Where I&apos;ve Worked
            </h2>
            
            <div className="relative border-l-2 border-foreground/10 ml-3 md:ml-6 space-y-12">
              {experience.map((job, index) => (
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
            <h2 className="mb-16 flex items-center text-3xl md:text-5xl font-bold text-foreground">
              <span className="mr-4 font-mono text-accent text-2xl">03.</span> 
              Some Things I&apos;ve Built
            </h2>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {allProjects.map((project, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -10 }}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-foreground/5 border border-foreground/10 p-8 transition-all duration-300 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10"
                >
                  <div className="mb-6 flex items-center justify-between">
                    <div className="text-accent">
                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                      </svg>
                    </div>
                    <div className="flex gap-4 text-foreground/60">
                      <a href="#" className="hover:text-accent transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                      </a>
                      <a href="#" className="hover:text-accent transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                      </a>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="mb-2 text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                      {project.name}
                    </h3>
                    <p className="mb-4 text-foreground/70 leading-relaxed text-sm">
                      {project.description}
                    </p>
                  </div>
                  
                  <ul className="flex flex-wrap gap-3 font-mono text-xs text-foreground/50 mt-4">
                    {project.technologies.slice(0, 4).map((tech, i) => (
                      <li key={i}>{tech}</li>
                    ))}
                  </ul>
                </motion.div>
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
              <p className="font-mono text-accent mb-4">04. What&apos;s Next?</p>
              <h2 className="mb-6 text-5xl md:text-6xl font-bold text-foreground">Let&apos;s Connect!</h2>
              <p className="mb-8 text-lg md:text-xl text-foreground/70 leading-relaxed max-w-2xl mx-auto">
                Choose your favorite way to reach out. Hover over the orbiting links or use the form below!
              </p>
            </div>
            
            {/* Orbital Contact System */}
            <div className="relative max-w-5xl mx-auto">
              {/* Central Contact Form */}
              <div className="relative z-10 max-w-2xl mx-auto">
                <ContactForm />
              </div>
              
              {/* Orbiting Social Links */}
              <div className="absolute inset-0 pointer-events-none hidden lg:block">
                {/* LinkedIn - Top Left */}
                <motion.a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pointer-events-auto absolute group"
                  style={{ top: "10%", left: "5%" }}
                  whileHover={{ scale: 1.3 }}
                  animate={{
                    y: [0, -15, 0],
                  }}
                  transition={{
                    y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  }}
                >
                  <div className="relative">
                    {/* Glow Ring */}
                    <motion.div
                      className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                    {/* Planet */}
                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-3xl shadow-2xl group-hover:shadow-blue-500/50 transition-shadow border-4 border-blue-300/30">
                      💼
                    </div>
                    {/* Label */}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-sm font-semibold text-blue-500 bg-background/90 px-3 py-1 rounded-full border border-blue-500/30">
                        LinkedIn
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
                  whileHover={{ scale: 1.3 }}
                  animate={{
                    y: [0, -20, 0],
                  }}
                  transition={{
                    y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
                  }}
                >
                  <div className="relative">
                    <motion.div
                      className="absolute inset-0 rounded-full bg-purple-500/20 blur-xl"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 0.3,
                      }}
                    />
                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-3xl shadow-2xl group-hover:shadow-purple-500/50 transition-shadow border-4 border-purple-300/30">
                      👨‍💻
                    </div>
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-sm font-semibold text-purple-500 bg-background/90 px-3 py-1 rounded-full border border-purple-500/30">
                        GitHub
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
                  whileHover={{ scale: 1.3 }}
                  animate={{
                    y: [0, -18, 0],
                  }}
                  transition={{
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 },
                  }}
                >
                  <div className="relative">
                    <motion.div
                      className="absolute inset-0 rounded-full bg-cyan-500/20 blur-xl"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 0.6,
                      }}
                    />
                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-3xl shadow-2xl group-hover:shadow-cyan-500/50 transition-shadow border-4 border-cyan-300/30">
                      🐦
                    </div>
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-sm font-semibold text-cyan-500 bg-background/90 px-3 py-1 rounded-full border border-cyan-500/30">
                        Twitter
                      </span>
                    </div>
                  </div>
                </motion.a>

                {/* Email - Bottom Right */}
                <motion.a
                  href={`mailto:${personalInfo.email}`}
                  className="pointer-events-auto absolute group"
                  style={{ bottom: "15%", right: "8%" }}
                  whileHover={{ scale: 1.3 }}
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
                      style={{ backgroundColor: 'var(--accent)', opacity: 0.2 }}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 0.9,
                      }}
                    />
                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-accent to-accent flex items-center justify-center text-3xl shadow-2xl transition-shadow border-4 border-accent/30" style={{ filter: 'brightness(1.1)' }}>
                      📧
                    </div>
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-sm font-semibold text-accent bg-background/90 px-3 py-1 rounded-full border border-accent/30">
                        Email
                      </span>
                    </div>
                  </div>
                </motion.a>

                {/* Connecting Lines (Constellation Effect) */}
                <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
                  <motion.line
                    x1="10%" y1="15%" x2="90%" y2="15%"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-accent"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 0.5 }}
                  />
                  <motion.line
                    x1="10%" y1="15%" x2="12%" y2="80%"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-accent"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 0.7 }}
                  />
                  <motion.line
                    x1="90%" y1="15%" x2="88%" y2="80%"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-accent"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 0.9 }}
                  />
                  <motion.line
                    x1="12%" y1="80%" x2="88%" y2="80%"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-accent"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 1.1 }}
                  />
                </svg>
              </div>

              {/* Mobile: Simple List Below Form */}
              <div className="lg:hidden mt-12 flex flex-wrap justify-center gap-4">
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

