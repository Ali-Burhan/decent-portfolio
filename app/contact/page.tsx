import type { Metadata } from "next";
import { ContactContent } from "@/components/contact-content";

export const metadata: Metadata = {
  title: "Contact | Ali Burhan - Let's Build Together",
  description: "Get in touch with Ali Burhan for Full Stack development projects. Specializing in Next.js, React, Python, AWS & AI solutions.",
  alternates: {
    canonical: "https://aliofficial.vercel.app/contact",
  },
  openGraph: {
    title: "Contact Ali Burhan - Full Stack Developer",
    description: "Get in touch with Ali Burhan for Full Stack development projects. Specializing in Next.js, React, Python, AWS & AI solutions.",
    url: "https://aliofficial.vercel.app/contact",
    type: "website",
    images: ["/og-image.png"],
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
