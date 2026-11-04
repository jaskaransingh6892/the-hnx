import type { Metadata } from "next";
import { ArrowDown } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { ContactSection } from "@/components/sections/ContactSection";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/lib/site";

const pageTitle = "Discuss a Website, ERP or VAPT Project";
const pageDescription = `Discuss website development, ERP and CRM, or a scoped VAPT assessment with ${site.name}. Share the problem and the outcome you need.`;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: pageTitle,
    description: pageDescription,
    url: `${site.url}/contact`,
    locale: "en_US",
    images: [{ url: `${site.url}/opengraph-image`, width: 1200, height: 630, alt: "The HNX" }],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [`${site.url}/opengraph-image`],
  },
};

// Link the contact page and its channels to the Organization node declared
// in the root layout.
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
        title="Tell us what you need"
        highlight="built or assessed."
        description="A website to launch, an ERP workflow to untangle, or a website or API to assess? Share the problem and what a useful outcome would look like. Rough notes are welcome."
      >
        <ButtonLink href="#project-enquiry" size="lg" icon={<ArrowDown className="h-[18px] w-[18px]" />}>
          Start your enquiry
        </ButtonLink>
      </PageHero>
      <ContactSection />
    </>
  );
}
