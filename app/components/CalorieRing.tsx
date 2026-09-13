const R = 78;
const CIRCUMFERENCE = 2 * Math.PI * R;

export default function CalorieRing({
  value,
  goal,
}: {
  value: number;
  goal: number;
}) {
  const ratio = goal > 0 ? value / goal : 0;
  const clamped = Math.min(Math.max(ratio, 0), 1);
  const dashoffset = CIRCUMFERENCE * (1 - clamped);
  const overGoal = ratio > 1;
  const percentLabel = Math.round(ratio * 100);

  return (
    <div className="flex justify-center relative mb-6">
      <svg width="180" height="180" viewBox="0 0 180 180">
        <circle
          cx="90"
          cy="90"
          r={R}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth="12"
        />
        <circle
          cx="90"
          cy="90"
          r={R}
          fill="none"
          stroke={overGoal ? "var(--color-warn)" : "var(--color-accent)"}
          strokeWidth="12"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashoffset}
          strokeLinecap="round"
          transform="rotate(-90 90 90)"
          style={{ transition: "stroke-dashoffset 0.3s ease" }}
        />
      </svg>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="text-4xl font-extrabold text-white leading-none">
          {percentLabel}%
        </div>
        <div className="text-[11px] text-[var(--color-muted)] uppercase tracking-wide mt-1">
          🔥 {value} / {goal} ккал
        </div>
      </div>
    </div>
  );
}
