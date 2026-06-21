import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getDish } from '../data/dishes'
import { cookedToday, toggleCookedToday, useUserData } from '../lib/storage'
import Timer from '../components/Timer'
import { ArrowLeft, ArrowRight, Check, X } from '../components/Icons'

// THE most important screen. Full-screen, one step at a time, huge text,
// fat thumb targets, screen-stays-awake, and a timer when the step needs
// one. Built to use mid-cook with messy hands.
export default function CookMode() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  useUserData()
  const dish = getDish(id)
  const [i, setI] = useState(0)

  // keep the screen awake while cooking (progressive enhancement)
  useEffect(() => {
    let lock: { release: () => Promise<void> } | null = null
    const request = async () => {
      try {
        const wl = (navigator as Navigator & { wakeLock?: { request: (t: string) => Promise<{ release: () => Promise<void> }> } }).wakeLock
        lock = wl ? await wl.request('screen') : null
      } catch {
        /* unsupported or denied — fine */
      }
    }
    request()
    const onVisible = () => document.visibilityState === 'visible' && request()
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      document.removeEventListener('visibilitychange', onVisible)
      lock?.release().catch(() => {})
    }
  }, [])

  // keyboard arrows for testing / desktop
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setI((n) => Math.min((dish?.steps.length ?? 1) - 1, n + 1))
      if (e.key === 'ArrowLeft') setI((n) => Math.max(0, n - 1))
      if (e.key === 'Escape') navigate(`/dish/${id}`)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [dish, id, navigate])

  if (!dish) {
    return (
      <div className="grid min-h-[100dvh] place-items-center bg-char text-center">
        <div>
          <p className="font-display text-2xl text-cream">Dish not found</p>
          <Link to="/" className="btn-ghost mt-6">Back to cookbook</Link>
        </div>
      </div>
    )
  }

  const step = dish.steps[i]
  const isLast = i === dish.steps.length - 1
  const isFirst = i === 0
  const progress = ((i + 1) / dish.steps.length) * 100
  const didCookToday = cookedToday(dish.id)

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-char pt-safe">
      {/* top: progress + exit */}
      <div className="flex items-center gap-4 px-5 pt-4">
        <Link
          to={`/dish/${dish.id}`}
          aria-label="Exit cook mode"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-smoke text-cream active:scale-90"
        >
          <X />
        </Link>
        <div className="flex-1">
          <div className="flex items-center justify-between text-xs text-muted">
            <span className="truncate pr-3 font-medium text-linen">{dish.title}</span>
            <span className="tabular-nums">
              Step {i + 1}/{dish.steps.length}
            </span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-smoke">
            <div
              className="h-full rounded-full bg-ember transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* center: the one big step */}
      <div className="flex flex-1 flex-col justify-center overflow-y-auto px-6 py-8">
        <div key={i} className="mx-auto w-full max-w-2xl animate-fade-up">
          <div className="kicker mb-4">Step {i + 1}</div>
          <p className="font-display text-3xl leading-[1.18] text-cream sm:text-4xl md:text-5xl">
            {step.text}
          </p>

          {step.seconds && (
            <div className="mt-8">
              <Timer seconds={step.seconds} />
            </div>
          )}
        </div>
      </div>

      {/* bottom: fat nav targets */}
      <div className="border-t border-smoke bg-soot/90 px-5 pt-4 pad-safe-b backdrop-blur-md">
        <div className="mx-auto flex max-w-2xl items-center gap-3">
          <button
            type="button"
            onClick={() => setI((n) => Math.max(0, n - 1))}
            disabled={isFirst}
            className="flex h-16 flex-1 items-center justify-center gap-2 rounded-2xl border border-smoke text-lg font-semibold text-cream transition active:scale-95 disabled:opacity-30"
          >
            <ArrowLeft className="h-6 w-6" /> Back
          </button>

          {isLast ? (
            <button
              type="button"
              onClick={() => {
                if (!didCookToday) toggleCookedToday(dish.id)
                navigate(`/dish/${dish.id}`)
              }}
              className="flex h-16 flex-[1.4] items-center justify-center gap-2 rounded-2xl bg-saffron text-lg font-semibold text-char transition active:scale-95"
            >
              <Check className="h-6 w-6" /> Done — I cooked it
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setI((n) => Math.min(dish.steps.length - 1, n + 1))}
              className="flex h-16 flex-[1.4] items-center justify-center gap-2 rounded-2xl bg-ember text-lg font-semibold text-char transition active:scale-95"
            >
              Next <ArrowRight className="h-6 w-6" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
