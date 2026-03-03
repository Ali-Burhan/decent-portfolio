import type { Metadata } from "next";
import { ProjectsContent } from "@/components/projects-content";

export const metadata: Metadata = {
  title: "Projects | Ali Burhan - Full Stack Developer Portfolio",
  description:
    "Explore projects by Ali Burhan: Forwood Safety (1000+ sites), Lumaya marketplace, TeachTrack AI, Emotion-Aware Voice System, and CazVid. Built with Next.js, Python, AWS, LangChain & AI technologies.",
  keywords: [
    "Ali Burhan Projects",
    "Forwood Safety",
    "Lumaya marketplace",
    "TeachTrack AI",
    "Full Stack Developer Projects",
    "Next.js Projects",
    "Python AWS Projects",
    "LangChain Projects",
    "AI Projects Pakistan",
    "RAG Applications",
    "LLM Projects",
    "Serverless Projects",
    "Microservices Projects",
  ],
  authors: [{ name: "Ali Burhan", url: "https://aliburhan.com" }],
  alternates: {
    canonical: "https://aliburhan.com/projects",
  },
  openGraph: {
    title: "Projects - Ali Burhan | Full Stack Developer Portfolio",
    description:
      "Explore projects by Ali Burhan: Forwood Safety (1000+ sites), Lumaya marketplace, TeachTrack AI, Emotion-Aware Voice System, and CazVid.",
    url: "https://aliburhan.com/projects",
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects - Ali Burhan Portfolio",
    description:
      "Explore projects by Ali Burhan: Forwood Safety, Lumaya, TeachTrack AI, and more. Built with Next.js, Python, AWS & AI.",
    images: ["/og-image.png"],
  },
};

export default function ProjectsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Ali Burhan - Projects Portfolio",
    description: "Projects portfolio of Ali Burhan featuring AI-driven platforms, cloud-native apps & enterprise solutions",
    url: "https://aliburhan.com/projects",
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
        name: "Projects",
        item: "https://aliburhan.com/projects",
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
      <ProjectsContent />
    </>
  );
}
