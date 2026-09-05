"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Direction = "up" | "down" | "left" | "right" | "none";

const offset: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 28 },
  down: { x: 0, y: -28 },
  left: { x: 32, y: 0 },
  right: { x: -32, y: 0 },
  none: { x: 0, y: 0 },
};

/** Expands the observer a quarter-viewport past the fold so a reveal starts well
    before the element is on screen. Paired with the shorter duration below this
    keeps the animation ahead of a ~2500px/s flick, where the old 0.2 threshold and
    0.7s duration left whole sections rendering at opacity 0. */
const VIEWPORT_MARGIN = "0px 0px 25% 0px";

/** Long enough to read as motion, short enough to finish before a fast scroll
    carries the element past the middle of the screen. */
const DURATION = 0.5;

/** Scroll-triggered reveal. Fires once, respects reduced motion via CSS. */
export function Reveal({
  children,
  className,
  delay = 0,
  duration = DURATION,
  direction = "up",
  amount = 0.05,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: Direction;
  amount?: number;
}) {
  const { x, y } = offset[direction];

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount, margin: VIEWPORT_MARGIN }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: DURATION, ease: EASE } },
};

/** Wraps a grid/list so children animate in sequence. */
export function Stagger({
  children,
  className,
  amount = 0.05,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount, margin: VIEWPORT_MARGIN }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={staggerChild}>
      {children}
    </motion.div>
  );
}
