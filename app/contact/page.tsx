import type { Metadata } from "next";
import { ContactContent } from "@/components/contact-content";

export const metadata: Metadata = {
  title: "Contact | Ali Burhan - Let's Build Together",
  description:
    "Get in touch with Ali Burhan, Full Stack Developer & Architect. Available for projects in Next.js, React, Python, AWS & AI. Email: aliburhan.dev.ai@gmail.com | Lahore, Pakistan",
  keywords: [
    "Contact Ali Burhan",
    "Hire Full Stack Developer",
    "Hire Next.js Developer",
    "Hire Python Developer",
    "Hire AWS Developer",
    "Hire AI Engineer",
    "Software Engineer for Hire",
    "Freelance Developer Pakistan",
    "Contact Full Stack Architect",
  ],
  authors: [{ name: "Ali Burhan", url: "https://aliburhan.com" }],
  alternates: {
    canonical: "https://aliburhan.com/contact",
  },
  openGraph: {
    title: "Contact Ali Burhan - Full Stack Developer & Architect",
    description:
      "Get in touch with Ali Burhan, Full Stack Developer & Architect. Available for projects in Next.js, React, Python, AWS & AI.",
    url: "https://aliburhan.com/contact",
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Ali Burhan - Full Stack Developer",
    description:
      "Get in touch with Ali Burhan, Full Stack Developer & Architect. Available for projects in Next.js, React, Python, AWS & AI.",
    images: ["/og-image.png"],
  },
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    mainEntity: {
      "@type": "Person",
      name: "Ali Burhan",
      jobTitle: "Full Stack Developer & Architect",
      email: "aliburhan.dev.ai@gmail.com",
      telephone: "+92-300-1499488",
      url: "https://aliburhan.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lahore",
        addressCountry: "Pakistan",
      },
      sameAs: [
        "https://github.com/Ali-Burhan",
        "https://www.linkedin.com/in/ali-burhan-9076b42b6/",
        "https://twitter.com/aliburhan_dev",
      ],
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
        name: "Contact",
        item: "https://aliburhan.com/contact",
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
      <ContactContent />
    </>
  );
}
