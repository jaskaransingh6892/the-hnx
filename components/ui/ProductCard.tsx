import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
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
      glow={isLive ? "rgba(62,99,233,0.12)" : "rgba(120,67,216,0.1)"}
    >
      <div id={product.slug} className="flex h-full scroll-mt-32 flex-col gap-6 p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <span
            className={cn(
              "relative grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br shadow-[0_14px_28px_-14px_rgba(62,99,233,0.35)] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110",
              product.accent,
            )}
          >
            <Icon className="h-8 w-8 text-white drop-shadow-sm" strokeWidth={1.8} />
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
              className="rounded-full border border-slate-900/8 bg-slate-900/[0.03] px-2.5 py-1 text-[0.6875rem] text-mist-300"
            >
              {highlight}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center justify-between border-t border-slate-900/[0.07] pt-5">
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-mist-200 transition-colors duration-300 hover:text-hnx-cyan"
          >
            Read the case study
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.8}
            />
          </Link>
          {product.href ? (
            <a
              href={product.href}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 rounded-full border border-hnx-cyan/30 bg-hnx-cyan/10 px-3 py-1.5 text-[0.75rem] font-medium text-hnx-cyan transition-colors duration-300 hover:border-hnx-cyan/60 hover:bg-hnx-cyan/20"
            >
              Visit site
              <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.8} />
              <span className="sr-only">(opens {product.name} in a new tab)</span>
            </a>
          ) : (
            <span
              aria-hidden
              className={cn(
                "h-px w-16 bg-gradient-to-r opacity-40 transition-opacity duration-500 group-hover:opacity-100",
                product.accent,
              )}
            />
          )}
        </div>
      </div>
    </SpotlightCard>
  );
}
