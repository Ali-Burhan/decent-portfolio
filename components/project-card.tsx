"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

interface Project {
  name: string;
  description: string;
  technologies: string[];
  achievements?: string[];
  type?: string;
  liveUrl?: string;
  repoUrl?: string;
}

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Magnetic hover effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const offsetX = (event.clientX - centerX) * 0.15;
    const offsetY = (event.clientY - centerY) * 0.15;

    x.set(offsetX);
    y.set(offsetY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      style={{ x: xSpring, y: ySpring }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsFlipped(!isFlipped)}
      className="group relative h-[400px] cursor-pointer perspective-1000"
    >
      {/* Animated gradient border */}
      <motion.div
        className="absolute -inset-[1px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "linear-gradient(60deg, var(--accent), transparent, var(--accent))",
          backgroundSize: "300% 300%",
        }}
        animate={{
          backgroundPosition: isHovered ? ["0% 50%", "100% 50%", "0% 50%"] : "0% 50%",
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Card container with flip */}
      <motion.div
        className="relative h-full w-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of card */}
        <div
          className="absolute inset-0 rounded-3xl bg-gradient-to-br from-foreground/[0.03] via-background/95 to-foreground/[0.05] backdrop-blur-2xl border border-foreground/10 p-7 overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Particle effects */}
          <AnimatePresence>
            {isHovered && (
              <>
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-accent/40"
                    initial={{
                      x: Math.random() * 100 + "%",
                      y: "100%",
                      opacity: 0,
                    }}
                    animate={{
                      y: "-20%",
                      opacity: [0, 1, 0],
                    }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>

          {/* Radial gradient overlay */}
          <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--accent)_0,_transparent_60%)] opacity-40" />
          </div>

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col">
            {/* Header */}
            <div className="mb-4 flex items-start justify-between gap-4">
              <div className="space-y-2">
                {project.type && (
                  <motion.span
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                    className="inline-flex items-center rounded-full bg-accent/10 border border-accent/20 px-3 py-1 text-xs font-mono uppercase tracking-[0.15em] text-accent"
                  >
                    {project.type}
                  </motion.span>
                )}
                <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                  {project.name}
                </h3>
              </div>

              <div className="flex items-center gap-2 text-foreground/60">
                {project.repoUrl && (
                  <motion.a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-full hover:text-accent hover:bg-accent/10 transition-colors"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                  </motion.a>
                )}
                {project.liveUrl && (
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, rotate: -5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-full hover:text-accent hover:bg-accent/10 transition-colors"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                    </svg>
                  </motion.a>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="mb-4 text-sm text-foreground/70 leading-relaxed line-clamp-3">
              {project.description}
            </p>

            {/* Technologies */}
            <div className="mt-auto">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-foreground/40 mb-3">
                Technologies
              </p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, 6).map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + i * 0.05 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="rounded-full border border-foreground/10 bg-foreground/5 px-3 py-1 text-[11px] font-mono text-foreground/70 hover:border-accent/50 hover:text-accent transition-colors"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Click to flip hint */}
            <motion.div
              className="absolute bottom-4 right-4 flex items-center gap-2 text-[10px] font-mono text-accent/60"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span>Click to flip</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </motion.div>
          </div>
        </div>

        {/* Back of card */}
        <div
          className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/10 via-background/95 to-accent/5 backdrop-blur-2xl border border-accent/20 p-7 overflow-auto"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="relative z-10 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold text-accent">Key Achievements</h4>
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(false);
                }}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>

            {project.achievements && project.achievements.length > 0 ? (
              <ul className="space-y-3 text-sm text-foreground/80">
                {project.achievements.map((achievement, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-1 text-accent text-xs">✓</span>
                    <span className="leading-relaxed">{achievement}</span>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-foreground/50 text-sm">No detailed achievements available</p>
              </div>
            )}

            {/* All technologies on back */}
            <div className="mt-auto pt-4 border-t border-accent/10">
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent/60 mb-2">
                Full Tech Stack
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-accent/10 border border-accent/20 px-2 py-0.5 text-[10px] font-mono text-accent"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
