import type { CurrencyCode } from "../shared";

export type DeliveryRule = {
  value: number;
  fee: number;
  currency: CurrencyCode;
};
