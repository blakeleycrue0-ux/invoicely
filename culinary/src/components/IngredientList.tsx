import { useState } from 'react'
import type { Dish } from '../data/dishes'
import { ingredientLine } from '../lib/format'

// Ingredient list with tap-to-check-off (purely local UI state — handy
// while shopping/prepping). Quantities react to the servings scaler.
export default function IngredientList({
  dish,
  servings,
}: {
  dish: Dish
  servings: number
}) {
  const [checked, setChecked] = useState<Set<number>>(new Set())

  const toggle = (i: number) =>
    setChecked((prev) => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })

  return (
    <ul className="divide-y divide-smoke">
      {dish.ingredients.map((ing, i) => {
        const { amount, item, note } = ingredientLine(ing, dish.servings, servings)
        const isOn = checked.has(i)
        return (
          <li key={i}>
            <button
              type="button"
              onClick={() => toggle(i)}
              className="flex w-full items-baseline gap-4 py-3.5 text-left transition active:bg-smoke/40"
            >
              <span
                className={`grid h-6 w-6 shrink-0 translate-y-0.5 place-items-center rounded-full border text-[11px] transition ${
                  isOn
                    ? 'border-ember bg-ember text-char'
                    : 'border-smoke text-transparent'
                }`}
                aria-hidden
              >
                ✓
              </span>
              <span
                className={`min-w-[4.5rem] shrink-0 font-display text-lg tabular-nums ${
                  isOn ? 'text-muted line-through' : 'text-ember'
                }`}
              >
                {amount || '—'}
              </span>
              <span className={`flex-1 leading-snug ${isOn ? 'text-muted line-through' : 'text-cream'}`}>
                {item}
                {note && <span className="block text-sm text-muted no-underline">{note}</span>}
              </span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
