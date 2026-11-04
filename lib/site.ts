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
  /**
   * Brand spellings published as schema.org alternateName values on the
   * Organization and WebSite nodes.
   */
  alternateNames: ["TheHNX", "The HNX", "HNX", "The Hnx", "TheHnx"],
  domain: "thehnx.com",
  url: origin,
  tagline: "Building What's Next.",
  description:
    "The HNX builds websites, ERP and CRM systems, custom software, and AI workflows, and provides website and API VAPT for teams worldwide.",
  shortDescription:
    "Websites, ERP, AI, VAPT, and custom software for teams worldwide.",
  email: "info@thehnx.com",
  salesEmail: "projects@thehnx.com",
  phone: "+91 78890 02108",
  /**
   * The wa.me form of `phone`, digits only. Derived rather than typed twice so
   * the two can never disagree the way the old number did across our sites.
   */
  get whatsapp() {
    return this.phone.replace(/\D/g, "");
  },
  location: "Remote-first — delivering to teams worldwide",
  hours: "Mon – Fri · 09:00 – 19:00",
  /** GA4 measurement ID for the Google tag; override per environment with NEXT_PUBLIC_GA_ID. */
  gaId: process.env.NEXT_PUBLIC_GA_ID || "G-563R65KGMV",
  /** Google Tag Manager container ID; override per environment with NEXT_PUBLIC_GTM_ID. */
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || "GTM-K98J9FCB",
  /**
   * Search Console HTML-tag verification token, checked in deliberately: it is
   * served in the page head on every request, so it is public by design and is
   * not a credential. Search Console keeps checking for it after verification —
   * removing it un-verifies the property.
   */
  googleSiteVerification:
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
    "A2OLyaGhacAh2P_6UpYgk5fmKUjc7tzfRJPBMnY7vFk",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/the-hnx-278582434/" },
    { label: "X", href: "https://x.com/the__hnx" },
    { label: "Instagram", href: "https://www.instagram.com/the__hnx/" },
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
