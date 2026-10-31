"use client";

import { LogoMark } from "@/components/ui/Logo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechBadge } from "@/components/ui/TechBadge";
import { technologies, techCategories } from "@/lib/content";
import { cn } from "@/lib/utils";

const rings = [
  { items: technologies.filter((tech) => tech.ring === 0), radius: 32, duration: 48, reverse: false },
  { items: technologies.filter((tech) => tech.ring === 1), radius: 47, duration: 64, reverse: true },
];

/**
 * Badges sit on two counter-rotating orbits. Each one is placed by rotating a
 * full-size wrapper, then cancelled back to upright twice: statically for the
 * offset angle, and with a mirrored animation for the ring's own rotation.
 * Hovering the ecosystem pauses every orbit at once.
 */
function Orbit() {
  return (
    <div className="group relative mx-auto hidden aspect-square w-full max-w-[36rem] lg:block">
      <div
        aria-hidden
        className="absolute inset-[22%] rounded-full bg-[radial-gradient(circle,rgba(91,134,255,0.26),transparent_66%)] blur-3xl animate-pulse-glow"
      />

      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden>
        <circle cx="200" cy="200" r="128" fill="none" stroke="rgba(65,95,175,0.23)" strokeDasharray="2 8" />
        <circle cx="200" cy="200" r="188" fill="none" stroke="rgba(65,95,175,0.18)" strokeDasharray="2 8" />
      </svg>

      {rings.map((ring) => (
        <div
          key={ring.radius}
          className="absolute inset-0 [animation:spin_var(--dur)_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:[animation:none]"
          style={{
            ["--dur" as string]: `${ring.duration}s`,
            animationDirection: ring.reverse ? "reverse" : "normal",
          }}
        >
          {ring.items.map((tech, index) => {
            const angle = (360 / ring.items.length) * index;
            return (
              <div key={tech.name} className="absolute inset-0" style={{ transform: `rotate(${angle}deg)` }}>
                <div
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ top: `${50 - ring.radius}%` }}
                >
                  <div
                    className="[animation:spin_var(--dur)_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:[animation:none]"
                    style={{
                      ["--dur" as string]: `${ring.duration}s`,
                      animationDirection: ring.reverse ? "normal" : "reverse",
                    }}
                  >
                    <div style={{ transform: `rotate(${-angle}deg)` }}>
                      <TechBadge
                        tech={tech}
                        className="whitespace-nowrap shadow-[0_12px_34px_-18px_rgba(53,74,128,0.32)]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}

      <div className="absolute left-1/2 top-1/2 grid h-[30%] w-[30%] -translate-x-1/2 -translate-y-1/2 place-items-center gap-1.5 rounded-full border border-white bg-[linear-gradient(150deg,#ffffff,#e7efff)] shadow-[0_20px_80px_-20px_rgba(62,99,233,0.3)] backdrop-blur-xl">
        <LogoMark className="-mb-1 h-20 w-20 scale-150 drop-shadow-[0_8px_18px_rgba(62,99,233,0.24)]" animated />
        <span className="eyebrow text-mist-400">Ecosystem</span>
      </div>
    </div>
  );
}

/** Small screens get a pair of opposing marquees instead of the orbit. */
function Marquee() {
  const row = [...technologies, ...technologies];
  return (
    <div className="flex flex-col gap-3.5 lg:hidden">
      {[0, 1].map((line) => (
        <div
          key={line}
          className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]"
        >
          <div
            className={cn(
              "flex w-max gap-3 animate-marquee motion-reduce:[animation:none]",
              line === 1 && "[animation-direction:reverse]",
            )}
            style={{ animationDuration: line === 0 ? "38s" : "46s" }}
          >
            {row.map((tech, index) => (
              <TechBadge key={`${tech.name}-${index}`} tech={tech} className="whitespace-nowrap" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function TechSection() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24">
      <div className="shell relative flex flex-col gap-12">
        <SectionHeading
          eyebrow="Our stack"
          title="An Ecosystem, Not"
          highlight="a Logo Wall"
          description="Every technology here is one we run in production and support long term. Chosen for fit, not fashion."
        />

        <Reveal delay={0.08}>
          <Orbit />
          <Marquee />
        </Reveal>

        <Reveal delay={0.12}>
          <ul className="flex flex-wrap items-center justify-center gap-2.5">
            {techCategories.map((category) => (
              <li
                key={category}
                className="rounded-full border border-slate-900/10 bg-slate-900/[0.03] px-3.5 py-1.5 text-[0.75rem] text-mist-300"
              >
                {category}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
