import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock, Globe2, LayoutDashboard, Mail, MapPin, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { ContactForm } from "@/components/sections/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { CopyButton } from "@/components/ui/CopyButton";
import { WipeList } from "@/components/motion/WipeList";
import { assurances } from "@/lib/content";
import { site } from "@/lib/site";

const details = [
  { icon: Mail, label: "Project email", value: site.email, href: `mailto:${site.email}`, copy: true },
  {
    icon: Phone,
    label: "Phone",
    value: site.phone,
    href: `tel:${site.phone.replace(/[^+\d]/g, "")}`,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: site.phone,
    href: `https://wa.me/${site.whatsapp}`,
    external: true,
  },
  { icon: MapPin, label: "Where we work", value: site.location },
  { icon: Clock, label: "Hours", value: site.hours },
];

const startingPoints = [
  {
    title: "Website or web app",
    summary: "What should the new site help people do?",
    href: "/contact?type=Website#project-enquiry",
    icon: Globe2,
  },
  {
    title: "ERP or CRM",
    summary: "Which workflow needs one reliable system?",
    href: "/contact?type=ERP%20%2F%20CRM#project-enquiry",
    icon: LayoutDashboard,
  },
  {
    title: "Cybersecurity or VAPT",
    summary: "Which website or API needs an assessment?",
    href: "/contact?type=Cybersecurity%20%2F%20VAPT#project-enquiry",
    icon: ShieldCheck,
  },
] as const;

const nextSteps = [
  {
    title: "Share the problem",
    body: "A brief description, the current system or public asset, and the outcome you need are enough to start. Keep passwords and sensitive data out of the form.",
  },
  {
    title: "Clarify the scope",
    body: "An engineer reviews the context and asks about the users, constraints, and first useful milestone. When a call helps, we use it to map the work rather than pitch a package.",
  },
  {
    title: "Agree the next step",
    body: "For a suitable engagement, we outline deliverables, phases, ownership, and an estimate before work starts.",
  },
] as const;

