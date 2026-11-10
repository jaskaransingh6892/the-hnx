"use client";

import { ExternalLink, Code2, ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { works } from "@/lib/site";

export function WorkSection() {
  return (
    <section id="work" className="section bg-ink-900 relative isolate overflow-hidden">
      <div className="noise-layer" aria-hidden="true" />
      <div className="shell relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-16">
          <div>
            <Reveal className="eyebrow text-cyan-400 mb-2">02 / Work</Reveal>
            <Reveal className="text-3xl font-display font-bold text-mist-100 tracking-tight">
              Selected work
            </Reveal>
            <Reveal className="mt-4 max-w-lg text-mist-400 text-sm leading-relaxed">
              Three projects, each connecting an interface, a backend and something smarter underneath.
            </Reveal>
          </div>
          <Reveal
            className="text-right self-start lg:self-center"
            delay={0.2}
          >
            <ButtonLink href="https://github.com/the-hnx" size="sm" icon={<ExternalLink className="h-4 w-4" />}>
              More on GitHub
            </ButtonLink>
          </Reveal>
        </div>

        <Stagger>
          {works.map((work) => (
            <StaggerItem key={work.slug} className="group relative mb-20 last:mb-0">
              <Reveal direction="up" className="mb-4">
                <span className="eyebrow text-mist-400">{work.category}</span>
              </Reveal>
              <Reveal
                direction="up"
                delay={0.05}
                className="text-2xl font-display font-bold text-mist-100 group-hover:text-cyan-400 transition-colors cursor-default"
              >
                {work.title}
              </Reveal>
              <Reveal direction="up" delay={0.1} className="mb-6 max-w-2xl text-mist-300 leading-relaxed">
                {work.description}
              </Reveal>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {work.stack.map((tech, i) => (
                  <StaggerItem
                    key={tech}
                    className={[
                      "rounded-xl border border-white/5 bg-white/[0.02] p-4 flex flex-col items-center gap-2",
                      i === 0 ? "border-cyan-500/20 bg-cyan-500/5" : "",
                    ].join(" ").trim()}
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-cyan-400">
                      <Code2 className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-medium text-mist-200 leading-tight">{tech}</span>
                  </StaggerItem>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-2">
                <ButtonLink
                  href={`/work/${work.slug}`}
                  size="sm"
                  variant="secondary"
                  icon={<ArrowRight className="h-4 w-4" />}
                >
                  View case study
                </ButtonLink>
              </div>

              <div
                className="absolute -top-3 -right-3 h-[200px] w-[200px] rounded-full border border-white/5 blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-1000"
                aria-hidden="true"
              />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
