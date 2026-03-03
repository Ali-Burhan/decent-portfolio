import type { Metadata } from "next";
import { AboutContent } from "@/components/about-content";

export const metadata: Metadata = {
  title: "About | Ali Burhan - Full Stack Developer & Architect",
  description:
    "Learn about Ali Burhan, a Full Stack Developer & Architect from Lahore, Pakistan with 3+ years experience in Next.js, React, Python, AWS & AI. UET Lahore CS graduate building scalable cloud-native solutions.",
  keywords: [
    "Ali Burhan",
    "About Ali Burhan",
    "Full Stack Developer Pakistan",
    "Software Engineer Lahore",
    "Next.js Developer Pakistan",
    "AWS Developer Pakistan",
    "AI Engineer Pakistan",
    "UET Lahore",
    "Full Stack Architect",
  ],
  authors: [{ name: "Ali Burhan", url: "https://aliburhan.com" }],
  alternates: {
    canonical: "https://aliburhan.com/about",
  },
  openGraph: {
    title: "About Ali Burhan - Full Stack Developer & Architect",
    description:
      "Learn about Ali Burhan, a Full Stack Developer & Architect from Lahore, Pakistan with 3+ years experience in Next.js, React, Python, AWS & AI.",
    url: "https://aliburhan.com/about",
    type: "profile",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Ali Burhan - Full Stack Developer",
    description:
      "Learn about Ali Burhan, a Full Stack Developer & Architect from Lahore, Pakistan with 3+ years experience in Next.js, React, Python, AWS & AI.",
    images: ["/og-image.png"],
  },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateCreated: "2024-01-01",
    dateModified: new Date().toISOString().split("T")[0],
    mainEntity: {
      "@type": "Person",
      name: "Ali Burhan",
      jobTitle: "Full Stack Developer & Architect",
      description: "Full Stack Developer & Architect with 3+ years experience in Next.js, React, Python, AWS & AI",
      url: "https://aliburhan.com",
      sameAs: [
        "https://github.com/Ali-Burhan",
        "https://www.linkedin.com/in/ali-burhan-9076b42b6/",
        "https://twitter.com/aliburhan_dev",
      ],
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "University of Engineering and Technology (UET) Lahore",
      },
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
        item: "https://aliburhan.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About",
        item: "https://aliburhan.com/about",
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
      <AboutContent />
    </>
  );
}
