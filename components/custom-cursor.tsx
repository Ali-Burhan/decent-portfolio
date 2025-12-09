"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [trails, setTrails] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    let trailId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Add trail particle every few pixels
      trailId++;
      setTrails((prev) => [
        ...prev.slice(-15), // Keep only last 15 trails
        { x: e.clientX, y: e.clientY, id: trailId },
      ]);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over interactive elements
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer") ||
        target.style.cursor === "pointer"
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // Clean up old trails
  useEffect(() => {
    const interval = setInterval(() => {
      setTrails((prev) => prev.slice(-10));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 hidden md:block">
      {/* Trail Particles */}
      {trails.map((trail, index) => (
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
            duration: 0.6,
            ease: "easeOut",
          }}
          style={{
            left: 0,
            top: 0,
          }}
        />
      ))}

      {/* Main Cursor Dot */}
      <motion.div
        className="absolute rounded-full border-2 border-accent bg-accent/20 backdrop-blur-sm"
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
        }}
      />

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
        }}
      />
    </div>
  );
}
