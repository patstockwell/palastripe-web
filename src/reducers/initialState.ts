import { getLocalStorage } from '../helpers/functions';
import {
  LOCAL_STORAGE_HISTORY,
  LOCAL_STORAGE_ACTIVE_WORKOUT,
  LOCAL_STORAGE_SETTINGS,
  LOCAL_STORAGE_ENTITIES,
  LOCAL_STORAGE_PROFILE,
} from '../helpers/constants';
import {
  Entities, // eslint-disable-line no-unused-vars
  State, // eslint-disable-line no-unused-vars
  Workouts, // eslint-disable-line no-unused-vars
} from '../helpers/types';
import exercises from '../workoutData/exercises';
import circuitSpeed from '../workoutData/workouts/circuitSpeed';
import fullBodyDumbbellStrength from '../workoutData/workouts/fullBodyDumbbellStrength';
import upperBodyBurner from '../workoutData/workouts/upperBodyBurner';
import overheadStrength from '../workoutData/workouts/overheadStrength';
import fullBodyPower from '../workoutData/workouts/fullBodyPower';
import glutesAndGlory from '../workoutData/workouts/glutesAndGlory';
import squatAndBench from '../workoutData/workouts/squatAndBench';
import shapeAndStrength from '../workoutData/workouts/shapeAndStrength';
import pushAndPull from '../workoutData/workouts/pushAndPull';
import legPower from '../workoutData/workouts/legPower';
import compoundPyramids from '../workoutData/workouts/compoundPyramids';
import { combineDataForAllExercises as combine } from '../helpers/functions';

const initialState: State = {
  // activeWorkout: undefined

  profile: {
    firstName: '',
    lastName: '',
    firstVisitDate: Date.now(),
  },

  settings: {
    useKilos: true,
    soundOn: false,
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
        'shape-and-strength': combine(shapeAndStrength, exercises),
        'push-and-pull': combine(pushAndPull, exercises),
        'leg-power': combine(legPower, exercises),
        'compound-pyramids': combine(compoundPyramids, exercises),
      },
      allIds: [
        'shape-and-strength',
        'push-and-pull',
        'leg-power',
        'compound-pyramids',
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

const mergeWorkouts = (
  initial: Workouts,
  localStorage: Workouts,
): Workouts => {
  // TODO: remove all the workouts from localStorage that don't meet version1
  const { allIds: localIds, byId } = localStorage;
  const { allIds: initialIds, byId: initialWorkouts } = initial;
  // find all the ids not in localStorage
  const missingIds = initialIds.filter(id => !localIds.includes(id));
  // get each of the workouts for those ids
  const missingWorkouts = missingIds
    .map(id => initialWorkouts[id])
    .reduce ((acc, w) => ({ ...acc, [w.id]: w }), {});

  return {
    byId: { ...byId, ...missingWorkouts },
    allIds: [ ...localIds, ...missingIds ],
  };
};

const entities: Entities =
  getLocalStorage(LOCAL_STORAGE_ENTITIES, initialState.entities);

const workouts = mergeWorkouts(initialState.entities.workouts, entities.workouts);

export default {
  ...initialState,
  activeWorkout: getLocalStorage(LOCAL_STORAGE_ACTIVE_WORKOUT, initialState.activeWorkout),
  settings: {
    ...initialState.settings,
    ...getLocalStorage(LOCAL_STORAGE_SETTINGS, initialState.settings),
  },
  entities: {
    ...entities,
    workouts,
  },
  // Removing this line will destroy users' history. Never remove.
  history: getLocalStorage(LOCAL_STORAGE_HISTORY, []),
  profile: getLocalStorage(LOCAL_STORAGE_PROFILE, initialState.profile),
} as State;
