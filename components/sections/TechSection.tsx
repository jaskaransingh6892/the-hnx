"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion, withGsap } from "@/lib/gsap";
import { LogoMark } from "@/components/ui/Logo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechBadge } from "@/components/ui/TechBadge";
import { VelocityMarquee } from "@/components/motion/VelocityMarquee";
import { technologies, techCategories, type Tech, type TechCategory } from "@/lib/content";
import { cn } from "@/lib/utils";

const rings = [
  { items: technologies.filter((tech) => tech.ring === 0), radius: 32, duration: 48, reverse: false },
  { items: technologies.filter((tech) => tech.ring === 1), radius: 47, duration: 64, reverse: true },
];

/**
 * Badges sit on two counter-rotating orbits. Each one is placed by rotating a
 * full-size wrapper, then cancelled back to upright twice: statically for the
 * offset angle, and with a mirrored animation for the orbit's own rotation.
 *
 * Hovering or tabbing into the ecosystem pauses every orbit at once, which is
 * also what makes the badges reliable targets — a moving badge is not one.
 */
function Orbit({
  onPick,
  filter,
  active,
}: {
  onPick: (tech: Tech) => void;
  filter: TechCategory | null;
  active: Tech;
}) {
  return (
    <div className="group relative mx-auto hidden aspect-square w-full max-w-[32rem] lg:block">
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
          className="pointer-events-none absolute inset-0 [animation:spin_var(--dur)_linear_infinite] group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:[animation:none]"
          style={{
            ["--dur" as string]: `${ring.duration}s`,
            animationDirection: ring.reverse ? "reverse" : "normal",
          }}
        >
          {ring.items.map((tech, index) => {
            const angle = (360 / ring.items.length) * index;
            const dimmed = filter !== null && tech.category !== filter;
            return (
              <div
                key={tech.name}
                className="pointer-events-none absolute inset-0"
                style={{ transform: `rotate(${angle}deg)` }}
              >
                <div
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ top: `${50 - ring.radius}%` }}
                >
                  <div
                    className="[animation:spin_var(--dur)_linear_infinite] group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:[animation:none]"
                    style={{
                      ["--dur" as string]: `${ring.duration}s`,
                      animationDirection: ring.reverse ? "normal" : "reverse",
                    }}
                  >
                    <div style={{ transform: `rotate(${-angle}deg)` }}>
                      <button
                        type="button"
                        onPointerEnter={() => onPick(tech)}
                        onFocus={() => onPick(tech)}
                        onClick={() => onPick(tech)}
                        data-cursor={tech.category}
                        aria-label={`${tech.name} — ${tech.category}`}
                        className={cn(
                          "pointer-events-auto rounded-full transition-opacity duration-500",
                          dimmed ? "pointer-events-none opacity-20" : "opacity-100",
                        )}
                      >
                        <TechBadge
                          tech={tech}
                          className={cn(
                            "whitespace-nowrap shadow-[0_12px_34px_-18px_rgba(53,74,128,0.32)]",
                            active.name === tech.name &&
                              "border-hnx-blue/40 shadow-[0_16px_34px_-16px_rgba(62,99,233,0.5)]",
                          )}
                        />
                      </button>
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

/** Reads out whichever badge the pointer or keyboard is on. */
function StackDetail({ tech }: { tech: Tech }) {
  const body = useRef<HTMLDivElement>(null);

  // Swapped in place rather than cross-faded between two copies: with the old
  // wait-for-exit behaviour the panel sat empty for a beat on every hover.
  useEffect(() => withGsap(({ gsap }) => {
    const node = body.current;
    if (!node || prefersReducedMotion()) return;
    const tween = gsap.fromTo(
      node,
      { opacity: 0, y: 8, filter: "blur(6px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.34, ease: "expo.out", overwrite: true },
    );
    return () => {
      tween.kill();
    };
  }), [tech.name]);

  return (
    <div className="glass hidden flex-col gap-3 rounded-2xl p-7 lg:flex">
      <span className="eyebrow text-hnx-blue">{tech.category}</span>
      <div ref={body} className="flex flex-col gap-2">
        <h3 className="font-display text-2xl font-bold text-mist-100">{tech.name}</h3>
        <p className="text-[0.875rem] leading-relaxed text-mist-300">{tech.blurb}</p>
      </div>
      <p className="mt-1 text-[0.75rem] text-mist-400">
        Hover the ecosystem to read any part of the stack.
      </p>
    </div>
  );
}

/**
 * Small screens get a pair of opposing marquees instead of the orbit. Their
 * speed and lean follow the scroll, so the strip feels attached to the page
 * rather than looping beside it.
 */
function Marquee() {
  return (
    <div className="flex flex-col gap-3.5 lg:hidden">
      {[0, 1].map((line) => (
        <div
          key={line}
          className="relative [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]"
        >
          <VelocityMarquee speed={line === 0 ? 0.85 : 0.65} reverse={line === 1}>
            {technologies.map((tech) => (
              <TechBadge key={tech.name} tech={tech} className="whitespace-nowrap" />
            ))}
          </VelocityMarquee>
        </div>
      ))}
    </div>
  );
}

export function TechSection() {
  const [active, setActive] = useState<Tech>(technologies[0]);
  const [filter, setFilter] = useState<TechCategory | null>(null);

  function pickFilter(category: TechCategory | null) {
    setFilter(category);
    if (!category) return;
    // Jumping the detail panel to the group you just chose beats leaving it
    // describing something that is now dimmed out.
    const first = technologies.find((tech) => tech.category === category);
    if (first) setActive(first);
  }

  const chipClasses = (selected: boolean) =>
    cn(
      "rounded-full border px-3.5 py-1.5 text-[0.75rem] transition-colors duration-300",
      selected
        ? "border-hnx-blue/40 bg-hnx-blue/[0.08] text-hnx-blue"
        : "border-slate-900/10 bg-slate-900/[0.03] text-mist-300 hover:text-mist-100",
    );

  return (
    <section data-chapter="Stack" className="relative overflow-hidden bg-white py-20 sm:py-24">
      <div className="shell relative flex flex-col gap-12">
        <SectionHeading
          eyebrow="Our stack"
          title="An Ecosystem, Not"
          highlight="a Logo Wall"
          description="Every technology here is one we run in production and support long term. Chosen for fit, not fashion."
        />

        <Reveal delay={0.08}>
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <Orbit onPick={setActive} filter={filter} active={active} />
            <StackDetail tech={active} />
          </div>
          <Marquee />
        </Reveal>

        <Reveal delay={0.12}>
          <ul className="flex flex-wrap items-center justify-center gap-2.5">
            <li>
              <button
                type="button"
                onClick={() => pickFilter(null)}
                aria-pressed={filter === null}
                className={chipClasses(filter === null)}
              >
                All
              </button>
            </li>
            {techCategories.map((category) => (
              <li key={category}>
                <button
                  type="button"
                  onClick={() => pickFilter(filter === category ? null : category)}
                  aria-pressed={filter === category}
                  className={chipClasses(filter === category)}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
