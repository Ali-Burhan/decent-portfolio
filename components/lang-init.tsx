"use client";

import { useEffect } from "react";
import { LOCALE_COOKIE, isLocale } from "@/lib/i18n-messages";

/** Syncs saved locale to document lang on first paint (SEO + a11y). */
export function LangInit() {
  useEffect(() => {
    const saved = localStorage.getItem(LOCALE_COOKIE);
    if (isLocale(saved)) {
      document.documentElement.lang = saved;
    }
  }, []);
  return null;
}
