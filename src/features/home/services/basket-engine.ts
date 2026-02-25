import type {
  CurrencyCode,
  DeliveryRule,
  Offer,
  Product,
  ProductCode,
} from "@constants";

export type BasketItemsByCode = Partial<
  Record<ProductCode, number>
>;

export type BasketLine = {
  productCode: ProductCode;
  name: string;
  quantity: number;
  unitPrice: number;
  lineSubtotal: number;
};

export type BasketSummary = {
  itemCount: number;
  subtotal: number;
  discount: number;
  delivery: number;
  total: number;
  saved: number;
  currency: CurrencyCode;
  lines: BasketLine[];
};

export type BasketEngineConfig = {
  products: Record<ProductCode, Product>;
  deliveryRules: DeliveryRule[];
  offers: Offer[];
};

export type BasketEngine = {
  add: (
    items: BasketItemsByCode,
    productCode: ProductCode,
  ) => BasketItemsByCode;
  decrease: (
    items: BasketItemsByCode,
    productCode: ProductCode,
  ) => BasketItemsByCode;
  remove: (
    items: BasketItemsByCode,
    productCode: ProductCode,
  ) => BasketItemsByCode;
  total: (items: BasketItemsByCode) => number;
  summary: (items: BasketItemsByCode) => BasketSummary;
};

function normalizeItems(
  items: BasketItemsByCode,
): BasketItemsByCode {
  const normalized: BasketItemsByCode = {};

  for (const code of Object.keys(items) as ProductCode[]) {
    const quantity = items[code];

    if (!quantity || quantity <= 0) {
      continue;
    }

    normalized[code] = Math.floor(quantity);
  }

  return normalized;
}

function getDiscountForOffer(
  items: BasketItemsByCode,
  products: Record<ProductCode, Product>,
  offer: Offer,
): number {
  const quantity = items[offer.productCode] ?? 0;

  if (quantity <= 0) {
    return 0;
  }

  const groupSize = offer.buyQuantity + offer.getQuantity;

  if (groupSize <= 0) {
    return 0;
  }

  const fullGroups = Math.floor(quantity / groupSize);
  const remaining = quantity % groupSize;
  const discountedInRemaining = Math.max(
    0,
    Math.min(offer.getQuantity, remaining - offer.buyQuantity),
  );
  const discountedUnits =
    fullGroups * offer.getQuantity + discountedInRemaining;
  const unitPrice = products[offer.productCode].unitPrice.amount;

  return discountedUnits * unitPrice * offer.discountRate;
}

function getDeliveryFee(
  deliveryRules: DeliveryRule[],
  subtotalAfterDiscount: number,
  itemCount: number,
): number {
  if (itemCount === 0) {
    return 0;
  }

  const positiveRules = deliveryRules
    .filter((rule) => rule.value > 0)
    .sort((a, b) => a.value - b.value);
  const matchedRule = positiveRules.find(
    (rule) => subtotalAfterDiscount < rule.value,
  );

  if (matchedRule) {
    return matchedRule.fee;
  }

  const fallbackRule =
    deliveryRules.find((rule) => rule.value <= 0) ?? null;

  if (!fallbackRule) {
    return 0;
  }

  return fallbackRule.fee;
}

export function createBasketEngine({
  products,
  deliveryRules,
  offers,
}: BasketEngineConfig): BasketEngine {
  const currency =
    Object.values(products)[0]?.unitPrice.currency ?? "USD";

  const summary = (items: BasketItemsByCode): BasketSummary => {
    const normalizedItems = normalizeItems(items);
    const lines: BasketLine[] = [];

    for (const code of Object.keys(normalizedItems) as ProductCode[]) {
      const quantity = normalizedItems[code] ?? 0;
      const product = products[code];

      if (!product || quantity <= 0) {
        continue;
      }

      lines.push({
        productCode: code,
        name: product.name,
        quantity,
        unitPrice: product.unitPrice.amount,
        lineSubtotal: product.unitPrice.amount * quantity,
      });
    }

    const itemCount = lines.reduce(
      (total, line) => total + line.quantity,
      0,
    );
    const subtotal = lines.reduce(
      (total, line) => total + line.lineSubtotal,
      0,
    );
    const discount = offers.reduce(
      (total, offer) =>
        total +
        getDiscountForOffer(normalizedItems, products, offer),
      0,
    );
    const subtotalAfterDiscount = Math.max(0, subtotal - discount);
    const delivery = getDeliveryFee(
      deliveryRules,
      subtotalAfterDiscount,
      itemCount,
    );
    const total = subtotalAfterDiscount + delivery;
    const saved = discount;

    return {
      itemCount,
      subtotal,
      discount,
      delivery,
      total,
      saved,
      currency,
      lines,
    };
  };

  return {
    add: (items, productCode) => {
      const currentQuantity = items[productCode] ?? 0;

      return {
        ...items,
        [productCode]: currentQuantity + 1,
      };
    },
    decrease: (items, productCode) => {
      const currentQuantity = items[productCode] ?? 0;

      if (currentQuantity <= 1) {
        const nextItems = { ...items };

        delete nextItems[productCode];

        return nextItems;
      }

      return {
        ...items,
        [productCode]: currentQuantity - 1,
      };
    },
    remove: (items, productCode) => {
      const nextItems = { ...items };

      delete nextItems[productCode];

      return nextItems;
    },
    total: (items) => summary(items).total,
    summary,
  };
}
