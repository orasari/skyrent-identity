import { Suspense, lazy, useMemo, useState } from 'react';
import type { AddressField, AddressValue } from '@skyrent/identity-sdk';
import { DRONES, EMPTY_ADDRESS } from './utils/demoData';
import { useCart } from './hooks/useCart';

const BrowseDronesPage = lazy(() =>
  import('./pages/BrowseDronesPage').then((module) => ({
    default: module.BrowseDronesPage,
  }))
);
const VerificationFlowPage = lazy(() =>
  import('./pages/VerificationFlowPage').then((module) => ({
    default: module.VerificationFlowPage,
  }))
);
const CheckoutPage = lazy(() =>
  import('./pages/CheckoutPage').then((module) => ({
    default: module.CheckoutPage,
  }))
);

function App() {
  const [view, setView] = useState<'browse' | 'verify' | 'checkout'>('browse');
  const {
    cartItems,
    selectedDroneId,
    addToCart,
    updateCartDays,
    removeFromCart,
    resetCart,
  } = useCart();
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [address, setAddress] = useState<AddressValue>(EMPTY_ADDRESS);
  const [addressErrors, setAddressErrors] = useState<Partial<Record<AddressField, string>> | null>(
    null
  );
  const [selfie, setSelfie] = useState<string | null>(null);

  const selectedDrone = useMemo(
    () => DRONES.find((drone) => drone.id === selectedDroneId) ?? null,
    [selectedDroneId]
  );

  const resetFlow = () => {
    resetCart();
    setPhone('');
    setPhoneError(null);
    setAddress(EMPTY_ADDRESS);
    setAddressErrors(null);
    setSelfie(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white p-4 shadow-lg">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">SkyRent Drones</h1>
          <p className="text-blue-100">Premium Drone Rental Service</p>
        </div>
      </header>

      <main className="container mx-auto p-8">
        {view === 'browse' && (
          <Suspense
            fallback={
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-600">Loading component...</p>
              </div>
            }
          >
            <BrowseDronesPage
              drones={DRONES}
              cartItems={cartItems}
              onAddToCart={addToCart}
              onUpdateCartDays={updateCartDays}
              onRemoveFromCart={removeFromCart}
              onStartVerification={() => setView('verify')}
            />
          </Suspense>
        )}

        {view === 'verify' && (
          <Suspense
            fallback={
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-600">Loading component...</p>
              </div>
            }
          >
            <VerificationFlowPage
              selectedDrone={selectedDrone}
              drones={DRONES}
              cartItems={cartItems}
              phone={phone}
              onPhoneChange={setPhone}
              phoneError={phoneError}
              onPhoneError={setPhoneError}
              address={address}
              onAddressChange={setAddress}
              addressErrors={addressErrors}
              onAddressErrors={setAddressErrors}
              selfie={selfie}
              onSelfieCapture={setSelfie}
              onUpdateCartDays={updateCartDays}
              onRemoveFromCart={removeFromCart}
              onBack={() => setView('browse')}
              onContinue={() => setView('checkout')}
            />
          </Suspense>
        )}

        {view === 'checkout' && (
          <Suspense
            fallback={
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-600">Loading component...</p>
              </div>
            }
          >
            <CheckoutPage
              selectedDrone={selectedDrone}
              drones={DRONES}
              cartItems={cartItems}
              phone={phone}
              address={address}
              selfie={selfie}
              onUpdateCartDays={updateCartDays}
              onRemoveFromCart={removeFromCart}
              onBack={() => setView('verify')}
              onStartOver={() => {
                resetFlow();
                setView('browse');
              }}
            />
          </Suspense>
        )}
      </main>
    </div>
  );
}

export default App;
