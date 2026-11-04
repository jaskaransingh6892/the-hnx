"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

export type ScopeOption = {
  slug: string;
  title: string;
  tagline: string;
  detailHref: string;
  contactHref: string;
  deliverables: { title: string; body: string }[];
};

const stages = [
  {
    id: "planning",
    label: "Planning a new project",
    guidance: "Start with the first useful outcome, who needs it, and any fixed launch or review constraint.",
  },
  {
    id: "live",
    label: "Improving something live",
    guidance: "Show what exists today, what is working, and what must continue to work during the change.",
  },
  {
    id: "problem",
    label: "Solving a specific problem",
    guidance: "Bring one concrete example of the issue, where it occurs, and who is affected.",
  },
] as const;

const preparation: Record<string, readonly string[]> = {
  "web-development": [
    "Current website or useful reference URLs",
    "Audience and the action each key page should support",
    "Content owners, integrations, and launch constraints",
  ],
  "custom-software": [
    "The workflow from first input to final handoff",
    "Current tools, records, and unavoidable exceptions",
    "User roles and the first task the system should solve",
  ],
  "erp-business-systems": [
    "Stock, sales, finance, or customer workflows that need one record",
    "Current systems and the data that would need migration",
    "The first module, its users, and the reports they rely on",
  ],
  cybersecurity: [
    "The websites, web apps, or APIs you are authorized to test",
    "Testing environment, available accounts, and key integrations",
    "Reporting needs and the people who will act on findings",
  ],
  "mobile-applications": [
    "Target users, devices, and iOS or Android requirements",
    "Offline, notification, and device feature needs",
    "Existing backend, accounts, and release ownership",
  ],
  "desktop-applications": [
    "Operating systems and workstation constraints",
    "Peripheral models, files, and offline workflows",
    "Existing data, sync needs, and update process",
  ],
  "ai-automation": [
    "One bounded task and representative inputs or questions",
    "Approved data sources and access boundaries",
    "How a useful result will be checked and when a person must review it",
  ],
  "cloud-api": [
    "Current hosting and deployment flow",
    "Systems and APIs that need to exchange data",
    "Traffic, reliability, observability, or cost concerns",
  ],
  "ui-ux-design": [
    "Main user roles and their most important tasks",
    "Current screens, research, or support feedback",
    "Platform and accessibility constraints",
  ],
};

const fallbackPreparation = [
  "The people who use the system or service",
  "What happens today and what should improve",
  "Existing tools, constraints, and a useful first outcome",
] as const;

