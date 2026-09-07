import { ImageResponse } from "next/og";
import { OgCard, OG_SIZE } from "@/components/og/Card";
import { caseStudies } from "@/lib/case-studies";
import { products } from "@/lib/content";
import { site } from "@/lib/site";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = `${site.name} — product case study`;

/** Only the products that actually have a case-study page to share. */
export function generateStaticParams() {
  return products
    .filter((product) => caseStudies[product.slug])
    .map((product) => ({ slug: product.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = caseStudies[slug];

  return new ImageResponse(
    (
      <OgCard
        eyebrow="Case study"
        heading={study ? study.h1 : site.tagline}
        footnote="Products"
      />
    ),
    size,
  );
}
