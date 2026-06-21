// Inline, dependency-free icons. Stroke-based so they sit well on dark.
type P = { className?: string }
const base = 'w-5 h-5'

export const Flame = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path d="M12 3c1 3-2 4-2 7a2 2 0 1 0 4 0c0-1-.5-2-1-2.5C14 9 17 11 17 15a5 5 0 1 1-10 0c0-3 2-4 3-6 .6-1.2 1.5-3 2-6Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
  </svg>
)
export const Clock = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
)
export const Bookmark = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path d="M6 4h12v16l-6-4-6 4V4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
  </svg>
)
export const BookmarkFilled = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M6 4h12v16l-6-4-6 4V4Z"/>
  </svg>
)
export const Check = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path d="M5 12.5 10 17 19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
export const Plus = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)
export const Minus = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)
export const ArrowLeft = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
export const ArrowRight = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
export const Play = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M8 5v14l11-7L8 5Z"/>
  </svg>
)
export const Home = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path d="M4 11l8-6 8 6M6 10v9h12v-9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
export const Heart = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path d="M12 20s-7-4.3-9.3-8.6C1.2 8.4 2.7 5.5 5.6 5.5c1.9 0 3.1 1.1 3.9 2.2.8-1.1 2-2.2 3.9-2.2 2.9 0 4.4 2.9 2.9 5.9C19 15.7 12 20 12 20Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
  </svg>
)
export const User = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.6"/>
    <path d="M5 19c1.2-3.2 4-4.5 7-4.5s5.8 1.3 7 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
)
export const Spark = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M12 2l1.8 5.6L19 9l-4.6 2.2L12 17l-2.4-5.8L5 9l5.2-1.4L12 2Z"/>
  </svg>
)
export const Pause = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/>
  </svg>
)
export const Reset = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path d="M5 12a7 7 0 1 0 2-4.9M6 4v3.5h3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
export const X = ({ className = base }: P) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
)
