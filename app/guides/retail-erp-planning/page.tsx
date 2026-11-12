import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";
import { LineReveal } from "@/components/motion/LineReveal";

const path = "/guides/retail-erp-planning";
const pageUrl = site.url + path;
const pageTitle = "Retail ERP Planning: Stock, Billing & Migration";
const socialImage = `${site.url}/opengraph-image`;
const description =
  "Plan a retail ERP around product data, stock movements, billing, returns, and migration. A practical scoping guide informed by The HNX's MyInventory build.";

export const metadata: Metadata = {
  title: pageTitle,
  description,
  alternates: { canonical: path },
  openGraph: {
    type: "article",
    title: pageTitle,
    description,
    url: pageUrl,
    images: [{ url: socialImage, width: 1200, height: 630, alt: "The HNX" }],
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
    { "@type": "ListItem", position: 2, name: "ERP & Business Systems", item: `${site.url}/services/erp-business-systems` },
    { "@type": "ListItem", position: 3, name: "Retail ERP planning", item: pageUrl },
  ],
};

const records = [
  {
    title: "Product and barcode",
    body: "Decide how each item and variant is identified, who may change its price, and which details must reach the counter and online catalogue. Check duplicate identifiers before importing them.",
  },
  {
    title: "Stock by location",
    body: "Define what counts as available, reserved, in transit, damaged, or returned stock. A total across every outlet cannot answer whether one specific counter can fulfil an order.",
  },
  {
    title: "The complete sale",
    body: "Trace a sale through payment, invoice, return, refund, and delivery. Agree which transaction changes stock, which changes money, and how corrections are recorded.",
  },
  {
    title: "People and permissions",
    body: "Map what owners, counter staff, warehouse staff, and managers need to see or change. Record who made an adjustment so discrepancies can be investigated later.",
  },
] as const;

const phases = [
  {
    title: "Map the working day",
    body: "Follow a real item from supplier receipt to shelf, sale, return, and reorder. Include the exceptions staff handle in spreadsheets or chat messages today.",
  },
  {
    title: "Choose the first usable module",
    body: "Start where a consistent record will remove the most duplicate entry. For some teams that is catalogue and stock; for others it is the counter and returns. Agree the first release from the actual bottleneck.",
  },
  {
    title: "Reconcile before switching",
    body: "Import sample records, compare opening balances and transactions with the current system, and decide who signs off differences. Keep the old record available until the new numbers are trusted.",
  },
  {
    title: "Connect the remaining channels",
    body: "Add procurement, delivery, online sales, or reporting against the same product and transaction definitions. Decide which existing tools should integrate instead of being replaced.",
  },
] as const;

const scopeInputs = [
  "A current product list with identifiers, variants, units, prices, and tax fields used in your selling regions.",
  "Examples of a normal sale, a return, a discount, and a stock adjustment, including the records staff create for each.",
  "A count of stores, stock locations, user roles, and the devices used at the counter or in the warehouse.",
  "Exports from the existing stock, billing, accounting, and online systems, with known data quality problems noted.",
  "The integrations that already work and should remain, plus the reports people actually use to make decisions.",
  "The first operational problem to solve and the person who will confirm that the new workflow works.",
] as const;

const vendorQuestions = [
  "Which module can go live first, and what data must be correct for people to trust it?",
  "How will you check stock, invoices, and payments against the old system during migration?",
  "Can our existing accounting or ecommerce tool stay in place where it already works?",
  "Who owns the source code, data exports, infrastructure accounts, and operating documentation at handover?",
] as const;

