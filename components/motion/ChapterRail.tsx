"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { prefersReducedMotion, withGsap } from "@/lib/gsap";

/**
 * A reading position for long pages: which part of the page you are in, and
 * how far through it you are. Sections declare themselves with
 * `data-chapter="Label"`; a page with fewer than two never shows the rail.
 *
 * Everything here is written straight to the DOM. The percentage changes on
 * every scroll tick, and putting that through React state meant re-rendering
 * the component a hundred times per pass of the page.
 *
 * The first chapter keeps the rail hidden — there is nothing useful to say
 * about where you are when you have not started yet.
 */
export function ChapterRail() {
  const pathname = usePathname();
  const rail = useRef<HTMLDivElement>(null);
  const indexEl = useRef<HTMLSpanElement>(null);
  const rollEl = useRef<HTMLSpanElement>(null);
  const percentEl = useRef<HTMLSpanElement>(null);

  useEffect(() => withGsap(({ gsap, ScrollTrigger }) => {
    if (prefersReducedMotion()) return;

    const railNode = rail.current;
    const indexNode = indexEl.current;
    const rollNode = rollEl.current;
    const percentNode = percentEl.current;
    if (!railNode || !indexNode || !rollNode || !percentNode) return;

    const triggers: ScrollTrigger[] = [];
    let current = -1;

    const show = (visible: boolean) =>
      gsap.to(railNode, {
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 12,
        duration: 0.4,
        ease: "expo.out",
        overwrite: true,
      });

    const setChapter = (index: number, label: string) => {
      if (index === current) return;
      const direction = index >= current ? 1 : -1;
      current = index;

      indexNode.textContent = String(index + 1).padStart(2, "0");

      const incoming = document.createElement("span");
      incoming.textContent = label;
      rollNode.appendChild(incoming);

      const outgoing = [...rollNode.children].filter((child) => child !== incoming);
      gsap.fromTo(
        incoming,
        { yPercent: 110 * direction },
        { yPercent: 0, duration: 0.5, ease: "expo.out" },
      );
      gsap.to(outgoing, {
        yPercent: -110 * direction,
        duration: 0.5,
        ease: "expo.out",
        onComplete: () => outgoing.forEach((child) => child.remove()),
      });

      show(index > 0);
    };

    // Read on the next frame: the chapters are whatever the page just
    // rendered, and their positions are only settled once layout has run.
    const frame = requestAnimationFrame(() => {
      const main = document.getElementById("main");
      if (!main) return;

      const chapters = [...main.querySelectorAll<HTMLElement>("[data-chapter]")];
      if (chapters.length < 2) return;

      chapters.forEach((section, index) => {
        triggers.push(
          ScrollTrigger.create({
            trigger: section,
            start: "top 55%",
            end: "bottom 55%",
            onToggle: (self) => {
              if (self.isActive) setChapter(index, section.dataset.chapter ?? "");
            },
          }),
        );
      });

      triggers.push(
        ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => {
            percentNode.textContent = `${String(Math.round(self.progress * 100)).padStart(2, "0")}%`;
          },
        }),
      );
    });

    return () => {
      cancelAnimationFrame(frame);
      triggers.forEach((trigger) => trigger.kill());
      gsap.killTweensOf(railNode);
      rollNode.replaceChildren();
      gsap.set(railNode, { opacity: 0, y: 12 });
    };
  }), [pathname]);

  return (
    <div ref={rail} className="chapter-rail" aria-hidden>
      <span ref={indexEl} className="chapter-rail__index">
        01
      </span>
      <span ref={rollEl} className="chapter-rail__roll" />
      <span ref={percentEl} className="chapter-rail__pct">
        00%
      </span>
    </div>
  );
}
