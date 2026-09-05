import { Counter } from "@/components/ui/Counter";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { stats } from "@/lib/content";

export function TrustIntro() {
  return (
    <section id="intro" className="relative overflow-hidden border-y border-white/[0.06] py-20 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-hnx-blue/50 to-transparent"
      />

      <div className="shell relative grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-20">
        <div className="flex flex-col gap-6">
          <Reveal>
            <p className="font-display text-[clamp(1.6rem,3.6vw,2.6rem)] font-semibold leading-[1.16] text-mist-100">
              The HNX is where ideas evolve into{" "}
              <span className="text-gradient-accent">powerful digital experiences.</span>
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="max-w-2xl text-[0.9375rem] leading-relaxed text-mist-300 sm:text-base">
              We partner with startups, growing businesses, and enterprises to build software
              that holds up as they scale. Some of it is our own — products we design, ship,
              and support. The rest is built for clients who need a technology team that thinks
              in systems rather than tickets.
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="max-w-2xl text-[0.9375rem] leading-relaxed text-mist-300 sm:text-base">
              Same engineers, same standards, whether the brief is a marketing site or an ERP
              replacing fifteen years of spreadsheets.
            </p>
          </Reveal>
        </div>

        <Stagger className="grid grid-cols-2 gap-4 sm:gap-5">
          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="glass edge-glow group relative h-full overflow-hidden rounded-2xl p-5 sm:p-6">
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-hnx-blue/16 blur-2xl transition-colors duration-500 group-hover:bg-hnx-cyan/24"
                />
                <p className="relative font-display text-[clamp(2rem,5vw,2.85rem)] font-bold leading-none text-gradient">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="relative mt-3 text-[0.8125rem] font-medium text-mist-100">{stat.label}</p>
                <p className="relative mt-1 text-[0.75rem] leading-relaxed text-mist-400">{stat.hint}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
