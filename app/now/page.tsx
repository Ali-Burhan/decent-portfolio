"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Code, Target, MapPin, Mail, Calendar } from "lucide-react";

export default function NowPage() {
  const lastUpdated = "December 2025";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-accent/10 to-accent/5 border-b border-foreground/10">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              What I'm Doing Now
            </h1>
            <p className="text-lg text-foreground/70">
              A snapshot of my current focus, projects, and goals
            </p>
            <p className="text-sm text-foreground/50 mt-4">
              Last updated: {lastUpdated}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
        
        {/* Currently Learning */}
        <Section
          icon={<BookOpen className="w-6 h-6" />}
          title="Currently Learning"
          delay={0.1}
        >
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Master's in Computer Science
              </h3>
              <p className="text-foreground/70 mb-3">
                University of Engineering and Technology (UET) Lahore • 2025-2027
              </p>
              <ul className="space-y-2 text-foreground/80">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">▹</span>
                  <span>Advanced algorithms and distributed systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">▹</span>
                  <span>Cloud architecture patterns</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">▹</span>
                  <span>AI/ML research and applications</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Technical Deep Dives
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Advanced LangChain patterns",
                  "AWS CDK",
                  "Next.js 15",
                  "React Server Components",
                  "Vector databases",
                  "Agent frameworks",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-lg text-sm font-mono text-accent"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Currently Building */}
        <Section
          icon={<Code className="w-6 h-6" />}
          title="Currently Building"
          delay={0.2}
        >
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                At Hashlogics
              </h3>
              <ul className="space-y-2 text-foreground/80">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">▹</span>
                  <span>Scaling Forwood Safety platform to new markets</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">▹</span>
                  <span>Building AI-powered internal tools with LangChain</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">▹</span>
                  <span>Optimizing microservices for performance</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">▹</span>
                  <span>Leading quarterly release cycles as Release Manager</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Side Projects
              </h3>
              <ul className="space-y-2 text-foreground/80">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">▹</span>
                  <span>Personal AI assistant using GPT-4 and voice</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">▹</span>
                  <span>Open-source Next.js starter template</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">▹</span>
                  <span>Technical blog on Full Stack + AI topics</span>
                </li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Current Goals */}
        <Section
          icon={<Target className="w-6 h-6" />}
          title="Current Goals"
          delay={0.3}
        >
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Q1 2025
              </h3>
              <div className="grid gap-3">
                {[
                  "Publish 4 technical blog posts",
                  "Contribute to 2 open-source projects",
                  "Complete AWS Solutions Architect certification",
                  "Build portfolio of 3 AI-powered tools",
                ].map((goal, i) => (
                  <motion.div
                    key={goal}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-foreground/5 border border-foreground/10"
                  >
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    <span className="text-foreground/80">{goal}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Career
              </h3>
              <ul className="space-y-2 text-foreground/80">
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">▹</span>
                  <span>Transition to Senior Full Stack Engineer role</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">▹</span>
                  <span>Speak at local tech meetup</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">▹</span>
                  <span>Mentor junior developers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent mt-1">▹</span>
                  <span>Build personal brand on LinkedIn/Twitter</span>
                </li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Currently Reading */}
        <Section
          icon={<BookOpen className="w-6 h-6" />}
          title="Currently Reading"
          delay={0.4}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Technical
              </h3>
              <ul className="space-y-2 text-foreground/80">
                <li>"Designing Data-Intensive Applications" by Martin Kleppmann</li>
                <li>"Building LLM Apps" by Valentina Alto</li>
                <li>AWS Well-Architected Framework docs</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Professional
              </h3>
              <ul className="space-y-2 text-foreground/80">
                <li>"Staff Engineer" by Will Larson</li>
                <li>"The Pragmatic Programmer" (re-reading)</li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Currently Based */}
        <Section
          icon={<MapPin className="w-6 h-6" />}
          title="Currently Based"
          delay={0.5}
        >
          <div className="space-y-4">
            <p className="text-xl font-semibold text-foreground">
              Lahore, Pakistan 🇵🇰
            </p>
            <ul className="space-y-2 text-foreground/80">
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">▹</span>
                <span>Open to remote opportunities globally</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">▹</span>
                <span>Available for consulting projects</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent mt-1">▹</span>
                <span>Interested in AI/LLM startups</span>
              </li>
            </ul>
          </div>
        </Section>

        {/* Let's Connect */}
        <Section
          icon={<Mail className="w-6 h-6" />}
          title="Let's Connect"
          delay={0.6}
        >
          <div className="space-y-4">
            <p className="text-foreground/80">
              Working on something interesting? Let's chat!
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:aliburhan.dev.ai@gmail.com"
                className="px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-accent/50 transition-all"
              >
                Send Email
              </a>
              <a
                href="https://linkedin.com/in/aliburhan"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-foreground/10 border border-foreground/20 rounded-lg font-semibold hover:bg-foreground/20 transition-all"
              >
                LinkedIn
              </a>
              <a
                href="https://calendly.com/aliburhan"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-foreground/10 border border-foreground/20 rounded-lg font-semibold hover:bg-foreground/20 transition-all inline-flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Call</span>
              </a>
            </div>
          </div>
        </Section>

      </div>
    </div>
  );
}

// Section Component
function Section({
  icon,
  title,
  children,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="space-y-4"
    >
      <div className="flex items-center gap-3 pb-3 border-b border-foreground/10">
        <div className="p-2 rounded-lg bg-accent/10 text-accent">
          {icon}
        </div>
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
      </div>
      <div className="pl-0 md:pl-11">
        {children}
      </div>
    </motion.section>
  );
}
