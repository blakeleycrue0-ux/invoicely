import { dishes } from '../data/dishes'
import { brand } from '../lib/brand'
import { getStats, useUserData } from '../lib/storage'
import DishCard from '../components/DishCard'
import { Flame, Spark, ArrowRight } from '../components/Icons'

export default function Home() {
  const data = useUserData()
  const stats = getStats(data)
  const hasProgress = stats.totalCooks > 0

  return (
    <div>
      {/* ── HERO ── creator world, not a utility ── */}
      <section className="relative -mx-5 mb-12 overflow-hidden px-5 pb-12 pt-10 md:pb-20 md:pt-16">
        {/* ambient ember light */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[420px] w-[620px] -translate-x-1/2 rounded-full bg-ember/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-smoke bg-ash/60 px-4 py-1.5">
            <Spark className="h-3.5 w-3.5 text-ember" />
            <span className="text-xs font-medium tracking-wide text-linen">{brand.handle}</span>
          </div>

          <h1 className="font-display text-5xl font-semibold leading-[0.95] tracking-tightest text-cream md:text-7xl">
            Cook the dishes,
            <br />
            <span className="italic text-ember">learn the move.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-linen">
            {brand.tagline}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="#feed" className="btn-primary">
              Start cooking <ArrowRight className="h-4 w-4" />
            </a>
            <a href={brand.primaryCta.url} target="_blank" rel="noreferrer" className="btn-ghost">
              {brand.primaryCta.label}
            </a>
          </div>
        </div>

        {/* progress / streak — only once there's something to show */}
        {hasProgress && (
          <div className="mx-auto mt-12 grid max-w-lg grid-cols-3 gap-3">
            <Stat label="Day streak" value={stats.streak} accent />
            <Stat label="Dishes cooked" value={stats.uniqueDishes} />
            <Stat label="Total cooks" value={stats.totalCooks} />
          </div>
        )}
      </section>

      {/* ── FEED ── */}
      <section id="feed" className="scroll-mt-20">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <div className="kicker mb-1 flex items-center gap-1.5">
              <Flame className="h-3.5 w-3.5" /> The Cookbook
            </div>
            <h2 className="font-display text-3xl text-cream md:text-4xl">Everything to make</h2>
          </div>
          <span className="text-sm text-muted">{dishes.length} dishes</span>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {dishes.map((dish, i) => (
            <DishCard key={dish.id} dish={dish} index={i} />
          ))}
        </div>
      </section>
    </div>
  )
}

function Stat({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className="rounded-sm border border-smoke bg-ash/60 px-4 py-4 text-center">
      <div className={`font-display text-3xl ${accent ? 'text-ember' : 'text-cream'}`}>{value}</div>
      <div className="mt-1 text-[11px] uppercase tracking-kicker text-muted">{label}</div>
    </div>
  )
}
