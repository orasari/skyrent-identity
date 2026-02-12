import { Button } from '../Button';

interface CheckoutHeaderProps {
  onBack: () => void;
}

export function CheckoutHeader({ onBack }: CheckoutHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
          Step 4 of 4
        </p>
        <h2 className="text-2xl font-semibold">Checkout</h2>
        <p className="text-gray-600">Review your rental details.</p>
      </div>
      <Button label="← Back" onClick={onBack} />
    </div>
  );
}
