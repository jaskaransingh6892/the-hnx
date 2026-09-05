import type { Metadata } from "next";
import { ArrowRight, Layers, Rocket, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { ProductGallery } from "@/components/sections/ProductGallery";
import { ButtonLink } from "@/components/ui/Button";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { products } from "@/lib/content";

export const metadata: Metadata = {
  title: "Products",
  description:
    "ERP, CRM, AI, automation, and commerce platforms built and owned by The HNX — with more in development.",
  alternates: { canonical: "/products" },
};

const productPrinciples = [
  {
    title: "Built from real problems",
    description:
      "Every product started as something a client needed and no vendor did properly.",
    icon: Layers,
  },
  {
    title: "Run in production by us",
    description:
      "We operate what we build, so reliability is our problem before it is ever yours.",
    icon: ShieldCheck,
  },
  {
    title: "Shipped continuously",
    description:
      "Roadmaps move in weeks. Customers see improvements, not a release note once a year.",
    icon: Rocket,
  },
];

export default function ProductsPage() {
  const live = products.filter((product) => product.status === "Live").length;

  return (
    <>
      <PageHero
        eyebrow="Products"
        title="Products Built for"
        highlight="the Future"
        description="Platforms we design, build, and support ourselves. Each one solves a problem we hit repeatedly in client work, then engineered properly."
      >
        <div className="flex flex-wrap items-center gap-4">
          <ButtonLink href="/contact" size="lg" icon={<ArrowRight className="h-[18px] w-[18px]" />}>
            Request a demo
          </ButtonLink>
          <p className="text-[0.8125rem] text-mist-400">
            {live} live · {products.length - live} in the pipeline
          </p>
        </div>
      </PageHero>

      <section className="relative py-8 sm:py-12">
        <div className="shell">
          <Reveal>
            <ProductGallery />
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-white/[0.06] py-20 sm:py-24">
        <div className="shell flex flex-col gap-12">
          <SectionHeading
            eyebrow="How we build products"
            title="Owned, operated,"
            highlight="and improved."
            description="Building our own software keeps us honest about the decisions we recommend to clients."
          />
          <Stagger className="grid gap-5 md:grid-cols-3">
            {productPrinciples.map((principle) => (
              <StaggerItem key={principle.title} className="h-full">
                <FeatureCard feature={principle} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CTASection />
    </>
  );
}
