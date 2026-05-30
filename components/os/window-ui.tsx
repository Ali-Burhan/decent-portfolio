"use client";

import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export const osMotion = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 380, damping: 28 },
    },
  },
};

export function OsWindowBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("os-window-content min-h-full p-5 md:p-6", className)}>
      {children}
    </div>
  );
}

export function OsSectionTitle({
  icon: Icon,
  children,
  className,
}: {
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2.5 mb-4", className)}>
      {Icon && (
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--os-accent-muted)] text-[var(--os-accent)]">
          <Icon className="h-4 w-4" aria-hidden />
        </span>
      )}
      <h2 className="text-sm font-semibold tracking-tight text-[var(--os-text-primary)]">
        {children}
      </h2>
      <div className="ml-1 h-px flex-1 bg-[var(--os-border)]" />
    </div>
  );
}

export function OsCard({
  children,
  className,
  hover = true,
  ...props
}: HTMLMotionProps<"div"> & { hover?: boolean }) {
  return (
    <motion.div
      whileHover={hover ? { y: -2 } : undefined}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={cn(
        "os-card rounded-xl p-4 md:p-5",
        hover && "os-card-hover",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function OsBadge({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: "default" | "accent" | "muted" | "success";
  className?: string;
}) {
  const variants = {
    default: "bg-[var(--os-surface-muted)] text-[var(--os-text-secondary)] border-[var(--os-border)]",
    accent: "bg-[var(--os-accent-muted)] text-[var(--os-accent)] border-[var(--os-accent)]/25",
    muted: "bg-transparent text-[var(--os-text-muted)] border-[var(--os-border)]",
    success: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/25",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

export function OsTag({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex rounded-md border border-[var(--os-border)] bg-[var(--os-surface-muted)] px-2 py-1 text-[11px] font-medium text-[var(--os-text-secondary)]",
        className
      )}
    >
      {children}
    </span>
  );
}

export function OsLabel({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-xs font-medium text-[var(--os-text-secondary)]"
    >
      {children}
    </label>
  );
}

export function OsInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "os-input w-full rounded-lg px-3.5 py-2.5 text-sm transition-shadow",
        props.className
      )}
    />
  );
}

export function OsTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        "os-input w-full resize-none rounded-lg px-3.5 py-2.5 text-sm transition-shadow",
        props.className
      )}
    />
  );
}

export function OsButton({
  children,
  variant = "primary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
}) {
  return (
    <button
      type="button"
      className={cn(
        variant === "primary" ? "os-btn-primary" : "os-btn-secondary",
        "rounded-lg px-4 py-2.5 text-sm font-semibold transition-all disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function OsLinkCard({
  href,
  icon: Icon,
  label,
  value,
  external,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  external?: boolean;
}) {
  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      whileHover={{ y: -2 }}
      className="os-card os-card-hover group flex items-center gap-3 rounded-xl p-4"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--os-accent-muted)] text-[var(--os-accent)]">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--os-text-muted)]">
          {label}
        </p>
        <p className="truncate text-sm font-medium text-[var(--os-text-primary)]">{value}</p>
      </div>
      <span className="text-[var(--os-text-muted)] opacity-0 transition-opacity group-hover:opacity-100">
        →
      </span>
    </motion.a>
  );
}
