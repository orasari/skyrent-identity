export interface SelfieCaptureProps {
  /**
   * Callback fired when a selfie is captured or cleared.
   * @param imageData - Base64 encoded image data URL, or null when the user retakes (clears the capture)
   */
  onCapture: (imageData: string | null) => void;

  /**
   * Callback fired when the user cancels capture
   */
  onCancel?: () => void;

  /**
   * Callback fired when an error occurs
   * @param error - Error object with details
   */
  onError?: (error: Error) => void;

  /**
   * Custom class name for styling
   */
  className?: string;

  /**
   * Width of the video/canvas element in pixels
   * @default 640
   */
  width?: number;

  /**
   * Height of the video/canvas element in pixels
   * @default 480
   */
  height?: number;

  /**
   * Quality of the captured image (0-1)
   * @default 0.92
   */
  quality?: number;

  /**
   * Image format for the captured image
   * @default 'image/jpeg'
   */
  imageFormat?: 'image/jpeg' | 'image/png' | 'image/webp';
}

export enum CameraError {
  NOT_SUPPORTED = 'Camera not supported in this browser',
  PERMISSION_DENIED = 'Camera permission denied',
  NOT_FOUND = 'No camera found',
  GENERIC = 'Failed to access camera',
}

export interface CameraState {
  isLoading: boolean;
  isStreaming: boolean;
  isCaptured: boolean;
  error: string | null;
}
