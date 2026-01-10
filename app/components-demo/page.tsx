"use client";

import React, { useState } from "react";
import { SkillsGrid, type Skill } from "@/components/skills-grid";
import { TestimonialsCarousel, type Testimonial } from "@/components/testimonials-carousel";
import { CaseStudyModal, type CaseStudy } from "@/components/case-study-modal";
import { DownloadResumeButton } from "@/components/download-resume-button";
import { LatestBlogPosts } from "@/components/latest-blog-posts";

// Sample data
const sampleSkills: Skill[] = [
  { name: "Next.js", category: "Frontend", proficiency: "expert", icon: "⚛️" },
  { name: "React", category: "Frontend", proficiency: "expert", icon: "⚛️" },
  { name: "TypeScript", category: "Frontend", proficiency: "expert", icon: "📘" },
  { name: "Python", category: "Backend", proficiency: "expert", icon: "🐍" },
  { name: "Node.js", category: "Backend", proficiency: "intermediate", icon: "🟢" },
  { name: "AWS Lambda", category: "Cloud & DevOps", proficiency: "expert", icon: "☁️" },
  { name: "Docker", category: "Cloud & DevOps", proficiency: "intermediate", icon: "🐳" },
  { name: "LangChain", category: "AI & ML", proficiency: "expert", icon: "🤖" },
  { name: "OpenAI API", category: "AI & ML", proficiency: "expert", icon: "🧠" },
];

const sampleTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "John Doe",
    role: "CTO",
    company: "Tech Corp",
    content: "Ali delivered an exceptional AI-powered platform that transformed our business operations. His expertise in Next.js and AWS is outstanding!",
    rating: 5,
    date: "December 2025",
  },
  {
    id: "2",
    name: "Jane Smith",
    role: "Product Manager",
    company: "StartupXYZ",
    content: "Outstanding work on our microservices architecture. The platform now serves 1000+ sites with zero downtime. Highly recommend!",
    rating: 5,
    date: "November 2025",
  },
  {
    id: "3",
    name: "Mike Johnson",
    role: "CEO",
    company: "EduTech Solutions",
    content: "The LangChain integration reduced our teacher workload by 70%. Ali's technical skills and communication are top-notch.",
    rating: 5,
    date: "October 2025",
  },
];

const sampleCaseStudy: CaseStudy = {
  id: "1",
  title: "AI-Powered Educational Platform",
  description: "Built a comprehensive AI platform serving 1000+ educational sites",
  longDescription: "Developed a scalable AI-powered educational platform using Next.js, Python, and LangChain. The platform automates assessment generation, provides personalized learning paths, and serves over 1000 sites across 60+ countries.",
  technologies: ["Next.js", "Python", "LangChain", "AWS Lambda", "PostgreSQL", "Redis"],
  role: "Lead Full Stack Developer",
  duration: "6 months",
  team: "4 developers",
  achievements: [
    "Reduced teacher workload by 70% through AI automation",
    "Automated 500+ assessments monthly using LangChain",
    "Deployed across 60+ countries with 99.9% uptime",
    "Improved student engagement by 45%",
  ],
  category: "AI & Education",
};

export default function ComponentsDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-accent/10 to-accent/5 border-b border-foreground/10">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Portfolio Components Demo
          </h1>
          <p className="text-lg text-foreground/70">
            Interactive showcase of all 5 custom components
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-20">
        
        {/* 1. Skills Grid */}
        <section>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">1. Skills Grid</h2>
            <p className="text-foreground/60">Categorized skills with animated proficiency bars</p>
          </div>
          <SkillsGrid skills={sampleSkills} />
        </section>

        {/* 2. Testimonials Carousel */}
        <section className="bg-foreground/5 -mx-6 px-6 py-12 rounded-3xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">2. Testimonials Carousel</h2>
            <p className="text-foreground/60">Auto-playing carousel with smooth animations</p>
          </div>
          <TestimonialsCarousel testimonials={sampleTestimonials} />
        </section>

        {/* 3. Case Study Modal */}
        <section>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">3. Case Study Modal</h2>
            <p className="text-foreground/60">Full-screen overlay with project details</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-accent/50 transition-all"
            >
              Open Case Study Modal
            </button>
            <div className="flex items-center gap-2 text-sm text-foreground/60">
              <span>💡 Tip: Press ESC to close</span>
            </div>
          </div>
          <CaseStudyModal
            caseStudy={sampleCaseStudy}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </section>

        {/* 4. Download Resume Button */}
        <section className="bg-foreground/5 -mx-6 px-6 py-12 rounded-3xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">4. Download Resume Button</h2>
            <p className="text-foreground/60">Multiple variants with loading states</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <DownloadResumeButton variant="primary" size="md" />
            <DownloadResumeButton variant="secondary" size="md" />
            <DownloadResumeButton variant="outline" size="md" />
          </div>
          <div className="mt-6 flex flex-wrap gap-4">
            <DownloadResumeButton variant="primary" size="sm" />
            <DownloadResumeButton variant="primary" size="lg" />
          </div>
        </section>

        {/* 5. Latest Blog Posts */}
        <section>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">5. Latest Blog Posts</h2>
            <p className="text-foreground/60">CMS integration with loading states (using mock data)</p>
          </div>
          <LatestBlogPosts limit={3} />
        </section>

      </div>
    </div>
  );
}
