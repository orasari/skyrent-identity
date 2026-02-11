import React, { useEffect, useId, useMemo, useState } from 'react';
import { COUNTRIES } from './countries';
import { css, styles } from './styles';
import type { CountryOption, PhoneInputProps } from './types';

const MIN_DIGITS = 7;
const MAX_DIGITS = 15;

const normalizeDigits = (value: string) => value.replace(/\D/g, '');

const SORTED_COUNTRIES_BY_DIAL = [...COUNTRIES].sort(
  (a, b) => b.dialCode.length - a.dialCode.length
);

const findCountryByDialCode = (digits: string) =>
  SORTED_COUNTRIES_BY_DIAL.find((country) => digits.startsWith(country.dialCode));

const buildE164 = (dialCode: string, nationalNumber: string) =>
  `+${dialCode}${nationalNumber}`;

export const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  onError,
  defaultCountry = 'US',
  className,
  classNames,
  disabled = false,
}) => {
  const [country, setCountry] = useState<CountryOption>(() => {
    return COUNTRIES.find((c) => c.code === defaultCountry) ?? COUNTRIES[0];
  });
  const [localNumber, setLocalNumber] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

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
    if (!parsedLocalNumber) {
      setError(null);
      return;
    }

    if (/[a-z]/i.test(localNumber)) {
      setError('Digits only');
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
    if (onError) {
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
    const digits = normalizeDigits(nextValue);
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
    if (digits) {
      onChange(buildE164(dialCode, digits));
    } else {
      onChange('');
    }
  };

  const handleCopy = async () => {
    if (!value) {
      return;
    }
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // no-op: clipboard not available
    }
  };

  const inputId = useId();
  const errorId = `${inputId}-error`;
  const isError = Boolean(error);

  return (
    <div className={[className, classNames?.root].filter(Boolean).join(' ')} style={styles.container}>
      <style>{css}</style>
      <div>
        <label htmlFor={inputId} style={styles.label} className={classNames?.label}>
          Phone number
        </label>
        <p style={styles.helper}>We’ll normalize to E.164 format.</p>
      </div>
      <div
        style={styles.row}
        className={['skyrent-phone-input__row', classNames?.row].filter(Boolean).join(' ')}
      >
        <select
          value={country.code}
          onChange={handleCountryChange}
          disabled={disabled}
          style={isError ? { ...styles.select, ...styles.selectError } : styles.select}
          className={['skyrent-phone-input__select', classNames?.select].filter(Boolean).join(' ')}
          aria-label="Country code"
        >
          {COUNTRIES.map((option) => (
            <option key={option.code} value={option.code}>
              {option.name} (+{option.dialCode})
            </option>
          ))}
        </select>
        <input
          id={inputId}
          type="tel"
          value={localNumber}
          onChange={handleNumberChange}
          disabled={disabled}
          placeholder="Enter phone number"
          style={isError ? { ...styles.input, ...styles.inputError } : styles.input}
          className={['skyrent-phone-input__input', classNames?.input].filter(Boolean).join(' ')}
          aria-invalid={isError}
          aria-describedby={error ? errorId : undefined}
        />
      </div>
      {warning && (
        <p style={styles.hint} className={classNames?.hint}>
          {warning}
        </p>
      )}
      <div style={styles.resultPanel}>
        <div style={styles.resultRow}>
          <div>
            <div style={styles.resultLabel}>Normalized</div>
            <div style={value ? styles.resultValue : styles.resultValueMuted}>
              {value || '—'}
            </div>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            style={value ? styles.copyButton : { ...styles.copyButton, ...styles.copyButtonDisabled }}
            className="skyrent-phone-input__copy"
            disabled={!value}
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <div style={styles.resultMeta}>E.164</div>
      </div>
      {error && (
        <p id={errorId} style={styles.error} className={classNames?.error}>
          {error}
        </p>
      )}
    </div>
  );
};

PhoneInput.displayName = 'PhoneInput';
