import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/lib/content";
import { cn } from "@/lib/utils";
import { SpotlightCard } from "./SpotlightCard";

export function ServiceCard({
  service,
  index,
  showCapabilities = false,
}: {
  service: Service;
  index: number;
  showCapabilities?: boolean;
}) {
  const Icon = service.icon;
  const palette = [
    "bg-cyan-100 text-cyan-700 ring-cyan-200/70",
    "bg-indigo-100 text-indigo-700 ring-indigo-200/70",
    "bg-violet-100 text-violet-700 ring-violet-200/70",
    "bg-emerald-100 text-emerald-700 ring-emerald-200/70",
    "bg-amber-100 text-amber-700 ring-amber-200/70",
    "bg-fuchsia-100 text-fuchsia-700 ring-fuchsia-200/70",
    "bg-blue-100 text-blue-700 ring-blue-200/70",
    "bg-rose-100 text-rose-700 ring-rose-200/70",
  ][index % 8];

  return (
    <SpotlightCard as="article" className="h-full">
      <Link
        href={`/services/${service.slug}`}
        className="flex h-full flex-col gap-5 p-6 sm:p-7"
        aria-label={`${service.title} — ${service.tagline}`}
      >
        <div className="flex items-start justify-between gap-4">
          <span
            className={cn(
              "relative grid h-14 w-14 shrink-0 place-items-center rounded-2xl ring-1 shadow-[0_12px_24px_-16px_currentColor] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110",
              palette,
            )}
          >
            <Icon className="relative h-7 w-7" strokeWidth={1.8} />
          </span>

          <span className="font-mono text-[0.6875rem] tracking-[0.2em] text-mist-400/70">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-display text-lg font-semibold text-mist-100">{service.title}</h3>
          <p className="text-[0.8125rem] leading-relaxed text-mist-300">{service.description}</p>
        </div>

        {showCapabilities ? (
          <ul className="mt-auto flex flex-wrap gap-1.5 pt-1">
            {service.capabilities.map((capability) => (
              <li
                key={capability}
                className="rounded-full border border-slate-900/8 bg-slate-900/[0.03] px-2.5 py-1 text-[0.6875rem] text-mist-300"
              >
                {capability}
              </li>
            ))}
          </ul>
        ) : null}

        <span className="mt-auto inline-flex items-center gap-1.5 pt-1 text-[0.8125rem] font-medium text-mist-300 transition-colors duration-300 group-hover:text-hnx-cyan">
          Explore
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={1.8}
          />
        </span>
      </Link>
    </SpotlightCard>
  );
}
