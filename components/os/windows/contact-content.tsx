"use client";
import React, { useState } from "react";
import portfolioData from "@/data/portfolio.json";

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
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-sm font-mono text-[var(--os-cyan)] uppercase tracking-wider">
        {"<Contact />"}
      </h2>

      {/* Contact Info */}
      <div className="grid gap-3 sm:grid-cols-2">
        <a
          href={`mailto:${personalInfo.email}`}
          className="p-3 rounded-lg bg-foreground/5 border border-foreground/10 hover:border-[var(--os-cyan)]/30 transition-colors flex items-center gap-3"
        >
          <span className="text-xl">📧</span>
          <div>
            <p className="text-xs text-foreground/60">Email</p>
            <p className="text-sm text-foreground">{personalInfo.email}</p>
          </div>
        </a>

        <a
          href={socialLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-lg bg-foreground/5 border border-foreground/10 hover:border-[var(--os-cyan)]/30 transition-colors flex items-center gap-3"
        >
          <span className="text-xl">💼</span>
          <div>
            <p className="text-xs text-foreground/60">LinkedIn</p>
            <p className="text-sm text-foreground">Connect with me</p>
          </div>
        </a>

        <a
          href={socialLinks.github}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-lg bg-foreground/5 border border-foreground/10 hover:border-[var(--os-cyan)]/30 transition-colors flex items-center gap-3"
        >
          <span className="text-xl">👨‍💻</span>
          <div>
            <p className="text-xs text-foreground/60">GitHub</p>
            <p className="text-sm text-foreground">View my code</p>
          </div>
        </a>

        <div className="p-3 rounded-lg bg-foreground/5 border border-foreground/10 flex items-center gap-3">
          <span className="text-xl">📍</span>
          <div>
            <p className="text-xs text-foreground/60">Location</p>
            <p className="text-sm text-foreground">{personalInfo.location}</p>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="space-y-3">
        <h3 className="text-sm font-mono text-foreground/70">// Send a message</h3>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="w-full px-3 py-2 text-sm bg-foreground/5 border border-foreground/10 rounded-lg focus:outline-none focus:border-[var(--os-cyan)]/50 text-foreground placeholder:text-foreground/40"
          />
          <input
            type="email"
            placeholder="Your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="w-full px-3 py-2 text-sm bg-foreground/5 border border-foreground/10 rounded-lg focus:outline-none focus:border-[var(--os-cyan)]/50 text-foreground placeholder:text-foreground/40"
          />
          <textarea
            placeholder="Your message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
            rows={4}
            className="w-full px-3 py-2 text-sm bg-foreground/5 border border-foreground/10 rounded-lg focus:outline-none focus:border-[var(--os-cyan)]/50 text-foreground placeholder:text-foreground/40 resize-none"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="px-4 py-2 text-sm font-medium bg-[var(--os-cyan)] text-white rounded-lg hover:bg-[var(--os-cyan)]/90 transition-colors disabled:opacity-50"
          >
            {status === "sending" ? "Sending..." : status === "sent" ? "Sent!" : "Send Message"}
          </button>
          {status === "error" && (
            <p className="text-xs text-red-400">Failed to send. Try again.</p>
          )}
        </form>
      </div>
    </div>
  );
}
