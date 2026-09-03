"use client";

import { motion } from "motion/react";
import { ArrowRight, MoveDown, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { EASE } from "@/components/ui/Reveal";
import { Aurora, GridField } from "@/components/visuals/Aurora";
import { HeroCore } from "@/components/visuals/HeroCore";
import { ParticleField } from "@/components/visuals/ParticleField";

const headline = ["Building", "What's", "Next."];

const capabilityStrip = [
  "Digital Products",
  "Enterprise Software",
  "AI Systems",
  "Cloud Platforms",
];

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20 sm:pt-32 lg:pt-24 lg:pb-24">
      <Aurora intensity="medium" />
      <GridField />
      <ParticleField className="opacity-70" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-ink-950 to-transparent"
      />

      <div className="shell relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div className="flex flex-col items-start gap-7">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="eyebrow inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-mist-300 backdrop-blur-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-hnx-cyan" strokeWidth={1.8} />
            Products &amp; Engineering
          </motion.span>

          <h1 className="font-display text-[clamp(2.7rem,8.2vw,5.4rem)] font-bold leading-[0.98] tracking-[-0.035em]">
            {headline.map((word, index) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 34, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.85, delay: 0.12 + index * 0.11, ease: EASE }}
                className={index === 2 ? "text-gradient-accent inline-block" : "inline-block"}
              >
                {word}
                {index < headline.length - 1 ? " " : ""}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.42, ease: EASE }}
            className="max-w-xl text-[1.0125rem] leading-relaxed text-mist-300 sm:text-lg"
          >
            We design, build, and scale powerful digital products, intelligent software,
            and AI-driven solutions — for startups finding their shape and enterprises
            rebuilding their core.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.54, ease: EASE }}
            className="flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <ButtonLink href="/contact" size="lg" icon={<ArrowRight className="h-[18px] w-[18px]" />}>
              Start Your Project
            </ButtonLink>
            <ButtonLink href="/products" size="lg" variant="secondary">
              Explore Our Work
            </ButtonLink>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.72 }}
            className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-3"
          >
            {capabilityStrip.map((item) => (
              <li key={item} className="flex items-center gap-2 text-[0.75rem] text-mist-400">
                <span className="h-1 w-1 rounded-full bg-hnx-blue" />
                {item}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.25, ease: EASE }}
          className="relative"
        >
          <HeroCore />
        </motion.div>
      </div>

      <motion.a
        href="#intro"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        aria-label="Scroll to content"
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[0.6875rem] uppercase tracking-[0.22em] text-mist-400 transition-colors hover:text-mist-200 lg:inline-flex"
      >
        <MoveDown className="h-3.5 w-3.5 animate-float" strokeWidth={1.6} />
        Scroll
      </motion.a>
    </section>
  );
}
