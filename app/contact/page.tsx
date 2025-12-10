"use client";

import React from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/section";
import { ContactForm } from "@/components/contact-form";
import portfolioData from "@/data/portfolio.json";
import { useI18n } from "@/lib/i18n";
import { Nav } from "@/components/nav";

export default function ContactPage() {
  const { personalInfo, socialLinks } = portfolioData;
  const { t } = useI18n();

  return (
    <div className="relative min-h-screen bg-background text-foreground selection:bg-accent/30">
      <div className="fixed inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] opacity-20" />
      <div className="fixed top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-accent/20 blur-[100px] opacity-30 animate-pulse" />
      <div className="fixed bottom-0 left-0 -z-10 h-[500px] w-[500px] rounded-full bg-accent/20 blur-[100px] opacity-30 animate-pulse delay-1000" />

      <Nav />

      <main>
        <Section className="pt-32">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <p className="font-mono text-accent text-sm tracking-[0.2em] uppercase">
                04. {t("contact.title")}
              </p>
              <h1 className="text-4xl md:text-5xl font-bold">
                Let&apos;s build something
                <span className="block bg-gradient-to-r from-accent via-accent/80 to-accent bg-clip-text text-transparent">
                  remarkable together
                </span>
              </h1>
              <p className="text-foreground/70 max-w-2xl mx-auto text-sm md:text-base">
                {t("contact.subtitle")}
              </p>
            </div>

            <div className="grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] items-start">
              <ContactForm />

              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="rounded-2xl border border-foreground/10 bg-foreground/5 p-6 backdrop-blur-xl shadow-xl"
                >
                  <h2 className="text-lg font-semibold mb-2">Direct line</h2>
                  <p className="text-sm text-foreground/70 mb-4">
                    Prefer email? You can always reach me directly:
                  </p>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="inline-flex items-center gap-2 text-accent font-mono text-sm hover:underline"
                  >
                    {personalInfo.email}
                    <span>↗</span>
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                  className="rounded-2xl border border-foreground/10 bg-foreground/5 p-6 backdrop-blur-xl shadow-xl"
                >
                  <h2 className="text-lg font-semibold mb-4">Around the web</h2>
                  <div className="space-y-3 text-sm">
                    <a
                      href={socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-3 group"
                    >
                      <span className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-xl">
                          💼
                        </span>
                        <span className="font-medium">LinkedIn</span>
                      </span>
                      <span className="text-xs text-foreground/50 group-hover:text-accent transition-colors">
                        Connect
                      </span>
                    </a>
                    <a
                      href={socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-3 group"
                    >
                      <span className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-xl">
                          👨‍💻
                        </span>
                        <span className="font-medium">GitHub</span>
                      </span>
                      <span className="text-xs text-foreground/50 group-hover:text-accent transition-colors">
                        View projects
                      </span>
                    </a>
                    <a
                      href={socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-3 group"
                    >
                      <span className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-xl">
                          🐦
                        </span>
                        <span className="font-medium">Twitter</span>
                      </span>
                      <span className="text-xs text-foreground/50 group-hover:text-accent transition-colors">
                        Say hi
                      </span>
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-xs text-foreground/50 font-mono"
                >
                  <p>
                    I&apos;m always interested in hearing about new ideas, ambitious products,
                    and teams that value craftsmanship. Even if you don&apos;t have a specific
                    project yet, feel free to reach out and share what you&apos;re working on.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </Section>
      </main>
    </div>
  );
}
