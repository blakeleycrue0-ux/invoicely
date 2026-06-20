import { Link, NavLink, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'
import { brand } from '../lib/brand'
import { Home as HomeIcon, Bookmark, User } from './Icons'

const tabs = [
  { to: '/', label: 'Cook', icon: HomeIcon, end: true },
  { to: '/saved', label: 'Saved', icon: Bookmark, end: false },
  { to: '/about', label: 'Follow', icon: User, end: false },
]

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()

  return (
    <div className="min-h-[100dvh]">
      {/* ── top bar ── */}
      <header className="sticky top-0 z-40 border-b border-smoke/70 bg-char/80 backdrop-blur-md pt-safe">
        <div className="mx-auto flex h-16 max-w-page items-center justify-between px-5">
          <Link to="/" className="group flex items-baseline gap-2">
            <span className="font-display text-xl font-semibold tracking-tightest text-cream transition group-hover:text-white md:text-2xl">
              {brand.name}
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {tabs.map((t) => (
              <NavLink
                key={t.to}
                to={t.to}
                end={t.end}
                className={({ isActive }) =>
                  `text-sm font-medium transition ${
                    isActive ? 'text-ember' : 'text-linen hover:text-cream'
                  }`
                }
              >
                {t.label}
              </NavLink>
            ))}
            <a href={brand.primaryCta.url} target="_blank" rel="noreferrer" className="btn-primary">
              {brand.primaryCta.label}
            </a>
          </nav>

          <span className="font-sans text-sm text-muted md:hidden">{brand.handle}</span>
        </div>
      </header>

      {/* ── content ── */}
      <main className="mx-auto max-w-page px-5 pb-28 pt-6 md:pb-16">{children}</main>

      {/* ── mobile bottom tab bar ── */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-smoke bg-soot/95 backdrop-blur-md pad-safe-b md:hidden">
        <div className="mx-auto flex max-w-page items-stretch justify-around">
          {tabs.map((t) => {
            const active = t.end ? pathname === t.to : pathname.startsWith(t.to)
            const Icon = t.icon
            return (
              <NavLink
                key={t.to}
                to={t.to}
                className={`flex flex-1 flex-col items-center gap-1 pt-3 text-[11px] font-medium transition ${
                  active ? 'text-ember' : 'text-muted'
                }`}
              >
                <Icon className={`h-6 w-6 ${active ? 'text-ember' : 'text-linen'}`} />
                {t.label}
              </NavLink>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
