import uuidv4 from 'uuid/v4';
import { getLocalStorage } from '../helpers/functions';
import { VERSION_ONE, LOCAL_STORAGE_HISTORY, LOCAL_STORAGE_ACTIVE_WORKOUT } from '../helpers/constants';
import {
  State, // eslint-disable-line no-unused-vars
} from '../helpers/types';
import exercises from '../workoutData/exercises';
import circuitSpeed from '../workoutData/workouts/circuitSpeed';
import fullBodyDumbbellStrength from '../workoutData/workouts/fullBodyDumbbellStrength';
import upperBodyBurner from '../workoutData/workouts/upperBodyBurner';
import overheadStrength from '../workoutData/workouts/overheadStrength';
import fullBodyPower from '../workoutData/workouts/fullBodyPower';
import glutesAndGlory from '../workoutData/workouts/glutesAndGlory';

const initialState: State = {
  // flag to know if we're viewing a statically generated page
  isFirstRender: true,

  // activeWorkout: undefined
  activeWorkoutSelectedExercise: {
    index: null,
    groupId: null,
  },
  immediate: true,
  scrollY: {
    WORKOUTS_PAGE: 0,
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
        'upper-body-burner': { ...upperBodyBurner },
        'overhead-strength': overheadStrength,
        'full-body-power': fullBodyPower,
        'glutes-and-glory': glutesAndGlory,
      },
      allIds: [
        'full-body-dumbbell-strength',
        'circuit-speed',
        'glutes-and-glory',
        'upper-body-burner',
        'overhead-strength',
        'full-body-power',
      ],
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
