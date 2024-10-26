export type PostWorkoutsRequestSet = {
  /**
   * The type of the set.
   */
  type: "warmup" | "normal" | "failure" | "dropset";
  /**
   * The weight in kilograms.
   */
  weight_kg?: number | null;
  /**
   * The number of repetitions.
   */
  reps?: number | null;
  /**
   * The distance in meters.
   */
  distance_meters?: number | null;
  /**
   * The duration in seconds.
   */
  duration_seconds?: number | null;
};

/**
 * The type of the set.
 */
export type type = "warmup" | "normal" | "failure" | "dropset";

export type PostWorkoutsRequestExercise = {
  /**
   * The ID of the exercise template.
   */
  exercise_template_id: string;
  /**
   * The ID of the superset.
   */
  superset_id?: number | null;
  /**
   * Additional notes for the exercise.
   */
  notes?: string | null;
  sets: Array<PostWorkoutsRequestSet>;
};

export type PostWorkoutsRequestBody = {
  workout: {
    /**
     * The title of the workout.
     */
    title: string;
    /**
     * A description for the workout workout.
     */
    description?: string | null;
    /**
     * The time the workout started.
     */
    start_time: string;
    /**
     * The time the workout ended.
     */
    end_time: string;
    /**
     * A boolean indicating if the workout is private.
     */
    is_private: boolean;
    exercises: Array<PostWorkoutsRequestExercise>;
  };
};

export type PostRoutinesRequestSet = {
  /**
   * The type of the set.
   */
  type: "warmup" | "normal" | "failure" | "dropset";
  /**
   * The weight in kilograms.
   */
  weight_kg?: number | null;
  /**
   * The number of repetitions.
   */
  reps?: number | null;
  /**
   * The distance in meters.
   */
  distance_meters?: number | null;
  /**
   * The duration in seconds.
   */
  duration_seconds?: number | null;
};

export type PostRoutinesRequestExercise = {
  /**
   * The ID of the exercise template.
   */
  exercise_template_id: string;
  /**
   * The ID of the superset.
   */
  superset_id?: number | null;
  /**
   * The rest time in seconds.
   */
  rest_seconds?: number | null;
  /**
   * Additional notes for the exercise.
   */
  notes?: string | null;
  sets: Array<PostRoutinesRequestSet>;
};

export type PostRoutinesRequestBody = {
  routine: {
    /**
     * The title of the routine.
     */
    title: string;
    /**
     * The folder id the routine should be added to. Pass null to insert the routine into default "My Routines" folder
     */
    folder_id?: number | null;
    /**
     * Additional notes for the routine.
     */
    notes?: string;
    exercises?: Array<PostRoutinesRequestExercise>;
  };
};

export type PostRoutineFolderRequestBody = {
  routine_folder: {
    /**
     * The title of the routine folder.
     */
    title: string;
  };
};

export type ExerciseTemplate = {
  /**
   * The exercise template ID.
   */
  id?: string;
  /**
   * The exercise title.
   */
  title?: string;
  /**
   * The exercise type.
   */
  type?: string;
  /**
   * The primary muscle group of the exercise.
   */
  primary_muscle_group?: string;
  /**
   * The secondary muscle groups of the exercise.
   */
  secondary_muscle_groups?: Array<string>;
  /**
   * A boolean indicating whether the exercise is a custom exercise.
   */
  is_custom?: boolean;
};

export type RoutineFolder = {
  /**
   * The routine folder ID.
   */
  id?: number;
  /**
   * The routine folder index. Describes the order of the folder in the list.
   */
  index?: number;
  /**
   * The routine folder title.
   */
  title?: string;
  /**
   * ISO 8601 timestamp of when the folder was last updated.
   */
  updated_at?: string;
  /**
   * ISO 8601 timestamp of when the folder was created.
   */
  created_at?: string;
};

