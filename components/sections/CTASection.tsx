import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Aurora, GridField } from "@/components/visuals/Aurora";
import { assurances } from "@/lib/content";

export function CTASection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="shell relative">
        <div className="relative isolate overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(150deg,rgba(14,21,40,0.9),rgba(4,6,13,0.96))] px-6 py-16 sm:px-12 sm:py-20 lg:px-20">
          <Aurora intensity="strong" />
          <GridField className="opacity-70" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-hnx-cyan/70 to-transparent"
          />

          <div className="relative flex flex-col items-center gap-7 text-center">
            <Reveal>
              <h2 className="font-display text-[clamp(2rem,5.2vw,3.6rem)] font-bold leading-[1.05]">
                Have an Idea <span className="text-gradient-accent">Worth Building?</span>
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="max-w-xl text-[1.0125rem] text-mist-300">
                Let&apos;s turn it into something powerful.
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink href="/contact" size="lg" icon={<ArrowRight className="h-[18px] w-[18px]" />}>
                  Start a Conversation
                </ButtonLink>
                <ButtonLink href="/services" size="lg" variant="secondary">
                  View Our Services
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={0.2} className="w-full">
              <ul className="mx-auto mt-6 grid w-full max-w-3xl gap-4 border-t border-white/[0.08] pt-8 sm:grid-cols-3">
                {assurances.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.title} className="flex flex-col items-center gap-2 text-center">
                      <Icon className="h-4.5 w-4.5 text-hnx-cyan" strokeWidth={1.6} />
                      <p className="text-[0.8125rem] font-medium text-mist-100">{item.title}</p>
                      <p className="text-[0.75rem] text-mist-400">{item.description}</p>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
