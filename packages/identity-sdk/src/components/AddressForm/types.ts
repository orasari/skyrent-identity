export type AddressField = 'line1' | 'line2' | 'city' | 'region' | 'postalCode' | 'country';

export type AddressValue = Record<AddressField, string>;

export type CountryOption = {
  code: string;
  name: string;
};

export interface AddressFormProps {
  /**
   * Current address value.
   */
  value: AddressValue;
  /**
   * Called with the updated address.
   */
  onChange: (value: AddressValue) => void;
  /**
   * Optional validation errors for required fields.
   */
  onError?: (errors: Partial<Record<AddressField, string>> | null) => void;
  /**
   * Required fields to validate.
   * @default ['line1', 'city', 'region', 'postalCode', 'country']
   */
  requiredFields?: AddressField[];
  /**
   * Country options for the select input.
   */
  countryOptions?: CountryOption[];
  /**
   * Optional label overrides.
   */
  labels?: Partial<Record<AddressField, string>>;
  /**
   * Optional placeholder overrides.
   */
  placeholders?: Partial<Record<AddressField, string>>;
  /**
   * Custom class name for the root container.
   */
  className?: string;
  /**
   * Class name overrides for internal elements.
   */
  classNames?: {
    root?: string;
    row?: string;
    field?: string;
    label?: string;
    input?: string;
    select?: string;
    helper?: string;
    error?: string;
  };
  /**
   * Disable the form fields.
   */
  disabled?: boolean;
}
