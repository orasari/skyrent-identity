interface StartOverActionProps {
  onStartOver: () => void;
}

export function StartOverAction({ onStartOver }: StartOverActionProps) {
  return (
    <div className="flex items-center justify-end gap-3">
      <button
        type="button"
        onClick={onStartOver}
        className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
      >
        Start Over
      </button>
    </div>
  );
}
