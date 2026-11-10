"use client";

import { Fragment } from "react";
import { motion } from "motion/react";
import { ArrowRight, MoveDown, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { EASE } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

const eyebrow = "01 / Interface";
const headline = ["From raw data", "to *working* software**."];
const subhead =
  "I’m a full-stack developer & AI/ML engineer. I build the interface, the services and the model behind them, so a rough idea becomes a product people can use.";

const pillars = [
  {
    label: "01 / Interface",
    title: "The part people touch",
    body: "Designed to stay clear when the data gets dense.",
  },
  {
    label: "02 / Logic",
    title: "Services & pipelines",
    body: "Authentication, backends and integrations that keep it dependable.",
  },
  {
    label: "03 / Intelligence",
    title: "Models & computer vision",
    body: "AI that makes the product smarter, wired into real products.",
  },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate min-h-[100svh] flex flex-col bg-ink-950 overflow-hidden"
    >
      <div className="noise-layer" aria-hidden="true" />
      <div className="relative z-10 flex min-h-[100svh] flex-col justify-between">

        {/* Nav is fixed in layout; hero keeps its own top padding. */}
        <div className="shell relative grid lg:grid-cols-[1fr_1.1fr] lg:gap-12 pt-24 pb-16 lg:pt-20 lg:pb-24">
          <div className="flex min-w-0 flex-col gap-6">
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="eyebrow inline-flex items-center gap-2 rounded-full border border-cyan-500/15 bg-cyan-500/10 px-4 py-2 font-medium text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.12)] backdrop-blur-sm"
            >
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" strokeWidth={1.6} />
              {eyebrow}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="w-full font-display text-[clamp(3rem,9vw,5.6rem)] font-bold leading-[0.95] tracking-[-0.04em]"
            >
              {headline.map((part, i) => (
                <Fragment key={part}>
                  <motion.span
                    initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.8, delay: 0.12 + i * 0.12, ease: EASE }}
                    className={i === 1 ? "text-gradient block" : "block"}
                    dangerouslySetInnerHTML={{ __html: part }}
                  />
                  {i < headline.length - 1 && " "}
                </Fragment>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.4, ease: EASE }}
              className="w-full max-w-xl text-[1.05rem] leading-relaxed text-mist-300 sm:text-lg"
            >
              {subhead}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
              className="flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <ButtonLink href="#contact" size="lg" icon={<ArrowRight className="h-[18px] w-[18px]" />}>
                Let’s build something
              </ButtonLink>
              <ButtonLink href="#work" size="lg" variant="secondary">
                Selected work
              </ButtonLink>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.72 }}
              className="flex w-full flex-wrap items-center gap-x-6 gap-y-3 pt-4"
            >
              {pillars.map((p) => (
                <div key={p.label} className="flex items-center gap-2 text-[0.8125rem] font-medium text-mist-400">
                  <span className="h-1 w-1 rounded-full bg-cyan-500" />
                  {p.label}
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.25, ease: EASE }}
            className="relative hidden lg:block"
          >
            <div className="hero-scene-glow" aria-hidden="true" />
            <div className="hero-orbit hero-orbit--one" aria-hidden="true" />
            <div className="hero-orbit hero-orbit--two" aria-hidden="true" />
            <div className="hero-orbit hero-orbit--three" aria-hidden="true" />
            <div className="relative z-10 glass-strong rounded-3xl p-8 border border-white/5 shadow-2xl">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
                <div className="flex flex-col gap-1.5">
                  <span className="eyebrow text-cyan-400">Preview</span>
                  <h3 className="text-xl font-display font-bold text-mist-100 tracking-tight">
                    Interface · Logic · Intelligence
                  </h3>
                  <p className="text-mist-400 text-sm">
                    The whole path — screen, service, model — in one view.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 md:pt-0 border-t border-white/5 md:border-t-0 md:border-l border-white/5">
                  {[site.name.split(" ").map((w) => w[0]).join(""), "AI/ML"].map((t, i) => (
                    <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-4 flex flex-col items-center gap-2">
                      <span className="text-[1.5rem] font-mono text-mist-200">{t}</span>
                      <span className="text-xs font-medium text-mist-500">preview</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.a
          href="#work"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          aria-label="Scroll to work"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.24em] text-mist-500 transition-colors hover:text-mist-300"
        >
          <MoveDown className="h-4 w-4 animate-float" strokeWidth={1.6} />
          Scroll
        </motion.a>
      </div>
    </section>
  );
}