export function ProjectScopePlanner({ options }: { options: ScopeOption[] }) {
  const [serviceSlug, setServiceSlug] = useState(options[0]?.slug ?? "");
  const [stageId, setStageId] = useState<(typeof stages)[number]["id"]>("planning");
  const selected = options.find((option) => option.slug === serviceSlug) ?? options[0];
  const stage = stages.find((item) => item.id === stageId) ?? stages[0];

  if (!selected) return null;
  const contactHref = `${selected.contactHref}&stage=${stage.id}`;

  return (
    <div className="glass edge-glow rounded-[2rem] p-5 sm:p-8 lg:p-10">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <div className="flex flex-col gap-9">
          <fieldset>
            <legend className="font-display text-lg font-semibold text-mist-100">
              <span className="mr-3 font-mono text-sm text-hnx-blue">01</span>
              What work are you planning?
            </legend>
            <p className="mt-2 text-[0.8125rem] leading-relaxed text-mist-300">
              Choose the closest service. We can refine the boundaries together.
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {options.map((option) => (
                <label key={option.slug} className="cursor-pointer">
                  <input
                    type="radio"
                    name="scope-service"
                    value={option.slug}
                    checked={serviceSlug === option.slug}
                    onChange={() => setServiceSlug(option.slug)}
                    className="peer sr-only"
                  />
                  <span className="inline-flex min-h-11 items-center rounded-full border border-slate-900/10 bg-white/80 px-4 py-2 text-[0.8125rem] font-medium leading-snug text-mist-300 transition-[background-color,border-color,color,box-shadow] hover:border-hnx-blue/30 hover:text-mist-100 peer-checked:border-hnx-blue/40 peer-checked:bg-hnx-blue/[0.09] peer-checked:text-hnx-blue peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-hnx-blue">
                    {option.title}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="font-display text-lg font-semibold text-mist-100">
              <span className="mr-3 font-mono text-sm text-hnx-blue">02</span>
              Where are you now?
            </legend>
            <div className="mt-5 grid gap-2.5 sm:grid-cols-3">
              {stages.map((item) => (
                <label key={item.id} className="cursor-pointer">
                  <input
                    type="radio"
                    name="scope-stage"
                    value={item.id}
                    checked={stageId === item.id}
                    onChange={() => setStageId(item.id)}
                    className="peer sr-only"
                  />
                  <span className="flex h-full min-h-16 items-center rounded-2xl border border-slate-900/10 bg-white/80 px-4 py-3 text-[0.8125rem] font-medium leading-snug text-mist-300 transition-[background-color,border-color,color,box-shadow] hover:border-hnx-blue/30 hover:text-mist-100 peer-checked:border-hnx-blue/40 peer-checked:bg-hnx-blue/[0.09] peer-checked:text-hnx-blue peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-hnx-blue">
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <p className="text-[0.8125rem] leading-relaxed text-mist-400">
            An estimate follows a review of the actual scope, data, and constraints.
          </p>
        </div>

        <div className="rounded-[1.5rem] border border-hnx-blue/15 bg-[linear-gradient(145deg,#f5f8ff_0%,#ffffff_58%,#f7f1ff_100%)] p-6 shadow-[0_20px_50px_-34px_rgba(62,99,233,0.35)] sm:p-8 lg:self-start">
          <p className="eyebrow font-semibold text-hnx-blue">Your starting brief</p>
          <h3 aria-live="polite" className="mt-3 font-display text-2xl font-bold text-mist-100">
            {selected.title}
          </h3>
          <p className="mt-2 text-[0.875rem] leading-relaxed text-mist-300">{selected.tagline}</p>

          <p aria-live="polite" className="mt-6 rounded-xl border border-hnx-blue/10 bg-white/80 px-4 py-3 text-[0.8125rem] leading-relaxed text-mist-200">
            {stage.guidance}
          </p>

          <div className="mt-7">
            <h4 className="font-display text-sm font-semibold text-mist-100">
              Bring to the first conversation
            </h4>
            <ul className="mt-3 flex flex-col gap-2.5">
              {(preparation[selected.slug] ?? fallbackPreparation).map((item) => (
                <li key={item} className="flex items-start gap-2 text-[0.8125rem] leading-relaxed text-mist-300">
                  <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-hnx-blue" strokeWidth={2.2} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {selected.deliverables.length > 0 ? (
            <div className="mt-7 border-t border-slate-900/[0.08] pt-6">
              <h4 className="font-display text-sm font-semibold text-mist-100">
                A scoped handover may include
              </h4>
              <ul className="mt-3 flex flex-col gap-3">
                {selected.deliverables.map((item) => (
                  <li key={item.title} className="text-[0.8125rem] leading-relaxed text-mist-300">
                    <span className="font-semibold text-mist-100">{item.title}.</span> {item.body}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <ButtonLink href={contactHref} size="md" magnetic={false} icon={<ArrowRight className="h-4 w-4" />}>
              Discuss this scope
            </ButtonLink>
            <Link
              href={selected.detailHref}
              className="inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-hnx-blue transition-colors hover:text-hnx-cyan"
            >
              Service details
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
            </Link>
          </div>
          <p className="mt-3 text-[0.75rem] leading-relaxed text-mist-400">
            Your service and project stage will be added to the enquiry draft.
          </p>
        </div>
      </div>
    </div>
  );
}
