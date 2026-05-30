export type Locale = "en" | "es" | "fr";

export const LOCALE_COOKIE = "locale";

type Messages = Record<string, string>;

type AllMessages = Record<Locale, Messages>;

export const messages: AllMessages = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "nav.now": "Now",
    "nav.resume": "Resume",
    "nav.downloadResume": "Download Resume",
    "nav.searchPlaceholder": "Search skills, projects, experience...",

    "viewMode.desktop": "Desktop view",
    "viewMode.recruiter": "Recruiter view",
    "viewMode.switchToRecruiter": "Switch to scroll layout for recruiters",
    "viewMode.switchToDesktop": "Switch to desktop layout",

    "hero.greetingPrefix": "Hi, I'm",
    "hero.viewMyWork": "View My Work",
    "hero.letsTalk": "Let's Talk",
    "hero.scroll": "Scroll",
    "hero.metricSites": "1,000+ production sites",
    "hero.metricCost": "30% infrastructure cost reduction",
    "hero.contact": "Contact",
    "hero.hireMe": "Hire Me",
    "hero.quickView": "Open all sections",
    "hero.caseStudies": "Case studies",
    "hero.expand": "Expand summary",
    "hero.collapse": "Collapse summary",
    "hero.role": "Full Stack Engineer",

    "about.title": "About Me",
    "about.techIntro": "Here are a few technologies I've been working with recently:",

    "experience.title": "Where I've Worked",

    "projects.title": "Some Things I've Built",

    "contact.sectionPrefix": "04. What's Next?",
    "contact.title": "Let's Connect!",
    "contact.subtitle":
      "Choose your favorite way to reach out. Hover over the orbiting links or use the form below!",

    "contact.linkedIn": "LinkedIn",
    "contact.github": "GitHub",
    "contact.twitter": "Twitter",
    "contact.email": "Email",

    "lang.en": "English",
    "lang.es": "Spanish",
    "lang.fr": "French",

    "footer.contact": "Contact",
    "footer.rights": "All rights reserved.",
  },
  es: {
    "nav.home": "Inicio",
    "nav.about": "Sobre mí",
    "nav.experience": "Experiencia",
    "nav.projects": "Proyectos",
    "nav.contact": "Contacto",
    "nav.now": "Ahora",
    "nav.resume": "Currículum",
    "nav.downloadResume": "Descargar currículum",
    "nav.searchPlaceholder": "Buscar habilidades, proyectos, experiencia...",

    "viewMode.desktop": "Vista escritorio",
    "viewMode.recruiter": "Vista reclutador",
    "viewMode.switchToRecruiter": "Cambiar a diseño desplazable para reclutadores",
    "viewMode.switchToDesktop": "Cambiar a diseño de escritorio",

    "hero.greetingPrefix": "Hola, soy",
    "hero.viewMyWork": "Ver mi trabajo",
    "hero.letsTalk": "Hablemos",
    "hero.scroll": "Desplazar",
    "hero.metricSites": "1.000+ sitios en producción",
    "hero.metricCost": "30% de reducción de costos en infraestructura",
    "hero.contact": "Contacto",
    "hero.hireMe": "Contrátame",
    "hero.quickView": "Abrir todas las secciones",
    "hero.caseStudies": "Casos de estudio",
    "hero.expand": "Expandir resumen",
    "hero.collapse": "Contraer resumen",
    "hero.role": "Ingeniero Full Stack",

    "about.title": "Sobre mí",
    "about.techIntro": "Estas son algunas tecnologías con las que he estado trabajando recientemente:",

    "experience.title": "Dónde he trabajado",

    "projects.title": "Algunas cosas que he construido",

    "contact.sectionPrefix": "04. ¿Qué sigue?",
    "contact.title": "¡Conectemos!",
    "contact.subtitle":
      "Elige tu forma favorita de contactarme. Pasa el cursor por los enlaces en órbita o usa el formulario de abajo.",

    "contact.linkedIn": "LinkedIn",
    "contact.github": "GitHub",
    "contact.twitter": "Twitter",
    "contact.email": "Correo",

    "lang.en": "Inglés",
    "lang.es": "Español",
    "lang.fr": "Francés",

    "footer.contact": "Contacto",
    "footer.rights": "Todos los derechos reservados.",
  },
  fr: {
    "nav.home": "Accueil",
    "nav.about": "À propos",
    "nav.experience": "Expérience",
    "nav.projects": "Projets",
    "nav.contact": "Contact",
    "nav.now": "Maintenant",
    "nav.resume": "CV",
    "nav.downloadResume": "Télécharger le CV",
    "nav.searchPlaceholder": "Rechercher des compétences, projets, expériences...",

    "viewMode.desktop": "Vue bureau",
    "viewMode.recruiter": "Vue recruteur",
    "viewMode.switchToRecruiter": "Passer à la mise en page défilante pour recruteurs",
    "viewMode.switchToDesktop": "Passer à la mise en page bureau",

    "hero.greetingPrefix": "Salut, je suis",
    "hero.viewMyWork": "Voir mon travail",
    "hero.letsTalk": "Discutons",
    "hero.scroll": "Faire défiler",
    "hero.metricSites": "1 000+ sites en production",
    "hero.metricCost": "30 % de réduction des coûts d'infrastructure",
    "hero.contact": "Contact",
    "hero.hireMe": "M'embaucher",
    "hero.quickView": "Ouvrir toutes les sections",
    "hero.caseStudies": "Études de cas",
    "hero.expand": "Développer le résumé",
    "hero.collapse": "Réduire le résumé",
    "hero.role": "Ingénieur Full Stack",

    "about.title": "À propos de moi",
    "about.techIntro": "Voici quelques technologies que j'utilise récemment :",

    "experience.title": "Où j'ai travaillé",

    "projects.title": "Quelques projets que j'ai réalisés",

    "contact.sectionPrefix": "04. Et ensuite ?",
    "contact.title": "Restons en contact !",
    "contact.subtitle":
      "Choisissez votre moyen préféré pour me contacter. Survolez les liens en orbite ou utilisez le formulaire ci-dessous.",

    "contact.linkedIn": "LinkedIn",
    "contact.github": "GitHub",
    "contact.twitter": "Twitter",
    "contact.email": "Email",

    "lang.en": "Anglais",
    "lang.es": "Espagnol",
    "lang.fr": "Français",

    "footer.contact": "Contact",
    "footer.rights": "Tous droits réservés.",
  },
};

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "en" || value === "es" || value === "fr";
}

export function translate(locale: Locale, key: string): string {
  const bundle = messages[locale] ?? messages.en;
  return bundle[key] ?? messages.en[key] ?? key;
}

export function parseLocaleCookie(value: string | null | undefined): Locale {
  return isLocale(value) ? value : "en";
}
