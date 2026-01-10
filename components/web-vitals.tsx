"use client";

import { useEffect } from "react";
import { useReportWebVitals } from "next/web-vitals";

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Log metrics to console in development
    if (process.env.NODE_ENV === "development") {
      console.log({
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        id: metric.id,
      });
    }

    // Send to analytics in production
    if (process.env.NODE_ENV === "production") {
      // Example: Send to Google Analytics
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", metric.name, {
          value: Math.round(
            metric.name === "CLS" ? metric.value * 1000 : metric.value
          ),
          event_category: "Web Vitals",
          event_label: metric.id,
          non_interaction: true,
        });
      }

      // Example: Send to custom analytics endpoint
      // fetch("/api/analytics", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     name: metric.name,
      //     value: metric.value,
      //     rating: metric.rating,
      //     delta: metric.delta,
      //     id: metric.id,
      //   }),
      // });
    }
  });

  return null;
}

// Helper function to get Web Vitals thresholds
export function getWebVitalsThresholds() {
  return {
    LCP: {
      good: 2500,
      needsImprovement: 4000,
      poor: Infinity,
    },
    FID: {
      good: 100,
      needsImprovement: 300,
      poor: Infinity,
    },
    CLS: {
      good: 0.1,
      needsImprovement: 0.25,
      poor: Infinity,
    },
    FCP: {
      good: 1800,
      needsImprovement: 3000,
      poor: Infinity,
    },
    TTFB: {
      good: 800,
      needsImprovement: 1800,
      poor: Infinity,
    },
    INP: {
      good: 200,
      needsImprovement: 500,
      poor: Infinity,
    },
  };
}
