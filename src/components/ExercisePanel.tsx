import { useState } from 'react'
import type { MuscleId } from '../data/muscles'
import { MUSCLES } from '../data/muscles'
import type { Exercise, Level } from '../data/exercises'
import { exercisesForMuscle } from '../data/exercises'

const LEVELS: { id: Level | 'all'; label: string }[] = [
  { id: 'all', label: 'All levels' },
  { id: 'novice', label: 'Novice' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' },
]

const LEVEL_DOT: Record<Level, string> = {
  novice: 'bg-[var(--color-sage)]',
  intermediate: 'bg-[var(--color-gold)]',
  advanced: 'bg-[var(--color-clay)]',
}

interface ExercisePanelProps {
  muscle: MuscleId | null
  onAdd: (exercise: Exercise) => void
}

export default function ExercisePanel({ muscle, onAdd }: ExercisePanelProps) {
  const [level, setLevel] = useState<Level | 'all'>('all')
  const [expanded, setExpanded] = useState<string | null>(null)

  if (!muscle) {
    return (
      <div className="flex h-full items-center justify-center text-center px-8">
        <p className="text-[var(--color-ink-soft)] text-base">
          Select a muscle on the body to see exercises.
        </p>
      </div>
    )
  }

  const all = exercisesForMuscle(muscle)
  const list = level === 'all' ? all : all.filter((e) => e.level === level)

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 pt-6 pb-3 border-b border-[var(--color-line)]">
        <h2 className="text-2xl font-semibold text-[var(--color-ink)]">{MUSCLES[muscle].label}</h2>
        <div className="flex gap-2 mt-3 flex-wrap">
          {LEVELS.map((l) => (
            <button
              key={l.id}
              onClick={() => setLevel(l.id)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                level === l.id
                  ? 'bg-[var(--color-ink)] text-white border-[var(--color-ink)]'
                  : 'border-[var(--color-line)] text-[var(--color-ink-soft)] hover:border-[var(--color-ink)]'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
        {list.length === 0 && (
          <p className="text-sm text-[var(--color-ink-soft)] py-8 text-center">No exercises at this level yet.</p>
        )}
        {list.map((ex) => (
          <div key={ex.id} className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] overflow-hidden">
            <button
              className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left"
              onClick={() => setExpanded(expanded === ex.id ? null : ex.id)}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className={`h-2 w-2 rounded-full shrink-0 ${LEVEL_DOT[ex.level]}`} />
                <div className="min-w-0">
                  <p className="font-medium text-[var(--color-ink)] truncate">{ex.name}</p>
                  <p className="text-xs text-[var(--color-ink-soft)]">{ex.equipment} &middot; {ex.sets} sets &times; {ex.reps}</p>
                </div>
              </div>
              <svg
                className={`shrink-0 h-4 w-4 text-[var(--color-ink-soft)] transition-transform ${expanded === ex.id ? 'rotate-180' : ''}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {expanded === ex.id && (
              <div className="px-4 pb-4 pt-1 border-t border-[var(--color-line)]">
                <ul className="space-y-1.5 mb-4">
                  {ex.cues.map((cue, i) => (
                    <li key={i} className="text-sm text-[var(--color-ink-soft)] flex gap-2">
                      <span className="text-[var(--color-sage)] mt-0.5">&#8226;</span>
                      <span>{cue}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => onAdd(ex)}
                  className="w-full rounded-xl bg-[var(--color-ink)] text-white text-sm font-medium py-2.5 hover:opacity-90 transition-opacity"
                >
                  Add to workout
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
