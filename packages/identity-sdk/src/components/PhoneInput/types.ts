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
  onError?: (error: string | null) => void;
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
   * Class name overrides for internal elements.
   */
  classNames?: {
    root?: string;
    label?: string;
    row?: string;
    select?: string;
    input?: string;
    hint?: string;
    error?: string;
  };
  /**
   * Disable the input.
   */
  disabled?: boolean;
}
