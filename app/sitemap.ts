import type { MetadataRoute } from "next";
import { products, services } from "@/lib/content";
import { caseStudies } from "@/lib/case-studies";
import { guides } from "@/lib/guides";
import { nav, site } from "@/lib/site";

const url = (path: string) => `${site.url}${path === "/" ? "" : path}`;

/**
 * Record substantial content changes, rather than restamping every URL on
 * every deploy. Search engines can use an accurate lastmod when recrawling.
 */
const LAST_CONTENT_UPDATE = new Date("2026-09-07");
const RECENT_CONTENT_UPDATE = new Date("2026-11-04");
const updatedPages = new Set(["/", "/services", "/products", "/contact"]);

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = nav.map((item) => ({
    url: url(item.href),
    lastModified: updatedPages.has(item.href) ? RECENT_CONTENT_UPDATE : LAST_CONTENT_UPDATE,
  }));

  // List each indexable service page alongside the core pages.
  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: url(`/services/${service.slug}`),
    lastModified: RECENT_CONTENT_UPDATE,
  }));

  // Only products with a written case study have a page to point at.
  const productPages: MetadataRoute.Sitemap = products
    .filter((product) => caseStudies[product.slug])
    .map((product) => ({
      url: url(`/products/${product.slug}`),
      lastModified: RECENT_CONTENT_UPDATE,
    }));

  const guidePages: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: url(`/guides/${guide.slug}`),
    lastModified: RECENT_CONTENT_UPDATE,
  }));

  const guideIndex: MetadataRoute.Sitemap = [
    {
      url: url("/guides"),
      lastModified: RECENT_CONTENT_UPDATE,
    },
  ];

  return [...pages, ...servicePages, ...productPages, ...guideIndex, ...guidePages];
}
