"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { ProductCard } from "@/components/ui/ProductCard";
import { EASE } from "@/components/ui/Reveal";
import { productCategories, products } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Filterable catalogue. Categories are derived from the product list, so a new
 * one appears the moment a product using it is added. Cards are keyed by the
 * active filter so each change replays the entry animation instead of relying
 * on layout projection, which is fragile across a changing grid.
 */
export function ProductGallery() {
  const [active, setActive] = useState("All");

  const visible = useMemo(
    () => (active === "All" ? products : products.filter((item) => item.category === active)),
    [active],
  );

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter products by category">
        {productCategories.map((category) => {
          const selected = category === active;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              aria-pressed={selected}
              className={cn(
                "relative rounded-full px-4 py-2 text-[0.8125rem] font-medium transition-colors duration-300",
                selected ? "text-mist-100" : "text-mist-300 hover:text-mist-100",
              )}
            >
              {selected && (
                <motion.span
                  layoutId="product-filter"
                  className="absolute inset-0 -z-10 rounded-full border border-white/12 bg-white/[0.06]"
                  transition={{ duration: 0.4, ease: EASE }}
                />
              )}
              {category}
            </button>
          );
        })}
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((product, index) => (
          <motion.div
            key={`${active}-${product.slug}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.05, ease: EASE }}
            className="h-full"
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>

      <p className="text-[0.8125rem] text-mist-400" aria-live="polite">
        Showing {visible.length} of {products.length} products
      </p>
    </div>
  );
}
