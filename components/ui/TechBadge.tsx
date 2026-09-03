import type { Tech } from "@/lib/content";
import { cn } from "@/lib/utils";

export function TechBadge({ tech, className }: { tech: Tech; className?: string }) {
  const Icon = tech.icon;

  return (
    <span
      className={cn(
        "glass inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[0.8125rem] font-medium text-mist-200 transition-colors duration-300 hover:border-white/25 hover:text-mist-100",
        className,
      )}
    >
      <Icon className="h-3.5 w-3.5 text-hnx-cyan" strokeWidth={1.8} />
      {tech.name}
    </span>
  );
}
