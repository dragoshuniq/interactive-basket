import { DEFAULT_CURRENCY } from "../shared";
import type { DeliveryRule } from "./types";

export const DELIVERY_RULES = [
  {
    value: 50,
    fee: 4.95,
    currency: DEFAULT_CURRENCY,
  },
  {
    value: 90,
    fee: 2.95,
    currency: DEFAULT_CURRENCY,
  },
  {
    value: 0,
    fee: 0,
    currency: DEFAULT_CURRENCY,
  },
] satisfies DeliveryRule[];
