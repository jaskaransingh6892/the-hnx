import {
  siNextdotjs,
  siReact,
  siDotnet,
  siNodedotjs,
  siPython,
  siPostgresql,
  siDocker,
  type SimpleIcon,
} from "simple-icons";
import type { Tech } from "@/lib/content";
import { cn } from "@/lib/utils";

const brands: Record<string, { icon?: SimpleIcon; color: string }> = {
  "Next.js": { icon: siNextdotjs, color: "#111827" },
  React: { icon: siReact, color: "#087ea4" },
  ".NET": { icon: siDotnet, color: "#512bd4" },
  "Node.js": { icon: siNodedotjs, color: "#41873f" },
  Python: { icon: siPython, color: "#3776ab" },
  PostgreSQL: { icon: siPostgresql, color: "#4169e1" },
  "SQL Server": { color: "#cc2927" },
  Azure: { color: "#0078d4" },
  AWS: { color: "#a76500" },
  Docker: { icon: siDocker, color: "#2496ed" },
  OpenAI: { color: "#087f68" },
  "AI APIs": { color: "#7843d8" },
};

export function TechBadge({ tech, className }: { tech: Tech; className?: string }) {
  const Icon = tech.icon;
  const brand = brands[tech.name] ?? { color: "#3e63e9" };

  return (
    <span
      className={cn(
        "glass inline-flex items-center gap-2.5 rounded-full px-3.5 py-2 text-[0.8125rem] font-semibold text-mist-200 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-hnx-blue/25 hover:shadow-[0_14px_28px_-18px_rgba(53,74,128,0.42)]",
        className,
      )}
    >
      <span
        className="grid h-7 w-7 place-items-center rounded-lg"
        style={{ color: brand.color, backgroundColor: `${brand.color}16` }}
      >
        {brand.icon ? (
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
            <path d={brand.icon.path} />
          </svg>
        ) : (
          <Icon className="h-4 w-4" strokeWidth={1.9} aria-hidden="true" />
        )}
      </span>
      {tech.name}
    </span>
  );
}
