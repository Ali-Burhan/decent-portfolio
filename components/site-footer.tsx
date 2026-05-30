"use client";

import Link from "next/link";
import { Mail, Phone, Download, MapPin } from "lucide-react";
import portfolioData from "@/data/portfolio.json";
import { RESUME_FILENAME, RESUME_PATH, SITE_URL } from "@/lib/site";
import { portfolioCtaStyle } from "@/lib/portfolio-cta-styles";
import { useI18n } from "@/lib/i18n";

export function SiteFooter() {
  const { personalInfo, socialLinks } = portfolioData;
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-foreground/10 bg-foreground/[0.02]"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-6xl px-6 py-10 md:py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-lg font-bold text-foreground">{personalInfo.name}</p>
            <p className="mt-1 text-sm text-foreground/60">{personalInfo.role}</p>
            <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-foreground/50">
              <MapPin className="h-4 w-4 shrink-0" aria-hidden />
              {personalInfo.location}
            </p>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-foreground/50">
              {t("footer.contact")}
            </h2>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors"
                  aria-label={`Email ${personalInfo.email}`}
                >
                  <Mail className="h-4 w-4 shrink-0" aria-hidden />
                  {personalInfo.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${personalInfo.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors"
                  aria-label={`Call ${personalInfo.phone}`}
                >
                  <Phone className="h-4 w-4 shrink-0" aria-hidden />
                  {personalInfo.phone}
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3 md:items-start lg:items-end">
            <a
              href={RESUME_PATH}
              download={RESUME_FILENAME}
              style={portfolioCtaStyle.lg}
              className="shrink-0 rounded-lg bg-accent text-sm text-white shadow-md shadow-accent/25 hover:brightness-105 transition-all"
            >
              <Download className="h-4 w-4 shrink-0" aria-hidden />
              {t("nav.downloadResume")}
            </a>
            <Link
              href="/contact"
              style={portfolioCtaStyle.lg}
              className="shrink-0 rounded-lg border border-foreground/15 bg-foreground/5 text-sm text-foreground hover:border-accent/40 transition-colors"
            >
              {t("hero.hireMe")}
            </Link>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-foreground/10 pt-6 text-xs text-foreground/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {personalInfo.name}. {t("footer.rights")}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              GitHub
            </a>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              LinkedIn
            </a>
            <Link href={SITE_URL} className="hover:text-accent transition-colors">
              {t("nav.home")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
