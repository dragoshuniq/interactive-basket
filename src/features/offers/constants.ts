import { OfferType } from "./types";
import type { Offer } from "./types";
import { PRODUCT_CODES } from "../products";

export const OFFERS = [
  {
    type: OfferType.Discount,
    productCode: PRODUCT_CODES.RED,
    buyQuantity: 1,
    getQuantity: 1,
    discountRate: 0.5,
  },
] satisfies Offer[];
