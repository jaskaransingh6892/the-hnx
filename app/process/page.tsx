import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ButtonLink } from "@/components/ui/Button";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { engagementModels, processSteps } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Process",
  description:
    "Discover, strategy, design, build, launch and scale — how The HNX turns an idea into software that lasts.",
  alternates: { canonical: "/process" },
};

// The page is already a numbered sequence; HowTo just states that in a form a
// crawler can read, which is what makes the individual steps eligible to show
// under the result rather than a single truncated paragraph.
const schema = [
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How ${site.name} builds software`,
    description:
      "The six phases every engagement moves through, from discovery to launch and scale.",
    url: `${site.url}/process`,
    step: processSteps.map((item, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: item.title,
      text: item.detail,
      url: `${site.url}/process#${item.title.toLowerCase()}`,
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Our Process", item: `${site.url}/process` },
    ],
  },
];

export default function ProcessPage() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
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
