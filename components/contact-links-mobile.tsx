"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Github, Twitter, MapPin } from "lucide-react";
import portfolioData from "@/data/portfolio.json";

export function ContactLinksMobile() {
  const { personalInfo, socialLinks } = portfolioData;

  const contactItems = [
    {
      icon: Mail,
      label: "Email",
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Phone,
      label: "Phone",
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`,
      color: "from-green-500 to-green-600",
    },
    {
      icon: MapPin,
      label: "Location",
      value: personalInfo.location,
      href: null,
      color: "from-red-500 to-red-600",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Connect",
      href: socialLinks.linkedin,
      color: "from-blue-600 to-blue-700",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "Follow",
      href: socialLinks.github,
      color: "from-gray-700 to-gray-900",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {contactItems.map((item, index) => {
        const Icon = item.icon;
        const Component = item.href ? motion.a : motion.div;
        
        return (
          <Component
            key={item.label}
            href={item.href || undefined}
            target={item.href?.startsWith("http") ? "_blank" : undefined}
            rel={item.href?.startsWith("http") ? "noopener noreferrer" : undefined}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              group relative overflow-hidden rounded-2xl border border-foreground/10 
              bg-gradient-to-br from-foreground/5 to-background p-4 
              min-h-[100px] flex flex-col items-center justify-center text-center
              ${item.href ? "active:scale-95 cursor-pointer" : ""}
              transition-transform
            `}
          >
            {/* Gradient Background on Tap */}
            <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-active:opacity-10 transition-opacity`} />
            
            {/* Icon */}
            <div className={`relative z-10 w-10 h-10 rounded-full bg-gradient-to-br ${item.color} p-2 mb-2 text-white shadow-lg`}>
              <Icon className="w-full h-full" />
            </div>
            
            {/* Label */}
            <p className="relative z-10 text-xs font-semibold text-foreground/80 mb-1">
              {item.label}
            </p>
            
            {/* Value */}
            <p className="relative z-10 text-xs text-foreground/60 line-clamp-1 px-2">
              {item.value}
            </p>
          </Component>
        );
      })}
    </div>
  );
}
