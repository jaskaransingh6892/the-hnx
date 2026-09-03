"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Glass panel with a cursor-following highlight. The pointer position is
 * written to CSS custom properties, so no React state churn per frame.
 */
export function SpotlightCard({
  children,
  className,
  as: Tag = "div",
  glow = "rgba(79,124,255,0.16)",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
  glow?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(event: React.MouseEvent<HTMLElement>) {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    node.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  return (
    <Tag
      ref={ref as never}
      onMouseMove={handleMove}
      className={cn(
        "edge-glow glass group relative overflow-hidden rounded-2xl transition-transform duration-500",
        className,
      )}
      style={{ ["--glow" as string]: glow }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(340px circle at var(--mx, 50%) var(--my, 50%), var(--glow), transparent 68%)",
        }}
      />
      {children}
    </Tag>
  );
}
