"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion, withGsap } from "@/lib/gsap";

/**
 * Thin gradient reading-progress bar pinned under the navbar.
 *
 * It keeps working under reduced motion — a progress indicator is
 * information, not decoration — but drops the easing that lags it behind the
 * scroll position.
 */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => withGsap(({ gsap, ScrollTrigger }) => {
    const node = ref.current;
    if (!node) return;

    gsap.set(node, { scaleX: 0 });
    const smooth = prefersReducedMotion()
      ? (value: number) => gsap.set(node, { scaleX: value })
      : gsap.quickTo(node, "scaleX", { duration: 0.25, ease: "power2.out" });

    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => smooth(self.progress),
    });

    return () => {
      trigger.kill();
      gsap.killTweensOf(node);
    };
  }), []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-[linear-gradient(90deg,#22d3ee,#5b86ff,#9b72f8)]"
    />
  );
}
