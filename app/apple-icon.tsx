import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon for iOS, generated at build time. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(150deg, #0a1020 0%, #03050a 100%)",
        }}
      >
        <svg width="132" height="132" viewBox="0 0 48 48">
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
      </div>
    ),
    size,
  );
}
