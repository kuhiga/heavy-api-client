# Hevy API Client

A TypeScript/Node.js client for the Hevy API.

## Installation

```bash
npm install hevy-api-client
```

## Usage

```typescript
import { HevyClient } from "hevy-api-client";

const client = new HevyClient("your-api-key");

// Get workouts
const workouts = await client.getWorkouts();

// Create a workout
const newWorkout = await client.createWorkout({
  title: "Morning Workout 💪",
  description: "Push day",
  start_time: new Date().toISOString(),
  end_time: new Date().toISOString(),
  exercises: [
    {
      exercise_template_id: "05293BCA",
      sets: [
        {
          set_type: "normal",
          weight_kg: 100,
          reps: 10,
        },
      ],
    },
  ],
});
```

## API Documentation

### Workouts

- `getWorkouts(params?: Pagination)`
- `createWorkout(workout: Workout)`
- `getWorkoutCount()`
- `getWorkoutEvents(params?: Pagination & { since?: string })`
- `getWorkout(workoutId: string)`

### Routines

- `getRoutines(params?: Pagination)`
- `createRoutine(routine: Routine)`

### Exercise Templates

- `getExerciseTemplates(params?: Pagination)`
- `getExerciseTemplate(templateId: string)`

### Routine Folders

- `getRoutineFolders(params?: Pagination)`
- `createRoutineFolder(folder: { title: string })`
- `getRoutineFolder(folderId: number)`

## Types

The package includes TypeScript definitions for all request and response types.