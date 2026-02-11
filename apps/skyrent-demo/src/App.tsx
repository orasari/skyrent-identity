import { Suspense, lazy, useMemo, useState } from 'react';
import type { AddressField, AddressValue, IdentityData } from '@skyrent/identity-sdk';
import { ErrorBoundary } from './components/ErrorBoundary';
import { getAppConfig } from './config/appConfig';
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
const VerificationResultPage = lazy(() =>
  import('./pages/VerificationResultPage').then((module) => ({
    default: module.VerificationResultPage,
  }))
);

function App() {
  const { config, error: configError } = getAppConfig();
  const [view, setView] = useState<'browse' | 'verify' | 'result' | 'checkout'>('browse');
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
  const [identityResult, setIdentityResult] = useState<IdentityData | null>(null);

  const selectedDrone = useMemo(
    () => DRONES.find((drone) => drone.id === selectedDroneId) ?? null,
    [selectedDroneId]
  );

  const resetFlow = () => {
    resetCart();
    resetVerification();
  };

  const resetVerification = () => {
    setPhone('');
    setPhoneError(null);
    setAddress(EMPTY_ADDRESS);
    setAddressErrors(null);
    setSelfie(null);
    setIdentityResult(null);
  };

  const loadingCard = (
    <div className="bg-white rounded-lg shadow-md p-6">
      <p className="text-gray-600">Loading component...</p>
    </div>
  );

  const errorCard = (
    <div className="bg-white rounded-lg shadow-md p-6">
      <p className="text-gray-900 font-semibold">Something went wrong.</p>
      <p className="text-gray-600 text-sm mt-2">Please refresh the page and try again.</p>
    </div>
  );

  if (configError) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-blue-600 text-white p-4 shadow-lg">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold">SkyRent Drones</h1>
            <p className="text-blue-100">Premium Drone Rental Service</p>
          </div>
        </header>
        <main className="container mx-auto p-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-900 font-semibold">Configuration error</p>
            <p className="text-gray-600 text-sm mt-2">{configError}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white p-4 shadow-lg">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">{config?.appName}</h1>
          <p className="text-blue-100">{config?.appTagline}</p>
        </div>
      </header>

      <main className="container mx-auto p-8">
        {view === 'browse' && (
          <ErrorBoundary fallback={errorCard}>
            <Suspense fallback={loadingCard}>
              <BrowseDronesPage
                drones={DRONES}
                cartItems={cartItems}
                onAddToCart={addToCart}
                onUpdateCartDays={updateCartDays}
                onRemoveFromCart={removeFromCart}
                onStartVerification={() => {
                  resetVerification();
                  setView('verify');
                }}
              />
            </Suspense>
          </ErrorBoundary>
        )}

        {view === 'verify' && (
          <ErrorBoundary fallback={errorCard}>
            <Suspense fallback={loadingCard}>
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
                onContinue={(result) => {
                  setIdentityResult(result);
                  setView('result');
                }}
              />
            </Suspense>
          </ErrorBoundary>
        )}

        {view === 'result' && identityResult && (
          <ErrorBoundary fallback={errorCard}>
            <Suspense fallback={loadingCard}>
              <VerificationResultPage
                result={identityResult}
                drones={DRONES}
                cartItems={cartItems}
                onUpdateCartDays={updateCartDays}
                onRemoveFromCart={removeFromCart}
                onContinue={() => setView('checkout')}
                onRetry={() => {
                  resetVerification();
                  setView('verify');
                }}
              />
            </Suspense>
          </ErrorBoundary>
        )}

        {view === 'checkout' && (
          <ErrorBoundary fallback={errorCard}>
            <Suspense fallback={loadingCard}>
              <CheckoutPage
                drones={DRONES}
                cartItems={cartItems}
                phone={phone}
                address={address}
                selfie={selfie}
                identityResult={identityResult}
                onUpdateCartDays={updateCartDays}
                onRemoveFromCart={removeFromCart}
                onBack={() => setView('result')}
                onStartOver={() => {
                  resetFlow();
                  setView('browse');
                }}
              />
            </Suspense>
          </ErrorBoundary>
        )}
      </main>
    </div>
  );
}

export default App;
