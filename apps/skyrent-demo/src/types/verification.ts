import type { AddressField, AddressValue } from '@skyrent/identity-sdk';
import type { CartItem } from './cart';
import type { Drone } from './drone';

export interface VerificationFlowPageProps {
  selectedDrone: Drone | null;
  drones: Drone[];
  cartItems: CartItem[];
  phone: string;
  onPhoneChange: (value: string) => void;
  phoneError: string | null;
  onPhoneError: (message: string | null) => void;
  address: AddressValue;
  onAddressChange: (value: AddressValue) => void;
  addressErrors: Partial<Record<AddressField, string>> | null;
  onAddressErrors: (errors: Partial<Record<AddressField, string>> | null) => void;
  selfie: string | null;
  onSelfieCapture: (value: string | null) => void;
  onUpdateCartDays: (id: string, days: number) => void;
  onRemoveFromCart: (id: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

export type VerificationStep = 'selfie' | 'phone' | 'address';
