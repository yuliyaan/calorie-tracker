"use client";

import { useState } from "react";
import { FoodEntry } from "../lib/types";
import NumberInput from "./NumberInput";

const EMPTY = {
  name: "",
  grams: "",
  calories: "",
  protein: "",
  fat: "",
  carbs: "",
  fiber: "",
};

export default function EntryForm({
  initialValue,
  onSubmit,
  onCancel,
}: {
  initialValue?: FoodEntry;
  onSubmit: (entry: Omit<FoodEntry, "id">) => void;
  onCancel?: () => void;
}) {
  const [form, setForm] = useState(
    initialValue
      ? {
          name: initialValue.name,
          grams: String(initialValue.grams),
          calories: String(initialValue.calories),
          protein: String(initialValue.protein),
          fat: String(initialValue.fat),
          carbs: String(initialValue.carbs),
          fiber: String(initialValue.fiber),
        }
      : EMPTY
  );

  const set = (field: keyof typeof form) => (v: string) =>
    setForm((f) => ({ ...f, [field]: v }));

  const setText = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onSubmit({
      name: form.name.trim(),
      grams: Number(form.grams) || 0,
      calories: Number(form.calories) || 0,
      protein: Number(form.protein) || 0,
      fat: Number(form.fat) || 0,
      carbs: Number(form.carbs) || 0,
      fiber: Number(form.fiber) || 0,
    });
    if (!initialValue) setForm(EMPTY);
  };

  const inputClass =
    "w-full px-3.5 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] text-white text-sm placeholder:text-[var(--color-muted)] outline-none focus:border-[var(--color-accent)]";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
      <input
        className={inputClass}
        placeholder="🍽 Название блюда"
        value={form.name}
        onChange={setText("name")}
      />
      <NumberInput icon="⚖️" placeholder="Граммовка" value={form.grams} onChange={set("grams")} step={10} />
      <div className="grid grid-cols-2 gap-2.5">
        <NumberInput icon="🔥" placeholder="Ккал" value={form.calories} onChange={set("calories")} step={10} />
        <NumberInput icon="🥩" placeholder="Белки, г" value={form.protein} onChange={set("protein")} step={1} />
        <NumberInput icon="🥑" placeholder="Жиры, г" value={form.fat} onChange={set("fat")} step={1} />
        <NumberInput icon="🍞" placeholder="Углеводы, г" value={form.carbs} onChange={set("carbs")} step={1} />
      </div>
      <NumberInput icon="🌾" placeholder="Клетчатка, г" value={form.fiber} onChange={set("fiber")} step={1} />
      <div className="flex gap-2 mt-1">
        <button
          type="submit"
          className="flex-1 bg-[var(--color-accent)] text-black font-extrabold text-sm uppercase tracking-wide rounded-xl py-3 cursor-pointer"
        >
          {initialValue ? "Сохранить" : "+ Добавить"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 rounded-xl border border-[var(--color-border)] text-[var(--color-muted)] text-sm cursor-pointer"
          >
            Отмена
          </button>
        )}
      </div>
    </form>
  );
}
