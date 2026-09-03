/**
 * Central site configuration.
 * Replace the placeholder contact details and social handles with real ones
 * before going live — every consumer of this file picks the change up.
 */
export const site = {
  name: "The HNX",
  legalName: "The HNX",
  domain: "thehnx.com",
  url: "https://thehnx.com",
  tagline: "Building What's Next.",
  description:
    "The HNX builds powerful digital products, intelligent software, and AI-driven systems for startups, businesses, and enterprises worldwide.",
  shortDescription:
    "Building powerful digital products, intelligent software, and technology for what's next.",
  email: "hello@thehnx.com",
  salesEmail: "projects@thehnx.com",
  phone: "+1 (555) 018-2040",
  location: "Remote-first — delivering to teams worldwide",
  hours: "Mon – Fri · 09:00 – 19:00",
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
