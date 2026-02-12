// @vitest-environment jsdom
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useState } from 'react';
import type { AddressField, AddressValue, IdentityData } from '@skyrent/identity-sdk';
import { VerificationFlowPage } from '../VerificationFlowPage';

const mockResult: IdentityData = {
  selfieUrl: 'data:image/jpeg;base64,abc',
  phone: '+14155552671',
  address: {
    street: '123 Main St',
    city: 'San Francisco',
    state: 'CA',
    country: 'US',
    postalCode: '94102',
  },
  score: 85,
  status: 'verified',
};

// Hoisted mock avoids Vitest's factory hoisting issues when mocking ESM modules.
const getIdentityDataMock = vi.hoisted(() => vi.fn());

// Mock the SDK boundary so the test focuses on page flow + integration points.
vi.mock('@skyrent/identity-sdk', () => ({
  getIdentityData: getIdentityDataMock,
  // Replace SDK components with simple buttons to drive the flow deterministically.
  SelfieCapture: ({ onCapture }: { onCapture: (value: string | null) => void }) => (
    <button type="button" onClick={() => onCapture('data:image/jpeg;base64,abc')}>
      Capture
    </button>
  ),
  PhoneInput: ({ onChange }: { onChange: (value: string) => void }) => (
    <button type="button" onClick={() => onChange('+14155552671')}>
      Set Phone
    </button>
  ),
  AddressForm: ({
    value,
    onChange,
  }: {
    value: AddressValue;
    onChange: (value: AddressValue) => void;
  }) => (
    <button
      type="button"
      onClick={() =>
        onChange({
          ...value,
          line1: '123 Main St',
          city: 'San Francisco',
          region: 'CA',
          postalCode: '94102',
          country: 'US',
        })
      }
    >
      Set Address
    </button>
  ),
}));

const EMPTY_ADDRESS: AddressValue = {
  line1: '',
  line2: '',
  city: '',
  region: '',
  postalCode: '',
  country: 'US',
};

// Wrapper simulates the parent state wiring used in the real app.
function Wrapper({ onContinue }: { onContinue: (result: IdentityData) => void }) {
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [address, setAddress] = useState<AddressValue>(EMPTY_ADDRESS);
  const [addressErrors, setAddressErrors] = useState<Partial<Record<AddressField, string>> | null>(
    null
  );
  const [selfie, setSelfie] = useState<string | null>(null);

  return (
    <VerificationFlowPage
      selectedDrone={null}
      drones={[]}
      cartItems={[]}
      phone={phone}
      onPhoneChange={setPhone}
      phoneError={phoneError}
      onPhoneError={setPhoneError}
      address={address}
      onAddressChange={setAddress}
      addressErrors={addressErrors}
      onAddressErrors={setAddressErrors}
      selfie={selfie}
      onSelfieCapture={setSelfie}
      onUpdateCartDays={vi.fn()}
      onRemoveFromCart={vi.fn()}
      onBack={vi.fn()}
      onContinue={onContinue}
    />
  );
}

describe('VerificationFlowPage', () => {
  it('runs verification and calls onContinue with the SDK result', async () => {
    // Provide a deterministic SDK response for this run.
    getIdentityDataMock.mockResolvedValueOnce(mockResult);
    const onContinue = vi.fn();
    render(<Wrapper onContinue={onContinue} />);

    fireEvent.click(screen.getByText('Capture'));
    fireEvent.click(screen.getByText('Continue to Phone'));

    // PhoneInput is lazy-loaded, so wait for the mocked button to appear.
    const setPhoneButton = await screen.findByText('Set Phone');
    fireEvent.click(setPhoneButton);
    fireEvent.click(screen.getByText('Continue to Address'));

    // AddressForm is lazy-loaded, so wait for the mocked button to appear.
    const setAddressButton = await screen.findByText('Set Address');
    fireEvent.click(setAddressButton);
    fireEvent.click(screen.getByText('Continue to Verification Result'));

    await waitFor(() => {
      expect(getIdentityDataMock).toHaveBeenCalled();
      expect(onContinue).toHaveBeenCalledWith(mockResult);
    });
  });
});
