import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // The contact handler is the only route here that is not a page. It
        // returns nothing useful to a crawler and should not be spent budget on.
        disallow: "/api/",
      },
      // Named explicitly rather than left to the wildcard: the assistants people
      // now ask "who builds custom ERP software" are a real referral path, and
      // an explicit allow is what keeps them out of the disallow-by-default
      // posture some hosts apply to unknown agents.
      {
        userAgent: ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot"],
        allow: "/",
        disallow: "/api/",
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
