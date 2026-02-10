import type { Address, IdentityData } from './types';
import type { AddressValue } from '../components/AddressForm';

type IdentityInput = {
  selfieUrl: string;
  phone: string;
  address: Address | AddressValue;
};

type IdentityOptions = {
  /**
   * Probability of throwing a simulated service error (0-1).
   */
  errorRate?: number;
  /**
   * Probability of a passing score (0-1).
   */
  passRate?: number;
  /**
   * Random number generator override for deterministic tests.
   */
  rng?: () => number;
};

/**
 * Type guard for AddressForm values vs normalized Address objects.
 */
const isAddressValue = (address: Address | AddressValue): address is AddressValue =>
  'line1' in address || 'region' in address;

/**
 * Normalize AddressForm values into the SDK Address shape.
 */
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

/**
 * Generate a score with a configurable pass rate (default 70%).
 */
const generateScore = (passRate: number, rng: () => number) => {
  const normalizedPassRate = Math.min(1, Math.max(0, passRate));
  const failRate = 1 - normalizedPassRate;
  const roll = rng();
  if (roll < failRate) {
    return Math.floor(rng() * 50);
  }
  return 50 + Math.floor(rng() * 51);
};

/**
 * Aggregate identity data and produce a verification result.
 * Defaults to a 70% pass rate and a small simulated error rate.
 * Accepts optional overrides for deterministic tests or environment tuning.
 */
export async function getIdentityData(
  input: IdentityInput,
  options: IdentityOptions = {}
): Promise<IdentityData> {
  const errorRate = options.errorRate ?? 0.05;
  const passRate = options.passRate ?? 0.7;
  const rng = options.rng ?? Math.random;

  const errorRoll = rng();
  if (errorRoll < errorRate) {
    throw new Error('Verification service unavailable. Please try again.');
  }
  const score = generateScore(passRate, rng);
  const status: IdentityData['status'] = score >= 50 ? 'verified' : 'failed';

  return {
    selfieUrl: input.selfieUrl,
    phone: input.phone,
    address: normalizeAddress(input.address),
    score,
    status,
  };
}
