import { State } from '../helpers/types';

const initialState: State = {
  // activeWorkout: undefined

  settings: {
    useKilos: true,
  },

  entities: {
    exercises: {
      byId: {
        'exercise1': {
          id: 'exercise1',
          name: 'Dead Lift',
          mostWeightInKilos: undefined,
        },
        'exercise2': {
          id: 'exercise2',
          name: 'Squat',
          mostWeightInKilos: undefined,
        },
        'exercise3': {
          id: 'exercise3',
          name: 'Overhead Press',
          mostWeightInKilos: undefined,
        },
        'exercise4': {
          id: 'exercise4',
          name: 'Chin-up',
          mostWeightInKilos: undefined,
        },
        'exercise5': {
          id: 'exercise5',
          name: 'Bench Press',
          mostWeightInKilos: undefined,
        },
        'exercise6': {
          id: 'exercise6',
          name: 'Bicep Curl',
          mostWeightInKilos: undefined,
        },
        'exercise7': {
          id: 'exercise7',
          name: 'Row',
          mostWeightInKilos: undefined,
        },
        'exercise8': {
          id: 'exercise8',
          name: 'Straight-leg Dumbbell Deadlift',
        },
        'exercise9': {
          id: 'exercise9',
          name: 'Dumbbell Overhead Press',
        },
        'exercise10': {
          id: 'exercise10',
          name: 'Sit-ups',
        },
        'exercise11': {
          id: 'exercise11',
          name: 'Right Arm Cross Body',
        },
        'exercise12': {
          id: 'exercise12',
          name: 'Left Arm Cross Body',
        },
        'exercise13': {
          id: 'exercise13',
          name: 'Left Glute Pigeon Pose',
        },
        'exercise14': {
          id: 'exercise14',
          name: 'Right Glute Pigeon Pose',
        },
      },
      allIds: [
        'exercise1',
        'exercise2',
        'exercise3',
        'exercise4',
        'exercise5',
        'exercise6',
        'exercise7',
        'exercise8',
        'exercise9',
      ],
    },

    workouts: {
      byId: {
        'newWorkoutShape1': {
          id: 'newWorkoutShape1',
          name: 'Full Body Dumbbell Strength',
          exercises: {
            warmUp: [
              {
                id: 'exercise10',
                timerInSeconds: 60,
                completed: false,
              },
            ],
            sets: [
              {
                id: 'exercise8',
                weightInKilos: 15,
                maxReps: 8,
                completedReps: undefined,
                autoIncrement: 2.5,
              },
              {
                id: 'exercise8',
                weightInKilos: 15,
                maxReps: 10,
                completedReps: undefined,
                autoIncrement: 2.5,
              },
              {
                id: 'exercise8',
                weightInKilos: 15,
                maxReps: 12,
                completedReps: undefined,
                autoIncrement: 2.5,
              },
              {
                id: 'exercise9',
                weightInKilos: 15,
                maxReps: 12,
                completedReps: undefined,
                autoIncrement: 2.5,
              },
              {
                id: 'exercise9',
                weightInKilos: 15,
                maxReps: 12,
                completedReps: undefined,
                autoIncrement: 2.5,
              },
              {
                id: 'exercise9',
                weightInKilos: 15,
                maxReps: 12,
                completedReps: undefined,
                autoIncrement: 2.5,
              },
              {
                id: 'exercise6',
                weightInKilos: 15,
                maxReps: 6,
                completedReps: undefined,
                autoIncrement: 2.5,
              },
              {
                id: 'exercise6',
                weightInKilos: 15,
                maxReps: 6,
                completedReps: undefined,
                autoIncrement: 2.5,
              },
              {
                id: 'exercise6',
                weightInKilos: 15,
                maxReps: 6,
                completedReps: undefined,
                autoIncrement: 2.5,
              },
            ],
            stretch: [
              {
                id: 'exercise11',
                timerInSeconds: 60,
                completed: false,
              },
              {
                id: 'exercise12',
                timerInSeconds: 60,
                completed: false,
              },
              {
                id: 'exercise13',
                timerInSeconds: 60,
                completed: false,
              },
              {
                id: 'exercise14',
                timerInSeconds: 60,
                completed: false,
              },
            ],
            allExerciseIds: [
              'exercise6',
              'exercise8',
              'exercise9',
              'exercise10',
            ],
          },
        },
      },
      allIds: ['workout1', 'workout2']
    },
  },

  history: [],
};

export default initialState;

