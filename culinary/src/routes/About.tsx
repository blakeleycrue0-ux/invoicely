import { brand } from '../lib/brand'
import { getStats, useUserData } from '../lib/storage'
import { ArrowRight, Spark } from '../components/Icons'

export default function About() {
  const data = useUserData()
  const stats = getStats(data)

  return (
    <div className="animate-fade-up">
      {/* ── header ── */}
      <section className="relative -mx-5 overflow-hidden px-5 py-12 text-center md:py-16">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-72 w-[520px] -translate-x-1/2 rounded-full bg-ember/10 blur-3xl" />
        </div>
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-ember/40 bg-ash">
          <Spark className="h-8 w-8 text-ember" />
        </div>
        <h1 className="mt-6 font-display text-4xl text-cream md:text-6xl">{brand.name}</h1>
        <p className="mt-2 text-ember">{brand.handle}</p>
        <p className="mx-auto mt-6 max-w-read text-lg leading-relaxed text-linen">{brand.about}</p>
      </section>

      {/* ── follow links — the whole point: loop people back to content ── */}
      <section className="mx-auto mt-6 max-w-read">
        <div className="kicker mb-4 text-center">Follow along</div>
        <div className="grid gap-3">
          {brand.socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between rounded-sm border border-smoke bg-ash px-5 py-4 transition hover:border-ember/60 hover:bg-ash/80"
            >
              <span>
                <span className="block font-display text-xl text-cream">{s.label}</span>
                <span className="text-sm text-muted">{s.handle}</span>
              </span>
              <span className="grid h-10 w-10 place-items-center rounded-full border border-smoke text-linen transition group-hover:border-ember group-hover:text-ember">
                <ArrowRight className="h-5 w-5" />
              </span>
            </a>
          ))}
        </div>

        <a href={brand.primaryCta.url} target="_blank" rel="noreferrer" className="btn-primary mt-6 w-full">
          {brand.primaryCta.label} <ArrowRight className="h-4 w-4" />
        </a>
      </section>

      {/* ── your progress, gently ── */}
      {stats.totalCooks > 0 && (
        <section className="mx-auto mt-12 max-w-read text-center">
          <div className="rule mb-8" />
          <p className="text-linen">
            You&apos;ve cooked{' '}
            <span className="font-display text-ember">{stats.totalCooks}</span> time
            {stats.totalCooks === 1 ? '' : 's'} across{' '}
            <span className="font-display text-ember">{stats.uniqueDishes}</span> dish
            {stats.uniqueDishes === 1 ? '' : 'es'}
            {stats.streak > 1 && (
              <>
                {' '}— on a <span className="font-display text-saffron">{stats.streak}-day</span> streak
              </>
            )}
            . Tag me when you make one. 🔥
          </p>
        </section>
      )}

      <p className="mt-16 text-center text-xs text-muted">
        Made with [YOUR BRAND NAME]. Installable — add it to your home screen.
      </p>
    </div>
  )
}
