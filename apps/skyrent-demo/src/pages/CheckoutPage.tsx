import type { AddressValue, IdentityData } from '@skyrent/identity-sdk';
import { useState } from 'react';
import { Button } from '../components/Button';
import { Layout } from '../components/Layout';
import { RentalSummaryCard } from '../components/RentalSummaryCard';
import type { CartItem } from '../types/cart';
import type { Drone } from '../types/drone';
import {
  formatAddressLine,
  formatCityLine,
  formatCurrency,
  formatDailyPrice,
} from '../utils/formatters';
import { buildCartSummary, calculateCartTotal } from '../utils/cart';
interface CheckoutPageProps {
  drones: Drone[];
  cartItems: CartItem[];
  phone: string;
  address: AddressValue;
  selfie: string | null;
  identityResult: IdentityData | null;
  onUpdateCartDays: (id: string, days: number) => void;
  onRemoveFromCart: (id: string) => void;
  onBack: () => void;
  onStartOver: () => void;
}

export function CheckoutPage({
  drones,
  cartItems,
  phone,
  address,
  selfie,
  identityResult,
  onUpdateCartDays,
  onRemoveFromCart,
  onBack,
  onStartOver,
}: CheckoutPageProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const cartSummary = buildCartSummary(cartItems, drones);
  const cartTotal = calculateCartTotal(cartSummary);
  const isVerified = identityResult?.status === 'verified';

  const verifiedAddress = identityResult?.address;
  const addressLine = verifiedAddress
    ? formatAddressLine(verifiedAddress.street, '')
    : formatAddressLine(address.line1, address.line2);
  const cityLine = verifiedAddress
    ? formatCityLine(verifiedAddress.city, verifiedAddress.state, verifiedAddress.postalCode)
    : formatCityLine(address.city, address.region, address.postalCode);
  const countryLine = verifiedAddress?.country ?? address.country;

  return (
    <Layout
      left={
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                Step 4 of 4
              </p>
              <h2 className="text-2xl font-semibold">Checkout</h2>
              <p className="text-gray-600">Review your rental details.</p>
            </div>
            <Button label="← Back" onClick={onBack} />
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
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

            <div className="rounded-xl border border-gray-200 p-5">
              <h3 className="text-lg font-semibold text-gray-900">Verification</h3>
              <div className="mt-3 space-y-2 text-sm text-gray-700">
                <div>
                  <span className="font-semibold text-gray-900">Selfie:</span>{' '}
                  {selfie ? 'Captured' : 'Not captured'}
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Phone:</span>{' '}
                  {identityResult?.phone || phone || 'Not provided'}
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Address:</span>
                  <div className="mt-1 text-sm text-gray-700">{addressLine || '—'}</div>
                  <div className="text-sm text-gray-700">{cityLine || '—'}</div>
                  <div className="text-sm text-gray-700">{countryLine || '—'}</div>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Status:</span>{' '}
                  {identityResult ? (
                    <span
                      className={
                        identityResult.status === 'verified' ? 'text-emerald-700' : 'text-rose-600'
                      }
                    >
                      {identityResult.status} (score {identityResult.score})
                    </span>
                  ) : (
                    'Not verified'
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 p-5">
              <h3 className="text-lg font-semibold text-gray-900">Complete Rental</h3>
              <p className="mt-2 text-sm text-gray-600">
                Review the details and complete the rental to lock in your drone.
              </p>
              {showConfirmation && (
                <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                  Rental confirmed. You will receive a confirmation email shortly.
                </div>
              )}
              <button
                type="button"
                onClick={() => setShowConfirmation(true)}
                disabled={!isVerified}
                className={`mt-4 w-full rounded-lg px-4 py-2 text-sm font-semibold text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                  isVerified
                    ? 'bg-emerald-700 hover:bg-emerald-800'
                    : 'cursor-not-allowed bg-gray-300'
                }`}
              >
                Complete Rental
              </button>
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
          controlsEnabled={false}
        />
      }
    />
  );
}
