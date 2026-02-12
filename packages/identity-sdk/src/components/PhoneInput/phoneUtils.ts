import { COUNTRIES } from './countries';

export const MIN_DIGITS = 7;
export const MAX_DIGITS = 15;

export const normalizeDigits = (value: string) => value.replace(/\D/g, '');

const SORTED_COUNTRIES_BY_DIAL = [...COUNTRIES].sort(
  (a, b) => b.dialCode.length - a.dialCode.length
);

export const findCountryByDialCode = (digits: string) =>
  SORTED_COUNTRIES_BY_DIAL.find((country) => digits.startsWith(country.dialCode));

export const buildE164 = (dialCode: string, nationalNumber: string) =>
  `+${dialCode}${nationalNumber}`;
