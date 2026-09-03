"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

/**
 * Counts up to `value` the first time it scrolls into view.
 * Reduced-motion users get the final figure immediately, derived during
 * render rather than pushed through state.
 */
export function Counter({
  value,
  suffix = "",
  duration = 1.9,
  className,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [tally, setTally] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setTally(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, value, duration, reduce]);

  const shown = reduce ? value : tally;

  return (
    <span ref={ref} className={className}>
      {shown}
      {suffix}
    </span>
  );
}