export default function RetailErpPlanningPage() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }}
      />
      <PageHero
        eyebrow="Retail ERP guide"
        title="Retail ERP planning:"
        highlight="from shelf to sale"
        description="A useful retail system starts with the records and decisions behind every sale. Use this guide to scope the first module, prepare data, and plan a migration your team can check."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink
            href="/contact?type=ERP%20%2F%20CRM"
            size="lg"
            icon={<ArrowRight className="h-[18px] w-[18px]" />}
          >
            Discuss your ERP scope
          </ButtonLink>
          <ButtonLink href="/services/erp-business-systems" size="lg" variant="secondary">
            Explore ERP development
          </ButtonLink>
        </div>
      </PageHero>

      <nav aria-label="Breadcrumb" className="shell relative pb-2">
        <ol className="flex flex-wrap items-center gap-2 text-[0.75rem] text-mist-400">
          <li>
            <Link href="/" className="transition-colors hover:text-mist-200">
              Home
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href="/services/erp-business-systems" className="transition-colors hover:text-mist-200">
              ERP & Business Systems
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-mist-200" aria-current="page">Retail ERP planning</li>
        </ol>
      </nav>

      <section className="relative py-14 sm:py-20">
        <div className="shell grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <SectionHeading align="left" eyebrow="Where to start" title="Follow a real" highlight="transaction" />
          <div className="max-w-3xl space-y-5 text-[1.0125rem] leading-relaxed text-mist-200">
            <p>
              Write down what happens when stock arrives, moves between locations, sells,
              returns, and appears online. The same item should not acquire a different
              identity or an unexplained balance at each handoff.
            </p>
            <p>
              This does not mean replacing every tool at once. A working accounting system
              can remain while a new stock or counter module earns trust. The first design
              decision is which record owns each fact and how other tools will read it.
            </p>
            <a
              href="#scope-inputs"
              className="inline-flex items-center gap-1.5 text-[0.875rem] font-semibold text-hnx-blue underline underline-offset-4 hover:text-hnx-cyan"
            >
              Jump to the scoping checklist <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
            </a>
          </div>
        </div>
      </section>

      <section className="relative border-y border-slate-900/[0.06] bg-white py-20 sm:py-24">
        <div className="shell flex flex-col gap-12">
          <SectionHeading
            eyebrow="One operational picture"
            title="Agree the records"
            highlight="before the screens"
            description="These four areas decide whether billing, inventory, and online orders can rely on the same information."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {records.map((record, index) => (
              <article key={record.title} className="glass edge-glow rounded-2xl p-6 sm:p-7">
                <span className="font-mono text-[0.75rem] font-semibold text-hnx-blue">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-mist-100">{record.title}</h3>
                <p className="mt-3 text-[0.875rem] leading-relaxed text-mist-300">{record.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 sm:py-24">
        <div className="shell flex flex-col gap-12">
          <SectionHeading
            eyebrow="A practical sequence"
            title="Put one module"
            highlight="to work first"
            description="A phased rollout gives staff a system they can use and gives the business a way to verify the numbers before more workflows move."
          />
          <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {phases.map((phase, index) => (
              <li key={phase.title} className="glass h-full rounded-2xl p-6">
                <span className="font-mono text-[0.75rem] font-semibold text-hnx-blue">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-mist-100">{phase.title}</h3>
                <p className="mt-3 text-[0.8125rem] leading-relaxed text-mist-300">{phase.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative border-y border-slate-900/[0.06] bg-white py-20 sm:py-24">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <SectionHeading
            align="left"
            eyebrow="From our own work"
            title="How MyInventory"
            highlight="connects the pieces"
            description="This is a product we built, so you can inspect the decisions behind it rather than relying on a generic feature list."
          />
          <div className="flex flex-col gap-5">
            <p className="text-[0.9375rem] leading-relaxed text-mist-200">
              MyInventory was designed around one catalogue and stock record shared by the
              counter, returns, delivery, and online storefront. Its build story explains
              why duplicate barcodes are blocked at item creation, how a return follows its
              original bill, and how each store keeps a separate stock position.
            </p>
            <p className="text-[0.9375rem] leading-relaxed text-mist-300">
              It is an example of engineering choices, not a claim that every retailer
              needs the same product or rollout. Your workflows and existing tools should
              determine the scope.
            </p>
            <Link
              href="/products/myinventory"
              className="inline-flex w-fit items-center gap-1.5 text-[0.875rem] font-semibold text-hnx-blue underline underline-offset-4 hover:text-hnx-cyan"
            >
              Read the MyInventory case study <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
            </Link>
          </div>
        </div>
      </section>

      <section id="scope-inputs" className="relative scroll-mt-28 py-20 sm:py-24">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
          <SectionHeading
            align="left"
            eyebrow="Before a scoping call"
            title="Bring the records"
            highlight="you already have"
            description="You do not need a perfect export. A few real examples reveal the exceptions and data gaps that a module list will miss."
          />
          <ul className="flex flex-col gap-4">
            {scopeInputs.map((input) => (
              <li key={input} className="glass flex items-start gap-3 rounded-2xl p-5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-hnx-cyan" strokeWidth={2.2} />
                <span className="text-[0.875rem] leading-relaxed text-mist-200">{input}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative border-y border-slate-900/[0.06] bg-white py-20 sm:py-24">
        <div className="shell flex flex-col gap-10">
          <SectionHeading
            eyebrow="Questions for any provider"
            title="Make the handover"
            highlight="part of the brief"
            description="Ask these before choosing a system or development partner. They expose how migration, integrations, and ownership will work after launch."
          />
          <ol className="mx-auto grid w-full max-w-5xl gap-4 md:grid-cols-2">
            {vendorQuestions.map((question, index) => (
              <li key={question} className="glass rounded-2xl p-6 text-[0.9375rem] font-medium leading-relaxed text-mist-200">
                <span className="mr-3 font-mono text-[0.75rem] font-semibold text-hnx-blue">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {question}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative py-20 sm:py-24">
        <div className="shell">
          <div className="glass edge-glow flex flex-col gap-7 rounded-[2rem] p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <LineReveal
                as="h2"
                className="block font-display text-[clamp(1.6rem,3.6vw,2.4rem)] font-bold text-mist-100"
              >
                Need to connect stock, billing, and sales?
              </LineReveal>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-mist-300">
                Bring your current workflow and the module that hurts most. We can map a
                scoped first release and the data checks it needs before rollout.
              </p>
            </div>
            <ButtonLink
              href="/contact?type=ERP%20%2F%20CRM"
              size="lg"
              icon={<ArrowRight className="h-[18px] w-[18px]" />}
            >
              Discuss your ERP scope
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
