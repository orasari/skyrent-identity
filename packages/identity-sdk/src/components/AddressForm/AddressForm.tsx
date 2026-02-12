import React, { useId } from 'react';
import { AddressField } from './AddressField';
import { DEFAULT_REQUIRED_FIELDS } from './constants';
import { COUNTRY_OPTIONS } from './countries';
import { styles } from './styles';
import type { AddressFormProps } from './types';
import { useAddressForm } from './useAddressForm';

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
  const {
    mergedLabels,
    mergedPlaceholders,
    updateField,
    markTouched,
    showError,
    errorText,
    isRequired,
  } = useAddressForm({
    value,
    onChange,
    onError,
    requiredFields,
    labels,
    placeholders,
  });
  const baseId = useId();

  return (
    <div
      className={[className, classNames?.root].filter(Boolean).join(' ')}
      style={styles.container}
    >
      <AddressField
        id={`${baseId}-line1`}
        errorId={`${baseId}-line1-error`}
        label={mergedLabels.line1}
        required={isRequired('line1')}
        value={value.line1}
        placeholder={mergedPlaceholders.line1}
        autoComplete="address-line1"
        disabled={disabled}
        className={classNames?.field}
        labelClassName={classNames?.label}
        inputClassName={classNames?.input}
        helperClassName={classNames?.helper}
        errorClassName={classNames?.error}
        showError={showError('line1')}
        errorText={errorText('line1')}
        onChange={(event) => updateField('line1', event.target.value)}
        onBlur={() => markTouched('line1')}
      />

      <AddressField
        id={`${baseId}-line2`}
        errorId={`${baseId}-line2-error`}
        label={mergedLabels.line2}
        required={isRequired('line2')}
        value={value.line2}
        placeholder={mergedPlaceholders.line2}
        autoComplete="address-line2"
        disabled={disabled}
        className={classNames?.field}
        labelClassName={classNames?.label}
        inputClassName={classNames?.input}
        helperClassName={classNames?.helper}
        errorClassName={classNames?.error}
        helperText="Optional"
        showError={showError('line2')}
        errorText={errorText('line2')}
        onChange={(event) => updateField('line2', event.target.value)}
        onBlur={() => markTouched('line2')}
      />

      <div style={styles.row} className={classNames?.row}>
        <AddressField
          id={`${baseId}-city`}
          errorId={`${baseId}-city-error`}
          label={mergedLabels.city}
          required={isRequired('city')}
          value={value.city}
          placeholder={mergedPlaceholders.city}
          autoComplete="address-level2"
          disabled={disabled}
          className={classNames?.field}
          labelClassName={classNames?.label}
          inputClassName={classNames?.input}
          helperClassName={classNames?.helper}
          errorClassName={classNames?.error}
          showError={showError('city')}
          errorText={errorText('city')}
          onChange={(event) => updateField('city', event.target.value)}
          onBlur={() => markTouched('city')}
        />

        <AddressField
          id={`${baseId}-region`}
          errorId={`${baseId}-region-error`}
          label={mergedLabels.region}
          required={isRequired('region')}
          value={value.region}
          placeholder={mergedPlaceholders.region}
          autoComplete="address-level1"
          disabled={disabled}
          className={classNames?.field}
          labelClassName={classNames?.label}
          inputClassName={classNames?.input}
          helperClassName={classNames?.helper}
          errorClassName={classNames?.error}
          showError={showError('region')}
          errorText={errorText('region')}
          onChange={(event) => updateField('region', event.target.value)}
          onBlur={() => markTouched('region')}
        />
      </div>

      <div style={styles.row} className={classNames?.row}>
        <AddressField
          id={`${baseId}-postal`}
          errorId={`${baseId}-postal-error`}
          label={mergedLabels.postalCode}
          required={isRequired('postalCode')}
          value={value.postalCode}
          placeholder={mergedPlaceholders.postalCode}
          autoComplete="postal-code"
          disabled={disabled}
          className={classNames?.field}
          labelClassName={classNames?.label}
          inputClassName={classNames?.input}
          helperClassName={classNames?.helper}
          errorClassName={classNames?.error}
          showError={showError('postalCode')}
          errorText={errorText('postalCode')}
          onChange={(event) => updateField('postalCode', event.target.value)}
          onBlur={() => markTouched('postalCode')}
        />

        <AddressField
          id={`${baseId}-country`}
          errorId={`${baseId}-country-error`}
          label={mergedLabels.country}
          required={isRequired('country')}
          value={value.country}
          disabled={disabled}
          className={classNames?.field}
          labelClassName={classNames?.label}
          selectClassName={classNames?.select}
          helperClassName={classNames?.helper}
          errorClassName={classNames?.error}
          showError={showError('country')}
          errorText={errorText('country')}
          options={countryOptions.map((option) => ({
            value: option.code,
            label: option.name,
          }))}
          onChange={(event) => updateField('country', event.target.value)}
          onBlur={() => markTouched('country')}
        />
      </div>
    </div>
  );
};

AddressForm.displayName = 'AddressForm';
