import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ButtonLink } from "@/components/ui/Button";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { engagementModels } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Process",
  description:
    "Discover, strategy, design, build, launch and scale — how The HNX turns an idea into software that lasts.",
  alternates: { canonical: "/process" },
};

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Our process"
        title="A process with"
        highlight="no mystery in it."
        description="Five stages, clear deliverables at each one, and a demo you can click at the end of every sprint. You always know what is being built and why."
      >
        <ButtonLink href="/contact" size="lg" icon={<ArrowRight className="h-[18px] w-[18px]" />}>
          Book a discovery call
        </ButtonLink>
      </PageHero>

      <ProcessSection />

      <section className="relative py-20 sm:py-24">
        <div className="shell flex flex-col gap-12">
          <SectionHeading
            eyebrow="Engagement"
            title="Pick the shape that"
            highlight="fits the work"
            description="The process stays the same. Only the commercial wrapper changes."
          />
          <Stagger className="grid gap-5 md:grid-cols-3">
            {engagementModels.map((model) => (
              <StaggerItem key={model.title} className="h-full">
                <FeatureCard feature={model} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CTASection />
    </>
  );
}
