import type { Money } from "../shared";

export const PRODUCT_CODES = {
  RED: "R01",
  GREEN: "G01",
  BLUE: "B01",
} as const;

export type ProductCode =
  (typeof PRODUCT_CODES)[keyof typeof PRODUCT_CODES];

export type Product = {
  code: ProductCode;
  name: string;
  unitPrice: Money;
};
