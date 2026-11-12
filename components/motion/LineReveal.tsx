"use client";

import { useEffect, useLayoutEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { lineIndexes, splitWords } from "./split";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * The masked line reveal: each line of a heading slides up from behind its own
 * clip, one after the next. Lines are measured at runtime, so the effect
 * survives any wrap the viewport throws at it.
 */
export function LineReveal({
  as: Tag = "span",
  children,
  className,
  delay = 0,
  stagger = 0.1,
  duration = 1.1,
  trigger = "scroll",
  start = "top 88%",
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Seconds between one line starting and the next. */
  stagger?: number;
  duration?: number;
  /** "mount" for above-the-fold copy, "scroll" for everything else. */
  trigger?: "scroll" | "mount";
  start?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;

    const parts = splitWords(root);
    if (!parts.length) return;

    const inners = parts.map((part) => part.inner);
    gsap.set(inners, { yPercent: 118 });

    let played = false;
    let tween: gsap.core.Tween | undefined;

    const build = () => {
      tween?.scrollTrigger?.kill();
      tween?.kill();

      const lines = lineIndexes(parts);
      tween = gsap.to(inners, {
        yPercent: 0,
        duration,
        delay,
        ease: "expo.out",
        overwrite: true,
        stagger: (index) => lines[index] * stagger,
        onComplete: () => {
          played = true;
          // Hand the glyphs back to normal layout so hover states, text
          // selection and descenders behave exactly as they did before.
          inners.forEach((inner) => inner.removeAttribute("style"));
          root.classList.add("rv-split--done");
        },
        ...(trigger === "scroll" ? { scrollTrigger: { trigger: root, start, once: true } } : {}),
      });
    };

    build();

    // A font swap or a resize changes where the lines break, and the grouping
    // has to follow. Only worth redoing while the words are still hidden.
    const onResize = () => {
      if (!played) build();
    };
    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(() => {
      if (!played) build();
    });

    return () => {
      window.removeEventListener("resize", onResize);
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
  }, [children, delay, duration, stagger, start, trigger]);

  return (
    <Tag ref={ref} className={className ? `rv-split ${className}` : "rv-split"}>
      {children}
    </Tag>
  );
}
