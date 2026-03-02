"use client";
import React from "react";
import Image from "next/image";
import portfolioData from "@/data/portfolio.json";

export function AboutContent() {
  const { personalInfo, skills, certificates } = portfolioData;

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
            {personalInfo.role}
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
            { title: "DevOps & Testing", desc: "Docker, Jenkins, CI/CD", icon: "🔧" },
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

      {/* Tech Stack - Organized by Category */}
      <div className="space-y-4">
        <h2 className="text-sm font-mono text-[var(--os-cyan)] uppercase tracking-wider">
          {"<TechStack />"}
        </h2>

        {/* Frontend */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-foreground/70 uppercase">Frontend</h3>
          <div className="flex flex-wrap gap-2">
            {skills.frontend.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs font-mono bg-blue-500/10 text-blue-500 border border-blue-500/20 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Backend */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-foreground/70 uppercase">Backend</h3>
          <div className="flex flex-wrap gap-2">
            {skills.backend.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs font-mono bg-green-500/10 text-green-500 border border-green-500/20 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Databases */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-foreground/70 uppercase">Databases</h3>
          <div className="flex flex-wrap gap-2">
            {skills.database.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs font-mono bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Cloud & DevOps */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-foreground/70 uppercase">Cloud & DevOps</h3>
          <div className="flex flex-wrap gap-2">
            {skills.cloudDevOps.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs font-mono bg-orange-500/10 text-orange-500 border border-orange-500/20 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* AI/ML */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-foreground/70 uppercase">AI/ML</h3>
          <div className="flex flex-wrap gap-2">
            {skills.aiMl.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs font-mono bg-purple-500/10 text-purple-500 border border-purple-500/20 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Testing */}
        {skills.testing && (
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-foreground/70 uppercase">Testing</h3>
            <div className="flex flex-wrap gap-2">
              {skills.testing.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs font-mono bg-pink-500/10 text-pink-500 border border-pink-500/20 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Methodologies */}
        {skills.methodologies && (
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-foreground/70 uppercase">Methodologies</h3>
            <div className="flex flex-wrap gap-2">
              {skills.methodologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs font-mono bg-cyan-500/10 text-cyan-500 border border-cyan-500/20 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Certificates */}
      {certificates && certificates.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-mono text-[var(--os-cyan)] uppercase tracking-wider">
            {"<Certificates />"}
          </h2>
          <div className="space-y-2">
            {certificates.map((cert, index) => (
              <div
                key={index}
                className="p-3 rounded-lg bg-foreground/5 border border-foreground/10 hover:border-[var(--os-cyan)]/30 transition-colors group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">🎓</span>
                      <h3 className="font-semibold text-foreground text-sm group-hover:text-[var(--os-cyan)] transition-colors">
                        {cert.name}
                      </h3>
                    </div>
                    <p className="text-xs text-foreground/60">{cert.issuer} • {cert.issueDate}</p>
                    {cert.skills && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {cert.skills.slice(0, 4).map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 text-[10px] font-medium bg-[var(--os-cyan)]/10 text-[var(--os-cyan)] border border-[var(--os-cyan)]/20 rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
