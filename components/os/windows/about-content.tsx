"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Sparkles, Code2, Cloud, Bot, Wrench, GraduationCap } from "lucide-react";
import portfolioData from "@/data/portfolio.json";
import {
  OsWindowBody,
  OsSectionTitle,
  OsCard,
  OsBadge,
  OsTag,
  osMotion,
} from "../window-ui";

const skillMeta: Record<string, { label: string }> = {
  frontend: { label: "Frontend" },
  backend: { label: "Backend" },
  database: { label: "Databases" },
  cloudDevOps: { label: "Cloud & DevOps" },
  aiMl: { label: "AI / ML" },
  testing: { label: "Testing" },
  methodologies: { label: "Methodologies" },
  tools: { label: "Tools" },
};

export function AboutContent() {
  const { personalInfo, skills, certificates } = portfolioData;

  const skillCategories = (
    Object.entries(skills) as [keyof typeof skills, string[]][]
  ).filter(([, list]) => list?.length).map(([key, list]) => ({
    key,
    label: skillMeta[key]?.label ?? key,
    skills: list,
  }));

  const highlights = [
    { title: "Full Stack Development", desc: "Next.js, React, Python, Node.js", Icon: Code2 },
    { title: "Cloud Architecture", desc: "AWS, Terraform, Serverless", Icon: Cloud },
    { title: "AI Integration", desc: "LangChain, OpenAI, LLMs", Icon: Bot },
    { title: "DevOps & Testing", desc: "Docker, Jenkins, CI/CD", Icon: Wrench },
  ];

  return (
    <OsWindowBody>
      <motion.div variants={osMotion.container} initial="hidden" animate="visible" className="space-y-6">
        <motion.div variants={osMotion.item}>
          <OsCard hover={false} className="overflow-hidden p-0">
            <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-start">
              <div className="relative mx-auto shrink-0 sm:mx-0">
                <div
                  className="absolute -inset-1 rounded-2xl opacity-80 blur-md"
                  style={{ background: "var(--os-accent-glow)" }}
                />
                <div className="relative h-28 w-28 overflow-hidden rounded-2xl border border-[var(--os-border)]">
                  <Image
                    src="/ali-burhan.jpg"
                    alt={personalInfo.name}
                    width={112}
                    height={112}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="min-w-0 flex-1 space-y-3 text-center sm:text-left">
                <h1 className="text-2xl font-bold tracking-tight text-[var(--os-text-primary)]">
                  {personalInfo.name}
                </h1>
                <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                  <OsBadge variant="accent">{personalInfo.role.split("|")[0].trim()}</OsBadge>
                  <span className="flex items-center gap-1 text-xs text-[var(--os-text-secondary)]">
                    <MapPin className="h-3.5 w-3.5" />
                    {personalInfo.location}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-[var(--os-text-secondary)]">
                  {personalInfo.description}
                </p>
              </div>
            </div>
          </OsCard>
        </motion.div>

        <motion.div variants={osMotion.item}>
          <OsSectionTitle icon={Sparkles}>What I do</OsSectionTitle>
          <div className="grid gap-3 sm:grid-cols-2">
            {highlights.map(({ title, desc, Icon }) => (
              <OsCard key={title} className="flex gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--os-accent-muted)] text-[var(--os-accent)]">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-[var(--os-text-primary)]">{title}</h3>
                  <p className="mt-0.5 text-xs text-[var(--os-text-muted)]">{desc}</p>
                </div>
              </OsCard>
            ))}
          </div>
        </motion.div>

        <motion.div variants={osMotion.item}>
          <OsSectionTitle icon={Code2}>Tech stack</OsSectionTitle>
          <div className="space-y-4">
            {skillCategories.map((category) => (
              <div key={category.key}>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[var(--os-accent)]">
                  {category.label}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((tech) => (
                    <OsTag key={tech}>{tech}</OsTag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {certificates && certificates.length > 0 && (
          <motion.div variants={osMotion.item}>
            <OsSectionTitle icon={GraduationCap}>Certificates</OsSectionTitle>
            <div className="space-y-3">
              {certificates.map((cert, index) => (
                <OsCard key={index}>
                  <h3 className="text-sm font-semibold text-[var(--os-text-primary)]">{cert.name}</h3>
                  <p className="mt-1 text-xs text-[var(--os-text-muted)]">
                    {cert.issuer} · {cert.issueDate}
                  </p>
                  {cert.skills && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {cert.skills.slice(0, 5).map((skill) => (
                        <OsBadge key={skill} variant="accent">
                          {skill}
                        </OsBadge>
                      ))}
                    </div>
                  )}
                </OsCard>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </OsWindowBody>
  );
}
