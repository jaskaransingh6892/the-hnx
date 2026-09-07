import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Analytics, AnalyticsNoScript } from "@/components/layout/Analytics";
import { site } from "@/lib/site";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
});

const sans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  variable: "--font-code",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "software development company",
    "custom software development",
    "ERP development",
    "CRM development",
    "SaaS product development",
    "AI solutions",
    "AI automation",
    "web application development",
    "mobile app development",
    "cloud solutions",
    ...site.alternateNames,
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "technology",
  ...(site.googleSiteVerification
    ? { verification: { google: site.googleSiteVerification } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#080b14",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

/**
 * One graph, two nodes, stable @ids so every other page can reference them.
 * The alternateName lists are the point: they tell Google that "TheHNX",
 * "HNX" and "The Hnx" are the same named entity rather than a typo.
 */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      legalName: site.legalName,
      alternateName: [...site.alternateNames],
      url: site.url,
      description: site.description,
      slogan: site.tagline,
      email: site.email,
      telephone: site.phone,
      logo: {
        "@type": "ImageObject",
        url: `${site.url}/brand/icon-512.png`,
        width: 512,
        height: 512,
      },
      image: `${site.url}/brand/icon-512.png`,
      address: { "@type": "PostalAddress", addressCountry: "IN" },
      areaServed: "Worldwide",
      knowsAbout: [
        "Custom software development",
        "Artificial intelligence",
        "AI automation",
        "SaaS product development",
        "ERP software",
        "CRM software",
        "Web application development",
        "Mobile app development",
        "Cloud infrastructure",
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "sales",
          email: site.salesEmail,
          telephone: site.phone,
          areaServed: "Worldwide",
          availableLanguage: ["English", "Hindi"],
        },
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: site.email,
          areaServed: "Worldwide",
          availableLanguage: ["English", "Hindi"],
        },
      ],
      sameAs: site.socials.map((social) => social.href),
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      alternateName: [...site.alternateNames],
      description: site.description,
      inLanguage: "en",
      publisher: { "@id": `${site.url}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <head>
        {/* Without JS the scroll-reveal animations never run, so make sure
            every element they hide starts visible instead. */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;filter:none!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-screen bg-ink-950 antialiased">
        <AnalyticsNoScript />
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-hnx-blue focus:px-5 focus:py-2.5 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
