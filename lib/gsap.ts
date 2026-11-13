"use client";

import type { gsap as GsapNamespace } from "gsap";
import type { ScrollTrigger as ScrollTriggerClass } from "gsap/ScrollTrigger";

export type GsapBundle = {
  gsap: typeof GsapNamespace;
  ScrollTrigger: typeof ScrollTriggerClass;
};

/**
 * GSAP is loaded on demand rather than imported into the first bundle.
 *
 * It is the single heaviest script on the page — blocking it entirely in a
 * Lighthouse run moves the score from the high 70s to the mid 90s — and none
 * of what it does needs to happen before the page is readable. Fetching it
 * after hydration measured roughly 200ms off total blocking time.
 *
 * The consequence is that anything which hides content before animating it
 * must apply that hidden state itself, synchronously, and not wait for this.
 * See `hideUntilGsap` below.
 */
let pending: Promise<GsapBundle> | null = null;

export function loadGsap(): Promise<GsapBundle> {
  pending ??= Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
    ([core, plugin]) => {
      const { gsap } = core;
      const { ScrollTrigger } = plugin;
      gsap.registerPlugin(ScrollTrigger);
      return { gsap, ScrollTrigger };
    },
  );
  return pending;
}

/**
 * Effect body helper: runs `setup` once GSAP has arrived, and returns the
 * teardown an effect needs — which also cancels the pending load if the
 * component unmounts first.
 */
export function withGsap(setup: (bundle: GsapBundle) => (() => void) | void) {
  let cancelled = false;
  let teardown: (() => void) | void;

  void loadGsap().then((bundle) => {
    if (cancelled) return;
    teardown = setup(bundle);
  });

  return () => {
    cancelled = true;
    if (teardown) teardown();
  };
}

/**
 * How long to leave content hidden while waiting for GSAP. If the chunk never
 * arrives — offline, blocked, a failed deploy — the page must still be
 * readable, so the hidden state is dropped rather than left in place.
 */
const GSAP_TIMEOUT_MS = 2500;

/**
 * Applies a hidden state immediately and returns a canceller. Call this from a
 * layout effect so the element is hidden before the first paint; the animation
 * that reveals it can then arrive whenever GSAP does, with no flash in between.
 */
export function hideUntilGsap(nodes: HTMLElement[], hidden: Partial<CSSStyleDeclaration>) {
  for (const node of nodes) Object.assign(node.style, hidden);

  const reveal = () => {
    for (const node of nodes) {
      for (const property of Object.keys(hidden)) {
        node.style.removeProperty(
          property.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`),
        );
      }
    }
  };

  const timer = window.setTimeout(reveal, GSAP_TIMEOUT_MS);
  return () => window.clearTimeout(timer);
}

/** True when the visitor asked the OS to keep motion to a minimum. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Pointer-based effects (cursor, magnetic pull) only make sense on a mouse. */
export function hasFinePointer(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: fine)").matches;
}
