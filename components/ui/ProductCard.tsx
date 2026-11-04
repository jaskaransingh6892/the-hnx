import Link from "next/link";
import { ArrowUpRight, Check, ExternalLink } from "lucide-react";
import type { Product } from "@/lib/content";
import { caseStudies } from "@/lib/case-studies";
import { cn } from "@/lib/utils";
import { SpotlightCard } from "./SpotlightCard";
import { StatusBadge } from "./StatusBadge";

export function ProductCard({ product }: { product: Product }) {
  const Icon = product.icon;
  const isLive = product.status === "Live";
  const hasCaseStudy = Boolean(caseStudies[product.slug]);

  return (
    <SpotlightCard
      as="article"
      className="h-full"
      glow={isLive ? "rgba(62,99,233,0.12)" : "rgba(120,67,216,0.1)"}
    >
      <div id={product.slug} className="flex h-full scroll-mt-32 flex-col">
        <div className={cn("relative min-h-52 overflow-hidden bg-gradient-to-br p-6 text-white sm:p-7", product.accent)}>
          <span aria-hidden className="absolute -right-14 -top-20 h-64 w-64 rounded-full border border-white/25" />
          <span aria-hidden className="absolute -right-6 -top-10 h-48 w-48 rounded-full border border-white/20" />
          <span aria-hidden className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-black/15 to-transparent" />
          <div className="relative flex items-start justify-between gap-4">
            <span className="grid h-14 w-14 place-items-center rounded-2xl border border-white/30 bg-white/15 shadow-[0_16px_32px_-20px_rgba(0,0,0,0.65)] backdrop-blur-sm">
              <Icon className="h-7 w-7" strokeWidth={1.8} />
            </span>
            <span className="rounded-full border border-white/35 bg-white/15 px-3 py-1 text-[0.6875rem] font-semibold tracking-wide backdrop-blur-sm">
              The HNX product
            </span>
          </div>
          <div className="relative mt-11">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-white/85">
              {product.category}
            </p>
            <h3 className="mt-1 font-display text-[1.75rem] font-bold tracking-tight">{product.name}</h3>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <StatusBadge status={product.status} className="w-fit" />
          <p className="mt-5 text-[0.9375rem] font-semibold leading-snug text-mist-100">
            {product.summary}
          </p>
          <p className="mt-3 text-[0.8125rem] leading-relaxed text-mist-300">
            {product.description}
          </p>

          <ul className="mt-5 grid gap-2 border-t border-slate-900/[0.07] pt-5 sm:grid-cols-2">
            {product.highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-2 text-[0.75rem] leading-snug text-mist-300">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-hnx-blue" strokeWidth={2.2} />
                {highlight}
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-7">
            {hasCaseStudy ? (
              <Link
                href={`/products/${product.slug}`}
                className="inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-hnx-blue transition-colors hover:text-hnx-cyan"
              >
                Read the build story
                <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
              </Link>
            ) : null}
            {product.href ? (
              <a
                href={product.href}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-mist-300 transition-colors hover:text-hnx-blue"
              >
                Open the product
                <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.8} />
                <span className="sr-only">(opens {product.name} in a new tab)</span>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}
