"use client";

import { useState } from "react";
import { Goals } from "../lib/types";
import NumberInput from "./NumberInput";

export default function GoalsForm({
  goals,
  onSave,
  onCancel,
}: {
  goals: Goals;
  onSave: (goals: Goals) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({
    calories: String(goals.calories),
    protein: String(goals.protein),
    fat: String(goals.fat),
    carbs: String(goals.carbs),
    fiber: String(goals.fiber),
  });

  const set = (field: keyof typeof form) => (v: string) =>
    setForm((f) => ({ ...f, [field]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      calories: Number(form.calories) || 0,
      protein: Number(form.protein) || 0,
      fat: Number(form.fat) || 0,
      carbs: Number(form.carbs) || 0,
      fiber: Number(form.fiber) || 0,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[var(--color-card-alt)] border border-[var(--color-border)] rounded-2xl p-4 mb-6 flex flex-col gap-2.5"
    >
      <div className="text-[11px] text-[var(--color-muted)] uppercase tracking-wide mb-1">
        Суточная цель
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        <label className="text-xs text-[var(--color-muted)] flex flex-col gap-1">
          🔥 Ккал
          <NumberInput icon="" placeholder="" value={form.calories} onChange={set("calories")} step={50} />
        </label>
        <label className="text-xs text-[var(--color-muted)] flex flex-col gap-1">
          🥩 Белки, г
          <NumberInput icon="" placeholder="" value={form.protein} onChange={set("protein")} step={5} />
        </label>
        <label className="text-xs text-[var(--color-muted)] flex flex-col gap-1">
          🥑 Жиры, г
          <NumberInput icon="" placeholder="" value={form.fat} onChange={set("fat")} step={5} />
        </label>
        <label className="text-xs text-[var(--color-muted)] flex flex-col gap-1">
          🍞 Углеводы, г
          <NumberInput icon="" placeholder="" value={form.carbs} onChange={set("carbs")} step={5} />
        </label>
      </div>
      <label className="text-xs text-[var(--color-muted)] flex flex-col gap-1">
        🌾 Клетчатка, г
        <NumberInput icon="" placeholder="" value={form.fiber} onChange={set("fiber")} step={1} />
      </label>
      <div className="flex gap-2 mt-1">
        <button
          type="submit"
          className="flex-1 bg-[var(--color-accent)] text-black font-extrabold text-sm uppercase tracking-wide rounded-xl py-3 cursor-pointer"
        >
          Сохранить цель
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 rounded-xl border border-[var(--color-border)] text-[var(--color-muted)] text-sm cursor-pointer"
        >
          Отмена
        </button>
      </div>
    </form>
  );
}
