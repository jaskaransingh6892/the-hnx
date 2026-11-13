"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion, withGsap } from "@/lib/gsap";

/**
 * Counts up to a number when it scrolls into view. The final value is what
 * renders on the server, so a crawler — or anyone with JavaScript off — reads
 * the real figure rather than a zero.
 */
export function CountUp({
  value,
  duration = 1.8,
  suffix = "",
  pad = 0,
  className,
}: {
  value: number;
  duration?: number;
  suffix?: string;
  /** Minimum digits, zero-padded. `pad={2}` renders 7 as "07". */
  pad?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => withGsap(({ gsap }) => {
    const node = ref.current;
    if (!node || prefersReducedMotion()) return;

    const format = (input: number) =>
      String(Math.round(input)).padStart(pad, "0") + suffix;

    const counter = { current: 0 };
    node.textContent = format(0);

    const tween = gsap.to(counter, {
      current: value,
      duration,
      ease: "power3.out",
      onUpdate: () => {
        node.textContent = format(counter.current);
      },
      scrollTrigger: { trigger: node, start: "top 92%", once: true },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      node.textContent = format(value);
    };
  }), [value, duration, suffix, pad]);

  return (
    <span ref={ref} className={className}>
      {String(value).padStart(pad, "0")}
      {suffix}
    </span>
  );
}
