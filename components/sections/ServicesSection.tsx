import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { GridField } from "@/components/visuals/Aurora";
import { services } from "@/lib/content";

export function ServicesSection() {
  return (
    <section id="services" className="relative overflow-hidden py-24 sm:py-32">
      <GridField className="opacity-60" />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/4 h-96 w-96 rounded-full bg-hnx-violet/10 blur-[120px]"
      />

      <div className="shell relative flex flex-col gap-14">
        <SectionHeading
          eyebrow="What we do"
          title="Technology Built Around"
          highlight="Your Vision"
          description="Sixteen capabilities, one engineering standard. Pick the piece you need, or hand us the whole problem."
        />

        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <StaggerItem key={service.slug} className="h-full">
              <ServiceCard service={service} index={index} />
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="flex justify-center" delay={0.1}>
          <ButtonLink
            href="/services"
            variant="secondary"
            size="lg"
            icon={<ArrowRight className="h-[18px] w-[18px]" />}
          >
            See every service
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
