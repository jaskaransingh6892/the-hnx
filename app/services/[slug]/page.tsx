import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/lib/content";
import { servicePages } from "@/lib/service-pages";
import { site } from "@/lib/site";

/** Every service is known at build time, so all eight pages are static. */
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

function find(slug: string) {
  const service = services.find((item) => item.slug === slug);
  const page = servicePages[slug];
  return service && page ? { service, page } : null;
}

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
      type: "article",
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
  const related = services.filter((item) => item.slug !== slug).slice(0, 3);
  const url = `${site.url}/services/${slug}`;

  /* Three schemas, each doing a different job: Service describes the offering,
     BreadcrumbList gives Google the path to show under the result, and FAQPage
     makes the questions eligible to appear beneath it. */
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
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faq.map((entry) => ({
        "@type": "Question",
        name: entry.q,
        acceptedAnswer: { "@type": "Answer", text: entry.a },
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageHero eyebrow={service.title} title={page.h1} description={service.tagline}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/contact" size="lg" icon={<ArrowRight className="h-[18px] w-[18px]" />}>
            Discuss your project
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

      <section className="relative overflow-hidden border-y border-white/[0.06] py-20 sm:py-24">
        <div className="shell flex flex-col gap-12">
          <SectionHeading
            eyebrow="What we build"
            title="Inside"
            highlight={service.title}
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
                  href="/contact"
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

      <section className="relative overflow-hidden border-y border-white/[0.06] py-20 sm:py-24">
        <div className="shell flex flex-col gap-12">
          <SectionHeading
            eyebrow="Questions"
            title="Asked before"
            highlight="every engagement"
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
