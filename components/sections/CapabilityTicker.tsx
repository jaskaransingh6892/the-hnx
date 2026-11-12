"use client";

import { VelocityMarquee } from "@/components/motion/VelocityMarquee";
import { services } from "@/lib/content";

/**
 * A band of what we build, drifting past at a speed the reader sets. It is
 * decorative — every service named here is a real link one section further
 * down — so the strip is hidden from assistive technology.
 */
export function CapabilityTicker() {
  return (
    <section className="relative isolate overflow-hidden border-y border-slate-900/[0.07] bg-[linear-gradient(100deg,#0f1b3d_0%,#1c2d63_52%,#2d1f5e_100%)] py-7 sm:py-9">
      <VelocityMarquee speed={1.1} className="[--marquee-gap:2.5rem]">
        {services.map((service) => (
          <span key={service.slug} className="flex items-center gap-10">
            <span className="font-display text-[clamp(1.3rem,3.2vw,2.3rem)] font-bold tracking-tight text-white/92">
              {service.title}
            </span>
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-hnx-cyan" />
          </span>
        ))}
      </VelocityMarquee>
    </section>
  );
}
