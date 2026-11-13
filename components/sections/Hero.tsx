"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, MoveDown, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { LineReveal } from "@/components/motion/LineReveal";
import { Aurora, GridField } from "@/components/visuals/Aurora";
import { HeroCore } from "@/components/visuals/HeroCore";
import { ParticleField } from "@/components/visuals/ParticleField";
import { prefersReducedMotion, withGsap } from "@/lib/gsap";
import { site } from "@/lib/site";

const capabilityStrip = [
  { label: "Website Development", href: "/services/web-development" },
  { label: "ERP Systems", href: "/services/erp-business-systems" },
  { label: "Cybersecurity & VAPT", href: "/services/cybersecurity" },
  { label: "AI & Automation", href: "/services/ai-automation" },
  { label: "Custom Software", href: "/services/custom-software" },
];

export function Hero() {
  const scope = useRef<HTMLElement>(null);

  // One timeline for the whole entrance. The headline runs itself — see the
  // LineReveal below — and its 0.14s delay is what these offsets sit against.
  useEffect(() => withGsap(({ gsap }) => {
    const root = scope.current;
    if (!root || prefersReducedMotion()) return;

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "expo.out" } });
      timeline
        .from("[data-hero='eyebrow']", { opacity: 0, y: 16, duration: 0.6 }, 0)
        .from("[data-hero='kicker']", { opacity: 0, y: 12, duration: 0.6 }, 0)
        .from("[data-hero='core']", { opacity: 0, scale: 0.9, duration: 1.2 }, 0.25)
        .from("[data-hero='lede']", { opacity: 0, y: 20, duration: 0.75 }, 0.42)
        .from("[data-hero='actions']", { opacity: 0, y: 20, duration: 0.7 }, 0.54)
        .from("[data-hero='strip']", { opacity: 0, duration: 0.9 }, 0.72)
        .from("[data-hero='scroll']", { opacity: 0, duration: 0.8 }, 1.2);
    }, root);

    return () => context.revert();
  }), []);

  return (
    <section
      ref={scope}
      data-chapter="Overview"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[linear-gradient(155deg,#f7f9ff_4%,#edf4ff_54%,#f9efff_100%)] pt-28 pb-20 sm:pt-32 lg:pt-24 lg:pb-24"
    >
      <Aurora intensity="medium" />
      <GridField />
      <ParticleField className="opacity-70" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-ink-950 to-transparent"
      />

      <div className="shell relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div className="flex min-w-0 flex-col items-start gap-7">
          <span
            data-hero="eyebrow"
            className="eyebrow inline-flex items-center gap-2 rounded-full border border-hnx-blue/15 bg-white/80 px-4 py-2 font-semibold text-hnx-blue shadow-sm backdrop-blur-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-hnx-cyan" strokeWidth={1.8} />
            Products &amp; Engineering
          </span>

          {/* Name the company and its work in the visible heading so the page
              makes sense beyond the brand tagline. */}
          <h1 className="w-full font-display text-[clamp(2.7rem,8.2vw,5.4rem)] font-bold leading-[0.98] tracking-[-0.035em]">
            <span
              data-hero="kicker"
              className="mb-3 block w-full font-sans text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-mist-400 sm:text-sm"
            >
              {site.name} — Websites, ERP &amp; Cybersecurity
            </span>
            <LineReveal as="span" className="block" trigger="mount" delay={0.14} stagger={0.12} repel>
              Building What&apos;s <span className="text-gradient-accent">Next.</span>
            </LineReveal>
          </h1>

          <p
            data-hero="lede"
            className="w-full max-w-xl text-[1.0125rem] leading-relaxed text-mist-300 sm:text-lg"
          >
            We build websites, ERP and CRM systems, AI workflows, and custom software. We also assess
            websites and APIs through scoped VAPT and security audits for teams worldwide.
          </p>

          <div data-hero="actions" className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="/contact" size="lg" icon={<ArrowRight className="h-[18px] w-[18px]" />}>
              Talk to an Engineer
            </ButtonLink>
            <ButtonLink href="/products" size="lg" variant="secondary">
              Explore Our Work
            </ButtonLink>
          </div>

          <ul data-hero="strip" className="flex w-full flex-wrap items-center gap-x-6 gap-y-2 pt-3">
            {capabilityStrip.map((item) => (
              <li key={item.href} className="flex items-center gap-2 text-[0.8125rem] font-medium text-mist-300">
                <span className="h-1 w-1 rounded-full bg-hnx-blue" />
                <Link href={item.href} className="transition-colors hover:text-hnx-blue">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div data-hero="core" className="relative">
          <HeroCore />
        </div>
      </div>

      <a
        href="#intro"
        data-hero="scroll"
        aria-label="Scroll to content"
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[0.6875rem] uppercase tracking-[0.22em] text-mist-400 transition-colors hover:text-mist-200 lg:inline-flex"
      >
        <MoveDown className="h-3.5 w-3.5 animate-float" strokeWidth={1.6} />
        Scroll
      </a>
    </section>
  );
}
