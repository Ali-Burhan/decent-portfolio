import type { Metadata } from "next";
import { ExperienceContent } from "@/components/experience-content";

export const metadata: Metadata = {
  title: "Experience | Ali Burhan - Full Stack Developer",
  description: "3+ years building scalable solutions with Next.js, React, Python & AWS. From microservices to AI platforms serving 60+ countries.",
  alternates: {
    canonical: "https://aliofficial.vercel.app/experience",
  },
  openGraph: {
    title: "Experience - Ali Burhan Portfolio",
    description: "3+ years building scalable solutions with Next.js, React, Python & AWS. From microservices to AI platforms serving 60+ countries.",
    url: "https://aliofficial.vercel.app/experience",
    type: "website",
    images: ["/og-image.png"],
  },
};

export default function ExperiencePage() {
  return <ExperienceContent />;
}
