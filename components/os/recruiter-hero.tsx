"use client";

import { forwardRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Download, Briefcase, Github, Linkedin, ChevronDown, ChevronUp } from "lucide-react";
import portfolioData from "@/data/portfolio.json";
import { RESUME_FILENAME, RESUME_PATH } from "@/lib/site";
import { PROFILE_IMAGE } from "@/lib/site";
import { useI18n } from "@/lib/i18n";
import { ViewModeToggle } from "@/components/view-mode-toggle";
import { portfolioCtaStyle } from "@/lib/portfolio-cta-styles";

interface RecruiterHeroProps {
  onContact: () => void;
  onOpenProjects?: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const RecruiterHero = forwardRef<HTMLElement, RecruiterHeroProps>(function RecruiterHero(
  {
    onContact,
    onOpenProjects,
    collapsed = false,
    onToggleCollapse,
  },
  ref
) {
  const { t } = useI18n();
  const { personalInfo, socialLinks } = portfolioData;

  return (
    <header
      ref={ref}
      id="os-recruiter-hero"
      className="pointer-events-auto w-full"
      role="banner"
      aria-label="Professional summary"
    >
      <div
        className="mx-2 md:mx-4 mt-2 md:mt-3 rounded-xl border border-white/15 dark:border-white/10 shadow-lg backdrop-blur-xl"
        style={{
          background: "rgba(15, 23, 42, 0.92)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
        }}
      >
        <div className={`px-4 md:px-6 ${collapsed ? "py-3" : "py-3.5 md:py-4"}`}>
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/20 md:h-11 md:w-11">
              <Image
                src={PROFILE_IMAGE}
                alt={personalInfo.name}
                fill
                className="object-cover"
                sizes="44px"
                priority
              />
            </div>

            <div className="min-w-0 flex-1 basis-[140px]">
              <h1 className="truncate text-sm font-bold text-white md:text-base">
                {personalInfo.name}
              </h1>
              <p className="truncate text-xs font-medium text-sky-300/90 md:text-sm">
                {personalInfo.role}
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-2 order-3 w-full sm:order-none sm:ml-auto sm:w-auto">
              <ViewModeToggle variant="hero" className="shrink-0" />
              <a
                href={RESUME_PATH}
                download={RESUME_FILENAME}
                style={portfolioCtaStyle.compact}
                className="shrink-0 rounded-lg bg-emerald-500 font-bold text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 transition-colors"
                aria-label={t("nav.downloadResume")}
              >
                <Download className="h-4 w-4 shrink-0" aria-hidden />
                <span>{t("nav.downloadResume")}</span>
              </a>
              <button
                type="button"
                onClick={onContact}
                style={portfolioCtaStyle.compact}
                className="shrink-0 rounded-lg bg-sky-500 font-bold text-white shadow-lg shadow-sky-500/25 hover:bg-sky-400 transition-colors"
                aria-label={t("hero.hireMe")}
              >
                <Briefcase className="h-4 w-4 shrink-0" aria-hidden />
                <span>{t("hero.hireMe")}</span>
              </button>
            </div>

            {onToggleCollapse && (
              <button
                type="button"
                onClick={onToggleCollapse}
                className="order-2 shrink-0 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white sm:order-none"
                aria-expanded={!collapsed}
                aria-label={collapsed ? t("hero.expand") : t("hero.collapse")}
              >
                {collapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
              </button>
            )}
          </div>

          {!collapsed && (
            <>
              <p className="mt-2 text-[10px] text-slate-400 md:text-xs">
                {personalInfo.location} · {personalInfo.availability}
              </p>
              <p className="mt-1 text-[10px] font-medium text-slate-300 md:text-xs">
                {t("hero.metricSites")} · {t("hero.metricCost")}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-white/10 pt-3">
                {onOpenProjects && (
                  <button
                    type="button"
                    onClick={onOpenProjects}
                    className="hidden px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:bg-white/10 sm:inline-flex rounded-lg border border-white/20"
                  >
                    {t("hero.quickView")}
                  </button>
                )}
                <Link
                  href="/projects"
                  className="hidden rounded-lg border border-white/20 px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:bg-white/10 md:inline-flex"
                >
                  {t("hero.caseStudies")}
                </Link>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="rounded-lg px-2 py-1 text-[10px] text-slate-400 transition-colors hover:text-white md:text-xs"
                  aria-label={`Email ${personalInfo.email}`}
                >
                  {personalInfo.email}
                </a>
                <div className="ml-auto flex items-center gap-1">
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
                    aria-label="GitHub"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
});
