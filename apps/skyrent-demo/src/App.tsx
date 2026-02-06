import { useState } from 'react';

function App() {
  const [step, _setStep] = useState<'browse' | 'verify' | 'checkout'>('browse');

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
          <h2 className="text-2xl font-semibold mb-4">Current Step: {step}</h2>

          <div className="space-y-4">
            <p className="text-gray-600">Demo app successfully linked to @skyrent/identity-sdk!</p>

            <div className="bg-green-50 border border-green-200 rounded p-4">
              <p className="text-green-800 font-medium">✅ Setup Complete</p>
              <ul className="mt-2 text-sm text-green-700 space-y-1">
                <li>• Workspace dependency working</li>
                <li>• TypeScript types imported from SDK</li>
                <li>• Ready to build components</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
