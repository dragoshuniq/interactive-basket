export type BasketSummaryProps = {
  title: string;
};

export function BasketSummary({ title }: BasketSummaryProps) {
  return (
    <aside className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-zinc-900">
          {title}
        </h2>
      </div>
      <div className="mt-6 border-t border-zinc-200 pt-4">
        <div className="flex items-center justify-between text-sm text-zinc-600">
          <span>Subtotal</span>
          <span>0</span>
        </div>
        <div className="mt-2 flex items-center justify-between text-sm text-zinc-600">
          <span>Delivery</span>
          <span>0</span>
        </div>
        <div className="mt-2 flex items-center justify-between text-base font-semibold text-zinc-900">
          <span>Total</span>
          <span>0</span>
        </div>
      </div>
    </aside>
  );
}
