import type { CurrencyCode } from "@constants/shared";

export type DeliveryRule = {
  value: number;
  fee: number;
  currency: CurrencyCode;
};
