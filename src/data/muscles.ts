export type MuscleId =
  | 'neck'
  | 'traps'
  | 'shoulders'
  | 'chest'
  | 'back'
  | 'lower_back'
  | 'biceps'
  | 'triceps'
  | 'forearms'
  | 'abs'
  | 'obliques'
  | 'glutes'
  | 'quads'
  | 'hamstrings'
  | 'calves'

export interface MuscleInfo {
  id: MuscleId
  label: string
  view: 'front' | 'back' | 'both'
}

export const MUSCLES: Record<MuscleId, MuscleInfo> = {
  neck: { id: 'neck', label: 'Neck', view: 'both' },
  traps: { id: 'traps', label: 'Trapezius', view: 'back' },
  shoulders: { id: 'shoulders', label: 'Shoulders', view: 'both' },
  chest: { id: 'chest', label: 'Chest', view: 'front' },
  back: { id: 'back', label: 'Back', view: 'back' },
  lower_back: { id: 'lower_back', label: 'Lower Back', view: 'back' },
  biceps: { id: 'biceps', label: 'Biceps', view: 'front' },
  triceps: { id: 'triceps', label: 'Triceps', view: 'back' },
  forearms: { id: 'forearms', label: 'Forearms', view: 'both' },
  abs: { id: 'abs', label: 'Abs', view: 'front' },
  obliques: { id: 'obliques', label: 'Obliques', view: 'front' },
  glutes: { id: 'glutes', label: 'Glutes', view: 'back' },
  quads: { id: 'quads', label: 'Quadriceps', view: 'front' },
  hamstrings: { id: 'hamstrings', label: 'Hamstrings', view: 'back' },
  calves: { id: 'calves', label: 'Calves', view: 'both' },
}
