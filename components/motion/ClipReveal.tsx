"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

/**
 * Uncovers its contents from the bottom edge while the contents themselves
 * settle back from an over-scale. Two moving parts pulling against each other
 * is what makes it read as a reveal rather than a wipe.
 */
export function ClipReveal({
  children,
  className,
  innerClassName,
  scale = 1.18,
  duration = 1.3,
  delay = 0,
  start = "top 85%",
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  scale?: number;
  duration?: number;
  delay?: number;
  start?: string;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frameNode = frame.current;
    const innerNode = inner.current;
    if (!frameNode || !innerNode || prefersReducedMotion()) return;

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
  }, [delay, duration, scale, start]);

  return (
    <div ref={frame} className={className}>
      <div ref={inner} className={innerClassName}>
        {children}
      </div>
    </div>
  );
}
