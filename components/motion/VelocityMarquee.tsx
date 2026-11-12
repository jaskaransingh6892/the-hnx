"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

/**
 * A marquee whose speed and lean come from how hard the page is being
 * scrolled: flick down and the strip surges and skews with you, then eases
 * back to its idle drift. Falls back to the CSS `animate-marquee` keyframes
 * when motion is reduced.
 */
export function VelocityMarquee({
  children,
  speed = 0.9,
  className,
  trackClassName,
  copies = 2,
  reverse = false,
}: {
  children: ReactNode;
  /** Idle pixels-per-frame. */
  speed?: number;
  className?: string;
  trackClassName?: string;
  copies?: number;
  /** Idle drift to the right instead of the left. */
  reverse?: boolean;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapNode = wrap.current;
    const trackNode = track.current;
    if (!wrapNode || !trackNode || prefersReducedMotion()) return;

    const set = trackNode.firstElementChild as HTMLElement | null;
    if (!set) return;

    let offset = 0;
    let boost = 0;
    let direction = reverse ? 1 : -1;
    let running = false;

    const trigger = ScrollTrigger.create({
      trigger: wrapNode,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        boost = Math.min(Math.abs(self.getVelocity()) / 95, 16);
        direction = (self.direction === 1 ? -1 : 1) * (reverse ? -1 : 1);
      },
    });

    const tick = () => {
      boost *= 0.92;
      offset += direction * (speed + boost);
      const width = set.offsetWidth;
      if (!width) return;
      if (offset <= -width) offset += width;
      if (offset > 0) offset -= width;
      trackNode.style.transform = `translate3d(${offset.toFixed(2)}px, 0, 0)`;
      wrapNode.style.setProperty("--skew", `${(-direction * boost * 0.3).toFixed(2)}deg`);
    };

    // Burning a rAF slot on a strip nobody can see is wasted battery.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          gsap.ticker.add(tick);
          running = true;
        } else if (!entry.isIntersecting && running) {
          gsap.ticker.remove(tick);
          running = false;
        }
      },
      { rootMargin: "120px" },
    );
    observer.observe(wrapNode);

    return () => {
      observer.disconnect();
      if (running) gsap.ticker.remove(tick);
      trigger.kill();
    };
  }, [speed, reverse]);

  return (
    <div ref={wrap} className={`hnx-marquee ${className ?? ""}`} aria-hidden>
      <div ref={track} className={`hnx-marquee__track ${trackClassName ?? ""}`}>
        {Array.from({ length: copies }, (_, index) => (
          <div key={index} className="hnx-marquee__set">
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
