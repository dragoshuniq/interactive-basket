import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";

export type QuantityControlsProps = {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
};

export function QuantityControls({
  quantity,
  onIncrease,
  onDecrease,
  onRemove,
}: QuantityControlsProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="inline-flex items-center overflow-hidden rounded-lg border border-zinc-300 bg-white">
        <button
          type="button"
          onClick={onDecrease}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-l-lg text-zinc-700 transition hover:bg-zinc-100"
          aria-label="Decrease quantity"
        >
          <FiMinus className="h-4 w-4" />
        </button>
        <span className="min-w-8 px-2 text-center text-sm font-medium text-zinc-900">
          {quantity}
        </span>
        <button
          type="button"
          onClick={onIncrease}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-r-lg text-zinc-700 transition hover:bg-zinc-100"
          aria-label="Increase quantity"
        >
          <FiPlus className="h-4 w-4" />
        </button>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-red-600 transition hover:bg-red-50 hover:text-red-700"
        aria-label="Remove item"
      >
        <FiTrash2 className="h-4 w-4" />
      </button>
    </div>
  );
}
