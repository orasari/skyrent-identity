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

  it('sets failed at score 49 and verified at score 50', async () => {
    const addressValue: AddressValue = {
      line1: '10 Market St',
      line2: '',
      city: 'San Francisco',
      region: 'CA',
      postalCode: '94105',
      country: 'US',
    };

    const failRngValues = [0.99, 0.2, 0.98];
    const failRng = () => failRngValues.shift() ?? 0;

    const failedResult = await getIdentityData(
      {
        selfieUrl: 'data:image/jpeg;base64,abc',
        phone: '+14155552671',
        address: addressValue,
      },
      { rng: failRng, passRate: 0 }
    );

    expect(failedResult.score).toBe(49);
    expect(failedResult.status).toBe('failed');

    const passRngValues = [0.99, 0.8, 0];
    const passRng = () => passRngValues.shift() ?? 0;

    const verifiedResult = await getIdentityData(
      {
        selfieUrl: 'data:image/jpeg;base64,abc',
        phone: '+14155552671',
        address: addressValue,
      },
      { rng: passRng, passRate: 1 }
    );

    expect(verifiedResult.score).toBe(50);
    expect(verifiedResult.status).toBe('verified');
  });

  it('clamps passRate below 0 to always fail and above 1 to always pass', async () => {
    const addressValue: AddressValue = {
      line1: '200 King St',
      line2: '',
      city: 'San Francisco',
      region: 'CA',
      postalCode: '94107',
      country: 'US',
    };

    const failRngValues = [0.99, 0.2, 0.4];
    const failRng = () => failRngValues.shift() ?? 0;

    const failedResult = await getIdentityData(
      {
        selfieUrl: 'data:image/jpeg;base64,abc',
        phone: '+14155552671',
        address: addressValue,
      },
      { rng: failRng, passRate: -1 }
    );

    expect(failedResult.status).toBe('failed');
    expect(failedResult.score).toBeLessThan(50);

    const passRngValues = [0.99, 0.4, 0.1];
    const passRng = () => passRngValues.shift() ?? 0;

    const verifiedResult = await getIdentityData(
      {
        selfieUrl: 'data:image/jpeg;base64,abc',
        phone: '+14155552671',
        address: addressValue,
      },
      { rng: passRng, passRate: 2 }
    );

    expect(verifiedResult.status).toBe('verified');
    expect(verifiedResult.score).toBeGreaterThanOrEqual(50);
  });

  it('normalizes AddressValue without trailing commas for empty line2', async () => {
    const rngValues = [0.99, 0.2, 0.5];
    const rng = () => rngValues.shift() ?? 0;

    const addressValue: AddressValue = {
      line1: '500 Mission St',
      line2: '',
      city: '',
      region: '',
      postalCode: '',
      country: '',
    };

    const result = await getIdentityData(
      {
        selfieUrl: 'data:image/jpeg;base64,abc',
        phone: '+14155552671',
        address: addressValue,
      },
      { rng }
    );

    expect(result.address.street).toBe('500 Mission St');
    expect(result.address.city).toBe('');
    expect(result.address.state).toBe('');
    expect(result.address.country).toBe('');
    expect(result.address.postalCode).toBe('');
  });
});
