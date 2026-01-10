"use client";

import { useEffect } from "react";

export function CursorCleanup() {
  useEffect(() => {
    // Remove any residual custom cursor attributes and localStorage
    document.documentElement.removeAttribute('data-custom-cursor');
    localStorage.removeItem('customCursor');
  }, []);

  return null;
}
