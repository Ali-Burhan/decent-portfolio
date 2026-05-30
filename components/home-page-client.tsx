"use client";

import { Desktop } from "@/components/os";
import { HomeContent } from "@/components/home-content";
import { useViewMode } from "@/lib/view-mode";

export function HomePageClient() {
  const { mode, ready } = useViewMode();

  if (!ready) {
    return <Desktop />;
  }

  return mode === "recruiter" ? <HomeContent /> : <Desktop />;
}
