interface CompleteRentalPanelProps {
  showConfirmation: boolean;
  isVerified: boolean;
  onComplete: () => void;
}

export function CompleteRentalPanel({
  showConfirmation,
  isVerified,
  onComplete,
}: CompleteRentalPanelProps) {
  return (
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
        onClick={onComplete}
        disabled={!isVerified}
        className={`mt-4 w-full rounded-lg px-4 py-2 text-sm font-semibold text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
          isVerified ? 'bg-emerald-700 hover:bg-emerald-800' : 'cursor-not-allowed bg-gray-300'
        }`}
      >
        Complete Rental
      </button>
    </div>
  );
}
