import type { Metadata } from "next";
import { ProjectsContent } from "@/components/projects-content";

export const metadata: Metadata = {
  title: "Projects | Ali Burhan - Full Stack Portfolio",
  description: "Explore AI-driven platforms, cloud-native apps & enterprise solutions built with Next.js, Python, LangChain & AWS by Ali Burhan.",
  alternates: {
    canonical: "https://aliofficial.vercel.app/projects",
  },
  openGraph: {
    title: "Projects - Ali Burhan Portfolio",
    description: "Explore AI-driven platforms, cloud-native apps & enterprise solutions built with Next.js, Python, LangChain & AWS by Ali Burhan.",
    url: "https://aliofficial.vercel.app/projects",
    type: "website",
    images: ["/og-image.png"],
  },
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
