"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { LogoMark } from "@/components/ui/Logo";

const orbitingNodes = [
  { label: "Products", radius: 37.5, start: 15, duration: 22 },
  { label: "Intelligence", radius: 27, start: 140, duration: 29 },
  { label: "Cloud", radius: 47, start: 255, duration: 36 },
];

/**
 * The hero's focal visual: the HNX mark at the centre of a rotating system of
 * orbits. Everything is transform driven so it stays on the compositor, and
 * the whole assembly tilts a few degrees toward the cursor.
 */
export function HeroCore() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 120, damping: 20, mass: 0.6 };
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [8, -8]), spring);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-10, 10]), spring);

  function handleMove(event: React.MouseEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width - 0.5);
    py.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function reset() {
    px.set(0);
    py.set(0);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="relative mx-auto aspect-square w-full max-w-[19rem] sm:max-w-[24rem] lg:max-w-[32rem] [perspective:1200px]"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full w-full"
      >
        <div
          aria-hidden
          className="absolute inset-[16%] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(79,124,255,0.32),transparent_62%)] blur-2xl animate-pulse-glow"
        />

        <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full animate-spin-slower" aria-hidden>
          <circle cx="200" cy="200" r="188" fill="none" stroke="rgba(148,163,184,0.16)" strokeWidth="1" strokeDasharray="2 10" />
        </svg>

        <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full animate-spin-reverse" aria-hidden>
          <defs>
            <linearGradient id="hero-arc" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
              <stop offset="55%" stopColor="#4f7cff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <circle cx="200" cy="200" r="150" fill="none" stroke="rgba(148,163,184,0.13)" strokeWidth="1" />
          <circle
            cx="200"
            cy="200"
            r="150"
            fill="none"
            stroke="url(#hero-arc)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="220 720"
          />
        </svg>

        <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full animate-spin-slow" aria-hidden>
          <circle cx="200" cy="200" r="108" fill="none" stroke="rgba(34,211,238,0.22)" strokeWidth="1" strokeDasharray="1 7" />
        </svg>

        {/* orbiting nodes: a full-size wrapper spins, the dot rides its rim */}
        {orbitingNodes.map((node, index) => (
          <div
            key={node.label}
            aria-hidden
            className="absolute inset-0 [animation:spin_var(--dur)_linear_infinite] motion-reduce:[animation:none]"
            style={{
              ["--dur" as string]: `${node.duration}s`,
              animationDirection: index % 2 ? "reverse" : "normal",
            }}
          >
            <div className="absolute inset-0" style={{ transform: `rotate(${node.start}deg)` }}>
              <span
                className="absolute left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-hnx-cyan shadow-[0_0_16px_4px_rgba(34,211,238,0.55)]"
                style={{ top: `${50 - node.radius}%` }}
              />
            </div>
          </div>
        ))}

        {/* centre core */}
        <div
          className="absolute left-1/2 top-1/2 grid h-[32%] w-[32%] place-items-center rounded-[30%] border border-white/12 bg-[linear-gradient(150deg,rgba(18,26,48,0.95),rgba(5,7,15,0.98))] shadow-[0_20px_80px_-20px_rgba(79,124,255,0.7)] backdrop-blur-xl"
          style={{ transform: "translate(-50%,-50%) translateZ(60px)" }}
        >
          <LogoMark className="h-[58%] w-[58%]" animated />
        </div>
      </motion.div>
    </div>
  );
}
