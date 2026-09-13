"use client";

import { useState } from "react";
import { DayRecord, FoodEntry } from "../lib/types";
import { sumEntries } from "../lib/calc";
import { formatDayLabel } from "../lib/date";
import EntryList from "./EntryList";
import EntryForm from "./EntryForm";

export default function HistoryList({
  history,
  onEditEntry,
  onDeleteEntry,
  onAddEntry,
}: {
  history: DayRecord[];
  onEditEntry: (dateKey: string, id: string, entry: Omit<FoodEntry, "id">) => void;
  onDeleteEntry: (dateKey: string, id: string) => void;
  onAddEntry: (dateKey: string, entry: Omit<FoodEntry, "id">) => void;
}) {
  const [openDate, setOpenDate] = useState<string | null>(null);
  const [addingFor, setAddingFor] = useState<string | null>(null);

  if (history.length === 0) {
    return (
      <p className="text-sm text-[var(--color-muted)] py-2">
        История пока пуста
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {history.map((day) => {
        const totals = sumEntries(day.entries);
        const isOpen = openDate === day.date;
        return (
          <div key={day.date}>
            <button
              onClick={() => {
                setOpenDate(isOpen ? null : day.date);
                if (isOpen) setAddingFor(null);
              }}
              className="w-full bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-left cursor-pointer"
            >
              <div className="text-white text-sm font-semibold">
                {formatDayLabel(day.date)}
              </div>
              <div className="text-[var(--color-muted)] text-xs mt-0.5 break-words">
                🔥{totals.calories} · 🥩{totals.protein} · 🥑{totals.fat} · 🍞
                {totals.carbs} · 🌾{totals.fiber}
              </div>
            </button>
            {isOpen && (
              <div className="pl-2 pt-2 pb-1 flex flex-col gap-2">
                <EntryList
                  entries={day.entries}
                  onEdit={(id, entry) => onEditEntry(day.date, id, entry)}
                  onDelete={(id) => onDeleteEntry(day.date, id)}
                />
                {addingFor === day.date ? (
                  <div className="bg-[var(--color-card-alt)] border border-[var(--color-border)] rounded-xl p-3 mt-1">
                    <EntryForm
                      onSubmit={(entry) => {
                        onAddEntry(day.date, entry);
                        setAddingFor(null);
                      }}
                      onCancel={() => setAddingFor(null)}
                    />
                  </div>
                ) : (
                  <button
                    onClick={() => setAddingFor(day.date)}
                    className="text-xs text-[var(--color-accent)] hover:opacity-80 py-2 text-left cursor-pointer"
                  >
                    + Добавить запись за этот день
                  </button>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
