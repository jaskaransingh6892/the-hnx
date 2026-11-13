"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { hideUntilGsap, prefersReducedMotion, withGsap } from "@/lib/gsap";

/**
 * Wipes its children in from the left, one after the next. A clip rather than
 * a fade, so each line arrives as a finished thing instead of surfacing out
 * of the background.
 */
export function WipeList({
  as: Tag = "ul",
  children,
  className,
  stagger = 0.08,
  duration = 0.9,
  start = "top 88%",
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  stagger?: number;
  duration?: number;
  start?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;

    const items = [...root.children] as HTMLElement[];
    if (!items.length) return;

    const cancelFallback = hideUntilGsap(items, { clipPath: "inset(0 100% 0 0)" });

    return withGsap(({ gsap }) => {
      cancelFallback();
      const tween = gsap.fromTo(
        items,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration,
          stagger,
          ease: "expo.out",
          onComplete: () => gsap.set(items, { clearProps: "clipPath" }),
          scrollTrigger: { trigger: root, start, once: true },
        },
      );

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });
  }, [duration, stagger, start]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
