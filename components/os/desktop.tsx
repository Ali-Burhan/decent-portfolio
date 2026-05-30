"use client";
import React, { useState, useCallback, useEffect, useLayoutEffect, lazy, Suspense } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Taskbar } from "./taskbar";
import { DesktopIcon } from "./desktop-icon";
import { Window } from "./window";
import { RecruiterHero } from "./recruiter-hero";
import portfolioData from "@/data/portfolio.json";
import { RESUME_FILENAME, RESUME_PATH, PROFILE_IMAGE } from "@/lib/site";
import { OS_Z, nextWindowZIndex } from "@/lib/os-layers";
import { FeaturedProjectsRow } from "@/components/featured-projects-row";

// Lazy load window content for better performance
const AboutContent = lazy(() => import("./windows/about-content").then(m => ({ default: m.AboutContent })));
const ProjectsContent = lazy(() => import("./windows/projects-content").then(m => ({ default: m.ProjectsContent })));
const ExperienceContent = lazy(() => import("./windows/experience-content").then(m => ({ default: m.ExperienceContent })));
const ContactContent = lazy(() => import("./windows/contact-content").then(m => ({ default: m.ContactContent })));

export type WindowId = "about" | "projects" | "experience" | "contact";

interface WindowState {
  id: WindowId;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

const DESKTOP_ICONS: { id: WindowId; label: string; icon: string }[] = [
  { id: "about", label: "About Me", icon: "user" },
  { id: "projects", label: "Projects", icon: "folder" },
  { id: "experience", label: "Experience", icon: "briefcase" },
  { id: "contact", label: "Contact", icon: "mail" },
];

const QUICK_LINKS = [
  { id: "github", label: "GitHub", icon: "github", url: portfolioData.socialLinks.github },
  { id: "linkedin", label: "LinkedIn", icon: "linkedin", url: portfolioData.socialLinks.linkedin },
  { id: "resume", label: "Resume", icon: "resume", url: RESUME_PATH, download: true },
];

export function Desktop() {
  const { personalInfo, socialLinks, highlights } = portfolioData;
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindow, setActiveWindow] = useState<WindowId | null>(null);
  const [highestZ, setHighestZ] = useState(10);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const [brightness, setBrightness] = useState(100);
  const [nightLight, setNightLight] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [reduceMotion, setReduceMotion] = useState(false);
  const [heroCollapsed, setHeroCollapsed] = useState(false);
  const heroRef = React.useRef<HTMLElement>(null);
  const [navbarHeight, setNavbarHeight] = useState(96);

  const hideNavbar = windows.some((w) => !w.isMinimized && w.isMaximized);

  const measureNavbar = useCallback(() => {
    const el = heroRef.current;
    if (!el) return;
    const height = el.offsetHeight;
    if (height < 48) return;
    setNavbarHeight(Math.min(280, Math.max(72, height + 8)));
  }, []);

  useLayoutEffect(() => {
    if (hideNavbar) return;
    measureNavbar();
    const raf = requestAnimationFrame(measureNavbar);
    return () => cancelAnimationFrame(raf);
  }, [heroCollapsed, hideNavbar, measureNavbar]);

