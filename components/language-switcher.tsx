"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n, Locale } from "@/lib/i18n";

const locales: { code: Locale; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
  { code: "fr", label: "FR" },
];

export function LanguageSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) return null;

  const current = locales.find((l) => l.code === locale) ?? locales[0];

  const handleSelect = (code: Locale) => {
    setLocale(code);
    setOpen(false);
  };

  return (
    <div className="relative" aria-label="Language selector">
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium bg-foreground/5 border border-foreground/10 text-foreground/70 hover:bg-foreground/10 hover:text-foreground transition-colors"
      >
        <span>{current.label}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="inline-block text-[10px]"
        >
          ▼
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-1 w-24 rounded-md bg-background/95 border border-foreground/10 shadow-lg backdrop-blur-md z-50"
          >
            {locales.map((item) => (
              <button
                key={item.code}
                onClick={() => handleSelect(item.code)}
                className={`flex w-full items-center justify-between px-3 py-1.5 text-xs transition-colors ${
                  locale === item.code
                    ? "bg-accent/10 text-accent"
                    : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
                }`}
              >
                <span>{item.label}</span>
                {locale === item.code && (
                  <span className="text-[10px]">●</span>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
