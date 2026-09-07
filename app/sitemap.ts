import type { MetadataRoute } from "next";
import { products, services } from "@/lib/content";
import { caseStudies } from "@/lib/case-studies";
import { nav, site } from "@/lib/site";

const url = (path: string) => `${site.url}${path === "/" ? "" : path}`;

/**
 * When this was last a real content change — bump it when page copy changes,
 * not on every deploy. `new Date()` here would restamp all 18 URLs on every
 * build, and a lastmod that always says "just now" is one a crawler learns to
 * ignore, which is worse than not sending one.
 */
const LAST_CONTENT_UPDATE = new Date("2026-09-07");

export default function sitemap(): MetadataRoute.Sitemap {
  const now = LAST_CONTENT_UPDATE;

  const pages: MetadataRoute.Sitemap = nav.map((item) => ({
    url: url(item.href),
    lastModified: now,
    changeFrequency: item.href === "/" ? "weekly" : "monthly",
    priority: item.href === "/" ? 1 : 0.8,
  }));

  // The service pages are the ones written to rank, so they are listed
  // explicitly rather than left for the crawler to discover through links.
  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: url(`/services/${service.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Only products with a written case study have a page to point at.
  const productPages: MetadataRoute.Sitemap = products
    .filter((product) => caseStudies[product.slug])
    .map((product) => ({
      url: url(`/products/${product.slug}`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  return [...pages, ...servicePages, ...productPages];
}
