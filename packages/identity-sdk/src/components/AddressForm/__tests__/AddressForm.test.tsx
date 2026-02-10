// @vitest-environment jsdom
import { render, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { AddressValue } from '../types';
import { AddressForm } from '../AddressForm';

const emptyValue: AddressValue = {
  line1: '',
  line2: '',
  city: '',
  region: '',
  postalCode: '',
  country: '',
};

const filledValue: AddressValue = {
  line1: '123 Main St',
  line2: 'Apt 4',
  city: 'San Francisco',
  region: 'CA',
  postalCode: '94102',
  country: 'US',
};

describe('AddressForm', () => {
  it('reports required field errors and clears them when filled', async () => {
    const onError = vi.fn();
    const { rerender } = render(
      <AddressForm value={emptyValue} onChange={vi.fn()} onError={onError} />
    );

    await waitFor(() => {
      expect(onError).toHaveBeenCalled();
    });

    const errors = onError.mock.calls.at(-1)?.[0];
    expect(errors).toMatchObject({
      line1: 'Required',
      city: 'Required',
      region: 'Required',
      postalCode: 'Required',
      country: 'Required',
    });

    rerender(<AddressForm value={filledValue} onChange={vi.fn()} onError={onError} />);

    await waitFor(() => {
      expect(onError).toHaveBeenLastCalledWith(null);
    });
  });
});
