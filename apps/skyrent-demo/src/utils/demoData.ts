import type { AddressValue } from '@skyrent/identity-sdk';
import type { Drone } from '../types/drone';

export const DRONES: Drone[] = [
  {
    id: 'atlas',
    name: 'Atlas Pro',
    description: 'Cinema-grade stability for epic aerial shots.',
    rangeMiles: 12,
    maxSpeedMph: 42,
    pricePerHour: 65,
    icon: '🎥',
  },
  {
    id: 'quasar',
    name: 'Quasar X',
    description: 'Long-range, high-speed drone for expansive terrain.',
    rangeMiles: 18,
    maxSpeedMph: 54,
    pricePerHour: 82,
    icon: '⚡️',
  },
  {
    id: 'hover',
    name: 'Hover Scout',
    description: 'Compact build, perfect for indoor or tight spaces.',
    rangeMiles: 6,
    maxSpeedMph: 28,
    pricePerHour: 45,
    icon: '🏙️',
  },
];

export const EMPTY_ADDRESS: AddressValue = {
  line1: '',
  line2: '',
  city: '',
  region: '',
  postalCode: '',
  country: 'US',
};
