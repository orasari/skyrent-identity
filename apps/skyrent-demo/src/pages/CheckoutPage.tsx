import type { AddressValue, IdentityData } from '@skyrent/identity-sdk';
import { useState } from 'react';
import { CartSummaryPanel } from '../components/checkout/CartSummaryPanel';
import { CheckoutHeader } from '../components/checkout/CheckoutHeader';
import { CompleteRentalPanel } from '../components/checkout/CompleteRentalPanel';
import { StartOverAction } from '../components/checkout/StartOverAction';
import { VerificationPanel } from '../components/checkout/VerificationPanel';
import { Layout } from '../components/Layout';
import { RentalSummaryCard } from '../components/RentalSummaryCard';
import { useCheckoutViewModel } from '../hooks/useCheckoutViewModel';
import type { CartItem } from '../types/cart';
import type { Drone } from '../types/drone';
interface CheckoutPageProps {
  drones: Drone[];
  cartItems: CartItem[];
  phone: string;
  address: AddressValue;
  selfie: string | null;
  identityResult: IdentityData | null;
  onUpdateCartDays: (id: string, days: number) => void;
  onRemoveFromCart: (id: string) => void;
  onBack: () => void;
  onStartOver: () => void;
}

export function CheckoutPage({
  drones,
  cartItems,
  phone,
  address,
  selfie,
  identityResult,
  onUpdateCartDays,
  onRemoveFromCart,
  onBack,
  onStartOver,
}: CheckoutPageProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { cartSummary, cartTotal, isVerified, phoneValue, addressLine, cityLine, countryLine } =
    useCheckoutViewModel({
      drones,
      cartItems,
      phone,
      address,
      identityResult,
    });

  return (
    <Layout
      left={
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <CheckoutHeader onBack={onBack} />

          <div className="grid gap-6 lg:grid-cols-3">
            <CartSummaryPanel cartSummary={cartSummary} cartTotal={cartTotal} />
            <VerificationPanel
              selfie={selfie}
              phoneValue={phoneValue}
              addressLine={addressLine}
              cityLine={cityLine}
              countryLine={countryLine}
              identityResult={identityResult}
            />
            <CompleteRentalPanel
              showConfirmation={showConfirmation}
              isVerified={isVerified}
              onComplete={() => setShowConfirmation(true)}
            />
          </div>

          <StartOverAction onStartOver={onStartOver} />
        </div>
      }
      right={
        <RentalSummaryCard
          drones={drones}
          cartItems={cartItems}
          onUpdateCartDays={onUpdateCartDays}
          onRemoveFromCart={onRemoveFromCart}
          controlsEnabled={false}
        />
      }
    />
  );
}
