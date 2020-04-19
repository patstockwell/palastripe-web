import { getLocalStorage } from '../helpers/functions';
import {
  LOCAL_STORAGE_ACTIVE_WORKOUT,
  LOCAL_STORAGE_SETTINGS,
  LOCAL_STORAGE_PROFILE,
  LOCAL_STORAGE_WORKOUTS,
} from '../helpers/constants';
import {
  State, // eslint-disable-line no-unused-vars
  Workouts, // eslint-disable-line no-unused-vars
} from '../helpers/types';
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

const initialState = {
  profile: {
    firstName: '',
    lastName: '',
    firstVisitDate: Date.now(),
  },

  settings: {
    useKilos: true,
    soundOn: false,
  },

  workouts: {
    byId: {
      'full-body-dumbbell-strength': fullBodyDumbbellStrength,
      'circuit-speed': circuitSpeed,
      'upper-body-burner': upperBodyBurner,
      'overhead-strength': overheadStrength,
      'full-body-power': fullBodyPower,
      'glutes-and-glory': glutesAndGlory,
      'squat-and-bench': squatAndBench,
      'shape-and-strength': shapeAndStrength,
      'push-and-pull': pushAndPull,
      'leg-power': legPower,
      'compound-pyramids': compoundPyramids,
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

const localStorageWorkouts =
  getLocalStorage(LOCAL_STORAGE_WORKOUTS, initialState.workouts);

const workouts = mergeWorkouts(initialState.workouts, localStorageWorkouts);

export default {
  ...initialState,
  activeWorkout: getLocalStorage(LOCAL_STORAGE_ACTIVE_WORKOUT, undefined),
  settings: {
    ...initialState.settings,
    ...getLocalStorage(LOCAL_STORAGE_SETTINGS, initialState.settings),
  },
  workouts,
  profile: getLocalStorage(LOCAL_STORAGE_PROFILE, initialState.profile),
} as State;
