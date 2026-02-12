import { useCallback, useEffect, useMemo, useState } from 'react';
import type { AddressField, AddressValue } from './types';
import { createEmptyErrors, DEFAULT_LABELS, DEFAULT_PLACEHOLDERS } from './constants';

interface UseAddressFormParams {
  value: AddressValue;
  onChange: (value: AddressValue) => void;
  onError?: (errors: Partial<Record<AddressField, string>> | null) => void;
  requiredFields: AddressField[];
  labels?: Partial<Record<AddressField, string>>;
  placeholders?: Partial<Record<AddressField, string>>;
}

interface UseAddressFormResult {
  mergedLabels: Record<AddressField, string>;
  mergedPlaceholders: Record<AddressField, string>;
  updateField: (field: AddressField, nextValue: string) => void;
  markTouched: (field: AddressField) => void;
  showError: (field: AddressField) => boolean;
  errorText: (field: AddressField) => string;
  isRequired: (field: AddressField) => boolean;
}

/**
 * Keeps all AddressForm validation and interaction rules in one place,
 * so the component can stay focused on field composition and layout.
 */
export function useAddressForm({
  value,
  onChange,
  onError,
  requiredFields,
  labels,
  placeholders,
}: UseAddressFormParams): UseAddressFormResult {
  const [touched, setTouched] = useState<Partial<Record<AddressField, boolean>>>(() => ({}));

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
    onError?.(errors);
  }, [errors, onError]);

  const updateField = useCallback(
    (field: AddressField, nextValue: string) => {
      if (value[field] === nextValue) {
        return;
      }
      onChange({
        ...value,
        [field]: nextValue,
      });
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

  const showError = useCallback(
    (field: AddressField) => Boolean(errors?.[field] && touched[field]),
    [errors, touched]
  );
  const errorText = useCallback((field: AddressField) => errors?.[field] ?? '', [errors]);
  const isRequired = useCallback(
    (field: AddressField) => requiredFieldSet.has(field),
    [requiredFieldSet]
  );

  return {
    mergedLabels,
    mergedPlaceholders,
    updateField,
    markTouched,
    showError,
    errorText,
    isRequired,
  };
}
