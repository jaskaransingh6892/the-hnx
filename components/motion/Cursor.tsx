"use client";

import { useEffect, useRef } from "react";
import { gsap, hasFinePointer, prefersReducedMotion } from "@/lib/gsap";

/**
 * A trailing ring that lags the pointer and opens into a labelled pill over
 * anything carrying `data-cursor`. The native cursor is deliberately left
 * visible — hiding it on a site people come to in order to hire an engineer
 * costs more in usability than it gains in polish.
 */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ring.current;
    const labelNode = label.current;
    if (!node || !labelNode) return;
    if (!hasFinePointer() || prefersReducedMotion()) return;

    const root = document.documentElement;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (!root.classList.contains("cursor-on")) {
        x = targetX;
        y = targetY;
        root.classList.add("cursor-on");
      }
    };

    const tick = () => {
      x += (targetX - x) * 0.18;
      y += (targetY - y) * 0.18;
      node.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };

    const onOver = (event: PointerEvent) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      const interactive = (event.target as HTMLElement | null)?.closest(
        "a, button, [role='button'], input, textarea, select",
      );
      node.classList.toggle("is-labelled", Boolean(target));
      node.classList.toggle("is-active", Boolean(interactive));
      if (target) labelNode.textContent = target.dataset.cursor ?? "";
    };

    const onLeave = () => root.classList.remove("cursor-on");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerleave", onLeave);
    gsap.ticker.add(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerleave", onLeave);
      gsap.ticker.remove(tick);
      root.classList.remove("cursor-on");
    };
  }, []);

  return (
    <div ref={ring} className="hnx-cursor" aria-hidden>
      <span ref={label} className="hnx-cursor__label" />
    </div>
  );
}
