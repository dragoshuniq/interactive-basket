import type { CurrencyCode } from "@constants";

export function formatMoney(
  amount: number,
  currency: CurrencyCode = "USD"
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
