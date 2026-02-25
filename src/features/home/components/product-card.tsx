import {
  OFFERS,
  OfferType,
  type Product,
  type ProductCode,
} from "@constants";
import { formatMoney } from "@features/home/utils";

export type ProductCardProps = {
  product: Product;
  onAddToBasket: (productCode: ProductCode) => void;
};

function getPromotionText(product: Product): string | undefined {
  const offer = OFFERS.find(
    (currentOffer) => currentOffer.productCode === product.code
  );

  if (!offer) return;

  if (offer.type === OfferType.Discount) {
    const discountPercent = Math.trunc(offer.discountRate * 100);

    return (
      `Buy ${offer.buyQuantity} ${product.name}, get ` +
      `${offer.getQuantity} at ${discountPercent}% off`
    );
  }

  return;
}

export function ProductCard({
  product,
  onAddToBasket,
}: ProductCardProps) {
  const promotionText = getPromotionText(product);

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
        <div className="flex items-center justify-between gap-3">
          <p className="text-2xl font-semibold text-zinc-900">
            {formatMoney(
              product.unitPrice.amount,
              product.unitPrice.currency
            )}
          </p>
          {promotionText ? (
            <span className="group relative inline-flex">
              <span
                tabIndex={0}
                className="cursor-help rounded-full bg-rose-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-rose-700 outline-none focus-visible:ring-2 focus-visible:ring-rose-300"
                aria-label={promotionText}
              >
                Promo
              </span>
              <span className="pointer-events-none absolute bottom-full right-0 z-10 mb-2 hidden w-max max-w-56 rounded-md bg-zinc-900 px-2 py-1 text-[11px] leading-tight text-white shadow-lg group-hover:block group-focus-within:block">
                {promotionText}
              </span>
            </span>
          ) : null}
        </div>
      </div>
      <button
        type="button"
        onClick={() => onAddToBasket(product.code)}
        className="mt-6 cursor-pointer rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-800"
      >
        Add to basket
      </button>
    </article>
  );
}
