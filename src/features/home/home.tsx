import { BasketSummary, Layout, ProductGrid } from "./components";
import {
  PRODUCTS,
  type Product,
  type ProductCode,
} from "@constants";
import { useBasketStore } from "@features/home/store";

const products: Product[] = Object.values(PRODUCTS);

export function Home() {
  const addToBasket = useBasketStore((state) => state.add);
  const decreaseFromBasket = useBasketStore(
    (state) => state.decrease,
  );
  const removeFromBasket = useBasketStore(
    (state) => state.remove,
  );
  const summary = useBasketStore((state) => state.summary);

  const onAddToBasket = (productCode: ProductCode): void => {
    addToBasket(productCode);
  };

  const onDecreaseFromBasket = (
    productCode: ProductCode,
  ): void => {
    decreaseFromBasket(productCode);
  };

  const onRemoveFromBasket = (
    productCode: ProductCode,
  ): void => {
    removeFromBasket(productCode);
  };

  return (
    <Layout
      title="Acme Widgets"
      subtitle="Browse the full catalog and add items to your basket."
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
        <ProductGrid
          products={products}
          onAddToBasket={onAddToBasket}
        />
        <BasketSummary
          title="Basket"
          summary={summary}
          onIncrease={onAddToBasket}
          onDecrease={onDecreaseFromBasket}
          onRemove={onRemoveFromBasket}
        />
      </div>
    </Layout>
  );
}
