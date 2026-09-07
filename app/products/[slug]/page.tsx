import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, ExternalLink } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { products } from "@/lib/content";
import { caseStudies } from "@/lib/case-studies";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return products
    .filter((product) => caseStudies[product.slug])
    .map((product) => ({ slug: product.slug }));
}

function find(slug: string) {
  const product = products.find((item) => item.slug === slug);
  const study = caseStudies[slug];
  return product && study ? { product, study } : null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const found = find(slug);
  if (!found) return {};

  const { study } = found;
  return {
    title: { absolute: `${study.metaTitle} | ${site.name}` },
    description: study.metaDescription,
    alternates: { canonical: `/products/${slug}` },
    openGraph: {
      type: "article",
      title: study.metaTitle,
      description: study.metaDescription,
      url: `${site.url}/products/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: study.metaTitle,
      description: study.metaDescription,
    },
  };
}

export default async function ProductCaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const found = find(slug);
  if (!found) notFound();

  const { product, study } = found;
  const others = products.filter((item) => item.slug !== slug && caseStudies[item.slug]);
  const url = `${site.url}/products/${slug}`;

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: product.name,
      applicationCategory: "BusinessApplication",
      description: study.metaDescription,
      url: product.href ?? url,
      // Same Organization node the root layout declares, referenced by @id so
      // both products credit one company rather than two lookalike ones.
      author: { "@id": `${site.url}/#organization` },
      publisher: { "@id": `${site.url}/#organization` },
      operatingSystem: "Web",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "Products", item: `${site.url}/products` },
        { "@type": "ListItem", position: 3, name: product.name, item: url },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageHero eyebrow={product.category} title={study.h1} description={study.standfirst}>
        <div className="flex flex-wrap items-center gap-3">
          {product.href ? (
            <a
              href={product.href}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(100deg,#22d3ee_0%,#5b86ff_48%,#9b72f8_100%)] px-6 py-3 text-sm font-medium text-white shadow-[0_10px_40px_-12px_rgba(91,134,255,0.85)] transition-transform duration-300 hover:scale-[1.02]"
            >
              Open {product.name}
              <ExternalLink className="h-4 w-4" strokeWidth={1.8} />
            </a>
          ) : null}
          <ButtonLink href="/contact" size="lg" variant="secondary">
            Build something like this
          </ButtonLink>
          <StatusBadge status={product.status} />
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
            <Link href="/products" className="transition-colors hover:text-mist-200">
              Products
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-mist-200">{product.name}</li>
        </ol>
      </nav>

      <section className="relative py-14 sm:py-20">
        <div className="shell flex flex-col gap-10 lg:flex-row lg:gap-16">
          <div className="lg:w-1/3">
            <SectionHeading align="left" eyebrow="The problem" title="What it exists" highlight="to fix" />
          </div>
          <div className="flex flex-col gap-5 lg:w-2/3">
            {study.problem.map((paragraph, index) => (
              <Reveal key={paragraph.slice(0, 24)} delay={index * 0.06}>
                <p className="text-[1.0625rem] leading-relaxed text-mist-200">{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {study.results.length > 0 ? (
        <section className="relative overflow-hidden border-y border-white/[0.06] py-16">
          <div className="shell">
            <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {study.results.map((result) => (
                <StaggerItem key={result.label}>
                  <div className="glass rounded-2xl p-6">
                    <p className="font-display text-[2.25rem] font-bold leading-none text-gradient">
                      {result.metric}
                    </p>
                    <p className="mt-3 text-[0.8125rem] text-mist-300">{result.label}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      ) : null}

      <section className="relative overflow-hidden border-y border-white/[0.06] py-20 sm:py-24">
        <div className="shell flex flex-col gap-12">
          <SectionHeading
            eyebrow="How it was built"
            title="The decisions"
            highlight="that shaped it"
            description="Every one of these was a choice with an alternative — these are the reasons the alternative lost."
          />
          <ul className="mx-auto flex w-full max-w-3xl flex-col gap-4">
            {study.decisions.map((decision, index) => (
              <li key={decision.title}>
                <Reveal delay={index * 0.05}>
                  <div className="glass edge-glow rounded-2xl p-6">
                    <h3 className="font-display text-base font-bold text-mist-100">
                      {decision.title}
                    </h3>
                    <p className="mt-2.5 text-[0.875rem] leading-relaxed text-mist-300">
                      {decision.body}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative py-20 sm:py-24">
        <div className="shell flex flex-col gap-12">
          <SectionHeading eyebrow="Scope" title="What was" highlight="actually built" />
          <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {study.built.map((group) => (
              <StaggerItem key={group.area}>
                <article className="glass h-full rounded-2xl p-6">
                  <h3 className="font-display text-base font-bold text-mist-100">{group.area}</h3>
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <Check
                          className="mt-[3px] h-3.5 w-3.5 shrink-0 text-hnx-cyan"
                          strokeWidth={2.4}
                        />
                        <span className="text-[0.8125rem] leading-relaxed text-mist-300">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </article>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.08}>
            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
              <span className="eyebrow text-mist-400">Built with</span>
              {study.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[0.75rem] text-mist-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {others.length > 0 ? (
        <section className="relative overflow-hidden border-y border-white/[0.06] py-20 sm:py-24">
          <div className="shell flex flex-col gap-10">
            <SectionHeading eyebrow="Also ours" title="The other" highlight="product" />
            <div className="mx-auto grid w-full max-w-3xl gap-5">
              {others.map((item) => (
                <Reveal key={item.slug}>
                  <Link
                    href={`/products/${item.slug}`}
                    className="glass edge-glow group flex flex-col gap-2 rounded-2xl p-6"
                  >
                    <div className="flex items-baseline gap-2.5">
                      <h3 className="font-display text-lg font-bold text-mist-100">{item.name}</h3>
                      <span className="eyebrow text-mist-400">{item.category}</span>
                    </div>
                    <p className="text-[0.875rem] leading-relaxed text-mist-300">{item.summary}</p>
                    <span className="inline-flex items-center gap-1.5 pt-2 text-[0.8125rem] font-medium text-hnx-cyan">
                      Read the case study
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={1.8}
                      />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="relative py-16">
        <div className="shell flex justify-center">
          <ButtonLink
            href="/contact"
            size="lg"
            icon={<ArrowRight className="h-[18px] w-[18px]" />}
          >
            Discuss a product like this
          </ButtonLink>
        </div>
      </section>

      <CTASection />
    </>
  );
}
