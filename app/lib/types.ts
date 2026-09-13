export interface FoodEntry {
  id: string;
  name: string;
  grams: number;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  fiber: number;
}

export interface Goals {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  fiber: number;
}

export interface DayRecord {
  date: string; // "YYYY-MM-DD"
  entries: FoodEntry[];
}

export interface Totals {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  fiber: number;
}

export const DEFAULT_GOALS: Goals = {
  calories: 2000,
  protein: 150,
  fat: 65,
  carbs: 250,
  fiber: 30,
};
