"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { prefersReducedMotion, withGsap } from "@/lib/gsap";

/**
 * Pins its wrapper and drives the track sideways as the page scrolls, so a
 * long row of cards is read horizontally without the page losing its place.
 *
 * Desktop only, and deliberately so: on a narrow screen the same children lay
 * out as an ordinary grid, because taking over vertical scrolling on a phone
 * is how a page stops feeling like a page.
 */
export function HorizontalScroller({
  children,
  header,
  footer,
  viewportClassName,
}: {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  viewportClassName?: string;
}) {
  const pin = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => withGsap(({ gsap, ScrollTrigger }) => {
    const pinNode = pin.current;
    const viewportNode = viewport.current;
    const trackNode = track.current;
    if (!pinNode || !viewportNode || !trackNode || prefersReducedMotion()) return;

    const media = gsap.matchMedia();

    media.add("(min-width: 1024px)", () => {
      const distance = () => Math.max(0, trackNode.scrollWidth - viewportNode.clientWidth);
      if (distance() <= 0) return;

      const tween = gsap.to(trackNode, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: pinNode,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(trackNode, { clearProps: "transform" });
      };
    });

    // Card widths settle once the webfonts land, and the scroll distance is
    // derived from them.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);

    return () => media.revert();
  }), []);

  return (
    <div ref={pin} className="hnx-htrack">
      {header}
      <div ref={viewport} className={`hnx-htrack__viewport ${viewportClassName ?? ""}`}>
        <div ref={track} className="hnx-htrack__track">
          {children}
        </div>
      </div>
      {footer}
    </div>
  );
}
