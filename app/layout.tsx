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
  metadataBase: new URL("https://aliofficial.vercel.app"),
  title: {
    default: "Ali Burhan - Full Stack Developer Portfolio",
    template: "%s | Ali Burhan",
  },
  description:
    "Full Stack Developer specializing in Next.js, Python, AWS & AI. Building scalable cloud-native solutions serving 1000+ sites across 60+ countries.",
  keywords: [
    "Full Stack Developer",
    "Next.js",
    "React",
    "Python",
    "AWS",
    "LangChain",
    "AI",
    "Web Developer",
    "Software Engineer",
    "Lahore",
    "Pakistan",
  ],
  authors: [{ name: "Ali Burhan", url: "https://aliofficial.vercel.app" }],
  creator: "Ali Burhan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aliofficial.vercel.app",
    siteName: "Ali Burhan Portfolio",
    title: "Ali Burhan - Full Stack Developer",
    description:
      "Full Stack Developer specializing in Next.js, Python, AWS & AI. Building scalable cloud-native solutions.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ali Burhan - Full Stack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ali Burhan - Full Stack Developer",
    description:
      "Full Stack Developer specializing in Next.js, Python, AWS & AI.",
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
