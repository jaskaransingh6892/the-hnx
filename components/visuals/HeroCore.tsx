"use client";

import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { Cloud, Layers3, Sparkles } from "lucide-react";
import { LogoMark } from "@/components/ui/Logo";

/** A layered 3D object with two tilted orbital planes. Pointer movement adds
 * a small second rotation; CSS handles the continuous animation on the GPU. */
export function HeroCore() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spring = { stiffness: 110, damping: 22, mass: 0.65 };
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [9, -9]), spring);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-12, 12]), spring);

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
      aria-hidden="true"
      className="relative mx-auto aspect-square w-full max-w-[21rem] sm:max-w-[27rem] lg:max-w-[36rem] [perspective:1100px]"
    >
      <div className="hero-scene-glow" />
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full w-full"
      >
        <div className="hero-orbit hero-orbit--one">
          <span className="hero-orbit-node hero-orbit-node--blue" />
          <span className="hero-orbit-node hero-orbit-node--cyan" />
        </div>
        <div className="hero-orbit hero-orbit--two">
          <span className="hero-orbit-node hero-orbit-node--violet" />
        </div>
        <div className="hero-orbit hero-orbit--three" />

        <div className="hero-prism-rotor">
          <div className="hero-prism-layer hero-prism-layer--back" />
          <div className="hero-prism-layer hero-prism-layer--middle" />
          <div className="hero-prism-layer hero-prism-layer--front">
            <div className="hero-prism-shine" />
            <LogoMark className="relative z-10 h-[48%] w-[48%] drop-shadow-[0_8px_15px_rgba(62,99,233,0.26)]" animated />
            <span className="relative z-10 mt-3 font-mono text-[0.55rem] font-semibold tracking-[0.3em] text-hnx-blue sm:text-[0.65rem]">
              THE HNX
            </span>
          </div>
        </div>

        <div className="hero-float-label hero-float-label--products">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-100 text-hnx-blue">
            <Layers3 className="h-5 w-5" strokeWidth={1.8} />
          </span>
          <span>Digital products</span>
        </div>
        <div className="hero-float-label hero-float-label--ai">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-violet-100 text-hnx-violet">
            <Sparkles className="h-5 w-5" strokeWidth={1.8} />
          </span>
          <span>AI systems</span>
        </div>
        <div className="hero-float-label hero-float-label--cloud">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-cyan-100 text-hnx-cyan">
            <Cloud className="h-5 w-5" strokeWidth={1.8} />
          </span>
          <span>Cloud platforms</span>
        </div>
      </motion.div>
      <div className="hero-floor-shadow" />
    </div>
  );
}
