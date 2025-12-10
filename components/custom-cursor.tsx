"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    let trailId = 0;
    let rippleId = 0;
    let lastTrailTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Throttle trail creation for better performance
      const now = Date.now();
      if (now - lastTrailTime > 50) { // Only create trail every 50ms
        trailId++;
        setTrails((prev) => [
          ...prev.slice(-8), // Reduced from 15 to 8 for performance
          { x: e.clientX, y: e.clientY, id: trailId },
        ]);
        lastTrailTime = now;
      }
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

      rippleId++;
      setRipples((prev) => [
        ...prev,
        { x: e.clientX, y: e.clientY, id: rippleId },
      ]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== rippleId));
      }, 800);
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

  // Clean up old trails more aggressively
  useEffect(() => {
    const interval = setInterval(() => {
      setTrails((prev) => prev.slice(-5));
    }, 80);

    return () => clearInterval(interval);
  }, []);

  const handleMenuAction = (action: string) => {
    setContextMenu({ x: 0, y: 0, show: false });
    
    switch (action) {
      case "home":
        window.scrollTo({ top: 0, behavior: "smooth" });
        break;
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
        window.open("https://linkedin.com", "_blank");
        break;
      case "github":
        window.open("https://github.com", "_blank");
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
          {/* Click Ripples */}
          <AnimatePresence>
            {ripples.map((ripple) => (
              <motion.div
                key={ripple.id}
                className="absolute rounded-full border-2 border-accent"
                initial={{
                  x: ripple.x - 10,
                  y: ripple.y - 10,
                  width: 20,
                  height: 20,
                  opacity: 1,
                }}
                animate={{
                  width: 80,
                  height: 80,
                  x: ripple.x - 40,
                  y: ripple.y - 40,
                  opacity: 0,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            ))}
          </AnimatePresence>

          {/* Trail Particles - Optimized */}
          {trails.map((trail) => (
            <motion.div
              key={trail.id}
              className="absolute w-1 h-1 rounded-full bg-accent"
              initial={{
                x: trail.x,
                y: trail.y,
                scale: 1,
                opacity: 0.6,
              }}
              animate={{
                scale: 0,
                opacity: 0,
              }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
              }}
              style={{
                left: 0,
                top: 0,
                willChange: "transform, opacity",
              }}
            />
          ))}

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
              stiffness: 500,
              damping: 28,
              mass: 0.5,
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
              stiffness: 300,
              damping: 20,
              mass: 0.8,
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
            className="fixed z-[100] bg-background/95 backdrop-blur-xl border-2 border-accent/30 rounded-2xl shadow-2xl overflow-hidden"
            style={{
              left: contextMenu.x + 20, // Offset 20px right from cursor
              top: contextMenu.y + 10,  // Offset 10px down from cursor
              minWidth: "220px",
            }}
          >
            <div className="p-2">
              <button
                onClick={() => handleMenuAction("home")}
                className="w-full text-left px-4 py-3 rounded-xl hover:bg-accent/10 transition-colors flex items-center gap-3 text-foreground"
              >
                <span className="text-xl">🏠</span>
                <span className="font-medium">Back to Top</span>
              </button>
              
              <button
                onClick={() => handleMenuAction("theme")}
                className="w-full text-left px-4 py-3 rounded-xl hover:bg-accent/10 transition-colors flex items-center gap-3 text-foreground"
              >
                <span className="text-xl">🌓</span>
                <span className="font-medium">Toggle Theme</span>
              </button>

              <div className="h-px bg-accent/20 my-2" />

              <button
                onClick={() => handleMenuAction("copy-email")}
                className="w-full text-left px-4 py-3 rounded-xl hover:bg-accent/10 transition-colors flex items-center gap-3 text-foreground"
              >
                <span className="text-xl">📧</span>
                <span className="font-medium">Copy Email</span>
              </button>

              <button
                onClick={() => handleMenuAction("linkedin")}
                className="w-full text-left px-4 py-3 rounded-xl hover:bg-accent/10 transition-colors flex items-center gap-3 text-foreground"
              >
                <span className="text-xl">💼</span>
                <span className="font-medium">LinkedIn</span>
              </button>

              <button
                onClick={() => handleMenuAction("github")}
                className="w-full text-left px-4 py-3 rounded-xl hover:bg-accent/10 transition-colors flex items-center gap-3 text-foreground"
              >
                <span className="text-xl">👨‍💻</span>
                <span className="font-medium">GitHub</span>
              </button>

              <div className="h-px bg-accent/20 my-2" />

              <button
                onClick={() => handleMenuAction("reload")}
                className="w-full text-left px-4 py-3 rounded-xl hover:bg-accent/10 transition-colors flex items-center gap-3 text-foreground/70"
              >
                <span className="text-xl">🔄</span>
                <span className="font-medium">Reload Page</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
