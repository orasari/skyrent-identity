import { useMemo } from 'react';
import type { CartItem } from '../types/cart';
import type { Drone } from '../types/drone';
import { formatCurrency, formatDailyPrice } from '../utils/formatters';

interface RentalSummaryCardProps {
  drones: Drone[];
  cartItems: CartItem[];
  onUpdateCartDays: (id: string, days: number) => void;
  onRemoveFromCart: (id: string) => void;
  controlsEnabled?: boolean;
  primaryAction?: {
    label: string;
    disabled?: boolean;
    onClick: () => void;
  };
}

export function RentalSummaryCard({
  drones,
  cartItems,
  onUpdateCartDays,
  onRemoveFromCart,
  controlsEnabled = true,
  primaryAction,
}: RentalSummaryCardProps) {
  const cartSummary = useMemo(() => {
    return cartItems.flatMap((item) => {
      const drone = drones.find((entry) => entry.id === item.droneId);
      if (!drone) {
        return [];
      }
      return [
        {
          ...item,
          drone,
          total: drone.dailyPrice * item.days,
        },
      ];
    });
  }, [cartItems, drones]);

  const cartTotal = cartSummary.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="border border-slate-200 rounded-[18px] p-5 bg-white shadow-[0_16px_32px_rgba(15,23,42,0.08)] flex flex-col gap-4.5">
      <div className="flex flex-col gap-1.5">
        <h3 className="text-[1.2rem] font-bold text-slate-900 m-0">Your rental</h3>
        <p className="text-[0.85rem] text-slate-500 m-0">Review selections and update days.</p>
      </div>
      <div className="flex flex-col gap-3.5">
        {cartSummary.length === 0 && (
          <p className="text-[0.85rem] text-slate-400">No drones selected yet.</p>
        )}
        {cartSummary.map((item) => (
          <div key={item.droneId} className="border border-slate-200 rounded-[14px] p-3 bg-slate-50 flex flex-col gap-2.5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[0.9rem] font-semibold text-slate-900 m-0">
                  {item.drone.name}
                </p>
                <p className="text-[0.75rem] text-slate-500 mt-0.5">
                  {formatDailyPrice(item.drone.dailyPrice)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onRemoveFromCart(item.droneId)}
                disabled={!controlsEnabled}
                className={`border-none bg-transparent text-[0.75rem] font-semibold ${
                  controlsEnabled
                    ? 'text-slate-400 cursor-pointer'
                    : 'text-slate-300 cursor-not-allowed'
                }`}
              >
                Remove
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[0.8rem] text-slate-600 font-semibold">Days</span>
              <div className="inline-flex items-center gap-2">
                <button
                  type="button"
                  className={`h-7 w-7 rounded-full border border-slate-200 bg-white font-bold ${
                    controlsEnabled ? 'text-slate-900' : 'text-slate-300 cursor-not-allowed'
                  }`}
                  onClick={() => onUpdateCartDays(item.droneId, item.days - 1)}
                  aria-label="Decrease rental days"
                  disabled={!controlsEnabled}
                >
                  −
                </button>
                <span className="min-w-[20px] text-center font-semibold text-slate-900">
                  {item.days}
                </span>
                <button
                  type="button"
                  className={`h-7 w-7 rounded-full border border-slate-200 bg-white font-bold ${
                    controlsEnabled ? 'text-slate-900' : 'text-slate-300 cursor-not-allowed'
                  }`}
                  onClick={() => onUpdateCartDays(item.droneId, item.days + 1)}
                  aria-label="Increase rental days"
                  disabled={!controlsEnabled}
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex justify-between text-[0.85rem] text-slate-700">
              <span className="text-slate-500">Line total</span>
              <span className="font-semibold text-slate-900">
                {formatCurrency(item.total)}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-200 pt-4 flex flex-col gap-3.5">
        <div className="flex justify-between font-bold text-slate-900">
          <span>Total</span>
          <span>{formatCurrency(cartTotal)}</span>
        </div>
        {primaryAction && (
          <button
            type="button"
            onClick={primaryAction.onClick}
            disabled={primaryAction.disabled}
            className="border-none rounded-xl px-4 py-3 text-[0.95rem] font-bold text-white bg-emerald-600 cursor-pointer disabled:bg-slate-300 disabled:cursor-not-allowed"
          >
            {primaryAction.label}
          </button>
        )}
      </div>
    </div>
  );
}
