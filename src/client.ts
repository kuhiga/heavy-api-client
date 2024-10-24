import axios, { AxiosInstance } from "axios";
import { Pagination, Workout, Routine } from "./types";
import { HEVY_BASE_URL } from "./constants";
export class HevyClient {
  private client: AxiosInstance;

  constructor(apiKey: string) {
    this.client = axios.create({
      baseURL: HEVY_BASE_URL,
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
      },
    });
  }

  // Workouts
  async getWorkouts(params: Pagination = { page: 1, pageSize: 5 }) {
    const response = await this.client.get("/workouts", { params });
    return response.data;
  }

  async createWorkout(workout: Workout) {
    const response = await this.client.post("/workouts", { workout });
    return response.data;
  }

  async getWorkoutCount() {
    const response = await this.client.get("/workouts/count");
    return response.data.workout_count;
  }

  async getWorkoutEvents(
    params: Pagination & { since?: string } = { page: 1, pageSize: 5 }
  ) {
    const response = await this.client.get("/workouts/events", { params });
    return response.data;
  }

  async getWorkout(workoutId: string) {
    const response = await this.client.get(`/workouts/${workoutId}`);
    return response.data;
  }

  // Routines
  async getRoutines(params: Pagination = { page: 1, pageSize: 5 }) {
    const response = await this.client.get("/routines", { params });
    return response.data;
  }

  async createRoutine(routine: Routine) {
    const response = await this.client.post("/routines", { routine });
    return response.data;
  }

  // Exercise Templates
  async getExerciseTemplates(params: Pagination = { page: 1, pageSize: 5 }) {
    const response = await this.client.get("/exercise_templates", { params });
    return response.data;
  }

  async getExerciseTemplate(templateId: string) {
    const response = await this.client.get(`/exercise_templates/${templateId}`);
    return response.data;
  }

  // Routine Folders
  async getRoutineFolders(params: Pagination = { page: 1, pageSize: 5 }) {
    const response = await this.client.get("/routine_folders", { params });
    return response.data;
  }

  async createRoutineFolder(folder: { title: string }) {
    const response = await this.client.post("/routine_folders", {
      routine_folder: folder,
    });
    return response.data;
  }

  async getRoutineFolder(folderId: number) {
    const response = await this.client.get(`/routine_folders/${folderId}`);
    return response.data;
  }
}
