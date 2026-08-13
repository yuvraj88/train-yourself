import type { MuscleId } from './muscles'
import type { Equipment, Exercise, Level } from './exercises'
import { EXERCISES, LEVEL_RANK } from './exercises'

export interface WorkoutPreset {
  id: string
  label: string
  muscles: MuscleId[]
}

export const WORKOUT_PRESETS: WorkoutPreset[] = [
  { id: 'push', label: 'Push', muscles: ['chest', 'shoulders', 'triceps'] },
  { id: 'pull', label: 'Pull', muscles: ['back', 'traps', 'biceps', 'forearms'] },
  { id: 'legs', label: 'Legs', muscles: ['quads', 'hamstrings', 'glutes', 'calves'] },
  { id: 'upper', label: 'Upper Body', muscles: ['chest', 'back', 'shoulders', 'biceps', 'triceps', 'traps'] },
  { id: 'core', label: 'Core', muscles: ['abs', 'obliques', 'lower_back'] },
  { id: 'full', label: 'Full Body', muscles: ['chest', 'back', 'shoulders', 'quads', 'hamstrings', 'glutes', 'abs', 'calves'] },
]

/**
 * Picks one exercise per requested muscle: filtered to the user's equipment and to
 * exercises no harder than their selected level, preferring the closest-level match
 * and then the exercise that also works the most secondary muscles (more efficient).
 */
export function generateWorkout(muscles: MuscleId[], equipment: Set<Equipment>, level: Level): Exercise[] {
  const targetRank = LEVEL_RANK[level]
  const picks: Exercise[] = []
  const usedIds = new Set<string>()

  for (const muscle of muscles) {
    const candidates = EXERCISES.filter(
      (e) =>
        e.muscle === muscle &&
        LEVEL_RANK[e.level] <= targetRank &&
        (equipment.size === 0 || equipment.has(e.equipment)) &&
        !usedIds.has(e.id),
    )
    if (candidates.length === 0) continue

    candidates.sort((a, b) => {
      const diffA = targetRank - LEVEL_RANK[a.level]
      const diffB = targetRank - LEVEL_RANK[b.level]
      if (diffA !== diffB) return diffA - diffB
      return (b.secondary?.length ?? 0) - (a.secondary?.length ?? 0)
    })

    const pick = candidates[0]
    picks.push(pick)
    usedIds.add(pick.id)
  }

  return picks
}
