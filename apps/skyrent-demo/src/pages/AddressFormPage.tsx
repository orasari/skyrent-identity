import { useState } from 'react';
import { AddressForm } from '@skyrent/identity-sdk';
import type { AddressField, AddressValue } from '@skyrent/identity-sdk';
import { Button } from '../components/Button';

interface AddressFormPageProps {
  onBack: () => void;
}

const INITIAL_ADDRESS: AddressValue = {
  line1: '',
  line2: '',
  city: '',
  region: '',
  postalCode: '',
  country: 'US',
};

export function AddressFormPage({ onBack }: AddressFormPageProps) {
  const [address, setAddress] = useState<AddressValue>(INITIAL_ADDRESS);
  const [errors, setErrors] = useState<Partial<Record<AddressField, string>> | null>(null);

  const hasErrors = Boolean(errors && Object.values(errors).some(Boolean));

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Address Form Component</h2>
          <p className="text-gray-600">Collect address details with simple validation</p>
        </div>
        <Button label="← Back" onClick={onBack} />
      </div>

      <div className="space-y-6">
        <AddressForm value={address} onChange={setAddress} onError={setErrors} />
        {hasErrors && <p className="text-xs text-red-600">Complete required fields.</p>}
      </div>
    </div>
  );
}
