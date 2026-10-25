import type { Feature } from "@/lib/content";
import { cn } from "@/lib/utils";

export function FeatureCard({
  feature,
  className,
  compact = false,
}: {
  feature: Feature;
  className?: string;
  compact?: boolean;
}) {
  const Icon = feature.icon;

  return (
    <div
      className={cn(
        "edge-glow glass group relative h-full overflow-hidden rounded-2xl p-6 transition-transform duration-500 hover:-translate-y-1",
        compact && "p-5",
        className,
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-14 -top-14 h-32 w-32 rounded-full bg-hnx-blue/16 blur-3xl transition-opacity duration-500 group-hover:bg-hnx-cyan/22"
      />
      <span className="relative grid h-12 w-12 place-items-center rounded-2xl border border-hnx-blue/10 bg-[linear-gradient(145deg,#e8f3ff,#eeeaff)] text-hnx-blue shadow-sm transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
        <Icon className="h-6 w-6" strokeWidth={1.8} />
      </span>
      <h3 className="relative mt-5 font-display text-base font-semibold text-mist-100">
        {feature.title}
      </h3>
      <p className="relative mt-2 text-[0.8125rem] leading-relaxed text-mist-300">
        {feature.description}
      </p>
    </div>
  );
}
