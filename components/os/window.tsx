"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  isMinimized: boolean;
  zIndex: number;
  isActive: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
}

export function Window({
  id,
  title,
  children,
  isMinimized,
  zIndex,
  isActive,
  onClose,
  onMinimize,
  onFocus,
}: WindowProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 800, height: 550 });
  const [isReady, setIsReady] = useState(false);

  // Check for mobile and center window
  useEffect(() => {
    const setupWindow = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (mobile) {
        setIsMaximized(true);
      } else {
        // Calculate window size - larger for better content visibility
        const width = Math.min(850, window.innerWidth - 80);
        const height = Math.min(600, window.innerHeight - 100);
        setWindowSize({ width, height });

        // Center the window with offset based on window id
        const index = ["about", "projects", "experience", "contact"].indexOf(id);
        const offsetX = index * 30;
        const offsetY = index * 30;

        const centerX = Math.max(40, (window.innerWidth - width) / 2 + offsetX);
        const centerY = Math.max(20, (window.innerHeight - height - 48) / 2 + offsetY);

        setPosition({ x: centerX, y: centerY });
      }
      setIsReady(true);
    };

    setupWindow();
    window.addEventListener("resize", setupWindow);
    return () => window.removeEventListener("resize", setupWindow);
  }, [id]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".window-controls")) return;
    if (isMaximized) return;
    onFocus();
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  // Touch handling for mobile drag
  const handleTouchStart = (e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest(".window-controls")) return;
    if (isMaximized || isMobile) return;
    onFocus();
    const touch = e.touches[0];
    setIsDragging(true);
    setDragOffset({
      x: touch.clientX - position.x,
      y: touch.clientY - position.y,
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || isMaximized) return;
      setPosition({
        x: Math.max(0, Math.min(e.clientX - dragOffset.x, window.innerWidth - 200)),
        y: Math.max(0, Math.min(e.clientY - dragOffset.y, window.innerHeight - 100)),
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || isMaximized) return;
      const touch = e.touches[0];
      setPosition({
        x: Math.max(0, Math.min(touch.clientX - dragOffset.x, window.innerWidth - 200)),
        y: Math.max(0, Math.min(touch.clientY - dragOffset.y, window.innerHeight - 100)),
      });
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleEnd);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleEnd);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, dragOffset, isMaximized]);

  const handleMaximize = () => {
    if (!isMobile) {
      setIsMaximized(!isMaximized);
    }
    onFocus();
  };

  if (!isReady) return null;

  const windowIcons: Record<string, React.ReactNode> = {
    about: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    projects: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    ),
    experience: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    contact: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  };

  return (
    <AnimatePresence>
      {!isMinimized && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={`fixed flex flex-col overflow-hidden bg-os-window border border-black/10 dark:border-white/10 shadow-2xl ${
            isMaximized ? "rounded-none" : "rounded-lg"
          }`}
          style={{
            ...(isMaximized
              ? { top: 0, left: 0, right: 0, bottom: 48, width: "100%", height: "calc(100% - 48px)" }
              : { top: position.y, left: position.x, width: windowSize.width, height: windowSize.height }
            ),
            zIndex,
            opacity: 1,
            // Solid background with theme-aware shadow
            boxShadow: "var(--os-window-shadow)",
          }}
          onClick={onFocus}
        >
          {/* Window Background - Solid, no transparency */}
          <div className="absolute inset-0 bg-os-window -z-10" />

          {/* Title Bar - Windows 11 style */}
          <div
            className={`relative flex items-center justify-between h-10 px-3 select-none transition-colors ${
              !isMaximized && !isMobile ? "cursor-move" : ""
            } bg-os-window-header`}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            {/* Window Icon and Title */}
            <div className="flex items-center gap-2 text-sm text-[var(--os-window-text)]">
              <span className="text-[var(--os-cyan)]">{windowIcons[id]}</span>
              <span className="font-medium">{title}</span>
            </div>

            {/* Window Controls - Windows 11 style */}
            <div className="window-controls flex items-center h-full -mr-3">
              <button
                onClick={(e) => { e.stopPropagation(); onMinimize(); }}
                className="w-12 h-full flex items-center justify-center hover:bg-os-window-header transition-colors"
                title="Minimize"
              >
                <svg className="w-4 h-4 text-[var(--os-window-text)] opacity-80" viewBox="0 0 12 12">
                  <rect x="2" y="5.5" width="8" height="1" fill="currentColor" />
                </svg>
              </button>
              {!isMobile && (
                  <button
                    onClick={(e) => { e.stopPropagation(); handleMaximize(); }}
                    className="w-12 h-full flex items-center justify-center hover:bg-foreground/10 transition-colors"
                    title={isMaximized ? "Restore" : "Maximize"}
                  >
                    {isMaximized ? (
                      <svg className="w-4 h-4 text-[var(--os-window-text)] opacity-80" viewBox="0 0 12 12">
                        <rect x="2.5" y="4" width="6" height="5.5" fill="none" stroke="currentColor" strokeWidth="1" />
                        <path d="M4.5 4V2.5h6V8h-1.5" fill="none" stroke="currentColor" strokeWidth="1" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-[var(--os-window-text)] opacity-80" viewBox="0 0 12 12">
                        <rect x="2" y="2" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="1" />
                      </svg>
                    )}
                  </button>
              )}
              <button
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                className="w-12 h-full flex items-center justify-center hover:bg-[#c42b1c] transition-colors group"
                title="Close"
              >
                <svg className="w-4 h-4 text-[var(--os-window-text)] opacity-80 group-hover:text-white" viewBox="0 0 12 12">
                  <path d="M2.5 2.5l7 7M9.5 2.5l-7 7" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content - Solid background from theme */}
          <div className="relative flex-1 min-h-0 overflow-y-auto overflow-x-hidden bg-os-window">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
