import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { blogCategories, getBlogPostsByCategory } from "@/lib/blog";
import { site } from "@/lib/site";

const pageTitle = "Journal";
const pageDescription =
  "Engineering notes, product stories, security checklists, and AI guidance from The HNX.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: pageTitle,
    description: pageDescription,
    url: `${site.url}/blog`,
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

export default function BlogPage() {
  const all = getBlogPostsByCategory("all");

  return (
    <>
      <PageHero
        eyebrow="Journal"
        title="Notes from the build"
        highlight="room."
        description="Engineering notes, product stories, security checklists, and AI guidance from The HNX."
      >
        <ButtonLink href="/contact" size="lg" icon={<ArrowRight className="h-[18px] w-[18px]" />}>
          Discuss your project
        </ButtonLink>
      </PageHero>

      <section className="relative overflow-hidden border-y border-slate-900/[0.06] py-20 sm:py-24">
        <div className="shell relative flex flex-col gap-12">
          <SectionHeading
            eyebrow="Categories"
            title="Filter by"
            highlight="topic."
            description="Pick what you are working on today."
          />

          <nav className="flex flex-wrap gap-2">
            {blogCategories.map((category) => (
              <button
                key={category.slug}
                className="px-4 py-2 rounded-full border border-slate-900/10 bg-white/90 text-[0.8125rem] font-medium text-mist-300 transition-colors hover:border-hnx-blue/30 hover:text-hnx-blue focus-visible:outline-2 focus-visible:outline-hnx-blue"
              >
                {category.label}
              </button>
            ))}
          </nav>
        </div>
      </section>

      <section className="relative overflow-hidden py-20 sm:py-24">
        <div className="shell relative">
          <Stagger className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {all.map((post) => (
              <StaggerItem key={post.slug} className="h-full">
                <article className="glass edge-glow group flex h-full flex-col rounded-2xl p-6 sm:p-8 hover:border-hnx-blue/30 transition-colors duration-300">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="h-6 w-6 shrink-0 rounded-full border border-slate-900/10 bg-slate-900/20 flex items-center justify-center">
                      <post.icon className="h-3 w-3 text-mist-400 group-hover:text-hnx-cyan transition-colors" />
                    </span>
                    <span className="eyebrow text-mist-400">{post.category}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-mist-100 group-hover:text-hnx-cyan transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-[0.875rem] leading-relaxed text-mist-300">
                    {post.summary}
                  </p>
                  <div className="mt-auto flex items-baseline gap-2 pt-4">
                    <span className="text-[0.75rem] font-mono text-mist-400">
                      {post.readTime} · {post.publishedAt}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-hnx-blue font-semibold hover:text-hnx-cyan transition-colors"
                    >
                      Read <ArrowRight className="h-3.5 w-3.5 ml-0.5" strokeWidth={1.8} />
                    </Link>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CTASection />
    </>
  );
}
