import type { MetadataRoute } from "next";
import { services } from "@/lib/content";
import { nav, site } from "@/lib/site";

const url = (path: string) => `${site.url}${path === "/" ? "" : path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

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

  return [...pages, ...servicePages];
}
