import type { Metadata } from "next";
import { ExperienceContent } from "@/components/experience-content";

export const metadata: Metadata = {
  title: "Experience | Ali Burhan - Full Stack Developer Portfolio",
  description:
    "Ali Burhan's professional experience: Software Engineer at Hashlogics building microservices platforms serving 1000+ sites, and Associate Engineer at Techling. Expert in Next.js, Python, AWS, LangChain & AI development.",
  keywords: [
    "Ali Burhan Experience",
    "Hashlogics Software Engineer",
    "Techling Associate Engineer",
    "Full Stack Developer Experience",
    "AWS Developer Experience",
    "Python Developer Experience",
    "Next.js Developer Experience",
    "Software Engineer Pakistan",
    "Work Experience Lahore",
  ],
  authors: [{ name: "Ali Burhan", url: "https://aliburhan.com" }],
  alternates: {
    canonical: "https://aliburhan.com/experience",
  },
  openGraph: {
    title: "Experience - Ali Burhan | Full Stack Developer Portfolio",
    description:
      "Ali Burhan's professional experience: Software Engineer at Hashlogics building microservices platforms serving 1000+ sites, and Associate Engineer at Techling.",
    url: "https://aliburhan.com/experience",
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Experience - Ali Burhan Portfolio",
    description:
      "Ali Burhan's professional experience: Software Engineer at Hashlogics building microservices platforms serving 1000+ sites globally.",
    images: ["/og-image.png"],
  },
};

export default function ExperiencePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Ali Burhan - Professional Experience",
    description: "Professional experience of Ali Burhan as Full Stack Developer & Architect",
    url: "https://aliburhan.com/experience",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://aliburhan.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Experience",
        item: "https://aliburhan.com/experience",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ExperienceContent />
    </>
  );
}
