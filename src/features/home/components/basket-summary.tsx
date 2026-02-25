import type { ProductCode } from "@constants";
import type { BasketSummary as BasketSummaryData } from "@features/home/services";
import { formatMoney } from "@features/home/utils";
import { QuantityControls } from "./quantity-controls";

export type BasketSummaryProps = {
  title: string;
  summary: BasketSummaryData;
  onIncrease: (productCode: ProductCode) => void;
  onDecrease: (productCode: ProductCode) => void;
  onRemove: (productCode: ProductCode) => void;
};

export function BasketSummary({
  title,
  summary,
  onIncrease,
  onDecrease,
  onRemove,
}: BasketSummaryProps) {
  const lineItemsLabel =
    summary.itemCount === 1 ? "1 item" : `${summary.itemCount} items`;

  return (
    <aside className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="space-y-3">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-950">
          {title}
        </h2>
        <p className="text-base text-zinc-700">{lineItemsLabel}</p>
      </div>
      {summary.lines.length > 0 ? (
        <ul className="mt-5 space-y-2 border-t border-zinc-200 pt-4">
          {summary.lines.map((line) => (
            <li
              key={line.productCode}
              className="rounded-lg border border-zinc-200 p-3"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0 flex-1">
                  <p className="text-base font-semibold text-zinc-900">
                    {line.name}
                  </p>
                  <p className="text-sm text-zinc-600">
                    {formatMoney(
                      line.lineSubtotal,
                      summary.currency,
                    )}
                  </p>
                </div>
                <QuantityControls
                  quantity={line.quantity}
                  onIncrease={() => onIncrease(line.productCode)}
                  onDecrease={() => onDecrease(line.productCode)}
                  onRemove={() => onRemove(line.productCode)}
                />
              </div>
            </li>
          ))}
        </ul>
      ) : null}
      <div className="mt-6 border-t border-zinc-200 pt-4">
        <div className="flex items-center justify-between text-sm text-zinc-600">
          <span>Subtotal</span>
          <span>
            {formatMoney(summary.subtotal, summary.currency)}
          </span>
        </div>
        {summary.discount > 0 ? (
          <div className="mt-2 flex items-center justify-between text-sm text-zinc-600">
            <span>Discount</span>
            <span>
              -{formatMoney(summary.discount, summary.currency)}
            </span>
          </div>
        ) : null}
        <div className="mt-2 flex items-center justify-between text-sm text-zinc-600">
          <span>Delivery</span>
          <span>
            {formatMoney(summary.delivery, summary.currency)}
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between text-base font-semibold text-zinc-900">
          <span>Total</span>
          <span>{formatMoney(summary.total, summary.currency)}</span>
        </div>
        {summary.saved > 0 ? (
          <div className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            You saved{" "}
            {formatMoney(summary.saved, summary.currency)}
          </div>
        ) : null}
      </div>
    </aside>
  );
}
