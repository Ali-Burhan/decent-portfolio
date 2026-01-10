"use client";
import React from "react";
import Image from "next/image";
import portfolioData from "@/data/portfolio.json";

export function AboutContent() {
  const { personalInfo, skills } = portfolioData;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start gap-6">
        <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-[var(--os-cyan)]/30 flex-shrink-0">
          <Image
            src="/ali pic.png"
            alt={personalInfo.name}
            width={96}
            height={96}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">{personalInfo.name}</h1>
          <p className="text-[var(--os-cyan)] font-mono text-sm">
            {personalInfo.role.split("|")[0].trim()}
          </p>
          <p className="text-foreground/60 text-sm flex items-center gap-2">
            <span>📍</span> {personalInfo.location}
          </p>
        </div>
      </div>

      {/* Bio */}
      <div className="space-y-3">
        <h2 className="text-sm font-mono text-[var(--os-cyan)] uppercase tracking-wider">
          {"<About />"}
        </h2>
        <p className="text-foreground/80 leading-relaxed">
          {personalInfo.description}
        </p>
      </div>

      {/* What I Do */}
      <div className="space-y-3">
        <h2 className="text-sm font-mono text-[var(--os-cyan)] uppercase tracking-wider">
          {"<WhatIDo />"}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { title: "Full Stack Development", desc: "Next.js, React, Python, Node.js", icon: "💻" },
            { title: "Cloud Architecture", desc: "AWS, Terraform, Serverless", icon: "☁️" },
            { title: "AI Integration", desc: "LangChain, OpenAI, LLMs", icon: "🤖" },
            { title: "DevOps", desc: "Docker, Jenkins, GitHub Actions", icon: "🔧" },
          ].map((item) => (
            <div
              key={item.title}
              className="p-3 rounded-lg bg-foreground/5 border border-foreground/10 hover:border-[var(--os-cyan)]/30 transition-colors"
            >
              <div className="flex items-center gap-2 mb-1">
                <span>{item.icon}</span>
                <span className="font-medium text-foreground text-sm">{item.title}</span>
              </div>
              <p className="text-xs text-foreground/60">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="space-y-3">
        <h2 className="text-sm font-mono text-[var(--os-cyan)] uppercase tracking-wider">
          {"<TechStack />"}
        </h2>
        <div className="flex flex-wrap gap-2">
          {[...skills.frontend.slice(0, 5), ...skills.backend.slice(0, 4), ...skills.cloudDevOps.slice(0, 3)].map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs font-mono bg-[var(--os-cyan)]/10 text-[var(--os-cyan)] border border-[var(--os-cyan)]/20 rounded"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
