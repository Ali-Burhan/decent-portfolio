import { Metadata } from "next";
import { HomePageClient } from "@/components/home-page-client";
import { SeoContent } from "@/components/seo-content";
import { SITE_URL } from "@/lib/site";
import portfolioData from "@/data/portfolio.json";

export const metadata: Metadata = {
  metadataBase: new URL("https://aliburhan.com"),
  title: "Ali Burhan | Full Stack Engineer | Next.js • Python • AWS • AI",
  description:
    "Ali Burhan is a Full Stack Engineer with 3+ years experience. Expert in Next.js, React, Python, AWS & AI. Building scalable solutions serving 1,000+ sites globally from Lahore, Pakistan.",
  keywords: [
    "Ali Burhan",
    "Full Stack Engineer",
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "Python Developer",
    "AWS Developer",
    "AI Engineer",
    "LangChain",
    "RAG Developer",
    "LLM Developer",
    "Software Engineer",
    "Lahore Developer",
    "Pakistan Developer",
    "Web Developer",
    "Cloud Engineer",
  ],
  authors: [{ name: "Ali Burhan", url: "https://aliburhan.com" }],
  creator: "Ali Burhan",
  publisher: "Ali Burhan",
  alternates: {
    canonical: "https://aliburhan.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aliburhan.com",
    siteName: "Ali Burhan Portfolio",
    title: "Ali Burhan | Full Stack Engineer | Next.js • Python • AWS • AI",
    description:
      "Ali Burhan is a Full Stack Engineer with 3+ years experience. Expert in Next.js, React, Python, AWS & AI. Building scalable solutions serving 1,000+ sites globally.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@aliburhan_dev",
    creator: "@aliburhan_dev",
    title: "Ali Burhan | Full Stack Engineer | Next.js • Python • AWS • AI",
    description:
      "Ali Burhan is a Full Stack Engineer with 3+ years experience. Expert in Next.js, React, Python, AWS & AI.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function Home() {
  const { personalInfo, socialLinks } = portfolioData;

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personalInfo.name,
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image`,
    jobTitle: personalInfo.role,
    worksFor: {
      "@type": "Organization",
      name: "Hashlogics",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lahore",
      addressCountry: "Pakistan",
    },
    email: personalInfo.email,
    telephone: personalInfo.phone.replace(/\s/g, ""),
    sameAs: [socialLinks.github, socialLinks.linkedin, SITE_URL],
    knowsAbout: [
      "Next.js",
      "React",
      "Python",
      "AWS",
      "LangChain",
      "AI Development",
      "Full Stack Development",
      "Cloud Architecture",
    ],
    description: personalInfo.description,
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "University of Engineering and Technology (UET) Lahore",
    },
  };

  const professionalJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${personalInfo.name} — ${personalInfo.role}`,
    url: SITE_URL,
    description: personalInfo.description,
    areaServed: "Worldwide",
    address: {
      "@type": "PostalAddress",
      addressLocality: personalInfo.location,
      addressCountry: "PK",
    },
    email: personalInfo.email,
    telephone: personalInfo.phone.replace(/\s/g, ""),
  };

  const webSiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Ali Burhan Portfolio",
    url: SITE_URL,
    description:
      "Full Stack Engineer specializing in Next.js, React, Python, AWS & AI",
    inLanguage: ["en", "es", "fr"],
    publisher: {
      "@type": "Person",
      name: personalInfo.name,
      url: SITE_URL,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <SeoContent />
      <HomePageClient />
    </>
  );
}
