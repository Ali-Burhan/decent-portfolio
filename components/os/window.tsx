"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, FolderOpen, Briefcase, Mail, Minus, Square, X, Copy } from "lucide-react";

import { windowStackZ } from "@/lib/os-layers";

const TASKBAR_HEIGHT = 48;

interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  isActive: boolean;
  /** Space for navbar when window is restored */
  topInset: number;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  onFocus: () => void;
}

const WINDOW_ICONS: Record<string, React.ReactNode> = {
  about: <User className="h-4 w-4" strokeWidth={2.25} />,
  projects: <FolderOpen className="h-4 w-4" strokeWidth={2.25} />,
  experience: <Briefcase className="h-4 w-4" strokeWidth={2.25} />,
  contact: <Mail className="h-4 w-4" strokeWidth={2.25} />,
};

function WindowActionButton({
  onClick,
  label,
  children,
  variant = "default",
}: {
  onClick: (e: React.MouseEvent) => void;
  label: string;
  children: React.ReactNode;
  variant?: "default" | "close";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`window-action-btn flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
        variant === "close"
          ? "text-[var(--os-text-muted)] hover:bg-red-500/15 hover:text-red-600 dark:hover:text-red-400"
          : "text-[var(--os-text-muted)] hover:bg-[var(--os-icon-hover)] hover:text-[var(--os-text-primary)]"
      }`}
      aria-label={label}
      title={label}
    >
      {children}
    </button>
  );
}

export const Window = React.memo(function Window({
  id,
  title,
  children,
  isMinimized,
  isMaximized,
  zIndex,
  isActive,
  topInset,
  onClose,
  onMinimize,
  onToggleMaximize,
  onFocus,
}: WindowProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 800, height: 550 });
  const [isReady, setIsReady] = useState(false);

  const stackZ = windowStackZ(zIndex);
  const fillScreen = isMaximized;
  const chromeTop = Math.min(280, Math.max(56, topInset));

  useEffect(() => {
    const setupWindow = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (fillScreen) {
        setIsReady(true);
        return;
      }

      const width = Math.min(860, window.innerWidth - 64);
      const height = Math.min(
        620,
        window.innerHeight - chromeTop - TASKBAR_HEIGHT - 24
      );
      setWindowSize({ width, height: Math.max(320, height) });

      const index = ["about", "projects", "experience", "contact"].indexOf(id);
      const offsetX = index * 28;
      const offsetY = index * 28;

      const centerX = Math.max(32, (window.innerWidth - width) / 2 + offsetX);
      const centerY = Math.max(
        chromeTop,
        (window.innerHeight - height - TASKBAR_HEIGHT) / 2 + offsetY
      );

      setPosition({ x: centerX, y: centerY });
      setIsReady(true);
    };

    setupWindow();
    window.addEventListener("resize", setupWindow);
    return () => window.removeEventListener("resize", setupWindow);
  }, [id, fillScreen, chromeTop]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).closest(".window-action-btn")) return;
      if (fillScreen) return;
      onFocus();
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    },
    [fillScreen, onFocus, position.x, position.y]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if ((e.target as HTMLElement).closest(".window-action-btn")) return;
      if (fillScreen || isMobile) return;
      onFocus();
      const touch = e.touches[0];
      setIsDragging(true);
      setDragOffset({
        x: touch.clientX - position.x,
        y: touch.clientY - position.y,
      });
    },
    [fillScreen, isMobile, onFocus, position.x, position.y]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || fillScreen) return;
      setPosition({
        x: Math.max(0, Math.min(e.clientX - dragOffset.x, window.innerWidth - 200)),
        y: Math.max(
          chromeTop,
          Math.min(e.clientY - dragOffset.y, window.innerHeight - TASKBAR_HEIGHT - 80)
        ),
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging || fillScreen) return;
      const touch = e.touches[0];
      setPosition({
        x: Math.max(0, Math.min(touch.clientX - dragOffset.x, window.innerWidth - 200)),
        y: Math.max(
          chromeTop,
          Math.min(touch.clientY - dragOffset.y, window.innerHeight - TASKBAR_HEIGHT - 80)
        ),
      });
    };

    const handleEnd = () => setIsDragging(false);

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
  }, [isDragging, dragOffset, fillScreen, chromeTop]);

  const handleMaximize = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!isMobile) onToggleMaximize();
      onFocus();
    },
    [isMobile, onToggleMaximize, onFocus]
  );

  if (!isReady) return null;

  const fullscreenStyle: React.CSSProperties = {
    top: 0,
    left: 0,
    right: 0,
    bottom: TASKBAR_HEIGHT,
  };

  return (
    <AnimatePresence>
      {!isMinimized && (
        <motion.div
          role="dialog"
          aria-labelledby={`window-title-${id}`}
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16, transition: { duration: 0.12 } }}
          transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
          className={`fixed flex flex-col overflow-hidden shadow-[var(--os-window-shadow)] ${
            fillScreen ? "rounded-none" : "rounded-2xl"
          } ${isActive ? "ring-1 ring-[var(--os-accent)]/35" : ""}`}
          style={{
            ...(fillScreen
              ? fullscreenStyle
              : {
                  top: position.y,
                  left: position.x,
                  width: windowSize.width,
                  height: windowSize.height,
                }),
            zIndex: stackZ,
            background: "var(--os-window)",
            border: "1px solid var(--os-window-border)",
          }}
          onClick={onFocus}
        >
          {isActive && (
            <div
              className="pointer-events-none absolute -inset-px -z-10 rounded-2xl opacity-60 blur-2xl"
              style={{ background: "var(--os-accent-glow)" }}
            />
          )}

          <div
            className={`window-title-bar relative flex h-12 shrink-0 items-center gap-2 border-b border-[var(--os-border)] pl-3 pr-2 md:pl-4 md:pr-3 ${
              !fillScreen && !isMobile ? "cursor-move" : ""
            }`}
            style={{ background: "var(--os-window-header)" }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            <div className="flex min-w-0 flex-1 items-center gap-2.5">
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[var(--os-accent)]"
                style={{ background: "var(--os-accent-muted)" }}
              >
                {WINDOW_ICONS[id]}
              </span>
              <span
                id={`window-title-${id}`}
                className="truncate text-sm font-semibold text-[var(--os-text-primary)]"
              >
                {title}
              </span>
            </div>

            <div className="flex shrink-0 items-center gap-0.5">
              <WindowActionButton
                onClick={(e) => {
                  e.stopPropagation();
                  onMinimize();
                }}
                label="Minimize window"
              >
                <Minus className="h-4 w-4" />
              </WindowActionButton>

              {!isMobile && (
                <WindowActionButton
                  onClick={handleMaximize}
                  label={isMaximized ? "Restore window" : "Maximize window"}
                >
                  {isMaximized ? (
                    <Copy className="h-3.5 w-3.5" />
                  ) : (
                    <Square className="h-3.5 w-3.5" />
                  )}
                </WindowActionButton>
              )}

              <WindowActionButton
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                label="Close window"
                variant="close"
              >
                <X className="h-4 w-4" strokeWidth={2.5} />
              </WindowActionButton>
            </div>
          </div>

          <div className="os-scrollbar relative min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});
