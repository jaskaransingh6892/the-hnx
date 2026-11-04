import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, ClipboardList, FileCheck2, RotateCcw } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

const path = "/guides/website-api-vapt-checklist";
const pageUrl = site.url + path;
const pageTitle = "Website & API VAPT Checklist";
const socialImage = `${site.url}/opengraph-image`;
const description =
  "Prepare for a website or API VAPT: define the authorized scope, test accounts, business flows, report evidence, remediation ownership, and retest criteria.";

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
    { "@type": "ListItem", position: 2, name: "Cybersecurity & VAPT", item: `${site.url}/services/cybersecurity` },
    { "@type": "ListItem", position: 3, name: "Website & API VAPT checklist", item: pageUrl },
  ],
};

const preparation = [
  {
    title: "Name the owner and give written permission",
    body: "Identify who owns each website, application, and API. Agree which assets may be tested, who can authorize a change in scope, and whom to call if testing reveals an urgent issue.",
  },
  {
    title: "List the exact assets and environment",
    body: "Share domains, API base URLs, versions, and integrations. Decide whether testing happens in staging, production, or both; a staging result cannot automatically describe a different production configuration.",
  },
  {
    title: "Provide representative test accounts",
    body: "Include the roles that matter to your product: for example, customer, staff, administrator, or partner. Use synthetic data where possible so testing does not expose a real customer's information.",
  },
  {
    title: "Show the valuable business flows",
    body: "Point out account recovery, payments, approvals, exports, and other actions that would be costly if performed by the wrong user. A list of endpoints alone misses the context around these workflows.",
  },
  {
    title: "Set rules for safe testing",
    body: "Agree the testing window, rate limits, excluded systems, data-handling rules, and an emergency stop contact. Put these decisions in the scope before active testing begins.",
  },
  {
    title: "Decide what a useful handoff looks like",
    body: "Choose who receives the report, how findings will be prioritized, and whether a retest of agreed fixes is part of the engagement. This makes the report actionable after the test ends.",
  },
] as const;

const coverage = [
  {
    title: "Identity and access",
    body: "Discuss sign-in, account recovery, session handling, and whether each role can reach only the data and actions it should. Include cross-account and administrative boundaries in the agreed scope.",
  },
  {
    title: "Application logic and inputs",
    body: "Review important workflows, input handling, error behavior, and client-side assumptions. These areas need human context; a scanner finding by itself does not explain business impact.",
  },
  {
    title: "API authorization and resource use",
    body: "For APIs, explicitly consider object-level and property-level access, sensitive functions, excessive resource use, and old or undocumented endpoints.",
  },
  {
    title: "Configuration and exposure",
    body: "Account for the deployed configuration, exposed administration paths, unnecessary debug behavior, and differences between staging and production.",
  },
] as const;

const reportChecks = [
  "A scope summary: assets, environment, dates, roles tested, and exclusions.",
  "For each finding: affected asset and role, clear evidence, impact, and a severity rationale.",
  "Reproduction steps that an authorized engineer can follow without exposing customer data.",
  "A concrete remediation recommendation and an owner or tracking reference.",
  "Where retesting is agreed, a separate result after fixes; an initial finding should not silently disappear from the record.",
] as const;

const nextSteps = [
  {
    icon: ClipboardList,
    title: "Triage together",
    body: "Prioritize findings using exploitability and business impact in your environment. A generic severity label is a starting point, not the whole decision.",
  },
  {
    icon: FileCheck2,
    title: "Fix the cause",
    body: "Assign each issue to an owner and verify the underlying control, not only the single request or screen that exposed the problem.",
  },
  {
    icon: RotateCcw,
    title: "Verify the fix",
    body: "Retest the affected path and nearby flows after changes are deployed. Document what was checked and what remains outside the original scope.",
  },
] as const;

