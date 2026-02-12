import type { ErrorDetails } from './errorDetails';
import type { CameraState } from './types';
import { styles } from './styles';

interface SelfieCaptureControlsProps {
  state: CameraState;
  errorDetails: ErrorDetails | null;
  onCapture: () => void;
  onRetake: () => void;
  onCancel: () => void;
  onStartCamera: () => void;
}

export function SelfieCaptureControls({
  state,
  errorDetails,
  onCapture,
  onRetake,
  onCancel,
  onStartCamera,
}: SelfieCaptureControlsProps) {
  return (
    <div style={styles.controls}>
      {state.isStreaming && !state.isCaptured && (
        <>
          <button
            style={{ ...styles.button, ...styles.primaryButton }}
            onClick={onCapture}
            type="button"
          >
            Capture Photo
          </button>
          <button
            style={{ ...styles.button, ...styles.secondaryButton }}
            onClick={onCancel}
            type="button"
          >
            Cancel
          </button>
        </>
      )}

      {state.isCaptured && (
        <button
          style={{ ...styles.button, ...styles.secondaryButton }}
          onClick={onRetake}
          type="button"
        >
          ↻ Retake
        </button>
      )}

      {!state.isStreaming && !state.isCaptured && !state.isLoading && !state.error && (
        <button
          style={{ ...styles.button, ...styles.primaryButton }}
          onClick={onStartCamera}
          type="button"
        >
          Start Camera
        </button>
      )}

      {state.error && (
        <button
          style={{ ...styles.button, ...styles.primaryButton }}
          onClick={onStartCamera}
          type="button"
        >
          {errorDetails?.buttonLabel ?? 'Try Again'}
        </button>
      )}
    </div>
  );
}
