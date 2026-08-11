import { useEffect, useState } from 'react'
import type { Exercise } from '../data/exercises'

export interface WorkoutItem {
  key: string
  exercise: Exercise
  sets: string
  reps: string
}

export interface SavedWorkout {
  id: string
  name: string
  items: WorkoutItem[]
  createdAt: number
}

const DRAFT_KEY = 'ty_draft_workout'
const SAVED_KEY = 'ty_saved_workouts'

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export function useWorkout() {
  const [draft, setDraft] = useState<WorkoutItem[]>(() => load(DRAFT_KEY, []))
  const [saved, setSaved] = useState<SavedWorkout[]>(() => load(SAVED_KEY, []))

  useEffect(() => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft))
  }, [draft])

  useEffect(() => {
    localStorage.setItem(SAVED_KEY, JSON.stringify(saved))
  }, [saved])

  function addExercise(exercise: Exercise) {
    setDraft((d) => [
      ...d,
      { key: `${exercise.id}-${Date.now()}`, exercise, sets: exercise.sets, reps: exercise.reps },
    ])
  }

  function removeItem(key: string) {
    setDraft((d) => d.filter((i) => i.key !== key))
  }

  function updateItem(key: string, patch: Partial<Pick<WorkoutItem, 'sets' | 'reps'>>) {
    setDraft((d) => d.map((i) => (i.key === key ? { ...i, ...patch } : i)))
  }

  function clearDraft() {
    setDraft([])
  }

  function saveWorkout(name: string) {
    if (draft.length === 0) return
    const workout: SavedWorkout = { id: `w-${Date.now()}`, name, items: draft, createdAt: Date.now() }
    setSaved((s) => [workout, ...s])
    clearDraft()
  }

  function deleteSaved(id: string) {
    setSaved((s) => s.filter((w) => w.id !== id))
  }

  function loadSaved(id: string) {
    const w = saved.find((s) => s.id === id)
    if (w) setDraft(w.items)
  }

  return { draft, saved, addExercise, removeItem, updateItem, clearDraft, saveWorkout, deleteSaved, loadSaved }
}
