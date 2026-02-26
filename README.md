# Interactive Basket

In order to install dependencies run `pnpm i`.

In order to run the app run `pnpm dev`.

# Tech Stack

- React
- TypeScript
- Vite
- Zustand (store management)
- React Router (future integration with new pages like checkout etc.)
- Tailwind CSS (styling)
- React Icons (icons)

## Assumptions

- Prices are in USD. The type system supports adding other currencies, but only USD is wired up right now.
- The "buy one get second half price" offer applies per pair — so 3 red widgets = 1 pair discounted + 1 at full price. 5 red widgets = 2 pairs discounted + 1 at full price.
- Delivery fee is calculated on the subtotal _after_ discounts are applied.
- Quantities are always whole numbers (fractional quantities get floored).
- No backend — everything runs client-side. In production you'd validate pricing server-side.

# Core logic

The core logic lives in a standalone `createBasketEngine` factory function. It receives the product catalogue, delivery rules, and active offers as configuration — making it easy to swap out pricing, add new promotions, or change delivery tiers without touching the engine itself.

The engine exposes a simple interface:

- `add(items, productCode)` — adds a product to the basket
- `decrease(items, productCode)` — decreases quantity (removes entirely when it hits zero)
- `remove(items, productCode)` — removes a product from the basket
- `total(items)` — returns the final price
- `summary(items)` — returns a full breakdown (subtotal, discount, delivery, total, per-line details)

All operations are immutable — they return new state instead of mutating the existing one.

### Offer Calculation

In order to integrate promotions, like "buy one get one half price" , I implemented as a generic discount type: `buyQuantity + getQuantity` grouping with a configurable `discountRate`. So if we ever need "buy 2 get 1 free" or a different percentage, it's just a config change.

### Delivery Rules

Delivery fees are threshold-based. Rules are sorted by value and the engine picks the first matching tier. A fallback rule with `value <= 0` handles the "free delivery" case for orders above all thresholds.

### State Management — Zustand

I went with Zustand over Redux or Context. It's easy to instal and easy to use on small projects. In order to persist the data after refresh, I've used the `persist` middleware, which has integration with localStorage.

### Currency Formatting

Prices are formatted with `Intl.NumberFormat` built-in browser API, I've used it with `en-US` locale and `USD` currency. This helper function can achieve as params any currency and locale, so it can be reusable on other components. In order to meet the requirements of the task, I've made a workaround to always show 2 decimal places, rounded down, since for the case of R01 + R01 in the basket, the price was $54.38 (rounded from $54.375 up by the Intl.NumberFormat API).
