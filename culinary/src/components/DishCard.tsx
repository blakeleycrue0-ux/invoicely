import { Link } from 'react-router-dom'
import type { Dish } from '../data/dishes'
import { isSaved, toggleSaved, timesCooked, useUserData } from '../lib/storage'
import DishPlaceholder from './DishPlaceholder'
import { Bookmark, BookmarkFilled, Clock, Flame, Check } from './Icons'

const diffColor: Record<Dish['difficulty'], string> = {
  Easy: 'text-saffron',
  Medium: 'text-ember-glow',
  Pro: 'text-ember',
}

export default function DishCard({ dish, index = 0 }: { dish: Dish; index?: number }) {
  useUserData() // subscribe so save/cook state stays live
  const saved = isSaved(dish.id)
  const cooks = timesCooked(dish.id)

  return (
    <Link
      to={`/dish/${dish.id}`}
      className="group block animate-fade-up"
      style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
    >
      <article className="frame transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-lift">
        {/* image */}
        <div className="relative aspect-[4/5] overflow-hidden">
          {dish.image ? (
            <img
              src={dish.image}
              alt={dish.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <DishPlaceholder id={dish.id} label={dish.title} className="transition-transform duration-700 group-hover:scale-105" />
          )}

          {/* gradient so text/badges read on any image */}
          <div className="absolute inset-0 bg-gradient-to-t from-char via-char/10 to-transparent" />

          {/* save button — big tap target */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              toggleSaved(dish.id)
            }}
            aria-label={saved ? 'Remove from saved' : 'Save dish'}
            className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full bg-char/70 text-cream backdrop-blur-sm transition hover:bg-char active:scale-90"
          >
            {saved ? <BookmarkFilled className="h-5 w-5 text-ember" /> : <Bookmark />}
          </button>

          {cooks > 0 && (
            <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-saffron/90 px-2.5 py-1 text-xs font-semibold text-char">
              <Check className="h-3.5 w-3.5" /> Cooked{cooks > 1 ? ` ×${cooks}` : ''}
            </span>
          )}

          {/* title sits over the image bottom, editorial-style */}
          <div className="absolute inset-x-0 bottom-0 p-4">
            <h3 className="font-display text-xl leading-tight text-cream md:text-2xl">
              {dish.title}
            </h3>
          </div>
        </div>

        {/* meta strip */}
        <div className="flex items-center gap-4 px-4 py-3 text-sm text-linen">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-muted" /> {dish.minutes}m
          </span>
          <span className={`inline-flex items-center gap-1.5 ${diffColor[dish.difficulty]}`}>
            <Flame className="h-4 w-4" /> {dish.difficulty}
          </span>
        </div>
      </article>
    </Link>
  )
}
