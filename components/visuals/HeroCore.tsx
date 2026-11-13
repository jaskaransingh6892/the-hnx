"use client";

import { useEffect, useRef } from "react";
import { hasFinePointer, prefersReducedMotion, withGsap } from "@/lib/gsap";
import { Globe, LayoutDashboard, ShieldCheck } from "lucide-react";
import { LogoMark } from "@/components/ui/Logo";

/** A layered 3D object with two tilted orbital planes. Pointer movement adds
 * a small second rotation; CSS handles the continuous animation on the GPU. */
export function HeroCore() {
  const ref = useRef<HTMLDivElement>(null);
  const rotor = useRef<HTMLDivElement>(null);

  useEffect(() => withGsap(({ gsap }) => {
    const frame = ref.current;
    const node = rotor.current;
    if (!frame || !node || prefersReducedMotion() || !hasFinePointer()) return;

    const toX = gsap.quickTo(node, "rotationX", { duration: 0.7, ease: "power3.out" });
    const toY = gsap.quickTo(node, "rotationY", { duration: 0.7, ease: "power3.out" });

    const onMove = (event: PointerEvent) => {
      const rect = frame.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      toX(y * -18);
      toY(x * 24);
    };

    const onLeave = () => {
      toX(0);
      toY(0);
    };

    frame.addEventListener("pointermove", onMove);
    frame.addEventListener("pointerleave", onLeave);

    return () => {
      frame.removeEventListener("pointermove", onMove);
      frame.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(node);
      gsap.set(node, { clearProps: "transform" });
    };
  }), []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="relative mx-auto aspect-square w-full max-w-[21rem] sm:max-w-[27rem] lg:max-w-[36rem] [perspective:1100px]"
    >
      <div className="hero-scene-glow" />
      <div ref={rotor} style={{ transformStyle: "preserve-3d" }} className="relative h-full w-full">
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
            <Globe className="h-5 w-5" strokeWidth={1.8} />
          </span>
          <span>Web platforms</span>
        </div>
        <div className="hero-float-label hero-float-label--ai">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-violet-100 text-hnx-violet">
            <LayoutDashboard className="h-5 w-5" strokeWidth={1.8} />
          </span>
          <span>ERP systems</span>
        </div>
        <div className="hero-float-label hero-float-label--cloud">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-cyan-100 text-hnx-cyan">
            <ShieldCheck className="h-5 w-5" strokeWidth={1.8} />
          </span>
          <span>Security audits</span>
        </div>
      </div>
      <div className="hero-floor-shadow" />
    </div>
  );
}