export type Routine = {
  /**
   * The routine ID.
   */
  id?: string;
  /**
   * The routine title.
   */
  title?: string;
  /**
   * The routine folder ID.
   */
  folder_id?: number | null;
  /**
   * ISO 8601 timestamp of when the routine was last updated.
   */
  updated_at?: string;
  /**
   * ISO 8601 timestamp of when the routine was created.
   */
  created_at?: string;
  exercises?: Array<{
    /**
     * Index indicating the order of the exercise in the routine.
     */
    index?: number;
    /**
     * Title of the exercise
     */
    title?: string;
    /**
     * Routine notes on the exercise
     */
    notes?: string;
    /**
     * The id of the exercise template. This can be used to fetch the exercise template.
     */
    exercise_template_id?: string;
    /**
     * The id of the superset that the exercise belongs to. A value of null indicates the exercise is not part of a superset.
     */
    supersets_id?: number | null;
    sets?: Array<{
      /**
       * Index indicating the order of the set in the routine.
       */
      index?: number;
      /**
       * The type of set. This can be one of 'normal', 'warmup', 'dropset', 'failure'
       */
      set_type?: string;
      /**
       * Weight lifted in kilograms.
       */
      weight_kg?: number | null;
      /**
       * Number of reps logged for the set
       */
      reps?: number | null;
      /**
       * Number of meters logged for the set
       */
      distance_meters?: number | null;
      /**
       * Number of seconds logged for the set
       */
      duration_seconds?: number | null;
      /**
       * RPE (Relative perceived exertion) value logged for the set
       */
      rpe?: number | null;
    }>;
  }>;
};

export type Workout = {
  /**
   * The workout ID.
   */
  id?: string;
  /**
   * The workout title.
   */
  title?: string;
  /**
   * The workout description.
   */
  description?: string;
  /**
   * ISO 8601 timestamp of when the workout was recorded to have started.
   */
  start_time?: number;
  /**
   * ISO 8601 timestamp of when the workout was recorded to have ended.
   */
  end_time?: number;
  /**
   * ISO 8601 timestamp of when the workout was last updated.
   */
  updated_at?: string;
  /**
   * ISO 8601 timestamp of when the workout was created.
   */
  created_at?: string;
  exercises?: Array<{
    /**
     * Index indicating the order of the exercise in the workout.
     */
    index?: number;
    /**
     * Title of the exercise
     */
    title?: string;
    /**
     * Notes on the exercise
     */
    notes?: string;
    /**
     * The id of the exercise template. This can be used to fetch the exercise template.
     */
    exercise_template_id?: string;
    /**
     * The id of the superset that the exercise belongs to. A value of null indicates the exercise is not part of a superset.
     */
    supersets_id?: number | null;
    sets?: Array<{
      /**
       * Index indicating the order of the set in the workout.
       */
      index?: number;
      /**
       * The type of set. This can be one of 'normal', 'warmup', 'dropset', 'failure'
       */
      set_type?: string;
      /**
       * Weight lifted in kilograms.
       */
      weight_kg?: number | null;
      /**
       * Number of reps logged for the set
       */
      reps?: number | null;
      /**
       * Number of meters logged for the set
       */
      distance_meters?: number | null;
      /**
       * Number of seconds logged for the set
       */
      duration_seconds?: number | null;
      /**
       * RPE (Relative perceived exertion) value logged for the set
       */
      rpe?: number | null;
    }>;
  }>;
};

export type UpdatedWorkout = {
  /**
   * Indicates the type of the event (updated)
   */
  type: string;
  workout: Workout;
};

export type DeletedWorkout = {
  /**
   * Indicates the type of the event (deleted)
   */
  type: string;
  /**
   * The unique identifier of the deleted workout
   */
  id: string;
  /**
   * A date string indicating when the workout was deleted
   */
  deleted_at?: string;
};

export type PaginatedWorkoutEvents = {
  /**
   * The current page number
   */
  page: number;
  /**
   * The total number of pages available
   */
  page_count: number;
  /**
   * An array of workout events (either updated or deleted)
   */
  events: Array<UpdatedWorkout | DeletedWorkout>;
};

export type GetV1WorkoutsData = {
  /**
   * Page number (Must be 1 or greater)
   */
  page?: number;
  /**
   * Number of items on the requested page (Max 10)
   */
  pageSize?: number;
};

