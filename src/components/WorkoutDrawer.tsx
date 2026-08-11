import { useState } from 'react'
import type { WorkoutItem, SavedWorkout } from '../hooks/useWorkout'

interface WorkoutDrawerProps {
  open: boolean
  onClose: () => void
  draft: WorkoutItem[]
  saved: SavedWorkout[]
  onRemove: (key: string) => void
  onUpdate: (key: string, patch: Partial<Pick<WorkoutItem, 'sets' | 'reps'>>) => void
  onClear: () => void
  onSave: (name: string) => void
  onDeleteSaved: (id: string) => void
  onLoadSaved: (id: string) => void
}

export default function WorkoutDrawer({
  open,
  onClose,
  draft,
  saved,
  onRemove,
  onUpdate,
  onClear,
  onSave,
  onDeleteSaved,
  onLoadSaved,
}: WorkoutDrawerProps) {
  const [name, setName] = useState('')

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-[1px] transition-opacity z-40 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-[var(--color-paper)] border-l border-[var(--color-line)] z-50 flex flex-col transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-line)]">
          <h2 className="text-lg font-semibold">My Workout</h2>
          <button onClick={onClose} className="text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]" aria-label="Close">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {draft.length === 0 ? (
            <p className="text-sm text-[var(--color-ink-soft)] text-center py-10">
              No exercises yet. Pick a muscle and add exercises to build your workout.
            </p>
          ) : (
            <div className="space-y-3">
              {draft.map((item) => (
                <div key={item.key} className="rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-3">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium text-sm text-[var(--color-ink)]">{item.exercise.name}</p>
                    <button onClick={() => onRemove(item.key)} className="text-[var(--color-ink-soft)] hover:text-[var(--color-clay)] shrink-0">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex gap-3 mt-2">
                    <label className="flex items-center gap-1.5 text-xs text-[var(--color-ink-soft)]">
                      Sets
                      <input
                        value={item.sets}
                        onChange={(e) => onUpdate(item.key, { sets: e.target.value })}
                        className="w-12 rounded-md border border-[var(--color-line)] bg-transparent px-1.5 py-1 text-[var(--color-ink)]"
                      />
                    </label>
                    <label className="flex items-center gap-1.5 text-xs text-[var(--color-ink-soft)]">
                      Reps
                      <input
                        value={item.reps}
                        onChange={(e) => onUpdate(item.key, { reps: e.target.value })}
                        className="w-16 rounded-md border border-[var(--color-line)] bg-transparent px-1.5 py-1 text-[var(--color-ink)]"
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          )}

          {saved.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-[var(--color-ink-soft)] mb-2">Saved workouts</h3>
              <div className="space-y-2">
                {saved.map((w) => (
                  <div key={w.id} className="flex items-center justify-between rounded-lg border border-[var(--color-line)] px-3 py-2">
                    <button onClick={() => onLoadSaved(w.id)} className="text-sm text-left text-[var(--color-ink)] hover:text-[var(--color-sage)]">
                      {w.name} <span className="text-[var(--color-ink-soft)]">&middot; {w.items.length} exercises</span>
                    </button>
                    <button onClick={() => onDeleteSaved(w.id)} className="text-[var(--color-ink-soft)] hover:text-[var(--color-clay)]">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {draft.length > 0 && (
          <div className="border-t border-[var(--color-line)] px-6 py-4 space-y-2">
            <div className="flex gap-2">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name this workout"
                className="flex-1 rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-sage)]"
              />
              <button
                onClick={() => {
                  if (name.trim()) {
                    onSave(name.trim())
                    setName('')
                  }
                }}
                className="rounded-lg bg-[var(--color-sage)] text-white text-sm font-medium px-4 hover:opacity-90"
              >
                Save
              </button>
            </div>
            <button onClick={onClear} className="w-full text-xs text-[var(--color-ink-soft)] hover:text-[var(--color-clay)] py-1">
              Clear current workout
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
