import React, { useEffect } from 'react';
import { SelfieCaptureProps } from './types';
import { getCameraErrorDetails } from './errorDetails';
import { SelfieCaptureControls } from './SelfieCaptureControls';
import { SelfieCaptureError } from './SelfieCaptureError';
import { SelfieCaptureInstructions } from './SelfieCaptureInstructions';
import { useCamera } from './useCamera';
import { styles } from './styles';

/**
 * SelfieCapture Component
 *
 * A component for capturing selfie images using the device camera.
 * Features:
 * - Camera access with permission handling
 * - Visual face positioning guide
 * - Image capture and preview
 * - Error handling and retry functionality
 *
 * @example
 * ```tsx
 * <SelfieCapture
 *   onCapture={(imageData) => console.log('Captured:', imageData)}
 *   onError={(error) => console.error('Error:', error)}
 * />
 * ```
 */
export const SelfieCapture: React.FC<SelfieCaptureProps> = ({
  onCapture,
  onError,
  onCancel,
  className,
  width = 640,
  height = 480,
  quality: _quality = 0.92,
  imageFormat: _imageFormat = 'image/jpeg',
}) => {
  const { videoRef, canvasRef, state, startCamera, stopCamera, captureImage, retake } =
    useCamera(onError);

  // Auto-start camera on mount
  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, [startCamera, stopCamera]);

  const handleCapture = () => {
    const imageData = captureImage();
    if (imageData) {
      onCapture(imageData);
    }
  };

  const handleRetake = () => {
    onCapture(null);
    retake();
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    stopCamera();
  };

  const errorDetails = getCameraErrorDetails(state.error);

  return (
    <div style={{ ...styles.container, ...(className ? {} : {}) }} className={className}>
      {!state.isCaptured && <SelfieCaptureInstructions />}

      {/* Video/Preview Container */}
      <div style={styles.videoContainer}>
        {/* Live camera feed - always render to ensure ref is available */}
        <video
          ref={videoRef}
          style={{
            ...styles.video,
            display: state.isCaptured ? 'none' : 'block',
          }}
          autoPlay
          playsInline
          muted
          controls={false}
          width={width}
          height={height}
        />

        {/* Face positioning guide overlay - only show when streaming */}
        {state.isStreaming && !state.isCaptured && (
          <div style={styles.overlay}>
            <div style={styles.faceGuide} />
          </div>
        )}

        {/* Captured image preview (same canvas used for capture) */}
        <canvas
          ref={canvasRef}
          style={state.isCaptured ? styles.previewCanvas : styles.hiddenCanvas}
        />

        {/* Loading overlay */}
        {state.isLoading && (
          <div
            style={{
              ...styles.overlay,
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            <div style={styles.spinner} />
            <p style={{ ...styles.instructions, color: '#f9fafb' }}>Accessing camera...</p>
          </div>
        )}
      </div>

      {/* Canvas stays mounted to preserve captured frame */}

      <SelfieCaptureControls
        state={state}
        errorDetails={errorDetails}
        onCapture={handleCapture}
        onRetake={handleRetake}
        onCancel={handleCancel}
        onStartCamera={startCamera}
      />

      <SelfieCaptureError errorDetails={errorDetails} hasError={Boolean(state.error)} />
    </div>
  );
};

SelfieCapture.displayName = 'SelfieCapture';
