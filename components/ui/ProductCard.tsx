import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/lib/content";
import { cn } from "@/lib/utils";
import { SpotlightCard } from "./SpotlightCard";
import { StatusBadge } from "./StatusBadge";

export function ProductCard({ product }: { product: Product }) {
  const Icon = product.icon;
  const isLive = product.status === "Live";

  return (
    <SpotlightCard
      as="article"
      className="h-full"
      glow={isLive ? "rgba(34,211,238,0.16)" : "rgba(139,92,246,0.14)"}
    >
      <div id={product.slug} className="flex h-full scroll-mt-32 flex-col gap-6 p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <span
            className={cn(
              "relative grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br p-[1px] transition-transform duration-500 group-hover:scale-105",
              product.accent,
            )}
          >
            <span className="grid h-full w-full place-items-center rounded-[15px] bg-ink-900">
              <Icon className="h-6 w-6 text-mist-100" strokeWidth={1.5} />
            </span>
          </span>
          <StatusBadge status={product.status} />
        </div>

        <div className="flex flex-col gap-2.5">
          <div className="flex items-baseline gap-2.5">
            <h3 className="font-display text-xl font-bold text-mist-100">{product.name}</h3>
            <span className="eyebrow text-mist-400">{product.category}</span>
          </div>
          <p className="text-sm font-medium text-mist-200">{product.summary}</p>
          <p className="text-[0.8125rem] leading-relaxed text-mist-300">{product.description}</p>
        </div>

        <ul className="flex flex-wrap gap-1.5">
          {product.highlights.map((highlight) => (
            <li
              key={highlight}
              className="rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1 text-[0.6875rem] text-mist-300"
            >
              {highlight}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center justify-between border-t border-white/[0.07] pt-5">
          <Link
            href={`/contact?product=${encodeURIComponent(product.name)}`}
            className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-mist-200 transition-colors duration-300 hover:text-hnx-cyan"
          >
            Explore Product
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.8}
            />
          </Link>
          <span
            aria-hidden
            className={cn(
              "h-px w-16 bg-gradient-to-r opacity-40 transition-opacity duration-500 group-hover:opacity-100",
              product.accent,
            )}
          />
        </div>
      </div>
    </SpotlightCard>
  );
}
