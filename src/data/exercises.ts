import type { MuscleId } from './muscles'

export type Level = 'novice' | 'intermediate' | 'advanced'
export type Equipment =
  | 'Bodyweight'
  | 'Dumbbell'
  | 'Barbell'
  | 'Machine'
  | 'Cable'
  | 'Band'
  | 'Kettlebell'

export interface Exercise {
  id: string
  name: string
  muscle: MuscleId
  secondary?: MuscleId[]
  equipment: Equipment
  level: Level
  sets: string
  reps: string
  cues: string[]
}

export const EXERCISES: Exercise[] = [
  // CHEST
  { id: 'pushup', name: 'Push-Up', muscle: 'chest', secondary: ['shoulders', 'triceps'], equipment: 'Bodyweight', level: 'novice', sets: '3', reps: '8-15', cues: ['Hands under shoulders', 'Body in one straight line', 'Lower chest to floor', 'Elbows ~45° from torso'] },
  { id: 'incline-db-press', name: 'Incline Dumbbell Press', muscle: 'chest', secondary: ['shoulders'], equipment: 'Dumbbell', level: 'novice', sets: '3', reps: '10-12', cues: ['Bench at 30-45°', 'Press up and slightly in', 'Control the descent', 'Keep shoulder blades pinned'] },
  { id: 'flat-bb-bench', name: 'Barbell Bench Press', muscle: 'chest', secondary: ['shoulders', 'triceps'], equipment: 'Barbell', level: 'intermediate', sets: '4', reps: '6-10', cues: ['Grip slightly wider than shoulders', 'Bar to lower chest', 'Feet planted, slight arch', 'Drive bar up and back'] },
  { id: 'cable-fly', name: 'Cable Fly', muscle: 'chest', equipment: 'Cable', level: 'intermediate', sets: '3', reps: '12-15', cues: ['Slight bend in elbows', 'Squeeze at center', 'Control the stretch back', 'Lean slightly forward'] },
  { id: 'weighted-dip', name: 'Weighted Dip', muscle: 'chest', secondary: ['triceps'], equipment: 'Bodyweight', level: 'advanced', sets: '4', reps: '6-10', cues: ['Lean torso forward', 'Lower until shoulders stretch', 'Elbows flare slightly', 'Press through to lockout'] },

  // SHOULDERS
  { id: 'band-pull-apart', name: 'Band Pull-Apart', muscle: 'shoulders', equipment: 'Band', level: 'novice', sets: '3', reps: '15-20', cues: ['Arms straight at chest height', 'Pull band to chest', 'Squeeze shoulder blades', 'Slow return'] },
  { id: 'db-shoulder-press', name: 'Dumbbell Shoulder Press', muscle: 'shoulders', secondary: ['triceps'], equipment: 'Dumbbell', level: 'novice', sets: '3', reps: '10-12', cues: ['Start at ear height', 'Press straight overhead', 'Avoid flaring ribs', 'Control the descent'] },
  { id: 'lateral-raise', name: 'Dumbbell Lateral Raise', muscle: 'shoulders', equipment: 'Dumbbell', level: 'intermediate', sets: '3', reps: '12-15', cues: ['Slight bend in elbows', 'Raise to shoulder height', 'Lead with elbows', 'No swinging'] },
  { id: 'ohp-barbell', name: 'Barbell Overhead Press', muscle: 'shoulders', secondary: ['triceps'], equipment: 'Barbell', level: 'advanced', sets: '4', reps: '5-8', cues: ['Brace core hard', 'Bar path close to face', 'Full lockout overhead', 'Glutes tight, no lean-back'] },

  // BACK
  { id: 'band-row', name: 'Band Seated Row', muscle: 'back', equipment: 'Band', level: 'novice', sets: '3', reps: '12-15', cues: ['Sit tall, chest up', 'Pull to lower ribs', 'Squeeze shoulder blades', 'Slow release'] },
  { id: 'lat-pulldown', name: 'Lat Pulldown', muscle: 'back', secondary: ['biceps'], equipment: 'Cable', level: 'novice', sets: '3', reps: '10-12', cues: ['Grip just outside shoulders', 'Pull bar to upper chest', 'Drive elbows down', 'Avoid leaning back excessively'] },
  { id: 'db-row', name: 'Single-Arm Dumbbell Row', muscle: 'back', secondary: ['biceps'], equipment: 'Dumbbell', level: 'intermediate', sets: '3', reps: '10-12', cues: ['Flat back, brace core', 'Pull elbow toward hip', 'Squeeze at top', 'Control the lowering'] },
  { id: 'pullup', name: 'Pull-Up', muscle: 'back', secondary: ['biceps'], equipment: 'Bodyweight', level: 'advanced', sets: '4', reps: '5-10', cues: ['Full dead hang start', 'Chin clears the bar', 'Drive elbows down and back', 'Avoid kipping'] },
  { id: 'bb-row', name: 'Barbell Bent-Over Row', muscle: 'back', secondary: ['biceps', 'lower_back'], equipment: 'Barbell', level: 'advanced', sets: '4', reps: '6-10', cues: ['Hinge at hips ~45°', 'Flat back throughout', 'Pull bar to lower ribs', 'No jerking the weight'] },

  // TRAPS
  { id: 'shrug-db', name: 'Dumbbell Shrug', muscle: 'traps', equipment: 'Dumbbell', level: 'novice', sets: '3', reps: '12-15', cues: ['Arms straight, relaxed', 'Lift shoulders straight up', 'Pause at the top', 'No rolling the shoulders'] },
  { id: 'face-pull', name: 'Cable Face Pull', muscle: 'traps', secondary: ['shoulders'], equipment: 'Cable', level: 'intermediate', sets: '3', reps: '12-15', cues: ['Rope to eye level', 'Pull toward face', 'Elbows high and wide', 'Squeeze rear delts and traps'] },
  { id: 'bb-shrug', name: 'Barbell Shrug', muscle: 'traps', equipment: 'Barbell', level: 'advanced', sets: '4', reps: '8-12', cues: ['Grip just outside hips', 'Elevate shoulders straight up', 'Hold peak contraction briefly', 'Controlled lowering'] },

  // LOWER BACK
  { id: 'bird-dog', name: 'Bird Dog', muscle: 'lower_back', secondary: ['abs', 'glutes'], equipment: 'Bodyweight', level: 'novice', sets: '3', reps: '10 / side', cues: ['Start on hands and knees', 'Extend opposite arm and leg', 'Keep hips level', 'Move slowly and controlled'] },
  { id: 'superman', name: 'Superman Hold', muscle: 'lower_back', secondary: ['glutes'], equipment: 'Bodyweight', level: 'novice', sets: '3', reps: '20-30s', cues: ['Lie face down, arms extended', 'Lift chest and legs together', 'Squeeze glutes and back', 'Avoid neck strain'] },
  { id: 'good-morning', name: 'Barbell Good Morning', muscle: 'lower_back', secondary: ['hamstrings', 'glutes'], equipment: 'Barbell', level: 'advanced', sets: '3', reps: '8-10', cues: ['Bar on upper traps', 'Hinge at hips, soft knees', 'Flat back throughout', 'Stop when hamstrings stretch'] },

  // BICEPS
  { id: 'band-curl', name: 'Band Bicep Curl', muscle: 'biceps', equipment: 'Band', level: 'novice', sets: '3', reps: '12-15', cues: ['Elbows pinned to sides', 'Curl through full range', 'Squeeze at the top', 'Slow negative'] },
  { id: 'db-curl', name: 'Dumbbell Bicep Curl', muscle: 'biceps', equipment: 'Dumbbell', level: 'novice', sets: '3', reps: '10-12', cues: ['Elbows stay still', 'Curl without swinging', 'Rotate palms up at top', 'Full stretch at bottom'] },
  { id: 'hammer-curl', name: 'Hammer Curl', muscle: 'biceps', secondary: ['forearms'], equipment: 'Dumbbell', level: 'intermediate', sets: '3', reps: '10-12', cues: ['Neutral grip throughout', 'Elbows fixed at sides', 'Controlled tempo', 'No shoulder swing'] },
  { id: 'bb-curl', name: 'Barbell Curl', muscle: 'biceps', equipment: 'Barbell', level: 'advanced', sets: '4', reps: '6-10', cues: ['Shoulder-width grip', 'Brace core, no swinging', 'Full range each rep', 'Squeeze hard at top'] },

  // TRICEPS
  { id: 'bench-dip', name: 'Bench Dip', muscle: 'triceps', equipment: 'Bodyweight', level: 'novice', sets: '3', reps: '10-15', cues: ['Hands on bench edge', 'Lower until 90° elbows', 'Keep elbows tucked', 'Press back up fully'] },
  { id: 'db-overhead-ext', name: 'Overhead Dumbbell Extension', muscle: 'triceps', equipment: 'Dumbbell', level: 'intermediate', sets: '3', reps: '10-12', cues: ['Elbows point forward', 'Lower behind head slowly', 'Extend fully overhead', 'Keep upper arms still'] },
  { id: 'cable-pushdown', name: 'Cable Tricep Pushdown', muscle: 'triceps', equipment: 'Cable', level: 'intermediate', sets: '3', reps: '12-15', cues: ['Elbows pinned at sides', 'Push down to full extension', 'Squeeze at the bottom', 'Control the return'] },
  { id: 'close-grip-bench', name: 'Close-Grip Bench Press', muscle: 'triceps', secondary: ['chest'], equipment: 'Barbell', level: 'advanced', sets: '4', reps: '6-10', cues: ['Hands shoulder-width', 'Elbows tucked close', 'Bar to lower chest', 'Drive up through triceps'] },

  // FOREARMS
  { id: 'wrist-curl', name: 'Dumbbell Wrist Curl', muscle: 'forearms', equipment: 'Dumbbell', level: 'novice', sets: '3', reps: '15-20', cues: ['Forearms rest on thighs', 'Curl wrists up slowly', 'Full range down', 'Light weight, high control'] },
  { id: 'farmer-carry', name: "Farmer's Carry", muscle: 'forearms', secondary: ['traps', 'abs'], equipment: 'Dumbbell', level: 'intermediate', sets: '3', reps: '30-40m', cues: ['Stand tall, shoulders back', 'Grip hard, arms straight', 'Short controlled steps', 'Avoid leaning side to side'] },
  { id: 'plate-pinch', name: 'Plate Pinch Hold', muscle: 'forearms', equipment: 'Bodyweight', level: 'advanced', sets: '3', reps: '20-30s', cues: ['Pinch plates smooth-side out', 'Arms relaxed at sides', 'Hold without dropping', 'Reset grip between sets'] },

  // ABS
  { id: 'plank', name: 'Plank', muscle: 'abs', equipment: 'Bodyweight', level: 'novice', sets: '3', reps: '20-40s', cues: ['Elbows under shoulders', 'Body in a straight line', 'Squeeze glutes and abs', 'Don\'t let hips sag'] },
  { id: 'crunch', name: 'Crunch', muscle: 'abs', equipment: 'Bodyweight', level: 'novice', sets: '3', reps: '15-20', cues: ['Knees bent, feet flat', 'Lift shoulder blades off floor', 'Exhale on the way up', 'Keep neck relaxed'] },
  { id: 'hanging-knee-raise', name: 'Hanging Knee Raise', muscle: 'abs', equipment: 'Bodyweight', level: 'intermediate', sets: '3', reps: '10-15', cues: ['Dead hang from bar', 'Raise knees toward chest', 'Avoid swinging', 'Lower with control'] },
  { id: 'cable-crunch', name: 'Cable Crunch', muscle: 'abs', equipment: 'Cable', level: 'intermediate', sets: '3', reps: '12-15', cues: ['Kneel below the cable', 'Curl spine, not just hips', 'Bring elbows to knees', 'Squeeze and slowly release'] },
  { id: 'dragon-flag', name: 'Dragon Flag', muscle: 'abs', equipment: 'Bodyweight', level: 'advanced', sets: '3', reps: '5-8', cues: ['Lie on bench, hold behind head', 'Lift body straight up from shoulders', 'Lower with total control', 'Keep body rigid throughout'] },

  // OBLIQUES
  { id: 'side-plank', name: 'Side Plank', muscle: 'obliques', equipment: 'Bodyweight', level: 'novice', sets: '3', reps: '20-30s / side', cues: ['Elbow under shoulder', 'Hips lifted, body straight', 'Don\'t let hips drop', 'Stack feet or stagger for balance'] },
  { id: 'russian-twist', name: 'Russian Twist', muscle: 'obliques', equipment: 'Bodyweight', level: 'intermediate', sets: '3', reps: '16-20', cues: ['Lean back slightly, chest up', 'Rotate from the torso', 'Feet lifted for more challenge', 'Controlled, not fast flinging'] },
  { id: 'wood-chop', name: 'Cable Wood Chop', muscle: 'obliques', equipment: 'Cable', level: 'advanced', sets: '3', reps: '10-12 / side', cues: ['Rotate from hips and torso', 'Arms stay relatively straight', 'Pivot back foot', 'Control the return rotation'] },

  // GLUTES
  { id: 'glute-bridge', name: 'Glute Bridge', muscle: 'glutes', secondary: ['hamstrings'], equipment: 'Bodyweight', level: 'novice', sets: '3', reps: '15-20', cues: ['Feet hip-width, close to hips', 'Drive through heels', 'Squeeze glutes at top', 'Avoid overarching lower back'] },
  { id: 'bw-squat', name: 'Bodyweight Squat', muscle: 'glutes', secondary: ['quads'], equipment: 'Bodyweight', level: 'novice', sets: '3', reps: '15-20', cues: ['Feet shoulder-width', 'Hips back and down', 'Knees track over toes', 'Chest stays upright'] },
  { id: 'db-hip-thrust', name: 'Dumbbell Hip Thrust', muscle: 'glutes', secondary: ['hamstrings'], equipment: 'Dumbbell', level: 'intermediate', sets: '3', reps: '10-15', cues: ['Upper back on bench', 'Drive hips up, weight on lap', 'Squeeze glutes at top', 'Chin tucked, ribs down'] },
  { id: 'bulgarian-split-squat', name: 'Bulgarian Split Squat', muscle: 'glutes', secondary: ['quads'], equipment: 'Dumbbell', level: 'advanced', sets: '3', reps: '8-12 / leg', cues: ['Rear foot elevated on bench', 'Front shin stays vertical', 'Lower until back knee near floor', 'Drive through front heel'] },
  { id: 'barbell-hip-thrust', name: 'Barbell Hip Thrust', muscle: 'glutes', secondary: ['hamstrings'], equipment: 'Barbell', level: 'advanced', sets: '4', reps: '8-12', cues: ['Bar padded over hips', 'Shoulder blades on bench edge', 'Drive hips to full extension', 'Pause and squeeze at top'] },

  // QUADS
  { id: 'wall-sit', name: 'Wall Sit', muscle: 'quads', equipment: 'Bodyweight', level: 'novice', sets: '3', reps: '20-40s', cues: ['Back flat against wall', 'Thighs parallel to floor', 'Knees over ankles', 'Breathe steadily throughout'] },
  { id: 'goblet-squat', name: 'Goblet Squat', muscle: 'quads', secondary: ['glutes'], equipment: 'Dumbbell', level: 'novice', sets: '3', reps: '10-15', cues: ['Hold weight at chest', 'Squat between the knees', 'Keep chest tall', 'Drive up through mid-foot'] },
  { id: 'leg-press', name: 'Leg Press', muscle: 'quads', secondary: ['glutes'], equipment: 'Machine', level: 'intermediate', sets: '3', reps: '10-15', cues: ['Feet shoulder-width on platform', 'Lower until knees ~90°', 'Don\'t lock knees at top', 'Keep lower back on pad'] },
  { id: 'lunge', name: 'Walking Lunge', muscle: 'quads', secondary: ['glutes'], equipment: 'Dumbbell', level: 'intermediate', sets: '3', reps: '10-12 / leg', cues: ['Long step forward', 'Both knees to ~90°', 'Torso upright', 'Push through front heel to rise'] },
  { id: 'barbell-back-squat', name: 'Barbell Back Squat', muscle: 'quads', secondary: ['glutes', 'hamstrings'], equipment: 'Barbell', level: 'advanced', sets: '4', reps: '5-8', cues: ['Bar on upper traps', 'Brace core before descending', 'Hips below knee crease', 'Drive up, chest stays proud'] },

  // HAMSTRINGS
  { id: 'db-rdl', name: 'Dumbbell Romanian Deadlift', muscle: 'hamstrings', secondary: ['glutes', 'lower_back'], equipment: 'Dumbbell', level: 'novice', sets: '3', reps: '10-12', cues: ['Soft knees, hinge at hips', 'Weights close to legs', 'Flat back throughout', 'Feel stretch, then drive hips forward'] },
  { id: 'glute-ham-raise', name: 'Lying Leg Curl', muscle: 'hamstrings', equipment: 'Machine', level: 'intermediate', sets: '3', reps: '10-15', cues: ['Hips pressed into pad', 'Curl heels toward glutes', 'Squeeze at the top', 'Lower with control'] },
  { id: 'single-leg-rdl', name: 'Single-Leg RDL', muscle: 'hamstrings', secondary: ['glutes'], equipment: 'Dumbbell', level: 'advanced', sets: '3', reps: '8-10 / leg', cues: ['Balance on one leg', 'Hinge, lifting rear leg back', 'Keep hips square', 'Controlled tempo throughout'] },
  { id: 'bb-deadlift', name: 'Barbell Deadlift', muscle: 'hamstrings', secondary: ['glutes', 'lower_back'], equipment: 'Barbell', level: 'advanced', sets: '4', reps: '4-6', cues: ['Bar over mid-foot', 'Flat back, chest up', 'Push floor away with legs', 'Bar stays close to shins'] },

  // CALVES
  { id: 'calf-raise', name: 'Standing Calf Raise', muscle: 'calves', equipment: 'Bodyweight', level: 'novice', sets: '3', reps: '15-20', cues: ['Rise onto toes fully', 'Pause at the top', 'Lower slowly past neutral', 'Use wall for balance if needed'] },
  { id: 'db-calf-raise', name: 'Dumbbell Calf Raise', muscle: 'calves', equipment: 'Dumbbell', level: 'intermediate', sets: '3', reps: '12-15', cues: ['Stand on a raised edge', 'Full stretch at the bottom', 'Drive up through the toes', 'Controlled tempo, no bouncing'] },
  { id: 'seated-calf-raise', name: 'Seated Calf Raise', muscle: 'calves', equipment: 'Machine', level: 'advanced', sets: '4', reps: '12-20', cues: ['Pads rest on lower thighs', 'Full range each rep', 'Pause and squeeze at top', 'Slow, controlled negative'] },

  // NECK
  { id: 'neck-flexion', name: 'Manual Neck Flexion', muscle: 'neck', equipment: 'Bodyweight', level: 'novice', sets: '2', reps: '10-12', cues: ['Hand on forehead for resistance', 'Nod chin toward chest', 'Resist gently through range', 'Move slowly, no jerking'] },
  { id: 'band-neck-lateral', name: 'Band Lateral Neck Flexion', muscle: 'neck', equipment: 'Band', level: 'intermediate', sets: '2', reps: '10-12 / side', cues: ['Anchor band at head height', 'Tilt head against resistance', 'Keep shoulders level', 'Return with control'] },
]

export function exercisesForMuscle(muscle: MuscleId): Exercise[] {
  return EXERCISES.filter((e) => e.muscle === muscle)
}
