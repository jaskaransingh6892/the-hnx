"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Node = { x: number; y: number; vx: number; vy: number; r: number; hue: number };

const LINK_DISTANCE = 132;
const POINTER_RADIUS = 170;

/**
 * Connected-node field rendered on canvas.
 * - density scales with viewport area and is capped for low-power devices
 * - pointer gently pushes nearby nodes, then they settle back
 * - renders a single static frame when the user prefers reduced motion
 */
export function ParticleField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let frame = 0;
    const pointer = { x: -9999, y: -9999, active: false };

    function seed() {
      const area = width * height;
      const count = Math.round(Math.min(96, Math.max(26, area / 17000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.24,
        vy: (Math.random() - 0.5) * 0.24,
        r: Math.random() * 1.5 + 0.7,
        hue: Math.random(),
      }));
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      if (reduce) draw();
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);

      // links first so nodes sit on top
      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist > LINK_DISTANCE) continue;
          const strength = 1 - dist / LINK_DISTANCE;
          ctx!.strokeStyle = `rgba(120, 170, 255, ${strength * 0.24})`;
          ctx!.lineWidth = strength * 0.9;
          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(b.x, b.y);
          ctx!.stroke();
        }
      }

      for (const node of nodes) {
        const near = pointer.active
          ? Math.max(0, 1 - Math.hypot(node.x - pointer.x, node.y - pointer.y) / POINTER_RADIUS)
          : 0;
        const alpha = 0.42 + near * 0.5;
        const colour = node.hue > 0.62 ? "139, 92, 246" : node.hue > 0.3 ? "79, 124, 255" : "34, 211, 238";
        ctx!.fillStyle = `rgba(${colour}, ${alpha})`;
        ctx!.beginPath();
        ctx!.arc(node.x, node.y, node.r + near * 1.6, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    function step() {
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < -20) node.x = width + 20;
        if (node.x > width + 20) node.x = -20;
        if (node.y < -20) node.y = height + 20;
        if (node.y > height + 20) node.y = -20;

        if (pointer.active) {
          const dx = node.x - pointer.x;
          const dy = node.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < POINTER_RADIUS && dist > 0.001) {
            const push = ((POINTER_RADIUS - dist) / POINTER_RADIUS) * 0.35;
            node.x += (dx / dist) * push;
            node.y += (dy / dist) * push;
          }
        }
      }
      draw();
      frame = requestAnimationFrame(step);
    }

    function onPointerMove(event: PointerEvent) {
      if (event.pointerType === "touch") return;
      const rect = canvas!.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    }

    function onPointerLeave() {
      pointer.active = false;
    }

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    if (!reduce) {
      frame = requestAnimationFrame(step);
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerleave", onPointerLeave);
    }

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    />
  );
}
