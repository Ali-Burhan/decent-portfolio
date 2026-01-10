"use client";

import React from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/section";
import { ContactForm } from "@/components/contact-form";
import portfolioData from "@/data/portfolio.json";
import { useI18n } from "@/lib/i18n";
import { Nav } from "@/components/nav";

export function ContactContent() {
  const { personalInfo, socialLinks } = portfolioData;
  const { t } = useI18n();

  const contactMethods = [
    {
      name: "Email",
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      value: "Connect with me",
      href: socialLinks.linkedin,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: "GitHub",
      value: "View my code",
      href: socialLinks.github,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Subtle background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/5 via-background to-background" />
      </div>

      <Nav />

      <main>
        <Section className="pt-28 pb-20">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <p className="text-accent font-mono text-sm mb-3">
                {t("contact.title")}
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                Get in Touch
              </h1>
              <p className="text-foreground/60 text-lg max-w-2xl">
                {t("contact.subtitle")}
              </p>
            </motion.div>

            <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <ContactForm />
              </motion.div>

              {/* Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-6"
              >
                {/* Availability */}
                <div className="p-5 rounded-xl border border-foreground/10 bg-foreground/[0.02]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-500 animate-ping opacity-75" />
                    </div>
                    <span className="font-medium text-foreground">Available for work</span>
                  </div>
                  <p className="text-sm text-foreground/60">
                    I&apos;m currently accepting new projects and collaborations.
                  </p>
                </div>

                {/* Contact Methods */}
                <div className="space-y-3">
                  {contactMethods.map((method, index) => (
                    <motion.a
                      key={method.name}
                      href={method.href}
                      target={method.href.startsWith("mailto") ? undefined : "_blank"}
                      rel={method.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-4 p-4 rounded-xl border border-foreground/10 bg-foreground/[0.02] hover:bg-foreground/[0.05] hover:border-accent/30 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-foreground/5 flex items-center justify-center text-foreground/60 group-hover:text-accent group-hover:bg-accent/10 transition-colors">
                        {method.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-foreground">{method.name}</div>
                        <div className="text-xs text-foreground/50 truncate">{method.value}</div>
                      </div>
                      <svg className="w-4 h-4 text-foreground/30 group-hover:text-accent transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.a>
                  ))}
                </div>

                {/* Location */}
                <div className="p-4 rounded-xl border border-foreground/10 bg-foreground/[0.02]">
                  <div className="flex items-center gap-3 text-foreground/60">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm">{personalInfo.location}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </Section>
      </main>
    </div>
  );
}
