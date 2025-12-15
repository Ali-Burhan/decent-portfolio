"use client";

import React from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/section";
import portfolioData from "@/data/portfolio.json";
import { useI18n } from "@/lib/i18n";
import { Nav } from "@/components/nav";

export default function AboutPage() {
  const { personalInfo, skills } = portfolioData;
  const { t } = useI18n();

  const skillCategories = [
    { name: "Frontend", skills: skills.frontend, icon: "🎨", color: "from-blue-500 to-cyan-500" },
    { name: "Backend", skills: skills.backend, icon: "⚙️", color: "from-purple-500 to-pink-500" },
    { name: "Cloud & DevOps", skills: skills.cloudDevOps, icon: "☁️", color: "from-green-500 to-emerald-500" },
    { name: "AI & ML", skills: skills.aiMl, icon: "🤖", color: "from-orange-500 to-red-500" },
  ];

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-accent/30 overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] opacity-20" />
      
      {/* Animated Gradient Orbs */}
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
          <div className="grid gap-16 lg:grid-cols-2 items-start max-w-7xl mx-auto">
            {/* Left Content */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                {/* Header */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="h-px flex-1 bg-gradient-to-r from-transparent to-accent/30"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    />
                    <p className="font-mono text-accent text-sm tracking-[0.2em] uppercase">
                      01. {t("about.title")}
                    </p>
                  </div>
                  
                  <h1 className="text-4xl md:text-6xl font-bold">
                    A bit more about
                    <span className="block mt-2 bg-gradient-to-r from-accent via-accent/80 to-accent bg-clip-text text-transparent">
                      {personalInfo.name}
                    </span>
                  </h1>
                </div>

                {/* Bio Content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                  className="space-y-5 text-base md:text-lg text-foreground/80 leading-relaxed"
                >
                  <p className="relative pl-4 border-l-2 border-accent/30">
                    Hello! My name is <span className="text-accent font-semibold">{personalInfo.name}</span>, a <span className="text-accent font-semibold">{personalInfo.role}</span> based in{" "}
                    {personalInfo.location}. I enjoy crafting thoughtful digital experiences that
                    feel fast, polished, and a little bit magical.
                  </p>
                  <p className="relative pl-4 border-l-2 border-accent/30">{personalInfo.description}</p>
                  <p className="relative pl-4 border-l-2 border-accent/30">
                    Outside of code, I love exploring new technologies, mentoring other developers,
                    and thinking about how small UX details can make a product feel world‑class.
                  </p>
                </motion.div>

                {/* Quick Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="grid grid-cols-2 gap-4 pt-4"
                >
                  {[
                    { label: "Years Experience", value: "3+", icon: "💼" },
                    { label: "Projects Completed", value: "20+", icon: "🚀" },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      whileHover={{ y: -4 }}
                      className="p-4 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 hover:border-accent/40 transition-all"
                    >
                      <div className="text-2xl mb-2">{stat.icon}</div>
                      <div className="text-2xl md:text-3xl font-bold text-accent">{stat.value}</div>
                      <div className="text-xs md:text-sm text-foreground/60 mt-1">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Tech Stack by Category */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3">
                  <div className="h-px w-8 bg-accent/50" />
                  <h2 className="text-xl font-semibold text-foreground">Tech I work with</h2>
                </div>

                <div className="space-y-6">
                  {skillCategories.map((category, catIndex) => (
                    <motion.div
                      key={category.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + catIndex * 0.1 }}
                      className="space-y-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{category.icon}</span>
                        <h3 className="text-sm font-semibold text-foreground/90">{category.name}</h3>
                        <div className="h-px flex-1 bg-foreground/10" />
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((tech, index) => (
                          <motion.span
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + catIndex * 0.1 + index * 0.03 }}
                            whileHover={{ 
                              y: -3, 
                              scale: 1.05,
                              transition: { duration: 0.2 }
                            }}
                            className="px-3 py-1.5 rounded-lg border border-accent/30 bg-accent/5 text-accent text-xs font-mono shadow-sm hover:border-accent/50 hover:bg-accent/10 transition-all cursor-default"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Image Section */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="relative lg:sticky lg:top-32"
            >
              <div className="relative max-w-md mx-auto">
                {/* Profile Image Container */}
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative group"
                >
                  {/* Pulsing Background Glow */}
                  <div className="absolute inset-0 flex items-center justify-center -z-10">
                    <motion.div
                      className="w-[90%] h-[90%] rounded-full bg-accent/20 blur-3xl"
                      animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.2, 0.35, 0.2]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </div>
                  
                  {/* Animated Geometric Shapes */}
                  <motion.div
                    className="absolute bottom-0 right-0 w-3/5 h-3/5 rounded-tl-[100px] rounded-br-3xl bg-gradient-to-br from-accent to-accent/70 -z-10"
                    animate={{ rotate: [0, 5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  />
                  
                  <motion.div
                    className="absolute top-0 left-0 w-3/5 h-3/5 rounded-tr-[100px] rounded-bl-3xl bg-gradient-to-tl from-accent to-accent/70 -z-10"
                    animate={{ rotate: [0, -5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  />
                  
                  {/* Main Image */}
                  <div className="relative aspect-square rounded-3xl overflow-hidden border-2 border-foreground/10 shadow-2xl bg-background">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full"
                    >
                      <img
                        src="/ali pic.png"
                        alt={personalInfo.name}
                        className="w-full h-full object-cover"
                      />
                      {/* Subtle overlay on hover */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-t from-accent/20 via-transparent to-transparent"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      
                      {/* Corner Decorations */}
                      <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-accent/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-accent/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                  </div>
                  
                  {/* Floating Status Badge */}
                  <motion.div
                    className="absolute -bottom-4 -right-4 bg-accent text-white px-4 py-2 rounded-full shadow-lg text-sm font-semibold flex items-center gap-2"
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <motion.div
                      className="w-2 h-2 rounded-full bg-white"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    Available for work
                  </motion.div>
                  
                  {/* Accent border glow */}
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-accent via-accent/50 to-accent rounded-3xl blur-xl -z-10"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.2 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>

                {/* Floating Accent Blobs */}
                <motion.div
                  animate={{ y: [0, 10, 0], x: [0, 5, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                  className="absolute -bottom-10 -left-6 h-32 w-32 rounded-full bg-accent/20 blur-3xl"
                />
                <motion.div
                  animate={{ y: [0, -8, 0], x: [0, -5, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                  className="absolute -top-8 -right-4 h-28 w-28 rounded-full bg-accent/30 blur-3xl" 
                />
              </div>
            </motion.div>
          </div>
        </Section>
      </main>
    </div>
  );
}
