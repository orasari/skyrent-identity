import type { ReactNode } from 'react';

interface LayoutProps {
  left: ReactNode;
  right: ReactNode;
  showCartButton?: boolean;
}

export function Layout({ left, right, showCartButton = false }: LayoutProps) {
  return (
    <div className="grid grid-cols-[minmax(0,2fr)_minmax(280px,1fr)] gap-7 items-start max-[960px]:grid-cols-1">
      <div>{left}</div>
      <aside id="rental-summary" className="sticky top-6 max-[960px]:static">
        {right}
      </aside>
      {showCartButton && (
        <button
          type="button"
          onClick={() =>
            document.getElementById('rental-summary')?.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            })
          }
          className="fixed bottom-5 right-5 z-40 hidden max-[960px]:inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(16,185,129,0.35)] hover:bg-emerald-700"
        >
          View cart
        </button>
      )}
    </div>
  );
}