  useEffect(() => {
    if (hideNavbar) return;
    const el = heroRef.current;
    if (!el) return;
    const observer = new ResizeObserver(measureNavbar);
    observer.observe(el);
    window.addEventListener("resize", measureNavbar);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measureNavbar);
    };
  }, [heroCollapsed, hideNavbar, measureNavbar]);

  // Check for mobile and prefers-reduced-motion
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mediaQuery.addEventListener("change", handleMotionChange);

    return () => {
      window.removeEventListener("resize", checkMobile);
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  // Update time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const openWindow = useCallback((id: WindowId) => {
    const maximizedOnOpen = typeof window !== "undefined" && window.innerWidth < 768;
    const nextZ = nextWindowZIndex(highestZ);
    setWindows((prev) => {
      const exists = prev.find((w) => w.id === id);
      if (exists) {
        return prev.map((w) =>
          w.id === id ? { ...w, isMinimized: false, zIndex: nextZ } : w
        );
      }
      return [
        ...prev,
        { id, isMinimized: false, isMaximized: maximizedOnOpen, zIndex: nextZ },
      ];
    });
    setHighestZ(nextZ);
    setActiveWindow(id);
    setShowStartMenu(false);
  }, [highestZ]);

  const toggleMaximizeWindow = useCallback(
    (id: WindowId) => {
      setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w))
      );
      setActiveWindow(id);
    },
    []
  );

  const closeWindow = useCallback((id: WindowId) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    setActiveWindow((prev) => (prev === id ? null : prev));
  }, []);

  const minimizeWindow = useCallback((id: WindowId) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    );
    setActiveWindow((prev) => (prev === id ? null : prev));
  }, []);

  const focusWindow = useCallback((id: WindowId) => {
    const nextZ = nextWindowZIndex(highestZ);
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, zIndex: nextZ } : w))
    );
    setHighestZ(nextZ);
    setActiveWindow(id);
  }, [highestZ]);

  const handleTaskbarWindowClick = useCallback((id: WindowId) => {
    const window = windows.find((w) => w.id === id);
    if (window?.isMinimized) {
      const nextZ = nextWindowZIndex(highestZ);
      setWindows((prev) =>
        prev.map((w) =>
          w.id === id ? { ...w, isMinimized: false, zIndex: nextZ } : w
        )
      );
      setHighestZ(nextZ);
      setActiveWindow(id);
    } else if (activeWindow === id) {
      minimizeWindow(id);
    } else {
      focusWindow(id);
    }
  }, [windows, activeWindow, highestZ, minimizeWindow, focusWindow]);

  const showDesktop = useCallback(() => {
    setWindows((prev) => prev.map((w) => ({ ...w, isMinimized: true })));
    setActiveWindow(null);
    setShowStartMenu(false);
  }, []);

  const getWindowContent = (id: string) => {
    const content = (() => {
      switch (id) {
        case "about": return <AboutContent />;
        case "projects": return <ProjectsContent />;
        case "experience": return <ExperienceContent />;
        case "contact": return <ContactContent />;
        default: return <div className="p-4">Content not found</div>;
      }
    })();

    return (
      <Suspense fallback={<WindowContentLoading />}>
        {content}
      </Suspense>
    );
  };

  const getWindowTitle = (id: string) => {
    const titles: Record<string, string> = {
      about: "About Me",
      projects: "Projects",
      experience: "Experience",
      contact: "Contact",
    };
    return titles[id] || id;
  };

  const openExternalLink = (url: string, download?: boolean) => {
    if (download) {
      const link = document.createElement("a");
      link.href = url;
      link.download = RESUME_FILENAME;
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }
    setShowStartMenu(false);
  };

  // Handle external window triggers (e.g., from Navbar search)
  useEffect(() => {
    const handleOpenWindow = (event: any) => {
      if (event.detail?.windowId) {
        openWindow(event.detail.windowId);
        setShowStartMenu(false);
      }
    };

    window.addEventListener("open-os-window", handleOpenWindow);
    return () => window.removeEventListener("open-os-window", handleOpenWindow);
  }, [openWindow]);

  // Focus search input when start menu opens
  useEffect(() => {
    if (showStartMenu) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    } else {
      setSearchQuery("");
      setSearchResults([]);
    }
  }, [showStartMenu]);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<{ id: WindowId; label: string; icon: string; keywords: string[] }[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    
    // Comprehensive search mapping
    const searchMap = [
      { id: "about" as WindowId, label: "About Me", icon: "user", keywords: ["bio", "profile", "skills", "tech", "react", "next", "python", "aws"] },
      { id: "projects" as WindowId, label: "Projects", icon: "folder", keywords: ["work", "portfolio", "apps", "code", "lumaya", "safety", "test"] },
      { id: "experience" as WindowId, label: "Experience", icon: "briefcase", keywords: ["jobs", "history", "career", "hashlogics", "techling"] },
      { id: "contact" as WindowId, label: "Contact", icon: "mail", keywords: ["email", "touch", "hire", "talk", "social", "phone"] },
    ];

    const filtered = searchMap.filter(item => 
      item.label.toLowerCase().includes(lowerQuery) || 
      item.keywords.some(k => lowerQuery.includes(k)) ||
      item.id.toLowerCase().includes(lowerQuery)
    );

    setSearchResults(filtered);
  };

  const onSearchResultClick = (id: WindowId) => {
    openWindow(id);
    setShowStartMenu(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  const openAllSections = useCallback(() => {
    const ids: WindowId[] = ["about", "projects", "experience", "contact"];
    const maximizedOnOpen = typeof window !== "undefined" && window.innerWidth < 768;
    setWindows((prev) => {
      const next = [...prev];
      let z = highestZ;
      for (const id of ids) {
        const exists = next.find((w) => w.id === id);
        z = nextWindowZIndex(z);
        if (exists) {
          const idx = next.findIndex((w) => w.id === id);
          next[idx] = { ...next[idx], isMinimized: false, zIndex: z };
        } else {
          next.push({
            id,
            isMinimized: false,
            isMaximized: maximizedOnOpen,
            zIndex: z,
          });
        }
      }
      return next;
    });
    setHighestZ((z) => {
      let current = z;
      for (let i = 0; i < ids.length; i++) current = nextWindowZIndex(current);
      return current;
    });
    setActiveWindow("projects");
    setShowStartMenu(false);
  }, [highestZ]);

  return (
    <div 
      className="fixed inset-0 overflow-hidden select-none transition-all duration-500"
      style={{
        filter: `brightness(${brightness}%) ${nightLight ? 'sepia(30%) saturate(120%) hue-rotate(-15deg)' : ''}`,
      }}
    >
      {/* Professional Mesh Gradient Background - Optimized */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Base Layer */}
        <div className="absolute inset-0 bg-os-desktop-bg transition-colors duration-1000" />

        {/* Optimized Animated Blooms - Reduced from 3 to 2, simplified animations */}
        <motion.div
          animate={reduceMotion ? {} : {
            scale: [1, 1.15, 1],
          }}
          transition={reduceMotion ? {} : { duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/4 -left-1/4 w-full h-full rounded-full bg-[var(--os-accent)]/12 blur-[120px]"
          style={{ willChange: reduceMotion ? 'auto' : 'transform' }}
        />
        <motion.div
          animate={reduceMotion ? {} : {
            scale: [1, 1.1, 1],
          }}
          transition={reduceMotion ? {} : { duration: 35, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-1/4 -right-1/4 w-full h-full rounded-full bg-indigo-500/10 blur-[100px]"
          style={{ willChange: reduceMotion ? 'auto' : 'transform' }}
        />

        {/* Glass Overlay */}
        <div className="absolute inset-0 bg-background/5 backdrop-blur-[1px]" />
      </div>

      {/* Desktop Icons — always below recruiter navbar */}
      <div
        className="absolute left-4 md:left-6 z-[5] pointer-events-auto"
        style={{ top: hideNavbar ? 16 : navbarHeight + 12 }}
      >
        <div className="grid grid-cols-2 md:grid-cols-1 gap-1 md:gap-2">
          {DESKTOP_ICONS.map((item) => (
            <DesktopIcon
              key={item.id}
              icon={item.icon}
              label={item.label}
              onClick={() => openWindow(item.id)}
            />
          ))}
          {/* Social links as desktop icons */}
          {QUICK_LINKS.map((item) => (
            <DesktopIcon
              key={item.id}
              icon={item.icon}
              label={item.label}
              singleClick={"download" in item}
              onClick={() => openExternalLink(item.url, "download" in item && item.download)}
            />
          ))}
        </div>
      </div>

      {/* Center Welcome Widget - Windows 11 style */}
      {windows.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-16 pt-24 md:pt-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center space-y-4 md:space-y-6 px-4"
          >
            {/* Profile — desktop “account” avatar (like a lock screen) */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.8, delay: 0.2, type: "spring" }}
              className="relative mx-auto h-24 w-24 rounded-full bg-gradient-to-br from-[var(--os-accent)] via-indigo-400 to-violet-400 p-[3px] shadow-2xl md:h-32 md:w-32"
              style={{ boxShadow: "0 20px 40px var(--os-accent-glow)" }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-[var(--os-window)] bg-[var(--os-surface)]">
                <Image
                  src={PROFILE_IMAGE}
                  alt={personalInfo.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 96px, 128px"
                  priority
                />
              </div>
            </motion.div>

            {/* Name and Role */}
            <div className="space-y-3">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-os-text-primary tracking-tighter transition-colors drop-shadow-sm">
                {personalInfo.name}
              </h1>
              <div className="mx-auto h-px w-20 bg-gradient-to-r from-transparent via-[var(--os-accent)] to-transparent opacity-60" />
              <p className="text-lg md:text-xl lg:text-2xl text-os-text-secondary font-medium tracking-wide uppercase opacity-80">
                {personalInfo.role.split("|")[0].trim()}
              </p>
            </div>

            {/* Date */}
            <p className="text-sm md:text-base text-os-text-secondary transition-colors">
              {currentTime}
            </p>

            {/* Impact Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduceMotion ? { duration: 0 } : { delay: 0.4 }}
              className="grid grid-cols-3 gap-3 md:gap-6 py-4 md:py-6"
            >
              {[
                { label: "Experience", value: highlights.yearsExperience || "3+" },
                { label: "Projects", value: highlights.projectsCompleted || "10+" },
                { label: "Core Skills", value: "Full Stack" },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span className="text-xl md:text-2xl font-black text-os-text-primary">{stat.value}</span>
                  <span className="text-[10px] md:text-xs text-os-text-secondary uppercase tracking-widest font-bold opacity-60">{stat.label}</span>
                </div>
              ))}
            </motion.div>

            {/* Core Stack Pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={reduceMotion ? { duration: 0 } : { delay: 0.6 }}
              className="flex flex-wrap justify-center gap-2 max-w-md mx-auto"
            >
              {["Next.js", "Python", "AWS", "AI", "Terraform"].map((tech) => (
                <span 
                  key={tech}
                  className="px-3 py-1 rounded-full bg-os-text-primary/5 border border-os-text-primary/10 text-[10px] md:text-xs font-bold text-os-text-secondary transition-all hover:bg-os-text-primary/10"
                >
                  {tech}
                </span>
              ))}
            </motion.div>

            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={reduceMotion ? { duration: 0 } : { delay: 0.8 }}
              className="pt-4"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] md:text-xs font-bold uppercase tracking-widest shadow-sm">
                <span className={`w-2 h-2 rounded-full bg-emerald-500 ${reduceMotion ? '' : 'animate-pulse'}`} />
                {personalInfo.availability}
              </div>
            </motion.div>

            {/* Quick actions */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reduceMotion ? { duration: 0 } : { delay: 1 }}
              className="flex flex-wrap justify-center gap-3 mt-6 pointer-events-auto"
            >
              <button
                type="button"
                onClick={() => openWindow("projects")}
                className="rounded-full border border-[var(--os-accent)]/35 bg-[var(--os-accent-muted)] px-5 py-2.5 text-sm font-semibold text-[var(--os-text-primary)] transition-colors hover:border-[var(--os-accent)]/50"
              >
                View projects
              </button>
              <a
                href={RESUME_PATH}
                download={RESUME_FILENAME}
                className="px-6 py-3 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-sm font-semibold hover:bg-emerald-500/25 transition-colors inline-flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download resume
              </a>
              <button
                type="button"
                onClick={() => openWindow("contact")}
                className="rounded-full border border-sky-400/40 bg-sky-500/20 px-5 py-2.5 text-sm font-semibold text-os-text-primary transition-colors hover:bg-sky-500/30"
              >
                Hire Me
              </button>
            </motion.div>

            <FeaturedProjectsRow
              variant="os"
              onProjectClick={() => openWindow("projects")}
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={reduceMotion ? { duration: 0 } : { delay: 1.2 }}
              className="text-[10px] md:text-xs text-os-text-secondary opacity-40 mt-6 transition-colors italic"
            >
              Tap a preview or folder icon to explore — switch to Recruiter View for the full scroll layout
            </motion.p>
          </motion.div>
        </div>
      )}

      <AnimatePresence>
        {!hideNavbar && (
          <motion.div
            key="recruiter-hero"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="fixed top-0 left-0 right-0 isolate"
            style={{ zIndex: OS_Z.navbar }}
          >
            <RecruiterHero
              ref={heroRef}
              collapsed={heroCollapsed}
              onToggleCollapse={() => setHeroCollapsed((c) => !c)}
              onContact={() => openWindow("contact")}
              onOpenProjects={openAllSections}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Windows — stack below navbar (z capped in window.tsx) */}
      {windows.map((window) => (
        <Window
          key={window.id}
          id={window.id}
          title={getWindowTitle(window.id)}
          isMinimized={window.isMinimized}
          isMaximized={window.isMaximized}
          zIndex={window.zIndex}
          topInset={navbarHeight}
          isActive={activeWindow === window.id}
          onClose={() => closeWindow(window.id)}
          onMinimize={() => minimizeWindow(window.id)}
          onToggleMaximize={() => toggleMaximizeWindow(window.id)}
          onFocus={() => focusWindow(window.id)}
        >
          {getWindowContent(window.id)}
        </Window>
      ))}

      {/* Start Menu - Windows 11 Style with Animation from Bottom */}
      <AnimatePresence>
        {showStartMenu && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0"
              style={{ zIndex: OS_Z.startBackdrop }}
              onClick={() => setShowStartMenu(false)}
            />

            {/* Start Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={`fixed ${
                isMobile
                  ? "bottom-14 left-2 right-2"
                  : "bottom-14 left-1/2 -translate-x-1/2"
              }`}
              style={{
                zIndex: OS_Z.startMenu,
                width: isMobile ? "auto" : "600px",
                maxWidth: "calc(100vw - 16px)",
              }}
            >
              <div
                className="rounded-xl overflow-hidden border border-black/10 dark:border-white/10 transition-colors duration-300"
                style={{
                  backgroundColor: "var(--os-start-menu-bg)",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)",
                }}
              >
                {/* Search Bar */}
                <div className="p-4 md:p-6">
                  <div className="relative">
                    <div className="flex items-center gap-3 px-4 py-3 bg-os-window rounded-full border border-black/10 dark:border-white/10 focus-within:ring-2 focus-within:ring-accent/50 transition-all">
                      <svg className="w-4 h-4 text-os-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <input
                        ref={searchInputRef}
                        type="search"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Type to search content..."
                        aria-label="Search portfolio sections"
                        className="w-full bg-transparent border-none outline-none text-sm text-os-text-primary placeholder:text-os-text-secondary"
                      />
                    </div>
                  </div>
                </div>

                {/* Search Results or Pinned Apps */}
                <div className="px-4 md:px-6 pb-4 min-h-[300px]">
                  {searchQuery ? (
                    <div className="space-y-2">
                       <span className="text-sm font-semibold text-os-text-primary px-2">Search Results</span>
                       <div className="mt-2 space-y-1">
                         {searchResults.length > 0 ? (
                           searchResults.map((result) => (
                             <button
                               key={result.id}
                               onClick={() => onSearchResultClick(result.id)}
                               className="w-full flex items-center gap-4 p-2 rounded-lg hover:bg-os-window-header transition-colors group text-left"
                             >
                               <div className="w-10 h-10 flex items-center justify-center">
                                 <StartMenuIcon name={result.icon} />
                               </div>
                               <div>
                                 <div className="text-sm font-medium text-os-text-primary">{result.label}</div>
                                 <div className="text-xs text-os-text-secondary opacity-70">System app</div>
                               </div>
                             </button>
                           ))
                         ) : (
                           <div className="p-8 text-center text-os-text-secondary italic text-sm">
                             No results found for "{searchQuery}"
                           </div>
                         )}
                       </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between mb-4 mt-2">
                        <span className="text-sm font-semibold text-os-text-primary px-2">Pinned</span>
                        <button className="text-xs text-os-text-secondary hover:text-os-text-primary transition-colors px-2 py-1 rounded hover:bg-foreground/10">
                          All apps →
                        </button>
                      </div>
                      <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                        {DESKTOP_ICONS.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => openWindow(item.id)}
                            className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-foreground/5 transition-colors"
                          >
                            <StartMenuIcon name={item.icon} />
                            <span className="text-[10px] md:text-xs text-os-text-primary text-center leading-tight">
                              {item.label}
                            </span>
                          </button>
                        ))}
                        {QUICK_LINKS.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => openExternalLink(item.url, "download" in item && item.download)}
                            className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-foreground/5 transition-colors"
                            aria-label={item.label}
                          >
                            <StartMenuIcon name={item.icon} />
                            <span className="text-[10px] md:text-xs text-os-text-primary text-center leading-tight">
                              {item.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* User Profile Footer */}
                <div
                  className="flex items-center justify-between px-4 md:px-6 py-3 border-t border-black/5 dark:border-white/5 bg-foreground/5"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[#38bdf8] to-[#8b5cf6] flex items-center justify-center">
                      <span className="text-white font-bold text-xs md:text-sm">
                        {personalInfo.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-os-text-primary">{personalInfo.name}</div>
                      <div className="flex items-center gap-1.5 text-xs text-os-text-secondary">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        {personalInfo.availability}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowStartMenu(false)}
                    className="p-2 rounded-lg hover:bg-foreground/10 transition-colors"
                    title="Close"
                  >
                    <svg className="w-5 h-5 text-os-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Taskbar */}
      <Taskbar
        openWindows={windows.map((w) => w.id)}
        activeWindow={activeWindow}
        onWindowClick={handleTaskbarWindowClick}
        onStartClick={() => setShowStartMenu(!showStartMenu)}
        onShowDesktop={showDesktop}
        brightness={brightness}
        setBrightness={setBrightness}
        nightLight={nightLight}
        setNightLight={setNightLight}
      />
    </div>
  );
}

// Small icons for start menu
function StartMenuIcon({ name }: { name: string }) {
  const iconStyles = "w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center";

  const icons: Record<string, React.ReactNode> = {
    user: (
      <div className={`${iconStyles} bg-gradient-to-br from-blue-500 to-blue-700`}>
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
    ),
    folder: (
      <div className={`${iconStyles} bg-gradient-to-br from-amber-400 to-amber-600`}>
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
      </div>
    ),
    briefcase: (
      <div className={`${iconStyles} bg-gradient-to-br from-indigo-500 to-indigo-700`}>
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
    ),
    mail: (
      <div className={`${iconStyles} bg-gradient-to-br from-emerald-500 to-emerald-700`}>
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
    ),
    github: (
      <div className={`${iconStyles} bg-gradient-to-br from-gray-600 to-gray-800`}>
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
        </svg>
      </div>
    ),
    linkedin: (
      <div className={`${iconStyles} bg-gradient-to-br from-[#0077b5] to-[#005885]`}>
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      </div>
    ),
    resume: (
      <div className={`${iconStyles} bg-gradient-to-br from-red-500 to-red-700`}>
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
    ),
  };

  return <>{icons[name] || icons.folder}</>;
}

// Loading fallback for lazy-loaded window content
function WindowContentLoading() {
  return (
    <div className="flex items-center justify-center h-full min-h-[300px] p-8">
      <div className="flex flex-col items-center gap-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full"
        />
        <p className="text-sm text-os-text-secondary">Loading...</p>
      </div>
    </div>
  );
}
