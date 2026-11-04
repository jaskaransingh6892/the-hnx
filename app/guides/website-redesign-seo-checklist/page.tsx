import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

const path = "/guides/website-redesign-seo-checklist";
const pageUrl = site.url + path;
const pageTitle = "Website Redesign SEO Checklist";
const socialImage = site.url + "/brand/social/social-card-og-1200x630.png";
const description =
  "Plan a website redesign with search visibility in mind: inventory existing URLs, map redirects, preserve useful content, verify canonicals and sitemaps, and monitor the launch.";

export const metadata: Metadata = {
  title: pageTitle,
  description,
  alternates: { canonical: path },
  openGraph: {
    type: "article",
    title: pageTitle,
    description,
    url: pageUrl,
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: "The HNX",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description,
    images: [socialImage],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: site.url },
    {
      "@type": "ListItem",
      position: 2,
      name: "Web Development",
      item: site.url + "/services/web-development",
    },
    { "@type": "ListItem", position: 3, name: "Website Redesign SEO Checklist", item: pageUrl },
  ],
};

const inventory = [
  {
    title: "Find the pages people already use",
    body: "Export the current sitemap and crawl the live site. Add Search Console pages, queries, and countries, plus analytics for enquiries or sales. A page with modest traffic may still bring valuable leads.",
  },
  {
    title: "Record what each page is for",
    body: "Note its primary question, audience, useful content, title, and destination in the new site. Decide which pages should stay, be improved, be combined, or be retired. Design decisions should follow that map.",
  },
  {
    title: "Capture links and working journeys",
    body: "Keep a list of important links from other sites and the paths visitors take to contact or buy. Test forms and tracking before changing them; a prettier page that loses enquiries is a failed redesign.",
  },
  {
    title: "Agree who can edit after launch",
    body: "Choose the content owner and editing workflow before the build. If every text change needs a deployment, useful pages become hard to maintain.",
  },
] as const;

const urlDecisions = [
  {
    decision: "Keep the URL",
    when: "The page still serves the same purpose.",
    action: "Improve its content and design at the existing address. Check the canonical URL points to that page.",
  },
  {
    decision: "Redirect to the closest match",
    when: "The URL changes or two useful pages become one.",
    action: "Map the old URL to the most relevant new page with a server-side permanent redirect, then update your own links.",
  },
  {
    decision: "Retire the page",
    when: "There is no useful equivalent.",
    action: "Remove it deliberately and let it return a proper not-found status. Sending every retired URL to the homepage can confuse visitors.",
  },
] as const;

const buildChecks = [
  {
    title: "Keep the answer, improve the presentation",
    body: "Preserve useful explanations, product details, and evidence while making them easier to scan. A redesign should not replace a page that answers a real question with a slogan.",
  },
  {
    title: "Make every page explain itself",
    body: "Give each important page a clear visible heading, descriptive title, useful snippet description, and normal links to related pages. Check that mobile visitors can read and use the same core content.",
  },
  {
    title: "Choose one preferred URL",
    body: "Use consistent canonical URLs, including the chosen HTTPS and www format. List those preferred URLs in the sitemap and point internal links directly to them.",
  },
  {
    title: "Protect the lead path",
    body: "Test the full contact or checkout flow in the new build, including where submissions arrive and whether analytics records the action. A successful button state alone does not prove delivery.",
  },
  {
    title: "Measure on real phones",
    body: "Review loading, interaction, and layout stability on mobile. Search Console's Core Web Vitals report uses real-user data; lab tools help identify the cause of a slow or shifting page.",
  },
  {
    title: "Check staging rules before release",
    body: "A staging site may be blocked from indexing. Confirm that the production site has the intended robots rules and no accidental noindex instructions when it goes live.",
  },
] as const;

const launchChecks = [
  "Each important old URL either still works or redirects to its mapped new page.",
  "Redirects land on the final page without unnecessary chains or a blanket homepage destination.",
  "New pages return a successful status, show the intended content, and have the intended canonical URL.",
  "The production robots file and page instructions allow the pages meant for Google.",
  "The XML sitemap contains the preferred live URLs, and internal links point to those URLs.",
  "Contact, booking, or purchase journeys have been tested end to end with a real destination.",
] as const;

