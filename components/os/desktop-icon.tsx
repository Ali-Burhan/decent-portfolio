"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

interface DesktopIconProps {
  icon: string;
  label: string;
  onClick: () => void;
}

export function DesktopIcon({ icon, label, onClick }: DesktopIconProps) {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(true);
    setTimeout(() => setIsSelected(false), 200);
  };

  const handleDoubleClick = () => {
    onClick();
  };

  return (
    <motion.button
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`group flex flex-col items-center gap-1.5 p-2 rounded-md transition-all w-20 md:w-24 ${
        isSelected
          ? "bg-foreground/15 ring-1 ring-os-cyan/50"
          : "hover:bg-foreground/5"
      }`}
    >
      {/* Icon Container - Windows 11 style with gradient */}
      <div className="relative w-12 h-12 md:w-14 md:h-14">
        <Windows11Icon name={icon} />
      </div>

      {/* Label with text shadow for visibility */}
      <span
        className="text-[11px] md:text-xs text-os-text-primary text-center font-medium leading-tight px-1 py-0.5 rounded max-w-full truncate"
        style={{
          textShadow: "var(--os-desktop-bg) 0px 1px 2px"
        }}
      >
        {label}
      </span>
    </motion.button>
  );
}

// Windows 11 style icons with gradients and modern design
function Windows11Icon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    user: (
      // About Me - Profile/Contact card style icon
      <svg viewBox="0 0 48 48" className="w-full h-full drop-shadow-lg">
        <defs>
          <linearGradient id="userBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="userAccent" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
        {/* Card background */}
        <rect x="6" y="8" width="36" height="32" rx="4" fill="url(#userBg)" />
        {/* Inner card shine */}
        <rect x="6" y="8" width="36" height="16" rx="4" fill="white" opacity="0.15" />
        {/* Profile circle */}
        <circle cx="24" cy="20" r="7" fill="white" />
        {/* Person silhouette */}
        <circle cx="24" cy="18" r="3" fill="#3b82f6" />
        <ellipse cx="24" cy="25" rx="4" ry="2.5" fill="#3b82f6" />
        {/* Contact lines */}
        <rect x="12" y="32" width="24" height="2" rx="1" fill="white" opacity="0.8" />
        <rect x="16" y="36" width="16" height="1.5" rx="0.75" fill="white" opacity="0.5" />
      </svg>
    ),
    folder: (
      // Projects - Folder with documents
      <svg viewBox="0 0 48 48" className="w-full h-full drop-shadow-lg">
        <defs>
          <linearGradient id="folderBack" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <linearGradient id="folderFront" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fcd34d" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
        {/* Back of folder */}
        <path d="M6 14c0-2 1.5-3.5 3.5-3.5h10l3 3.5h16c2 0 3.5 1.5 3.5 3.5v2H6v-5.5z" fill="url(#folderBack)" />
        {/* Folder front */}
        <rect x="4" y="17" width="40" height="24" rx="3" fill="url(#folderFront)" />
        {/* Folder shine */}
        <rect x="4" y="17" width="40" height="8" rx="3" fill="white" opacity="0.2" />
        {/* Document inside */}
        <rect x="14" y="12" width="14" height="18" rx="1" fill="white" opacity="0.9" />
        <rect x="16" y="15" width="8" height="1.5" rx="0.5" fill="#f59e0b" opacity="0.7" />
        <rect x="16" y="18" width="10" height="1" rx="0.5" fill="#9ca3af" />
        <rect x="16" y="20.5" width="10" height="1" rx="0.5" fill="#9ca3af" />
        <rect x="16" y="23" width="6" height="1" rx="0.5" fill="#9ca3af" />
      </svg>
    ),
    briefcase: (
      // Experience - Modern briefcase
      <svg viewBox="0 0 48 48" className="w-full h-full drop-shadow-lg">
        <defs>
          <linearGradient id="briefcaseBg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#4338ca" />
          </linearGradient>
          <linearGradient id="briefcaseHandle" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>
        {/* Main body */}
        <rect x="4" y="16" width="40" height="26" rx="4" fill="url(#briefcaseBg)" />
        {/* Top shine */}
        <rect x="4" y="16" width="40" height="10" rx="4" fill="white" opacity="0.15" />
        {/* Handle */}
        <path d="M18 16v-4c0-1.5 1-2.5 2.5-2.5h7c1.5 0 2.5 1 2.5 2.5v4"
              fill="none" stroke="url(#briefcaseHandle)" strokeWidth="3" strokeLinecap="round" />
        {/* Center clasp */}
        <rect x="20" y="24" width="8" height="6" rx="1" fill="white" opacity="0.9" />
        <rect x="22" y="26" width="4" height="2" rx="0.5" fill="#6366f1" />
        {/* Bottom line */}
        <rect x="8" y="34" width="32" height="2" rx="1" fill="white" opacity="0.2" />
      </svg>
    ),
    mail: (
      // Contact - Modern envelope
      <svg viewBox="0 0 48 48" className="w-full h-full drop-shadow-lg">
        <defs>
          <linearGradient id="mailBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="mailFlap" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
        {/* Envelope body */}
        <rect x="4" y="12" width="40" height="28" rx="3" fill="url(#mailBg)" />
        {/* Envelope flap */}
        <path d="M4 15l20 14 20-14" fill="none" stroke="url(#mailFlap)" strokeWidth="2" />
        <path d="M4 12c0-1.5 1-3 3-3h34c2 0 3 1.5 3 3l-20 15L4 12z" fill="url(#mailFlap)" />
        {/* Shine on flap */}
        <path d="M4 12c0-1.5 1-3 3-3h34c2 0 3 1.5 3 3l-20 10L4 12z" fill="white" opacity="0.2" />
        {/* Paper inside hint */}
        <rect x="12" y="26" width="24" height="2" rx="1" fill="white" opacity="0.3" />
        <rect x="16" y="30" width="16" height="2" rx="1" fill="white" opacity="0.2" />
        {/* @ symbol suggestion */}
        <circle cx="24" cy="20" r="4" fill="white" opacity="0.9" />
        <text x="24" y="23" textAnchor="middle" fill="#10b981" fontSize="7" fontWeight="bold">@</text>
      </svg>
    ),
    github: (
      // GitHub icon
      <svg viewBox="0 0 48 48" className="w-full h-full drop-shadow-lg">
        <defs>
          <linearGradient id="githubBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#374151" />
            <stop offset="100%" stopColor="#1f2937" />
          </linearGradient>
        </defs>
        <circle cx="24" cy="24" r="20" fill="url(#githubBg)" />
        <path d="M24 8C15.16 8 8 15.16 8 24c0 7.08 4.58 13.08 10.94 15.18.8.14 1.1-.34 1.1-.76 0-.38-.02-1.64-.02-2.98-4.02.74-5.06-1.02-5.38-1.96-.18-.46-.96-1.88-1.64-2.26-.56-.3-1.36-1.04-.02-1.06 1.26-.02 2.16 1.16 2.46 1.64 1.44 2.42 3.74 1.74 4.66 1.32.14-1.04.56-1.74 1.02-2.14-3.56-.4-7.28-1.78-7.28-7.9 0-1.74.62-3.18 1.64-4.3-.16-.4-.72-2.04.16-4.24 0 0 1.34-.42 4.4 1.64 1.28-.36 2.64-.54 4-.54s2.72.18 4 .54c3.06-2.08 4.4-1.64 4.4-1.64.88 2.2.32 3.84.16 4.24 1.02 1.12 1.64 2.54 1.64 4.3 0 6.14-3.74 7.5-7.3 7.9.58.5 1.08 1.46 1.08 2.96 0 2.14-.02 3.86-.02 4.4 0 .42.28.92 1.1.76C35.42 37.08 40 31.06 40 24c0-8.84-7.16-16-16-16z" fill="white" />
      </svg>
    ),
    linkedin: (
      // LinkedIn icon
      <svg viewBox="0 0 48 48" className="w-full h-full drop-shadow-lg">
        <defs>
          <linearGradient id="linkedinBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0077b5" />
            <stop offset="100%" stopColor="#005885" />
          </linearGradient>
        </defs>
        <rect x="4" y="4" width="40" height="40" rx="8" fill="url(#linkedinBg)" />
        <rect x="4" y="4" width="40" height="15" rx="8" fill="white" opacity="0.1" />
        <path d="M14 20h4v14h-4V20zm2-6.5c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5 1.1-2.5 2.5-2.5zm6 6.5h4v2c.6-1.2 2.2-2.5 4.5-2.5 4.8 0 5.5 3.2 5.5 7.3V34h-4v-6.5c0-1.6 0-3.5-2.2-3.5s-2.5 1.7-2.5 3.4V34h-4V20h-.3z" fill="white" />
      </svg>
    ),
    resume: (
      // Resume/CV icon
      <svg viewBox="0 0 48 48" className="w-full h-full drop-shadow-lg">
        <defs>
          <linearGradient id="resumeBg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#b91c1c" />
          </linearGradient>
        </defs>
        {/* Document */}
        <path d="M12 4h18l10 10v30c0 2-1.5 3.5-3.5 3.5h-24.5c-2 0-3.5-1.5-3.5-3.5v-36.5c0-2 1.5-3.5 3.5-3.5z" fill="white" />
        {/* Folded corner */}
        <path d="M30 4v10h10" fill="#e5e7eb" />
        <path d="M30 4l10 10h-7c-1.5 0-3-1.5-3-3v-7z" fill="#f3f4f6" />
        {/* PDF badge */}
        <rect x="6" y="28" width="20" height="12" rx="2" fill="url(#resumeBg)" />
        <text x="16" y="37" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">PDF</text>
        {/* Document lines */}
        <rect x="16" y="16" width="16" height="2" rx="1" fill="#d1d5db" />
        <rect x="16" y="20" width="20" height="1.5" rx="0.5" fill="#e5e7eb" />
        <rect x="16" y="23" width="14" height="1.5" rx="0.5" fill="#e5e7eb" />
      </svg>
    ),
  };

  return <>{icons[name] || icons.folder}</>;
}
