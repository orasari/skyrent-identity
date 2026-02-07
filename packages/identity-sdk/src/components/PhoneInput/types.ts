export type CountryOption = {
  code: string;
  name: string;
  dialCode: string;
};

export interface PhoneInputProps {
  /**
   * Current phone number value (E.164 format recommended).
   */
  value: string;
  /**
   * Called with the normalized E.164 phone number.
   */
  onChange: (value: string) => void;
  /**
   * Optional error handler for validation messages.
   */
  onError?: (error: string) => void;
  /**
   * Default selected country code.
   * @default 'US'
   */
  defaultCountry?: string;
  /**
   * Custom class name for the root container.
   */
  className?: string;
  /**
   * Disable the input.
   */
  disabled?: boolean;
}
