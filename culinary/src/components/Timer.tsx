import { useEffect, useRef, useState } from 'react'
import { formatClock, timerLabel } from '../lib/format'
import { Pause, Play, Reset } from './Icons'

// Built-in step timer for Cook Mode. Big, glanceable, beeps + buzzes
// when done so you don't have to watch it with messy hands.
export default function Timer({ seconds }: { seconds: number }) {
  const [remaining, setRemaining] = useState(seconds)
  const [running, setRunning] = useState(false)
  const [done, setDone] = useState(false)
  const tick = useRef<number | null>(null)

  // reset whenever the step (its duration) changes
  useEffect(() => {
    setRemaining(seconds)
    setRunning(false)
    setDone(false)
  }, [seconds])

  useEffect(() => {
    if (!running) return
    tick.current = window.setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          window.clearInterval(tick.current!)
          setRunning(false)
          setDone(true)
          alarm()
          return 0
        }
        return r - 1
      })
    }, 1000)
    return () => {
      if (tick.current) window.clearInterval(tick.current)
    }
  }, [running])

  const pct = seconds > 0 ? ((seconds - remaining) / seconds) * 100 : 0

  return (
    <div
      className={`rounded-2xl border p-5 transition-colors ${
        done ? 'border-saffron bg-saffron/10' : 'border-ember/40 bg-ash'
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="kicker">{done ? "Time's up" : `Timer · ${timerLabel(seconds)}`}</span>
        {done && <span className="animate-pulse text-sm font-semibold text-saffron">●  Ready</span>}
      </div>

      <div className="mt-2 flex items-center justify-between gap-4">
        <div
          className={`font-display text-6xl tabular-nums leading-none ${
            done ? 'text-saffron' : 'text-cream'
          }`}
        >
          {formatClock(remaining)}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Reset timer"
            onClick={() => {
              setRemaining(seconds)
              setRunning(false)
              setDone(false)
            }}
            className="grid h-14 w-14 place-items-center rounded-full border border-smoke text-cream active:scale-90"
          >
            <Reset className="h-6 w-6" />
          </button>
          <button
            type="button"
            aria-label={running ? 'Pause timer' : 'Start timer'}
            onClick={() => {
              if (done) {
                setRemaining(seconds)
                setDone(false)
              }
              setRunning((r) => !r)
            }}
            className={`grid h-16 w-16 place-items-center rounded-full text-char active:scale-90 ${
              running ? 'bg-cream' : 'bg-ember animate-pulse-ring'
            }`}
          >
            {running ? <Pause className="h-7 w-7" /> : <Play className="h-7 w-7" />}
          </button>
        </div>
      </div>

      {/* progress bar */}
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-smoke">
        <div
          className={`h-full rounded-full transition-all duration-500 ${done ? 'bg-saffron' : 'bg-ember'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

// short, friendly alarm using Web Audio + vibration. No assets needed.
function alarm() {
  try {
    navigator.vibrate?.([200, 100, 200])
  } catch {
    /* ignore */
  }
  try {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    const ctx = new Ctx()
    const beep = (start: number, freq: number) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.frequency.value = freq
      osc.type = 'sine'
      osc.connect(gain)
      gain.connect(ctx.destination)
      gain.gain.setValueAtTime(0.001, ctx.currentTime + start)
      gain.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + start + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + 0.35)
      osc.start(ctx.currentTime + start)
      osc.stop(ctx.currentTime + start + 0.36)
    }
    beep(0, 880)
    beep(0.4, 1175)
    beep(0.8, 880)
    setTimeout(() => ctx.close(), 1500)
  } catch {
    /* audio blocked — vibration/visual is enough */
  }
}
