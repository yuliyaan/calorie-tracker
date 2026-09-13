export default function StatCard({
  icon,
  value,
  unit,
  label,
  goal,
}: {
  icon: string;
  value: number;
  unit: string;
  label: string;
  goal?: number;
}) {
  const showGoal = typeof goal === "number" && goal > 0;

  return (
    <div className="flex-1 bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl py-3.5 px-2 text-center">
      <div className="text-xl mb-1.5">{icon}</div>
      <b className="block text-xl text-white font-bold leading-tight">
        {value}
      </b>
      <span className="block text-[10px] text-[var(--color-muted)] leading-tight mb-1">
        {showGoal ? `из ${goal} ${unit}` : " "}
      </span>
      <span className="text-[10px] text-white/40 tracking-wide uppercase">
        {label}
      </span>
    </div>
  );
}
