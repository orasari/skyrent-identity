import { useState } from 'react';
import type { CartItem } from '../types/cart';

/**
 * Manage cart state for the demo rental flow.
 */
export function useCart() {
  const [selectedDroneId, setSelectedDroneId] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  /**
   * Add a drone to the cart or update its rental days.
   */
  const addToCart = (droneId: string, days: number) => {
    setSelectedDroneId(droneId);
    setCartItems((prev) => {
      const existing = prev.find((item) => item.droneId === droneId);
      if (existing) {
        return prev.map((item) =>
          item.droneId === droneId ? { ...item, days: Math.max(1, days) } : item
        );
      }
      return [...prev, { droneId, days: Math.max(1, days) }];
    });
  };

  /**
   * Update rental days for an existing cart item.
   */
  const updateCartDays = (droneId: string, days: number) => {
    if (days <= 0) {
      setCartItems((prev) => prev.filter((item) => item.droneId !== droneId));
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.droneId === droneId ? { ...item, days } : item))
    );
  };

  /**
   * Remove a drone from the cart.
   */
  const removeFromCart = (droneId: string) => {
    setCartItems((prev) => prev.filter((item) => item.droneId !== droneId));
  };

  /**
   * Clear cart state and selection.
   */
  const resetCart = () => {
    setSelectedDroneId(null);
    setCartItems([]);
  };

  return {
    cartItems,
    selectedDroneId,
    addToCart,
    updateCartDays,
    removeFromCart,
    resetCart,
  };
}
