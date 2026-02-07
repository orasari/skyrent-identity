import React, { useCallback, useEffect, useId, useMemo, useState } from 'react';
import { COUNTRY_OPTIONS } from './countries';
import { styles } from './styles';
import type { AddressField, AddressFormProps, AddressValue } from './types';

const DEFAULT_REQUIRED_FIELDS: AddressField[] = [
  'line1',
  'city',
  'region',
  'postalCode',
  'country',
];

const DEFAULT_LABELS: Record<AddressField, string> = {
  line1: 'Address line 1',
  line2: 'Address line 2',
  city: 'City',
  region: 'State / Region',
  postalCode: 'Postal code',
  country: 'Country',
};

const DEFAULT_PLACEHOLDERS: Record<AddressField, string> = {
  line1: 'Street address',
  line2: 'Apartment, suite, unit, etc',
  city: 'City',
  region: 'State or region',
  postalCode: 'Postal code',
  country: 'Select country',
};

const createEmptyErrors = () => ({} as Partial<Record<AddressField, string>>);

export const AddressForm: React.FC<AddressFormProps> = ({
  value,
  onChange,
  onError,
  requiredFields = DEFAULT_REQUIRED_FIELDS,
  countryOptions = COUNTRY_OPTIONS,
  labels,
  placeholders,
  className,
  classNames,
  disabled = false,
}) => {
  const [touched, setTouched] = useState<Partial<Record<AddressField, boolean>>>(() => ({}));
  const baseId = useId();

  const mergedLabels = useMemo(
    () => ({
      ...DEFAULT_LABELS,
      ...labels,
    }),
    [labels]
  );

  const mergedPlaceholders = useMemo(
    () => ({
      ...DEFAULT_PLACEHOLDERS,
      ...placeholders,
    }),
    [placeholders]
  );

  const requiredFieldSet = useMemo(() => new Set(requiredFields), [requiredFields]);

  const errors = useMemo(() => {
    const nextErrors = createEmptyErrors();
    requiredFields.forEach((field) => {
      if (!value[field]?.trim()) {
        nextErrors[field] = 'Required';
      }
    });
    return Object.keys(nextErrors).length > 0 ? nextErrors : null;
  }, [requiredFields, value]);

  useEffect(() => {
    if (onError) {
      onError(errors);
    }
  }, [errors, onError]);

  const updateField = useCallback(
    (field: AddressField, nextValue: string) => {
      if (value[field] === nextValue) {
        return;
      }
      const nextAddress: AddressValue = {
        ...value,
        [field]: nextValue,
      };
      onChange(nextAddress);
    },
    [onChange, value]
  );

  const markTouched = useCallback((field: AddressField) => {
    setTouched((prev) => {
      if (prev[field]) {
        return prev;
      }
      return {
        ...prev,
        [field]: true,
      };
    });
  }, []);

  const showError = (field: AddressField) => Boolean(errors?.[field] && touched[field]);
  const errorText = (field: AddressField) => errors?.[field] ?? '';
  const isRequired = (field: AddressField) => requiredFieldSet.has(field);

  const line1Id = `${baseId}-line1`;
  const line2Id = `${baseId}-line2`;
  const cityId = `${baseId}-city`;
  const regionId = `${baseId}-region`;
  const postalId = `${baseId}-postal`;
  const countryId = `${baseId}-country`;

  const line1ErrorId = `${line1Id}-error`;
  const line2ErrorId = `${line2Id}-error`;
  const cityErrorId = `${cityId}-error`;
  const regionErrorId = `${regionId}-error`;
  const postalErrorId = `${postalId}-error`;
  const countryErrorId = `${countryId}-error`;

  return (
    <div className={[className, classNames?.root].filter(Boolean).join(' ')} style={styles.container}>
      <div style={styles.field} className={classNames?.field}>
        <label htmlFor={line1Id} style={styles.label} className={classNames?.label}>
          {mergedLabels.line1}
          {isRequired('line1') ? ' *' : ''}
        </label>
        <input
          id={line1Id}
          type="text"
          autoComplete="address-line1"
          value={value.line1}
          onChange={(event) => updateField('line1', event.target.value)}
          onBlur={() => markTouched('line1')}
          placeholder={mergedPlaceholders.line1}
          disabled={disabled}
          style={showError('line1') ? { ...styles.input, ...styles.inputError } : styles.input}
          className={classNames?.input}
          aria-invalid={showError('line1')}
          aria-describedby={showError('line1') ? line1ErrorId : undefined}
        />
        {showError('line1') && (
          <p id={line1ErrorId} style={styles.error} className={classNames?.error}>
            {errorText('line1')}
          </p>
        )}
      </div>

      <div style={styles.field} className={classNames?.field}>
        <label htmlFor={line2Id} style={styles.label} className={classNames?.label}>
          {mergedLabels.line2}
          {isRequired('line2') ? ' *' : ''}
        </label>
        <input
          id={line2Id}
          type="text"
          autoComplete="address-line2"
          value={value.line2}
          onChange={(event) => updateField('line2', event.target.value)}
          onBlur={() => markTouched('line2')}
          placeholder={mergedPlaceholders.line2}
          disabled={disabled}
          style={showError('line2') ? { ...styles.input, ...styles.inputError } : styles.input}
          className={classNames?.input}
          aria-invalid={showError('line2')}
          aria-describedby={showError('line2') ? line2ErrorId : undefined}
        />
        <p style={styles.helper} className={classNames?.helper}>
          Optional
        </p>
        {showError('line2') && (
          <p id={line2ErrorId} style={styles.error} className={classNames?.error}>
            {errorText('line2')}
          </p>
        )}
      </div>

      <div style={styles.row} className={classNames?.row}>
        <div style={styles.field} className={classNames?.field}>
          <label htmlFor={cityId} style={styles.label} className={classNames?.label}>
            {mergedLabels.city}
            {isRequired('city') ? ' *' : ''}
          </label>
          <input
            id={cityId}
            type="text"
            autoComplete="address-level2"
            value={value.city}
            onChange={(event) => updateField('city', event.target.value)}
            onBlur={() => markTouched('city')}
            placeholder={mergedPlaceholders.city}
            disabled={disabled}
            style={showError('city') ? { ...styles.input, ...styles.inputError } : styles.input}
            className={classNames?.input}
            aria-invalid={showError('city')}
            aria-describedby={showError('city') ? cityErrorId : undefined}
          />
          {showError('city') && (
            <p id={cityErrorId} style={styles.error} className={classNames?.error}>
              {errorText('city')}
            </p>
          )}
        </div>

        <div style={styles.field} className={classNames?.field}>
          <label htmlFor={regionId} style={styles.label} className={classNames?.label}>
            {mergedLabels.region}
            {isRequired('region') ? ' *' : ''}
          </label>
          <input
            id={regionId}
            type="text"
            autoComplete="address-level1"
            value={value.region}
            onChange={(event) => updateField('region', event.target.value)}
            onBlur={() => markTouched('region')}
            placeholder={mergedPlaceholders.region}
            disabled={disabled}
            style={showError('region') ? { ...styles.input, ...styles.inputError } : styles.input}
            className={classNames?.input}
            aria-invalid={showError('region')}
            aria-describedby={showError('region') ? regionErrorId : undefined}
          />
          {showError('region') && (
            <p id={regionErrorId} style={styles.error} className={classNames?.error}>
              {errorText('region')}
            </p>
          )}
        </div>
      </div>

      <div style={styles.row} className={classNames?.row}>
        <div style={styles.field} className={classNames?.field}>
          <label htmlFor={postalId} style={styles.label} className={classNames?.label}>
            {mergedLabels.postalCode}
            {isRequired('postalCode') ? ' *' : ''}
          </label>
          <input
            id={postalId}
            type="text"
            autoComplete="postal-code"
            value={value.postalCode}
            onChange={(event) => updateField('postalCode', event.target.value)}
            onBlur={() => markTouched('postalCode')}
            placeholder={mergedPlaceholders.postalCode}
            disabled={disabled}
            style={showError('postalCode') ? { ...styles.input, ...styles.inputError } : styles.input}
            className={classNames?.input}
            aria-invalid={showError('postalCode')}
            aria-describedby={showError('postalCode') ? postalErrorId : undefined}
          />
          {showError('postalCode') && (
            <p id={postalErrorId} style={styles.error} className={classNames?.error}>
              {errorText('postalCode')}
            </p>
          )}
        </div>

        <div style={styles.field} className={classNames?.field}>
          <label htmlFor={countryId} style={styles.label} className={classNames?.label}>
            {mergedLabels.country}
            {isRequired('country') ? ' *' : ''}
          </label>
          <select
            id={countryId}
            value={value.country}
            onChange={(event) => updateField('country', event.target.value)}
            onBlur={() => markTouched('country')}
            disabled={disabled}
            style={showError('country') ? { ...styles.select, ...styles.inputError } : styles.select}
            className={classNames?.select}
            aria-invalid={showError('country')}
            aria-describedby={showError('country') ? countryErrorId : undefined}
          >
            {countryOptions.map((option) => (
              <option key={option.code} value={option.code}>
                {option.name}
              </option>
            ))}
          </select>
          {showError('country') && (
            <p id={countryErrorId} style={styles.error} className={classNames?.error}>
              {errorText('country')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

AddressForm.displayName = 'AddressForm';
