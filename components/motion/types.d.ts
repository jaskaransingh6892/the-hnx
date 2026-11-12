import type Lenis from "lenis";

declare global {
  interface Window {
    /** Set by <SmoothScroll />; absent when reduced motion is on. */
    __lenis?: Lenis;
  }
}

export {};
