import { site } from "@/lib/site";

/**
 * Shared layout for the generated social cards.
 *
 * The detail pages each set their own `openGraph` in `generateMetadata`, which
 * replaces the root one — image included. Rather than repeat the root card in
 * every segment, they colocate an `opengraph-image` that renders this with
 * their own heading, so a shared link shows the page rather than the homepage.
 *
 * Written for Satori, not the browser: every element needs an explicit
 * `display`, and only the inline styles below are supported.
 */
export const OG_SIZE = { width: 1200, height: 630 } as const;

export function OgCard({
  eyebrow,
  heading,
  footnote,
}: {
  eyebrow: string;
  heading: string;
  footnote: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background:
          "radial-gradient(1000px 620px at 78% 12%, #16224a 0%, #0d1220 55%, #080b14 100%)",
        color: "#e9effa",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <svg width="64" height="64" viewBox="0 0 48 48">
          <defs>
            <linearGradient id="og" x1="8" y1="6" x2="40" y2="42" gradientUnits="userSpaceOnUse">
              <stop stopColor="#22d3ee" />
              <stop offset="0.5" stopColor="#5b86ff" />
              <stop offset="1" stopColor="#9b72f8" />
            </linearGradient>
          </defs>
          <g stroke="url(#og)" strokeWidth="3.1" strokeLinecap="round" opacity="0.92">
            <path d="M12.5 13.2 L35.5 34.8" />
            <path d="M35.5 13.2 L12.5 34.8" />
          </g>
          <g stroke="url(#og)" strokeWidth="3.4" strokeLinecap="round">
            <path d="M12.5 9 L12.5 39" />
            <path d="M35.5 9 L35.5 39" />
          </g>
          <circle cx="24" cy="24" r="4.8" fill="#080b14" />
          <circle cx="24" cy="24" r="2.9" fill="#7dd3fc" />
        </svg>
        <div style={{ display: "flex", fontSize: 34, letterSpacing: -1 }}>
          <span style={{ color: "#94a3c0" }}>The&nbsp;</span>
          <span style={{ color: "#7dd3fc", fontWeight: 700 }}>HNX</span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#7dd3fc",
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            // Long headings wrap rather than overflow, so the size steps down
            // once the copy passes roughly two lines at the larger setting.
            fontSize: heading.length > 46 ? 62 : 76,
            fontWeight: 700,
            letterSpacing: -2,
            lineHeight: 1.1,
            maxWidth: 1000,
          }}
        >
          {heading}
        </div>
      </div>

      <div style={{ display: "flex", fontSize: 24, color: "#7b8aab" }}>
        {footnote} · {site.domain}
      </div>
    </div>
  );
}
