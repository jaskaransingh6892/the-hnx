import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Aurora, GridField } from "@/components/visuals/Aurora";

/** Shared masthead for internal pages. */
export function PageHero({
  eyebrow,
  title,
  highlight,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-24">
      <Aurora intensity="soft" />
      <GridField />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink-950 to-transparent"
      />

      <div className="shell relative flex max-w-4xl flex-col gap-6">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>

        <Reveal delay={0.06}>
          <h1 className="font-display text-[clamp(2.3rem,6vw,4.2rem)] font-bold leading-[1.03] tracking-[-0.035em]">
            {title}
            {highlight ? <span className="text-gradient-accent"> {highlight}</span> : null}
          </h1>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="max-w-2xl text-[1.0125rem] leading-relaxed text-mist-300">{description}</p>
        </Reveal>

        {children ? <Reveal delay={0.18}>{children}</Reveal> : null}
      </div>
    </section>
  );
}
