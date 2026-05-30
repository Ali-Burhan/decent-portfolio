"use client";

import { usePathname, useRouter } from "next/navigation";
import { LayoutGrid, ScrollText } from "lucide-react";
import { motion } from "framer-motion";
import { useViewMode, type ViewMode } from "@/lib/view-mode";
import { cn } from "@/lib/utils";

/** Hardcoded until full i18n rollout — recruiter-facing copy must stay exact. */
const COPY = {
  recruiterView: "Recruiter View",
  desktopView: "Desktop View",
  switchToRecruiter:
    "Switch to Recruiter View — single-page scroll layout for hiring managers",
  switchToDesktop: "Switch to Desktop View — interactive portfolio desktop",
} as const;

type Variant = "hero" | "nav";

interface ViewModeToggleProps {
  variant?: Variant;
  className?: string;
}

export function ViewModeToggle({ variant = "nav", className }: ViewModeToggleProps) {
  const { mode, setMode, ready } = useViewMode();
  const pathname = usePathname();
  const router = useRouter();

  if (!ready) return null;

  const target: ViewMode = mode === "desktop" ? "recruiter" : "desktop";
  const isRecruiterCta = target === "recruiter";
  const label = isRecruiterCta ? COPY.recruiterView : COPY.desktopView;
  const ariaLabel = isRecruiterCta ? COPY.switchToRecruiter : COPY.switchToDesktop;

  const handleClick = () => {
    setMode(target);
    if (pathname !== "/") {
      router.push("/");
    }
  };

  const isHero = variant === "hero";

  const recruiterCtaClass = isHero
    ? cn(
        "recruiter-view-cta",
        "border-[#fcd34d] bg-[#f59e0b] text-white shadow-lg shadow-amber-500/40",
        "hover:bg-[#fbbf24] hover:border-[#fde68a]",
        "px-4 py-2.5 text-[11px] md:px-5 md:text-xs"
      )
    : cn(
        "recruiter-view-cta",
        "border-[#d97706] bg-[#f59e0b] !text-white shadow-md shadow-amber-500/35",
        "hover:bg-[#fbbf24] hover:border-[#f59e0b]",
        "dark:border-[#fcd34d] dark:bg-[#fbbf24] dark:!text-[#0f172a] dark:hover:bg-[#fcd34d]",
        "px-4 py-2.5 text-xs"
      );

  const desktopViewClass = isHero
    ? "border-white/30 bg-white/15 !text-white hover:bg-white/25 px-3.5 py-2.5 text-[11px] md:px-4 md:text-xs"
    : cn(
        "border-foreground/20 bg-foreground/5 !text-foreground hover:bg-foreground/10",
        "dark:border-white/25 dark:bg-white/10 dark:!text-white dark:hover:bg-white/20",
        "px-4 py-2.5 text-xs"
      );

  const iconClass = isRecruiterCta
    ? isHero
      ? "text-white"
      : "text-white dark:text-[#0f172a]"
    : isHero
      ? "text-white"
      : "text-current";

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      aria-label={ariaLabel}
      title={ariaLabel}
      animate={
        isRecruiterCta
          ? {
              scale: [1, 1.06, 1],
              y: [0, -3, 0],
            }
          : { scale: 1, y: 0 }
      }
      transition={
        isRecruiterCta
          ? {
              duration: 1.4,
              repeat: Infinity,
              ease: "easeInOut",
            }
          : { duration: 0.2 }
      }
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg border-2 font-bold transition-colors",
        isRecruiterCta ? recruiterCtaClass : desktopViewClass,
        className
      )}
    >
      {isRecruiterCta && (
        <span
          className="pointer-events-none absolute inset-0 rounded-lg border-2 border-[#fde68a]/90 recruiter-view-cta-ring dark:border-[#fef3c7]/80"
          aria-hidden
        />
      )}
      {isRecruiterCta ? (
        <ScrollText className={cn("relative z-10 h-3.5 w-3.5 shrink-0", iconClass)} aria-hidden />
      ) : (
        <LayoutGrid className={cn("relative z-10 h-3.5 w-3.5 shrink-0", iconClass)} aria-hidden />
      )}
      <span className={cn("relative z-10 whitespace-nowrap", isRecruiterCta && iconClass)}>
        {label}
      </span>
    </motion.button>
  );
}
