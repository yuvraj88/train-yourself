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

export const LEVEL_RANK: Record<Level, number> = { novice: 0, intermediate: 1, advanced: 2 }

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
  mistakes: string[]
}

export const EXERCISES: Exercise[] = [
  // CHEST
  { id: 'pushup', name: 'Push-Up', muscle: 'chest', secondary: ['shoulders', 'triceps'], equipment: 'Bodyweight', level: 'novice', sets: '3', reps: '8-15', cues: ['Hands under shoulders', 'Body in one straight line', 'Lower chest to floor', 'Elbows ~45° from torso'], mistakes: ['Hips sagging or piking up', 'Flaring elbows straight out to the sides'] },
  { id: 'incline-db-press', name: 'Incline Dumbbell Press', muscle: 'chest', secondary: ['shoulders'], equipment: 'Dumbbell', level: 'novice', sets: '3', reps: '10-12', cues: ['Bench at 30-45°', 'Press up and slightly in', 'Control the descent', 'Keep shoulder blades pinned'], mistakes: ['Bench angle too steep, becomes a shoulder press', 'Bouncing the weights off the chest'] },
  { id: 'flat-bb-bench', name: 'Barbell Bench Press', muscle: 'chest', secondary: ['shoulders', 'triceps'], equipment: 'Barbell', level: 'intermediate', sets: '4', reps: '6-10', cues: ['Grip slightly wider than shoulders', 'Bar to lower chest', 'Feet planted, slight arch', 'Drive bar up and back'], mistakes: ['Bouncing the bar off the chest', 'Flaring elbows to a full 90°'] },
  { id: 'cable-fly', name: 'Cable Fly', muscle: 'chest', equipment: 'Cable', level: 'intermediate', sets: '3', reps: '12-15', cues: ['Slight bend in elbows', 'Squeeze at center', 'Control the stretch back', 'Lean slightly forward'], mistakes: ['Turning it into a press by bending elbows too much', 'Using too much weight and losing the stretch'] },
  { id: 'weighted-dip', name: 'Weighted Dip', muscle: 'chest', secondary: ['triceps'], equipment: 'Bodyweight', level: 'advanced', sets: '4', reps: '6-10', cues: ['Lean torso forward', 'Lower until shoulders stretch', 'Elbows flare slightly', 'Press through to lockout'], mistakes: ['Going too deep and straining the shoulder', 'Staying upright, which shifts load off the chest'] },

  // SHOULDERS
  { id: 'band-pull-apart', name: 'Band Pull-Apart', muscle: 'shoulders', equipment: 'Band', level: 'novice', sets: '3', reps: '15-20', cues: ['Arms straight at chest height', 'Pull band to chest', 'Squeeze shoulder blades', 'Slow return'], mistakes: ['Bending the elbows instead of keeping arms straight', 'Using momentum instead of a controlled pull'] },
  { id: 'db-shoulder-press', name: 'Dumbbell Shoulder Press', muscle: 'shoulders', secondary: ['triceps'], equipment: 'Dumbbell', level: 'novice', sets: '3', reps: '10-12', cues: ['Start at ear height', 'Press straight overhead', 'Avoid flaring ribs', 'Control the descent'], mistakes: ['Arching the lower back to press', 'Pressing the dumbbells too far forward'] },
  { id: 'lateral-raise', name: 'Dumbbell Lateral Raise', muscle: 'shoulders', equipment: 'Dumbbell', level: 'intermediate', sets: '3', reps: '12-15', cues: ['Slight bend in elbows', 'Raise to shoulder height', 'Lead with elbows', 'No swinging'], mistakes: ['Using momentum to swing the weight up', 'Raising above shoulder height and shrugging'] },
  { id: 'ohp-barbell', name: 'Barbell Overhead Press', muscle: 'shoulders', secondary: ['triceps'], equipment: 'Barbell', level: 'advanced', sets: '4', reps: '5-8', cues: ['Brace core hard', 'Bar path close to face', 'Full lockout overhead', 'Glutes tight, no lean-back'], mistakes: ['Leaning back excessively to press', 'Not fully locking out overhead'] },

  // BACK
  { id: 'band-row', name: 'Band Seated Row', muscle: 'back', equipment: 'Band', level: 'novice', sets: '3', reps: '12-15', cues: ['Sit tall, chest up', 'Pull to lower ribs', 'Squeeze shoulder blades', 'Slow release'], mistakes: ['Rounding the back to pull farther', 'Pulling with arms only, not the shoulder blades'] },
  { id: 'lat-pulldown', name: 'Lat Pulldown', muscle: 'back', secondary: ['biceps'], equipment: 'Cable', level: 'novice', sets: '3', reps: '10-12', cues: ['Grip just outside shoulders', 'Pull bar to upper chest', 'Drive elbows down', 'Avoid leaning back excessively'], mistakes: ['Leaning back too far and turning it into a row', 'Pulling behind the neck'] },
  { id: 'db-row', name: 'Single-Arm Dumbbell Row', muscle: 'back', secondary: ['biceps'], equipment: 'Dumbbell', level: 'intermediate', sets: '3', reps: '10-12', cues: ['Flat back, brace core', 'Pull elbow toward hip', 'Squeeze at top', 'Control the lowering'], mistakes: ['Rotating the torso to help lift the weight', 'Yanking the weight with momentum'] },
  { id: 'pullup', name: 'Pull-Up', muscle: 'back', secondary: ['biceps'], equipment: 'Bodyweight', level: 'advanced', sets: '4', reps: '5-10', cues: ['Full dead hang start', 'Chin clears the bar', 'Drive elbows down and back', 'Avoid kipping'], mistakes: ['Using leg kip to swing up', 'Only doing half reps, not reaching a full hang'] },
  { id: 'bb-row', name: 'Barbell Bent-Over Row', muscle: 'back', secondary: ['biceps', 'lower_back'], equipment: 'Barbell', level: 'advanced', sets: '4', reps: '6-10', cues: ['Hinge at hips ~45°', 'Flat back throughout', 'Pull bar to lower ribs', 'No jerking the weight'], mistakes: ['Rounding the lower back under load', 'Standing too upright, reducing lat involvement'] },

  // TRAPS
  { id: 'shrug-db', name: 'Dumbbell Shrug', muscle: 'traps', equipment: 'Dumbbell', level: 'novice', sets: '3', reps: '12-15', cues: ['Arms straight, relaxed', 'Lift shoulders straight up', 'Pause at the top', 'No rolling the shoulders'], mistakes: ['Rolling the shoulders instead of a straight shrug', 'Using the biceps to help lift'] },
  { id: 'face-pull', name: 'Cable Face Pull', muscle: 'traps', secondary: ['shoulders'], equipment: 'Cable', level: 'intermediate', sets: '3', reps: '12-15', cues: ['Rope to eye level', 'Pull toward face', 'Elbows high and wide', 'Squeeze rear delts and traps'], mistakes: ['Pulling low toward the chest instead of the face', 'Using too much weight and losing form'] },
  { id: 'bb-shrug', name: 'Barbell Shrug', muscle: 'traps', equipment: 'Barbell', level: 'advanced', sets: '4', reps: '8-12', cues: ['Grip just outside hips', 'Elevate shoulders straight up', 'Hold peak contraction briefly', 'Controlled lowering'], mistakes: ['Bending the elbows to heave the weight', 'Bouncing at the bottom of each rep'] },

  // LOWER BACK
  { id: 'bird-dog', name: 'Bird Dog', muscle: 'lower_back', secondary: ['abs', 'glutes'], equipment: 'Bodyweight', level: 'novice', sets: '3', reps: '10 / side', cues: ['Start on hands and knees', 'Extend opposite arm and leg', 'Keep hips level', 'Move slowly and controlled'], mistakes: ['Letting the hips rotate open', 'Arching the lower back as the leg lifts'] },
  { id: 'superman', name: 'Superman Hold', muscle: 'lower_back', secondary: ['glutes'], equipment: 'Bodyweight', level: 'novice', sets: '3', reps: '20-30s', cues: ['Lie face down, arms extended', 'Lift chest and legs together', 'Squeeze glutes and back', 'Avoid neck strain'], mistakes: ['Craning the neck up to look forward', 'Jerking up instead of a controlled lift'] },
  { id: 'good-morning', name: 'Barbell Good Morning', muscle: 'lower_back', secondary: ['hamstrings', 'glutes'], equipment: 'Barbell', level: 'advanced', sets: '3', reps: '8-10', cues: ['Bar on upper traps', 'Hinge at hips, soft knees', 'Flat back throughout', 'Stop when hamstrings stretch'], mistakes: ['Rounding the back at the bottom', 'Bending the knees too much, turning it into a squat'] },

  // BICEPS
  { id: 'band-curl', name: 'Band Bicep Curl', muscle: 'biceps', equipment: 'Band', level: 'novice', sets: '3', reps: '12-15', cues: ['Elbows pinned to sides', 'Curl through full range', 'Squeeze at the top', 'Slow negative'], mistakes: ['Letting the elbows drift forward', 'Using back and shoulders to help curl'] },
  { id: 'db-curl', name: 'Dumbbell Bicep Curl', muscle: 'biceps', equipment: 'Dumbbell', level: 'novice', sets: '3', reps: '10-12', cues: ['Elbows stay still', 'Curl without swinging', 'Rotate palms up at top', 'Full stretch at bottom'], mistakes: ['Swinging the torso for momentum', 'Only doing partial reps at the top'] },
  { id: 'hammer-curl', name: 'Hammer Curl', muscle: 'biceps', secondary: ['forearms'], equipment: 'Dumbbell', level: 'intermediate', sets: '3', reps: '10-12', cues: ['Neutral grip throughout', 'Elbows fixed at sides', 'Controlled tempo', 'No shoulder swing'], mistakes: ['Letting the wrists rotate mid-curl', 'Using momentum from the shoulders'] },
  { id: 'bb-curl', name: 'Barbell Curl', muscle: 'biceps', equipment: 'Barbell', level: 'advanced', sets: '4', reps: '6-10', cues: ['Shoulder-width grip', 'Brace core, no swinging', 'Full range each rep', 'Squeeze hard at top'], mistakes: ['Swinging the hips to heave the bar up', 'Leaning back at the top of the rep'] },

  // TRICEPS
  { id: 'bench-dip', name: 'Bench Dip', muscle: 'triceps', equipment: 'Bodyweight', level: 'novice', sets: '3', reps: '10-15', cues: ['Hands on bench edge', 'Lower until 90° elbows', 'Keep elbows tucked', 'Press back up fully'], mistakes: ['Letting the shoulders roll forward', 'Going too deep and straining the shoulder joint'] },
  { id: 'db-overhead-ext', name: 'Overhead Dumbbell Extension', muscle: 'triceps', equipment: 'Dumbbell', level: 'intermediate', sets: '3', reps: '10-12', cues: ['Elbows point forward', 'Lower behind head slowly', 'Extend fully overhead', 'Keep upper arms still'], mistakes: ['Flaring the elbows out to the sides', 'Arching the back to move more weight'] },
  { id: 'cable-pushdown', name: 'Cable Tricep Pushdown', muscle: 'triceps', equipment: 'Cable', level: 'intermediate', sets: '3', reps: '12-15', cues: ['Elbows pinned at sides', 'Push down to full extension', 'Squeeze at the bottom', 'Control the return'], mistakes: ['Letting the elbows drift away from the body', 'Leaning on the bar with body weight'] },
  { id: 'close-grip-bench', name: 'Close-Grip Bench Press', muscle: 'triceps', secondary: ['chest'], equipment: 'Barbell', level: 'advanced', sets: '4', reps: '6-10', cues: ['Hands shoulder-width', 'Elbows tucked close', 'Bar to lower chest', 'Drive up through triceps'], mistakes: ['Grip too narrow, straining the wrists', 'Flaring elbows out like a regular bench press'] },

  // FOREARMS
  { id: 'wrist-curl', name: 'Dumbbell Wrist Curl', muscle: 'forearms', equipment: 'Dumbbell', level: 'novice', sets: '3', reps: '15-20', cues: ['Forearms rest on thighs', 'Curl wrists up slowly', 'Full range down', 'Light weight, high control'], mistakes: ['Using too much weight and shortening the range', 'Lifting the forearms off the thighs'] },
  { id: 'farmer-carry', name: "Farmer's Carry", muscle: 'forearms', secondary: ['traps', 'abs'], equipment: 'Dumbbell', level: 'intermediate', sets: '3', reps: '30-40m', cues: ['Stand tall, shoulders back', 'Grip hard, arms straight', 'Short controlled steps', 'Avoid leaning side to side'], mistakes: ['Letting the shoulders round forward', 'Rushing the steps and losing posture'] },
  { id: 'plate-pinch', name: 'Plate Pinch Hold', muscle: 'forearms', equipment: 'Bodyweight', level: 'advanced', sets: '3', reps: '20-30s', cues: ['Pinch plates smooth-side out', 'Arms relaxed at sides', 'Hold without dropping', 'Reset grip between sets'], mistakes: ['Using plates too thick for a real pinch challenge', 'Bending the wrist instead of keeping it neutral'] },

  // ABS
  { id: 'plank', name: 'Plank', muscle: 'abs', equipment: 'Bodyweight', level: 'novice', sets: '3', reps: '20-40s', cues: ['Elbows under shoulders', 'Body in a straight line', 'Squeeze glutes and abs', 'Don\'t let hips sag'], mistakes: ['Hips sagging toward the floor', 'Hips piked too high in the air'] },
  { id: 'crunch', name: 'Crunch', muscle: 'abs', equipment: 'Bodyweight', level: 'novice', sets: '3', reps: '15-20', cues: ['Knees bent, feet flat', 'Lift shoulder blades off floor', 'Exhale on the way up', 'Keep neck relaxed'], mistakes: ['Pulling on the neck with the hands', 'Using momentum instead of a slow contraction'] },
  { id: 'hanging-knee-raise', name: 'Hanging Knee Raise', muscle: 'abs', equipment: 'Bodyweight', level: 'intermediate', sets: '3', reps: '10-15', cues: ['Dead hang from bar', 'Raise knees toward chest', 'Avoid swinging', 'Lower with control'], mistakes: ['Swinging the body for momentum', 'Only lifting the legs, not the pelvis'] },
  { id: 'cable-crunch', name: 'Cable Crunch', muscle: 'abs', equipment: 'Cable', level: 'intermediate', sets: '3', reps: '12-15', cues: ['Kneel below the cable', 'Curl spine, not just hips', 'Bring elbows to knees', 'Squeeze and slowly release'], mistakes: ['Hinging at the hips instead of curling the spine', 'Using arms to pull the weight down'] },
  { id: 'dragon-flag', name: 'Dragon Flag', muscle: 'abs', equipment: 'Bodyweight', level: 'advanced', sets: '3', reps: '5-8', cues: ['Lie on bench, hold behind head', 'Lift body straight up from shoulders', 'Lower with total control', 'Keep body rigid throughout'], mistakes: ['Letting the hips sag mid-rep', 'Dropping fast instead of a slow negative'] },

  // OBLIQUES
  { id: 'side-plank', name: 'Side Plank', muscle: 'obliques', equipment: 'Bodyweight', level: 'novice', sets: '3', reps: '20-30s / side', cues: ['Elbow under shoulder', 'Hips lifted, body straight', 'Don\'t let hips drop', 'Stack feet or stagger for balance'], mistakes: ['Hips sagging toward the floor', 'Rolling the torso forward or back'] },
  { id: 'russian-twist', name: 'Russian Twist', muscle: 'obliques', equipment: 'Bodyweight', level: 'intermediate', sets: '3', reps: '16-20', cues: ['Lean back slightly, chest up', 'Rotate from the torso', 'Feet lifted for more challenge', 'Controlled, not fast flinging'], mistakes: ['Rounding the lower back', 'Moving only the arms instead of rotating the torso'] },
  { id: 'wood-chop', name: 'Cable Wood Chop', muscle: 'obliques', equipment: 'Cable', level: 'advanced', sets: '3', reps: '10-12 / side', cues: ['Rotate from hips and torso', 'Arms stay relatively straight', 'Pivot back foot', 'Control the return rotation'], mistakes: ['Bending the arms to pull instead of rotating the torso', 'Using too much weight and losing control'] },

  // GLUTES
  { id: 'glute-bridge', name: 'Glute Bridge', muscle: 'glutes', secondary: ['hamstrings'], equipment: 'Bodyweight', level: 'novice', sets: '3', reps: '15-20', cues: ['Feet hip-width, close to hips', 'Drive through heels', 'Squeeze glutes at top', 'Avoid overarching lower back'], mistakes: ['Overarching the lower back at the top', 'Pushing through the toes instead of heels'] },
  { id: 'bw-squat', name: 'Bodyweight Squat', muscle: 'glutes', secondary: ['quads'], equipment: 'Bodyweight', level: 'novice', sets: '3', reps: '15-20', cues: ['Feet shoulder-width', 'Hips back and down', 'Knees track over toes', 'Chest stays upright'], mistakes: ['Knees caving inward', 'Heels lifting off the floor'] },
  { id: 'db-hip-thrust', name: 'Dumbbell Hip Thrust', muscle: 'glutes', secondary: ['hamstrings'], equipment: 'Dumbbell', level: 'intermediate', sets: '3', reps: '10-15', cues: ['Upper back on bench', 'Drive hips up, weight on lap', 'Squeeze glutes at top', 'Chin tucked, ribs down'], mistakes: ['Overextending the lower back at the top', 'Feet placed too far from the hips'] },
  { id: 'bulgarian-split-squat', name: 'Bulgarian Split Squat', muscle: 'glutes', secondary: ['quads'], equipment: 'Dumbbell', level: 'advanced', sets: '3', reps: '8-12 / leg', cues: ['Rear foot elevated on bench', 'Front shin stays vertical', 'Lower until back knee near floor', 'Drive through front heel'], mistakes: ['Front knee traveling far past the toes', 'Torso leaning too far forward'] },
  { id: 'barbell-hip-thrust', name: 'Barbell Hip Thrust', muscle: 'glutes', secondary: ['hamstrings'], equipment: 'Barbell', level: 'advanced', sets: '4', reps: '8-12', cues: ['Bar padded over hips', 'Shoulder blades on bench edge', 'Drive hips to full extension', 'Pause and squeeze at top'], mistakes: ['Hyperextending the lower back at lockout', 'Not reaching full hip extension'] },

  // QUADS
  { id: 'wall-sit', name: 'Wall Sit', muscle: 'quads', equipment: 'Bodyweight', level: 'novice', sets: '3', reps: '20-40s', cues: ['Back flat against wall', 'Thighs parallel to floor', 'Knees over ankles', 'Breathe steadily throughout'], mistakes: ['Knees pushed out past the toes', 'Sliding too low or too high on the wall'] },
  { id: 'goblet-squat', name: 'Goblet Squat', muscle: 'quads', secondary: ['glutes'], equipment: 'Dumbbell', level: 'novice', sets: '3', reps: '10-15', cues: ['Hold weight at chest', 'Squat between the knees', 'Keep chest tall', 'Drive up through mid-foot'], mistakes: ['Rounding the upper back', 'Heels rising off the ground'] },
  { id: 'leg-press', name: 'Leg Press', muscle: 'quads', secondary: ['glutes'], equipment: 'Machine', level: 'intermediate', sets: '3', reps: '10-15', cues: ['Feet shoulder-width on platform', 'Lower until knees ~90°', 'Don\'t lock knees at top', 'Keep lower back on pad'], mistakes: ['Locking the knees out hard at the top', 'Lower back lifting off the pad'] },
  { id: 'lunge', name: 'Walking Lunge', muscle: 'quads', secondary: ['glutes'], equipment: 'Dumbbell', level: 'intermediate', sets: '3', reps: '10-12 / leg', cues: ['Long step forward', 'Both knees to ~90°', 'Torso upright', 'Push through front heel to rise'], mistakes: ['Taking too short a step, straining the knee', 'Leaning the torso far forward'] },
  { id: 'barbell-back-squat', name: 'Barbell Back Squat', muscle: 'quads', secondary: ['glutes', 'hamstrings'], equipment: 'Barbell', level: 'advanced', sets: '4', reps: '5-8', cues: ['Bar on upper traps', 'Brace core before descending', 'Hips below knee crease', 'Drive up, chest stays proud'], mistakes: ['Knees caving in on the way up', 'Losing the flat back and rounding forward'] },

  // HAMSTRINGS
  { id: 'db-rdl', name: 'Dumbbell Romanian Deadlift', muscle: 'hamstrings', secondary: ['glutes', 'lower_back'], equipment: 'Dumbbell', level: 'novice', sets: '3', reps: '10-12', cues: ['Soft knees, hinge at hips', 'Weights close to legs', 'Flat back throughout', 'Feel stretch, then drive hips forward'], mistakes: ['Squatting the weight down instead of hinging', 'Rounding the lower back at the bottom'] },
  { id: 'glute-ham-raise', name: 'Lying Leg Curl', muscle: 'hamstrings', equipment: 'Machine', level: 'intermediate', sets: '3', reps: '10-15', cues: ['Hips pressed into pad', 'Curl heels toward glutes', 'Squeeze at the top', 'Lower with control'], mistakes: ['Hips lifting off the pad', 'Using momentum instead of a controlled curl'] },
  { id: 'single-leg-rdl', name: 'Single-Leg RDL', muscle: 'hamstrings', secondary: ['glutes'], equipment: 'Dumbbell', level: 'advanced', sets: '3', reps: '8-10 / leg', cues: ['Balance on one leg', 'Hinge, lifting rear leg back', 'Keep hips square', 'Controlled tempo throughout'], mistakes: ['Letting the hips rotate open', 'Rushing the rep and losing balance'] },
  { id: 'bb-deadlift', name: 'Barbell Deadlift', muscle: 'hamstrings', secondary: ['glutes', 'lower_back'], equipment: 'Barbell', level: 'advanced', sets: '4', reps: '4-6', cues: ['Bar over mid-foot', 'Flat back, chest up', 'Push floor away with legs', 'Bar stays close to shins'], mistakes: ['Rounding the lower back off the floor', 'Letting the bar drift away from the shins'] },

  // CALVES
  { id: 'calf-raise', name: 'Standing Calf Raise', muscle: 'calves', equipment: 'Bodyweight', level: 'novice', sets: '3', reps: '15-20', cues: ['Rise onto toes fully', 'Pause at the top', 'Lower slowly past neutral', 'Use wall for balance if needed'], mistakes: ['Bouncing quickly instead of a paused rep', 'Not lowering below neutral for a full stretch'] },
  { id: 'db-calf-raise', name: 'Dumbbell Calf Raise', muscle: 'calves', equipment: 'Dumbbell', level: 'intermediate', sets: '3', reps: '12-15', cues: ['Stand on a raised edge', 'Full stretch at the bottom', 'Drive up through the toes', 'Controlled tempo, no bouncing'], mistakes: ['Cutting the range of motion short', 'Using knee bend to help drive up'] },
  { id: 'seated-calf-raise', name: 'Seated Calf Raise', muscle: 'calves', equipment: 'Machine', level: 'advanced', sets: '4', reps: '12-20', cues: ['Pads rest on lower thighs', 'Full range each rep', 'Pause and squeeze at top', 'Slow, controlled negative'], mistakes: ['Bouncing out of the bottom stretch', 'Only using the top half of the range'] },

  // NECK
  { id: 'neck-flexion', name: 'Manual Neck Flexion', muscle: 'neck', equipment: 'Bodyweight', level: 'novice', sets: '2', reps: '10-12', cues: ['Hand on forehead for resistance', 'Nod chin toward chest', 'Resist gently through range', 'Move slowly, no jerking'], mistakes: ['Applying resistance too aggressively', 'Jerky, fast movements instead of slow control'] },
  { id: 'band-neck-lateral', name: 'Band Lateral Neck Flexion', muscle: 'neck', equipment: 'Band', level: 'intermediate', sets: '2', reps: '10-12 / side', cues: ['Anchor band at head height', 'Tilt head against resistance', 'Keep shoulders level', 'Return with control'], mistakes: ['Shrugging the shoulder up to assist', 'Using a band that is too strong for control'] },
]

export function exercisesForMuscle(muscle: MuscleId): Exercise[] {
  return EXERCISES.filter((e) => e.muscle === muscle)
}
