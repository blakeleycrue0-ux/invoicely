import type { Technique } from '../data/dishes'
import { Spark } from './Icons'

// THE differentiator. Designed to interrupt the page and feel like a
// hand-written margin note from someone who actually knows the move.
export default function TechniqueNote({ technique }: { technique: Technique }) {
  return (
    <aside className="relative overflow-hidden rounded-sm border border-ember/40 bg-gradient-to-br from-ash to-soot p-6 shadow-glow md:p-8">
      {/* ember edge bar */}
      <div className="absolute inset-y-0 left-0 w-1.5 bg-ember" />

      <div className="flex items-center gap-2 pl-2">
        <Spark className="h-4 w-4 text-ember" />
        <span className="kicker">The Technique</span>
      </div>

      <h3 className="mt-3 pl-2 font-display text-2xl leading-snug text-cream md:text-[1.75rem]">
        {technique.title}
      </h3>

      <p className="mt-3 max-w-read pl-2 text-[1.05rem] leading-relaxed text-linen">
        {technique.body}
      </p>

      <p className="mt-5 pl-2 text-xs uppercase tracking-kicker text-muted">
        The thing home cooks don&apos;t know
      </p>
    </aside>
  )
}