export default function WebsiteApiVaptChecklistPage() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }}
      />
      <PageHero
        eyebrow="Security guide"
        title="Website & API VAPT:"
        highlight="a buyer's checklist"
        description="A useful security assessment starts before the first test. Use this guide to define the scope, prepare your team, and ask for a report your engineers can act on."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink
            href="/contact?type=Cybersecurity%20%2F%20VAPT"
            size="lg"
            icon={<ArrowRight className="h-[18px] w-[18px]" />}
          >
            Discuss an assessment
          </ButtonLink>
          <ButtonLink href="/services/cybersecurity" size="lg" variant="secondary">
            Explore our VAPT service
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
            <Link href="/services/cybersecurity" className="transition-colors hover:text-mist-200">
              Cybersecurity & VAPT
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-mist-200">Website & API VAPT checklist</li>
        </ol>
      </nav>

      <section className="relative py-14 sm:py-20">
        <div className="shell grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <SectionHeading align="left" eyebrow="First principle" title="Define the test" highlight="before testing" />
          <div className="max-w-3xl space-y-5 text-[1.0125rem] leading-relaxed text-mist-200">
            <p>
              VAPT is a bounded assessment of agreed assets at a point in time. The version,
              environment, accounts, and rules of engagement determine what the results mean.
              A report should make those boundaries visible.
            </p>
            <p>
              A clean report is not a certificate that a system has no vulnerabilities. Its
              value is showing what was examined, what was found, and what your team should fix
              or verify next.
            </p>
            <div className="flex flex-wrap gap-3 pt-2 text-[0.8125rem] font-medium">
              <a href="#prepare" className="text-hnx-blue underline underline-offset-4 hover:text-hnx-cyan">
                Prepare the scope
              </a>
              <a href="#coverage" className="text-hnx-blue underline underline-offset-4 hover:text-hnx-cyan">
                Agree coverage
              </a>
              <a href="#report" className="text-hnx-blue underline underline-offset-4 hover:text-hnx-cyan">
                Review the report
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="prepare" className="relative scroll-mt-28 border-y border-slate-900/[0.06] bg-white py-20 sm:py-24">
        <div className="shell flex flex-col gap-12">
          <SectionHeading
            eyebrow="Before the assessment"
            title="Six things to"
            highlight="prepare"
            description="You do not need a perfect inventory, but the tester and the system owner need the same written understanding of what is in scope."
          />
          <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {preparation.map((item, index) => (
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

      <section id="coverage" className="relative scroll-mt-28 py-20 sm:py-24">
        <div className="shell flex flex-col gap-12">
          <SectionHeading
            eyebrow="Agree coverage"
            title="Discuss the risks that"
            highlight="fit your product"
            description="The right test plan follows your features and data. These categories help start the conversation; they are not a promise that every item belongs in every engagement."
          />
          <div className="grid gap-5 md:grid-cols-2">
            {coverage.map((item) => (
              <article key={item.title} className="glass edge-glow rounded-2xl p-6 sm:p-7">
                <h3 className="font-display text-lg font-bold text-mist-100">{item.title}</h3>
                <p className="mt-3 text-[0.875rem] leading-relaxed text-mist-300">{item.body}</p>
              </article>
            ))}
          </div>
          <p className="mx-auto max-w-3xl text-center text-[0.8125rem] leading-relaxed text-mist-400">
            These areas follow the categories in the{" "}
            <a
              href="https://wstg.owasp.org/v4.2/4-Web_Application_Security_Testing/"
              className="font-medium text-hnx-blue underline underline-offset-4 hover:text-hnx-cyan"
            >
              OWASP Web Security Testing Guide v4.2
            </a>{" "}
            and the{" "}
            <a
              href="https://api-security.owasp.org/editions/2023/en/0x11-t10/"
              className="font-medium text-hnx-blue underline underline-offset-4 hover:text-hnx-cyan"
            >
              OWASP API Security Top 10 (2023)
            </a>
            . Use them to shape a test plan, not as a substitute for product-specific scope.
          </p>
        </div>
      </section>

      <section id="report" className="relative scroll-mt-28 border-y border-slate-900/[0.06] bg-white py-20 sm:py-24">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <SectionHeading
            align="left"
            eyebrow="The handoff"
            title="Ask for a report"
            highlight="you can use"
            description="A list of scanner alerts leaves the important decisions to you. Ask how each finding was confirmed and what action follows."
          />
          <ul className="flex flex-col gap-4">
            {reportChecks.map((item) => (
              <li key={item} className="glass flex items-start gap-3 rounded-2xl p-5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-hnx-cyan" strokeWidth={2.2} />
                <span className="text-[0.875rem] leading-relaxed text-mist-200">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative py-20 sm:py-24">
        <div className="shell flex flex-col gap-12">
          <SectionHeading
            eyebrow="After the report"
            title="Turn findings into"
            highlight="verified fixes"
            description="The assessment is useful when a product team can close the loop on the issues it found."
          />
          <ol className="grid gap-5 md:grid-cols-3">
            {nextSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <li key={step.title} className="glass edge-glow rounded-2xl p-6 sm:p-7">
                  <div className="flex items-center justify-between">
                    <Icon className="h-7 w-7 text-hnx-blue" strokeWidth={1.7} />
                    <span className="font-mono text-[0.75rem] text-mist-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-bold text-mist-100">{step.title}</h3>
                  <p className="mt-3 text-[0.875rem] leading-relaxed text-mist-300">{step.body}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="relative pb-20 sm:pb-24">
        <div className="shell">
          <div className="glass edge-glow flex flex-col gap-6 rounded-[2rem] p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-display text-[clamp(1.6rem,3.6vw,2.4rem)] font-bold text-mist-100">
                Have a website or API to assess?
              </h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-mist-300">
                Share the assets, environment, and launch timeline. We can discuss an authorized
                scope for a website, web application, or API security assessment.
              </p>
            </div>
            <ButtonLink
              href="/contact?type=Cybersecurity%20%2F%20VAPT"
              size="lg"
              icon={<ArrowRight className="h-[18px] w-[18px]" />}
            >
              Request a scoped assessment
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
