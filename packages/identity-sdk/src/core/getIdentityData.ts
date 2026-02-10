import type { Address, IdentityData } from './types';
import type { AddressValue } from '../components/AddressForm';

type IdentityInput = {
  selfieUrl: string;
  phone: string;
  address: Address | AddressValue;
};

const isAddressValue = (address: Address | AddressValue): address is AddressValue =>
  'line1' in address || 'region' in address;

const normalizeAddress = (address: Address | AddressValue): Address => {
  if (isAddressValue(address)) {
    const street = [address.line1, address.line2].filter(Boolean).join(', ');
    return {
      street,
      city: address.city,
      state: address.region,
      country: address.country,
      postalCode: address.postalCode,
    };
  }
  return address;
};

const generateScore = () => {
  const roll = Math.random();
  if (roll < 0.3) {
    return Math.floor(Math.random() * 50);
  }
  return 50 + Math.floor(Math.random() * 51);
};

export async function getIdentityData(input: IdentityInput): Promise<IdentityData> {
  const errorRoll = Math.random();
  if (errorRoll < 0.05) {
    throw new Error('Verification service unavailable. Please try again.');
  }
  const score = generateScore();
  const status: IdentityData['status'] = score >= 50 ? 'verified' : 'failed';

  return {
    selfieUrl: input.selfieUrl,
    phone: input.phone,
    address: normalizeAddress(input.address),
    score,
    status,
  };
}
