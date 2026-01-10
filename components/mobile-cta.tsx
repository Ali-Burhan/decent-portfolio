"use client";

import React from "react";
import { motion } from "framer-motion";

interface MobileCTAProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  icon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export function MobileCTA({
  children,
  href,
  onClick,
  variant = "primary",
  icon,
  className = "",
  disabled = false,
}: MobileCTAProps) {
  const Component = href ? motion.a : motion.button;
  
  const baseStyles = `
    flex items-center justify-center gap-3
    w-full min-h-[52px] px-6 py-4
    rounded-2xl font-semibold text-base
    active:scale-95 transition-transform
    shadow-lg disabled:opacity-50 disabled:cursor-not-allowed
  `;
  
  const variantStyles = {
    primary: "bg-accent text-white shadow-accent/30 hover:shadow-accent/50",
    secondary: "bg-foreground/10 text-foreground border-2 border-foreground/20 hover:bg-foreground/20",
  };

  return (
    <Component
      href={href}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {icon && <span className="text-xl">{icon}</span>}
      <span>{children}</span>
    </Component>
  );
}

// Sticky Bottom CTA Bar - Optimized for thumb zone
export function StickyBottomCTA({ children }: { children: React.ReactNode }) {
  return (
    <div 
      className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-lg border-t border-foreground/10 md:hidden z-30 shadow-2xl"
      style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))' }}
    >
      {children}
    </div>
  );
}

// Floating Action Button - Bottom right corner
export function FloatingCTA({
  children,
  onClick,
  icon,
  label,
}: {
  children?: React.ReactNode;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 md:hidden z-40 w-14 h-14 rounded-full bg-accent text-white shadow-2xl shadow-accent/50 flex items-center justify-center"
      style={{ bottom: 'calc(1.5rem + env(safe-area-inset-bottom))' }}
      aria-label={label}
    >
      {icon}
      {children}
    </motion.button>
  );
}
