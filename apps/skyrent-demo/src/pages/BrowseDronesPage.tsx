import { useMemo, useState } from 'react';
import { Layout } from '../components/Layout';
import { RentalSummaryCard } from '../components/RentalSummaryCard';
import type { CartItem } from '../types/cart';
import type { Drone } from '../types/drone';
import { formatCurrency, formatDroneSpecs } from '../utils/formatters';

interface BrowseDronesPageProps {
  drones: Drone[];
  cartItems: CartItem[];
  unitSystem: 'imperial' | 'metric';
  onAddToCart: (id: string, days: number) => void;
  onUpdateCartDays: (id: string, days: number) => void;
  onRemoveFromCart: (id: string) => void;
  onStartVerification: () => void;
}

export function BrowseDronesPage({
  drones,
  cartItems,
  unitSystem,
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
  const cargoDrones = useMemo(() => drones.filter((drone) => drone.category === 'cargo'), [drones]);

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
        showCartButton
        left={
          <>
            <div className="flex justify-between gap-6 mb-6">
              <div>
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-emerald-700 mb-2">
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

            <div className="inline-flex gap-2 rounded-full bg-slate-50 border border-slate-200 p-1.5 shadow-[0_8px_18px_rgba(15,23,42,0.06)]">
              <button
                type="button"
                onClick={() => setActiveCategory('filming')}
                className={`border-none px-5 py-2.5 rounded-full text-[0.85rem] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 ${
                  activeCategory === 'filming'
                    ? 'bg-white text-slate-900 shadow-[0_8px_16px_rgba(15,23,42,0.12)]'
                    : 'bg-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                Filming drones
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('cargo')}
                className={`border-none px-5 py-2.5 rounded-full text-[0.85rem] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 ${
                  activeCategory === 'cargo'
                    ? 'bg-white text-slate-900 shadow-[0_8px_16px_rgba(15,23,42,0.12)]'
                    : 'bg-transparent text-slate-600 hover:text-slate-900'
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

            <div className="grid gap-6 md:gap-7 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
              {visibleDrones.map((drone) => {
                const isInCart = cartItems.some((item) => item.droneId === drone.id);
                const currentDays = getDayCount(drone.id);
                return (
                  <article
                    key={drone.id}
                    className={`rounded-2xl border p-5 bg-white shadow-[0_6px_16px_rgba(15,23,42,0.05)] flex flex-col gap-3.5 transition ${
                      isInCart
                        ? 'border-emerald-700 shadow-[0_18px_36px_rgba(15,23,42,0.16)] ring-1 ring-emerald-700'
                        : 'border-slate-200 hover:border-emerald-200 hover:shadow-[0_14px_28px_rgba(15,23,42,0.1)] hover:-translate-y-0.5'
                    }`}
                  >
                    <div className="flex justify-between gap-3">
                      <div>
                        <h3 className="text-[1.05rem] font-bold text-slate-900">{drone.name}</h3>
                        <p className="text-[0.85rem] leading-5 text-slate-500 mt-1 min-h-[3.75rem] md:min-h-[2.5rem]">
                          {drone.description}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {isInCart && (
                          <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[0.7rem] font-semibold text-emerald-900">
                            Selected
                          </span>
                        )}
                        {drone.icon && (
                          <span className="text-sm font-semibold text-slate-500">{drone.icon}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-bold text-slate-900">
                        {formatCurrency(drone.dailyPrice)}
                      </span>
                      <span className="text-[0.85rem] text-slate-500">per day</span>
                    </div>
                    <div className="text-[0.82rem] text-slate-600">
                      {formatDroneSpecs(drone, unitSystem)}
                    </div>
                    <div className="flex items-center justify-between gap-3 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5">
                      <span className="text-[0.8rem] font-semibold text-slate-600">Days</span>
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          className="h-7 w-7 rounded-full border border-slate-200 bg-white font-bold text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
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
                          className="h-7 w-7 rounded-full border border-slate-200 bg-white font-bold text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
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
                      className={`mt-auto rounded-xl px-3.5 py-2.5 text-[0.9rem] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 ${
                        isInCart
                          ? 'bg-emerald-700 text-white border border-emerald-700 cursor-default'
                          : 'bg-white text-emerald-700 border border-emerald-700 hover:bg-emerald-50'
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
            controlsEnabled
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
