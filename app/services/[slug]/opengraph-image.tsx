import { ImageResponse } from "next/og";
import { OgCard, OG_SIZE } from "@/components/og/Card";
import { services } from "@/lib/content";
import { servicePages } from "@/lib/service-pages";
import { site } from "@/lib/site";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = `${site.name} — services`;

/** Same eight slugs as the pages, so every card is generated at build time. */
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = servicePages[slug];
  const service = services.find((item) => item.slug === slug);

  return new ImageResponse(
    (
      <OgCard
        eyebrow={service ? service.title : "Services"}
        heading={page ? page.h1 : site.tagline}
        footnote="Services"
      />
    ),
    size,
  );
}
