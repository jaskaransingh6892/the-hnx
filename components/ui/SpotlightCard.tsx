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
  glow = "rgba(91,134,255,0.16)",
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
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    node.style.setProperty("--mx", `${x}px`);
    node.style.setProperty("--my", `${y}px`);
    node.style.setProperty("--rx", `${((y / rect.height) - 0.5) * -7}deg`);
    node.style.setProperty("--ry", `${((x / rect.width) - 0.5) * 7}deg`);
  }

  function handleLeave() {
    const node = ref.current;
    if (!node) return;
    node.style.setProperty("--rx", "0deg");
    node.style.setProperty("--ry", "0deg");
  }

  return (
    <Tag
      ref={ref as never}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn(
        "edge-glow glass spotlight-tilt group relative overflow-hidden rounded-2xl",
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
