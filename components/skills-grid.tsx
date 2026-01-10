"use client";

import React from "react";
import { motion } from "framer-motion";

export interface Skill {
  name: string;
  category: "Frontend" | "Backend" | "Cloud & DevOps" | "AI & ML" | "Tools";
  proficiency: "beginner" | "intermediate" | "expert";
  icon?: string;
}

interface SkillsGridProps {
  skills: Skill[];
  className?: string;
}

const proficiencyConfig = {
  beginner: {
    percentage: 40,
    label: "Beginner",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
  },
  intermediate: {
    percentage: 70,
    label: "Intermediate",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
  },
  expert: {
    percentage: 95,
    label: "Expert",
    color: "from-accent to-accent/80",
    bgColor: "bg-accent/10",
    borderColor: "border-accent/30",
  },
};

export function SkillsGrid({ skills, className = "" }: SkillsGridProps) {
  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className={`space-y-12 ${className}`}>
      {Object.entries(groupedSkills).map(([category, categorySkills], categoryIndex) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: categoryIndex * 0.1 }}
          className="space-y-6"
        >
          {/* Category Header */}
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-bold text-foreground">{category}</h3>
            <div className="h-px flex-1 bg-foreground/10" />
            <span className="text-sm text-foreground/60 font-mono">
              {categorySkills.length} {categorySkills.length === 1 ? "skill" : "skills"}
            </span>
          </div>

          {/* Skills Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categorySkills.map((skill, skillIndex) => {
              const config = proficiencyConfig[skill.proficiency];
              
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                  whileHover={{ y: -4 }}
                  className={`group relative rounded-xl border ${config.borderColor} ${config.bgColor} p-4 transition-all duration-300 hover:shadow-lg`}
                >
                  {/* Skill Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                        {skill.icon && <span className="text-lg">{skill.icon}</span>}
                        {skill.name}
                      </h4>
                      <span className="text-xs text-foreground/60 font-mono">
                        {config.label}
                      </span>
                    </div>
                    
                    {/* Proficiency Badge */}
                    <div
                      className="text-xs font-bold px-2 py-1 rounded-full"
                      style={{
                        background: `linear-gradient(135deg, var(--accent) 0%, var(--accent) 100%)`,
                        opacity: 0.15,
                      }}
                      aria-label={`${config.percentage}% proficiency`}
                    >
                      {config.percentage}%
                    </div>
                  </div>

                  {/* Proficiency Bar */}
                  <div className="relative">
                    {/* Background bar */}
                    <div className="h-2 bg-foreground/5 rounded-full overflow-hidden">
                      {/* Animated fill */}
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${config.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{
                          delay: categoryIndex * 0.1 + skillIndex * 0.05 + 0.2,
                          duration: 1,
                          ease: "easeOut",
                        }}
                        className={`h-full bg-gradient-to-r ${config.color} rounded-full relative`}
                      >
                        {/* Shimmer effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          animate={{
                            x: ["-100%", "100%"],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 3,
                          }}
                        />
                      </motion.div>
                    </div>

                    {/* Percentage tooltip on hover */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      className="absolute -top-8 right-0 bg-foreground text-background text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    >
                      {config.percentage}%
                    </motion.div>
                  </div>

                  {/* Hover glow effect */}
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at center, ${config.color.split(" ")[1]} 0%, transparent 70%)`,
                      filter: "blur(20px)",
                    }}
                  />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      ))}

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex flex-wrap items-center justify-center gap-6 pt-8 border-t border-foreground/10"
      >
        <span className="text-sm text-foreground/60 font-mono">Proficiency Levels:</span>
        {Object.entries(proficiencyConfig).map(([level, config]) => (
          <div key={level} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${config.color}`} />
            <span className="text-sm text-foreground/80">{config.label}</span>
            <span className="text-xs text-foreground/50">({config.percentage}%)</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
