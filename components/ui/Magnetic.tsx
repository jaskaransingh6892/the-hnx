"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, hasFinePointer, prefersReducedMotion } from "@/lib/gsap";

/**
 * Pulls its child toward the cursor and releases it on an expo ease, which is
 * what gives the effect its weight — a spring overshoots, this one glides.
 * Off for reduced-motion visitors and for anything but a mouse.
 */
export function Magnetic({
  children,
  strength = 0.28,
  className,
  max = 18,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
  /** Pixel cap on the pull, so a wide button never slides out of its row. */
  max?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion() || !hasFinePointer()) return;

    const toX = gsap.quickTo(node, "x", { duration: 0.6, ease: "expo.out" });
    const toY = gsap.quickTo(node, "y", { duration: 0.6, ease: "expo.out" });
    const clamp = (value: number) => Math.max(-max, Math.min(max, value));

    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      toX(clamp((event.clientX - rect.left - rect.width / 2) * strength));
      toY(clamp((event.clientY - rect.top - rect.height / 2) * strength * 1.2));
    };

    const onLeave = () => {
      toX(0);
      toY(0);
    };

    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", onLeave);

    return () => {
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(node);
      gsap.set(node, { clearProps: "transform" });
    };
  }, [max, strength]);

  return (
    <span ref={ref} className={className}>
      {children}
    </span>
  );
}
