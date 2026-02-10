import { Suspense } from 'react';
import type { ReactNode } from 'react';

interface StepSectionProps {
  stepLabel: string;
  title: string;
  description?: string;
  children: ReactNode;
  fallback?: ReactNode;
}

export function StepSection({
  stepLabel,
  title,
  description,
  children,
  fallback,
}: StepSectionProps) {
  const content = fallback ? <Suspense fallback={fallback}>{children}</Suspense> : children;

  return (
    <section className="rounded-xl border border-gray-200 p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">{stepLabel}</p>
      <h3 className="mt-2 text-lg font-semibold text-gray-900">{title}</h3>
      {description && <p className="text-sm text-gray-600 mb-4">{description}</p>}
      {content}
    </section>
  );
}