const afterLaunch = [
  {
    title: "Inspect representative URLs",
    body: "Use Search Console's URL Inspection on the home page, a key service page, and a page that changed address. Check what Google can fetch and which canonical it sees.",
  },
  {
    title: "Watch pages and queries",
    body: "Compare Search Console indexing, impressions, clicks, and the queries bringing buyers to the site. Investigate missing pages, not-found errors, and unexpected canonical choices.",
  },
  {
    title: "Fix issues in the new experience",
    body: "Review mobile Core Web Vitals and the lead journey after launch. Keep the redirect map and content owner available so problems can be corrected as they appear.",
  },
] as const;

export default function WebsiteRedesignSeoChecklistPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />

      <PageHero
        eyebrow="Web development guide"
        title="Website redesign:"
        highlight="an SEO checklist"
        description="A new design is a chance to make your site clearer and faster. Use this checklist to carry forward the pages and paths people already rely on."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/contact?type=Website" size="lg" icon={<ArrowRight className="h-[18px] w-[18px]" />}>
            Discuss a redesign
          </ButtonLink>
          <ButtonLink href="/services/web-development" size="lg" variant="secondary">
            Explore web development
          </ButtonLink>
        </div>
      </PageHero>

      <nav aria-label="Breadcrumb" className="shell relative pb-2">
        <ol className="flex flex-wrap items-center gap-2 text-[0.75rem] text-mist-400">
          <li>
            <Link href="/" className="transition-colors hover:text-mist-200">Home</Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href="/services/web-development" className="transition-colors hover:text-mist-200">
              Web Development
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-mist-200">Website redesign checklist</li>
        </ol>
      </nav>

      <section className="relative py-14 sm:py-20">
        <div className="shell grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <SectionHeading align="left" eyebrow="Start here" title="Map the site" highlight="before design" />
          <div className="max-w-3xl space-y-5 text-[1.0125rem] leading-relaxed text-mist-200">
            <p>
              When URLs or content change, search engines have to understand the new version.
              Keep a written map of the old and new site before building starts. That map is
              also how your team avoids losing a useful page in a design review.
            </p>
            <p>
              Even a well-planned move can cause temporary changes in search visibility while
              Google recrawls pages. The goal is to remove avoidable mistakes and make the
              transition measurable, rather than promise unchanged rankings.
            </p>
            <p className="text-[0.875rem]">
              If URLs change, Google&apos;s{" "}
              <a
                href="https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes"
                className="font-medium text-hnx-blue underline underline-offset-4 hover:text-hnx-cyan"
              >
                site move guidance
              </a>{" "}
              recommends mapping old URLs to their new destinations and testing the move.
            </p>
            <div className="flex flex-wrap gap-4 pt-1 text-[0.8125rem] font-medium">
              <a href="#before" className="text-hnx-blue underline underline-offset-4 hover:text-hnx-cyan">Before</a>
              <a href="#build" className="text-hnx-blue underline underline-offset-4 hover:text-hnx-cyan">Build</a>
              <a href="#launch" className="text-hnx-blue underline underline-offset-4 hover:text-hnx-cyan">Launch</a>
              <a href="#after" className="text-hnx-blue underline underline-offset-4 hover:text-hnx-cyan">After launch</a>
            </div>
          </div>
        </div>
      </section>

      <section id="before" className="relative scroll-mt-28 border-y border-slate-900/[0.06] bg-white py-20 sm:py-24">
        <div className="shell flex flex-col gap-12">
          <SectionHeading
            eyebrow="Before design"
            title="Know what the current site"
            highlight="already earns"
            description="Start with real pages, buyer journeys, and questions. The inventory tells the design team what has value and what can change."
          />
          <ol className="grid gap-5 md:grid-cols-2">
            {inventory.map((item, index) => (
              <li key={item.title} className="glass edge-glow rounded-2xl p-6 sm:p-7">
                <span className="font-mono text-[0.75rem] font-semibold text-hnx-blue">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-mist-100">{item.title}</h3>
                <p className="mt-3 text-[0.875rem] leading-relaxed text-mist-300">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative py-20 sm:py-24">
        <div className="shell flex flex-col gap-10">
          <SectionHeading
            eyebrow="URL map"
            title="Give each old page"
            highlight="a decision"
            description="Record the old address, the new address if any, and the reason. Review important pages one by one instead of relying on a catch-all rule."
          />
          <div className="grid gap-5 md:grid-cols-3">
            {urlDecisions.map((item) => (
              <article key={item.decision} className="glass edge-glow h-full rounded-2xl p-6 sm:p-7">
                <h3 className="font-display text-lg font-bold text-mist-100">{item.decision}</h3>
                <p className="mt-3 text-[0.8125rem] font-semibold text-hnx-blue">{item.when}</p>
                <p className="mt-3 text-[0.875rem] leading-relaxed text-mist-300">{item.action}</p>
              </article>
            ))}
          </div>
          <p className="mx-auto max-w-3xl text-center text-[0.8125rem] leading-relaxed text-mist-400">
            Google recommends relevant permanent redirects for moved pages and explains how{" "}
            <a
              href="https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls"
              className="font-medium text-hnx-blue underline underline-offset-4 hover:text-hnx-cyan"
            >
              redirects, canonicals, and sitemaps
            </a>{" "}
            help indicate the preferred URL.
          </p>
        </div>
      </section>

      <section id="build" className="relative scroll-mt-28 border-y border-slate-900/[0.06] bg-white py-20 sm:py-24">
        <div className="shell flex flex-col gap-12">
          <SectionHeading
            eyebrow="During the build"
            title="Build the new experience"
            highlight="without blind spots"
            description="Design, content, search, and enquiry flow need to be checked together before the new site replaces the old one."
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {buildChecks.map((item) => (
              <article key={item.title} className="glass edge-glow h-full rounded-2xl p-6 sm:p-7">
                <h3 className="font-display text-base font-bold text-mist-100">{item.title}</h3>
                <p className="mt-3 text-[0.875rem] leading-relaxed text-mist-300">{item.body}</p>
              </article>
            ))}
          </div>
          <p className="mx-auto max-w-3xl text-center text-[0.8125rem] leading-relaxed text-mist-400">
            Google describes{" "}
            <a
              href="https://developers.google.com/search/docs/appearance/core-web-vitals"
              className="font-medium text-hnx-blue underline underline-offset-4 hover:text-hnx-cyan"
            >
              Core Web Vitals
            </a>{" "}
            as real-user measures of loading, responsiveness, and visual stability.
          </p>
        </div>
      </section>

      <section id="launch" className="relative scroll-mt-28 py-20 sm:py-24">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <SectionHeading
            align="left"
            eyebrow="Launch day"
            title="Check the site"
            highlight="people actually reach"
            description="Run these checks against the public production address, not only a staging preview."
          />
          <ul className="flex flex-col gap-4">
            {launchChecks.map((item) => (
              <li key={item} className="glass flex items-start gap-3 rounded-2xl p-5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-hnx-cyan" strokeWidth={2.2} />
                <span className="text-[0.875rem] leading-relaxed text-mist-200">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="after" className="relative scroll-mt-28 border-y border-slate-900/[0.06] bg-white py-20 sm:py-24">
        <div className="shell flex flex-col gap-12">
          <SectionHeading
            eyebrow="After launch"
            title="Measure the move"
            highlight="and correct it"
            description="The work is not finished when the new pages are published. Monitor what Google sees and what buyers do."
          />
          <ol className="grid gap-5 md:grid-cols-3">
            {afterLaunch.map((item, index) => (
              <li key={item.title} className="glass edge-glow rounded-2xl p-6 sm:p-7">
                <span className="font-mono text-[0.75rem] font-semibold text-hnx-blue">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-mist-100">{item.title}</h3>
                <p className="mt-3 text-[0.875rem] leading-relaxed text-mist-300">{item.body}</p>
              </li>
            ))}
          </ol>
          <p className="mx-auto max-w-3xl text-center text-[0.8125rem] leading-relaxed text-mist-400">
            The{" "}
            <a
              href="https://developers.google.com/search/docs/monitor-debug/search-console-start"
              className="font-medium text-hnx-blue underline underline-offset-4 hover:text-hnx-cyan"
            >
              Search Console guide
            </a>{" "}
            explains how to inspect URLs, monitor indexing, and compare search queries and pages.
          </p>
        </div>
      </section>

      <section className="relative py-20 sm:py-24">
        <div className="shell">
          <div className="glass edge-glow flex flex-col gap-6 rounded-[2rem] p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-display text-[clamp(1.6rem,3.6vw,2.4rem)] font-bold text-mist-100">
                Planning a website redesign?
              </h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-mist-300">
                Share the current site, pages that matter to your business, and what you want to
                change. We can discuss the build and a migration plan together.
              </p>
            </div>
            <Link
              href="/contact?type=Website"
              className="inline-flex shrink-0 items-center gap-2 text-[0.875rem] font-semibold text-hnx-blue transition-colors hover:text-hnx-cyan"
            >
              Discuss your redesign
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
