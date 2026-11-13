"use client";

import { useEffect, useRef, type ReactNode } from "react";
import type { GsapBundle } from "@/lib/gsap";

type GsapApi = GsapBundle["gsap"];
import { hideUntilGsap, prefersReducedMotion, withGsap } from "@/lib/gsap";

/**
 * Uncovers its contents from the bottom edge while the contents themselves
 * settle back from an over-scale. Two moving parts pulling against each other
 * is what makes it read as a reveal rather than a wipe.
 *
 * With `scrub`, it becomes a different gesture: the frame starts inset and
 * rounded and grows to full bleed as you scroll, so the reader drives it.
 * That one needs room around the frame to grow into, so it is desktop-only
 * and falls back to the wipe on narrow screens.
 */
export function ClipReveal({
  children,
  className,
  innerClassName,
  scale = 1.18,
  duration = 1.3,
  delay = 0,
  start = "top 85%",
  scrub = false,
  end = "top 30%",
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  scale?: number;
  duration?: number;
  delay?: number;
  start?: string;
  /** Tie the reveal to the scrollbar and grow the frame instead of wiping it. */
  scrub?: boolean;
  end?: string;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frameNode = frame.current;
    const innerNode = inner.current;
    if (!frameNode || !innerNode || prefersReducedMotion()) return;

    const cancelFallback = hideUntilGsap(
      [frameNode],
      scrub ? {} : { clipPath: "inset(100% 0% 0% 0%)" },
    );

    const wipe = (gsap: GsapApi) => {
      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: frameNode, start, once: true },
        delay,
      });
      timeline
        .fromTo(
          frameNode,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration },
          0,
        )
        .fromTo(innerNode, { scale }, { scale: 1, duration: duration * 1.25 }, 0);
      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      };
    };

    const grow = (gsap: GsapApi) => {
      const timeline = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: { trigger: frameNode, start, end, scrub: 0.6 },
      });
      timeline
        .fromTo(
          frameNode,
          { clipPath: "inset(14% 10% 14% 10% round 26px)" },
          { clipPath: "inset(0% 0% 0% 0% round 0px)" },
          0,
        )
        .fromTo(innerNode, { scale: 1.12 }, { scale: 1 }, 0);
      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      };
    };

    return withGsap(({ gsap }) => {
      cancelFallback();
      if (!scrub) return wipe(gsap);

      const media = gsap.matchMedia();
      media.add("(min-width: 900px)", () => grow(gsap));
      media.add("(max-width: 899px)", () => wipe(gsap));
      return () => media.revert();
    });
  }, [delay, duration, end, scale, scrub, start]);

  return (
    <div ref={frame} className={className}>
      <div ref={inner} className={innerClassName}>
        {children}
      </div>
    </div>
  );
}
