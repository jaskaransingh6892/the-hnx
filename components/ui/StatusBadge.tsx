import { productStatusStyles, type ProductStatus } from "@/lib/content";
import { cn } from "@/lib/utils";

const dot: Record<ProductStatus, string> = {
  Live: "bg-emerald-400 shadow-[0_0_10px_2px_rgba(52,211,153,0.7)]",
  "In Development": "bg-sky-400 shadow-[0_0_10px_2px_rgba(56,189,248,0.6)]",
  "Coming Soon": "bg-amber-400 shadow-[0_0_10px_2px_rgba(251,191,36,0.55)]",
};

export function StatusBadge({
  status,
  className,
}: {
  status: ProductStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[0.6875rem] font-medium tracking-wide",
        productStatusStyles[status],
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", dot[status])} />
      {status}
    </span>
  );
}
