import type { Metadata } from "next";
import { AboutContent } from "@/components/about-content";

export const metadata: Metadata = {
  title: "About | Ali Burhan - Full Stack Architect",
  description: "Full Stack Developer with Next.js, Python & AWS expertise. Building AI-powered solutions at scale. Based in Lahore, Pakistan.",
  alternates: {
    canonical: "https://aliofficial.vercel.app/about",
  },
  openGraph: {
    title: "About Ali Burhan - Full Stack Developer",
    description: "Full Stack Developer with Next.js, Python & AWS expertise. Building AI-powered solutions at scale. Based in Lahore, Pakistan.",
    url: "https://aliofficial.vercel.app/about",
    type: "profile",
    images: ["/og-image.png"],
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
