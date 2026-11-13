"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { loadGsap, prefersReducedMotion } from "@/lib/gsap";
import type { GsapBundle } from "@/lib/gsap";

const COVER = 0.42;
const REVEAL = 0.55;

/** If a route never resolves, the curtain still has to come back up. */
const STUCK_AFTER_MS = 4000;

/**
 * A panel that sweeps up over the page on an internal link click, then keeps
 * travelling up to reveal the new route. Because the cover plays *before*
 * `router.push`, the swap itself — and any time the new route spends loading —
 * happens out of sight, which is what makes a multi-page site feel like one
 * application.
 */
export function PageTransition() {
  const curtain = useRef<HTMLDivElement>(null);
  const mark = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const covered = useRef(false);
  const routeLanded = useRef(false);
  const busy = useRef(false);
  const stuckTimer = useRef<number>(0);
  const api = useRef<GsapBundle["gsap"] | null>(null);

  const reveal = useCallback(() => {
    const node = curtain.current;
    const markNode = mark.current;
    const gsap = api.current;
    if (!node || !markNode || !gsap || !busy.current) return;

    busy.current = false;
    covered.current = false;
    routeLanded.current = false;
    window.clearTimeout(stuckTimer.current);
    node.classList.remove("is-busy");

    gsap
      .timeline()
      .to(markNode, { opacity: 0, duration: 0.2, ease: "power2.in" }, 0)
      .to(
        node,
        {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: REVEAL,
          ease: "power3.inOut",
          onComplete: () => gsap.set(node, { clipPath: "inset(100% 0% 0% 0%)" }),
        },
        0,
      );
  }, []);

  useEffect(() => {
    const node = curtain.current;
    const markNode = mark.current;
    if (!node || !markNode || prefersReducedMotion()) return;

    void loadGsap().then((bundle) => {
      api.current = bundle.gsap;
    });

    const onClick = (event: MouseEvent) => {
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const gsap = api.current;
      // Until the library is here the browser can handle the navigation.
      if (busy.current || !gsap) return;

      const link = (event.target as HTMLElement | null)?.closest("a");
      if (!link) return;
      if (link.target && link.target !== "_self") return;
      if (link.hasAttribute("download")) return;

      const href = link.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;

      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin) return;
      // Same page, or a jump within it — Lenis already handles those.
      if (url.pathname === location.pathname) return;

      // Caught in the capture phase, ahead of next/link's own handler: it
      // would otherwise preventDefault first and navigate behind our back.
      event.preventDefault();
      event.stopPropagation();
      busy.current = true;
      covered.current = false;
      routeLanded.current = false;
      node.classList.add("is-busy");

      gsap
        .timeline({
          onComplete: () => {
            covered.current = true;
            // The route may well have landed while the cover was still
            // sweeping up; in that case nothing else is coming, so lift now.
            if (routeLanded.current) reveal();
          },
        })
        .fromTo(
          node,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: COVER, ease: "power3.inOut" },
          0,
        )
        .fromTo(markNode, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, 0.12);

      stuckTimer.current = window.setTimeout(reveal, STUCK_AFTER_MS);
      router.push(url.pathname + url.search + url.hash);
    };

    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.clearTimeout(stuckTimer.current);
    };
  }, [reveal, router]);

  // The new route has painted behind the curtain.
  useEffect(() => {
    if (!busy.current) return;
    routeLanded.current = true;
    if (covered.current) reveal();
  }, [pathname, reveal]);

  return (
    <div ref={curtain} className="page-curtain" aria-hidden>
      <span ref={mark} className="page-curtain__mark">
        The <span>HNX</span>
      </span>
    </div>
  );
}
