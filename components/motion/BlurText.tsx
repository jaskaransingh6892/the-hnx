"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { hideUntilGsap, prefersReducedMotion, withGsap } from "@/lib/gsap";
import { inheritGradients, splitWords } from "./split";

/**
 * Copy that resolves out of a blur word by word, tied to the scrollbar rather
 * than to a timer — the reader sets the pace, and the sentence sharpens as
 * they arrive at it.
 */
export function BlurText({
  as: Tag = "p",
  children,
  className,
  start = "top 82%",
  end = "bottom 62%",
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  start?: string;
  end?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;

    const parts = splitWords(root, "bl-word");
    if (!parts.length) return;
    inheritGradients(parts.map((part) => part.inner), root);

    const inners = parts.map((part) => part.inner);
    const cancelFallback = hideUntilGsap(inners, { opacity: "0.16", filter: "blur(7px)" });

    return withGsap(({ gsap }) => {
      cancelFallback();
      const tween = gsap.fromTo(
        inners,
        { opacity: 0.16, filter: "blur(7px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          ease: "none",
          stagger: 0.05,
          scrollTrigger: { trigger: root, start, end, scrub: 0.5 },
        },
      );

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });
  }, [start, end]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
