import { getLocalStorage } from '../helpers/functions';
import {
  LOCAL_STORAGE_HISTORY,
  LOCAL_STORAGE_ACTIVE_WORKOUT,
} from '../helpers/constants';

const initialState = {
  settings: {
    planId: 'plan1',
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
      },
      allIds: [
        'exercise1',
        'exercise2',
        'exercise3',
        'exercise4',
        'exercise5',
        'exercise6',
        'exercise7',
      ],
    },

    workouts: {
      byId: {
        'workout1': {
          id: 'workout1',
          name: 'Pull',
          exercises: {
            'exercise1': {
              sets: [7, 7, 7, 7],
              restPeriodInSeconds: 120,
              weightInKilos: 40,
            },
            'exercise4': {
              sets: [7, 7, 7, 7],
              restPeriodInSeconds: 150,
              weightInKilos: 0,
            },
            'exercise6': {
              sets: [7, 7, 7, 7],
              restPeriodInSeconds: 90,
              weightInKilos: 20,
            },
          },
          order: ['exercise1', 'exercise4', 'exercise6'],
        },
        'workout2': {
          id: 'workout2',
          name: 'Push',
          exercises: {
            'exercise2': {
              sets: [7, 7, 7, 7],
              restPeriodInSeconds: 150,
              weightInKilos: 40,
            },
            'exercise3': {
              sets: [7, 7, 7, 7],
              restPeriodInSeconds: 120,
              weightInKilos: 30,
            },
            'exercise5': {
              sets: [7, 7, 7, 7],
              restPeriodInSeconds: 120,
              weightInKilos: 40,
            },
          },
          order: ['exercise2', 'exercise3', 'exercise5'],
        },
      },
      allIds: ['workout1', 'workout2']
    },

    plans: {
      byId: {
        'plan1': {
          id: 'plan1',
          name: 'Compound Sevens',
          workouts: ['workout1', 'workout2'],
        },
      },
      allIds: ['plan1'],
    },
  },

  history: undefined,
};

export default {
  ...initialState,
  // Add this back in when a user can create exercises and workouts
  // entities: getLocalStorage(LOCAL_STORAGE_ENTITIES, initialState.entities),
  history: getLocalStorage(LOCAL_STORAGE_HISTORY, []),
  activeWorkout: getLocalStorage(LOCAL_STORAGE_ACTIVE_WORKOUT, undefined),
};

