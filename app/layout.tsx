import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LangInit } from "@/components/lang-init";
import { I18nProvider } from "@/lib/i18n";
import { ViewModeProvider } from "@/lib/view-mode";
import { parseLocaleCookie } from "@/lib/i18n-messages";
import { SITE_URL } from "@/lib/site";
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ali Burhan - Full Stack Engineer | Next.js • Python • AWS • AI",
    template: "%s | Ali Burhan",
  },
  description:
    "Ali Burhan - Full Stack Engineer specializing in Next.js, React, Python, AWS & AI. Building scalable cloud-native solutions serving 1,000+ sites globally. Based in Lahore, Pakistan.",
  keywords: [
    "Ali Burhan",
    "Full Stack Engineer",
    "Full Stack Developer",
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
    "Cloud Engineer",
    "LLM Developer",
    "RAG Developer",
    "Full Stack Pakistan",
  ],
  authors: [{ name: "Ali Burhan", url: SITE_URL }],
  creator: "Ali Burhan",
  publisher: "Ali Burhan",
  category: "Technology",
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["es_ES", "fr_FR"],
    url: SITE_URL,
    siteName: "Ali Burhan Portfolio",
    title: "Ali Burhan - Full Stack Engineer | Next.js • Python • AWS • AI",
    description:
      "Ali Burhan is a Full Stack Engineer specializing in Next.js, React, Python, AWS & AI. Building scalable cloud-native solutions serving 1,000+ sites globally.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@aliburhan_dev",
    creator: "@aliburhan_dev",
    title: "Ali Burhan - Full Stack Developer | Next.js • Python • AWS • AI",
    description:
      "Full Stack Engineer specializing in Next.js, React, Python, AWS & AI. Building scalable cloud-native solutions.",
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
    canonical: SITE_URL,
    languages: {
      en: SITE_URL,
      es: SITE_URL,
      fr: SITE_URL,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const initialLocale = parseLocaleCookie(cookieStore.get("locale")?.value);

  return (
    <html lang={initialLocale} suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <I18nProvider initialLocale={initialLocale}>
            <ViewModeProvider>
              <LangInit />
              <WebVitals />
              <CursorCleanup />
              {children}
            </ViewModeProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
