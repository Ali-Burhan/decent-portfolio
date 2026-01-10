"use client";
import React from "react";
import portfolioData from "@/data/portfolio.json";

export function ProjectsContent() {
  const { experience, freelanceProjects } = portfolioData;

  const allProjects = [
    ...experience.flatMap((exp) =>
      exp.projects.map((p) => ({ ...p, company: exp.company, type: "Work" }))
    ),
    ...freelanceProjects.map((p) => ({ ...p, company: "Freelance", type: "Freelance" })),
  ];

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-sm font-mono text-[var(--os-cyan)] uppercase tracking-wider">
        {"<Projects />"}
      </h2>

      <div className="grid gap-4">
        {allProjects.map((project, index) => (
          <div
            key={project.name + index}
            className="p-4 rounded-lg bg-foreground/5 border border-foreground/10 hover:border-[var(--os-cyan)]/30 transition-colors"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <h3 className="font-semibold text-foreground">{project.name}</h3>
                <p className="text-xs text-foreground/60">
                  {project.company} • {project.type}
                </p>
              </div>
              <span
                className={`px-2 py-0.5 text-xs rounded ${
                  project.type === "Work"
                    ? "bg-blue-500/20 text-blue-400"
                    : "bg-green-500/20 text-green-400"
                }`}
              >
                {project.type}
              </span>
            </div>

            <p className="text-sm text-foreground/70 mb-3 line-clamp-2">
              {project.description}
            </p>

            {project.technologies && (
              <div className="flex flex-wrap gap-1">
                {project.technologies.slice(0, 6).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-xs font-mono bg-[var(--os-cyan)]/10 text-[var(--os-cyan)] rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
