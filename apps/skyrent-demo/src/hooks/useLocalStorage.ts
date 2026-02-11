import { useEffect, useState } from 'react';

type Serializer<T> = (value: T) => string;
type Parser<T> = (value: string) => T;

const defaultSerializer = <T,>(value: T) => JSON.stringify(value);
const defaultParser = <T,>(value: string, fallback: T) => {
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

/**
 * Store state in localStorage with safe defaults and SSR guards.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options?: {
    serializer?: Serializer<T>;
    parser?: Parser<T>;
  }
) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    const item = window.localStorage.getItem(key);
    if (item === null) {
      return initialValue;
    }
    return (options?.parser ?? ((value) => defaultParser(value, initialValue)))(item);
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    window.localStorage.setItem(
      key,
      (options?.serializer ?? defaultSerializer)(storedValue)
    );
  }, [key, options?.serializer, storedValue]);

  return [storedValue, setStoredValue] as const;
}
