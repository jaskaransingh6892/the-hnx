"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

/**
 * THE HNX MARK
 * -----------------------------------------------------------------
 * Two vertical rails crossed by two diagonals. Read together they
 * resolve into all three letters of the name:
 *   H — the two uprights, bridged at the crossing point
 *   N — left rail, descending diagonal, right rail
 *   X — the crossing itself
 * The node at the intersection is the connection point: everything
 * The HNX builds meets in the middle.
 */
export function LogoMark({
  className,
  animated = false,
}: {
  className?: string;
  animated?: boolean;
}) {
  const id = useId();
  const stroke = `stroke-${id}`;
  const core = `core-${id}`;
  const glow = `glow-${id}`;

  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={cn("h-9 w-9", className)}
    >
      <defs>
        <linearGradient id={stroke} x1="8" y1="6" x2="40" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#22d3ee" />
          <stop offset="0.5" stopColor="#4f7cff" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
        <radialGradient id={core} cx="0.5" cy="0.5" r="0.5">
          <stop stopColor="#ffffff" />
          <stop offset="0.55" stopColor="#7dd3fc" />
          <stop offset="1" stopColor="#4f7cff" />
        </radialGradient>
        <filter id={glow} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="1.6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* diagonals: the N stroke and its mirror, forming the X */}
      <g
        stroke={`url(#${stroke})`}
        strokeWidth="3.1"
        strokeLinecap="round"
        opacity="0.92"
        filter={`url(#${glow})`}
      >
        <path d="M12.5 13.2 L35.5 34.8" />
        <path d="M35.5 13.2 L12.5 34.8" />
      </g>

      {/* uprights: the H rails */}
      <g stroke={`url(#${stroke})`} strokeWidth="3.4" strokeLinecap="round">
        <path d="M12.5 9 L12.5 39" />
        <path d="M35.5 9 L35.5 39" />
      </g>

      {/* the connection node */}
      <circle cx="24" cy="24" r="4.8" fill="#03050a" />
      <circle
        cx="24"
        cy="24"
        r="2.9"
        fill={`url(#${core})`}
        className={animated ? "origin-center animate-pulse-glow" : undefined}
      />
    </svg>
  );
}

export function Logo({
  className,
  markClassName,
  showWordmark = true,
  animated = false,
}: {
  className?: string;
  markClassName?: string;
  showWordmark?: boolean;
  animated?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className={cn("h-9 w-9 shrink-0", markClassName)} animated={animated} />
      {showWordmark && (
        <span className="font-display text-[1.075rem] font-bold leading-none tracking-tight text-mist-100">
          <span className="text-mist-300 font-medium">The</span>{" "}
          <span className="text-gradient-accent">HNX</span>
        </span>
      )}
      <span className="sr-only">The HNX</span>
    </span>
  );
}
