import { Metadata } from "next";
import { Desktop } from "@/components/os";

export const metadata: Metadata = {
  metadataBase: new URL("https://aliofficial.vercel.app"),
  title: "Ali Burhan | Full Stack Architect | Next.js • Python • AWS • AI",
  description:
    "Ali Burhan: Full Stack Developer specializing in Next.js, React, Python, AWS & AI. Building scalable web applications and AI-powered solutions. Based in Lahore, Pakistan.",
  keywords: [
    "Full Stack Developer",
    "Full Stack Architect",
    "Next.js Developer",
    "React Developer",
    "Python Developer",
    "AWS Developer",
    "AI Developer",
    "LangChain",
    "Web Developer",
    "Portfolio",
    "Ali Burhan",
    "Lahore Developer",
    "Pakistan Developer",
    "Software Engineer",
  ],
  authors: [{ name: "Ali Burhan", url: "https://aliofficial.vercel.app" }],
  creator: "Ali Burhan",
  publisher: "Ali Burhan",
  alternates: {
    canonical: "https://aliofficial.vercel.app",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aliofficial.vercel.app",
    siteName: "Ali Burhan - Full Stack Developer Portfolio",
    title: "Ali Burhan | Full Stack Architect | Next.js • Python • AWS • AI",
    description:
      "Ali Burhan: Full Stack Developer specializing in Next.js, React, Python, AWS & AI. Building scalable web applications and AI-powered solutions.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ali Burhan - Full Stack Developer Portfolio",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@aliburhan",
    creator: "@aliburhan",
    title: "Ali Burhan | Full Stack Architect | Next.js • Python • AWS • AI",
    description:
      "Ali Burhan: Full Stack Developer specializing in Next.js, React, Python, AWS & AI. Building scalable web applications.",
    images: ["/og-image.png"],
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
  verification: {
    google: "your-google-verification-code",
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ali Burhan",
    url: "https://aliofficial.vercel.app",
    image: "https://aliofficial.vercel.app/ali-pic.png",
    jobTitle: "Full Stack Architect",
    worksFor: {
      "@type": "Organization",
      name: "Hashlogics",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lahore",
      addressCountry: "Pakistan",
    },
    email: "aliburhan.dev.ai@gmail.com",
    telephone: "+92-300-1499488",
    sameAs: [
      "https://github.com/Ali-Burhan",
      "https://www.linkedin.com/in/ali-burhan-9076b42b6/",
    ],
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
    description:
      "Ali Burhan is a Full Stack Developer specializing in Next.js, React, Python, AWS, and AI-powered applications. Building scalable web applications and enterprise solutions.",
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "University of Engineering and Technology (UET) Lahore",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Desktop />
    </>
  );
}
