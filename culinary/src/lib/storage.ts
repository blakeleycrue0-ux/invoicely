// ─────────────────────────────────────────────────────────────────
//  All user-specific state lives in localStorage. No accounts, no
//  backend. A tiny pub/sub lets React components stay in sync via the
//  useUserData() hook below.
//
//  SUPABASE SEAM: to sync across devices later, keep this module's
//  public API (toggleSaved / toggleCooked / useUserData ...) identical
//  and swap the read/write internals for Supabase calls + auth. The UI
//  never touches localStorage directly, so nothing else changes.
// ─────────────────────────────────────────────────────────────────
import { useSyncExternalStore } from 'react'

const SAVED_KEY = 'cc:saved' // string[] of dish ids
const COOKED_KEY = 'cc:cooked' // Record<dishId, ISO date string[]>  (cook log)

export interface UserData {
  saved: string[]
  /** map of dishId -> list of YYYY-MM-DD dates it was cooked */
  cooked: Record<string, string[]>
}

// ── low-level read/write ───────────────────────────────────────────
function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage full or blocked — fail quietly */
  }
  emit()
}

// ── pub/sub so the UI re-renders on change ─────────────────────────
const listeners = new Set<() => void>()
function emit() {
  listeners.forEach((l) => l())
}
function subscribe(cb: () => void) {
  listeners.add(cb)
  // keep multiple tabs in sync too
  const onStorage = () => emit()
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(cb)
    window.removeEventListener('storage', onStorage)
  }
}

// snapshot is memoised so useSyncExternalStore doesn't loop
let snapshot: UserData = { saved: read(SAVED_KEY, []), cooked: read(COOKED_KEY, {}) }
function refreshSnapshot() {
  snapshot = { saved: read(SAVED_KEY, []), cooked: read(COOKED_KEY, {}) }
}
listeners.add(refreshSnapshot)

function getSnapshot(): UserData {
  return snapshot
}

// ── public actions ─────────────────────────────────────────────────
export function toggleSaved(id: string) {
  const saved = read<string[]>(SAVED_KEY, [])
  const next = saved.includes(id) ? saved.filter((s) => s !== id) : [...saved, id]
  write(SAVED_KEY, next)
}

export function isSaved(id: string): boolean {
  return snapshot.saved.includes(id)
}

function today(): string {
  return new Date().toISOString().slice(0, 10) // YYYY-MM-DD
}

/** Toggle whether the dish was cooked today (builds the cook log + streak). */
export function toggleCookedToday(id: string) {
  const cooked = read<Record<string, string[]>>(COOKED_KEY, {})
  const dates = cooked[id] ?? []
  const t = today()
  const next = dates.includes(t) ? dates.filter((d) => d !== t) : [...dates, t]
  write(COOKED_KEY, { ...cooked, [id]: next })
}

export function cookedToday(id: string): boolean {
  return (snapshot.cooked[id] ?? []).includes(today())
}

export function timesCooked(id: string): number {
  return (snapshot.cooked[id] ?? []).length
}

// ── derived stats for the progress / streak feel ───────────────────
export interface Stats {
  totalCooks: number
  uniqueDishes: number
  /** consecutive days (ending today or yesterday) with at least one cook */
  streak: number
}

export function getStats(data: UserData): Stats {
  const allDates = new Set<string>()
  let totalCooks = 0
  let uniqueDishes = 0
  for (const dates of Object.values(data.cooked)) {
    if (dates.length) uniqueDishes++
    totalCooks += dates.length
    dates.forEach((d) => allDates.add(d))
  }

  // walk back day-by-day from today while a cook exists
  let streak = 0
  const cursor = new Date()
  // allow the streak to "start" yesterday so it doesn't reset before today's cook
  if (!allDates.has(cursor.toISOString().slice(0, 10))) {
    cursor.setDate(cursor.getDate() - 1)
  }
  while (allDates.has(cursor.toISOString().slice(0, 10))) {
    streak++
    cursor.setDate(cursor.getDate() - 1)
  }

  return { totalCooks, uniqueDishes, streak }
}

// ── the hook the UI uses ───────────────────────────────────────────
export function useUserData(): UserData {
  return useSyncExternalStore(subscribe, getSnapshot)
}
