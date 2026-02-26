import type { CurrencyCode } from "@constants";

export function formatMoney(
  amount: number,
  currency: CurrencyCode = "USD"
): string {
  const truncated = Math.floor(amount * 100) / 100;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(truncated);
}
