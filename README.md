# Train Yourself

A muscle-guided workout app for everyone from complete beginners to advanced lifters, at the gym or at home.

Tap a muscle on an interactive body outline (front/back, male/female) to get exercises with proper form cues, sets, and reps — filterable by experience level. Build your own workout by adding exercises, adjust sets/reps, and save it for later.

## Features

- **Interactive body map** — click a muscle group on an SVG figure; toggle front/back view and male/female proportions
- **Exercise library** — ~65 exercises across 15 muscle groups, each with equipment type, level (novice/intermediate/advanced), sets/reps, and short form cues
- **Workout builder** — add exercises to a draft workout, edit sets/reps inline, save named workouts (persisted in `localStorage`)
- **Elegant, light theme** — minimal text, paper/ink color palette

## Stack

React + TypeScript + Vite + Tailwind CSS v4.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Next ideas

- Real anatomical SVG artwork instead of simplified shapes
- Exercise demo images/GIFs
- Rest timers and workout logging/history
- Secondary-muscle highlighting when hovering an exercise
