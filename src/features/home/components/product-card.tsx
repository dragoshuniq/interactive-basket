import type { Product, ProductCode } from "@constants";

export type ProductCardProps = {
  product: Product;
  onAddToBasket: (productCode: ProductCode) => void;
};

const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function ProductCard({
  product,
  onAddToBasket,
}: ProductCardProps) {
  return (
    <article className="flex h-full flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-zinc-900">
            {product.name}
          </h2>
          <span className="rounded-full bg-zinc-200 px-3 py-1 text-xs font-medium tracking-wide text-zinc-800">
            {product.code}
          </span>
        </div>
        <p className="text-2xl font-semibold text-zinc-900">
          {moneyFormatter.format(product.unitPrice.amount)}
        </p>
      </div>
      <button
        type="button"
        onClick={() => onAddToBasket(product.code)}
        className="mt-6 rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-800"
      >
        Add to basket
      </button>
    </article>
  );
}
