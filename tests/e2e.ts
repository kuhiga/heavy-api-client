// test-usage.js
import { HevyClient } from "../src/client";

async function test() {
  const client = new HevyClient("");

  console.log("\nTesting URL construction:");
  // @ts-ignore - accessing private method for testing
  console.log(client["buildUrl"]("/workouts"));

  console.log("\nTesting API call:");
  // const workouts = await client.getWorkouts({ page: 1, pageSize: 5 });

  // const newWorkout = await client.createWorkout({
  //   workout: {
  //     title: "Morning Workout 💪",
  //     description: "Push day",
  //     start_time: new Date().toISOString(),
  //     end_time: new Date().toISOString(),
  //     is_private: false,
  //     exercises: [
  //       {
  //         exercise_template_id: "05293BCA",
  //         sets: [
  //           {
  //             type: "normal",
  //             weight_kg: 100,
  //             reps: 10,
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // });
  // await client.createRoutineFolder({
  //   routine_folder: {
  //     title: "hi",
  //   },
  // });

  await client.createWorkout({
    workout: {
      title: "Test Workout",
      description: "Test Description",
      start_time: "2024-01-01T10:00:00Z",
      end_time: "2024-01-01T11:00:00Z",
      is_private: false,
      exercises: [
        {
          exercise_template_id: "B5D3A742",
          sets: [
            {
              type: "normal",
              weight_kg: 100,
              reps: 10,
            },
          ],
        },
      ],
    },
  });
  console.log(`workout count is ${await client.getWorkoutCount()}`);
  console.log(
    `workout events are ${await client.getWorkoutEvents({
      page: 1,
      pageSize: 5,
    })}`
  );
  console.log(
    `routines are ${JSON.stringify(
      await client.getRoutines({ page: 1, pageSize: 5 })
    )}`
  );
  console.log(
    `exercise templates are ${JSON.stringify(
      await client.getExerciseTemplates()
    )}`
  );
  console.log(
    `creating routines ${JSON.stringify(
      await client.createRoutine({
        routine: {
          title: "Test Routine",
          folder_id: null,
          exercises: [
            {
              exercise_template_id: "B5D3A742",
              sets: [
                {
                  type: "normal",
                  weight_kg: 100,
                  reps: 10,
                },
              ],
            },
          ],
        },
      })
    )}`
  );
}

test();