export function ContactSection() {
  return (
    <section id="contact" className="relative overflow-hidden pb-24 pt-4 sm:pb-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-96 w-[44rem] -translate-x-1/2 rounded-full bg-hnx-violet/10 blur-[130px]"
      />

      <div className="shell relative flex flex-col gap-12">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-display text-xl font-semibold text-mist-100 sm:text-2xl">
              Choose a starting point
            </h2>
            <p className="max-w-xl text-[0.8125rem] leading-relaxed text-mist-300">
              These paths preselect the closest project type. You can change it in the form.
            </p>
          </div>
          <nav aria-label="Start by service" className="grid gap-3 md:grid-cols-3">
            {startingPoints.map((point) => {
              const Icon = point.icon;
              return (
                <Link
                  key={point.title}
                  href={point.href}
                  className="glass edge-glow group flex flex-col gap-3 rounded-2xl p-5 transition-colors hover:border-hnx-blue/30"
                >
                  <span className="flex items-center gap-3">
                    <Icon className="h-5 w-5 shrink-0 text-hnx-blue" strokeWidth={1.7} />
                    <span className="font-display text-[0.9375rem] font-semibold text-mist-100">
                      {point.title}
                    </span>
                    <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-hnx-blue transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.8} />
                  </span>
                  <span className="text-[0.8125rem] leading-relaxed text-mist-300">{point.summary}</span>
                </Link>
              );
            })}
          </nav>
          <p className="text-[0.8125rem] leading-relaxed text-mist-400">
            Need more detail first? Read about{" "}
            <Link href="/services/web-development" className="font-medium text-hnx-blue hover:text-hnx-cyan">
              website development
            </Link>
            ,{" "}
            <Link href="/services/erp-business-systems" className="font-medium text-hnx-blue hover:text-hnx-cyan">
              ERP and CRM
            </Link>
            , or{" "}
            <Link href="/services/cybersecurity" className="font-medium text-hnx-blue hover:text-hnx-cyan">
              VAPT and security audits
            </Link>
            .
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.25fr] lg:gap-12">
          <Reveal direction="right" className="flex flex-col gap-6">
            <div className="glass flex flex-col gap-6 rounded-2xl p-6 sm:p-8">
              <h3 className="font-display text-lg font-semibold text-mist-100">
                Talk to a person, not a queue
              </h3>
              <ul className="flex flex-col gap-5">
                {details.map((detail) => {
                  const Icon = detail.icon;
                  return (
                    <li key={detail.label} className="flex items-start gap-3.5">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-slate-900/10 bg-slate-900/[0.04]">
                        <Icon className="h-4 w-4 text-hnx-cyan" strokeWidth={1.7} />
                      </span>
                      <span className="flex flex-col items-start gap-1">
                        <span className="eyebrow text-mist-400">{detail.label}</span>
                        {detail.href ? (
                          <a
                            href={detail.href}
                            {...("external" in detail && detail.external
                              ? { target: "_blank", rel: "noreferrer noopener" }
                              : {})}
                            className="text-[0.9375rem] text-mist-100 transition-colors duration-300 hover:text-hnx-cyan"
                          >
                            {detail.value}
                          </a>
                        ) : (
                          <span className="text-[0.9375rem] text-mist-100">{detail.value}</span>
                        )}
                        {"copy" in detail && detail.copy ? (
                          <CopyButton value={detail.value} label="Copy email" className="mt-0.5" />
                        ) : null}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <div className="flex flex-wrap gap-2 border-t border-slate-900/[0.08] pt-6">
                {site.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="rounded-full border border-slate-900/10 bg-slate-900/[0.03] px-3.5 py-1.5 text-[0.75rem] text-mist-300 transition-colors duration-300 hover:border-hnx-cyan/40 hover:text-hnx-cyan"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>

            <WipeList className="flex flex-col gap-3">
              {assurances.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.title} className="flex items-start gap-3">
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-hnx-cyan" strokeWidth={1.7} />
                    <span>
                      <span className="block text-[0.8125rem] font-medium text-mist-100">
                        {item.title}
                      </span>
                      <span className="block text-[0.75rem] text-mist-400">{item.description}</span>
                    </span>
                  </li>
                );
              })}
            </WipeList>
          </Reveal>

          <div id="project-enquiry" className="scroll-mt-28">
            <Reveal direction="left" delay={0.08}>
              {/* useSearchParams needs a boundary so the rest of the page can stay static */}
              <Suspense fallback={<div className="glass h-[42rem] rounded-2xl" aria-hidden />}>
                <ContactForm />
              </Suspense>
            </Reveal>
          </div>
        </div>

        <section aria-labelledby="contact-next-steps" className="border-t border-slate-900/[0.08] pt-12">
          <div className="flex flex-col gap-3">
            <p className="eyebrow text-hnx-blue">From enquiry to scope</p>
            <h2 id="contact-next-steps" className="font-display text-2xl font-semibold text-mist-100 sm:text-3xl">
              What happens after you get in touch
            </h2>
            <p className="max-w-2xl text-[0.9375rem] leading-relaxed text-mist-300">
              The first conversation is for understanding the work and deciding whether we are the right team.
            </p>
          </div>
          <WipeList as="ol" className="mt-8 grid gap-5 md:grid-cols-3">
            {nextSteps.map((step, index) => (
              <li key={step.title} className="glass rounded-2xl p-6">
                <span className="font-mono text-[0.75rem] font-semibold text-hnx-blue">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-base font-semibold text-mist-100">{step.title}</h3>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-mist-300">{step.body}</p>
              </li>
            ))}
          </WipeList>
          <a
            href="#project-enquiry"
            className="mt-7 inline-flex items-center gap-1.5 text-[0.875rem] font-semibold text-hnx-blue transition-colors hover:text-hnx-cyan"
          >
            Share your brief
            <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
          </a>
        </section>
      </div>
    </section>
  );
}
