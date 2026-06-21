import { Link } from 'react-router-dom'
import { dishes } from '../data/dishes'
import { getStats, useUserData } from '../lib/storage'
import DishCard from '../components/DishCard'
import { Bookmark, Spark } from '../components/Icons'

export default function Saved() {
  const data = useUserData()
  const stats = getStats(data)
  const savedDishes = dishes.filter((d) => data.saved.includes(d.id))

  return (
    <div className="animate-fade-up">
      <div className="kicker mb-1 flex items-center gap-1.5">
        <Bookmark className="h-3.5 w-3.5" /> Your kitchen
      </div>
      <h1 className="font-display text-4xl text-cream md:text-5xl">Saved &amp; cooked</h1>

      {stats.totalCooks > 0 && (
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-saffron/40 bg-saffron/10 px-4 py-2 text-sm text-saffron">
          <Spark className="h-4 w-4" />
          {stats.streak > 0
            ? `${stats.streak}-day streak · ${stats.totalCooks} cooks logged`
            : `${stats.totalCooks} cooks logged — get a streak going!`}
        </div>
      )}

      {savedDishes.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {savedDishes.map((dish, i) => (
            <DishCard key={dish.id} dish={dish} index={i} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="mt-10 overflow-hidden rounded-sm border border-smoke bg-ash/40 p-10 text-center md:p-16">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-smoke text-ember">
        <Bookmark className="h-7 w-7" />
      </div>
      <h2 className="mt-5 font-display text-2xl text-cream">Nothing saved yet</h2>
      <p className="mx-auto mt-2 max-w-sm text-linen">
        Tap the bookmark on any dish to keep it here — your personal cookbook, ready for the next
        time you&apos;re hungry.
      </p>
      <Link to="/" className="btn-primary mt-7">
        Browse the cookbook
      </Link>
    </div>
  )
}
