import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { HorizontalScroller } from "@/components/motion/HorizontalScroller";
import { GridField } from "@/components/visuals/Aurora";
import { services } from "@/lib/content";

export function ServicesSection() {
  return (
    <section
      id="services"
      data-chapter="Services"
      className="relative overflow-hidden bg-[#f4f7ff] py-20 sm:py-24"
    >
      <GridField className="opacity-60" />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/4 h-96 w-96 rounded-full bg-hnx-violet/10 blur-[120px]"
      />

      <HorizontalScroller
        viewportClassName="shell"
        header={
          <div className="shell relative">
            <SectionHeading
              eyebrow="What we do"
              title="Websites, ERP &"
              highlight="Cybersecurity"
              description="Build a website, bring operations into one ERP, or assess web and API security. Explore the service that fits the problem you need solved."
            />
          </div>
        }
        footer={
          <Reveal className="shell relative flex justify-center" delay={0.1}>
            <ButtonLink
              href="/services"
              variant="secondary"
              size="lg"
              icon={<ArrowRight className="h-[18px] w-[18px]" />}
            >
              See every service
            </ButtonLink>
          </Reveal>
        }
      >
        {services.map((service, index) => (
          // The cards reveal as they arrive — horizontally on a wide screen,
          // down the grid on a narrow one. The delay only shapes the grid.
          <Reveal key={service.slug} className="h-full" delay={Math.min(index, 5) * 0.06}>
            <ServiceCard service={service} index={index} />
          </Reveal>
        ))}
      </HorizontalScroller>
    </section>
  );
}
