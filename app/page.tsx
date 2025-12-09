import { Metadata } from "next";
import { HomeContent } from "@/components/home-content";

export const metadata: Metadata = {
  title: "Ali Burhan | Full Stack Developer | Best Portfolio for Full Stack",
  description:
    "Ali Burhan is a Full Stack Developer specializing in building exceptional digital experiences. Explore the best portfolio for full stack development.",
  keywords: [
    "Full Stack Developer",
    "Web Developer",
    "React",
    "Next.js",
    "Portfolio",
    "Best portfolio for full stack",
    "Software Engineer",
  ],
  openGraph: {
    title: "Ali Burhan | Full Stack Developer",
    description:
      "Ali Burhan is a Full Stack Developer specializing in building exceptional digital experiences.",
    url: "https://aliburhan.com",
    siteName: "Ali Burhan Portfolio",
    images: [
      {
        url: "https://aliburhan.com/og.png", // Replace with actual OG image URL
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ali Burhan | Full Stack Developer",
    description:
      "Ali Burhan is a Full Stack Developer specializing in building exceptional digital experiences.",
    images: ["https://aliburhan.com/og.png"], // Replace with actual OG image URL
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ali Burhan",
    url: "https://aliburhan.com",
    jobTitle: "Full Stack Developer",
    sameAs: [
      "https://github.com/aliburhan",
      "https://linkedin.com/in/aliburhan",
      "https://twitter.com/aliburhan",
    ],
    description:
      "Ali Burhan is a Full Stack Developer specializing in building exceptional digital experiences.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeContent />
    </>
  );
}
