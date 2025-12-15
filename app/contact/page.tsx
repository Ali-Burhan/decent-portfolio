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
    <div className="relative min-h-screen bg-background text-foreground selection:bg-accent/30 overflow-hidden">
      {/* Immersive Digital Network Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-background bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] opacity-20" />
        
        {/* Animated Network Nodes */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-accent/20"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              scale: 0
            }}
            animate={{
              x: [null, Math.random() * 100 + "%"],
              y: [null, Math.random() * 100 + "%"],
              scale: [0, 1.5, 0],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5
            }}
          />
        ))}

        {/* Floating Gradient Orbs */}
        <motion.div
          className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-accent/10 blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-accent/10 blur-[100px]"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <Nav />

      <main>
        <Section className="pt-32 pb-20">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-20 space-y-6"
            >
              <div className="flex items-center justify-center gap-3">
                <motion.div
                  className="h-px w-12 bg-gradient-to-r from-transparent to-accent"
                  initial={{ width: 0 }}
                  animate={{ width: 48 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
                <p className="font-mono text-accent text-sm tracking-[0.2em] uppercase">
                  04. {t("contact.title")}
                </p>
                <motion.div
                  className="h-px w-12 bg-gradient-to-l from-transparent to-accent"
                  initial={{ width: 0 }}
                  animate={{ width: 48 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                Let&apos;s build something
                <span className="block mt-2 bg-gradient-to-r from-accent via-accent/80 to-accent bg-clip-text text-transparent">
                  remarkable together
                </span>
              </h1>
              
              <p className="text-foreground/70 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
                {t("contact.subtitle")}
              </p>
            </motion.div>

            <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] items-start">
              {/* Enhanced Form Container */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 to-accent/0 rounded-3xl blur-xl opacity-50" />
                <div className="relative rounded-3xl border border-foreground/10 bg-foreground/5 p-8 backdrop-blur-xl shadow-2xl">
                  <ContactForm />
                </div>
              </motion.div>

              <div className="space-y-8">
                {/* Direct Line Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="rounded-3xl border border-foreground/10 bg-foreground/5 p-8 backdrop-blur-xl shadow-xl hover:bg-foreground/10 transition-colors group"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                      📧
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Direct line</h2>
                      <p className="text-sm text-foreground/70">Prefer email? Reach out directly:</p>
                    </div>
                  </div>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="flex items-center justify-between w-full p-4 rounded-xl bg-background/50 border border-foreground/10 hover:border-accent/50 hover:bg-accent/5 transition-all group/link"
                  >
                    <span className="font-mono text-accent">{personalInfo.email}</span>
                    <span className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover/link:translate-x-1 transition-transform">
                      ↗
                    </span>
                  </a>
                </motion.div>

                {/* Social Grid */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="grid gap-4"
                >
                  {[
                    { 
                      name: "LinkedIn", 
                      icon: "💼", 
                      url: socialLinks.linkedin, 
                      desc: "Connect professionally",
                      color: "from-blue-500/20 to-blue-600/20",
                      hoverColor: "group-hover:border-blue-500/50"
                    },
                    { 
                      name: "GitHub", 
                      icon: "👨‍💻", 
                      url: socialLinks.github, 
                      desc: "View open source work",
                      color: "from-purple-500/20 to-purple-600/20",
                      hoverColor: "group-hover:border-purple-500/50"
                    },
                    { 
                      name: "Twitter", 
                      icon: "🐦", 
                      url: socialLinks.twitter, 
                      desc: "Follow my thoughts",
                      color: "from-cyan-500/20 to-cyan-600/20",
                      hoverColor: "group-hover:border-cyan-500/50"
                    }
                  ].map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className={`relative p-4 rounded-2xl border border-foreground/10 bg-foreground/5 backdrop-blur-xl flex items-center gap-4 group overflow-hidden ${social.hoverColor} transition-colors`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${social.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                      
                      <span className="relative z-10 text-2xl group-hover:scale-110 transition-transform duration-300">
                        {social.icon}
                      </span>
                      <div className="relative z-10 flex-1">
                        <h3 className="font-bold text-foreground group-hover:text-accent transition-colors">
                          {social.name}
                        </h3>
                        <p className="text-xs text-foreground/60">{social.desc}</p>
                      </div>
                      <span className="relative z-10 text-foreground/30 group-hover:text-accent group-hover:translate-x-1 transition-all">
                        →
                      </span>
                    </motion.a>
                  ))}
                </motion.div>

                {/* Availability Status */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-accent/5 border border-accent/10"
                >
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                  </span>
                  <p className="text-sm font-medium text-accent">
                    Currently accepting new projects
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
