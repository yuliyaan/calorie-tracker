"use client";

export default function NumberInput({
  icon,
  placeholder,
  value,
  onChange,
  step = 1,
}: {
  icon: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  step?: number;
}) {
  const numeric = Number(value) || 0;
  const setNum = (n: number) => onChange(String(Math.max(0, n)));

  return (
    <div className="flex items-stretch rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] overflow-hidden focus-within:border-[var(--color-accent)]">
      <button
        type="button"
        onClick={() => setNum(numeric - step)}
        className="px-3 text-[var(--color-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-card-alt)] text-lg leading-none cursor-pointer select-none transition-colors"
        tabIndex={-1}
      >
        −
      </button>
      <input
        className="flex-1 min-w-0 bg-transparent text-white text-sm text-center outline-none py-3 placeholder:text-[var(--color-muted)] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        type="number"
        placeholder={`${icon} ${placeholder}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        type="button"
        onClick={() => setNum(numeric + step)}
        className="px-3 text-[var(--color-muted)] hover:text-[var(--color-accent)] hover:bg-[var(--color-card-alt)] text-lg leading-none cursor-pointer select-none transition-colors"
        tabIndex={-1}
      >
        +
      </button>
    </div>
  );
}
