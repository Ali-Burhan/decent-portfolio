import { Metadata } from "next";
import { NowContent } from "@/components/now-content";

export const metadata: Metadata = {
  title: "Now | Ali Burhan - What I'm Doing Now",
  description:
    "What Ali Burhan is doing now: Pursuing Master's in CS at UET Lahore, building at Hashlogics, learning AWS CDK & LangChain, and working on side projects. Updated December 2025.",
  keywords: [
    "Ali Burhan Now",
    "What I'm doing now",
    "Current Projects",
    "Learning Full Stack",
    "UET Lahore Masters",
    "Hashlogics Work",
    "AWS Learning",
    "LangChain Projects",
  ],
  authors: [{ name: "Ali Burhan", url: "https://aliburhan.com" }],
  alternates: {
    canonical: "https://aliburhan.com/now",
  },
  openGraph: {
    title: "Now - Ali Burhan | What I'm Doing Now",
    description:
      "What Ali Burhan is doing now: Pursuing Master's in CS at UET Lahore, building at Hashlogics, learning AWS CDK & LangChain.",
    url: "https://aliburhan.com/now",
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Now - Ali Burhan Portfolio",
    description:
      "What Ali Burhan is doing now: Pursuing Master's in CS at UET Lahore, building at Hashlogics, learning AWS CDK & LangChain.",
    images: ["/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "What I'm Doing Now - Ali Burhan",
  description: "Current activities and projects of Ali Burhan including Master's at UET Lahore, work at Hashlogics, and side projects",
  datePublished: "2025-12-01",
  dateModified: "2025-12-01",
  author: {
    "@type": "Person",
    name: "Ali Burhan",
    url: "https://aliburhan.com",
  },
  publisher: {
    "@type": "Organization",
    name: "Ali Burhan Portfolio",
    logo: {
      "@type": "ImageObject",
      url: "https://aliburhan.com/og-image.png",
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
      name: "Now",
      item: "https://aliburhan.com/now",
    },
  ],
};

export default function NowPage() {
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
      <NowContent />
    </>
  );
}
