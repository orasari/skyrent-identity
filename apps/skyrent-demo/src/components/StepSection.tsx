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
    <section>
      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{stepLabel}</p>
      <h3 className="mt-1 text-lg font-semibold text-gray-900">{title}</h3>
      {description && <p className="text-sm text-gray-600 mb-3">{description}</p>}
      {content}
    </section>
  );
}
