"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Locale = "en" | "es" | "fr";

type Messages = Record<string, string>;

type AllMessages = Record<Locale, Messages>;

const messages: AllMessages = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "nav.resume": "Resume",
    "nav.downloadResume": "Download Resume",

    "hero.greetingPrefix": "Hi, I'm",
    "hero.viewMyWork": "View My Work",
    "hero.letsTalk": "Let's Talk",
    "hero.scroll": "Scroll",

    "about.title": "About Me",
    "about.techIntro": "Here are a few technologies I've been working with recently:",

    "experience.title": "Where I've Worked",

    "projects.title": "Some Things I've Built",

    "contact.sectionPrefix": "04. What's Next?",
    "contact.title": "Let's Connect!",
    "contact.subtitle": "Choose your favorite way to reach out. Hover over the orbiting links or use the form below!",

    "contact.linkedIn": "LinkedIn",
    "contact.github": "GitHub",
    "contact.twitter": "Twitter",
    "contact.email": "Email",

    "lang.en": "English",
    "lang.es": "Spanish",
    "lang.fr": "French",
  },
  es: {
    "nav.home": "Inicio",
    "nav.about": "Sobre mí",
    "nav.experience": "Experiencia",
    "nav.projects": "Proyectos",
    "nav.contact": "Contacto",
    "nav.resume": "Currículum",
    "nav.downloadResume": "Descargar currículum",

    "hero.greetingPrefix": "Hola, soy",
    "hero.viewMyWork": "Ver mi trabajo",
    "hero.letsTalk": "Hablemos",
    "hero.scroll": "Desplazar",

    "about.title": "Sobre mí",
    "about.techIntro": "Estas son algunas tecnologías con las que he estado trabajando recientemente:",

    "experience.title": "Dónde he trabajado",

    "projects.title": "Algunas cosas que he construido",

    "contact.sectionPrefix": "04. ¿Qué sigue?",
    "contact.title": "¡Conectemos!",
    "contact.subtitle": "Elige tu forma favorita de contactarme. Pasa el cursor por los enlaces en órbita o usa el formulario de abajo.",

    "contact.linkedIn": "LinkedIn",
    "contact.github": "GitHub",
    "contact.twitter": "Twitter",
    "contact.email": "Correo",

    "lang.en": "Inglés",
    "lang.es": "Español",
    "lang.fr": "Francés",
  },
  fr: {
    "nav.home": "Accueil",
    "nav.about": "À propos",
    "nav.experience": "Expérience",
    "nav.projects": "Projets",
    "nav.contact": "Contact",
    "nav.resume": "CV",
    "nav.downloadResume": "Télécharger le CV",

    "hero.greetingPrefix": "Salut, je suis",
    "hero.viewMyWork": "Voir mon travail",
    "hero.letsTalk": "Discutons",
    "hero.scroll": "Faire défiler",

    "about.title": "À propos de moi",
    "about.techIntro": "Voici quelques technologies que j'utilise récemment :",

    "experience.title": "Où j'ai travaillé",

    "projects.title": "Quelques projets que j'ai réalisés",

    "contact.sectionPrefix": "04. Et ensuite ?",
    "contact.title": "Restons en contact !",
    "contact.subtitle": "Choisissez votre moyen préféré pour me contacter. Survolez les liens en orbite ou utilisez le formulaire ci-dessous.",

    "contact.linkedIn": "LinkedIn",
    "contact.github": "GitHub",
    "contact.twitter": "Twitter",
    "contact.email": "Email",

    "lang.en": "Anglais",
    "lang.es": "Espagnol",
    "lang.fr": "Français",
  },
};

interface I18nContextValue {
  locale: Locale;
  t: (key: string) => string;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? (localStorage.getItem("locale") as Locale | null) : null;
    if (saved && ["en", "es", "fr"].includes(saved)) {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    if (typeof window !== "undefined") {
      localStorage.setItem("locale", next);
      document.documentElement.lang = next;
    }
  };

  const t = (key: string): string => {
    const value = messages[locale][key] ?? messages["en"][key];
    return value ?? key;
  };

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
