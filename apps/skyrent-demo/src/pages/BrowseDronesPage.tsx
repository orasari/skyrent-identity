import { useMemo, useState } from 'react';
import { Layout } from '../components/Layout';
import { RentalSummaryCard } from '../components/RentalSummaryCard';
import type { CartItem } from '../types/cart';
import type { Drone } from '../types/drone';
import { formatCurrency, formatDroneSpecs } from '../utils/formatters';

interface BrowseDronesPageProps {
  drones: Drone[];
  cartItems: CartItem[];
  onAddToCart: (id: string, days: number) => void;
  onUpdateCartDays: (id: string, days: number) => void;
  onRemoveFromCart: (id: string) => void;
  onStartVerification: () => void;
}

export function BrowseDronesPage({
  drones,
  cartItems,
  onAddToCart,
  onUpdateCartDays,
  onRemoveFromCart,
  onStartVerification,
}: BrowseDronesPageProps) {
  const [rentalDays, setRentalDays] = useState<Record<string, number>>({});
  const [activeCategory, setActiveCategory] = useState<'filming' | 'cargo'>('filming');

  const filmingDrones = useMemo(
    () => drones.filter((drone) => drone.category === 'filming'),
    [drones]
  );
  const cargoDrones = useMemo(
    () => drones.filter((drone) => drone.category === 'cargo'),
    [drones]
  );

  const visibleDrones = activeCategory === 'filming' ? filmingDrones : cargoDrones;

  const getDayCount = (droneId: string) => rentalDays[droneId] ?? 1;

  const updateDays = (droneId: string, nextDays: number) => {
    const normalized = Math.max(1, nextDays);
    setRentalDays((prev) => ({
      ...prev,
      [droneId]: normalized,
    }));
    if (cartItems.some((item) => item.droneId === droneId)) {
      onUpdateCartDays(droneId, normalized);
    }
  };

  return (
    <div className="bg-white rounded-[18px] shadow-[0_18px_45px_rgba(15,23,42,0.08)] p-8">
      <Layout
        left={
          <>
            <div className="flex justify-between gap-6 mb-6">
              <div>
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-emerald-600 mb-2">
                  Step 1 of 4
                </p>
                <h2 className="text-[1.75rem] font-bold text-slate-900 mb-1.5">
                  Choose your rental drone
                </h2>
                <p className="text-[0.95rem] text-slate-500 max-w-[520px]">
                  Premium fleets tailored for shoots, inspections, and heavy payload deliveries.
                </p>
              </div>
            </div>

            <div className="inline-flex gap-3 p-1.5 rounded-full bg-slate-50 border border-slate-200">
              <button
                type="button"
                onClick={() => setActiveCategory('filming')}
                className={`border-none bg-transparent px-4.5 py-2 rounded-full text-[0.85rem] font-semibold ${
                  activeCategory === 'filming'
                    ? 'bg-white text-slate-900 shadow-[0_6px_18px_rgba(15,23,42,0.12)]'
                    : 'text-slate-600'
                }`}
              >
                Filming drones
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('cargo')}
                className={`border-none bg-transparent px-4.5 py-2 rounded-full text-[0.85rem] font-semibold ${
                  activeCategory === 'cargo'
                    ? 'bg-white text-slate-900 shadow-[0_6px_18px_rgba(15,23,42,0.12)]'
                    : 'text-slate-600'
                }`}
              >
                Cargo drones
              </button>
            </div>
            <p className="mt-4 mb-6 text-[0.9rem] text-slate-500">
              {activeCategory === 'filming'
                ? 'Stability-first options for production crews and inspections.'
                : 'Lift capacity for logistics and delivery workflows.'}
            </p>

            <div className="grid gap-4.5 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
              {visibleDrones.map((drone) => {
                const isInCart = cartItems.some((item) => item.droneId === drone.id);
                const currentDays = getDayCount(drone.id);
                return (
                  <article
                    key={drone.id}
                    className={`rounded-2xl border p-5 bg-white shadow-[0_6px_16px_rgba(15,23,42,0.05)] flex flex-col gap-3.5 transition ${
                      isInCart
                        ? 'border-emerald-200 bg-emerald-50 shadow-[0_16px_32px_rgba(22,163,74,0.12)]'
                        : 'border-slate-200 hover:border-emerald-200 hover:shadow-[0_14px_28px_rgba(15,23,42,0.1)] hover:-translate-y-0.5'
                    }`}
                  >
                    <div className="flex justify-between gap-3">
                      <div>
                        <h3 className="text-[1.05rem] font-bold text-slate-900">{drone.name}</h3>
                        <p className="text-[0.85rem] text-slate-500 mt-1">
                          {drone.description}
                        </p>
                      </div>
                      {drone.icon && (
                        <span className="text-sm font-semibold text-slate-500">{drone.icon}</span>
                      )}
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-bold text-slate-900">
                        {formatCurrency(drone.dailyPrice)}
                      </span>
                      <span className="text-[0.85rem] text-slate-500">per day</span>
                    </div>
                    <div className="text-[0.82rem] text-slate-600">
                      {formatDroneSpecs(drone)}
                    </div>
                    <div className="flex items-center justify-between gap-3 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5">
                      <span className="text-[0.8rem] font-semibold text-slate-600">Days</span>
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          className="h-7 w-7 rounded-full border border-slate-200 bg-white font-bold text-slate-900"
                          onClick={() => updateDays(drone.id, currentDays - 1)}
                          aria-label="Decrease rental days"
                        >
                          −
                        </button>
                        <span className="min-w-[20px] text-center font-semibold text-slate-900">
                          {currentDays}
                        </span>
                        <button
                          type="button"
                          className="h-7 w-7 rounded-full border border-slate-200 bg-white font-bold text-slate-900"
                          onClick={() => updateDays(drone.id, currentDays + 1)}
                          aria-label="Increase rental days"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onAddToCart(drone.id, currentDays)}
                      disabled={isInCart}
                      className={`mt-auto rounded-xl px-3.5 py-2.5 text-[0.9rem] font-semibold transition ${
                        isInCart
                          ? 'bg-emerald-200 text-emerald-900 cursor-default'
                          : 'bg-emerald-600 text-white hover:opacity-90'
                      }`}
                    >
                      {isInCart ? 'Selected ✓' : 'Select'}
                    </button>
                  </article>
                );
              })}
            </div>
          </>
        }
        right={
          <RentalSummaryCard
            drones={drones}
            cartItems={cartItems}
            onUpdateCartDays={onUpdateCartDays}
            onRemoveFromCart={onRemoveFromCart}
            primaryAction={{
              label: 'Continue',
              disabled: cartItems.length === 0,
              onClick: onStartVerification,
            }}
          />
        }
      />
    </div>
  );
}
