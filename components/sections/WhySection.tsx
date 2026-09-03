import { FeatureCard } from "@/components/ui/FeatureCard";
import { LogoMark } from "@/components/ui/Logo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { differentiators } from "@/lib/content";

const left = differentiators.slice(0, 3);
const right = differentiators.slice(3);

function CoreVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[22rem]">
      <div
        aria-hidden
        className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.28),transparent_65%)] blur-2xl animate-pulse-glow"
      />
      <svg viewBox="0 0 320 320" className="absolute inset-0 h-full w-full animate-spin-slower" aria-hidden>
        <circle cx="160" cy="160" r="152" fill="none" stroke="rgba(148,163,184,0.14)" strokeDasharray="2 9" />
        <circle cx="160" cy="160" r="112" fill="none" stroke="rgba(34,211,238,0.18)" strokeDasharray="1 8" />
      </svg>
      <svg viewBox="0 0 320 320" className="absolute inset-0 h-full w-full animate-spin-reverse" aria-hidden>
        <circle cx="160" cy="160" r="76" fill="none" stroke="rgba(79,124,255,0.28)" strokeWidth="1.2" strokeDasharray="90 300" strokeLinecap="round" />
      </svg>
      <div className="absolute left-1/2 top-1/2 grid h-[42%] w-[42%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[30%] border border-white/12 bg-[linear-gradient(150deg,rgba(18,26,48,0.95),rgba(5,7,15,0.98))] shadow-[0_18px_70px_-18px_rgba(139,92,246,0.7)] backdrop-blur-xl">
        <LogoMark className="h-[56%] w-[56%]" animated />
      </div>
    </div>
  );
}

export function WhySection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-1/3 h-80 w-80 rounded-full bg-hnx-cyan/10 blur-[120px]"
      />

      <div className="shell relative flex flex-col gap-16">
        <SectionHeading
          eyebrow="Why The HNX"
          title="More Than Development."
          highlight="We Build Digital Foundations."
          description="The difference shows up two years later — when the system is still fast, still understandable, and still cheap to change."
        />

        <div className="grid items-center gap-6 lg:grid-cols-[1fr_minmax(16rem,22rem)_1fr] lg:gap-8">
          <div className="order-2 flex flex-col gap-5 lg:order-1">
            {left.map((feature, index) => (
              <Reveal key={feature.title} direction="right" delay={index * 0.08}>
                <FeatureCard feature={feature} />
              </Reveal>
            ))}
          </div>

          <Reveal className="order-1 lg:order-2" direction="none" delay={0.1}>
            <CoreVisual />
          </Reveal>

          <div className="order-3 flex flex-col gap-5">
            {right.map((feature, index) => (
              <Reveal key={feature.title} direction="left" delay={index * 0.08}>
                <FeatureCard feature={feature} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
