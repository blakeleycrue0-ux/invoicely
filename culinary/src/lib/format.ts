import type { Ingredient } from '../data/dishes'

/** Scale a base quantity to the chosen servings and format it nicely. */
export function scaleQty(
  qty: number | undefined,
  baseServings: number,
  targetServings: number
): string {
  if (qty == null) return ''
  const scaled = (qty * targetServings) / baseServings
  return formatNumber(scaled)
}

/** Round sensibly and render common fractions for kitchen-friendly amounts. */
function formatNumber(n: number): string {
  const rounded = Math.round(n * 100) / 100
  const whole = Math.floor(rounded)
  const frac = rounded - whole

  const fractions: [number, string][] = [
    [0.125, '⅛'],
    [0.25, '¼'],
    [0.333, '⅓'],
    [0.5, '½'],
    [0.667, '⅔'],
    [0.75, '¾'],
  ]
  let nearest = ''
  let best = 0.06
  for (const [value, glyph] of fractions) {
    const diff = Math.abs(frac - value)
    if (diff < best) {
      best = diff
      nearest = glyph
    }
  }

  if (nearest) return whole ? `${whole}${nearest}` : nearest
  if (frac < 0.06) return String(whole)
  return String(rounded)
}

/** Render a full ingredient line for the chosen servings. */
export function ingredientLine(
  ing: Ingredient,
  baseServings: number,
  targetServings: number
): { amount: string; item: string; note?: string } {
  const amount = [scaleQty(ing.qty, baseServings, targetServings), ing.unit]
    .filter(Boolean)
    .join(' ')
    .trim()
  return { amount, item: ing.item, note: ing.note }
}

/** mm:ss for the cook-mode timers */
export function formatClock(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

/** human label for a step's timer button */
export function timerLabel(seconds: number): string {
  if (seconds % 60 === 0) return `${seconds / 60} min`
  if (seconds < 60) return `${seconds} sec`
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}m ${s}s`
}
