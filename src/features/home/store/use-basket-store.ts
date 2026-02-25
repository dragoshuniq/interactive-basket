import {
  DELIVERY_RULES,
  OFFERS,
  PRODUCTS,
  type ProductCode,
} from "@constants";
import { create } from "zustand";
import {
  createBasketEngine,
  type BasketItemsByCode,
  type BasketSummary,
} from "@features/home/services";

type BasketStore = {
  itemsByCode: BasketItemsByCode;
  add: (productCode: ProductCode) => void;
  decrease: (productCode: ProductCode) => void;
  remove: (productCode: ProductCode) => void;
  summary: BasketSummary;
};

const basketEngine = createBasketEngine({
  products: PRODUCTS,
  deliveryRules: DELIVERY_RULES,
  offers: OFFERS,
});

const initialItems: BasketItemsByCode = {};

export const useBasketStore = create<BasketStore>((set) => ({
  itemsByCode: initialItems,
  add: (productCode) =>
    set((state) => {
      const itemsByCode = basketEngine.add(
        state.itemsByCode,
        productCode,
      );

      return {
        itemsByCode,
        summary: basketEngine.summary(itemsByCode),
      };
    }),
  decrease: (productCode) =>
    set((state) => {
      const itemsByCode = basketEngine.decrease(
        state.itemsByCode,
        productCode,
      );

      return {
        itemsByCode,
        summary: basketEngine.summary(itemsByCode),
      };
    }),
  remove: (productCode) =>
    set((state) => {
      const itemsByCode = basketEngine.remove(
        state.itemsByCode,
        productCode,
      );

      return {
        itemsByCode,
        summary: basketEngine.summary(itemsByCode),
      };
    }),
  summary: basketEngine.summary(initialItems),
}));
