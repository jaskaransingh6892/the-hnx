import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { ProjectScopePlanner } from "@/components/sections/ProjectScopePlanner";
import { ButtonLink } from "@/components/ui/Button";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { engagementModels, projectTypes, services } from "@/lib/content";
import { servicePages } from "@/lib/service-pages";
import { site } from "@/lib/site";

const pageTitle = "Web Development, ERP, VAPT & Software Services";
const pageDescription =
  "Web development, custom ERP and CRM, website and API VAPT, and software engineering services for teams worldwide. Explore how The HNX works.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/services" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: pageTitle,
    description: pageDescription,
    url: `${site.url}/services`,
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

// The ItemList describes this catalogue and links to each service detail page.
const schema = [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    url: `${site.url}/services`,
    name: `Services — ${site.name}`,
    inLanguage: "en",
    isPartOf: { "@id": `${site.url}/#website` },
    about: { "@id": `${site.url}/#organization` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: service.title,
        url: `${site.url}/services/${service.slug}`,
      })),
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Services", item: `${site.url}/services` },
    ],
  },
];

const contactTypes: Record<string, (typeof projectTypes)[number]> = {
  "web-development": "Website",
  "custom-software": "Custom Software",
  "erp-business-systems": "ERP / CRM",
  cybersecurity: "Cybersecurity / VAPT",
  "mobile-applications": "Mobile App",
  "desktop-applications": "Desktop Software",
  "ai-automation": "AI Solution",
  "cloud-api": "Cloud / API",
  "ui-ux-design": "UI / UX Design",
};

const scopeOptions = services.map((service) => ({
  slug: service.slug,
  title: service.title,
  tagline: service.tagline,
  detailHref: `/services/${service.slug}`,
  contactHref: `/contact?type=${encodeURIComponent(contactTypes[service.slug] ?? "Other")}`,
  deliverables: servicePages[service.slug]?.deliverables ?? [],
}));

export default function ServicesPage() {
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
        eyebrow="Services"
        title="Web Development, ERP &"
        highlight="Cybersecurity Services"
        description="Custom websites and web apps, ERP and CRM platforms, VAPT and API security audits, and specialist software engineering for teams worldwide."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/contact" size="lg" icon={<ArrowRight className="h-[18px] w-[18px]" />}>
            Discuss your project
          </ButtonLink>
          <ButtonLink href="#scope-planner" size="lg" variant="secondary">
            Plan your scope
          </ButtonLink>
        </div>
      </PageHero>

      <section className="relative py-8 sm:py-12">
        <div className="shell">
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <StaggerItem key={service.slug} className="h-full">
                <ServiceCard service={service} index={index} showCapabilities />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section id="scope-planner" className="relative scroll-mt-20 border-y border-slate-900/[0.06] bg-white py-20 sm:py-24">
        <div className="shell flex flex-col gap-12">
          <SectionHeading
            eyebrow="Project planner"
            title="Find the right"
            highlight="starting scope"
            description="Choose the work and where you are today. Use the resulting checklist to prepare a focused first conversation."
          />
          <ProjectScopePlanner options={scopeOptions} />
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-slate-900/[0.06] py-20 sm:py-24">
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

      <section className="relative py-20 sm:py-24">
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
