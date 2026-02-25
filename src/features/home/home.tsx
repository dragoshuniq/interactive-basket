import { BasketSummary, Layout, ProductGrid } from "./components";
import {
  PRODUCTS,
  type Product,
  type ProductCode,
} from "@constants";

const products: Product[] = Object.values(PRODUCTS);

export function Home() {
  const onAddToBasket = (productCode: ProductCode): void => {
    void productCode;
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
        <BasketSummary title="Basket" />
      </div>
    </Layout>
  );
}
