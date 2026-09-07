import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { AboutSection } from "@/components/sections/AboutSection";
import { CTASection } from "@/components/sections/CTASection";
import { TrustIntro } from "@/components/sections/TrustIntro";
import { WhySection } from "@/components/sections/WhySection";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The HNX combines engineering, design, strategy, and artificial intelligence to build software that moves businesses forward.",
  alternates: { canonical: "/about" },
};

// Points /about at the Organization node declared in the root layout, so the
// page is registered as the company's own page rather than a loose document.
const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  url: `${site.url}/about`,
  name: `About ${site.name}`,
  inLanguage: "en",
  isPartOf: { "@id": `${site.url}/#website` },
  mainEntity: { "@id": `${site.url}/#organization` },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutSchema).replace(/</g, "\\u003c"),
        }}
      />
      <PageHero
        eyebrow="About us"
        title="Technology should move"
        highlight="businesses forward."
        description="The HNX was built with one belief, and every decision since has followed from it. We build our own products and we build for clients, with the same engineers and the same standards."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/contact" size="lg" icon={<ArrowRight className="h-[18px] w-[18px]" />}>
            Work with us
          </ButtonLink>
          <ButtonLink href="/products" size="lg" variant="secondary">
            See what we build
          </ButtonLink>
        </div>
      </PageHero>

      <TrustIntro />
      <AboutSection compact />
      <WhySection />
      <CTASection />
    </>
  );
}
