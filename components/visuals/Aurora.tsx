import { cn } from "@/lib/utils";

/**
 * Ambient background wash. Pure CSS, no JS, sits behind page content.
 */
export function Aurora({
  className,
  intensity = "medium",
}: {
  className?: string;
  intensity?: "soft" | "medium" | "strong";
}) {
  const opacity = { soft: "opacity-40", medium: "opacity-60", strong: "opacity-90" }[intensity];

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div
        className={cn(
          "absolute -top-40 left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-hnx-blue/22 blur-[130px] animate-drift",
          opacity,
        )}
      />
      <div
        className={cn(
          "absolute -left-32 top-1/3 h-[26rem] w-[26rem] rounded-full bg-hnx-cyan/16 blur-[120px] animate-drift [animation-delay:-6s]",
          opacity,
        )}
      />
      <div
        className={cn(
          "absolute -right-32 bottom-0 h-[30rem] w-[30rem] rounded-full bg-hnx-violet/18 blur-[130px] animate-drift [animation-delay:-11s]",
          opacity,
        )}
      />
    </div>
  );
}

/** Faint technical grid with a radial fade, used as a section floor. */
export function GridField({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "grid-field pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_15%,transparent_72%)]",
        className,
      )}
    />
  );
}
