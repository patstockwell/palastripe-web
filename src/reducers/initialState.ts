import { getLocalStorage } from '../helpers/functions';
import {
  LOCAL_STORAGE_HISTORY,
  LOCAL_STORAGE_ACTIVE_WORKOUT,
  LOCAL_STORAGE_SETTINGS,
} from '../helpers/constants';
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
import squatAndBench from '../workoutData/workouts/squatAndBench';
import { combineDataForAllExercises as combine } from '../helpers/functions';

const initialState: State = {
  // flag to know if we're viewing a statically generated page
  isFirstRender: true,

  // activeWorkout: undefined

  activeWorkoutSelectedExercise: {
    index: null,
    groupId: null,
  },
  scrollY: {
    WORKOUTS_PAGE: 0,
  },

  profile: {
    firstName: '',
    lastName: '',
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
        'full-body-dumbbell-strength': combine(fullBodyDumbbellStrength, exercises),
        'circuit-speed': combine(circuitSpeed, exercises),
        'upper-body-burner': combine(upperBodyBurner, exercises),
        'overhead-strength': combine(overheadStrength, exercises),
        'full-body-power': combine(fullBodyPower, exercises),
        'glutes-and-glory': combine(glutesAndGlory, exercises),
        'squat-and-bench': combine(squatAndBench, exercises),
      },
      allIds: [
        'full-body-dumbbell-strength',
        'squat-and-bench',
        'circuit-speed',
        'glutes-and-glory',
        'upper-body-burner',
        'overhead-strength',
        'full-body-power',
      ],
    },
  },

  history: [],

  // editableWorkout: {
  //   name: '',
  //   id: uuidv4(),
  //   version: VERSION_ONE,
  //   exerciseGroups: [
  //     {
  //       id: uuidv4(),
  //       name: 'Group',
  //       exercises: [
  //         {
  //           id: uuidv4(),
  //           name: 'Exercise with timer',
  //           timerInSeconds: 45,
  //           completed: false,
  //         },
  //         {
  //           id: uuidv4(),
  //           name: 'Exercise with reps',
  //           repsGoal: 10,
  //           weightInKilos: 20,
  //           autoIncrement: 0,
  //           completed: false,
  //         },
  //       ],
  //     },
  //   ],
  // },

};

export default {
  ...initialState,
  activeWorkout: getLocalStorage(LOCAL_STORAGE_ACTIVE_WORKOUT, undefined),
  settings: getLocalStorage(LOCAL_STORAGE_SETTINGS, []),
  // Removing this line will destroy users' history. Never remove.
  history: getLocalStorage(LOCAL_STORAGE_HISTORY, []),
};
