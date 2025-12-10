"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import portfolioData from "@/data/portfolio.json";

interface Ripple {
  x: number;
  y: number;
  id: number;
}

interface ContextMenu {
  x: number;
  y: number;
  show: boolean;
}

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredElement, setHoveredElement] = useState("");
  const [trails, setTrails] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showCopyFeedback, setShowCopyFeedback] = useState(false);
  const [contextMenu, setContextMenu] = useState<ContextMenu>({ x: 0, y: 0, show: false });
  const [cursorEnabled, setCursorEnabled] = useState(true);

  // Listen for cursor toggle events
  useEffect(() => {
    const savedPreference = localStorage.getItem("customCursor");
    const isEnabled = savedPreference === null ? true : savedPreference === "enabled";
    setCursorEnabled(isEnabled);

    const handleCursorToggle = (e: CustomEvent) => {
      setCursorEnabled(e.detail.enabled);
    };

    window.addEventListener("cursorToggle", handleCursorToggle as EventListener);
    return () => {
      window.removeEventListener("cursorToggle", handleCursorToggle as EventListener);
    };
  }, []);

  useEffect(() => {
    // IDs kept for potential future use; trail / ripple visuals are disabled for performance.
    let trailId = 0;
    let rippleId = 0;
    let lastTrailTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer")
      ) {
        setIsHovering(true);
        
        if (target.tagName === "A") {
          const text = target.textContent?.trim().slice(0, 20) || "Link";
          setHoveredElement(text);
        } else if (target.tagName === "BUTTON") {
          const text = target.textContent?.trim().slice(0, 20) || "Button";
          setHoveredElement(text);
        } else {
          setHoveredElement("Click");
        }
      } else {
        setIsHovering(false);
        setHoveredElement("");
      }
    };

    const handleClick = (e: MouseEvent) => {
      // Hide context menu on click
      setContextMenu({ x: 0, y: 0, show: false });
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      setContextMenu({
        x: e.clientX,
        y: e.clientY,
        show: true,
      });
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
      
      // Hide context menu on scroll
      setContextMenu({ x: 0, y: 0, show: false });
    };

    const handleCopy = () => {
      setShowCopyFeedback(true);
      setTimeout(() => setShowCopyFeedback(false), 2000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("click", handleClick);
    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("copy", handleCopy);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("copy", handleCopy);
    };
  }, []);

  // Trail cleanup effect disabled; trails are no longer rendered for performance.
  useEffect(() => {
    return () => {
      setTrails([]);
      setRipples([]);
    };
  }, []);

  const handleMenuAction = (action: string) => {
    setContextMenu({ x: 0, y: 0, show: false });
    
    switch (action) {
      case "home":
        window.scrollTo({ top: 0, behavior: "smooth" });
        break;
      case "about": {
        const el = document.querySelector("#about");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        else window.location.href = "/about";
        break;
      }
      case "experience": {
        const el = document.querySelector("#experience");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        else window.location.href = "/experience";
        break;
      }
      case "projects": {
        const el = document.querySelector("#projects");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        else window.location.href = "/projects";
        break;
      }
      case "contact": {
        const el = document.querySelector("#contact");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        else window.location.href = "/contact";
        break;
      }
      case "theme":
        // Toggle theme
        const html = document.documentElement;
        html.classList.toggle("dark");
        break;
      case "copy-email":
        navigator.clipboard.writeText("aliburhan.dev.ai@gmail.com");
        setShowCopyFeedback(true);
        setTimeout(() => setShowCopyFeedback(false), 2000);
        break;
      case "linkedin":
        window.open(portfolioData.socialLinks.linkedin, "_blank");
        break;
      case "github":
        window.open(portfolioData.socialLinks.github, "_blank");
        break;
      case "twitter":
        window.open(portfolioData.socialLinks.twitter, "_blank");
        break;
      case "reload":
        window.location.reload();
        break;
    }
  };

  return (
    <>
      {/* Cursor Visual Effects - Only render when enabled */}
      {cursorEnabled && (
        <div className="pointer-events-none fixed inset-0 z-[150] hidden md:block">
          {/* Click ripples and trail particles removed for performance */}

          {/* Main Cursor Dot with Scroll Progress */}
          <motion.div
            className="absolute rounded-full border-2 border-accent bg-accent/20 backdrop-blur-sm overflow-hidden"
            animate={{
              x: mousePosition.x - 12,
              y: mousePosition.y - 12,
              scale: isHovering ? 1.5 : 1,
              backgroundColor: isHovering ? "var(--accent)" : "rgba(var(--accent-rgb), 0.2)",
            }}
            transition={{
              type: "spring",
              stiffness: 1200,
              damping: 12,
              mass: 0.2,
            }}
            style={{
              width: "24px",
              height: "24px",
              willChange: "transform",
            }}
          >
            {/* Scroll Progress Fill */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-accent/50"
              style={{
                height: `${scrollProgress}%`,
              }}
              transition={{ duration: 0.1 }}
            />
          </motion.div>

          {/* Outer Ring */}
          <motion.div
            className="absolute rounded-full border border-accent/40"
            animate={{
              x: mousePosition.x - 20,
              y: mousePosition.y - 20,
              scale: isHovering ? 1.3 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 900,
              damping: 10,
              mass: 0.25,
            }}
            style={{
              width: "40px",
              height: "40px",
              willChange: "transform",
            }}
          />

          {/* Element Tooltip */}
          <AnimatePresence>
            {hoveredElement && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute text-xs font-semibold text-accent bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-accent/30 whitespace-nowrap"
                style={{
                  left: mousePosition.x + 20,
                  top: mousePosition.y - 30,
                }}
              >
                {hoveredElement}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Copy Feedback */}
          <AnimatePresence>
            {showCopyFeedback && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute text-sm font-bold text-green-500 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-full border-2 border-green-500/50 shadow-lg"
                style={{
                  left: mousePosition.x + 30,
                  top: mousePosition.y + 20,
                }}
              >
                ✓ Copied!
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Custom Context Menu */}
      <AnimatePresence>
        {contextMenu.show && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="fixed z-[100] bg-background/95 backdrop-blur-xl border border-accent/30 rounded-2xl shadow-2xl overflow-hidden"
            style={{
              left: contextMenu.x + 20, // Offset 20px right from cursor
              top: contextMenu.y + 10,  // Offset 10px down from cursor
              minWidth: "260px",
            }}
          >
            <div className="p-3 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-foreground/50 px-2">
                <span>Quick Command Palette</span>
                <span className="text-accent">Right‑click</span>
              </div>

              <div className="grid gap-2">
                <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-foreground/50 px-2">
                  Navigation
                </div>
                <button
                  onClick={() => handleMenuAction("home")}
                  className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-accent/8 transition-colors flex items-center gap-3 text-foreground text-sm"
                >
                  <span className="text-base">🏠</span>
                  <span className="flex flex-col">
                    <span className="font-medium">Back to top</span>
                    <span className="text-[11px] text-foreground/60">Scroll to hero section</span>
                  </span>
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleMenuAction("about")}
                    className="text-left px-3 py-2 rounded-xl hover:bg-accent/8 transition-colors flex items-center gap-2 text-foreground text-xs"
                  >
                    <span className="text-base">👤</span>
                    <span>About</span>
                  </button>
                  <button
                    onClick={() => handleMenuAction("experience")}
                    className="text-left px-3 py-2 rounded-xl hover:bg-accent/8 transition-colors flex items-center gap-2 text-foreground text-xs"
                  >
                    <span className="text-base">📂</span>
                    <span>Experience</span>
                  </button>
                  <button
                    onClick={() => handleMenuAction("projects")}
                    className="text-left px-3 py-2 rounded-xl hover:bg-accent/8 transition-colors flex items-center gap-2 text-foreground text-xs"
                  >
                    <span className="text-base">🧩</span>
                    <span>Projects</span>
                  </button>
                  <button
                    onClick={() => handleMenuAction("contact")}
                    className="text-left px-3 py-2 rounded-xl hover:bg-accent/8 transition-colors flex items-center gap-2 text-foreground text-xs"
                  >
                    <span className="text-base">✉️</span>
                    <span>Contact</span>
                  </button>
                </div>
              </div>

              <div className="h-px bg-accent/15" />

              <div className="grid gap-2">
                <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-foreground/50 px-2">
                  Quick actions
                </div>
                <button
                  onClick={() => handleMenuAction("theme")}
                  className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-accent/8 transition-colors flex items-center gap-3 text-foreground text-sm"
                >
                  <span className="text-base">🌓</span>
                  <span className="flex flex-col">
                    <span className="font-medium">Toggle theme</span>
                    <span className="text-[11px] text-foreground/60">Switch between light & dark</span>
                  </span>
                </button>
                <button
                  onClick={() => handleMenuAction("copy-email")}
                  className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-accent/8 transition-colors flex items-center gap-3 text-foreground text-sm"
                >
                  <span className="text-base">�</span>
                  <span className="flex flex-col">
                    <span className="font-medium">Copy email</span>
                    <span className="text-[11px] text-foreground/60">aliburhan.dev.ai@gmail.com</span>
                  </span>
                </button>
              </div>

              <div className="h-px bg-accent/15" />

              <div className="grid gap-2">
                <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-foreground/50 px-2">
                  Social
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <button
                    onClick={() => handleMenuAction("linkedin")}
                    className="px-3 py-2 rounded-xl hover:bg-accent/8 transition-colors flex flex-col items-start gap-1 text-foreground"
                  >
                    <span className="text-base">💼</span>
                    <span>LinkedIn</span>
                  </button>
                  <button
                    onClick={() => handleMenuAction("github")}
                    className="px-3 py-2 rounded-xl hover:bg-accent/8 transition-colors flex flex-col items-start gap-1 text-foreground"
                  >
                    <span className="text-base">👨‍💻</span>
                    <span>GitHub</span>
                  </button>
                  <button
                    onClick={() => handleMenuAction("twitter")}
                    className="px-3 py-2 rounded-xl hover:bg-accent/8 transition-colors flex flex-col items-start gap-1 text-foreground"
                  >
                    <span className="text-base">�</span>
                    <span>Twitter</span>
                  </button>
                </div>
              </div>

              <div className="h-px bg-accent/15" />

              <div className="flex items-center justify-between px-2 gap-2">
                <button
                  onClick={() => handleMenuAction("reload")}
                  className="flex items-center gap-2 text-[11px] text-foreground/60 hover:text-accent transition-colors px-2 py-1 rounded-lg"
                >
                  <span className="text-base">🔄</span>
                  <span>Reload page</span>
                </button>
                <span className="text-[10px] font-mono text-foreground/40">
                  Built by Ali Burhan
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
