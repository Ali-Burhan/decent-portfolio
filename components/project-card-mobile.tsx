"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ExternalLink, Github } from "lucide-react";

interface Project {
  name: string;
  description: string;
  technologies: string[];
  achievements?: string[];
  type?: string;
  liveUrl?: string;
  repoUrl?: string;
}

interface ProjectCardMobileProps {
  project: Project;
  index?: number;
}

export function ProjectCardMobile({ project, index = 0 }: ProjectCardMobileProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="rounded-2xl border border-foreground/10 bg-gradient-to-br from-foreground/5 to-background overflow-hidden shadow-lg"
    >
      {/* Always Visible Header */}
      <div className="p-5 space-y-4">
        {/* Type Badge & Title */}
        <div className="space-y-2">
          {project.type && (
            <span className="inline-block px-3 py-1 text-xs font-mono uppercase tracking-wider bg-accent/10 text-accent rounded-full border border-accent/20">
              {project.type}
            </span>
          )}
          <h3 className="text-xl font-bold text-foreground">
            {project.name}
          </h3>
        </div>

        {/* Description */}
        <p className="text-sm text-foreground/70 leading-relaxed">
          {project.description}
        </p>

        {/* Technologies - Always visible (first 4) */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-xs font-mono bg-foreground/5 border border-foreground/10 rounded-md text-foreground/70"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2.5 py-1 text-xs font-mono text-foreground/50">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>

        {/* Action Buttons - Thumb Zone Optimized */}
        <div className="flex gap-3 pt-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 min-h-[44px] px-4 py-3 bg-accent text-white rounded-lg font-semibold active:scale-95 transition-transform"
            >
              <ExternalLink className="w-4 h-4" />
              <span>View Live</span>
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 min-h-[44px] px-4 py-3 bg-foreground/10 border border-foreground/20 rounded-lg font-semibold active:scale-95 transition-transform"
            >
              <Github className="w-4 h-4" />
              <span className="sm:inline hidden">Code</span>
            </a>
          )}
        </div>

        {/* Expand Button - Only if has achievements */}
        {project.achievements && project.achievements.length > 0 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-center gap-2 min-h-[44px] px-4 py-3 bg-foreground/5 border border-foreground/10 rounded-lg font-medium text-foreground/80 active:scale-95 transition-all"
            aria-expanded={isExpanded}
            aria-label={isExpanded ? "Hide achievements" : "View achievements"}
          >
            <span>{isExpanded ? "Hide" : "View"} Achievements</span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </button>
        )}
      </div>

      {/* Expandable Achievements Section */}
      <AnimatePresence>
        {isExpanded && project.achievements && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-2 border-t border-foreground/10 bg-foreground/[0.02]">
              <h4 className="text-sm font-semibold text-accent mb-3">Key Achievements</h4>
              <ul className="space-y-2.5">
                {project.achievements.map((achievement, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-2 text-sm text-foreground/80"
                  >
                    <span className="mt-0.5 text-accent flex-shrink-0">✓</span>
                    <span className="leading-relaxed">{achievement}</span>
                  </motion.li>
                ))}
              </ul>

              {/* All Technologies */}
              {project.technologies.length > 4 && (
                <div className="mt-4 pt-4 border-t border-foreground/10">
                  <p className="text-xs font-mono uppercase tracking-wider text-foreground/50 mb-2">
                    Full Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-xs font-mono bg-accent/10 border border-accent/20 text-accent rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
