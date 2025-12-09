"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { throttle } from "@/lib/utils";

const accents = [
  { name: "Visionary", value: "visionary", color: "#FF6B6B" },
  { name: "Depth Seeker", value: "depth-seeker", color: "#00ADB5" },
  { name: "Subtle Luxe", value: "subtle-luxe", color: "#B388FF" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [accentDropdownOpen, setAccentDropdownOpen] = useState(false);
  const [activeAccent, setActiveAccent] = useState("visionary");

  useEffect(() => {
    setMounted(true);
    const savedAccent = localStorage.getItem("accent") || "visionary";
    setActiveAccent(savedAccent);
    document.body.setAttribute("data-accent", savedAccent);

    // Time-based theming logic
    const checkTimeBasedTheme = () => {
      const savedTheme = localStorage.getItem("theme");
      // Only apply time-based theme if user hasn't manually set a preference (or explicitly set to system)
      if (!savedTheme || savedTheme === "system") {
        const hour = new Date().getHours();
        // Dark mode from 6 PM (18:00) to 9 AM (09:00)
        const isDarkTime = hour >= 18 || hour < 9;
        setTheme(isDarkTime ? "dark" : "light");
      }
    };
    
    checkTimeBasedTheme();

    // Throttled scroll handler for better performance
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    const throttledScroll = throttle(handleScroll, 100);
    
    window.addEventListener("scroll", throttledScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [setTheme]);

  const handleAccentChange = (accent: string) => {
    setActiveAccent(accent);
    localStorage.setItem("accent", accent);
    document.body.setAttribute("data-accent", accent);
    setAccentDropdownOpen(false);
  };

  const links = [
    { name: "Home", href: "#home", id: "home" },
    { name: "About", href: "#about", id: "about" },
    { name: "Experience", href: "#experience", id: "experience" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  if (!mounted) return null;

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-foreground/10 shadow-lg shadow-accent/5"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.a
              href="#home"
              className="relative z-50 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <span className="text-2xl font-bold bg-gradient-to-r from-accent via-accent/80 to-accent/50 bg-clip-text text-transparent">
                  AB
                </span>
                <motion.div
                  className="absolute -inset-2 bg-gradient-to-r from-accent/20 to-accent/10 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  layoutId="logo-glow"
                />
              </div>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {links.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setActiveLink(link.id)}
                  className="relative px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-300 group"
                >
                  {link.name}
                  
                  {/* Hover Effect */}
                  <motion.span
                    className="absolute inset-0 bg-foreground/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    layoutId="nav-hover"
                  />
                  
                  {/* Active Indicator */}
                  {activeLink === link.id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              ))}
            </div>

            {/* CTA Button & Theme Controls */}
            <div className="hidden md:flex items-center gap-3">
              {/* Accent Switcher */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setAccentDropdownOpen(!accentDropdownOpen)}
                  className="p-2 rounded-lg bg-foreground/5 backdrop-blur-sm border border-foreground/10 hover:bg-foreground/10 transition-all duration-300 text-foreground/70 hover:text-foreground"
                  aria-label="Change accent color"
                >
                  <div className="w-5 h-5 rounded-full border-2 border-current" style={{ backgroundColor: accents.find(a => a.value === activeAccent)?.color }}></div>
                </motion.button>

                <AnimatePresence>
                  {accentDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-foreground/10 bg-background/90 backdrop-blur-xl p-2 shadow-xl"
                    >
                      {accents.map((accent) => (
                        <button
                          key={accent.value}
                          onClick={() => handleAccentChange(accent.value)}
                          className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-foreground/5 ${
                            activeAccent === accent.value ? "bg-accent/10 text-accent font-medium" : "text-foreground/70"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className="h-3 w-3 rounded-full shadow-[0_0_10px_currentColor]"
                              style={{ backgroundColor: accent.color, color: accent.color }}
                            />
                            {accent.name}
                          </div>
                          {activeAccent === accent.value && (
                             <motion.svg
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </motion.svg>
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.05, rotate: 180 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="p-2 rounded-lg bg-foreground/5 backdrop-blur-sm border border-foreground/10 hover:bg-foreground/10 transition-all duration-300 text-foreground/70 hover:text-foreground"
                aria-label="Toggle theme"
              >
                {theme === "light" ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </motion.button>

              {/* Resume/CTA Button */}
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-6 py-2.5 bg-accent rounded-lg text-white font-semibold text-sm overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Resume
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden relative z-50 p-2 rounded-lg bg-foreground/5 backdrop-blur-sm border border-foreground/10 text-foreground"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <motion.span
                  animate={mobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                  className="w-full h-0.5 bg-current rounded-full"
                />
                <motion.span
                  animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-full h-0.5 bg-current rounded-full"
                />
                <motion.span
                  animate={mobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                  className="w-full h-0.5 bg-current rounded-full"
                />
              </div>
            </motion.button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden"
              />

              {/* Menu Panel */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-background/95 backdrop-blur-xl border-l border-foreground/10 md:hidden"
              >
                <div className="flex flex-col h-full p-8 pt-24">
                  {/* Mobile Links */}
                  <div className="flex flex-col gap-2">
                    {links.map((link, index) => (
                      <motion.a
                        key={link.id}
                        href={link.href}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => {
                          setActiveLink(link.id);
                          setMobileMenuOpen(false);
                        }}
                        className="group relative px-6 py-4 text-lg font-medium text-foreground/80 hover:text-foreground transition-colors duration-300 rounded-xl overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center justify-between">
                          {link.name}
                          <motion.svg
                            className="w-5 h-5"
                            initial={{ x: -5, opacity: 0 }}
                            whileHover={{ x: 0, opacity: 1 }}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </motion.svg>
                        </span>
                        <motion.div
                          className="absolute inset-0 bg-accent/10"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                        {activeLink === link.id && (
                          <motion.div
                            layoutId="mobile-active"
                            className="absolute left-0 top-0 bottom-0 w-1 bg-accent"
                          />
                        )}
                      </motion.a>
                    ))}
                  </div>

                  {/* Mobile Controls */}
                  <div className="mt-auto space-y-4">
                    <div className="flex gap-3">
                      <button
                        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                        className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-foreground/5 border border-foreground/10 text-foreground/80 hover:bg-foreground/10 transition-colors"
                      >
                        {theme === "light" ? (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                            <span>Light Mode</span>
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                            <span>Dark Mode</span>
                          </>
                        )}
                      </button>
                      
                      {/* Mobile Accent Toggle (Simplified) */}
                      <button
                        onClick={() => {
                          const nextIndex = (accents.findIndex(a => a.value === activeAccent) + 1) % accents.length;
                          handleAccentChange(accents[nextIndex].value);
                        }}
                        className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-foreground/5 border border-foreground/10 text-foreground/80 hover:bg-foreground/10 transition-colors"
                      >
                         <span
                            className="h-3 w-3 rounded-full shadow-[0_0_10px_currentColor]"
                            style={{ backgroundColor: accents.find(a => a.value === activeAccent)?.color, color: accents.find(a => a.value === activeAccent)?.color }}
                          />
                        <span>Color</span>
                      </button>
                    </div>

                    <motion.a
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      href="#contact"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block w-full px-6 py-4 bg-accent rounded-xl text-white font-semibold text-center hover:shadow-lg hover:shadow-accent/50 transition-all duration-300"
                    >
                      Download Resume
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer for fixed navbar */}
      <div className="h-20" />
    </>
  );
}