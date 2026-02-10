export type Drone = {
  id: string;
  name: string;
  description: string;
  category: 'filming' | 'cargo';
  rangeMiles: number;
  maxSpeedMph: number;
  dailyPrice: number;
  loadCapacityLbs?: number;
  icon: string;
};
