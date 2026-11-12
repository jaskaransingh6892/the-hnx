import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { getBlogPost, getRelatedPosts, getBlogPostsByCategory, blogCategories } from "@/lib/blog";
import { site } from "@/lib/site";
import { LineReveal } from "@/components/motion/LineReveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: { absolute: `${post.title} | ${site.name}` },
    description: post.summary,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      url: `${site.url}/blog/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
    },
  };
}

export async function generateStaticParams() {
  return blogCategories.flatMap((category) =>
    getBlogPostsByCategory(category.slug).map((post) => ({ slug: post.slug })),
  );
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug);

  return (
    <>
      <PageHero
        eyebrow={post.category}
        title={post.title}
        description={post.summary}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/blog" size="lg" variant="secondary" icon={<ArrowRight className="h-[18px] w-[18px]" />}>
            Back to journal
          </ButtonLink>
          <ButtonLink href="/contact" size="lg">
            Discuss this topic
          </ButtonLink>
        </div>
      </PageHero>

      <section className="relative overflow-hidden border-y border-slate-900/[0.06] py-20 sm:py-24">
        <div className="shell relative grid gap-16 lg:grid-cols-[1fr_320px] lg:gap-20">
          <article className="prose-lg max-w-none">
            <Reveal className="flex flex-col gap-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="h-6 w-6 shrink-0 rounded-full border border-slate-900/10 bg-slate-900/20 flex items-center justify-center">
                  <post.icon className="h-3 w-3 text-mist-400" />
                </span>
                <span className="eyebrow font-semibold text-hnx-blue">{post.category}</span>
              </div>
              <time className="font-mono text-[0.75rem] tracking-[0.18em] text-mist-400 uppercase">
                {post.publishedAt}
              </time>
              <LineReveal
                as="h1"
                trigger="mount"
                delay={0.08}
                className="font-display text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.08] text-mist-100"
              >
                {post.title}
              </LineReveal>
              <p className="text-[1.125rem] leading-relaxed text-mist-200">
                {post.summary}
              </p>
            </Reveal>

            <div className="mt-12 flex flex-col gap-8">
              {post.body.split("\n\n").map((block, index) => {
                if (block.startsWith("# ")) {
                  return (
                    <Reveal key={index} delay={index * 0.04}>
                      <h2 className="font-display text-2xl font-bold text-mist-100 mt-8 mb-4">
                        {block.slice(2)}
                      </h2>
                    </Reveal>
                  );
                }
                if (block.startsWith("## ")) {
                  return (
                    <Reveal key={index} delay={index * 0.04}>
                      <h3 className="font-display text-xl font-bold text-mist-100 mt-6 mb-3">
                        {block.slice(3)}
                      </h3>
                    </Reveal>
                  );
                }
                if (block.startsWith("- ")) {
                  const items = block.split("\n").map((line) => line.slice(2));
                  return (
                    <Reveal key={index} delay={index * 0.04}>
                      <ul className="flex flex-col gap-3 text-mist-200">
                        {items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-[0.9375rem] leading-relaxed">
                            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-hnx-cyan" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </Reveal>
                  );
                }
                return (
                  <Reveal key={index} delay={index * 0.04}>
                    <p className="text-[0.9375rem] leading-relaxed text-mist-200">
                      {block}
                    </p>
                  </Reveal>
                );
              })}
            </div>
          </article>

          <aside className="lg:sticky lg:top-24 flex flex-col gap-6">
            <SectionHeading
              align="left"
              eyebrow="Related"
              title="More on this"
              highlight="topic."
            />
            <div className="flex flex-col gap-4">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/blog/${item.slug}`}
                  className="glass edge-glow flex items-center gap-4 rounded-xl p-4 hover:border-hnx-blue/30 transition-colors duration-300"
                >
                  <div className="h-10 w-10 shrink-0 rounded-lg border border-slate-900/10 bg-slate-900/20 flex items-center justify-center">
                    <item.icon className="h-4 w-4 text-mist-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[0.75rem] font-mono text-mist-400 uppercase">
                      {item.category}
                    </span>
                    <h4 className="font-display text-base font-bold text-mist-100">{item.title}</h4>
                  </div>
                  <ArrowRight className="ml-auto h-3.5 w-3.5 text-mist-400 group-hover:text-hnx-cyan transition-colors" strokeWidth={1.8} />
                </Link>
              ))}
            </div>

            <div className="mt-8 glass rounded-2xl p-6">
              <h3 className="font-display text-lg font-bold text-mist-100 mb-4">
                Discuss this topic
              </h3>
              <p className="text-[0.875rem] text-mist-300 mb-6">
                Have a question about this post or want to explore how it applies to your project?
              </p>
              <ButtonLink
                href={`/contact?type=Custom%20Software`}
                size="md"
                icon={<ArrowRight className="h-4 w-4" strokeWidth={1.8} />}
              >
                Start a conversation
              </ButtonLink>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
