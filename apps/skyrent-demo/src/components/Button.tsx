type ButtonProps = {
  label: string;
  onClick: () => void;
  type?: 'button' | 'submit' | 'reset';
};

export function Button({ label, onClick, type = 'button' }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
    >
      {label}
    </button>
  );
}
