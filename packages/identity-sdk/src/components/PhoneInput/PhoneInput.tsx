import React, { useId } from 'react';
import { COUNTRIES } from './countries';
import { css, styles } from './styles';
import type { PhoneInputProps } from './types';
import { useClipboardCopy } from './useClipboardCopy';
import { usePhoneInput } from './usePhoneInput';

export const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChange,
  onError,
  defaultCountry = 'US',
  className,
  classNames,
  disabled = false,
}) => {
  const { country, localNumber, error, warning, handleCountryChange, handleNumberChange } =
    usePhoneInput({
      value,
      onChange,
      onError,
      defaultCountry,
    });
  const { copied, copyValue } = useClipboardCopy();

  const inputId = useId();
  const errorId = `${inputId}-error`;
  const isError = Boolean(error);

  return (
    <div
      className={[className, classNames?.root].filter(Boolean).join(' ')}
      style={styles.container}
    >
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
          onChange={(event) => handleCountryChange(event.target.value)}
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
          onChange={(event) => handleNumberChange(event.target.value)}
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
            <div style={value ? styles.resultValue : styles.resultValueMuted}>{value || '—'}</div>
          </div>
          <button
            type="button"
            onClick={() => copyValue(value)}
            style={
              value ? styles.copyButton : { ...styles.copyButton, ...styles.copyButtonDisabled }
            }
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
