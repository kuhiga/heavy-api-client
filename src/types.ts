export interface Pagination {
  page?: number;
  pageSize?: number;
}

export interface WorkoutSet {
  index?: number;
  set_type: "normal";
  weight_kg: number;
  reps: number;
  distance_meters?: number | null;
  duration_seconds?: number | null;
  rpe?: number;
}

export interface Exercise {
  index?: number;
  title?: string;
  notes?: string;
  exercise_template_id: string;
  supersets_id?: number;
  sets: WorkoutSet[];
}

export interface Workout {
  id?: string;
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  is_private?: boolean;
  exercises: Exercise[];
  updated_at?: string;
  created_at?: string;
}

export interface WorkoutEvent {
  type: "updated" | "deleted";
  workout?: Workout;
  id?: string;
  deleted_at?: string;
}

export interface Routine {
  id?: string;
  title: string;
  folder_id?: number | null;
  notes?: string;
  exercises: Exercise[];
  updated_at?: string;
  created_at?: string;
}

export interface ExerciseTemplate {
  id: string;
  title: string;
  type: string;
  primary_muscle_group: string;
  secondary_muscle_groups: string[];
  is_custom: boolean;
}

export interface RoutineFolder {
  id?: number;
  index?: number;
  title: string;
  updated_at?: string;
  created_at?: string;
}
