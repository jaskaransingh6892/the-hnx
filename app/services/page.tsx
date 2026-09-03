import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { ButtonLink } from "@/components/ui/Button";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { engagementModels, services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom software, web and mobile applications, ERP and CRM platforms, AI automation, cloud architecture, and product design — engineered by The HNX.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Technology Built Around"
        highlight="Your Vision"
        description="Sixteen capabilities across eight disciplines. Engage us for one of them or hand over the entire problem — the standard does not change."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/contact" size="lg" icon={<ArrowRight className="h-[18px] w-[18px]" />}>
            Discuss your project
          </ButtonLink>
          <ButtonLink href="/process" size="lg" variant="secondary">
            See how we work
          </ButtonLink>
        </div>
      </PageHero>

      <section className="relative py-8 sm:py-12">
        <div className="shell">
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <StaggerItem key={service.slug} className="h-full">
                <ServiceCard service={service} index={index} showCapabilities />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-white/[0.06] py-24 sm:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-hnx-blue/10 blur-[130px]"
        />
        <div className="shell relative flex flex-col gap-12">
          <SectionHeading
            align="left"
            eyebrow="The full catalogue"
            title="Every capability, in"
            highlight="plain language."
            description="No packages, no tiers. We scope what the work actually needs."
          />

          <div className="grid gap-x-10 gap-y-10 md:grid-cols-2">
            {services.map((service, index) => (
              <Reveal key={service.slug} delay={(index % 2) * 0.06}>
                <div id={service.slug} className="scroll-mt-32">
                  <h3 className="font-display text-lg font-semibold text-mist-100">
                    {service.title}
                  </h3>
                  <p className="mt-1.5 text-[0.8125rem] text-mist-400">{service.tagline}</p>
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {service.capabilities.map((capability) => (
                      <li key={capability} className="flex items-start gap-2.5">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-hnx-cyan" strokeWidth={2} />
                        <span className="text-[0.875rem] text-mist-200">{capability}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 sm:py-28">
        <div className="shell flex flex-col gap-12">
          <SectionHeading
            eyebrow="Engagement"
            title="Three ways to"
            highlight="work with us"
            description="Whichever shape fits, you get the same team and the same engineering standards."
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
