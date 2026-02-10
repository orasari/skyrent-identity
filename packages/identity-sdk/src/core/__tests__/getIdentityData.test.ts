import { describe, expect, it, vi } from 'vitest';
import type { AddressValue } from '../../components/AddressForm';
import type { Address } from '../types';
import { getIdentityData } from '../getIdentityData';

describe('getIdentityData', () => {
  it('throws when the verification service is unavailable', async () => {
    vi.spyOn(Math, 'random').mockReturnValueOnce(0.01);

    await expect(
      getIdentityData({
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
      })
    ).rejects.toThrow('Verification service unavailable');

    vi.restoreAllMocks();
  });

  it('returns failed status for scores below 50 and normalizes AddressValue', async () => {
    vi.spyOn(Math, 'random')
      .mockReturnValueOnce(0.5) // error roll
      .mockReturnValueOnce(0.1) // score roll (<0.3)
      .mockReturnValueOnce(0.99); // score value -> 49

    const addressValue: AddressValue = {
      line1: '123 Main St',
      line2: 'Apt 4',
      city: 'San Francisco',
      region: 'CA',
      postalCode: '94102',
      country: 'US',
    };

    const result = await getIdentityData({
      selfieUrl: 'data:image/jpeg;base64,abc',
      phone: '+14155552671',
      address: addressValue,
    });

    expect(result.status).toBe('failed');
    expect(result.score).toBeLessThan(50);
    expect(result.address).toEqual({
      street: '123 Main St, Apt 4',
      city: 'San Francisco',
      state: 'CA',
      country: 'US',
      postalCode: '94102',
    });

    vi.restoreAllMocks();
  });

  it('returns verified status for scores 50 and above and preserves Address', async () => {
    vi.spyOn(Math, 'random')
      .mockReturnValueOnce(0.5) // error roll
      .mockReturnValueOnce(0.9) // score roll (>=0.3)
      .mockReturnValueOnce(0); // score value -> 50

    const address: Address = {
      street: '500 Market St',
      city: 'San Francisco',
      state: 'California',
      country: 'United States',
      postalCode: '94105',
    };

    const result = await getIdentityData({
      selfieUrl: 'data:image/jpeg;base64,abc',
      phone: '+14155552671',
      address,
    });

    expect(result.status).toBe('verified');
    expect(result.score).toBeGreaterThanOrEqual(50);
    expect(result.address).toEqual(address);

    vi.restoreAllMocks();
  });
});
