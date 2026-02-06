// @vitest-environment jsdom
import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useCamera } from '../useCamera';
import { CameraError } from '../types';

const createMediaStream = () => {
  const track = { stop: vi.fn() } as unknown as MediaStreamTrack;
  const stream = {
    getTracks: () => [track],
  } as MediaStream;

  return { stream, track };
};

const setMediaDevices = (value: MediaDevices | undefined) => {
  Object.defineProperty(navigator, 'mediaDevices', {
    value,
    configurable: true,
  });
};

describe('useCamera', () => {
  const originalDescriptor = Object.getOwnPropertyDescriptor(navigator, 'mediaDevices');


  beforeEach(() => {
    vi.restoreAllMocks(); //Prevent leaking into next test, reset spies/mockes to their original impl
  });

  afterEach(() => {
    if (originalDescriptor) {
      Object.defineProperty(navigator, 'mediaDevices', originalDescriptor);
    }  
  });

  it('reports not supported when getUserMedia is unavailable', async () => {
    setMediaDevices(undefined);
    const onError = vi.fn();

    const { result } = renderHook(() => useCamera(onError));

    await act(async () => {
      await result.current.startCamera();
    });

    expect(onError).toHaveBeenCalled();
    expect(onError.mock.calls[0][0].message).toBe(CameraError.NOT_SUPPORTED);
  });

  it('attaches the stream and sets streaming state', async () => {
    const { stream } = createMediaStream();

    setMediaDevices({
      getUserMedia: vi.fn().mockResolvedValue(stream),
    } as unknown as MediaDevices);

    const { result } = renderHook(() => useCamera());

    const video = document.createElement('video');
    Object.defineProperty(video, 'srcObject', {
      value: null,
      writable: true,
    });
    video.play = vi.fn().mockResolvedValue(undefined);

    result.current.videoRef.current = video;

    await act(async () => {
      await result.current.startCamera();
    });

    act(() => {
      video.dispatchEvent(new Event('canplay'));
    });

    await waitFor(() => {
      expect(result.current.state.isStreaming).toBe(true);
    });
  });

  it('stops tracks and clears the video source', async () => {
    const { stream, track } = createMediaStream();

    setMediaDevices({
      getUserMedia: vi.fn().mockResolvedValue(stream),
    } as unknown as MediaDevices);

    const { result } = renderHook(() => useCamera());

    const video = document.createElement('video');
    Object.defineProperty(video, 'srcObject', {
      value: null,
      writable: true,
    });
    video.play = vi.fn().mockResolvedValue(undefined);

    result.current.videoRef.current = video;

    await act(async () => {
      await result.current.startCamera();
    });

    act(() => {
      video.dispatchEvent(new Event('canplay'));
    });

    act(() => {
      result.current.stopCamera();
    });

    expect(track.stop).toHaveBeenCalled();
    expect(video.srcObject).toBeNull();
  });
});
