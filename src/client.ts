import fetch, { RequestInit } from "node-fetch";
import {
  Pagination,
  Workout,
  Routine,
  CreateWorkout,
  WorkoutsResponse,
  WorkoutEventsResponse,
  RoutinesResponse,
  CreateRoutinesResponse,
  ExerciseTemplatesResponse,
  ExerciseTemplate,
  GetRoutineFoldersResponse,
  PostRoutinesResponse,
  RoutineFolderResponse,
  CreateWorkoutResponse,
} from "./types";
import { HEVY_BASE_URL } from "./constants";
import { HevyAPIError } from "./error";

export class HevyClient {
  private baseUrl: string;
  private headers: { [key: string]: string };

  constructor(apiKey: string) {
    this.baseUrl = HEVY_BASE_URL;
    this.headers = {
      "api-key": apiKey,
      "Content-Type": "application/json",
    };
  }

  private buildUrl(path: string, params?: Record<string, any>): string {
    const url = new URL(this.baseUrl + path);

    if (params) {
      url.search = new URLSearchParams(params).toString();
    }

    return url.toString();
  }

  private async request<T>(
    path: string,
    options: RequestInit = {},
    params?: Record<string, any>
  ): Promise<T> {
    const url = this.buildUrl(path, params);
    const config: RequestInit = {
      ...options,
      headers: {
        ...this.headers,
        ...(options.headers || {}),
      },
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      const errorText = await response.text().catch(() => "No error details");
      throw new HevyAPIError(
        response.status,
        response.statusText,
        errorText,
        url
      );
    }

    return response.json() as Promise<T>;
  }

  async getWorkouts(
    params: Pagination = { page: 1, pageSize: 5 }
  ): Promise<WorkoutsResponse> {
    return this.request("/workouts", { method: "GET" }, params);
  }

  async createWorkout(workout: CreateWorkout): Promise<CreateWorkoutResponse> {
    return this.request("/workouts", {
      method: "POST",
      body: JSON.stringify({ workout }),
    });
  }

  async getWorkoutCount(): Promise<number> {
    const response = await this.request<{ workout_count: number }>(
      "/workouts/count",
      { method: "GET" }
    );
    return response.workout_count;
  }

  async getWorkoutEvents(
    params: Pagination & { since?: string } = {
      page: 1,
      pageSize: 5,
      since: "1970-01-01T00:00:00Z",
    }
  ): Promise<WorkoutEventsResponse> {
    return this.request("/workouts/events", { method: "GET" }, params);
  }

  async getWorkout(workoutId: string): Promise<Workout> {
    return this.request(`/workouts/${workoutId}`, { method: "GET" });
  }

  async getRoutines(
    params: Pagination = { page: 1, pageSize: 5 }
  ): Promise<RoutinesResponse> {
    return this.request("/routines", { method: "GET" }, params);
  }

  async createRoutine(routine: Routine): Promise<CreateRoutinesResponse> {
    return this.request("/routines", {
      method: "POST",
      body: JSON.stringify({ routine }),
    });
  }

  async getExerciseTemplates(
    params: Pagination = { page: 1, pageSize: 5 }
  ): Promise<ExerciseTemplatesResponse> {
    return this.request("/exercise_templates", { method: "GET" }, params);
  }

  async getExerciseTemplate(templateId: string): Promise<ExerciseTemplate> {
    return this.request(`/exercise_templates/${templateId}`, { method: "GET" });
  }

  async getRoutineFolders(
    params: Pagination = { page: 1, pageSize: 5 }
  ): Promise<GetRoutineFoldersResponse> {
    return this.request("/routine_folders", { method: "GET" }, params);
  }

  async createRoutineFolder(folder: {
    title: string;
  }): Promise<PostRoutinesResponse> {
    return this.request("/routine_folders", {
      method: "POST",
      body: JSON.stringify({ routine_folder: folder }),
    });
  }

  async getRoutineFolder(folderId: number): Promise<RoutineFolderResponse> {
    return this.request(`/routine_folders/${folderId}`, { method: "GET" });
  }
}
