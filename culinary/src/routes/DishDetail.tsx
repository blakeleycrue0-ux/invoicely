import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getDish } from '../data/dishes'
import {
  cookedToday,
  isSaved,
  timesCooked,
  toggleCookedToday,
  toggleSaved,
  useUserData,
} from '../lib/storage'
import DishPlaceholder from '../components/DishPlaceholder'
import VideoEmbed from '../components/VideoEmbed'
import TechniqueNote from '../components/TechniqueNote'
import ServingsScaler from '../components/ServingsScaler'
import IngredientList from '../components/IngredientList'
import {
  ArrowLeft,
  Bookmark,
  BookmarkFilled,
  Check,
  Clock,
  Flame,
  Play,
} from '../components/Icons'

export default function DishDetail() {
  const { id = '' } = useParams()
  useUserData()
  const dish = getDish(id)
  const [servings, setServings] = useState(dish?.servings ?? 2)

  if (!dish) {
    return (
      <div className="py-24 text-center">
        <p className="font-display text-2xl text-cream">Dish not found</p>
        <Link to="/" className="btn-ghost mt-6">
          <ArrowLeft className="h-4 w-4" /> Back to cookbook
        </Link>
      </div>
    )
  }

  const saved = isSaved(dish.id)
  const didCookToday = cookedToday(dish.id)
  const cooks = timesCooked(dish.id)
  const timedSteps = dish.steps.filter((s) => s.seconds).length

  return (
    <article className="animate-fade-up">
      <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-sm text-linen hover:text-cream">
        <ArrowLeft className="h-4 w-4" /> Cookbook
      </Link>

      {/* ── hero ── */}
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        <div className="frame aspect-[4/5] overflow-hidden rounded-sm md:aspect-square">
          {dish.image ? (
            <img src={dish.image} alt={dish.title} className="h-full w-full object-cover" />
          ) : (
            <DishPlaceholder id={dish.id} label={dish.title} />
          )}
        </div>

        <div>
          <div className="flex flex-wrap gap-2">
            {dish.tags?.map((t) => (
              <span key={t} className="rounded-full border border-smoke px-3 py-1 text-xs text-muted">
                {t}
              </span>
            ))}
          </div>

          <h1 className="mt-4 font-display text-4xl leading-[1.02] tracking-tightest text-cream md:text-5xl">
            {dish.title}
          </h1>
          <p className="mt-3 max-w-read text-lg leading-relaxed text-linen">{dish.blurb}</p>

          <div className="mt-5 flex items-center gap-5 text-sm text-linen">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-muted" /> {dish.minutes} min
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Flame className="h-4 w-4 text-ember" /> {dish.difficulty}
            </span>
            {cooks > 0 && (
              <span className="inline-flex items-center gap-1.5 text-saffron">
                <Check className="h-4 w-4" /> Cooked ×{cooks}
              </span>
            )}
          </div>

          {/* actions */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link to={`/cook/${dish.id}`} className="btn-primary">
              <Play className="h-4 w-4" /> Enter Cook Mode
            </Link>
            <button
              type="button"
              onClick={() => toggleSaved(dish.id)}
              className="btn-ghost"
              aria-pressed={saved}
            >
              {saved ? <BookmarkFilled className="h-4 w-4 text-ember" /> : <Bookmark className="h-4 w-4" />}
              {saved ? 'Saved' : 'Save'}
            </button>
            <button
              type="button"
              onClick={() => toggleCookedToday(dish.id)}
              aria-pressed={didCookToday}
              className={`btn ${
                didCookToday
                  ? 'bg-saffron text-char'
                  : 'border border-smoke bg-ash/40 text-cream hover:border-saffron/60'
              }`}
            >
              <Check className="h-4 w-4" /> {didCookToday ? 'Cooked today' : 'I cooked this'}
            </button>
          </div>
        </div>
      </div>

      {/* ── video ── */}
      <section className="mt-14">
        <div className="kicker mb-3">Watch it made</div>
        <VideoEmbed url={dish.videoUrl} title={dish.title} />
      </section>

      {/* ── technique (the differentiator) ── */}
      <section className="mt-14">
        <TechniqueNote technique={dish.technique} />
      </section>

      {/* ── ingredients + steps ── */}
      <div className="mt-14 grid gap-12 md:grid-cols-[minmax(0,360px)_1fr]">
        <section>
          <h2 className="mb-4 font-display text-2xl text-cream">Ingredients</h2>
          <div className="mb-4">
            <ServingsScaler servings={servings} onChange={setServings} />
          </div>
          <IngredientList dish={dish} servings={servings} />
        </section>

        <section>
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="font-display text-2xl text-cream">Method</h2>
            <span className="text-sm text-muted">
              {dish.steps.length} steps{timedSteps > 0 && ` · ${timedSteps} timed`}
            </span>
          </div>
          <ol className="space-y-5">
            {dish.steps.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ember/40 font-display text-lg text-ember">
                  {i + 1}
                </span>
                <div className="pt-1">
                  <p className="leading-relaxed text-cream">{step.text}</p>
                  {step.seconds && (
                    <span className="mt-1.5 inline-flex items-center gap-1.5 text-sm text-saffron">
                      <Clock className="h-3.5 w-3.5" /> timed step
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ol>

          <Link to={`/cook/${dish.id}`} className="btn-primary mt-8">
            <Play className="h-4 w-4" /> Cook this hands-free
          </Link>
        </section>
      </div>
    </article>
  )
}
