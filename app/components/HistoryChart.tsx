import { DayRecord } from "../lib/types";
import { sumEntries } from "../lib/calc";
import { last30Keys } from "../lib/date";

const WIDTH = 320;
const HEIGHT = 80;

export default function HistoryChart({ history }: { history: DayRecord[] }) {
  const byDate = new Map(history.map((d) => [d.date, sumEntries(d.entries).calories]));
  const days = last30Keys().reverse(); // старые слева, сегодня справа
  const values = days.map((key) => byDate.get(key) ?? 0);

  const max = Math.max(...values, 1);
  const min = 0;

  const points = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * WIDTH;
      const y = HEIGHT - ((v - min) / (max - min || 1)) * HEIGHT;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-4 mb-4">
      <div className="text-[11px] text-[var(--color-muted)] uppercase tracking-wide mb-3">
        Динамика калорий · 30 дней
      </div>
      <svg width="100%" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio="none">
        <polyline
          points={points}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
