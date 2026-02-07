import { Suspense, lazy, useState } from 'react';

const SelfieCapturePage = lazy(() =>
  import('./pages/SelfieCapturePage').then((module) => ({
    default: module.SelfieCapturePage,
  }))
);
const PhoneInputPage = lazy(() =>
  import('./pages/PhoneInputPage').then((module) => ({
    default: module.PhoneInputPage,
  }))
);
const AddressFormPage = lazy(() =>
  import('./pages/AddressFormPage').then((module) => ({
    default: module.AddressFormPage,
  }))
);

function App() {
  const [view, setView] = useState<'landing' | 'selfie' | 'phone' | 'address'>('landing');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white p-4 shadow-lg">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">🚁 SkyRent Drones</h1>
          <p className="text-blue-100">Premium Drone Rental Service</p>
        </div>
      </header>

      <main className="container mx-auto p-8">
        {view === 'landing' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold">SDK Playground</h2>
              <p className="text-gray-600">
                Choose a component to preview how the SDK works.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <button
                type="button"
                onClick={() => setView('selfie')}
                className="rounded-xl border border-blue-200 bg-blue-50 p-6 text-left shadow-sm transition hover:border-blue-300 hover:bg-blue-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900">Selfie Capture</h3>
                    <p className="text-sm text-blue-700">
                      Open the camera and capture a selfie.
                    </p>
                  </div>
                  <span className="text-2xl">📸</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setView('phone')}
                className="rounded-xl border border-blue-200 bg-blue-50 p-6 text-left shadow-sm transition hover:border-blue-300 hover:bg-blue-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900">Phone Input</h3>
                    <p className="text-sm text-blue-700">Capture a normalized phone number.</p>
                  </div>
                  <span className="text-2xl">📱</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setView('address')}
                className="rounded-xl border border-blue-200 bg-blue-50 p-6 text-left shadow-sm transition hover:border-blue-300 hover:bg-blue-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900">Address Form</h3>
                    <p className="text-sm text-blue-700">Collect structured address details.</p>
                  </div>
                  <span className="text-2xl">🏠</span>
                </div>
              </button>
            </div>
          </div>
        )}

        {view === 'selfie' && (
          <Suspense
            fallback={
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-600">Loading component...</p>
              </div>
            }
          >
            <SelfieCapturePage onBack={() => setView('landing')} />
          </Suspense>
        )}

        {view === 'phone' && (
          <Suspense
            fallback={
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-600">Loading component...</p>
              </div>
            }
          >
            <PhoneInputPage onBack={() => setView('landing')} />
          </Suspense>
        )}

        {view === 'address' && (
          <Suspense
            fallback={
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-600">Loading component...</p>
              </div>
            }
          >
            <AddressFormPage onBack={() => setView('landing')} />
          </Suspense>
        )}
      </main>
    </div>
  );
}

export default App;
