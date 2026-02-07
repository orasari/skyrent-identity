export const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
  },
  row: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '1rem',
  },
  field: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.35rem',
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: '#374151',
  },
  input: {
    borderRadius: '0.5rem',
    border: '1px solid #d1d5db',
    padding: '0.55rem 0.75rem',
    fontSize: '0.875rem',
    color: '#111827',
  },
  inputError: {
    borderColor: '#dc2626',
  },
  select: {
    borderRadius: '0.5rem',
    border: '1px solid #d1d5db',
    padding: '0.55rem 0.75rem',
    fontSize: '0.875rem',
    color: '#111827',
    backgroundColor: '#ffffff',
  },
  helper: {
    fontSize: '0.75rem',
    color: '#6b7280',
  },
  error: {
    fontSize: '0.75rem',
    color: '#dc2626',
  },
};
