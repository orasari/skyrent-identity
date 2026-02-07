export const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: '#374151',
  },
  helper: {
    fontSize: '0.75rem',
    color: '#6b7280',
  },
  row: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
  },
  select: {
    width: '13.75rem',
    borderRadius: '0.5rem',
    border: '1px solid #d1d5db',
    backgroundColor: '#ffffff',
    padding: '0.5rem 0.75rem',
    fontSize: '0.875rem',
    color: '#374151',
  },
  input: {
    flex: 1,
    borderRadius: '0.5rem',
    border: '1px solid #d1d5db',
    padding: '0.5rem 0.75rem',
    fontSize: '0.875rem',
    color: '#374151',
  },
  inputError: {
    borderColor: '#dc2626',
  },
  selectError: {
    borderColor: '#dc2626',
  },
  hint: {
    fontSize: '0.75rem',
    color: '#6b7280',
  },
  error: {
    fontSize: '0.75rem',
    color: '#dc2626',
  },
  resultPanel: {
    border: '1px solid #e5e7eb',
    borderRadius: '0.75rem',
    backgroundColor: '#f9fafb',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.5rem',
  },
  resultRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '0.75rem',
  },
  resultLabel: {
    fontSize: '0.75rem',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.04em',
    color: '#6b7280',
  },
  resultValue: {
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    fontSize: '0.95rem',
    color: '#111827',
  },
  resultValueMuted: {
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    fontSize: '0.95rem',
    color: '#9ca3af',
  },
  resultMeta: {
    fontSize: '0.75rem',
    color: '#6b7280',
  },
  copyButton: {
    border: '1px solid #d1d5db',
    borderRadius: '0.5rem',
    padding: '0.35rem 0.6rem',
    fontSize: '0.75rem',
    fontWeight: 600,
    color: '#1f2937',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
  },
  copyButtonDisabled: {
    cursor: 'not-allowed',
    color: '#9ca3af',
    backgroundColor: '#f3f4f6',
  },
};

export const css = `
.skyrent-phone-input__row {
  display: flex;
  gap: 8px;
}

.skyrent-phone-input__select,
.skyrent-phone-input__input {
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.skyrent-phone-input__select:focus,
.skyrent-phone-input__input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
}

.skyrent-phone-input__select:disabled,
.skyrent-phone-input__input:disabled {
  background-color: #f3f4f6;
  cursor: not-allowed;
}

.skyrent-phone-input__copy:hover {
  background-color: #f3f4f6;
}

@media (max-width: 640px) {
  .skyrent-phone-input__row {
    flex-direction: column;
  }

  .skyrent-phone-input__select {
    width: 100%;
  }
}
`;
