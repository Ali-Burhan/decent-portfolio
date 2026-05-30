"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
  ReactNode,
} from "react";
import {
  type Locale,
  LOCALE_COOKIE,
  isLocale,
  translate,
} from "@/lib/i18n-messages";

export type { Locale } from "@/lib/i18n-messages";

interface I18nContextValue {
  locale: Locale;
  t: (key: string) => string;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

const localeListeners = new Set<() => void>();

function subscribeLocale(onStoreChange: () => void) {
  localeListeners.add(onStoreChange);
  return () => {
    localeListeners.delete(onStoreChange);
  };
}

function notifyLocaleChange() {
  localeListeners.forEach((listener) => listener());
}

function readStoredLocale(fallback: Locale): Locale {
  const saved = localStorage.getItem(LOCALE_COOKIE);
  return isLocale(saved) ? saved : fallback;
}

function setLocaleCookie(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`;
}

export function I18nProvider({
  children,
  initialLocale = "en",
}: {
  children: ReactNode;
  initialLocale?: Locale;
}) {
  const locale = useSyncExternalStore(
    subscribeLocale,
    () => readStoredLocale(initialLocale),
    () => initialLocale
  );

  useEffect(() => {
    document.documentElement.lang = locale;
    localStorage.setItem(LOCALE_COOKIE, locale);
    setLocaleCookie(locale);
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    localStorage.setItem(LOCALE_COOKIE, next);
    document.documentElement.lang = next;
    setLocaleCookie(next);
    notifyLocaleChange();
  }, []);

  const t = useCallback((key: string): string => translate(locale, key), [locale]);

  return (
    <I18nContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return ctx;
}
