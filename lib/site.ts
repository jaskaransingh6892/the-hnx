/**
 * Central site configuration.
 * Replace the placeholder contact details and social handles with real ones
 * before going live — every consumer of this file picks the change up.
 */
/**
 * Canonical origin. Vercel (or any host) should set NEXT_PUBLIC_SITE_URL to the
 * real domain; without it the values below fall back to the intended domain.
 * Everything SEO-facing derives from this: canonicals, sitemap, robots, OG tags.
 */
const rawOrigin = process.env.NEXT_PUBLIC_SITE_URL || "https://thehnx.com";
const origin = rawOrigin.endsWith("/") ? rawOrigin.slice(0, -1) : rawOrigin;

export const site = {
  name: "The HNX",
  legalName: "The HNX",
  domain: "thehnx.com",
  url: origin,
  tagline: "Building What's Next.",
  description:
    "The HNX builds powerful digital products, intelligent software, and AI-driven systems for startups, businesses, and enterprises worldwide.",
  shortDescription:
    "Building powerful digital products, intelligent software, and technology for what's next.",
  email: "hello@thehnx.com",
  salesEmail: "projects@thehnx.com",
  phone: "+91-896-843-0482",
  location: "Remote-first — delivering to teams worldwide",
  hours: "Mon – Fri · 09:00 – 19:00",
  /** GA4 measurement ID for the Google tag; override per environment with NEXT_PUBLIC_GA_ID. */
  gaId: process.env.NEXT_PUBLIC_GA_ID || "G-563R65KGMV",
  /** Google Tag Manager container ID; override per environment with NEXT_PUBLIC_GTM_ID. */
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || "GTM-K98J9FCB",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/thehnx" },
    { label: "X", href: "https://x.com/thehnx" },
    { label: "GitHub", href: "https://github.com/thehnx" },
    { label: "Dribbble", href: "https://dribbble.com/thehnx" },
  ],
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "About Us", href: "/about" },
  { label: "Our Process", href: "/process" },
  { label: "Contact", href: "/contact" },
] as const;
