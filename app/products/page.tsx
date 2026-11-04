import type { Metadata } from "next";
import { ArrowRight, ArrowDown } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { ProductGallery } from "@/components/sections/ProductGallery";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { products } from "@/lib/content";
import { caseStudies } from "@/lib/case-studies";
import { site } from "@/lib/site";

const pageTitle = "Software Products & Case Studies";
const pageDescription =
  "Explore Nabz for clinics, MyInventory for retail, and EducationCloud for schools. Open the products and read how The HNX built each system.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/products" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: pageTitle,
    description: pageDescription,
    url: `${site.url}/products`,
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

// Only the products with a case-study page are listed: an ItemList entry
// pointing at a URL that does not exist is a broken promise to the crawler.
const listed = products.filter((product) => caseStudies[product.slug]);

const schema = [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    url: `${site.url}/products`,
    name: `Products — ${site.name}`,
    inLanguage: "en",
    isPartOf: { "@id": `${site.url}/#website` },
    about: { "@id": `${site.url}/#organization` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: listed.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: product.name,
        url: `${site.url}/products/${product.slug}`,
      })),
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Products", item: `${site.url}/products` },
    ],
  },
];

export default function ProductsPage() {
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
        eyebrow="Our products"
        title="Real products, real"
        highlight="build decisions"
        description="Explore the clinic, retail, and school platforms The HNX builds and operates. Open the product or read what was actually built and why."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="#portfolio" size="lg" icon={<ArrowDown className="h-[18px] w-[18px]" />}>
            Explore the work
          </ButtonLink>
          <ButtonLink href="/contact?type=Custom%20Software" size="lg" variant="secondary">
            Discuss a similar build
          </ButtonLink>
        </div>
      </PageHero>

      <section id="portfolio" className="relative scroll-mt-20 py-20 sm:py-24">
        <div className="shell flex flex-col gap-12">
          <SectionHeading
            eyebrow="Selected work"
            title="From a workflow"
            highlight="to working software"
            description="Each case study shows the problem, engineering choices, and shipped scope. The product links let you inspect the result yourself."
          />
          <ProductGallery />
        </div>
      </section>

      <section className="relative border-t border-slate-900/[0.06] bg-white py-20 sm:py-24">
        <div className="shell">
          <div className="glass edge-glow flex flex-col gap-7 rounded-[2rem] p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow text-hnx-blue">Your own workflow</p>
              <h2 className="mt-4 font-display text-2xl font-bold text-mist-100 sm:text-3xl">
                Need software shaped around your business?
              </h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-mist-300">
                Tell us what current tools make difficult: the people, records, and handoffs involved.
                We can discuss a scoped first release for your team.
              </p>
            </div>
            <ButtonLink
              href="/contact?type=Custom%20Software"
              size="lg"
              icon={<ArrowRight className="h-[18px] w-[18px]" />}
            >
              Discuss your system
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
