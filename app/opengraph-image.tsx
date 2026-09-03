import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social card, generated at build time. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background:
            "radial-gradient(1000px 620px at 78% 12%, #16224a 0%, #070b16 55%, #03050a 100%)",
          color: "#eef3fb",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="72" height="72" viewBox="0 0 48 48">
            <defs>
              <linearGradient id="s" x1="8" y1="6" x2="40" y2="42" gradientUnits="userSpaceOnUse">
                <stop stopColor="#22d3ee" />
                <stop offset="0.5" stopColor="#4f7cff" />
                <stop offset="1" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            <g stroke="url(#s)" strokeWidth="3.1" strokeLinecap="round" opacity="0.92">
              <path d="M12.5 13.2 L35.5 34.8" />
              <path d="M35.5 13.2 L12.5 34.8" />
            </g>
            <g stroke="url(#s)" strokeWidth="3.4" strokeLinecap="round">
              <path d="M12.5 9 L12.5 39" />
              <path d="M35.5 9 L35.5 39" />
            </g>
            <circle cx="24" cy="24" r="4.8" fill="#03050a" />
            <circle cx="24" cy="24" r="2.9" fill="#7dd3fc" />
          </svg>
          <div style={{ display: "flex", fontSize: 40, letterSpacing: -1 }}>
            <span style={{ color: "#9aa9c6" }}>The&nbsp;</span>
            <span style={{ color: "#7dd3fc", fontWeight: 700 }}>HNX</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 700, letterSpacing: -3 }}>
            Building What&apos;s Next.
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#9aa9c6", maxWidth: 900 }}>
            Digital products, intelligent software, and AI-driven systems.
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, fontSize: 22, color: "#6b7b9c" }}>
          <span>Web</span>
          <span>·</span>
          <span>ERP &amp; SaaS</span>
          <span>·</span>
          <span>Mobile</span>
          <span>·</span>
          <span>AI &amp; Automation</span>
          <span>·</span>
          <span>Cloud</span>
        </div>
      </div>
    ),
    size,
  );
}
