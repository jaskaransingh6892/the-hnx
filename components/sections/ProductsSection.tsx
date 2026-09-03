import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { ProductCard } from "@/components/ui/ProductCard";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { products } from "@/lib/content";

/**
 * Product showcase. Driven entirely by `products` in lib/content.ts —
 * adding an entry there is the only step needed to list a new product.
 */
export function ProductsSection({ limit }: { limit?: number }) {
  const shown = typeof limit === "number" ? products.slice(0, limit) : products;

  return (
    <section id="products" className="relative overflow-hidden border-y border-white/[0.06] py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(79,124,255,0.10),transparent_58%)]"
      />

      <div className="shell relative flex flex-col gap-14">
        <SectionHeading
          eyebrow="Our products"
          title="Products Built for"
          highlight="the Future"
          description="Software we own end to end — built from problems we kept seeing in client work, then engineered into platforms anyone can run."
        />

        <Stagger className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((product) => (
            <StaggerItem key={product.slug} className="h-full">
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </Stagger>

        {typeof limit === "number" && limit < products.length ? (
          <Reveal className="flex justify-center" delay={0.08}>
            <ButtonLink
              href="/products"
              variant="secondary"
              size="lg"
              icon={<ArrowRight className="h-[18px] w-[18px]" />}
            >
              View the full catalogue
            </ButtonLink>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
