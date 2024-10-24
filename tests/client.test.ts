import { HevyClient } from "../src/client";
import { HEVY_BASE_URL } from "../src/constants";
import { Routine, Workout } from "../src/types";
import fetch, { Response } from "node-fetch";
import { HevyAPIError } from "../src/error";

jest.mock("node-fetch");
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe("HevyClient", () => {
  let client: HevyClient;
  const API_KEY = "test-api-key";

  beforeEach(() => {
    client = new HevyClient(API_KEY);
    jest.clearAllMocks();
  });

  const mockJsonResponse = (data: any, status = 200): Promise<Response> => {
    const body = JSON.stringify(data);
    // @ts-ignore - we're creating a minimal mock that works for our tests
    return Promise.resolve({
      ok: status >= 200 && status < 300,
      status,
      statusText: status === 200 ? "OK" : "Error",
      headers: new Map([["Content-Type", "application/json"]]),
      json: () => Promise.resolve(data),
      text: () => Promise.resolve(body),
      body: null,
      bodyUsed: false,
      url: "",
      type: "default",
      redirected: false,
      size: 0,
      timeout: 0,
      clone: function () {
        return this;
      },
    });
  };

  const mockErrorResponse = (
    status: number,
    message: string
  ): Promise<Response> => {
    // @ts-ignore - we're creating a minimal mock that works for our tests
    return Promise.resolve({
      ok: false,
      status,
      statusText: "Error",
      headers: new Map([["Content-Type", "text/plain"]]),
      json: () => Promise.reject(new Error("Invalid JSON")),
      text: () => Promise.resolve(message),
      body: null,
      bodyUsed: false,
      url: "",
      type: "default",
      redirected: false,
      size: 0,
      timeout: 0,
      clone: function () {
        return this;
      },
    });
  };

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
    it("should initialize with correct configuration", () => {
      expect((client as any).baseUrl).toBe(HEVY_BASE_URL);
      expect((client as any).headers).toEqual({
        "api-key": API_KEY,
        "Content-Type": "application/json",
      });
    });
  });

  describe("getWorkouts", () => {
    const mockWorkoutsResponse = {
      page: 1,
      page_count: 5,
      workouts: [createMockWorkout()],
    };

    it("should fetch workouts with default pagination", async () => {
      mockFetch.mockImplementationOnce(() =>
        mockJsonResponse(mockWorkoutsResponse)
      );

      const result = await client.getWorkouts();

      expect(result).toEqual(mockWorkoutsResponse);
      expect(mockFetch).toHaveBeenCalledWith(
        `${HEVY_BASE_URL}/workouts?page=1&pageSize=5`,
        expect.objectContaining({
          method: "GET",
          headers: expect.objectContaining({
            "api-key": API_KEY,
            "Content-Type": "application/json",
          }),
        })
      );
    });

    it("should fetch workouts with custom pagination", async () => {
      mockFetch.mockImplementationOnce(() =>
        mockJsonResponse(mockWorkoutsResponse)
      );

      const result = await client.getWorkouts({ page: 2, pageSize: 10 });

      expect(result).toEqual(mockWorkoutsResponse);
      expect(mockFetch).toHaveBeenCalledWith(
        `${HEVY_BASE_URL}/workouts?page=2&pageSize=10`,
        expect.any(Object)
      );
    });

    it("should handle errors properly", async () => {
      mockFetch.mockImplementationOnce(() =>
        mockErrorResponse(400, "Invalid request")
      );

      await expect(client.getWorkouts()).rejects.toThrow(HevyAPIError);
    });
  });

  describe("createWorkout", () => {
    const mockWorkout = createMockWorkout();
    const mockResponse = { ...mockWorkout, id: "123" };

    it("should create a workout successfully", async () => {
      mockFetch.mockImplementationOnce(() => mockJsonResponse(mockResponse));

      const result = await client.createWorkout(mockWorkout);

      expect(result).toEqual(mockResponse);
      expect(mockFetch).toHaveBeenCalledWith(
        `${HEVY_BASE_URL}/workouts`,
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({ workout: mockWorkout }),
          headers: expect.objectContaining({
            "api-key": API_KEY,
            "Content-Type": "application/json",
          }),
        })
      );
    });

    it("should handle validation errors", async () => {
      mockFetch.mockImplementationOnce(() =>
        mockErrorResponse(
          400,
          JSON.stringify({ error: "Invalid workout data" })
        )
      );

      await expect(client.createWorkout(mockWorkout)).rejects.toThrow(
        HevyAPIError
      );
    });
  });

  describe("URL building", () => {
    it("should build URLs correctly with query parameters", async () => {
      mockFetch.mockImplementationOnce(() => mockJsonResponse({}));

      await client.getWorkouts({ page: 2, pageSize: 10 });

      expect(mockFetch).toHaveBeenCalledWith(
        `${HEVY_BASE_URL}/workouts?page=2&pageSize=10`,
        expect.any(Object)
      );
    });

    it("should handle paths with leading slashes", async () => {
      mockFetch.mockImplementationOnce(() => mockJsonResponse({}));

      await client.getWorkout("123");

      expect(mockFetch).toHaveBeenCalledWith(
        `${HEVY_BASE_URL}/workouts/123`,
        expect.any(Object)
      );
    });
  });
  // ... (previous test code remains the same until after createWorkout tests)

  describe("getWorkoutCount", () => {
    it("should fetch workout count", async () => {
      const mockResponse = { workout_count: 42 };
      mockFetch.mockImplementationOnce(() => mockJsonResponse(mockResponse));

      const result = await client.getWorkoutCount();

      expect(result).toBe(42);
      expect(mockFetch).toHaveBeenCalledWith(
        `${HEVY_BASE_URL}/workouts/count`,
        expect.objectContaining({
          method: "GET",
          headers: expect.objectContaining({
            "api-key": API_KEY,
          }),
        })
      );
    });

    it("should handle errors", async () => {
      mockFetch.mockImplementationOnce(() =>
        mockErrorResponse(500, "Server error")
      );

      await expect(client.getWorkoutCount()).rejects.toThrow(HevyAPIError);
    });
  });

  describe("getWorkoutEvents", () => {
    const mockEventsResponse = {
      page: 1,
      page_count: 5,
      events: [
        {
          type: "updated",
          workout: createMockWorkout(),
        },
      ],
    };

    it("should fetch workout events with default parameters", async () => {
      mockFetch.mockImplementationOnce(() =>
        mockJsonResponse(mockEventsResponse)
      );

      const result = await client.getWorkoutEvents();

      expect(result).toEqual(mockEventsResponse);
      expect(mockFetch).toHaveBeenCalledWith(
        `${HEVY_BASE_URL}/workouts/events?page=1&pageSize=5`,
        expect.any(Object)
      );
    });

    it("should fetch workout events with custom parameters", async () => {
      mockFetch.mockImplementationOnce(() =>
        mockJsonResponse(mockEventsResponse)
      );

      const result = await client.getWorkoutEvents({
        page: 2,
        pageSize: 10,
        since: "2024-01-01T00:00:00Z",
      });

      expect(result).toEqual(mockEventsResponse);
      expect(mockFetch).toHaveBeenCalledWith(
        `${HEVY_BASE_URL}/workouts/events?page=2&pageSize=10&since=2024-01-01T00%3A00%3A00Z`,
        expect.any(Object)
      );
    });
  });

  describe("getWorkout", () => {
    it("should fetch a single workout", async () => {
      const mockWorkout = createMockWorkout();
      mockFetch.mockImplementationOnce(() => mockJsonResponse(mockWorkout));

      const result = await client.getWorkout("123");

      expect(result).toEqual(mockWorkout);
      expect(mockFetch).toHaveBeenCalledWith(
        `${HEVY_BASE_URL}/workouts/123`,
        expect.any(Object)
      );
    });

    it("should handle not found error", async () => {
      mockFetch.mockImplementationOnce(() =>
        mockErrorResponse(404, "Workout not found")
      );

      await expect(client.getWorkout("invalid-id")).rejects.toThrow(
        HevyAPIError
      );
    });
  });

  describe("Routines", () => {
    const mockRoutine: Routine = {
      title: "Test Routine",
      exercises: [
        {
          exercise_template_id: "TEST123",
          sets: [{ set_type: "normal", weight_kg: 100, reps: 10 }],
        },
      ],
    };

    describe("getRoutines", () => {
      const mockResponse = {
        page: 1,
        page_count: 5,
        routines: [mockRoutine],
      };

      it("should fetch routines with default pagination", async () => {
        mockFetch.mockImplementationOnce(() => mockJsonResponse(mockResponse));

        const result = await client.getRoutines();

        expect(result).toEqual(mockResponse);
        expect(mockFetch).toHaveBeenCalledWith(
          `${HEVY_BASE_URL}/routines?page=1&pageSize=5`,
          expect.any(Object)
        );
      });
    });

    describe("createRoutine", () => {
      it("should create a routine", async () => {
        const mockResponse = { ...mockRoutine, id: "123" };
        mockFetch.mockImplementationOnce(() => mockJsonResponse(mockResponse));

        const result = await client.createRoutine(mockRoutine);

        expect(result).toEqual(mockResponse);
        expect(mockFetch).toHaveBeenCalledWith(
          `${HEVY_BASE_URL}/routines`,
          expect.objectContaining({
            method: "POST",
            body: JSON.stringify({ routine: mockRoutine }),
          })
        );
      });
    });
  });

  describe("Exercise Templates", () => {
    const mockTemplate = {
      id: "template123",
      title: "Bench Press",
      type: "weight_reps",
      primary_muscle_group: "chest",
      secondary_muscle_groups: ["shoulders", "triceps"],
      is_custom: false,
    };

    describe("getExerciseTemplates", () => {
      const mockResponse = {
        page: 1,
        page_count: 5,
        exercise_templates: [mockTemplate],
      };

      it("should fetch exercise templates", async () => {
        mockFetch.mockImplementationOnce(() => mockJsonResponse(mockResponse));

        const result = await client.getExerciseTemplates();

        expect(result).toEqual(mockResponse);
        expect(mockFetch).toHaveBeenCalledWith(
          `${HEVY_BASE_URL}/exercise_templates?page=1&pageSize=5`,
          expect.any(Object)
        );
      });
    });

    describe("getExerciseTemplate", () => {
      it("should fetch a single exercise template", async () => {
        mockFetch.mockImplementationOnce(() => mockJsonResponse(mockTemplate));

        const result = await client.getExerciseTemplate("template123");

        expect(result).toEqual(mockTemplate);
        expect(mockFetch).toHaveBeenCalledWith(
          `${HEVY_BASE_URL}/exercise_templates/template123`,
          expect.any(Object)
        );
      });
    });
  });

  describe("Routine Folders", () => {
    const mockFolder = {
      id: 42,
      title: "Test Folder",
      index: 1,
      created_at: "2024-01-01T00:00:00Z",
      updated_at: "2024-01-01T00:00:00Z",
    };

    describe("getRoutineFolders", () => {
      const mockResponse = {
        page: 1,
        page_count: 5,
        routine_folders: [mockFolder],
      };

      it("should fetch routine folders", async () => {
        mockFetch.mockImplementationOnce(() => mockJsonResponse(mockResponse));

        const result = await client.getRoutineFolders();

        expect(result).toEqual(mockResponse);
        expect(mockFetch).toHaveBeenCalledWith(
          `${HEVY_BASE_URL}/routine_folders?page=1&pageSize=5`,
          expect.any(Object)
        );
      });
    });

    describe("createRoutineFolder", () => {
      it("should create a routine folder", async () => {
        const folderData = { title: "New Folder" };
        mockFetch.mockImplementationOnce(() => mockJsonResponse(mockFolder));

        const result = await client.createRoutineFolder(folderData);

        expect(result).toEqual(mockFolder);
        expect(mockFetch).toHaveBeenCalledWith(
          `${HEVY_BASE_URL}/routine_folders`,
          expect.objectContaining({
            method: "POST",
            body: JSON.stringify({ routine_folder: folderData }),
          })
        );
      });
    });

    describe("getRoutineFolder", () => {
      it("should fetch a single routine folder", async () => {
        mockFetch.mockImplementationOnce(() => mockJsonResponse(mockFolder));

        const result = await client.getRoutineFolder(42);

        expect(result).toEqual(mockFolder);
        expect(mockFetch).toHaveBeenCalledWith(
          `${HEVY_BASE_URL}/routine_folders/42`,
          expect.any(Object)
        );
      });
    });
  });
});
