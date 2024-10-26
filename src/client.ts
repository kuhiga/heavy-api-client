import fetch, { RequestInit } from "node-fetch";
import {
  GetV1WorkoutsResponse,
  PostWorkoutsRequestBody,
  PostV1WorkoutsResponse,
  GetV1WorkoutsCountResponse,
  GetV1WorkoutsEventsResponse,
  GetV1WorkoutsByWorkoutIdResponse,
  GetV1WorkoutsData,
  GetV1WorkoutsEventsData,
  GetV1RoutinesData,
  GetV1RoutinesResponse,
  PostRoutinesRequestBody,
  PostV1RoutinesResponse,
  GetV1ExerciseTemplatesData,
  GetV1ExerciseTemplatesResponse,
  GetV1ExerciseTemplatesByExerciseTemplateIdResponse,
  GetV1RoutineFoldersData,
  GetV1RoutineFoldersResponse,
  PostV1RoutineFoldersData,
  PostV1RoutineFoldersResponse,
  GetV1RoutineFoldersByFolderIdResponse,
} from "./types.js";
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
    pagination: GetV1WorkoutsData = { page: 1, pageSize: 5 }
  ): Promise<GetV1WorkoutsResponse> {
    return this.request("/workouts", { method: "GET" }, pagination);
  }

  async createWorkout(
    workout: PostWorkoutsRequestBody
  ): Promise<PostV1WorkoutsResponse> {
    return this.request("/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
    });
  }

  async getWorkoutCount(): Promise<number> {
    const response = await this.request<GetV1WorkoutsCountResponse>(
      "/workouts/count",
      { method: "GET" }
    );
    return response.workout_count ?? 0;
  }

  async getWorkoutEvents(
    pagination: GetV1WorkoutsEventsData = {
      page: 1,
      pageSize: 5,
    }
  ): Promise<GetV1WorkoutsEventsResponse> {
    return this.request("/workouts/events", { method: "GET" }, pagination);
  }

  async getWorkout(
    workoutId: string
  ): Promise<GetV1WorkoutsByWorkoutIdResponse> {
    return this.request(`/workouts/${workoutId}`, { method: "GET" });
  }

  async getRoutines(
    pagination: GetV1RoutinesData = { page: 1, pageSize: 5 }
  ): Promise<GetV1RoutinesResponse> {
    return this.request("/routines", { method: "GET" }, pagination);
  }

  async createRoutine(
    routine: PostRoutinesRequestBody
  ): Promise<PostV1RoutinesResponse> {
    return this.request("/routines", {
      method: "POST",
      body: JSON.stringify(routine),
    });
  }

  async getExerciseTemplates(
    pagination: GetV1ExerciseTemplatesData = { page: 1, pageSize: 5 }
  ): Promise<GetV1ExerciseTemplatesResponse> {
    return this.request("/exercise_templates", { method: "GET" }, pagination);
  }

  async getExerciseTemplate(
    templateId: string
  ): Promise<GetV1ExerciseTemplatesByExerciseTemplateIdResponse> {
    return this.request(`/exercise_templates/${templateId}`, { method: "GET" });
  }

  async getRoutineFolders(
    pagination: GetV1RoutineFoldersData = { page: 1, pageSize: 5 }
  ): Promise<GetV1RoutineFoldersResponse> {
    return this.request("/routine_folders", { method: "GET" }, pagination);
  }

  async createRoutineFolder(
    folder: PostV1RoutineFoldersData
  ): Promise<PostV1RoutineFoldersResponse> {
    return this.request("/routine_folders", {
      method: "POST",
      body: JSON.stringify(folder),
    });
  }

  async getRoutineFolder(
    folderId: number
  ): Promise<GetV1RoutineFoldersByFolderIdResponse> {
    return this.request(`/routine_folders/${folderId}`, { method: "GET" });
  }
}
