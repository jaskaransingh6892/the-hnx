"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { hideUntilGsap, prefersReducedMotion, withGsap } from "@/lib/gsap";

const STROKEABLE = "path, line, polyline, polygon, circle, ellipse, rect";

/**
 * Draws every stroked shape inside it as if by hand. `pathLength="1"`
 * normalises each shape to a unit length, so one dash offset works for a
 * 12px tick and a 400px curve alike.
 */
export function DrawSVG({
  children,
  className,
  duration = 1.2,
  stagger = 0.08,
  start = "top 85%",
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
  stagger?: number;
  start?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;

    const shapes = [...root.querySelectorAll<SVGGeometryElement>(STROKEABLE)].filter((shape) => {
      const stroke = getComputedStyle(shape).stroke;
      return stroke && stroke !== "none";
    });
    if (!shapes.length) return;

    shapes.forEach((shape) => shape.setAttribute("pathLength", "1"));
    const cancelFallback = hideUntilGsap(shapes as unknown as HTMLElement[], {
      strokeDasharray: "1",
      strokeDashoffset: "1",
    });

    return withGsap(({ gsap }) => {
      cancelFallback();
      const tween = gsap.to(shapes, {
        strokeDashoffset: 0,
        duration,
        stagger,
        ease: "power2.inOut",
        onComplete: () => gsap.set(shapes, { clearProps: "strokeDasharray,strokeDashoffset" }),
        scrollTrigger: { trigger: root, start, once: true },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });
  }, [duration, stagger, start]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
