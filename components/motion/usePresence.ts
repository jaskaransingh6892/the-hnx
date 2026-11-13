"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion, withGsap } from "@/lib/gsap";

/**
 * Keeps an element mounted long enough to animate itself out — the one thing
 * a declarative `<AnimatePresence>` gave us that a plain conditional does not.
 *
 * Returns `[mounted, ref]`: render the element while `mounted` is true and
 * attach `ref` to it. Flipping `open` to false plays the exit and unmounts on
 * completion.
 */
export function usePresence<T extends HTMLElement>(
  open: boolean,
  { y = -12, duration = 0.35 }: { y?: number; duration?: number } = {},
) {
  const ref = useRef<T>(null);
  const [mounted, setMounted] = useState(open);

  // Derived during render rather than in an effect: the element has to exist
  // in the very same commit, or there is nothing for the enter to run on.
  if (open && !mounted) setMounted(true);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (prefersReducedMotion()) {
      if (open) return;
      // Deferred by a frame: unmounting straight from the effect body is a
      // cascading render, and there is no animation here to wait on anyway.
      const frame = requestAnimationFrame(() => setMounted(false));
      return () => cancelAnimationFrame(frame);
    }

    return withGsap(({ gsap }) => {
      if (open) {
        gsap.fromTo(
          node,
          { opacity: 0, y },
          { opacity: 1, y: 0, duration, ease: "expo.out", overwrite: true },
        );
        return;
      }

      const tween = gsap.to(node, {
        opacity: 0,
        y,
        duration: duration * 0.7,
        ease: "power2.in",
        overwrite: true,
        onComplete: () => setMounted(false),
      });

      return () => {
        tween.kill();
      };
    });
  }, [open, mounted, y, duration]);

  return [mounted, ref] as const;
}
