"use client";

import { useEffect, useLayoutEffect, useRef, type ElementType, type ReactNode } from "react";
import { hasFinePointer, hideUntilGsap, prefersReducedMotion, withGsap } from "@/lib/gsap";
import type { GsapBundle } from "@/lib/gsap";
import { inheritGradients, lineIndexes, splitChars, splitWords } from "./split";

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
  repel = false,
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
  /** Let the pointer push individual characters out of its way. */
  repel?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const charsRef = useRef<HTMLElement[]>([]);

  useIsomorphicLayoutEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;

    const parts = splitWords(root);
    if (!parts.length) return;

    const inners = parts.map((part) => part.inner);
    // The gradient has to be painted onto whatever ends up carrying a
    // transform — the characters when they exist, the words otherwise.
    const chars = repel ? splitChars(parts) : [];
    charsRef.current = chars;

    // The gradient offsets come from viewport rects, so everything has to be
    // sitting at its laid-out position while they are read. Clearing and
    // restoring in one synchronous pass means no frame is ever painted
    // mid-measure.
    const clearTransforms = (nodes: HTMLElement[]) => {
      for (const node of nodes) node.style.transform = "";
    };

    const paintGradients = () => {
      clearTransforms(inners);
      if (charsRef.current.length) clearTransforms(charsRef.current);
      inheritGradients(charsRef.current.length ? charsRef.current : inners, root);
    };

    const hide = () => {
      for (const inner of inners) inner.style.transform = "translateY(118%)";
    };

    paintGradients();
    const cancelFallback = hideUntilGsap(inners, { transform: "translateY(118%)" });

    let played = false;
    let tween: ReturnType<GsapBundle["gsap"]["to"]> | undefined;
    let gsap: GsapBundle["gsap"] | undefined;

    const build = () => {
      const api = gsap;
      if (!api) return;
      tween?.scrollTrigger?.kill();
      tween?.kill();

      paintGradients();
      hide();
      const lines = lineIndexes(parts);
      tween = api.to(inners, {
        yPercent: 0,
        duration,
        delay,
        ease: "expo.out",
        overwrite: true,
        stagger: (index: number) => lines[index] * stagger,
        onComplete: () => {
          played = true;
          // Hand the glyphs back to normal layout so hover states, text
          // selection and descenders behave exactly as they did before.
          // Only the transform goes — the inherited gradient has to stay.
          api.set(inners, { clearProps: "transform" });
          root.classList.add("rv-split--done");
        },
        ...(trigger === "scroll" ? { scrollTrigger: { trigger: root, start, once: true } } : {}),
      });
    };

    // A font swap or a resize changes where the lines break, and the grouping
    // has to follow. Only worth redoing while the words are still hidden.
    const onResize = () => {
      if (!played) build();
    };
    window.addEventListener("resize", onResize);
    void document.fonts?.ready.then(() => {
      if (!played) build();
    });

    const stop = withGsap((bundle) => {
      cancelFallback();
      gsap = bundle.gsap;
      build();
      return () => {
        tween?.scrollTrigger?.kill();
        tween?.kill();
      };
    });

    return () => {
      cancelFallback();
      window.removeEventListener("resize", onResize);
      stop();
    };
  }, [delay, duration, repel, stagger, start, trigger]);

  // Characters lean away from the pointer. Rest positions are cached rather
  // than read per move event — measuring 20-odd rects on every pointermove
  // forces a layout each time, and the hero already has plenty to do.
  useEffect(() => {
    if (!repel || prefersReducedMotion() || !hasFinePointer()) return;
    const root = ref.current;
    const chars = charsRef.current;
    if (!root || !chars.length) return;

    const host = root.closest("section") ?? root;

    return withGsap(({ gsap }) => {
    const movers = chars.map((char) => ({
      y: gsap.quickTo(char, "y", { duration: 0.5, ease: "power3.out" }),
      rotate: gsap.quickTo(char, "rotate", { duration: 0.6, ease: "power3.out" }),
    }));
    let centres: { x: number; y: number }[] = [];

    const measure = () => {
      centres = chars.map((char) => {
        const rect = char.getBoundingClientRect();
        return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      });
    };

    const settle = () => movers.forEach(({ y, rotate }) => { y(0); rotate(0); });

    const onMove = (event: PointerEvent) => {
      if (centres.length !== chars.length) measure();
      for (let index = 0; index < movers.length; index += 1) {
        const centre = centres[index];
        const dx = event.clientX - centre.x;
        const dy = event.clientY - centre.y;
        const pull = Math.max(0, 1 - Math.hypot(dx, dy) / 200);
        movers[index].y(-pull * 18);
        movers[index].rotate(pull * dx * -0.02);
      }
    };

    const onScroll = () => {
      centres = [];
      settle();
    };

    host.addEventListener("pointerenter", measure);
    host.addEventListener("pointermove", onMove as EventListener);
    host.addEventListener("pointerleave", settle);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      host.removeEventListener("pointerenter", measure);
      host.removeEventListener("pointermove", onMove as EventListener);
      host.removeEventListener("pointerleave", settle);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      gsap.killTweensOf(chars);
      gsap.set(chars, { clearProps: "transform" });
    };
    });
  }, [repel]);

  return (
    <Tag ref={ref} className={className ? `rv-split ${className}` : "rv-split"}>
      {children}
    </Tag>
  );
}
