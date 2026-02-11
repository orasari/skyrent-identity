import type { CartItem } from '../types/cart';
import type { Drone } from '../types/drone';

export type CartLine = CartItem & {
  drone: Drone;
  total: number;
};

export const buildCartSummary = (cartItems: CartItem[], drones: Drone[]): CartLine[] =>
  cartItems.flatMap((item) => {
    const drone = drones.find((entry) => entry.id === item.droneId);
    if (!drone) {
      return [];
    }
    return [
      {
        ...item,
        drone,
        total: drone.dailyPrice * item.days,
      },
    ];
  });

export const calculateCartTotal = (summary: CartLine[]): number =>
  summary.reduce((sum, item) => sum + item.total, 0);
