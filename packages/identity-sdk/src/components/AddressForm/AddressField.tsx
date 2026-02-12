import type { ChangeEventHandler } from 'react';
import { styles } from './styles';

interface AddressFieldProps {
  id: string;
  errorId: string;
  label: string;
  required: boolean;
  value: string;
  placeholder?: string;
  disabled: boolean;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  selectClassName?: string;
  helperClassName?: string;
  errorClassName?: string;
  showError: boolean;
  errorText: string;
  helperText?: string;
  autoComplete?: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
  onBlur: () => void;
  options?: { value: string; label: string }[];
}

export function AddressField({
  id,
  errorId,
  label,
  required,
  value,
  placeholder,
  disabled,
  className,
  labelClassName,
  inputClassName,
  selectClassName,
  helperClassName,
  errorClassName,
  showError,
  errorText,
  helperText,
  autoComplete,
  onChange,
  onBlur,
  options,
}: AddressFieldProps) {
  const inputStyle = showError ? { ...styles.input, ...styles.inputError } : styles.input;
  const selectStyle = showError ? { ...styles.select, ...styles.inputError } : styles.select;

  return (
    <div style={styles.field} className={className}>
      <label htmlFor={id} style={styles.label} className={labelClassName}>
        {label}
        {required ? ' *' : ''}
      </label>
      {options ? (
        <select
          id={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          style={selectStyle}
          className={selectClassName}
          aria-invalid={showError}
          aria-describedby={showError ? errorId : undefined}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          type="text"
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          style={inputStyle}
          className={inputClassName}
          aria-invalid={showError}
          aria-describedby={showError ? errorId : undefined}
        />
      )}
      {helperText && (
        <p style={styles.helper} className={helperClassName}>
          {helperText}
        </p>
      )}
      {showError && (
        <p id={errorId} style={styles.error} className={errorClassName}>
          {errorText}
        </p>
      )}
    </div>
  );
}
