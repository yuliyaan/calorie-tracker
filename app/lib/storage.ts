import Cookies from "js-cookie";
import { DayRecord, DEFAULT_GOALS, FoodEntry, Goals } from "./types";
import { isWithinLast30Days, last30Keys } from "./date";

const GOALS_KEY = "ct_goals";
const DAY_PREFIX = "ct_day_";

export function loadGoals(): Goals {
  const raw = Cookies.get(GOALS_KEY);
  if (!raw) return DEFAULT_GOALS;
  try {
    return { ...DEFAULT_GOALS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_GOALS;
  }
}

export function saveGoals(goals: Goals): void {
  Cookies.set(GOALS_KEY, JSON.stringify(goals), { expires: 365 });
}

export function loadDay(dateKey: string): FoodEntry[] {
  const raw = Cookies.get(DAY_PREFIX + dateKey);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveDay(dateKey: string, entries: FoodEntry[]): void {
  const key = DAY_PREFIX + dateKey;
  if (entries.length === 0) {
    Cookies.remove(key);
    return;
  }
  // expires: 30 — cookie сама протухнет через 30 дней после последнего изменения этого дня
  Cookies.set(key, JSON.stringify(entries), { expires: 30 });
}

export function loadHistory(): DayRecord[] {
  const all = Cookies.get(); // объект всех cookies сразу
  const days: DayRecord[] = [];

  for (const cookieName of Object.keys(all)) {
    if (!cookieName.startsWith(DAY_PREFIX)) continue;
    const dateKey = cookieName.slice(DAY_PREFIX.length);
    // защитный фильтр: показываем только дни в пределах логического окна 30 дней
    if (!isWithinLast30Days(dateKey)) continue;
    try {
      const entries = JSON.parse(all[cookieName]);
      if (Array.isArray(entries) && entries.length > 0) {
        days.push({ date: dateKey, entries });
      }
    } catch {
      // повреждённая cookie — пропускаем
    }
  }

  // сортировка от новых к старым
  days.sort((a, b) => (a.date < b.date ? 1 : -1));
  return days;
}

export { last30Keys };
