"use client";

import { Reveal, StaggerItem } from "@/components/ui/Reveal";
import { stack } from "@/lib/site";

export function StackSection() {
  return (
    <section id="stack" className="section bg-ink-900 relative isolate overflow-hidden">
      <div className="noise-layer" aria-hidden="true" />
      <div className="shell relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-14">
          <div>
            <Reveal className="eyebrow text-cyan-400 mb-2">04 / Stack</Reveal>
            <Reveal className="text-3xl font-display font-bold text-mist-100 tracking-tight">
              Tools in orbit
            </Reveal>
            <Reveal className="mt-4 max-w-lg text-mist-400 text-sm leading-relaxed">
              Everything I build with, grouped by layer.
            </Reveal>
          </div>
        </div>

        <div className="grid gap-6">
          {stack.map((group) => (
            <StaggerItem key={group.group} className="rounded-xl border border-white/5 bg-white/[0.02] p-6">
              <Reveal direction="up" className="mb-3">
                <span className="eyebrow text-mist-500">{group.group}</span>
              </Reveal>
              <div className="flex flex-wrap gap-2">
                {group.items.map((tool) => (
                  <Reveal key={tool} direction="none" className="px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-[0.8125rem] font-medium text-mist-300">
                    {tool}
                  </Reveal>
                ))}
              </div>
            </StaggerItem>
          ))}
        </div>
      </div>
    </section>
  );
}
