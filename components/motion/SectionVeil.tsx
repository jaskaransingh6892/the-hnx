"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { prefersReducedMotion, withGsap } from "@/lib/gsap";

/** How dark a section goes as the next one arrives over it. */
const MAX_OPACITY = 0.18;

/**
 * Washes each section into shadow as the following one rises over it. On a
 * page of stacked light panels this is what supplies depth — the sections
 * read as sheets passing in front of each other rather than one long scroll.
 *
 * Opt a section out with `data-no-veil`.
 */
export function SectionVeil() {
  const pathname = usePathname();

  useEffect(() => withGsap(({ gsap }) => {
    if (prefersReducedMotion()) return;

    const main = document.getElementById("main");
    if (!main) return;

    const sections = [...main.querySelectorAll<HTMLElement>(":scope > section")];
    const teardown: (() => void)[] = [];

    sections.forEach((section, index) => {
      const next = sections[index + 1];
      if (!next || section.hasAttribute("data-no-veil")) return;

      // The veil is absolutely placed, so the section has to be its
      // containing block; isolation keeps its z-index local to the section.
      const restorePosition = getComputedStyle(section).position === "static";
      if (restorePosition) section.style.position = "relative";
      section.style.isolation = "isolate";

      const veil = document.createElement("span");
      veil.className = "section-veil";
      veil.setAttribute("aria-hidden", "true");
      section.appendChild(veil);

      const tween = gsap.to(veil, {
        opacity: MAX_OPACITY,
        ease: "none",
        scrollTrigger: { trigger: next, start: "top bottom", end: "top 14%", scrub: true },
      });

      teardown.push(() => {
        tween.scrollTrigger?.kill();
        tween.kill();
        veil.remove();
        section.style.isolation = "";
        if (restorePosition) section.style.position = "";
      });
    });

    return () => teardown.forEach((fn) => fn());
  }), [pathname]);

  return null;
}
