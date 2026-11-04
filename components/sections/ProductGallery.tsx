import { ProductCard } from "@/components/ui/ProductCard";
import { products } from "@/lib/content";
import { cn, productGridColumns } from "@/lib/utils";

/** Keep every product visible so visitors can compare the work at a glance. */
export function ProductGallery() {
  return (
    <div className={cn("grid gap-6", productGridColumns(products.length))}>
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}
