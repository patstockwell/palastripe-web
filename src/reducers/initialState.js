export const initialState = {
  workoutCountForThisPlan: 0,
  activeWorkoutOnGoing: false,
  activeWorkout: {
    workoutName: 'Arms Routine',
    exercises: [
      {
        name: 'Chinups',
        weightInKilos: 0,
        sets: [5, 5, 5, 5],
      },
      {
        name: 'Bench Press',
        weightInKilos: 40,
        sets: [8, 8, 8, 8],
      },
      {
        name: 'Bicep Curl',
        weightInKilos: 12.5,
        sets: [8, 8, 8, 8],
      },
    ],
  },
  workoutPlan: [
    {
      workoutName: 'Arms Routine',
      exercises: [
        {
          name: 'Chinups',
          weightInKilos: 0,
          sets: [5, 5, 5, 5],
        },
        {
          name: 'Bench Press',
          weightInKilos: 40,
          sets: [8, 8, 8, 8],
        },
        {
          name: 'Bicep Curl',
          weightInKilos: 12.5,
          sets: [8, 8, 8, 8],
        },
      ],
    },
    {
      workoutName: 'Leg Burn',
      exercises: [
        {
          name: 'Deadlift',
          weightInKilos: 80,
          sets: [7, 7, 7, 7],
        },
        {
          name: 'Squat',
          weightInKilos: 50,
          sets: [7, 7, 7, 7],
        },
        {
          name: 'Overhead Press',
          weightInKilos: 30,
          sets: [7, 7, 7, 7],
        },
      ],
    },
  ],
  history: [],
};

