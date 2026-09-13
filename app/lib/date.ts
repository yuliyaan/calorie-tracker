const MONTHS_SHORT = [
  "янв",
  "фев",
  "мар",
  "апр",
  "мая",
  "июн",
  "июл",
  "авг",
  "сен",
  "окт",
  "ноя",
  "дек",
];

// Локальная дата устройства, а не UTC (toISOString даёт неверный день у полуночи в не-UTC поясах)
export function toDateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function todayKey(): string {
  return toDateKey(new Date());
}

export function yesterdayKey(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return toDateKey(d);
}

export function formatDayLabel(dateKey: string): string {
  const [y, m, d] = dateKey.split("-").map(Number);
  return `${d} ${MONTHS_SHORT[m - 1]}`;
}

// Ключи последних 30 дней, от сегодня к прошлому
export function last30Keys(): string[] {
  const keys: string[] = [];
  const now = new Date();
  for (let i = 0; i < 30; i++) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    keys.push(toDateKey(d));
  }
  return keys;
}

export function isWithinLast30Days(dateKey: string): boolean {
  return last30Keys().includes(dateKey);
}
