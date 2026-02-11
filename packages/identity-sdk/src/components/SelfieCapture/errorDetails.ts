import { CameraError } from './types';

/**
 * Structured UI copy for camera errors in the selfie flow.
 */
type ErrorDetails = {
  title: string;
  message: string;
  steps: string[];
  buttonLabel: string;
};

/**
 * Map raw camera error strings to user-facing titles, messages, and next steps.
 */
export const getCameraErrorDetails = (error: string | null): ErrorDetails | null => {
  if (!error) {
    return null;
  }
  switch (error) {
    case CameraError.PERMISSION_DENIED:
      return {
        title: 'Camera permission needed',
        message: 'Allow camera access in your browser to continue.',
        steps: ['Click the camera icon in the address bar', 'Allow access and refresh this page'],
        buttonLabel: 'Grant Access',
      };
    case CameraError.NOT_FOUND:
      return {
        title: 'No camera detected',
        message: 'We could not find a camera on this device.',
        steps: ['Connect a camera and try again', 'Check OS camera permissions'],
        buttonLabel: 'Try Again',
      };
    case CameraError.NOT_SUPPORTED:
      return {
        title: 'Camera not supported',
        message: 'Your browser does not support camera access.',
        steps: ['Try a modern browser like Chrome or Safari'],
        buttonLabel: 'Try Again',
      };
    default:
      return {
        title: 'Camera error',
        message: error,
        steps: ['Try again or refresh the page'],
        buttonLabel: 'Try Again',
      };
  }
};
