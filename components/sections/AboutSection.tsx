import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { principles } from "@/lib/content";

export function AboutSection({ compact = false }: { compact?: boolean }) {
  return (
    <section id="about" className="relative overflow-hidden py-20 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-hnx-blue/10 blur-[130px]"
      />

      <div className="shell relative grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-start lg:gap-20">
        <SectionHeading
          align="left"
          eyebrow="About us"
          title="Technology should move"
          highlight="businesses forward."
          description="The HNX was built on one belief, and everything else follows from it. Not technology for its own sake, not architecture diagrams nobody reads — software that changes what a business is able to do."
        />

        <div className="flex flex-col gap-6">
          <Reveal>
            <p className="text-[0.9375rem] leading-relaxed text-mist-300">
              We combine engineering, design, strategy, and artificial intelligence in the same
              team, because separating them is where most projects quietly go wrong. The engineer
              who understands the business decision writes different code. The designer who has
              seen the data model designs a better screen.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="text-[0.9375rem] leading-relaxed text-mist-300">
              We build our own products too. It keeps us honest: we live with our architecture
              decisions for years, we feel our own technical debt, and we bring that discipline
              into every client engagement.
            </p>
          </Reveal>

          {!compact ? (
            <Reveal delay={0.14}>
              <blockquote className="glass rounded-2xl border-l-2 border-l-hnx-cyan/60 p-6">
                <p className="font-display text-lg font-medium leading-snug text-mist-100">
                  We would rather ship one system that lasts a decade than ten that need
                  replacing next year.
                </p>
              </blockquote>
            </Reveal>
          ) : null}
        </div>
      </div>

      <div className="shell relative mt-16">
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((principle) => (
            <StaggerItem key={principle.title} className="h-full">
              <FeatureCard feature={principle} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
