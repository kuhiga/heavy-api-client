export interface Pagination {
  page?: number;
  pageSize?: number;
}

export interface WorkoutSet {
  type: "normal" | "warmup" | "dropset" | "failure";
  weight_kg?: number | null;
  reps?: number | null;
  distance_meters?: number | null;
  duration_seconds?: number | null;
}

export interface PostWorkoutsRequestExercise {
  exercise_template_id: string;
  superset_id?: number | null;
  notes?: string | null;
  sets: WorkoutSet[];
}

export interface Exercise {
  index?: number;
  title?: string;
  notes?: string;
  exercise_template_id: string;
  supersets_id?: number;
  sets: WorkoutSet[];
}
export interface CreateWorkout {
  title: string;
  description?: string | null;
  start_time: string;
  end_time: string;
  is_private: string;
  exercises: PostWorkoutsRequestExercise[];
}
export interface ExerciseResponse {
  index: number;
  title: string;
  notes: string;
  exercise_template_id: string;
  supersets_id?: number | null;
  sets: WorkoutSetResponse[];
}
export interface Workout {
  id: string;
  title: string;
  description?: string;
  start_time: number;
  end_time: number;
  is_private?: boolean;
  exercises: ExerciseResponse[];
  updated_at: string;
  created_at: string;
}

export interface WorkoutEvent {
  type: "updated" | "deleted";
  workout?: Workout;
  id?: string;
  deleted_at?: string;
}

export interface PostRoutinesRequestExercise {
  exercise_template_id: string;
  superset_id?: number | null;
  rest_seconds?: number | null;
  notes?: string | null;
  sets: WorkoutSet[];
}
export interface PostRoutinesRequestBody {
  title: string;
  folder_id?: number | null;
  notes?: string | null;
  exercises: PostRoutinesRequestExercise[];
}
export interface Routine {
  title: string;
  folder_id?: number | null;
  notes?: string | null;
  exercises: PostRoutinesRequestExercise[];
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

export interface Pagination {
  page?: number;
  pageSize?: number;
}

export interface WorkoutSetResponse {
  index: number;
  set_type: "normal" | "warmup" | "dropset" | "failure";
  weight_kg?: number | null;
  reps?: number | null;
  distance_meters?: number | null;
  duration_seconds?: number | null;
  rpe?: number | null;
}

export interface WorkoutsResponse {
  page: number;
  page_count: number;
  workouts: {
    id: string;
    title: string;
    description?: string | null;
    start_time: number;
    end_time: number;
    updated_at: string;
    created_at: string;
    exercises: {
      index: number;
      title: string;
      notes: string;
      exercise_template_id: string;
      supersets_id?: string | null;
      sets: {
        index: number;
        set_type: "normal" | "warmup" | "dropset" | "failure";
        weight_kg?: number | null;
        reps?: number | null;
        distance_meters?: number | null;
        duration_seconds?: number | null;
        rpe?: number | null;
      }[];
    }[];
  };
}

export interface WorkoutEventsResponse {
  page: number;
  page_count: number;
  events: WorkoutEvent[];
}

export interface RoutinesResponse {
  page: number;
  page_count: number;
  routines: {
    id: string;
    title: string;
    folder_id?: number | null;
    updated_at: string;
    created_at: string;
    exercises: {
      index: number;
      title: string;
      notes: string;
      exercise_template_id: string;
      supersets_id?: string | null;
      sets: {
        index: number;
        set_type: "normal" | "warmup" | "dropset" | "failure";
        weight_kg?: number | null;
        reps?: number | null;
        distance_meters?: number | null;
        duration_seconds?: number | null;
        rpe?: number | null;
      }[];
    }[];
  }[];
}

export interface CreateRoutinesResponse {
  id: string;
  title: string;
  folder_id?: number | null;
  updated_at: string;
  created_at: string;
  exercises: {
    index: number;
    title: string;
    notes: string;
    exercise_template_id: string;
    supersets_id?: string | null;
    sets: {
      index: number;
      set_type: "normal" | "warmup" | "dropset" | "failure";
      weight_kg?: number | null;
      reps?: number | null;
      distance_meters?: number | null;
      duration_seconds?: number | null;
      rpe?: number | null;
    }[];
  }[];
}

export interface ExerciseTemplatesResponse {
  page: number;
  page_count: number;
  exercise_templates: ExerciseTemplate[];
}

export interface PostRoutinesResponse {
  id: number;
  index: number;
  title: string;
  updated_at: string;
  created_at: string;
}

export interface RoutineFolderResponse {
  id: number;
  index: number;
  title: string;
  updated_at: string;
  created_at: string;
}

export interface GetRoutineFoldersResponse {
  page: number;
  page_count: number;
  routine_folders: RoutineFolderResponse[];
}

export interface CreateWorkoutResponse {
  id: string;
  title: string;
  description?: string | null;
  start_time: number;
  end_time: number;
  updated_at: string;
  created_at: string;
  exercises: {
    index: number;
    title: string;
    notes: string;
    exercise_template_id: string;
    superset_id?: number | null;
    sets: WorkoutSetResponse[];
  }[];
}
