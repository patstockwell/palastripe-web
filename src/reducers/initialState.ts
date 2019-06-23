import { getLocalStorage } from '../helpers/functions';
import { LOCAL_STORAGE_HISTORY, LOCAL_STORAGE_ACTIVE_WORKOUT } from '../helpers/constants';
import {
  State, // eslint-disable-line no-unused-vars
} from '../helpers/types';
import exercises from '../workoutData/exercises';
import circuitSpeed from '../workoutData/workouts/circuitSpeed';
import fullBodyDumbbellStrength from '../workoutData/workouts/fullBodyDumbbellStrength';

const initialState: State = {
  // activeWorkout: undefined

  immediate: true,
  scrollY: {
    WORKOUTS: 0,
  },

  settings: {
    useKilos: true,
  },

  entities: {
    exercises: {
      ...exercises,
    },

    workouts: {
      byId: {
        'full-body-dumbbell-strength': { ...fullBodyDumbbellStrength },
        'circuit-speed': { ...circuitSpeed },
      },
      allIds: ['full-body-dumbbell-strength', 'circuit-speed']
    },
  },

  history: [],
};

export default {
  ...initialState,
  activeWorkout: getLocalStorage(LOCAL_STORAGE_ACTIVE_WORKOUT, undefined),
  history: getLocalStorage(LOCAL_STORAGE_HISTORY, []),
};

