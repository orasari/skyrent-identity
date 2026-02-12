import type { IdentityData } from '@skyrent/identity-sdk';

interface VerificationPanelProps {
  selfie: string | null;
  phoneValue: string;
  addressLine: string;
  cityLine: string;
  countryLine: string;
  identityResult: IdentityData | null;
}

export function VerificationPanel({
  selfie,
  phoneValue,
  addressLine,
  cityLine,
  countryLine,
  identityResult,
}: VerificationPanelProps) {
  return (
    <div className="rounded-xl border border-gray-200 p-5">
      <h3 className="text-lg font-semibold text-gray-900">Verification</h3>
      <div className="mt-3 space-y-2 text-sm text-gray-700">
        <div>
          <span className="font-semibold text-gray-900">Selfie:</span>{' '}
          {selfie ? 'Captured' : 'Not captured'}
        </div>
        <div>
          <span className="font-semibold text-gray-900">Phone:</span> {phoneValue}
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
  );
}
