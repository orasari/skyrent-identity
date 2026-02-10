import type { AddressValue } from '@skyrent/identity-sdk';
import { Button } from '../components/Button';
import { Layout } from '../components/Layout';
import { RentalSummaryCard } from '../components/RentalSummaryCard';
import type { CartItem } from '../types/cart';
import type { Drone } from '../types/drone';
import { formatAddressLine, formatCityLine } from '../utils/formatters';

interface CheckoutPageProps {
  selectedDrone: Drone | null;
  drones: Drone[];
  cartItems: CartItem[];
  phone: string;
  address: AddressValue;
  selfie: string | null;
  onUpdateCartDays: (id: string, days: number) => void;
  onRemoveFromCart: (id: string) => void;
  onBack: () => void;
  onStartOver: () => void;
}

export function CheckoutPage({
  selectedDrone,
  drones,
  cartItems,
  phone,
  address,
  selfie,
  onUpdateCartDays,
  onRemoveFromCart,
  onBack,
  onStartOver,
}: CheckoutPageProps) {
  return (
    <Layout
      left={
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                Step 4 of 4
              </p>
              <h2 className="text-2xl font-semibold">Checkout</h2>
              <p className="text-gray-600">Review your rental details.</p>
            </div>
            <Button label="← Back" onClick={onBack} />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-gray-200 p-5">
              <h3 className="text-lg font-semibold text-gray-900">Drone Selection</h3>
              {selectedDrone ? (
                <div className="mt-3 space-y-1 text-sm text-gray-700">
                  <div className="flex items-center gap-2 text-base font-semibold text-gray-900">
                    {selectedDrone.icon && (
                      <span className="text-xs font-semibold text-gray-500">
                        {selectedDrone.icon}
                      </span>
                    )}
                    {selectedDrone.name}
                  </div>
                  <div>{selectedDrone.description}</div>
                  <div>Range: {selectedDrone.rangeMiles} miles</div>
                  <div>Top speed: {selectedDrone.maxSpeedMph} mph</div>
                  <div className="font-semibold text-gray-900">
                    ${selectedDrone.dailyPrice}/day
                  </div>
                </div>
              ) : (
                <p className="mt-3 text-sm text-gray-500">No drone selected.</p>
              )}
            </div>

            <div className="rounded-xl border border-gray-200 p-5">
              <h3 className="text-lg font-semibold text-gray-900">Verification</h3>
              <div className="mt-3 space-y-2 text-sm text-gray-700">
                <div>
                  <span className="font-semibold text-gray-900">Selfie:</span>{' '}
                  {selfie ? 'Captured' : 'Not captured'}
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Phone:</span>{' '}
                  {phone || 'Not provided'}
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Address:</span>
                  <div className="mt-1 text-sm text-gray-700">
                    {formatAddressLine(address.line1, address.line2) || '—'}
                  </div>
                  <div className="text-sm text-gray-700">
                    {formatCityLine(address.city, address.region, address.postalCode) || '—'}
                  </div>
                  <div className="text-sm text-gray-700">{address.country || '—'}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onStartOver}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Start Over
            </button>
          </div>
        </div>
      }
      right={
        <RentalSummaryCard
          drones={drones}
          cartItems={cartItems}
          onUpdateCartDays={onUpdateCartDays}
          onRemoveFromCart={onRemoveFromCart}
        />
      }
    />
  );
}
