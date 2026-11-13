"use client";

import { useEffect } from "react";
import { prefersReducedMotion, withGsap } from "@/lib/gsap";

/** Must match the media query that makes the footer sticky in globals.css. */
const UNCOVER_QUERY = "(min-width: 1024px) and (min-height: 720px)";

/**
 * The uncover itself is pure CSS — the footer is `position: sticky` so it
 * holds its space in flow and sits behind the page from the first paint.
 * (Switching it to `fixed` from JS after hydration dropped a 598px box into
 * the viewport in one frame, which scored 0.63 CLS.)
 *
 * All that is left for JS is the parallax: the footer's contents drift up
 * into place over the distance the footer is being revealed.
 */
export function FooterUncover() {
  useEffect(() => withGsap(({ gsap, ScrollTrigger }) => {
    if (prefersReducedMotion()) return;

    const inner = document.querySelector<HTMLElement>(".site-footer__inner");
    const footer = document.querySelector<HTMLElement>(".site-footer");
    const main = document.getElementById("main");
    if (!inner || !footer || !main) return;

    const media = window.matchMedia(UNCOVER_QUERY);
    let tween: gsap.core.Tween | undefined;

    const build = () => {
      tween?.scrollTrigger?.kill();
      tween?.kill();
      tween = undefined;
      gsap.set(inner, { clearProps: "transform" });
      if (!media.matches) return;

      tween = gsap.fromTo(
        inner,
        { yPercent: 24 },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: main,
            start: "bottom bottom",
            end: () => `bottom bottom-=${footer.offsetHeight}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );
    };

    build();
    const onResize = () => {
      build();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      tween?.scrollTrigger?.kill();
      tween?.kill();
      gsap.set(inner, { clearProps: "transform" });
    };
  }), []);

  return null;
}
