import { useEffect, useRef, useState } from 'react';
import { CameraError, CameraState } from './types';

interface UseCameraReturn {
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  state: CameraState;
  startCamera: () => Promise<void>;
  stopCamera: () => void;
  captureImage: () => string | null;
  retake: () => void;
}

export const useCamera = (
  onError?: (error: Error) => void
): UseCameraReturn => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [state, setState] = useState<CameraState>({
    isLoading: false,
    isStreaming: false,
    isCaptured: false,
    error: null,
  });

  const handleError = (message: string) => {
    setState((prev) => ({ ...prev, error: message, isLoading: false }));
    if (onError) {
      onError(new Error(message));
    }
  };

  const startCamera = async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    // Check if getUserMedia is supported
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      handleError(CameraError.NOT_SUPPORTED);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user', // Front camera
        },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream; // selfnote: CONNECT the media stream from getUserMedia to my video element to play the live camera feed
        
        // Add event listener for when video can play
        const handleCanPlay = () => {
          setState({
            isLoading: false,
            isStreaming: true,
            isCaptured: false,
            error: null,
          });
        };

        videoRef.current.addEventListener('canplay', handleCanPlay, { once: true });

        try {
          await videoRef.current.play();
        } catch (playError) {
          // Still try to set streaming state even if play fails
          setState({
            isLoading: false,
            isStreaming: true,
            isCaptured: false,
            error: null,
          });
        }
      } else {
        handleError('Video element not found');
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
          handleError(CameraError.PERMISSION_DENIED);
        } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
          handleError(CameraError.NOT_FOUND);
        } else {
          handleError(CameraError.GENERIC);
        }
      } else {
        handleError(CameraError.GENERIC);
      }
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setState({
      isLoading: false,
      isStreaming: false,
      isCaptured: false,
      error: null,
    });
  };

  const captureImage = (): string | null => {
    if (!videoRef.current || !canvasRef.current) {
      return null;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) {
      return null;
    }

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the current video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert the canvas to a base64 encoded image data URL
    const imageData = canvas.toDataURL('image/jpeg', 0.92); 

    setState((prev) => ({ ...prev, isCaptured: true, isStreaming: false }));x

    return imageData;
  };

  const retake = () => {
    setState((prev) => ({ ...prev, isCaptured: false, isStreaming: true }));
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return {
    videoRef,
    canvasRef,
    state,
    startCamera,
    stopCamera,
    captureImage,
    retake,
  };
};
