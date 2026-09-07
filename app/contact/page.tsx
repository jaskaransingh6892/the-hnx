import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { ContactSection } from "@/components/sections/ContactSection";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Start a project with ${site.name}. Tell us what you are building and a senior engineer will reply within one business day.`,
  alternates: { canonical: "/contact" },
};

// Marks this as the organisation's contact page and hangs the reachable
// channels off the same Organization node the root layout declares, which is
// what a knowledge panel reads when it shows a phone number or an email.
const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: `${site.url}/contact`,
  name: `Contact ${site.name}`,
  inLanguage: "en",
  isPartOf: { "@id": `${site.url}/#website` },
  mainEntity: {
    "@id": `${site.url}/#organization`,
    "@type": "Organization",
    name: site.name,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: site.salesEmail,
      telephone: site.phone,
      areaServed: "Worldwide",
      availableLanguage: ["English", "Hindi"],
    },
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactSchema).replace(/</g, "\\u003c"),
        }}
      />
      <PageHero
        eyebrow="Contact"
        title="Let's Build"
        highlight="What's Next."
        description="Tell us what you have in mind. Rough ideas are welcome — most of the best projects arrive as a paragraph and a question."
      />
      <ContactSection />
    </>
  );
}
