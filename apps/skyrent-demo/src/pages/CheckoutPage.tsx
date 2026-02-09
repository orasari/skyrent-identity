import type { AddressValue } from '@skyrent/identity-sdk';
import { Button } from '../components/Button';
import type { Drone } from '../types/drone';

interface CheckoutPageProps {
  selectedDrone: Drone | null;
  phone: string;
  address: AddressValue;
  selfie: string | null;
  onBack: () => void;
  onStartOver: () => void;
}

const formatAddressLine = (address: AddressValue) =>
  [address.line1, address.line2].filter(Boolean).join(', ');

const formatCityLine = (address: AddressValue) =>
  [address.city, address.region, address.postalCode].filter(Boolean).join(', ');

export function CheckoutPage({
  selectedDrone,
  phone,
  address,
  selfie,
  onBack,
  onStartOver,
}: CheckoutPageProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
            Step 3 of 3
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
                <span className="text-xl">{selectedDrone.icon}</span>
                {selectedDrone.name}
              </div>
              <div>{selectedDrone.description}</div>
              <div>Range: {selectedDrone.rangeMiles} miles</div>
              <div>Top speed: {selectedDrone.maxSpeedMph} mph</div>
              <div className="font-semibold text-gray-900">
                ${selectedDrone.pricePerHour}/hr
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
                {formatAddressLine(address) || '—'}
              </div>
              <div className="text-sm text-gray-700">{formatCityLine(address) || '—'}</div>
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
  );
}
