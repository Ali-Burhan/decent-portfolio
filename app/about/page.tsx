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

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-accent/30">
      <div className="fixed inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] opacity-20" />
      <div className="fixed top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-accent/20 blur-[100px] opacity-30 animate-pulse" />
      <div className="fixed bottom-0 left-0 -z-10 h-[500px] w-[500px] rounded-full bg-accent/20 blur-[100px] opacity-30 animate-pulse delay-1000" />

      <Nav />

      <main>
        <Section className="pt-32">
          <div className="grid gap-16 lg:grid-cols-2 items-start">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                <p className="font-mono text-accent text-sm tracking-[0.2em] uppercase">
                  01. {t("about.title")}
                </p>
                <h1 className="text-4xl md:text-6xl font-bold">
                  A bit more about
                  <span className="block bg-gradient-to-r from-accent via-accent/80 to-accent bg-clip-text text-transparent">
                    {" "}
                    {personalInfo.name}
                  </span>
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="space-y-4 text-lg text-foreground/80 leading-relaxed"
              >
                <p>
                  Hello! My name is {personalInfo.name}, a {personalInfo.role} based in {" "}
                  {personalInfo.location}. I enjoy crafting thoughtful digital experiences that
                  feel fast, polished, and a little bit magical.
                </p>
                <p>{personalInfo.description}</p>
                <p>
                  Outside of code, I love exploring new technologies, mentoring other developers,
                  and thinking about how small UX details can make a product feel world‑class.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="space-y-4"
              >
                <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <span className="h-px w-8 bg-accent" />
                  Tech I work with
                </h2>
                <p className="text-sm text-foreground/70 max-w-xl">
                  {t("about.techIntro")}
                </p>
                <div className="flex flex-wrap gap-3">
                  {[...skills.frontend, ...skills.backend, ...skills.cloudDevOps, ...skills.aiMl]
                    .slice(0, 20)
                    .map((tech) => (
                      <motion.span
                        key={tech}
                        whileHover={{ y: -3, scale: 1.03 }}
                        className="px-4 py-2 rounded-full border border-accent/30 bg-accent/5 text-accent text-sm font-mono shadow-sm shadow-accent/10"
                      >
                        {tech}
                      </motion.span>
                    ))}
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative max-w-md mx-auto">
                {/* Profile Image Container */}
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative group"
                >
                  {/* Accent Background Shape - positioned behind */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-[85%] h-[85%] rounded-full bg-accent blur-2xl" />
                  </div>
                  
                  {/* Geometric accent shape - top right */}
                  <div className="absolute bottom-0 right-0 w-3/5 h-3/5 rounded-tl-[100px] rounded-br-3xl bg-gradient-to-br from-accent to-accent/70 -z-10" />
                  
                  {/* Geometric accent shape - bottom left */}
                  <div className="absolute top-0 left-0 w-3/5 h-3/5 rounded-tr-[100px] rounded-bl-3xl bg-gradient-to-tl from-accent to-accent/70 -z-10" />
                  
                  {/* Main Image */}
                  <div className="relative aspect-square rounded-3xl overflow-hidden border-2 border-foreground/10 shadow-2xl bg-background">
                    <img
                      src="/ali pic.png"
                      alt={personalInfo.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Subtle overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  
                  {/* Accent border glow */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-accent via-accent/50 to-accent rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10" />
                </motion.div>

                {/* Floating accent blobs */}
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                  className="absolute -bottom-10 -left-6 h-32 w-32 rounded-full bg-accent/30 blur-3xl"
                />
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                  className="absolute -top-8 -right-4 h-28 w-28 rounded-full bg-accent/40 blur-3xl" 
                />
              </div>
            </motion.div>
          </div>
        </Section>
      </main>
    </div>
  );
}
