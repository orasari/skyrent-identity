import { useState } from 'react';
import { PhoneInput } from '@skyrent/identity-sdk';
import { Button } from '../components/Button';

interface PhoneInputPageProps {
  onBack: () => void;
}

export function PhoneInputPage({ onBack }: PhoneInputPageProps) {
  const [phone, setPhone] = useState('');
  const [_error, setError] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Phone Input Component</h2>
          <p className="text-gray-600">Collect and normalize phone numbers</p>
        </div>
        <Button label="← Back" onClick={onBack} />
      </div>

      <div>
        <PhoneInput
          value={phone}
          onChange={setPhone}
          onError={(message) => setError(message)}
          defaultCountry="US"
        />
      </div>
    </div>
  );
}
