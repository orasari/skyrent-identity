# @skyrent/identity-sdk

A React-based identity verification SDK providing reusable components for capturing and validating user identity information.

## Features

- **SelfieCapture** - Camera access with visual guide for selfie capture
- **PhoneInput** - International phone number input with country code selector
- **AddressForm** - Structured address data collection with validation
- **getIdentityData** - Aggregate identity data with verification scoring

## Installation

```bash
npm install @skyrent/identity-sdk
# or
yarn add @skyrent/identity-sdk
# or
pnpm add @skyrent/identity-sdk
```

## Requirements

- React 18.0.0 or higher
- Modern browser with camera API support (for SelfieCapture)

## Usage

### Basic Example

```tsx
import {
  SelfieCapture,
  PhoneInput,
  AddressForm,
  getIdentityData,
  type IdentityData,
} from '@skyrent/identity-sdk';

function VerificationFlow() {
  const [selfie, setSelfie] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<Address | null>(null);

  const handleVerify = async () => {
    const result: IdentityData = await getIdentityData({
      selfieUrl: selfie,
      phone: phone,
      address: address!,
    });

    console.log('Verification Result:', result);
    // result.status will be 'verified' or 'failed'
    // result.score will be 0-100
  };

  return (
    <div>
      <SelfieCapture onCapture={setSelfie} />
      <PhoneInput value={phone} onChange={setPhone} />
      <AddressForm onSubmit={setAddress} />
      <button onClick={handleVerify}>Verify Identity</button>
    </div>
  );
}
```

### End-to-end Usage Example

```tsx
import { useState } from 'react';
import { AddressForm, PhoneInput, SelfieCapture, getIdentityData } from '@skyrent/identity-sdk';

export function IdentityFlow() {
  const [selfie, setSelfie] = useState<string | null>(null);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState({
    line1: '',
    line2: '',
    city: '',
    region: '',
    postalCode: '',
    country: '',
  });

  const handleVerify = async () => {
    if (!selfie) return;
    const result = await getIdentityData({ selfieUrl: selfie, phone, address });
    console.log(result);
  };

  return (
    <div>
      <SelfieCapture onCapture={setSelfie} onCancel={() => setSelfie(null)} />
      <PhoneInput value={phone} onChange={setPhone} />
      <AddressForm value={address} onChange={setAddress} />
      <button type="button" onClick={handleVerify}>
        Verify
      </button>
    </div>
  );
}
```

## Components

### SelfieCapture

Captures a selfie image using the device camera.

```tsx
<SelfieCapture
  onCapture={(base64Image: string) => console.log(base64Image)}
  onError={(error: Error) => console.error(error)}
/>
```

**Props:**

- `onCapture`: `(imageData: string) => void` - Callback with base64 encoded image
- `onError`: `(error: Error) => void` - Error handler for camera access issues

**Features:**

- Automatic camera permission request
- Visual face positioning guide
- Image preview before confirmation
- Error handling for denied permissions

### PhoneInput

International phone number input with validation.

```tsx
<PhoneInput value={phone} onChange={(phone: string) => setPhone(phone)} defaultCountry="US" />
```

**Props:**

- `value`: `string` - Current phone number value
- `onChange`: `(phone: string) => void` - Callback with normalized phone (E.164 format)
- `defaultCountry`: `string` - Default country code (ISO 3166-1 alpha-2)

**Features:**

- Country code selector
- Automatic formatting
- E.164 normalization (e.g., "+14155552671")
- Length and format validation

### AddressForm

Structured address input form.

```tsx
<AddressForm onSubmit={(address: Address) => setAddress(address)} initialValues={existingAddress} />
```

**Props:**

- `onSubmit`: `(address: Address) => void` - Callback with validated address object
- `initialValues`: `Address` - Pre-populate form fields

**Address Object:**

```typescript
type Address = {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
};
```

**Features:**

- Field-level validation
- Required field indicators
- Country-aware postal code validation

## Functions

### getIdentityData

Processes captured identity data and returns verification result.

```tsx
const result = await getIdentityData({
  selfieUrl: 'data:image/jpeg;base64,...',
  phone: '+14155552671',
  address: {
    street: '123 Main St',
    city: 'San Francisco',
    state: 'California',
    country: 'United States',
    postalCode: '94102',
  },
});
```

**Parameters:**

```typescript
{
  selfieUrl: string; // Base64 encoded image
  phone: string; // E.164 format phone number
  address: Address; // Structured address object
}
```

**Returns:**

```typescript
type IdentityData = {
  selfieUrl: string;
  phone: string;
  address: Address;
  score: number; // 0-100
  status: 'verified' | 'failed';
};
```

**Verification Logic:**

- Generates a verification score from 0-100
- Score ≥ 50: Status = 'verified' (70% probability)
- Score < 50: Status = 'failed' (30% probability)

## TypeScript Support

This package includes TypeScript declarations. All types are exported:

```typescript
import type { Address, IdentityData, IdentityStatus } from '@skyrent/identity-sdk';
```

## Browser Compatibility

- Chrome/Edge 53+
- Firefox 36+
- Safari 11+
- Opera 40+

Camera features require HTTPS in production environments.

## License

MIT

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Support

For questions or issues, please open an issue on GitHub.
