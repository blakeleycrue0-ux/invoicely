// Intentional, gorgeous placeholder for dishes without a photo yet.
// Deterministic per dish id so each dish keeps a consistent "look".
// Reads as a moody studio shot: a warm spotlight on an empty plate.

function hash(str: string): number {
  let h = 0
  for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i)
  return Math.abs(h)
}

// a small set of warm, on-brand duotones (no purple, no SaaS pastel)
const palettes = [
  ['#2a1a12', '#f2682c'],
  ['#241a10', '#e3b04b'],
  ['#2a1410', '#ff8a4c'],
  ['#1c1a14', '#caa15a'],
  ['#2a160f', '#d8552a'],
]

export default function DishPlaceholder({
  id,
  label,
  className = '',
}: {
  id: string
  label: string
  className?: string
}) {
  const h = hash(id)
  const [dark, warm] = palettes[h % palettes.length]
  const angle = 120 + (h % 60)
  const initial = label.trim().charAt(0).toUpperCase()

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      style={{ background: `linear-gradient(${angle}deg, ${dark}, #0d0c0a)` }}
      aria-hidden
    >
      {/* warm spotlight */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(60% 50% at 50% 38%, ${warm}33, transparent 70%)`,
        }}
      />
      {/* the "plate" */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          className="grid h-28 w-28 place-items-center rounded-full md:h-36 md:w-36"
          style={{ border: `1px solid ${warm}55`, boxShadow: `0 0 60px ${warm}22` }}
        >
          <span
            className="font-display text-4xl md:text-5xl"
            style={{ color: warm }}
          >
            {initial}
          </span>
        </div>
      </div>
      {/* film grain edge vignette */}
      <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.6)]" />
    </div>
  )
}
