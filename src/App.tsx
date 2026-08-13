import { useState } from 'react'
import BodyMap from './components/BodyMap'
import type { Gender, View } from './components/BodyMap'
import ExercisePanel from './components/ExercisePanel'
import WorkoutDrawer from './components/WorkoutDrawer'
import WorkoutGeneratorModal from './components/WorkoutGeneratorModal'
import { useWorkout } from './hooks/useWorkout'
import type { MuscleId } from './data/muscles'

function ToggleGroup<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { id: T; label: string }[]
  value: T
  onChange: (v: T) => void
}) {
  return (
    <div className="inline-flex rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] p-1">
      {options.map((o) => (
        <button
          key={o.id}
          onClick={() => onChange(o.id)}
          className={`px-4 py-1.5 text-sm rounded-full transition-colors ${
            value === o.id ? 'bg-[var(--color-ink)] text-white' : 'text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

function App() {
  const [gender, setGender] = useState<Gender>('male')
  const [view, setView] = useState<View>('front')
  const [activeMuscle, setActiveMuscle] = useState<MuscleId | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [generatorOpen, setGeneratorOpen] = useState(false)

  const workout = useWorkout()

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-[var(--color-line)] px-6 sm:px-10 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-[var(--color-ink)]">Train Yourself</h1>
          <p className="text-xs text-[var(--color-ink-soft)] mt-0.5">Tap a muscle. Get the moves.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setGeneratorOpen(true)}
            className="rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] px-4 py-2 text-sm font-medium hover:border-[var(--color-ink)] transition-colors"
          >
            Generate Workout
          </button>
          <button
            onClick={() => setDrawerOpen(true)}
            className="relative flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)] pl-4 pr-3 py-2 text-sm font-medium hover:border-[var(--color-ink)] transition-colors"
          >
            My Workout
            {workout.draft.length > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--color-clay)] text-white text-xs px-1.5">
                {workout.draft.length}
              </span>
            )}
          </button>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] max-w-6xl w-full mx-auto">
        <section className="flex flex-col items-center justify-start gap-5 px-6 py-8 border-b lg:border-b-0 lg:border-r border-[var(--color-line)]">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <ToggleGroup
              value={gender}
              onChange={setGender}
              options={[
                { id: 'male', label: 'Male' },
                { id: 'female', label: 'Female' },
              ]}
            />
            <ToggleGroup
              value={view}
              onChange={setView}
              options={[
                { id: 'front', label: 'Front' },
                { id: 'back', label: 'Back' },
              ]}
            />
          </div>

          <BodyMap gender={gender} view={view} active={activeMuscle} onSelect={setActiveMuscle} />

          <p className="text-xs text-[var(--color-ink-soft)] max-w-[280px] text-center">
            Highlighted regions are clickable. Switch views to reach muscles on the back of the body.
          </p>
        </section>

        <section className="min-h-[420px] lg:min-h-0">
          <ExercisePanel muscle={activeMuscle} onAdd={workout.addExercise} />
        </section>
      </main>

      <WorkoutDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        draft={workout.draft}
        saved={workout.saved}
        onRemove={workout.removeItem}
        onUpdate={workout.updateItem}
        onClear={workout.clearDraft}
        onSave={workout.saveWorkout}
        onDeleteSaved={workout.deleteSaved}
        onLoadSaved={workout.loadSaved}
      />

      <WorkoutGeneratorModal
        open={generatorOpen}
        onClose={() => setGeneratorOpen(false)}
        onGenerate={(exercises) => {
          workout.generateDraft(exercises)
          setGeneratorOpen(false)
          setDrawerOpen(true)
        }}
      />
    </div>
  )
}

export default App
