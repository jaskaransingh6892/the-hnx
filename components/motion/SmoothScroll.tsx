"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

/**
 * Inertial scrolling, driven off the GSAP ticker so Lenis and ScrollTrigger
 * share one rAF loop. Lenis still moves the real scroll position, so anything
 * reading `window.scrollY` — the progress bar, Framer's `useScroll` — keeps
 * working untouched.
 *
 * Disabled outright for reduced-motion visitors; the page then uses the
 * browser's own scrolling.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.15,
      // Quartic ease-out: fast to settle, no rubbery tail.
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      touchMultiplier: 1.6,
      // Let Lenis own in-page jumps too, so #anchor links glide rather than
      // teleporting mid-scroll.
      anchors: true,
    });

    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  // Nothing below the fold is measured correctly until the webfonts have
  // swapped in and the splash has released the scroll lock, and every
  // scroll-triggered animation on the page depends on those measurements.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    const timer = window.setTimeout(refresh, 600);
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", refresh);
    };
  }, []);

  // App Router restores scroll with a native call that Lenis would smooth back
  // out over a second. Jump instantly instead on every navigation.
  useEffect(() => {
    window.__lenis?.scrollTo(0, { immediate: true });
    ScrollTrigger.refresh();
  }, [pathname]);

  return null;
}
