import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { products, services } from "@/lib/content";
import { caseStudies } from "@/lib/case-studies";
import { guides } from "@/lib/guides";
import { servicePages } from "@/lib/service-pages";
import { site } from "@/lib/site";

/** Every service is known at build time, so the detail pages are static. */
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

function find(slug: string) {
  const service = services.find((item) => item.slug === slug);
  const page = servicePages[slug];
  return service && page ? { service, page } : null;
}

const relatedProductSlugs: Record<string, string[]> = {
  "web-development": ["myinventory", "educationcloud"],
  "erp-business-systems": ["myinventory", "educationcloud", "nabz"],
  "ai-automation": ["educationcloud"],
  "cloud-api": ["educationcloud"],
  "ui-ux-design": ["nabz", "myinventory"],
};

const contactTypes: Record<string, string> = {
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

const pairedServiceSlugs: Record<string, string[]> = {
  "web-development": ["cybersecurity", "ui-ux-design", "cloud-api"],
  "erp-business-systems": ["custom-software", "cloud-api", "cybersecurity"],
  cybersecurity: ["web-development", "cloud-api", "custom-software"],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const found = find(slug);
  if (!found) return {};

  const { page } = found;
  return {
    // Absolute so the searched-for phrase leads the tab and the SERP entry
    // instead of the site name, which the template would otherwise put first.
    title: { absolute: `${page.metaTitle} | ${site.name}` },
    description: page.metaDescription,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      type: "website",
      title: page.metaTitle,
      description: page.metaDescription,
      url: `${site.url}/services/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const found = find(slug);
  if (!found) notFound();

  const { service, page } = found;
  const related = pairedServiceSlugs[slug]
    ? pairedServiceSlugs[slug]
        .map((pairedSlug) => services.find((item) => item.slug === pairedSlug))
        .filter((item): item is (typeof services)[number] => Boolean(item))
    : services.filter((item) => item.slug !== slug).slice(0, 3);
  const relatedProducts = products.filter(
    (product) => relatedProductSlugs[slug]?.includes(product.slug) && caseStudies[product.slug],
  );
  const relatedGuide = guides.find((guide) => guide.serviceHref === `/services/${slug}`);
  const contactHref = contactTypes[slug]
    ? `/contact?type=${encodeURIComponent(contactTypes[slug])}`
    : "/contact";
  const url = `${site.url}/services/${slug}`;

  /* Service describes the offering; BreadcrumbList describes its position in
     the site. The visible FAQs remain useful, but Google retired FAQ rich
     results in 2026, so FAQPage markup is no longer added. */
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.title,
      serviceType: service.title,
      description: page.metaDescription,
      url,
      // Reference the Organization the root layout declares rather than
      // describing a second one here — two partial Organization nodes for the
      // same company split the entity signal instead of reinforcing it.
      provider: { "@id": `${site.url}/#organization` },
      areaServed: "Worldwide",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `${service.title} capabilities`,
        itemListElement: page.build.map((item) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: item.name, description: item.body },
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "Services", item: `${site.url}/services` },
        { "@type": "ListItem", position: 3, name: service.title, item: url },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />

      <PageHero eyebrow={service.title} title={page.h1} description={service.description}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={contactHref} size="lg" icon={<ArrowRight className="h-[18px] w-[18px]" />}>
            {slug === "cybersecurity" ? "Scope a security assessment" : "Discuss your project"}
          </ButtonLink>
          <ButtonLink href="/services" size="lg" variant="secondary">
            All services
          </ButtonLink>
        </div>
      </PageHero>

      <nav aria-label="Breadcrumb" className="shell relative pb-2">
        <ol className="flex flex-wrap items-center gap-2 text-[0.75rem] text-mist-400">
          <li>
            <Link href="/" className="transition-colors hover:text-mist-200">
              Home
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href="/services" className="transition-colors hover:text-mist-200">
              Services
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-mist-200">{service.title}</li>
        </ol>
      </nav>

      <section className="relative py-14 sm:py-20">
        <div className="shell flex flex-col gap-6">
          {page.intro.map((paragraph, index) => (
            <Reveal key={paragraph.slice(0, 24)} delay={index * 0.06}>
              <p className="max-w-3xl text-[1.0625rem] leading-relaxed text-mist-200">
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-slate-900/[0.06] py-20 sm:py-24">
        <div className="shell flex flex-col gap-12">
          <SectionHeading
            eyebrow={slug === "cybersecurity" ? "What we assess" : "What we build"}
            title={slug === "cybersecurity" ? "Website and API" : "Inside"}
            highlight={slug === "cybersecurity" ? "security testing" : service.title}
            description={service.description}
          />
          <Stagger className="grid gap-5 md:grid-cols-2">
            {page.build.map((item) => (
              <StaggerItem key={item.name}>
                <article className="glass edge-glow h-full rounded-2xl p-6 sm:p-7">
                  <h3 className="font-display text-lg font-bold text-mist-100">{item.name}</h3>
                  <p className="mt-3 text-[0.875rem] leading-relaxed text-mist-300">{item.body}</p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {page.deliverables?.length ? (
        <section className="relative py-20 sm:py-24">
          <div className="shell flex flex-col gap-10">
            <SectionHeading
              eyebrow="Clear handover"
              title="What you"
              highlight="receive"
              description="The exact scope is agreed before work starts, so your team knows what will be delivered."
            />
            <Stagger className="grid gap-5 md:grid-cols-3">
              {page.deliverables.map((item) => (
                <StaggerItem key={item.title}>
                  <article className="glass h-full rounded-2xl p-6 sm:p-7">
                    <h3 className="font-display text-base font-bold text-mist-100">{item.title}</h3>
                    <p className="mt-3 text-[0.875rem] leading-relaxed text-mist-300">{item.body}</p>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      ) : null}

      <section className="relative py-20 sm:py-24">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div className="flex flex-col gap-8">
            <SectionHeading
              align="left"
              eyebrow="How we approach it"
              title="What actually"
              highlight="decides the outcome"
            />
            <ul className="flex flex-col gap-6">
              {page.approach.map((item, index) => (
                <li key={item.title}>
                  <Reveal delay={index * 0.06}>
                    <h3 className="font-display text-base font-bold text-mist-100">{item.title}</h3>
                    <p className="mt-2 text-[0.875rem] leading-relaxed text-mist-300">{item.body}</p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-8">
            <SectionHeading align="left" eyebrow="Who this is for" title="You probably need this if" />
            <ul className="flex flex-col gap-3">
              {page.audience.map((item, index) => (
                <li key={item}>
                  <Reveal delay={index * 0.06}>
                    <div className="glass flex items-start gap-3 rounded-2xl p-4">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-hnx-cyan" strokeWidth={2.2} />
                      <span className="text-[0.875rem] leading-relaxed text-mist-200">{item}</span>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>

            <Reveal delay={0.1}>
              <div className="glass rounded-2xl p-6">
                <p className="text-[0.875rem] leading-relaxed text-mist-300">
                  Not sure this is the right one? Describe the problem and we will tell you which
                  of these it actually is — including when the answer is none of them.
                </p>
                <Link
                  href={contactHref}
                  className="mt-4 inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-hnx-cyan transition-colors hover:text-hnx-blue"
                >
                  Start a conversation
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 ? (
        <section className="relative overflow-hidden border-y border-slate-900/[0.06] py-20 sm:py-24">
          <div className="shell flex flex-col gap-10">
            <SectionHeading
              eyebrow="Related work"
              title="See the systems"
              highlight="we have built"
              description="Explore the product decisions behind work in this service area."
            />
            <Stagger className="grid gap-5 md:grid-cols-3">
              {relatedProducts.map((product) => (
                <StaggerItem key={product.slug}>
                  <Link
                    href={`/products/${product.slug}`}
                    className="glass edge-glow group flex h-full flex-col gap-2.5 rounded-2xl p-6"
                  >
                    <h3 className="font-display text-base font-bold text-mist-100">{product.name}</h3>
                    <p className="text-[0.8125rem] leading-relaxed text-mist-300">{product.summary}</p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-[0.8125rem] font-medium text-hnx-cyan">
                      Read the case study
                      <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
                    </span>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      ) : null}

      {relatedGuide ? (
        <section className="relative border-y border-slate-900/[0.06] bg-white py-16 sm:py-20">
          <div className="shell">
            <div className="glass edge-glow flex flex-col gap-6 rounded-[2rem] p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="eyebrow text-hnx-blue">Practical guide</p>
                <h2 className="mt-3 font-display text-2xl font-bold text-mist-100 sm:text-3xl">
                  {relatedGuide.title}
                </h2>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-mist-300">
                  {relatedGuide.description}
                </p>
              </div>
              <Link
                href={`/guides/${relatedGuide.slug}`}
                className="inline-flex shrink-0 items-center gap-2 text-[0.875rem] font-semibold text-hnx-blue transition-colors hover:text-hnx-cyan"
              >
                Read the guide
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      <section className="relative overflow-hidden border-y border-slate-900/[0.06] py-20 sm:py-24">
        <div className="shell flex flex-col gap-12">
          <SectionHeading
            eyebrow="Questions"
            title="Common questions"
            highlight="answered"
          />
          <dl className="mx-auto flex w-full max-w-3xl flex-col gap-4">
            {page.faq.map((entry, index) => (
              <Reveal key={entry.q} delay={index * 0.05}>
                <div className="glass rounded-2xl p-6">
                  <dt className="font-display text-base font-bold text-mist-100">{entry.q}</dt>
                  <dd className="mt-2.5 text-[0.875rem] leading-relaxed text-mist-300">{entry.a}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <section className="relative py-20 sm:py-24">
        <div className="shell flex flex-col gap-10">
          <SectionHeading eyebrow="Related" title="Often paired with" />
          <Stagger className="grid gap-5 md:grid-cols-3">
            {related.map((item) => (
              <StaggerItem key={item.slug}>
                <Link
                  href={`/services/${item.slug}`}
                  className="glass edge-glow group flex h-full flex-col gap-2.5 rounded-2xl p-6 transition-colors"
                >
                  <h3 className="font-display text-base font-bold text-mist-100">{item.title}</h3>
                  <p className="text-[0.8125rem] leading-relaxed text-mist-300">{item.tagline}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-[0.8125rem] font-medium text-hnx-cyan">
                    Read more
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={1.8}
                    />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CTASection />
    </>
  );
}
