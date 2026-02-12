import type { AddressField } from './types';

export const DEFAULT_REQUIRED_FIELDS: AddressField[] = [
  'line1',
  'city',
  'region',
  'postalCode',
  'country',
];

export const DEFAULT_LABELS: Record<AddressField, string> = {
  line1: 'Address line 1',
  line2: 'Address line 2',
  city: 'City',
  region: 'State / Region',
  postalCode: 'Postal code',
  country: 'Country',
};

export const DEFAULT_PLACEHOLDERS: Record<AddressField, string> = {
  line1: 'Street address',
  line2: 'Apartment, suite, unit, etc',
  city: 'City',
  region: 'State or region',
  postalCode: 'Postal code',
  country: 'Select country',
};

export const createEmptyErrors = () => ({}) as Partial<Record<AddressField, string>>;
