// @vitest-environment jsdom
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '../Button';

describe('Button', () => {
  it('renders the label', () => {
    render(<Button label="Click me" onClick={() => {}} />);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<Button label="Click me" onClick={onClick} />);
    fireEvent.click(screen.getByRole('button', { name: 'Click me' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('defaults to type="button"', () => {
    render(<Button label="Default" onClick={() => {}} />);
    expect(screen.getByRole('button', { name: 'Default' })).toHaveAttribute('type', 'button');
  });

  it('supports custom type', () => {
    render(<Button label="Submit" onClick={() => {}} type="submit" />);
    expect(screen.getByRole('button', { name: 'Submit' })).toHaveAttribute('type', 'submit');
  });
});
