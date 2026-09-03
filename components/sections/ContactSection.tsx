import { Suspense } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/sections/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { assurances } from "@/lib/content";
import { site } from "@/lib/site";

const details = [
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
  {
    icon: Phone,
    label: "Phone",
    value: site.phone,
    href: `tel:${site.phone.replace(/[^+\d]/g, "")}`,
  },
  { icon: MapPin, label: "Where we work", value: site.location },
  { icon: Clock, label: "Hours", value: site.hours },
];

export function ContactSection() {
  return (
    <section id="contact" className="relative overflow-hidden pb-24 pt-4 sm:pb-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-96 w-[44rem] -translate-x-1/2 rounded-full bg-hnx-violet/10 blur-[130px]"
      />

      <div className="shell relative flex flex-col gap-12">

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
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
                        <Icon className="h-4 w-4 text-hnx-cyan" strokeWidth={1.7} />
                      </span>
                      <span className="flex flex-col gap-0.5">
                        <span className="eyebrow text-mist-400">{detail.label}</span>
                        {detail.href ? (
                          <a
                            href={detail.href}
                            className="text-[0.9375rem] text-mist-100 transition-colors duration-300 hover:text-hnx-cyan"
                          >
                            {detail.value}
                          </a>
                        ) : (
                          <span className="text-[0.9375rem] text-mist-100">{detail.value}</span>
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <div className="flex flex-wrap gap-2 border-t border-white/[0.08] pt-6">
                {site.socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[0.75rem] text-mist-300 transition-colors duration-300 hover:border-hnx-cyan/40 hover:text-hnx-cyan"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>

            <ul className="flex flex-col gap-3">
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
            </ul>
          </Reveal>

          <Reveal direction="left" delay={0.08}>
            {/* useSearchParams needs a boundary so the rest of the page can stay static */}
            <Suspense fallback={<div className="glass h-[42rem] rounded-2xl" aria-hidden />}>
              <ContactForm />
            </Suspense>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
