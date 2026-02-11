import type { IdentityData } from '@skyrent/identity-sdk';
import { Layout } from '../components/Layout';
import { RentalSummaryCard } from '../components/RentalSummaryCard';
import type { CartItem } from '../types/cart';
import type { Drone } from '../types/drone';
import { formatAddressLine, formatCityLine } from '../utils/formatters';

interface VerificationResultPageProps {
  result: IdentityData;
  drones: Drone[];
  cartItems: CartItem[];
  onUpdateCartDays: (id: string, days: number) => void;
  onRemoveFromCart: (id: string) => void;
  onContinue: () => void;
  onRetry: () => void;
}

export function VerificationResultPage({
  result,
  drones,
  cartItems,
  onUpdateCartDays,
  onRemoveFromCart,
  onContinue,
  onRetry,
}: VerificationResultPageProps) {
  const isVerified = result.status === 'verified';

  return (
    <Layout
      left={
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                Step 3 of 4
              </p>
              <h2 className="text-2xl font-semibold">Verification Result</h2>
              <p className="text-gray-600">Review your identity verification outcome.</p>
            </div>
          </div>

          <div
            className={`rounded-xl border p-5 ${
              isVerified ? 'border-emerald-200 bg-emerald-50' : 'border-rose-200 bg-rose-50'
            }`}
            role="status"
            aria-live="polite"
          >
            <p className="text-sm font-semibold text-gray-900">
              {isVerified ? 'Verification successful' : 'Verification failed'}
            </p>
            <p className="mt-1 text-sm text-gray-600">
              Score: <span className="font-semibold text-gray-900">{result.score}</span> —{' '}
              {isVerified ? 'Eligible to continue to checkout.' : 'Please retry verification.'}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-gray-200 p-5">
              <h3 className="text-lg font-semibold text-gray-900">Captured Selfie</h3>
              <div className="mt-3">
                <img
                  src={result.selfieUrl}
                  alt="Captured selfie"
                  className="w-full rounded-lg border border-gray-200 object-cover"
                />
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 p-5">
              <h3 className="text-lg font-semibold text-gray-900">Verification Details</h3>
              <div className="mt-3 space-y-2 text-sm text-gray-700">
                <div>
                  <span className="font-semibold text-gray-900">Phone:</span> {result.phone}
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Address:</span>
                  <div className="mt-1 text-sm text-gray-700">
                    {formatAddressLine(result.address.street, '') || '—'}
                  </div>
                  <div className="text-sm text-gray-700">
                    {formatCityLine(result.address.city, result.address.state, result.address.postalCode) ||
                      '—'}
                  </div>
                  <div className="text-sm text-gray-700">{result.address.country || '—'}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3">
            <p className="sr-only" aria-live="polite">
              Continue to checkout is {isVerified ? 'enabled' : 'disabled'}.
            </p>
            {!isVerified && (
              <button
                type="button"
                onClick={onRetry}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Retry Verification
              </button>
            )}
            <button
              type="button"
              onClick={onContinue}
              disabled={!isVerified}
              className={`rounded-lg px-4 py-2 text-sm font-semibold text-white transition ${
                isVerified
                  ? 'bg-emerald-600 hover:bg-emerald-700'
                  : 'cursor-not-allowed bg-gray-300'
              }`}
            >
              Continue to Checkout
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
