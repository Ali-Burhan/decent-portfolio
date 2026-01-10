"use client";
import React from "react";
import portfolioData from "@/data/portfolio.json";

export function ExperienceContent() {
  const { experience, education } = portfolioData;

  return (
    <div className="p-6 space-y-6">
      {/* Work Experience */}
      <div className="space-y-4">
        <h2 className="text-sm font-mono text-[var(--os-cyan)] uppercase tracking-wider">
          {"<WorkExperience />"}
        </h2>

        <div className="space-y-4">
          {experience.map((job, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-foreground/5 border border-foreground/10"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                <div>
                  <h3 className="font-semibold text-foreground">{job.position}</h3>
                  <p className="text-[var(--os-cyan)] text-sm">{job.company}</p>
                </div>
                <div className="text-xs text-foreground/60 font-mono">
                  <div>{job.duration}</div>
                  <div>{job.location}</div>
                </div>
              </div>

              <div className="space-y-2">
                {job.projects.map((project, pIndex) => (
                  <div key={pIndex} className="pl-3 border-l-2 border-[var(--os-cyan)]/30">
                    <h4 className="text-sm font-medium text-foreground/90">{project.name}</h4>
                    <ul className="mt-1 space-y-1">
                      {project.achievements.slice(0, 2).map((achievement, aIndex) => (
                        <li key={aIndex} className="text-xs text-foreground/60 flex items-start gap-2">
                          <span className="text-[var(--os-cyan)]">▹</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="space-y-4">
        <h2 className="text-sm font-mono text-[var(--os-cyan)] uppercase tracking-wider">
          {"<Education />"}
        </h2>

        <div className="space-y-3">
          {education.map((edu, index) => (
            <div
              key={index}
              className="p-3 rounded-lg bg-foreground/5 border border-foreground/10 flex items-start gap-3"
            >
              <span className="text-xl">🎓</span>
              <div>
                <h3 className="font-medium text-foreground text-sm">{edu.degree}</h3>
                <p className="text-xs text-foreground/60">{edu.institution}</p>
                <p className="text-xs text-[var(--os-cyan)] font-mono mt-1">
                  {edu.duration} • {edu.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
