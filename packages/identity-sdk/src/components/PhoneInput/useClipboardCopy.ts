import { useState } from 'react';

/**
 * Handles transient "copied" state and clipboard errors in one place
 * to keep PhoneInput focused on rendering and phone behavior.
 */
export function useClipboardCopy() {
  const [copied, setCopied] = useState(false);

  const copyValue = async (value: string) => {
    if (!value) {
      return;
    }
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // no-op: clipboard is not available in all environments
    }
  };

  return {
    copied,
    copyValue,
  };
}
