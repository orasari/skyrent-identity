import { SelfieCapture, getIdentityData } from '@skyrent/identity-sdk';
import { lazy, useMemo, useState } from 'react';
import { Button } from '../components/Button';
import { Layout } from '../components/Layout';
import { RentalSummaryCard } from '../components/RentalSummaryCard';
import { StepSection } from '../components/StepSection';
import type { VerificationFlowPageProps, VerificationStep } from '../types/verification';

const PhoneInput = lazy(() =>
  import('@skyrent/identity-sdk').then((module) => ({
    default: module.PhoneInput,
  }))
);

const AddressForm = lazy(() =>
  import('@skyrent/identity-sdk').then((module) => ({
    default: module.AddressForm,
  }))
);

export function VerificationFlowPage({
  selectedDrone,
  drones,
  cartItems,
  phone,
  onPhoneChange,
  phoneError,
  onPhoneError,
  address,
  onAddressChange,
  addressErrors,
  onAddressErrors,
  selfie,
  onSelfieCapture,
  onUpdateCartDays,
  onRemoveFromCart,
  onBack,
  onContinue,
}: VerificationFlowPageProps) {
  const hasAddressErrors = Boolean(addressErrors && Object.values(addressErrors).some(Boolean));
  const initialStep = useMemo<VerificationStep>(() => {
    if (selfie) {
      return phone && !phoneError ? 'address' : 'phone';
    }
    return 'selfie';
  }, [phone, phoneError, selfie]);
  const [step, setStep] = useState<VerificationStep>(initialStep);

  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);
  const canContinueFromSelfie = Boolean(selfie);
  const canContinueFromPhone = Boolean(phone && !phoneError);
  const canContinueFromAddress = Boolean(!hasAddressErrors);

  return (
    <Layout
      left={
        <div className="bg-white rounded-lg shadow-md p-6 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                Step 2 of 4
              </p>
              <h2 className="text-2xl font-semibold">Verification Flow</h2>
              <p className="text-gray-600">
                {selectedDrone
                  ? `Confirm identity details for ${selectedDrone.name}.`
                  : 'Confirm identity details before checkout.'}
              </p>
            </div>
            <Button label="← Back" onClick={onBack} />
          </div>

          <div className="grid gap-8">
            {step === 'selfie' && (
              <StepSection
                stepLabel="Step 1"
                title="Selfie Capture"
                description="Take a quick selfie to verify identity."
              >
                <SelfieCapture onCapture={onSelfieCapture} onCancel={() => onSelfieCapture(null)} />
                <div className="mt-3 text-xs text-gray-500">
                  {selfie ? 'Selfie captured.' : 'No selfie captured yet.'}
                </div>
              </StepSection>
            )}

            {step === 'phone' && (
              <StepSection
                stepLabel="Step 2"
                title="Phone Verification"
                description="We’ll normalize your phone number."
                fallback={<p className="text-sm text-gray-500">Loading phone input...</p>}
              >
                <PhoneInput value={phone} onChange={onPhoneChange} onError={onPhoneError} />
                {phoneError && <p className="mt-2 text-xs text-red-600">{phoneError}</p>}
              </StepSection>
            )}

            {step === 'address' && (
              <StepSection
                stepLabel="Step 3"
                title="Address Details"
                description="Required fields are marked with *."
                fallback={<p className="text-sm text-gray-500">Loading address form...</p>}
              >
                <AddressForm value={address} onChange={onAddressChange} onError={onAddressErrors} />
                {hasAddressErrors && (
                  <p className="mt-2 text-xs text-red-600">Complete required fields.</p>
                )}
                {verificationError && (
                  <p className="mt-2 text-xs text-red-600" role="alert">
                    {verificationError}
                  </p>
                )}
              </StepSection>
            )}
          </div>

          <div className="flex items-center justify-end gap-3">
            {step === 'selfie' && (
              <button
                type="button"
                onClick={() => setStep('phone')}
                disabled={!canContinueFromSelfie}
                className={`rounded-lg px-4 py-2 text-sm font-semibold text-white transition ${
                  canContinueFromSelfie
                    ? 'bg-emerald-600 hover:bg-emerald-700'
                    : 'cursor-not-allowed bg-gray-300'
                }`}
              >
                Continue to Phone
              </button>
            )}

            {step === 'phone' && (
              <button
                type="button"
                onClick={() => setStep('address')}
                disabled={!canContinueFromPhone}
                className={`rounded-lg px-4 py-2 text-sm font-semibold text-white transition ${
                  canContinueFromPhone
                    ? 'bg-emerald-600 hover:bg-emerald-700'
                    : 'cursor-not-allowed bg-gray-300'
                }`}
              >
                Continue to Address
              </button>
            )}

            {step === 'address' && (
              <button
                type="button"
                onClick={async () => {
                  if (!selfie) {
                    return;
                  }
                  setIsVerifying(true);
                  setVerificationError(null);
                  try {
                    const result = await getIdentityData({
                      selfieUrl: selfie,
                      phone,
                      address,
                    });
                    onContinue(result);
                  } catch (error) {
                    setVerificationError(
                      error instanceof Error
                        ? error.message
                        : 'Verification failed. Please try again.'
                    );
                  } finally {
                    setIsVerifying(false);
                  }
                }}
                disabled={!canContinueFromAddress || isVerifying}
                className={`rounded-lg px-4 py-2 text-sm font-semibold text-white transition ${
                  canContinueFromAddress && !isVerifying
                    ? 'bg-emerald-600 hover:bg-emerald-700'
                    : 'cursor-not-allowed bg-gray-300'
                }`}
              >
                {isVerifying ? 'Running Verification...' : 'Continue to Verification Result'}
              </button>
            )}
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
