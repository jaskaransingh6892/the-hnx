"use client";

import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import { hideUntilGsap, prefersReducedMotion, withGsap } from "@/lib/gsap";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Direction = "up" | "down" | "left" | "right" | "none";

const offset: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 28 },
  down: { x: 0, y: -28 },
  left: { x: 32, y: 0 },
  right: { x: -32, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * Starts the reveal a quarter-viewport before the element reaches the fold.
 * Paired with the short duration below, this keeps the animation ahead of a
 * fast flick, where a later trigger leaves whole sections at opacity 0.
 */
const START = "top 125%";

/** Long enough to read as motion, short enough to finish before a fast scroll
    carries the element past the middle of the screen. */
const DURATION = 0.5;

const EASE = "expo.out";

/**
 * Scroll-triggered reveal. Fires once.
 *
 * The hidden state is applied from a layout effect rather than rendered into
 * the markup, so the server sends visible content: a reader without
 * JavaScript, and a crawler, get the page rather than a stack of empty boxes.
 * It is also applied without waiting for GSAP — that arrives later now, and
 * hiding content only once it lands would show a flash of the finished page.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  duration = DURATION,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: Direction;
  /** Accepted for call-site compatibility; the trigger point is fixed. */
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion()) return;

    const { x, y } = offset[direction];
    const cancelFallback = hideUntilGsap([node], {
      opacity: "0",
      transform: `translate(${x}px, ${y}px)`,
    });

    const stop = withGsap(({ gsap }) => {
      cancelFallback();
      const tween = gsap.fromTo(
        node,
        { opacity: 0, x, y },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration,
          delay,
          ease: EASE,
          clearProps: "opacity,transform",
          scrollTrigger: { trigger: node, start: START, once: true },
        },
      );

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => {
      cancelFallback();
      stop();
    };
  }, [delay, direction, duration]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/** Wraps a grid or list so its direct children animate in sequence. */
export function Stagger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  /** Accepted for call-site compatibility; the trigger point is fixed. */
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion()) return;

    const items = [...node.children] as HTMLElement[];
    if (!items.length) return;

    const cancelFallback = hideUntilGsap(items, {
      opacity: "0",
      transform: "translateY(26px)",
    });

    const stop = withGsap(({ gsap }) => {
      cancelFallback();
      const tween = gsap.fromTo(
        items,
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: DURATION,
          stagger: 0.06,
          ease: EASE,
          clearProps: "opacity,transform",
          scrollTrigger: { trigger: node, start: START, once: true },
        },
      );

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => {
      cancelFallback();
      stop();
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/** A direct child of <Stagger>. Plain markup — the parent drives the motion. */
export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
