import uuidv4 from 'uuid/v4';
import { getLocalStorage } from '../helpers/functions';
import { VERSION_ONE, LOCAL_STORAGE_HISTORY, LOCAL_STORAGE_ACTIVE_WORKOUT } from '../helpers/constants';
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

  editableWorkout: {
    name: '',
    id: uuidv4(),
    version: VERSION_ONE,
    exerciseGroups: [
      {
        id: uuidv4(),
        name: 'Group',
        exercises: [
          {
            id: uuidv4(),
            name: 'Exercise with timer',
            timerInSeconds: 45,
            completed: false,
          },
          {
            id: uuidv4(),
            name: 'Exercise with reps',
            repsGoal: 10,
            weightInKilos: 20,
            autoIncrement: 0,
            completed: false,
          },
        ],
      },
    ],
  },
};

export default {
  ...initialState,
  activeWorkout: getLocalStorage(LOCAL_STORAGE_ACTIVE_WORKOUT, undefined),
  // Removing this line will destroy users' history. Never remove.
  history: getLocalStorage(LOCAL_STORAGE_HISTORY, []),
};

