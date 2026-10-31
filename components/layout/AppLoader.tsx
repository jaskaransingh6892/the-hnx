"use client";

import { useEffect, useState } from "react";
import { LogoMark } from "@/components/ui/Logo";

const MINIMUM_VISIBLE_MS = 1350;
const MAXIMUM_WAIT_MS = 4000;
const FADE_MS = 600;

/** The markup is server-rendered so the logo appears on the first paint. */
export function AppLoader() {
  const [leaving, setLeaving] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const startedAt = performance.now();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const minimum = reduceMotion ? 150 : MINIMUM_VISIBLE_MS;
    let exitTimer: number | undefined;
    let exitRequested = false;

    function requestExit() {
      if (exitRequested) return;
      exitRequested = true;
      const remaining = Math.max(0, minimum - (performance.now() - startedAt));
      exitTimer = window.setTimeout(() => setLeaving(true), remaining);
    }

    if (document.readyState === "complete") requestExit();
    else window.addEventListener("load", requestExit, { once: true });

    // A slow third-party asset must not leave the splash covering the site.
    const fallbackTimer = window.setTimeout(requestExit, MAXIMUM_WAIT_MS);

    return () => {
      window.removeEventListener("load", requestExit);
      window.clearTimeout(fallbackTimer);
      window.clearTimeout(exitTimer);
    };
  }, []);

  useEffect(() => {
    if (!leaving) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(() => setVisible(false), reduceMotion ? 20 : FADE_MS);
    return () => window.clearTimeout(timer);
  }, [leaving]);

  useEffect(() => {
    const content = document.getElementById("app-content");
    if (!content) return;
    content.inert = visible;
    return () => { content.inert = false; };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className={`app-loader${leaving ? " app-loader--leaving" : ""}`} role="status" aria-live="polite" aria-atomic="true">
      <span className="sr-only">The HNX is loading</span>
      <div className="app-loader__content" aria-hidden="true">
        <div className="app-loader__emblem">
          <span className="app-loader__orbit app-loader__orbit--outer" />
          <span className="app-loader__orbit app-loader__orbit--inner" />
          <span className="app-loader__tile">
            <span className="app-loader__logo">
              <LogoMark className="h-20 w-20" />
            </span>
          </span>
        </div>
        <div className="app-loader__wordmark">The <span>HNX</span></div>
        <div className="app-loader__tagline">BUILDING WHAT&apos;S NEXT</div>
        <div className="app-loader__track"><span /></div>
      </div>
    </div>
  );
}
