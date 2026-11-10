import type { LucideIcon } from "lucide-react";
import { Activity, Code, Globe, ShieldCheck, Sparkles } from "lucide-react";

export type BlogCategory = {
  slug: string;
  label: string;
};

export const blogCategories: BlogCategory[] = [
  { slug: "all", label: "All" },
  { slug: "engineering", label: "Engineering" },
  { slug: "product", label: "Product" },
  { slug: "security", label: "Security" },
  { slug: "ai", label: "AI & Automation" },
];

export type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  body: string;
  category: string;
  categorySlug: string;
  icon: LucideIcon;
  readTime: string;
  publishedAt: string;
  image?: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "why-custom-erp-beats-off-the-shelf",
    title: "Why Custom ERP Beats Off-the-Shelf for Growing Teams",
    summary:
      "Most businesses outgrow generic ERP within two years. Here is why a purpose-built system pays for itself faster than a subscription you cannot change.",
    body: `# Why Custom ERP Beats Off-the-Shelf for Growing Teams

Most growing businesses start with an off-the-shelf ERP or accounting package. It is fast to sign up, the per-seat price looks reasonable, and the feature list is long. Six to eighteen months later, the same team is running spreadsheets beside the system, importing CSVs by hand, and paying for modules nobody uses.

That is not a failure of the software. It is a failure of fit.

## The Fit Problem

Off-the-shelf software is built for an imaginary average customer. Your business is not average — it has exceptions, edge cases, and workflows that developed because of who your customers are and how your team works. When the software does not match, people build workarounds. Workarounds become the real process. Soon the software is just expensive record-keeping.

## What Custom Changes

A custom ERP is shaped around the work that actually happens:

- **One source of truth** — stock, sales, finance, and customer records live in the same system, not three spreadsheets that disagree.
- **Roles decide the screens** — a counter operator, a warehouse manager, and a finance lead see different halves of the same system, with an audit log recording who did what.
- **No per-seat tax on growth** — you add users because the business needs them, not because the licence allows it.
- **Integrates what you already own** — instead of forcing you to replace tools that work, a custom system connects to them.

## When to Build, When to Buy

Buy when your workflow is standard — payroll, tax filing, basic bookkeeping. Build when the work itself is your competitive advantage, or when the workaround is costing more than the software would.

The right question is not "can we afford to build this?" It is "can we afford to keep working around software that does not fit?"

## The HNX Approach

We build ERP and CRM systems module by module. The first module reaches production early, solves one painful workflow, and earns trust before the next one starts. You own the code, the repositories, and the infrastructure accounts from day one.

If you are evaluating a replacement for disconnected retail or operations tools, read our [Retail ERP planning guide](/guides/retail-erp-planning) before you shortlist vendors.`,
    category: "Engineering",
    categorySlug: "engineering",
    icon: Code,
    readTime: "6 min read",
    publishedAt: "2026-10-15",
  },
  {
    slug: "vapt-checklist-before-you-launch",
    title: "Website & API VAPT Checklist: What to Prepare Before Testing",
    summary:
      "A security assessment is only as good as its scope. Here is what to have ready before a penetration tester touches your production environment.",
    body: `# Website & API VAPT Checklist: What to Prepare Before Testing

A scanner can list exposed software versions. It cannot tell you whether one customer's account can read another customer's records. That kind of finding needs an assessment shaped around the application itself — and that starts with preparation.

## Before Testing Begins

### 1. Written Authorization

Never test without written scope and authorization. Document which domains, environments, APIs, and user roles are in scope. Agree test windows, rate limits, and activities to avoid — especially on production.

### 2. Access and Accounts

Create dedicated test accounts for each role you want assessed: admin, customer, support, and unauthenticated visitor. Share credentials securely, never through chat or email where they can be intercepted.

### 3. Environment Choice

Staging is safer for active testing. If production must be tested, limit it to read-only or low-impact checks during off-peak hours, with a rollback plan ready.

### 4. Integrations and Third Parties

List every integration — payment gateways, email providers, identity providers. Some may block automated traffic or treat test activity as fraud. Notify them in advance where required.

### 5. Reporting Expectations

Agree what "done" looks like. A prioritized report should include confirmed issues with evidence, reproduction context, severity rationale, and practical fix recommendations — not just scanner output.

## What We Deliver

At The HNX, every VAPT engagement includes an agreed test scope, a prioritized findings report, and a remediation walkthrough with your engineering team. Retesting is scoped separately after fixes are applied.

For a detailed preparation checklist, see our [Website & API VAPT checklist](/guides/website-api-vapt-checklist).`,
    category: "Security",
    categorySlug: "security",
    icon: ShieldCheck,
    readTime: "5 min read",
    publishedAt: "2026-10-08",
  },
  {
    slug: "ai-assistants-that-cite-sources",
    title: "AI Assistants That Cite Sources: Grounding RAG in Your Data",
    summary:
      "Generic chatbots hallucinate. A RAG assistant grounded in your own documents answers with sources your team can verify. Here is how we build them.",
    body: `# AI Assistants That Cite Sources: Grounding RAG in Your Data

An AI prototype can look convincing while failing on messy inputs, changing data, or real user questions. Useful systems start with a bounded task and an evaluation plan.

## The Problem With Generic Chatbots

A chatbot trained on the public web does not know your pricing, your refund policy, or your product roadmap. When it guesses, customers act on bad information. Worse, it sounds confident while doing it.

## Retrieval-Augmented Generation (RAG)

RAG changes the pattern. Instead of asking the model to remember everything, you:

1. Index approved company content — documentation, policies, past tickets, product data.
2. Retrieve the most relevant passages for each user question.
3. Ask the model to answer using only those passages, with citations.

The answer points at the document it came from. Anything unverifiable does not survive contact with a real decision.

## Evaluation Before Deployment

We build a test set from your real questions and measure against it. Without that, "it seems better" is the only available verdict. A human stays in the loop where money or legal weight is attached — the system proposes, a person approves.

## Data Handling

We document retention, training use, and access controls before choosing a managed or private setup. Where the requirement is strict, we can assess a model in your own environment.

If your team answers the same questions from the same documents every week, a knowledge assistant usually pays for itself in weeks. Read our [AI & Automation service page](/services/ai-automation) for the full approach.`,
    category: "AI & Automation",
    categorySlug: "ai",
    icon: Sparkles,
    readTime: "7 min read",
    publishedAt: "2026-10-01",
  },
  {
    slug: "redesign-without-losing-seo",
    title: "Website Redesign Without Losing SEO Rankings",
    summary:
      "A redesign can rebuild your brand or bury your traffic. The difference is a URL map, redirects, and search checks done before launch, not after.",
    body: `# Website Redesign Without Losing SEO Rankings

A website redesign is usually sold as a visual refresh. For search engines, it is a migration — and migrations fail quietly. Pages disappear, URLs change, backlinks break, and traffic drops before anyone notices.

## The URL Map

Before design starts, inventory every URL that currently gets traffic. Map each old URL to its new equivalent. Pages with no replacement should return 410 (gone), not 404, so search engines drop them cleanly.

## Redirects

Implement 301 redirects from every old URL to its new home. Chain redirects dilute equity; point each old page directly at its final destination. Test the map after launch, not before.

## Content and Metadata

Carry over page titles, meta descriptions, headings, and structured data. A faster, prettier site that loses its search visibility is a more expensive site.

## Performance

Mobile performance is a ranking factor. Compress images, defer non-critical scripts, and measure Core Web Vitals before and after launch.

Our [Website redesign SEO checklist](/guides/website-redesign-seo-checklist) covers the full process from audit to handover.`,
    category: "Product",
    categorySlug: "product",
    icon: Globe,
    readTime: "5 min read",
    publishedAt: "2026-09-22",
  },
  {
    slug: "building-nabz-clinic-os",
    title: "Building Nabz: Clinic Software for Practices That Run on Paper",
    summary:
      "How we designed Nabz around a receptionist's actual workflow — four screens, a UHID from the first visit, and billing that reconciles against the cash box.",
    body: `# Building Nabz: Clinic Software for Practices That Run on Paper

Hospital information systems assume an IT department, a six-week implementation, and a per-seat budget. A three-doctor clinic has none of those. Nabz was built for the clinic that still runs on a paper register — and nothing else.

## Four Screens, Not Twenty-Five Modules

Patient walks in, token is issued, doctor consults, bill and go. That is the entire workflow. Software a receptionist can learn between two patients gets used. Software that needs training does not.

## A UHID From the First Visit

Every patient gets a permanent identifier on registration. Searching a name or phone number brings up the whole history — visits, prescriptions, bills — on one screen.

## Billing That Reconciles

Consultation fees, procedures, discounts, and GST, with cash, UPI, or card recorded against each bill. The evening check is a screen rather than an argument.

## The Stack

Next.js, PostgreSQL, Prisma, Razorpay, and WhatsApp delivery. Priced like a clinic expense — ₹499 a month for a solo doctor, ₹999 for a clinic with a front desk.

Read the full [Nabz case study](/products/nabz).`,
    category: "Product",
    categorySlug: "product",
    icon: Activity,
    readTime: "4 min read",
    publishedAt: "2026-09-10",
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getBlogPostsByCategory(categorySlug: string) {
  if (categorySlug === "all") return blogPosts;
  return blogPosts.filter((post) => post.categorySlug === categorySlug);
}

export function getRelatedPosts(currentSlug: string, limit = 3) {
  return blogPosts.filter((post) => post.slug !== currentSlug).slice(0, limit);
}