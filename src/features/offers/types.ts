import type { ProductCode } from "../products";

export const OfferType = {
  Discount: "Discount",
} as const;

export type OfferType = (typeof OfferType)[keyof typeof OfferType];

export type Discount = {
  type: typeof OfferType.Discount;
  productCode: ProductCode;
  buyQuantity: number;
  getQuantity: number;
  discountRate: number;
};

export type Offer = Discount;
