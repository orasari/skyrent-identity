import type { ErrorDetails } from './errorDetails';
import { styles } from './styles';

interface SelfieCaptureErrorProps {
  errorDetails: ErrorDetails | null;
  hasError: boolean;
}

export function SelfieCaptureError({ errorDetails, hasError }: SelfieCaptureErrorProps) {
  if (!hasError || !errorDetails) {
    return null;
  }

  return (
    <div style={styles.errorContainer} role="alert">
      <strong>{errorDetails.title}</strong>
      <p style={{ margin: '0.5rem 0 0' }}>{errorDetails.message}</p>
      <ul style={{ margin: '0.75rem 0 0', paddingLeft: '1.1rem', textAlign: 'left' }}>
        {errorDetails.steps.map((step) => (
          <li key={step} style={{ marginBottom: '0.35rem' }}>
            {step}
          </li>
        ))}
      </ul>
    </div>
  );
}
