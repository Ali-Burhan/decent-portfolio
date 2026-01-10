"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, Calendar, Users, Award } from "lucide-react";

export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image?: string;
  images?: string[];
  technologies: string[];
  role: string;
  duration: string;
  team?: string;
  achievements: string[];
  liveUrl?: string;
  githubUrl?: string;
  category: string;
}

interface CaseStudyModalProps {
  caseStudy: CaseStudy | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CaseStudyModal({ caseStudy, isOpen, onClose }: CaseStudyModalProps) {
  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }
    
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!caseStudy) return null;

  const allImages = caseStudy.images || (caseStudy.image ? [caseStudy.image] : []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            aria-hidden="true"
          />

          {/* Modal */}
          <div
            className="fixed inset-0 z-[101] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="relative w-full max-w-4xl bg-background rounded-2xl shadow-2xl border border-foreground/10 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-foreground/10 hover:bg-foreground/10 transition-colors group"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-foreground/70 group-hover:text-foreground transition-colors" />
                </button>

                {/* Content */}
                <div className="max-h-[90vh] overflow-y-auto">
                  {/* Header Image */}
                  {allImages.length > 0 && (
                    <div className="relative h-64 md:h-80 bg-gradient-to-br from-accent/10 to-accent/5 overflow-hidden">
                      <img
                        src={allImages[0]}
                        alt={caseStudy.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-accent/90 backdrop-blur-sm text-white text-sm font-semibold rounded-full">
                          {caseStudy.category}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Content Section */}
                  <div className="p-6 md:p-8 space-y-8">
                    {/* Title & Description */}
                    <div>
                      <h2 id="modal-title" className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                        {caseStudy.title}
                      </h2>
                      <p className="text-lg text-foreground/70 leading-relaxed">
                        {caseStudy.longDescription || caseStudy.description}
                      </p>
                    </div>

                    {/* Meta Information */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-3 p-4 rounded-xl bg-foreground/5 border border-foreground/10">
                        <Calendar className="w-5 h-5 text-accent" />
                        <div>
                          <p className="text-xs text-foreground/60 font-mono uppercase">Duration</p>
                          <p className="font-semibold text-foreground">{caseStudy.duration}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-4 rounded-xl bg-foreground/5 border border-foreground/10">
                        <Award className="w-5 h-5 text-accent" />
                        <div>
                          <p className="text-xs text-foreground/60 font-mono uppercase">Role</p>
                          <p className="font-semibold text-foreground">{caseStudy.role}</p>
                        </div>
                      </div>
                      
                      {caseStudy.team && (
                        <div className="flex items-center gap-3 p-4 rounded-xl bg-foreground/5 border border-foreground/10">
                          <Users className="w-5 h-5 text-accent" />
                          <div>
                            <p className="text-xs text-foreground/60 font-mono uppercase">Team</p>
                            <p className="font-semibold text-foreground">{caseStudy.team}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Technologies */}
                    <div>
                      <h3 className="text-sm font-mono uppercase tracking-wider text-foreground/60 mb-3">
                        Technologies Used
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {caseStudy.technologies.map((tech, index) => (
                          <motion.span
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                            className="px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-lg text-accent text-sm font-mono"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div>
                      <h3 className="text-sm font-mono uppercase tracking-wider text-foreground/60 mb-4">
                        Key Achievements
                      </h3>
                      <ul className="space-y-3">
                        {caseStudy.achievements.map((achievement, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-3 text-foreground/80"
                          >
                            <span className="mt-1.5 text-accent">▹</span>
                            <span className="leading-relaxed">{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Additional Images */}
                    {allImages.length > 1 && (
                      <div>
                        <h3 className="text-sm font-mono uppercase tracking-wider text-foreground/60 mb-4">
                          Project Gallery
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          {allImages.slice(1).map((image, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1 }}
                              className="relative aspect-video rounded-lg overflow-hidden border border-foreground/10 group cursor-pointer"
                            >
                              <img
                                src={image}
                                alt={`${caseStudy.title} screenshot ${index + 2}`}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                              />
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 pt-4 border-t border-foreground/10">
                      {caseStudy.liveUrl && (
                        <a
                          href={caseStudy.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-accent/50 transition-all"
                        >
                          <ExternalLink className="w-4 h-4" />
                          View Live Project
                        </a>
                      )}
                      
                      {caseStudy.githubUrl && (
                        <a
                          href={caseStudy.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-6 py-3 bg-foreground/5 border border-foreground/10 text-foreground rounded-lg font-semibold hover:bg-foreground/10 transition-all"
                        >
                          <Github className="w-4 h-4" />
                          View Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
