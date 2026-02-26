import {
  DELIVERY_RULES,
  OFFERS,
  PRODUCTS,
  type ProductCode,
} from "@constants";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
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

type PersistedBasketState = {
  itemsByCode: BasketItemsByCode;
};

const basketEngine = createBasketEngine({
  products: PRODUCTS,
  deliveryRules: DELIVERY_RULES,
  offers: OFFERS,
});

const initialItems: BasketItemsByCode = {};

function buildBasketState(itemsByCode: BasketItemsByCode) {
  return {
    itemsByCode,
    summary: basketEngine.summary(itemsByCode),
  };
}

export const useBasketStore = create<BasketStore>()(
  persist(
    (set) => ({
      ...buildBasketState(initialItems),
      add: (productCode) =>
        set((state) =>
          buildBasketState(
            basketEngine.add(state.itemsByCode, productCode),
          ),
        ),
      decrease: (productCode) =>
        set((state) =>
          buildBasketState(
            basketEngine.decrease(
              state.itemsByCode,
              productCode,
            ),
          ),
        ),
      remove: (productCode) =>
        set((state) =>
          buildBasketState(
            basketEngine.remove(state.itemsByCode, productCode),
          ),
        ),
    }),
    {
      name: "interactive-basket",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (state): PersistedBasketState => ({
        itemsByCode: state.itemsByCode,
      }),
      merge: (persistedState, currentState) => {
        const persistedItems =
          (persistedState as PersistedBasketState | undefined)
            ?.itemsByCode ?? currentState.itemsByCode;

        return {
          ...currentState,
          ...buildBasketState(persistedItems),
        };
      },
    },
  ),
);
