import { describe, expect, it } from 'vitest';
import type { AddressValue } from '../../components/AddressForm';
import type { Address } from '../types';
import { getIdentityData } from '../getIdentityData';

describe('getIdentityData', () => {
  it('throws when the verification service is unavailable', async () => {
    await expect(
      getIdentityData(
        {
          selfieUrl: 'data:image/jpeg;base64,abc',
          phone: '+14155552671',
          address: {
            line1: '123 Main St',
            line2: '',
            city: 'San Francisco',
            region: 'CA',
            postalCode: '94102',
            country: 'US',
          },
        },
        { rng: () => 0.01 }
      )
    ).rejects.toThrow('Verification service unavailable');
  });

  it('returns failed status for scores below 50 and normalizes AddressValue', async () => {
    const rngValues = [0.5, 0.1, 0.99];
    const rng = () => rngValues.shift() ?? 0;

    const addressValue: AddressValue = {
      line1: '123 Main St',
      line2: 'Apt 4',
      city: 'San Francisco',
      region: 'CA',
      postalCode: '94102',
      country: 'US',
    };

    const result = await getIdentityData(
      {
        selfieUrl: 'data:image/jpeg;base64,abc',
        phone: '+14155552671',
        address: addressValue,
      },
      { rng }
    );

    expect(result.status).toBe('failed');
    expect(result.score).toBeLessThan(50);
    expect(result.address).toEqual({
      street: '123 Main St, Apt 4',
      city: 'San Francisco',
      state: 'CA',
      country: 'US',
      postalCode: '94102',
    });

  });

  it('returns verified status for scores 50 and above and preserves Address', async () => {
    const rngValues = [0.5, 0.9, 0];
    const rng = () => rngValues.shift() ?? 0;

    const address: Address = {
      street: '500 Market St',
      city: 'San Francisco',
      state: 'California',
      country: 'United States',
      postalCode: '94105',
    };

    const result = await getIdentityData(
      {
        selfieUrl: 'data:image/jpeg;base64,abc',
        phone: '+14155552671',
        address,
      },
      { rng }
    );

    expect(result.status).toBe('verified');
    expect(result.score).toBeGreaterThanOrEqual(50);
    expect(result.address).toEqual(address);

  });
});
