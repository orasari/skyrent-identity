// @vitest-environment jsdom
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { PhoneInput } from '../PhoneInput';

describe('PhoneInput', () => {
  it('normalizes input to E.164 format', () => {
    const onChange = vi.fn();
    render(<PhoneInput value="" onChange={onChange} defaultCountry="US" />);

    const input = screen.getByPlaceholderText('Enter phone number');
    fireEvent.change(input, { target: { value: '4155552671' } });

    expect(onChange).toHaveBeenLastCalledWith('+14155552671');
  });

  it('reports validation errors for invalid input', async () => {
    const onError = vi.fn();
    render(<PhoneInput value="" onChange={vi.fn()} onError={onError} defaultCountry="US" />);

    const input = screen.getByPlaceholderText('Enter phone number');
    fireEvent.change(input, { target: { value: 'abc' } });

    await waitFor(() => {
      expect(onError).toHaveBeenLastCalledWith('Digits only');
    });

    fireEvent.change(input, { target: { value: '123' } });

    await waitFor(() => {
      expect(onError).toHaveBeenLastCalledWith('Phone number must be at least 7 digits.');
    });
  });

  it('strips non-digit input and shows a warning', async () => {
    const onChange = vi.fn();
    render(<PhoneInput value="" onChange={onChange} defaultCountry="US" />);

    const input = screen.getByPlaceholderText('Enter phone number') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '12ab34' } });

    expect(input.value).toBe('1234');
    expect(await screen.findByText('Only numbers are allowed.')).toBeTruthy();
    expect(onChange).toHaveBeenLastCalledWith('+11234');
  });

  it('clears the warning when only digits are entered', async () => {
    render(<PhoneInput value="" onChange={vi.fn()} defaultCountry="US" />);

    const input = screen.getByPlaceholderText('Enter phone number');
    fireEvent.change(input, { target: { value: '12ab34' } });
    expect(await screen.findByText('Only numbers are allowed.')).toBeTruthy();

    fireEvent.change(input, { target: { value: '1234567' } });
    await waitFor(() => {
      expect(screen.queryByText('Only numbers are allowed.')).toBeNull();
    });
  });
});
