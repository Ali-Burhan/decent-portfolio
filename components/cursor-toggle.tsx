"use client";

import * as React from "react";
import { MousePointer2, MousePointerClick } from "lucide-react";
import { motion } from "framer-motion";

export function CursorToggle() {
  const [mounted, setMounted] = React.useState(false);
  const [cursorEnabled, setCursorEnabled] = React.useState(true);

  React.useEffect(() => {
    setMounted(true);
    const savedPreference = localStorage.getItem("customCursor");
    const isEnabled = savedPreference === null ? true : savedPreference === "enabled";
    setCursorEnabled(isEnabled);
    
    // Dispatch custom event to notify cursor component
    window.dispatchEvent(new CustomEvent("cursorToggle", { detail: { enabled: isEnabled } }));
  }, []);

  const toggleCursor = () => {
    const newState = !cursorEnabled;
    setCursorEnabled(newState);
    localStorage.setItem("customCursor", newState ? "enabled" : "disabled");
    
    // Dispatch custom event to notify cursor component
    window.dispatchEvent(new CustomEvent("cursorToggle", { detail: { enabled: newState } }));
  };

  if (!mounted) return null;

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleCursor}
      className="p-2 rounded-lg bg-foreground/5 backdrop-blur-sm border border-foreground/10 hover:bg-foreground/10 transition-all duration-300 text-foreground/70 hover:text-foreground"
      aria-label={cursorEnabled ? "Disable custom cursor" : "Enable custom cursor"}
      title={cursorEnabled ? "Disable custom cursor" : "Enable custom cursor"}
    >
      {cursorEnabled ? (
        <MousePointerClick className="h-5 w-5 text-accent transition-colors" />
      ) : (
        <MousePointer2 className="h-5 w-5 transition-colors" />
      )}
    </motion.button>
  );
}
