import React, { useEffect, useMemo, useState } from 'react';
import { COUNTRIES } from './countries';
import type { CountryOption, PhoneInputProps } from './types';

const MIN_DIGITS = 7;
const MAX_DIGITS = 15;

const normalizeDigits = (value: string) => value.replace(/\D/g, '');

const buildE164 = (dialCode: string, nationalNumber: string) =>
  `+${dialCode}${nationalNumber}`;

export const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  onError,
  defaultCountry = 'US',
  className,
  disabled = false,
}) => {
  const [country, setCountry] = useState<CountryOption>(() => {
    return COUNTRIES.find((c) => c.code === defaultCountry) ?? COUNTRIES[0];
  });
  const [localNumber, setLocalNumber] = useState('');
  const [error, setError] = useState<string | null>(null);

  const dialCode = country.dialCode;

  const parsedLocalNumber = useMemo(() => normalizeDigits(localNumber), [localNumber]);

  useEffect(() => {
    const normalized = normalizeDigits(value);
    if (!normalized) {
      setLocalNumber('');
      return;
    }

    if (value.startsWith(`+${dialCode}`)) {
      setLocalNumber(value.replace(`+${dialCode}`, ''));
    }
  }, [value, dialCode]);

  useEffect(() => {
    if (!parsedLocalNumber) {
      setError(null);
      return;
    }

    if (parsedLocalNumber.length < MIN_DIGITS) {
      setError(`Phone number must be at least ${MIN_DIGITS} digits.`);
      return;
    }

    if (parsedLocalNumber.length > MAX_DIGITS) {
      setError(`Phone number must be at most ${MAX_DIGITS} digits.`);
      return;
    }

    setError(null);
  }, [parsedLocalNumber]);

  useEffect(() => {
    if (error && onError) {
      onError(error);
    }
  }, [error, onError]);

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = COUNTRIES.find((c) => c.code === event.target.value);
    if (selected) {
      setCountry(selected);
      if (parsedLocalNumber) {
        onChange(buildE164(selected.dialCode, parsedLocalNumber));
      }
    }
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = event.target.value;
    setLocalNumber(nextValue);

    const digits = normalizeDigits(nextValue);
    if (digits) {
      onChange(buildE164(dialCode, digits));
    } else {
      onChange('');
    }
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-2">Phone number</label>
      <div className="flex gap-2">
        <select
          value={country.code}
          onChange={handleCountryChange}
          disabled={disabled}
          className="w-40 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {COUNTRIES.map((option) => (
            <option key={option.code} value={option.code}>
              {option.name} (+{option.dialCode})
            </option>
          ))}
        </select>
        <input
          type="tel"
          value={localNumber}
          onChange={handleNumberChange}
          disabled={disabled}
          placeholder="Enter phone number"
          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <p className="mt-2 text-xs text-gray-500">Normalized: {value || '—'}</p>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};

PhoneInput.displayName = 'PhoneInput';
