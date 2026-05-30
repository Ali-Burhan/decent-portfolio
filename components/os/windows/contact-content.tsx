"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Linkedin,
  Github,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import portfolioData from "@/data/portfolio.json";
import {
  OsWindowBody,
  OsSectionTitle,
  OsCard,
  OsLabel,
  OsInput,
  OsTextarea,
  OsLinkCard,
  osMotion,
} from "../window-ui";

export function ContactContent() {
  const { personalInfo, socialLinks } = portfolioData;
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("sent");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <OsWindowBody>
      <motion.div variants={osMotion.container} initial="hidden" animate="visible" className="space-y-6">
        <motion.div variants={osMotion.item}>
          <OsSectionTitle icon={MessageSquare}>Get in touch</OsSectionTitle>
          <div className="grid gap-3 sm:grid-cols-2">
            <OsLinkCard
              href={`mailto:${personalInfo.email}`}
              icon={Mail}
              label="Email"
              value={personalInfo.email}
            />
            <OsLinkCard
              href={socialLinks.linkedin}
              icon={Linkedin}
              label="LinkedIn"
              value="Connect on LinkedIn"
              external
            />
            <OsLinkCard
              href={socialLinks.github}
              icon={Github}
              label="GitHub"
              value="View repositories"
              external
            />
            <OsLinkCard
              href={`tel:${personalInfo.phone.replace(/\s/g, "")}`}
              icon={Phone}
              label="Phone"
              value={personalInfo.phone}
            />
            <OsCard hover={false} className="flex items-center gap-3 sm:col-span-2">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--os-accent-muted)] text-[var(--os-accent)]">
                <MapPin className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--os-text-muted)]">
                  Location
                </p>
                <p className="text-sm font-medium text-[var(--os-text-primary)]">
                  {personalInfo.location}
                </p>
              </div>
            </OsCard>
          </div>
        </motion.div>

        <motion.div variants={osMotion.item}>
          <OsSectionTitle icon={Send}>Send a message</OsSectionTitle>
          <OsCard hover={false}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <OsLabel htmlFor="os-contact-name">Name</OsLabel>
                <OsInput
                  id="os-contact-name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <OsLabel htmlFor="os-contact-email">Email</OsLabel>
                <OsInput
                  id="os-contact-email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <OsLabel htmlFor="os-contact-message">Message</OsLabel>
                <OsTextarea
                  id="os-contact-message"
                  placeholder="Tell me about your project or role..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={4}
                />
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="os-btn-primary flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold disabled:opacity-60"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : status === "sent" ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Message sent
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send message
                  </>
                )}
              </button>

              <AnimatePresence>
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-600 dark:text-red-400"
                  >
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    Failed to send. Please try again or email directly.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </OsCard>
        </motion.div>
      </motion.div>
    </OsWindowBody>
  );
}
