import { DEFAULT_CURRENCY } from "@constants/shared";
import {
  PRODUCT_CODES,
  type Product,
  type ProductCode,
} from "./types";

export const PRODUCTS = {
  [PRODUCT_CODES.RED]: {
    code: PRODUCT_CODES.RED,
    name: "Red Widget",
    unitPrice: {
      amount: 32.95,
      currency: DEFAULT_CURRENCY,
    },
  },
  [PRODUCT_CODES.GREEN]: {
    code: PRODUCT_CODES.GREEN,
    name: "Green Widget",
    unitPrice: {
      amount: 24.95,
      currency: DEFAULT_CURRENCY,
    },
  },
  [PRODUCT_CODES.BLUE]: {
    code: PRODUCT_CODES.BLUE,
    name: "Blue Widget",
    unitPrice: {
      amount: 7.95,
      currency: DEFAULT_CURRENCY,
    },
  },
} satisfies Record<ProductCode, Product>;
