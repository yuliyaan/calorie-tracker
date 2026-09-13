import { FoodEntry, Totals } from "./types";

export function sumEntries(entries: FoodEntry[]): Totals {
  return entries.reduce<Totals>(
    (acc, e) => ({
      calories: acc.calories + e.calories,
      protein: acc.protein + e.protein,
      fat: acc.fat + e.fat,
      carbs: acc.carbs + e.carbs,
      fiber: acc.fiber + e.fiber,
    }),
    { calories: 0, protein: 0, fat: 0, carbs: 0, fiber: 0 }
  );
}

export function percent(value: number, goal: number): number {
  if (goal <= 0) return 0;
  return Math.round((value / goal) * 100);
}
