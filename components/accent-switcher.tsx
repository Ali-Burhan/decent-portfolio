"use client";

import * as React from "react";
import { Palette } from "lucide-react";

const accents = [
  { name: "Visionary", value: "visionary", color: "#FF6B6B" },
  { name: "Depth Seeker", value: "depth-seeker", color: "#00ADB5" },
  { name: "Subtle Luxe", value: "subtle-luxe", color: "#B388FF" },
];

export function AccentSwitcher() {
  const [mounted, setMounted] = React.useState(false);
  const [activeAccent, setActiveAccent] = React.useState("visionary");
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const savedAccent = localStorage.getItem("accent") || "visionary";
    setActiveAccent(savedAccent);
    document.body.setAttribute("data-accent", savedAccent);
  }, []);

  const handleAccentChange = (accent: string) => {
    setActiveAccent(accent);
    localStorage.setItem("accent", accent);
    document.body.setAttribute("data-accent", accent);
    setIsOpen(false);
  };

  if (!mounted) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Change accent color"
      >
        <Palette className="h-5 w-5 text-accent transition-colors" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 flex w-56 flex-col gap-1 rounded-lg border border-gray-200 bg-white p-2 text-gray-900 shadow-lg dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100">
          {accents.map((accent) => (
            <button
              key={accent.value}
              onClick={() => handleAccentChange(accent.value)}
              className={`flex items-center gap-3 rounded px-3 py-2 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
                activeAccent === accent.value ? "font-bold bg-gray-50 dark:bg-gray-800/50" : ""
              }`}
            >
              <span
                className="h-3 w-3 rounded-full ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-900"
                style={{ backgroundColor: accent.color, "--tw-ring-color": accent.color } as React.CSSProperties}
              />
              {accent.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
