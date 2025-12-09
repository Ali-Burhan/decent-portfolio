"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import portfolioData from "../data/portfolio.json";

interface Particle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  opacity: number;
}

const ScrambleText = ({ text, className }: { text: string; className?: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "!<>-_\\/[]{}—=+*^?#________";

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{displayText}</span>;
};

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { personalInfo, socialLinks, skills } = portfolioData;
  const animationFrameId = useRef<number | undefined>(undefined);
  const isVisible = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const particleCount = 30; // Reduced from 50 for better performance

    const getAccentColor = () => {
      const style = getComputedStyle(document.documentElement);
      const accent = style.getPropertyValue('--accent').trim();
      return accent || '#8b5cf6'; 
    };

    let accentColor = getAccentColor();

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    function animate() {
      if (!ctx || !canvas || !isVisible.current) {
        animationFrameId.current = requestAnimationFrame(animate);
        return;
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = accentColor; 
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      animationFrameId.current = requestAnimationFrame(animate);
    }

    // Intersection Observer to pause animation when not visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible.current = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(section);

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      accentColor = getAccentColor();
    };

    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      {/* Animated Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-30"
      />

      {/* Gradient Orbs - Optimized with GPU acceleration */}
      <div 
        className="absolute top-0 -left-4 w-96 h-96 rounded-full animate-blob opacity-50 mix-blend-multiply dark:mix-blend-screen"
        style={{ 
          background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
          transform: 'translate3d(0, 0, 0)' // GPU acceleration
        }}
      ></div>
      <div 
        className="absolute top-0 right-4 w-96 h-96 rounded-full animate-blob animation-delay-2000 opacity-50 mix-blend-multiply dark:mix-blend-screen"
        style={{ 
          background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
          transform: 'translate3d(0, 0, 0)' // GPU acceleration
        }}
      ></div>
      <div 
        className="absolute -bottom-8 left-20 w-96 h-96 rounded-full animate-blob animation-delay-4000 opacity-50 mix-blend-multiply dark:mix-blend-screen"
        style={{ 
          background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
          transform: 'translate3d(0, 0, 0)' // GPU acceleration
        }}
      ></div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(var(--accent)_1px,transparent_1px),linear-gradient(90deg,var(--accent)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)] opacity-[0.03]"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block mb-6"
            >
              <span className="px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent text-sm font-mono backdrop-blur-sm">
                👋 {personalInfo.availability}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-6 leading-none"
            >
              <span className="text-foreground">Hi, I'm</span>
              <br />
              <span className="bg-gradient-to-r from-accent via-accent/80 to-accent bg-clip-text text-transparent animate-gradient">
                <ScrambleText text={personalInfo.name} />
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mb-8"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground/80 mb-4">
                <ScrambleText text={personalInfo.role} className="text-foreground/80" />
              </h2>
              <p className="text-lg sm:text-xl text-foreground/60 leading-relaxed max-w-xl">
                {personalInfo.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#projects"
                className="group relative px-8 py-4 bg-accent rounded-xl text-white font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-accent/50"
              >
                <span className="relative z-10">View My Work</span>
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              
              <a
                href="#contact"
                className="group px-8 py-4 bg-foreground/5 backdrop-blur-sm border border-foreground/10 rounded-xl text-foreground font-semibold transition-all duration-300 hover:bg-foreground/10 hover:border-foreground/20 hover:scale-105"
              >
                Let's Talk
                <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-12 flex items-center gap-6"
            >
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-foreground transition-colors duration-300"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-foreground transition-colors duration-300"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-foreground transition-colors duration-300"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Content - Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full h-[600px]">
              {/* Glowing Card */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-gradient-to-br from-accent/10 to-accent/5 backdrop-blur-xl rounded-3xl border border-foreground/10 shadow-2xl overflow-hidden"
              >
                {/* Inner Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-accent/20"></div>
                
                {/* Code Snippet Mock */}
                <div className="absolute inset-8 flex flex-col gap-2 font-mono text-xs overflow-y-auto">
                  <div className="text-accent">// {personalInfo.role}</div>
                  <div className="text-foreground/60">
                    <span className="text-accent">const</span>{" "}
                    <span className="text-foreground">developer</span> = {"{"}
                  </div>
                  <div className="ml-4 text-foreground/60">
                    <span className="text-accent">name:</span>{" "}
                    <span className="text-foreground">'{personalInfo.name}'</span>,
                  </div>
                  <div className="ml-4 text-foreground/60">
                    <span className="text-accent">location:</span>{" "}
                    <span className="text-foreground">'{personalInfo.location}'</span>,
                  </div>
                  <div className="ml-4 text-foreground/60">
                    <span className="text-accent">experience:</span> {"{"}
                  </div>
                  <div className="ml-8 text-foreground/60">
                    <span className="text-accent">current:</span> <span className="text-foreground">'Software Engineer @ Hashlogics'</span>,
                  </div>
                  <div className="ml-8 text-foreground/60">
                    <span className="text-accent">previous:</span> <span className="text-foreground">'Associate SE @ Techling'</span>,
                  </div>
                  <div className="ml-8 text-foreground/60">
                    <span className="text-accent">education:</span> <span className="text-foreground">'MS CS @ UET (In Progress)'</span>
                  </div>
                  <div className="ml-4 text-foreground/60">{"},"}</div>
                  <div className="ml-4 text-foreground/60">
                    <span className="text-accent">skills:</span> {"{"}
                  </div>
                  <div className="ml-8 text-foreground/60">
                    <span className="text-accent">frontend:</span> [
                  </div>
                  <div className="ml-12 text-foreground">
                    {skills.frontend.slice(0, 4).map(s => `'${s}'`).join(", ")}
                  </div>
                  <div className="ml-8 text-foreground/60">{"],"}</div>
                  <div className="ml-8 text-foreground/60">
                    <span className="text-accent">backend:</span> [
                  </div>
                  <div className="ml-12 text-foreground">
                    {skills.backend.slice(0, 4).map(s => `'${s}'`).join(", ")}
                  </div>
                  <div className="ml-8 text-foreground/60">{"],"}</div>
                  <div className="ml-8 text-foreground/60">
                    <span className="text-accent">cloud:</span> [
                  </div>
                  <div className="ml-12 text-foreground">
                    {skills.cloudDevOps.slice(0, 3).map(s => `'${s}'`).join(", ")}
                  </div>
                  <div className="ml-8 text-foreground/60">{"],"}</div>
                  <div className="ml-8 text-foreground/60">
                    <span className="text-accent">ai:</span> [
                  </div>
                  <div className="ml-12 text-foreground">
                    {skills.aiMl.slice(0, 3).map(s => `'${s}'`).join(", ")}
                  </div>
                  <div className="ml-8 text-foreground/60">{"]"}</div>
                  <div className="ml-4 text-foreground/60">{"},"}</div>
                  <div className="ml-4 text-foreground/60">
                    <span className="text-accent">achievements:</span> {"{"}
                  </div>
                  <div className="ml-8 text-foreground/60">
                    <span className="text-accent">deployed:</span> <span className="text-foreground">'1000+ sites in 60+ countries'</span>,
                  </div>
                  <div className="ml-8 text-foreground/60">
                    <span className="text-accent">automated:</span> <span className="text-foreground">'500+ assessments/month'</span>
                  </div>
                  <div className="ml-4 text-foreground/60">{"}"}</div>
                  <div className="text-foreground/60">{"}"}</div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute bottom-8 right-8 w-20 h-20 bg-gradient-to-br from-accent to-accent/50 rounded-2xl shadow-lg shadow-accent/50"
                ></motion.div>

                <motion.div
                  animate={{
                    y: [0, 15, 0],
                    rotate: [0, -5, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="absolute top-12 right-12 w-16 h-16 bg-gradient-to-br from-accent/80 to-accent/40 rounded-xl shadow-lg shadow-accent/50"
                ></motion.div>
              </motion.div>

              {/* Orbital Rings - Optimized with GPU acceleration */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-accent/20 rounded-full"
                style={{ transform: "scale(1.1) translateZ(0)" }}
              ></motion.div>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-accent/20 rounded-full"
                style={{ transform: "scale(1.2) translateZ(0)" }}
              ></motion.div>
            </div>
          </motion.div>
        </div>

        {/* Tech Stack Pills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-20 flex flex-wrap justify-center gap-3"
        >
          {[...skills.frontend, ...skills.backend].slice(0, 8).map(
            (tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.4 }}
                className="px-4 py-2 bg-foreground/5 backdrop-blur-sm border border-foreground/10 rounded-full text-foreground/60 text-sm hover:bg-foreground/10 hover:border-accent/30 hover:text-accent transition-all duration-300 cursor-default"
              >
                {tech}
              </motion.span>
            )
          )}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-foreground/50"
        >
          <span className="text-xs font-mono">Scroll</span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes blob {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(20px, -30px, 0) scale(1.05);
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-blob {
          animation: blob 7s ease-in-out infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}