import type { AddressValue, IdentityData } from '@skyrent/identity-sdk';
import { useMemo } from 'react';
import type { CartItem } from '../types/cart';
import type { Drone } from '../types/drone';
import { buildCartSummary, calculateCartTotal } from '../utils/cart';
import { formatAddressLine, formatCityLine } from '../utils/formatters';

interface UseCheckoutViewModelParams {
  drones: Drone[];
  cartItems: CartItem[];
  phone: string;
  address: AddressValue;
  identityResult: IdentityData | null;
}

interface CheckoutViewModel {
  cartSummary: ReturnType<typeof buildCartSummary>;
  cartTotal: number;
  isVerified: boolean;
  phoneValue: string;
  addressLine: string;
  cityLine: string;
  countryLine: string;
}

export function useCheckoutViewModel({
  drones,
  cartItems,
  phone,
  address,
  identityResult,
}: UseCheckoutViewModelParams): CheckoutViewModel {
  return useMemo(() => {
    const cartSummary = buildCartSummary(cartItems, drones);
    const cartTotal = calculateCartTotal(cartSummary);
    const isVerified = identityResult?.status === 'verified';

    const verifiedAddress = identityResult?.address;
    const addressLine = verifiedAddress
      ? formatAddressLine(verifiedAddress.street, '')
      : formatAddressLine(address.line1, address.line2);
    const cityLine = verifiedAddress
      ? formatCityLine(verifiedAddress.city, verifiedAddress.state, verifiedAddress.postalCode)
      : formatCityLine(address.city, address.region, address.postalCode);
    const countryLine = verifiedAddress?.country ?? address.country;

    return {
      cartSummary,
      cartTotal,
      isVerified,
      phoneValue: identityResult?.phone || phone || 'Not provided',
      addressLine,
      cityLine,
      countryLine,
    };
  }, [address, cartItems, drones, identityResult, phone]);
}
