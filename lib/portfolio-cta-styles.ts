import type { CSSProperties } from "react";

const base: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.625rem",
  boxSizing: "border-box",
  flexShrink: 0,
  width: "auto",
  maxWidth: "none",
  lineHeight: 1.25,
  fontWeight: 600,
  whiteSpace: "nowrap",
};

/** Inline styles so padding always applies (Tailwind/flex cannot strip it). */
export const portfolioCtaStyle = {
  default: {
    ...base,
    padding: "12px 24px",
    minHeight: "44px",
  } satisfies CSSProperties,
  lg: {
    ...base,
    padding: "16px 36px",
    minHeight: "52px",
  } satisfies CSSProperties,
  compact: {
    ...base,
    padding: "10px 20px",
    minHeight: "40px",
    fontSize: "0.8125rem",
  } satisfies CSSProperties,
  block: {
    ...base,
    display: "flex",
    width: "100%",
    whiteSpace: "normal",
    padding: "16px 28px",
    minHeight: "52px",
  } satisfies CSSProperties,
} as const;
