// tests/client.test.ts
import { HevyClient } from "../src/client";
import { HEVY_BASE_URL } from "../src/constants";
import { Workout } from "../src/types";
import axios, { AxiosInstance } from "axios";

jest.mock("axios");

describe("HevyClient", () => {
  let client: HevyClient;
  let mockAxiosInstance: jest.Mocked<AxiosInstance>;
  const API_KEY = "test-api-key";

  beforeEach(() => {
    // Create a mock Axios instance
    mockAxiosInstance = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
      patch: jest.fn(),
      request: jest.fn(),
      defaults: { headers: { common: {} } },
    } as any;

    // Make axios.create return our mock instance
    (axios.create as jest.Mock).mockReturnValue(mockAxiosInstance);

    // Create client instance
    client = new HevyClient(API_KEY);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Helper function to create a mock workout
  const createMockWorkout = (): Workout => ({
    title: "Test Workout",
    description: "Test Description",
    start_time: "2024-01-01T10:00:00Z",
    end_time: "2024-01-01T11:00:00Z",
    exercises: [
      {
        exercise_template_id: "TEST123",
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

  describe("Constructor", () => {
    it("should create client with correct configuration", () => {
      expect(axios.create).toHaveBeenCalledWith({
        baseURL: HEVY_BASE_URL,
        headers: {
          "api-key": API_KEY,
          "Content-Type": "application/json",
        },
      });
    });
  });

  describe("getWorkouts", () => {
    const mockResponse = {
      data: {
        page: 1,
        page_count: 5,
        workouts: [createMockWorkout()],
      },
    };

    it("should fetch workouts with default pagination", async () => {
      mockAxiosInstance.get.mockResolvedValueOnce(mockResponse);

      const result = await client.getWorkouts();

      expect(result).toEqual(mockResponse.data);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith("/workouts", {
        params: { page: 1, pageSize: 5 },
      });
    });

    it("should fetch workouts with custom pagination", async () => {
      mockAxiosInstance.get.mockResolvedValueOnce(mockResponse);

      const result = await client.getWorkouts({ page: 2, pageSize: 10 });

      expect(result).toEqual(mockResponse.data);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith("/workouts", {
        params: { page: 2, pageSize: 10 },
      });
    });

    it("should handle errors properly", async () => {
      const errorMessage = "API Error";
      mockAxiosInstance.get.mockRejectedValueOnce(new Error(errorMessage));

      await expect(client.getWorkouts()).rejects.toThrow(errorMessage);
    });
  });

  describe("createWorkout", () => {
    const mockWorkout = createMockWorkout();
    const mockResponse = {
      data: { ...mockWorkout, id: "123" },
    };

    it("should create a workout successfully", async () => {
      mockAxiosInstance.post.mockResolvedValueOnce(mockResponse);

      const result = await client.createWorkout(mockWorkout);

      expect(result).toEqual(mockResponse.data);
      expect(mockAxiosInstance.post).toHaveBeenCalledWith("/workouts", {
        workout: mockWorkout,
      });
    });

    it("should handle validation errors", async () => {
      const errorResponse = {
        response: {
          data: { error: "Invalid workout data" },
          status: 400,
        },
      };

      mockAxiosInstance.post.mockRejectedValueOnce(errorResponse);

      await expect(client.createWorkout(mockWorkout)).rejects.toMatchObject(
        errorResponse
      );
    });
  });

  describe("getWorkoutEvents", () => {
    const mockResponse = {
      data: {
        page: 1,
        page_count: 5,
        events: [
          {
            type: "updated",
            workout: createMockWorkout(),
          },
        ],
      },
    };

    it("should fetch workout events with parameters", async () => {
      mockAxiosInstance.get.mockResolvedValueOnce(mockResponse);

      const result = await client.getWorkoutEvents({
        page: 1,
        pageSize: 5,
        since: "2024-01-01T00:00:00Z",
      });

      expect(result).toEqual(mockResponse.data);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith("/workouts/events", {
        params: {
          page: 1,
          pageSize: 5,
          since: "2024-01-01T00:00:00Z",
        },
      });
    });
  });

  describe("getExerciseTemplates", () => {
    const mockResponse = {
      data: {
        page: 1,
        page_count: 5,
        exercise_templates: [
          {
            id: "template123",
            title: "Bench Press",
            type: "weight_reps",
            primary_muscle_group: "chest",
            secondary_muscle_groups: ["shoulders", "triceps"],
            is_custom: false,
          },
        ],
      },
    };

    it("should fetch exercise templates", async () => {
      mockAxiosInstance.get.mockResolvedValueOnce(mockResponse);

      const result = await client.getExerciseTemplates();

      expect(result).toEqual(mockResponse.data);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith(
        "/exercise_templates",
        {
          params: { page: 1, pageSize: 5 },
        }
      );
    });
  });

  describe("getRoutineFolders", () => {
    const mockResponse = {
      data: {
        page: 1,
        page_count: 5,
        routine_folders: [
          {
            id: 42,
            index: 1,
            title: "Test Folder",
            updated_at: "2024-01-01T00:00:00Z",
            created_at: "2024-01-01T00:00:00Z",
          },
        ],
      },
    };

    it("should fetch routine folders", async () => {
      mockAxiosInstance.get.mockResolvedValueOnce(mockResponse);

      const result = await client.getRoutineFolders();

      expect(result).toEqual(mockResponse.data);
      expect(mockAxiosInstance.get).toHaveBeenCalledWith("/routine_folders", {
        params: { page: 1, pageSize: 5 },
      });
    });
  });
});