export type GetV1WorkoutsResponse = {
  /**
   * Current page number
   */
  page?: number;
  /**
   * Total number of pages
   */
  page_count?: number;
  workouts?: Array<Workout>;
};

export type GetV1WorkoutsError = unknown;

export type PostV1WorkoutsData = {
  body: PostWorkoutsRequestBody;
  headers: {
    "api-key": string;
  };
};

export type PostV1WorkoutsResponse = Workout;

export type PostV1WorkoutsError = {
  /**
   * Error message
   */
  error?: string;
};

export type GetV1WorkoutsCountData = {
  headers: {
    "api-key": string;
  };
};

export type GetV1WorkoutsCountResponse = {
  /**
   * The total number of workouts
   */
  workout_count?: number;
};

export type GetV1WorkoutsCountError = unknown;

export type GetV1WorkoutsEventsData = {
  /**
   * Page number (Must be 1 or greater)
   */
  page?: number;
  /**
   * Number of items on the requested page (Max 10)
   */
  pageSize?: number;
  since?: string;
};

export type GetV1WorkoutsEventsResponse = PaginatedWorkoutEvents;

export type GetV1WorkoutsEventsError = unknown;

export type GetV1WorkoutsByWorkoutIdData = {
  headers: {
    "api-key": string;
  };
  path: {
    /**
     * The id of the workout
     */
    workoutId: unknown;
  };
};

export type GetV1WorkoutsByWorkoutIdResponse = Workout;

export type GetV1WorkoutsByWorkoutIdError = unknown;

export type GetV1RoutinesData = {
  /**
   * Page number (Must be 1 or greater)
   */
  page?: number;
  /**
   * Number of items on the requested page (Max 10)
   */
  pageSize?: number;
};

export type GetV1RoutinesResponse = {
  /**
   * Current page number
   */
  page?: number;
  /**
   * Total number of pages
   */
  page_count?: number;
  routines?: Array<Routine>;
};

export type GetV1RoutinesError = unknown;

export type PostV1RoutinesData = {
  body: PostRoutinesRequestBody;
  headers: {
    "api-key": string;
  };
};

export type PostV1RoutinesResponse = Routine;

export type PostV1RoutinesError = {
  /**
   * Error message
   */
  error?: string;
};

export type GetV1ExerciseTemplatesData = {
  /**
   * Page number (Must be 1 or greater)
   */
  page?: number;
  /**
   * Number of items on the requested page (Max 100)
   */
  pageSize?: number;
};

export type GetV1ExerciseTemplatesResponse = {
  /**
   * Current page number
   */
  page?: number;
  /**
   * Total number of pages
   */
  page_count?: number;
  exercise_templates?: Array<ExerciseTemplate>;
};

export type GetV1ExerciseTemplatesError = unknown;

export type GetV1ExerciseTemplatesByExerciseTemplateIdData = {
  /**
   * The id of the exercise template
   */
  exerciseTemplateId: unknown;
};

export type GetV1ExerciseTemplatesByExerciseTemplateIdResponse =
  ExerciseTemplate;

export type GetV1ExerciseTemplatesByExerciseTemplateIdError = unknown;

export type GetV1RoutineFoldersData = {
  /**
   * Page number (Must be 1 or greater)
   */
  page?: number;
  /**
   * Number of items on the requested page (Max 10)
   */
  pageSize?: number;
};

export type GetV1RoutineFoldersResponse = {
  /**
   * Current page number
   */
  page?: number;
  /**
   * Total number of pages
   */
  page_count?: number;
  routine_folders?: Array<RoutineFolder>;
};

export type GetV1RoutineFoldersError = unknown;

export type PostV1RoutineFoldersData = PostRoutineFolderRequestBody;

export type PostV1RoutineFoldersResponse = RoutineFolder;

export type PostV1RoutineFoldersError = {
  /**
   * Error message
   */
  error?: string;
};

export type GetV1RoutineFoldersByFolderIdData = {
  /**
   * The id of the routine folder
   */
  folderId: unknown;
};

export type GetV1RoutineFoldersByFolderIdResponse = RoutineFolder;

export type GetV1RoutineFoldersByFolderIdError = unknown;
