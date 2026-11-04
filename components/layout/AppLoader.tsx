"use client";

import { useEffect, useState } from "react";
import { LogoMark } from "@/components/ui/Logo";

const MINIMUM_VISIBLE_MS = 350;
const FADE_MS = 260;

/** The markup is server-rendered so the logo appears on the first paint. */
export function AppLoader() {
  const [leaving, setLeaving] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // performance.now() includes the time spent loading and hydrating the page.
    // The splash should not add another fixed wait after content is ready.
    const remaining = reduceMotion ? 0 : Math.max(0, MINIMUM_VISIBLE_MS - performance.now());
    const timer = window.setTimeout(() => setLeaving(true), remaining);
    return () => window.clearTimeout(timer);
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
    content.inert = visible && !leaving;
    return () => { content.inert = false; };
  }, [visible, leaving]);

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
