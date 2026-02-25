import type { Product, ProductCode } from "@constants";
import { ProductCard } from "./product-card";

export type ProductGridProps = {
  products: Product[];
  onAddToBasket: (productCode: ProductCode) => void;
};

export function ProductGrid({
  products,
  onAddToBasket,
}: ProductGridProps) {
  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-3">
        <h2 className="text-xl font-semibold text-zinc-900">
          Products
        </h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.code}
            product={product}
            onAddToBasket={onAddToBasket}
          />
        ))}
      </div>
    </section>
  );
}
