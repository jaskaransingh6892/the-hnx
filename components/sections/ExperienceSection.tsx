"use client";

import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { experiences } from "@/lib/site";

export function ExperienceSection() {
  return (
    <section id="experience" className="section bg-ink-950 relative isolate">
      <div className="noise-layer" aria-hidden="true" />
      <div className="shell relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-14">
          <div>
            <Reveal className="eyebrow text-cyan-400 mb-2">03 / Experience</Reveal>
            <Reveal className="text-3xl font-display font-bold text-mist-100 tracking-tight">
              Journey so far
            </Reveal>
            <Reveal className="mt-4 max-w-lg text-mist-400 text-sm leading-relaxed">
              Internships and study, plotted as one journey.
            </Reveal>
          </div>
        </div>

        <Stagger>
          {experiences.map((exp) => (
            <StaggerItem
              key={exp.year}
              className="relative mb-16 last:mb-0 pl-8 md:pl-12"
            >
              <span className="absolute left-[-8px] top-1.5 z-10 block h-2.5 w-2.5 rounded-full border-2 border-cyan-500 bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.6)]" aria-hidden="true" />
              <span className="absolute left-0 top-0 -ml-px -mt-px h-[calc(100%+2px)] w-[1px] bg-white/[0.08] hidden md:block" aria-hidden="true" />

              <Reveal direction="up" className="flex items-baseline gap-2 mb-1">
                <span className="font-mono text-xs font-semibold text-mist-500">{exp.year}</span>
                <span className="text-sm font-medium text-mist-300">{exp.role}</span>
              </Reveal>
              <Reveal direction="up" delay={0.05} className="text-xl font-display font-bold text-mist-100 mb-1">
                {exp.org}
              </Reveal>
              {exp.orgLocation && (
                <Reveal direction="up" delay={0.08} className="text-sm text-mist-500 mb-3">
                  {exp.orgLocation}
                </Reveal>
              )}
              <Reveal direction="up" delay={0.1} className="max-w-md text-mist-300 text-sm leading-relaxed">
                {exp.detail}
              </Reveal>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
