"use client";

import { useState } from "react";
import { FoodEntry } from "../lib/types";
import EntryForm from "./EntryForm";

export default function EntryList({
  entries,
  onEdit,
  onDelete,
}: {
  entries: FoodEntry[];
  onEdit: (id: string, entry: Omit<FoodEntry, "id">) => void;
  onDelete: (id: string) => void;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);

  if (entries.length === 0) {
    return (
      <p className="text-sm text-[var(--color-muted)] py-2">
        Пока ничего не добавлено
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {entries.map((entry) => {
        if (editingId === entry.id) {
          return (
            <div
              key={entry.id}
              className="bg-[var(--color-card-alt)] border border-[var(--color-border)] rounded-xl p-3"
            >
              <EntryForm
                initialValue={entry}
                onSubmit={(updated) => {
                  onEdit(entry.id, updated);
                  setEditingId(null);
                }}
                onCancel={() => setEditingId(null)}
              />
            </div>
          );
        }

        return (
          <div
            key={entry.id}
            className="flex items-center justify-between gap-2 bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl px-4 py-3"
          >
            <div className="min-w-0 flex-1">
              <div className="text-white text-sm font-semibold truncate">
                {entry.name}
              </div>
              <div className="text-[var(--color-muted)] text-xs mt-0.5 break-words">
                {entry.grams} г · 🔥{entry.calories} · 🥩{entry.protein} · 🥑
                {entry.fat} · 🍞{entry.carbs} · 🌾{entry.fiber}
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => setEditingId(entry.id)}
                className="text-xs text-[var(--color-muted)] hover:text-white px-2 py-1 cursor-pointer"
              >
                ✏️
              </button>
              <button
                onClick={() => onDelete(entry.id)}
                className="text-xs text-[var(--color-danger)] hover:opacity-80 px-2 py-1 cursor-pointer"
              >
                🗑
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
