import { CSSProperties } from 'react';

export const styles: Record<string, CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    padding: '1.5rem',
    backgroundColor: '#f9fafb',
    borderRadius: '0.75rem',
    border: '1px solid #e5e7eb',
    maxWidth: '640px',
    margin: '0 auto',
  },
  videoContainer: {
    position: 'relative',
    width: '100%',
    maxWidth: '640px',
    aspectRatio: '4/3',
    backgroundColor: '#000',
    borderRadius: '0.5rem',
    overflow: 'hidden',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  },
  video: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  canvas: {
    display: 'none',
  },
  previewCanvas: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    borderRadius: '0.5rem',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
  },
  faceGuide: {
    width: '60%',
    aspectRatio: '3/4',
    border: '3px solid rgba(255, 255, 255, 0.8)',
    borderRadius: '50%',
    boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
  },
  controls: {
    display: 'flex',
    gap: '0.75rem',
    width: '100%',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  button: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    fontWeight: 600,
    borderRadius: '0.5rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  primaryButton: {
    backgroundColor: '#2563eb',
    color: '#ffffff',
  },
  secondaryButton: {
    backgroundColor: '#6b7280',
    color: '#ffffff',
  },
  successButton: {
    backgroundColor: '#16a34a',
    color: '#ffffff',
  },
  errorContainer: {
    width: '100%',
    padding: '1rem',
    backgroundColor: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '0.5rem',
    color: '#991b1b',
    textAlign: 'center',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    padding: '3rem',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #e5e7eb',
    borderTop: '4px solid #2563eb',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  instructions: {
    textAlign: 'center',
    color: '#4b5563',
    fontSize: '0.875rem',
    lineHeight: '1.5',
  },
  hiddenCanvas: {
    display: 'none',
  },
};

// CSS keyframe animation injected globally
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(styleSheet);
}
