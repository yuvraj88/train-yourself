import { useState } from 'react'
import type { MuscleId } from '../data/muscles'
import { MUSCLES } from '../data/muscles'
import type { Equipment, Exercise, Level } from '../data/exercises'
import { WORKOUT_PRESETS, generateWorkout } from '../data/workoutGenerator'

const ALL_EQUIPMENT: Equipment[] = ['Bodyweight', 'Dumbbell', 'Barbell', 'Machine', 'Cable', 'Band', 'Kettlebell']
const LEVELS: { id: Level; label: string }[] = [
  { id: 'novice', label: 'Novice' },
  { id: 'intermediate', label: 'Intermediate' },
  { id: 'advanced', label: 'Advanced' },
]
const ALL_MUSCLES = Object.values(MUSCLES)

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
        active
          ? 'bg-[var(--color-ink)] text-white border-[var(--color-ink)]'
          : 'border-[var(--color-line)] text-[var(--color-ink-soft)] hover:border-[var(--color-ink)]'
      }`}
    >
      {children}
    </button>
  )
}

interface WorkoutGeneratorModalProps {
  open: boolean
  onClose: () => void
  onGenerate: (exercises: Exercise[]) => void
}

export default function WorkoutGeneratorModal({ open, onClose, onGenerate }: WorkoutGeneratorModalProps) {
  const [presetId, setPresetId] = useState<string>('full')
  const [customMuscles, setCustomMuscles] = useState<Set<MuscleId>>(new Set())
  const [equipment, setEquipment] = useState<Set<Equipment>>(new Set())
  const [level, setLevel] = useState<Level>('novice')

  if (!open) return null

  const isCustom = presetId === 'custom'
  const muscles = isCustom ? Array.from(customMuscles) : (WORKOUT_PRESETS.find((p) => p.id === presetId)?.muscles ?? [])

  const toggleEquipment = (eq: Equipment) => {
    setEquipment((prev) => {
      const next = new Set(prev)
      if (next.has(eq)) next.delete(eq)
      else next.add(eq)
      return next
    })
  }

  const toggleMuscle = (m: MuscleId) => {
    setCustomMuscles((prev) => {
      const next = new Set(prev)
      if (next.has(m)) next.delete(m)
      else next.add(m)
      return next
    })
  }

  const handleGenerate = () => {
    if (muscles.length === 0) return
    const exercises = generateWorkout(muscles, equipment, level)
    onGenerate(exercises)
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/20 backdrop-blur-[1px] z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md max-h-[85vh] overflow-y-auto rounded-2xl bg-[var(--color-paper)] border border-[var(--color-line)] shadow-xl">
          <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-line)]">
            <h2 className="text-lg font-semibold">Generate a Workout</h2>
            <button onClick={onClose} className="text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]" aria-label="Close">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="px-6 py-5 space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-ink-soft)] mb-2">Target</p>
              <div className="flex flex-wrap gap-2">
                {WORKOUT_PRESETS.map((p) => (
                  <Chip key={p.id} active={presetId === p.id} onClick={() => setPresetId(p.id)}>
                    {p.label}
                  </Chip>
                ))}
                <Chip active={isCustom} onClick={() => setPresetId('custom')}>
                  Custom
                </Chip>
              </div>
              {isCustom && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {ALL_MUSCLES.map((m) => (
                    <Chip key={m.id} active={customMuscles.has(m.id)} onClick={() => toggleMuscle(m.id)}>
                      {m.label}
                    </Chip>
                  ))}
                </div>
              )}
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-ink-soft)] mb-2">Equipment available</p>
              <div className="flex flex-wrap gap-2">
                <Chip active={equipment.size === 0} onClick={() => setEquipment(new Set())}>
                  All equipment
                </Chip>
                {ALL_EQUIPMENT.map((eq) => (
                  <Chip key={eq} active={equipment.has(eq)} onClick={() => toggleEquipment(eq)}>
                    {eq}
                  </Chip>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-ink-soft)] mb-2">Experience level</p>
              <div className="flex flex-wrap gap-2">
                {LEVELS.map((l) => (
                  <Chip key={l.id} active={level === l.id} onClick={() => setLevel(l.id)}>
                    {l.label}
                  </Chip>
                ))}
              </div>
            </div>
          </div>

          <div className="px-6 pb-6">
            <button
              onClick={handleGenerate}
              disabled={muscles.length === 0}
              className="w-full rounded-xl bg-[var(--color-ink)] text-white text-sm font-medium py-3 hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Generate Workout
            </button>
            {isCustom && muscles.length === 0 && (
              <p className="text-xs text-[var(--color-ink-soft)] text-center mt-2">Pick at least one muscle group.</p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
