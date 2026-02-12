import type { CartLine } from '../../utils/cart';
import { formatCurrency, formatDailyPrice } from '../../utils/formatters';

interface CartSummaryPanelProps {
  cartSummary: CartLine[];
  cartTotal: number;
}

export function CartSummaryPanel({ cartSummary, cartTotal }: CartSummaryPanelProps) {
  return (
    <div className="rounded-xl border border-gray-200 p-5">
      <h3 className="text-lg font-semibold text-gray-900">Cart Summary</h3>
      {cartSummary.length > 0 ? (
        <div className="mt-3 space-y-4 text-sm text-gray-700">
          {cartSummary.map((item) => (
            <div
              key={item.droneId}
              className="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0"
            >
              <div className="flex items-center justify-between">
                <div className="font-semibold text-gray-900">{item.drone.name}</div>
                <div className="text-gray-600">{formatCurrency(item.total)}</div>
              </div>
              <div className="text-gray-600">
                {item.days} day{item.days === 1 ? '' : 's'} ·{' '}
                {formatDailyPrice(item.drone.dailyPrice)}
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between border-t border-gray-100 pt-3 font-semibold text-gray-900">
            <span>Total</span>
            <span>{formatCurrency(cartTotal)}</span>
          </div>
        </div>
      ) : (
        <p className="mt-3 text-sm text-gray-500">No drones selected.</p>
      )}
    </div>
  );
}
