"use client";

import { useEffect, useState } from "react";
import { DayRecord, FoodEntry, Goals } from "./lib/types";
import { sumEntries } from "./lib/calc";
import { todayKey, yesterdayKey, formatDayLabel } from "./lib/date";
import {
  loadGoals,
  saveGoals,
  loadDay,
  saveDay,
  loadHistory,
} from "./lib/storage";
import CalorieRing from "./components/CalorieRing";
import StatCard from "./components/StatCard";
import EntryForm from "./components/EntryForm";
import EntryList from "./components/EntryList";
import GoalsForm from "./components/GoalsForm";
import HistoryChart from "./components/HistoryChart";
import HistoryList from "./components/HistoryList";

export default function Home() {
  const [ready, setReady] = useState(false);
  const [goals, setGoals] = useState<Goals>({
    calories: 2000,
    protein: 150,
    fat: 65,
    carbs: 250,
    fiber: 30,
  });
  const [todayEntries, setTodayEntries] = useState<FoodEntry[]>([]);
  const [history, setHistory] = useState<DayRecord[]>([]);
  const [editingGoals, setEditingGoals] = useState(false);

  const today = todayKey();

  useEffect(() => {
    setGoals(loadGoals());
    setTodayEntries(loadDay(today));
    setHistory(loadHistory());
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Единый мутатор: применяет updater к записям нужного дня, сохраняет в cookies, обновляет state.
  // Работает и для дня, которого ещё нет в history (например, добавляем первую запись за вчера).
  function updateDay(dateKey: string, updater: (entries: FoodEntry[]) => FoodEntry[]) {
    if (dateKey === today) {
      const next = updater(todayEntries);
      setTodayEntries(next);
      saveDay(dateKey, next);
      return;
    }
    setHistory((prev) => {
      const existing = prev.find((d) => d.date === dateKey);
      const currentEntries = existing ? existing.entries : loadDay(dateKey);
      const nextEntries = updater(currentEntries);
      saveDay(dateKey, nextEntries);

      if (nextEntries.length === 0) {
        return prev.filter((d) => d.date !== dateKey);
      }
      if (existing) {
        return prev.map((d) =>
          d.date === dateKey ? { ...d, entries: nextEntries } : d
        );
      }
      // новый день — добавляем и пересортировываем (новые сверху)
      return [...prev, { date: dateKey, entries: nextEntries }].sort((a, b) =>
        a.date < b.date ? 1 : -1
      );
    });
  }

  function addEntryToDay(dateKey: string, entry: Omit<FoodEntry, "id">) {
    updateDay(dateKey, (entries) => [
      ...entries,
      { ...entry, id: crypto.randomUUID() },
    ]);
  }

  function addTodayEntry(entry: Omit<FoodEntry, "id">) {
    addEntryToDay(today, entry);
  }

  function editEntry(dateKey: string, id: string, updated: Omit<FoodEntry, "id">) {
    updateDay(dateKey, (entries) =>
      entries.map((e) => (e.id === id ? { ...updated, id } : e))
    );
  }

  function deleteEntry(dateKey: string, id: string) {
    updateDay(dateKey, (entries) => entries.filter((e) => e.id !== id));
  }

  function handleSaveGoals(newGoals: Goals) {
    setGoals(newGoals);
    saveGoals(newGoals);
    setEditingGoals(false);
  }

  const totals = sumEntries(todayEntries);

  if (!ready) return null;

  return (
    <div className="min-h-screen bg-black px-4 py-8 flex justify-center">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-5">
          <div className="text-[11px] text-[var(--color-muted)] uppercase tracking-wide">
            Сегодня · {formatDayLabel(today)}
          </div>
          <button
            onClick={() => setEditingGoals((v) => !v)}
            className="text-xs text-[var(--color-muted)] hover:text-white cursor-pointer"
          >
            🎯 Цель
          </button>
        </div>

        {editingGoals && (
          <GoalsForm
            goals={goals}
            onSave={handleSaveGoals}
            onCancel={() => setEditingGoals(false)}
          />
        )}

        <div className="bg-[var(--color-card-alt)] border border-[var(--color-border)] rounded-2xl p-6 mb-6">
          <CalorieRing value={totals.calories} goal={goals.calories} />
          <div className="flex gap-2.5">
            <StatCard icon="🥩" value={totals.protein} goal={goals.protein} unit="г" label="Белки" />
            <StatCard icon="🥑" value={totals.fat} goal={goals.fat} unit="г" label="Жиры" />
            <StatCard icon="🍞" value={totals.carbs} goal={goals.carbs} unit="г" label="Углеводы" />
            <StatCard icon="🌾" value={totals.fiber} goal={goals.fiber} unit="г" label="Клетчатка" />
          </div>
        </div>

        <div className="bg-[var(--color-card-alt)] border border-[var(--color-border)] rounded-2xl p-4 mb-6">
          <EntryForm onSubmit={addTodayEntry} />
        </div>

        <div className="mb-8">
          <div className="text-[11px] text-[var(--color-muted)] uppercase tracking-wide mb-3">
            Записи сегодня
          </div>
          <EntryList
            entries={todayEntries}
            onEdit={(id, entry) => editEntry(today, id, entry)}
            onDelete={(id) => deleteEntry(today, id)}
          />
        </div>

        <HistoryChart history={history} />

        <div>
          <div className="text-[11px] text-[var(--color-muted)] uppercase tracking-wide mb-3">
            История за 30 дней
          </div>
          <HistoryList
            history={history}
            onEditEntry={editEntry}
            onDeleteEntry={deleteEntry}
            onAddEntry={addEntryToDay}
          />
        </div>
      </div>
    </div>
  );
}
