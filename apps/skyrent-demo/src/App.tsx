import { useState } from 'react';
import { SelfieCapture } from '@skyrent/identity-sdk';

function App() {
  const [selfieData, setSelfieData] = useState<string | null>(null);

  const handleSelfieCapture = (imageData: string) => {
    console.log('Selfie captured!', imageData.substring(0, 50) + '...');
    setSelfieData(imageData);
  };

  const handleError = (error: Error) => {
    console.error('Selfie capture error:', error);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white p-4 shadow-lg">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">🚁 SkyRent Drones</h1>
          <p className="text-blue-100">Premium Drone Rental Service</p>
        </div>
      </header>

      <main className="container mx-auto p-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6">Test: SelfieCapture Component</h2>

          {/* SelfieCapture Test */}
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-4">Identity Verification - Selfie</h3>
            <SelfieCapture onCapture={handleSelfieCapture} onError={handleError} />
          </div>

          {/* Display captured selfie */}
          {selfieData && (
            <div className="mt-8">
              <h3 className="text-xl font-medium mb-4">Captured Selfie Preview:</h3>
              <div className="max-w-md mx-auto">
                <img
                  src={selfieData}
                  alt="Captured selfie"
                  className="w-full rounded-lg shadow-lg"
                />
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
                  <p className="text-green-800 font-medium">✅ Selfie captured successfully!</p>
                  <p className="text-sm text-green-700 mt-1">
                    Image data: {selfieData.substring(0, 60)}...
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
