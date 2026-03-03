import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { I18nProvider } from "@/lib/i18n";
import { WebVitals } from "@/components/web-vitals";
import { CursorCleanup } from "@/components/cursor-cleanup";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  adjustFontFallback: true,
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aliburhan.com"),
  title: {
    default: "Ali Burhan - Full Stack Developer | Next.js • Python • AWS • AI",
    template: "%s | Ali Burhan",
  },
  description:
    "Ali Burhan - Full Stack Developer & Architect specializing in Next.js, React, Python, AWS & AI. Building scalable cloud-native solutions serving 1000+ sites globally. Based in Lahore, Pakistan.",
  keywords: [
    "Ali Burhan",
    "Full Stack Developer",
    "Full Stack Architect",
    "Next.js Developer",
    "React Developer",
    "Python Developer",
    "AWS Developer",
    "AI Engineer",
    "LangChain Developer",
    "Web Developer",
    "Software Engineer",
    "Lahore Developer",
    "Pakistan Developer",
    "Serverless Architect",
    "Cloud Engineer",
    "LLM Developer",
    "RAG Developer",
    "Full Stack Pakistan",
  ],
  authors: [{ name: "Ali Burhan", url: "https://aliburhan.com" }],
  creator: "Ali Burhan",
  publisher: "Ali Burhan",
  category: "Technology",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["es_ES", "fr_FR"],
    url: "https://aliburhan.com",
    siteName: "Ali Burhan Portfolio",
    title: "Ali Burhan - Full Stack Developer | Next.js • Python • AWS • AI",
    description:
      "Ali Burhan is a Full Stack Developer & Architect specializing in Next.js, React, Python, AWS & AI. Building scalable cloud-native solutions serving 1000+ sites globally.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ali Burhan - Full Stack Developer & Architect",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@aliburhan_dev",
    creator: "@aliburhan_dev",
    title: "Ali Burhan - Full Stack Developer | Next.js • Python • AWS • AI",
    description:
      "Full Stack Developer & Architect specializing in Next.js, React, Python, AWS & AI. Building scalable cloud-native solutions.",
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
    google: process.env.GOOGLE_SITE_VERIFICATION || "",
  },
  alternates: {
    canonical: "https://aliburhan.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <I18nProvider>
            <WebVitals />
            <CursorCleanup />
            {children}
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
