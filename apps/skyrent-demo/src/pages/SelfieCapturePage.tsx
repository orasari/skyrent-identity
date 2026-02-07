import { useState } from 'react';
import { SelfieCapture } from '@skyrent/identity-sdk';
import { Button } from '../components/Button';

interface SelfieCapturePageProps {
  onBack: () => void;
}

export function SelfieCapturePage({ onBack }: SelfieCapturePageProps) {
  const [selfieData, setSelfieData] = useState<string | null>(null);

  const handleSelfieCapture = (imageData: string) => {
    setSelfieData(imageData);
  };

  const handleError = (error: Error) => {
    console.error('Selfie capture error:', error);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Selfie Capture Component</h2>
          <p className="text-gray-600">Test the SDK selfie capture flow</p>
        </div>
        <Button label="← Back" onClick={onBack} />
      </div>

      {!selfieData ? (
        <div className="mb-8">
          <h3 className="text-xl font-medium mb-4">Identity Verification - Selfie</h3>
          <SelfieCapture onCapture={handleSelfieCapture} onError={handleError} />
        </div>
      ) : (
        <div className="mt-4">
          <h3 className="text-xl font-medium mb-4">Captured Selfie Preview</h3>
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
            <div className="mt-4 flex justify-center">
              <Button label="↻ Retake photo" onClick={() => setSelfieData(null)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
