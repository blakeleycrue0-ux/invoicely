/** @type {import('tailwindcss').Config} */
// ── Midnight Kitchen ──────────────────────────────────────────────
// Dark, moody, premium, photo-forward. One warm ember accent + a gold
// for "cooked"/streak moments. No SaaS white, no purple. Light is used
// like a spotlight on food, not as decorative gradients.
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // warm near-blacks (never pure #000) → depth without coldness
        char: '#0d0c0a', // page background
        soot: '#141210', // base surface
        ash: '#1c1916', // raised surface / cards
        smoke: '#2a2622', // hairlines, hover

        // warm off-whites for type
        cream: '#f4ede3', // primary text
        linen: '#cabfae', // secondary text
        muted: '#8a8073', // tertiary / meta

        // the single warm accent + supporting gold
        ember: {
          DEFAULT: '#f2682c', // primary accent (CTAs, technique, timers)
          deep: '#c44d18',
          glow: '#ff8a4c',
        },
        saffron: '#e3b04b', // "cooked" / streak / highlights
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        kicker: '0.22em',
      },
      maxWidth: {
        page: '1180px',
        read: '720px',
      },
      boxShadow: {
        lift: '0 18px 50px -20px rgba(0,0,0,0.85)',
        glow: '0 0 0 1px rgba(242,104,44,0.35), 0 12px 40px -12px rgba(242,104,44,0.4)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-ring': {
          '0%': { boxShadow: '0 0 0 0 rgba(242,104,44,0.45)' },
          '70%': { boxShadow: '0 0 0 18px rgba(242,104,44,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(242,104,44,0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both',
        'pulse-ring': 'pulse-ring 1.6s ease-out infinite',
      },
    },
  },
  plugins: [],
}
