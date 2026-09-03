import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { AboutSection } from "@/components/sections/AboutSection";
import { CTASection } from "@/components/sections/CTASection";
import { TrustIntro } from "@/components/sections/TrustIntro";
import { WhySection } from "@/components/sections/WhySection";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The HNX combines engineering, design, strategy, and artificial intelligence to build software that moves businesses forward.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
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
