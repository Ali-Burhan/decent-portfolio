import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

export const alt = "Ali Burhan - Full Stack Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px",
          background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0c4a6e 100%)",
          color: "#f8fafc",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #38bdf8, #818cf8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              fontWeight: 800,
            }}
          >
            AB
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 22, opacity: 0.75, letterSpacing: "0.08em" }}>
              {SITE_NAME}
            </span>
            <span style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.1 }}>
              Ali Burhan
            </span>
          </div>
        </div>
        <p style={{ fontSize: 36, fontWeight: 600, margin: 0, maxWidth: 900, lineHeight: 1.3 }}>
          Full Stack Engineer
        </p>
        <p style={{ fontSize: 26, marginTop: 20, opacity: 0.85, maxWidth: 900 }}>
          Next.js · React · Python · AWS · AI · LangChain
        </p>
        <p style={{ fontSize: 22, marginTop: 28, opacity: 0.65 }}>
          aliburhan.com · Lahore, Pakistan
        </p>
      </div>
    ),
    { ...size }
  );
}
