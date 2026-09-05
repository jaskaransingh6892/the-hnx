"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { EASE } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/lib/content";

/**
 * Scroll-driven delivery timeline. The connecting line fills as the
 * section moves through the viewport; each step fades in beside it.
 */
export function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 72%", "end 65%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });

  return (
    <section id="process" className="relative overflow-hidden border-y border-white/[0.06] py-20 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(155,114,248,0.10),transparent_60%)]"
      />

      <div className="shell relative flex flex-col gap-16">
        <SectionHeading
          eyebrow="How we work"
          title="From First Conversation"
          highlight="to Continuous Growth"
          description="A process with no mystery in it. You always know what is being built, why, and what happens next."
        />

        <div ref={ref} className="relative mx-auto w-full max-w-4xl">
          {/* rail */}
          <div
            aria-hidden
            className="absolute left-[1.4375rem] top-2 bottom-2 w-px bg-white/[0.08] sm:left-[2.1875rem]"
          />
          <motion.div
            aria-hidden
            style={{ scaleY }}
            className="absolute left-[1.4375rem] top-2 bottom-2 w-px origin-top bg-[linear-gradient(180deg,#22d3ee,#5b86ff,#9b72f8)] sm:left-[2.1875rem]"
          />

          <ol className="flex flex-col gap-10 sm:gap-12">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.li
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, delay: index * 0.05, ease: EASE }}
                  className="group relative flex gap-5 sm:gap-8"
                >
                  <div className="relative z-10 shrink-0">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/12 bg-ink-900 shadow-[0_10px_40px_-16px_rgba(91,134,255,0.9)] transition-colors duration-500 group-hover:border-hnx-cyan/45 sm:h-[4.5rem] sm:w-[4.5rem]">
                      <Icon
                        className="h-5 w-5 text-hnx-cyan transition-transform duration-500 group-hover:scale-110 sm:h-7 sm:w-7"
                        strokeWidth={1.5}
                      />
                    </span>
                  </div>

                  <div className="edge-glow glass relative flex-1 rounded-2xl p-5 transition-transform duration-500 group-hover:-translate-y-1 sm:p-7">
                    <div className="flex flex-wrap items-baseline gap-3">
                      <span className="font-mono text-[0.8125rem] font-medium text-hnx-cyan">
                        {step.step}
                      </span>
                      <h3 className="font-display text-xl font-semibold text-mist-100 sm:text-2xl">
                        {step.title}
                      </h3>
                    </div>

                    <p className="mt-2.5 text-[0.9375rem] font-medium text-mist-200">
                      {step.description}
                    </p>
                    <p className="mt-2 text-[0.8125rem] leading-relaxed text-mist-300">
                      {step.detail}
                    </p>

                    <ul className="mt-5 flex flex-wrap gap-1.5">
                      {step.deliverables.map((deliverable) => (
                        <li
                          key={deliverable}
                          className="rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1 text-[0.6875rem] text-mist-300"
                        >
                          {deliverable}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
