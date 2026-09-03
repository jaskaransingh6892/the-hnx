import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/lib/content";
import { cn } from "@/lib/utils";
import { SpotlightCard } from "./SpotlightCard";

export function ServiceCard({
  service,
  index,
  href = "/services",
  showCapabilities = false,
}: {
  service: Service;
  index: number;
  href?: string;
  showCapabilities?: boolean;
}) {
  const Icon = service.icon;

  return (
    <SpotlightCard as="article" className="h-full">
      <Link
        href={`${href}#${service.slug}`}
        className="flex h-full flex-col gap-5 p-6 sm:p-7"
        aria-label={`${service.title} — ${service.tagline}`}
      >
        <div className="flex items-start justify-between gap-4">
          <span
            className={cn(
              "relative grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-white/10 bg-gradient-to-br transition-transform duration-500 group-hover:scale-105",
              service.accent,
            )}
          >
            <span className="absolute inset-0 rounded-xl bg-ink-900/70" />
            <Icon className="relative h-[22px] w-[22px] text-mist-100" strokeWidth={1.6} />
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
                className="rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1 text-[0.6875rem] text-mist-300"
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
