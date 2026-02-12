import { useEffect, useMemo, useState } from 'react';
import { COUNTRIES } from './countries';
import type { CountryOption } from './types';
import {
  buildE164,
  findCountryByDialCode,
  MAX_DIGITS,
  MIN_DIGITS,
  normalizeDigits,
} from './phoneUtils';

interface UsePhoneInputParams {
  value: string;
  onChange: (value: string) => void;
  onError?: (error: string | null) => void;
  defaultCountry: string;
}

interface UsePhoneInputResult {
  country: CountryOption;
  localNumber: string;
  error: string | null;
  warning: string | null;
  handleCountryChange: (countryCode: string) => void;
  handleNumberChange: (nextValue: string) => void;
}

/**
 * Centralizes country detection, normalization, and validation rules.
 * The component can then remain a thin view layer.
 */
export function usePhoneInput({
  value,
  onChange,
  onError,
  defaultCountry,
}: UsePhoneInputParams): UsePhoneInputResult {
  const [country, setCountry] = useState<CountryOption>(() => {
    return COUNTRIES.find((entry) => entry.code === defaultCountry) ?? COUNTRIES[0];
  });
  const [localNumber, setLocalNumber] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [hasAlpha, setHasAlpha] = useState(false);

  const dialCode = country.dialCode;
  const parsedLocalNumber = useMemo(() => normalizeDigits(localNumber), [localNumber]);

  useEffect(() => {
    const normalized = normalizeDigits(value);
    if (!normalized) {
      setLocalNumber('');
      return;
    }

    if (value.startsWith('+')) {
      const matched = findCountryByDialCode(normalized);
      if (matched) {
        setCountry(matched);
        setLocalNumber(normalized.slice(matched.dialCode.length));
        return;
      }
    }

    if (value.startsWith(`+${dialCode}`)) {
      setLocalNumber(value.replace(`+${dialCode}`, ''));
    }
  }, [value, dialCode]);

  useEffect(() => {
    if (hasAlpha) {
      setError('Digits only');
      return;
    }

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
  }, [parsedLocalNumber, hasAlpha]);

  useEffect(() => {
    onError?.(error);
  }, [error, onError]);

  const handleCountryChange = (countryCode: string) => {
    const selected = COUNTRIES.find((entry) => entry.code === countryCode);
    if (!selected) {
      return;
    }

    setCountry(selected);
    if (parsedLocalNumber) {
      onChange(buildE164(selected.dialCode, parsedLocalNumber));
    }
  };

  const handleNumberChange = (nextValue: string) => {
    const digits = normalizeDigits(nextValue);
    const containsLetters = /[a-z]/i.test(nextValue);
    setHasAlpha(containsLetters);
    setWarning(nextValue === digits ? null : 'Only numbers are allowed.');

    if (nextValue.trim().startsWith('+')) {
      const matched = findCountryByDialCode(digits);
      if (matched) {
        setCountry(matched);
        const local = digits.slice(matched.dialCode.length);
        setLocalNumber(local);
        onChange(buildE164(matched.dialCode, local));
        return;
      }
    }

    setLocalNumber(digits);
    onChange(digits ? buildE164(dialCode, digits) : '');
  };

  return {
    country,
    localNumber,
    error,
    warning,
    handleCountryChange,
    handleNumberChange,
  };
}
