import { Minus, Plus } from './Icons'

export default function ServingsScaler({
  servings,
  onChange,
}: {
  servings: number
  onChange: (next: number) => void
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-sm border border-smoke bg-ash px-4 py-3">
      <div>
        <div className="kicker">Servings</div>
        <div className="font-display text-lg text-cream">
          {servings} {servings === 1 ? 'serving' : 'servings'}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Fewer servings"
          onClick={() => onChange(Math.max(1, servings - 1))}
          disabled={servings <= 1}
          className="grid h-11 w-11 place-items-center rounded-full border border-smoke text-cream transition hover:border-ember/60 active:scale-90 disabled:opacity-30"
        >
          <Minus />
        </button>
        <span className="w-8 text-center font-display text-xl tabular-nums text-cream">
          {servings}
        </span>
        <button
          type="button"
          aria-label="More servings"
          onClick={() => onChange(Math.min(20, servings + 1))}
          className="grid h-11 w-11 place-items-center rounded-full border border-smoke text-cream transition hover:border-ember/60 active:scale-90"
        >
          <Plus />
        </button>
      </div>
    </div>
  )
}
