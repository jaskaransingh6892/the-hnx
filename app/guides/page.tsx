import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { guides } from "@/lib/guides";
import { site } from "@/lib/site";

const pageTitle = "Guides for Website Development, ERP & VAPT";
const pageDescription =
  "Practical guides from The HNX for planning a website redesign, retail ERP, and an authorized website or API security assessment.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/guides" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: pageTitle,
    description: pageDescription,
    url: `${site.url}/guides`,
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

const schema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: `Guides — ${site.name}`,
  url: `${site.url}/guides`,
  inLanguage: "en",
  isPartOf: { "@id": `${site.url}/#website` },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: guides.map((guide, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: guide.title,
      url: `${site.url}/guides/${guide.slug}`,
    })),
  },
};

export default function GuidesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />
      <PageHero
        eyebrow="Practical guides"
        title="Website, ERP & VAPT"
        highlight="planning guides"
        description="Clear checklists for the decisions that shape a website, business system, or security assessment. Each guide points to the service and work behind it."
      >
        <ButtonLink href="/contact" size="lg" icon={<ArrowRight className="h-[18px] w-[18px]" />}>
          Discuss your project
        </ButtonLink>
      </PageHero>

      <nav aria-label="Breadcrumb" className="shell relative pb-2">
        <ol className="flex items-center gap-2 text-[0.75rem] text-mist-400">
          <li>
            <Link href="/" className="transition-colors hover:text-mist-200">
              Home
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-mist-200">Guides</li>
        </ol>
      </nav>

      <section className="relative py-16 sm:py-24">
        <div className="shell grid gap-5 md:grid-cols-3">
          {guides.map((guide) => (
            <article key={guide.slug} className="glass edge-glow flex h-full flex-col rounded-2xl p-6 sm:p-8">
              <p className="eyebrow text-hnx-blue">{guide.category}</p>
              <h2 className="mt-5 font-display text-xl font-bold text-mist-100">
                <Link href={`/guides/${guide.slug}`} className="hover:text-hnx-blue">
                  {guide.title}
                </Link>
              </h2>
              <p className="mt-3 text-[0.875rem] leading-relaxed text-mist-300">{guide.description}</p>
              <Link
                href={`/guides/${guide.slug}`}
                className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[0.875rem] font-semibold text-hnx-blue hover:text-hnx-cyan"
              >
                Read the guide
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
