import type { ReactNode } from 'react';

interface LayoutProps {
  left: ReactNode;
  right: ReactNode;
}

export function Layout({ left, right }: LayoutProps) {
  return (
    <div className="grid grid-cols-[minmax(0,2fr)_minmax(280px,1fr)] gap-7 items-start max-[960px]:grid-cols-1">
      <div>{left}</div>
      <aside className="sticky top-6 max-[960px]:static">{right}</aside>
    </div>
  );
}
