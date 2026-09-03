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
      <span className="relative grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.04]">
        <Icon className="h-5 w-5 text-hnx-cyan" strokeWidth={1.6} />
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
